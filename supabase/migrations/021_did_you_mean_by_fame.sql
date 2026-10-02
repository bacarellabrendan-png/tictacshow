-- Migration 021: "did you mean" and namesake choosers list the best-known players first
-- Run in Supabase SQL Editor AFTER 020b-1 (needs prior_views). One small transaction. PURE ASCII.
-- Approved plan, 2 Oct 2026. Only the ORDER and LENGTH of chooser lists change; which text resolves to
-- which player (exact / without suffix / nickname / typo rules) is unchanged, line for line.
--   * Namesakes (status ambiguous, e.g. "Chris Young"): ordered by 12-month page views (prior_views),
--     then name, instead of by name alone. Still at most max_choices (6).
--   * Did you mean (status suggest):
--       - a single typed word that is a whole word of a player's name ("Wells" -> David Wells,
--         Bonzi Wells, ...) now finds every such player in the sport, not only the closest spellings;
--         these come first, best known first;
--       - then the other close spellings ("Wellington"), by similarity band (0.1 steps), best known
--         first within a band;
--       - at most max_suggestions (new setting, 10) instead of 6.
--   The order uses only the typed text, the sport and page views. It never depends on the square, so
--   it cannot hint at which candidate is a valid answer. record_answer_v3 passes the list through as is.
-- 0. BACKUP: the current resolve_player definition. RLS on, no browser access.
-- 1. GUARD: prior_views exists and covers every player who owns a fact; setting not added yet.

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20261002_resolve_player_021 AS
  SELECT pg_get_functiondef('public.resolve_player(text, text)'::regprocedure) AS definition;
ALTER TABLE backup_20261002_resolve_player_021 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261002_resolve_player_021 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  -- --- 1. GUARD ------------------------------------------------------------------------------
  IF to_regclass('public.prior_views') IS NULL THEN RAISE EXCEPTION '021 guard: prior_views missing (run 020b-1 first)'; END IF;
  SELECT count(DISTINCT f.player_id) INTO n FROM player_facts f
   WHERE f.player_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM prior_views v WHERE v.player_id = f.player_id);
  IF n <> 0 THEN RAISE EXCEPTION '021 guard: % fact owners have no page views', n; END IF;
  IF EXISTS (SELECT 1 FROM name_match_settings WHERE name = 'max_suggestions') THEN RAISE EXCEPTION '021 guard: already applied'; END IF;
END
$mig$;

INSERT INTO name_match_settings (name, value, note)
VALUES ('max_suggestions', 10, 'most players shown in a did-you-mean list (best known first)');

-- --- 2. resolve_player --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.resolve_player(p_text TEXT, p_sport TEXT)
RETURNS TABLE (status TEXT, match_kind TEXT, player_id BIGINT, display_name TEXT, detail TEXT, similarity REAL)
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_exact TEXT := normalize_name_exact(coalesce(p_text, ''));
  v_base  TEXT := normalize_name(coalesce(p_text, ''));
  v_ids   BIGINT[];
  v_wide  BIGINT[];
  v_kind  TEXT;
  v_min   REAL; v_lead REAL; v_floor REAL; v_max INT; v_smax INT;
  v_top   REAL; v_second REAL;
  v_pids  BIGINT[]; v_sims REAL[]; v_words INT[];
  v_wordhits BIGINT[];
BEGIN
  IF length(v_base) < 2 THEN
    RETURN QUERY SELECT 'none'::TEXT, NULL::TEXT, NULL::BIGINT, NULL::TEXT, NULL::TEXT, NULL::REAL; RETURN;
  END IF;
  SELECT value INTO v_min   FROM name_match_settings WHERE name = 'min_similarity';
  SELECT value INTO v_lead  FROM name_match_settings WHERE name = 'min_lead';
  SELECT value INTO v_floor FROM name_match_settings WHERE name = 'suggest_floor';
  SELECT value::INT INTO v_max  FROM name_match_settings WHERE name = 'max_choices';
  SELECT value::INT INTO v_smax FROM name_match_settings WHERE name = 'max_suggestions';

  -- 1. exact alias (not nicknames)
  SELECT array_agg(DISTINCT a.player_id) INTO v_ids FROM player_aliases a
   WHERE a.alias_exact = v_exact AND a.kind <> 'nickname'
     AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport);
  v_kind := 'exact';
  -- 2. name without Jr/Sr/II; an unsuffixed name also widens to suffixed namesakes (never guess)
  SELECT array_agg(DISTINCT a.player_id) INTO v_wide FROM player_aliases a
   WHERE a.alias_norm = v_base AND a.kind <> 'nickname'
     AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport);
  IF coalesce(cardinality(v_ids), 0) = 0 THEN
    v_ids := v_wide; v_kind := 'without suffix';
  ELSIF v_exact = v_base AND coalesce(cardinality(v_wide), 0) > cardinality(v_ids) THEN
    v_ids := v_wide; v_kind := 'without suffix';
  END IF;
  -- 3. nicknames (resolve only if unique within the sport)
  IF coalesce(cardinality(v_ids), 0) = 0 THEN
    SELECT array_agg(DISTINCT a.player_id) INTO v_ids FROM player_aliases a
     WHERE (a.alias_exact = v_exact OR a.alias_norm = v_base) AND a.kind = 'nickname'
       AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport);
    v_kind := 'nickname';
  END IF;

  IF coalesce(cardinality(v_ids), 0) = 1 THEN
    RETURN QUERY SELECT 'resolved'::TEXT, v_kind, p.id, p.display_name, player_detail(p.id, p_sport), 1::REAL
                   FROM players p WHERE p.id = v_ids[1];
    RETURN;
  ELSIF coalesce(cardinality(v_ids), 0) > 1 THEN
    -- 021: best known first (page views), then name
    RETURN QUERY SELECT 'ambiguous'::TEXT, v_kind, p.id, p.display_name, player_detail(p.id, p_sport), 1::REAL
                   FROM players p LEFT JOIN prior_views pv ON pv.player_id = p.id
                  WHERE p.id = ANY (v_ids)
                  ORDER BY coalesce(pv.pageviews_12m, -1) DESC, p.display_name COLLATE "C", p.id LIMIT v_max;
    RETURN;
  END IF;

  -- 4. typo match: resolves only with one clear winner (best similarity per player, ranked), and
  --    only when the typed name has at least as many words as the alias it matched (018e):
  --    a surname alone ("Burrell") never resolves; it gets the did-you-mean list instead.
  PERFORM set_config('pg_trgm.similarity_threshold', v_floor::TEXT, true);
  SELECT array_agg(c.pid ORDER BY c.sim DESC, c.pid), array_agg(c.sim ORDER BY c.sim DESC, c.pid),
         array_agg(c.words ORDER BY c.sim DESC, c.pid)
    INTO v_pids, v_sims, v_words
    FROM (SELECT DISTINCT ON (a.player_id) a.player_id AS pid, similarity(a.alias_norm, v_base) AS sim,
                 array_length(string_to_array(a.alias_norm, ' '), 1) AS words
            FROM player_aliases a
           WHERE a.alias_norm % v_base AND a.kind <> 'nickname'
             AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport)
           ORDER BY a.player_id, similarity(a.alias_norm, v_base) DESC,
                    array_length(string_to_array(a.alias_norm, ' '), 1)) c;
  v_top := v_sims[1]; v_second := coalesce(v_sims[2], 0);
  IF v_top IS NOT NULL AND v_top >= v_min AND v_top - v_second >= v_lead
     AND array_length(string_to_array(v_base, ' '), 1) >= v_words[1] THEN
    RETURN QUERY SELECT 'resolved'::TEXT, 'typo'::TEXT, p.id, p.display_name, player_detail(p.id, p_sport), v_top
                   FROM players p WHERE p.id = v_pids[1];
    RETURN;
  END IF;

  -- 5. did you mean (021). A single typed word that is a whole word of a name (a surname) finds every
  --    such player in the sport; best known first. Then the other close spellings by similarity band.
  IF position(' ' IN v_base) = 0 AND length(v_base) >= 3 THEN
    SELECT array_agg(DISTINCT a.player_id) INTO v_wordhits FROM player_aliases a
     WHERE a.alias_norm LIKE '%' || v_base || '%' AND v_base = ANY (string_to_array(a.alias_norm, ' '))
       AND a.kind <> 'nickname'
       AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport);
  END IF;
  IF (v_top IS NULL OR v_top < v_floor) AND coalesce(cardinality(v_wordhits), 0) = 0 THEN
    RETURN QUERY SELECT 'none'::TEXT, NULL::TEXT, NULL::BIGINT, NULL::TEXT, NULL::TEXT, NULL::REAL; RETURN;
  END IF;
  RETURN QUERY
    WITH cand AS (
      SELECT u.pid, u.sim FROM unnest(v_pids, v_sims) AS u(pid, sim) WHERE u.sim >= v_floor
      UNION
      SELECT w.pid, NULL::REAL FROM unnest(v_wordhits) AS w(pid)
    ), best AS (
      SELECT c.pid, max(c.sim) AS sim, bool_or(c.pid = ANY (coalesce(v_wordhits, '{}'))) AS word FROM cand c GROUP BY c.pid
    )
    SELECT 'suggest'::TEXT, 'typo'::TEXT, p.id, p.display_name, player_detail(p.id, p_sport), coalesce(b.sim, 0)::REAL
      FROM best b JOIN players p ON p.id = b.pid LEFT JOIN prior_views pv ON pv.player_id = b.pid
     ORDER BY b.word DESC, CASE WHEN b.word THEN 0 ELSE round(b.sim::numeric, 1) END DESC,
              coalesce(pv.pageviews_12m, -1) DESC, p.id
     LIMIT v_smax;
END;
$$;

DO $mig$
DECLARE tg TEXT;
BEGIN
  SELECT n.nspname INTO tg FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pg_trgm';
  IF tg IS NULL THEN RAISE EXCEPTION 'Migration 021 needs the pg_trgm extension; it is not installed.'; END IF;
  EXECUTE format('ALTER FUNCTION public.resolve_player(TEXT, TEXT) SET search_path = public, %I, pg_temp', tg);
END
$mig$;

COMMIT;

-- --- 3. CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM backup_20261002_resolve_player_021)                                          AS function_backed_up,
  (SELECT value FROM name_match_settings WHERE name = 'max_suggestions')                             AS max_suggestions,
  (SELECT string_agg(display_name, ', ') FROM (SELECT display_name FROM resolve_player('Wells', 'MLB') LIMIT 3) t)    AS wells_mlb_top3,
  (SELECT string_agg(display_name, ', ') FROM (SELECT display_name FROM resolve_player('Johnson', 'NBA') LIMIT 3) t)  AS johnson_nba_top3,
  (SELECT string_agg(display_name, ', ') FROM (SELECT display_name FROM resolve_player('Smith', 'NFL') LIMIT 3) t)    AS smith_nfl_top3,
  (SELECT string_agg(display_name, ', ') FROM (SELECT display_name FROM resolve_player('Martinez', 'MLB') LIMIT 3) t) AS martinez_mlb_top3,
  (SELECT count(*) FROM resolve_player('Johnson', 'MLB'))                                            AS johnson_mlb_rows,
  (SELECT min(status) || ':' || min(display_name) FROM resolve_player('Greg Maddx', 'MLB'))          AS typo_still_resolves,
  (SELECT min(status) FROM resolve_player('Burrell', 'MLB'))                                         AS surname_never_resolves,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Ken Griffey', 'MLB')) AS namesakes,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261002_resolve_player_021') AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name = 'backup_20261002_resolve_player_021' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants,
  (SELECT has_function_privilege('anon', 'resolve_player(text,text)', 'EXECUTE'))                   AS anon_can_call;
-- EXPECTED: function_backed_up = 1; max_suggestions = 10; wells_mlb_top3 = Austin Wells, David Wells, Vernon Wells; johnson_nba_top3 = Magic Johnson, Mitch Johnson, Jalen Johnson; smith_nfl_top3 = Jaxon Smith-Njigba, Geno Smith, Emmitt Smith; martinez_mlb_top3 = Buck Martinez, Pedro Mart<U+00ED>nez, Edgar Mart<U+00ED>nez; johnson_mlb_rows = 10; typo_still_resolves = resolved:Greg Maddux; surname_never_resolves = suggest; namesakes = ambiguous:Ken Griffey Jr. | ambiguous:Ken Griffey Sr.; backup_rls = true; backup_browser_grants = 0; anon_can_call = true

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- BEGIN;
-- DO $rb$ BEGIN EXECUTE (SELECT definition FROM backup_20261002_resolve_player_021); END $rb$;
-- DELETE FROM name_match_settings WHERE name = 'max_suggestions';
-- DROP TABLE backup_20261002_resolve_player_021;
-- COMMIT;
