-- Migration 018e: no surname-only matches (typo rule + surname nicknames) + "The Rocket" (MLB)
-- Run in Supabase SQL Editor AFTER 018d. One small transaction. PURE ASCII.
-- 0. BACKUP: the current resolve_player definition (text) and the curated alias rows, so both can
--    be put back exactly. Both backup tables: RLS on, no browser access.
-- 1. resolve_player: a typo match now resolves only if the typed name has at least as many words
--    as the alias it matched. "Burrell" no longer resolves to Pat Burrell; it gets the did-you-mean
--    list. Everything else is unchanged (exact / without suffix / nickname / chooser rules).
--    CREATE OR REPLACE keeps the existing grants; pg_trgm's schema is set again (looked up).
-- 2. Nickname "The Rocket" -> Roger Clemens (MLB). NHL "The Rocket" (Maurice Richard) is
--    unaffected: nicknames only match players with facts in the sport being played.
-- 3. Removes Wikidata "nicknames" that are only the player's surname ("Jones" -> Eddie Jones),
--    so a surname alone never resolves. Backed up in backup_20260926_surname_nicknames_018e.

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20260926_resolve_player_018e AS
  SELECT pg_get_functiondef('public.resolve_player(text, text)'::regprocedure) AS definition;
ALTER TABLE backup_20260926_resolve_player_018e ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_resolve_player_018e FROM anon, authenticated;
CREATE TABLE backup_20260926_curated_aliases_018e AS SELECT * FROM player_aliases WHERE curated;
ALTER TABLE backup_20260926_curated_aliases_018e ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_curated_aliases_018e FROM anon, authenticated;

-- --- 1. resolve_player --------------------------------------------------------------------
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
  v_min   REAL; v_lead REAL; v_floor REAL; v_max INT;
  v_top   REAL; v_second REAL;
  v_pids  BIGINT[]; v_sims REAL[]; v_words INT[];
BEGIN
  IF length(v_base) < 2 THEN
    RETURN QUERY SELECT 'none'::TEXT, NULL::TEXT, NULL::BIGINT, NULL::TEXT, NULL::TEXT, NULL::REAL; RETURN;
  END IF;
  SELECT value INTO v_min   FROM name_match_settings WHERE name = 'min_similarity';
  SELECT value INTO v_lead  FROM name_match_settings WHERE name = 'min_lead';
  SELECT value INTO v_floor FROM name_match_settings WHERE name = 'suggest_floor';
  SELECT value::INT INTO v_max FROM name_match_settings WHERE name = 'max_choices';

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
    RETURN QUERY SELECT 'ambiguous'::TEXT, v_kind, p.id, p.display_name, player_detail(p.id, p_sport), 1::REAL
                   FROM players p WHERE p.id = ANY (v_ids)
                  ORDER BY p.display_name COLLATE "C", p.id LIMIT v_max;
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
  IF v_top IS NULL OR v_top < v_floor THEN
    RETURN QUERY SELECT 'none'::TEXT, NULL::TEXT, NULL::BIGINT, NULL::TEXT, NULL::TEXT, NULL::REAL; RETURN;
  END IF;
  IF v_top >= v_min AND v_top - v_second >= v_lead
     AND array_length(string_to_array(v_base, ' '), 1) >= v_words[1] THEN
    RETURN QUERY SELECT 'resolved'::TEXT, 'typo'::TEXT, p.id, p.display_name, player_detail(p.id, p_sport), v_top
                   FROM players p WHERE p.id = v_pids[1];
    RETURN;
  END IF;
  RETURN QUERY SELECT 'suggest'::TEXT, 'typo'::TEXT, p.id, p.display_name, player_detail(p.id, p_sport), u.sim
                 FROM unnest(v_pids[1:v_max], v_sims[1:v_max]) WITH ORDINALITY AS u(pid, sim, ord)
                 JOIN players p ON p.id = u.pid
                ORDER BY u.ord;
END;
$$;

DO $mig$
DECLARE tg TEXT;
BEGIN
  SELECT n.nspname INTO tg FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pg_trgm';
  IF tg IS NULL THEN RAISE EXCEPTION 'Migration 018e needs the pg_trgm extension; it is not installed.'; END IF;
  EXECUTE format('ALTER FUNCTION public.resolve_player(TEXT, TEXT) SET search_path = public, %I, pg_temp', tg);
END
$mig$;

-- --- 2. "The Rocket" (MLB) ------------------------------------------------------------------
DO $mig$
DECLARE n INT; pid BIGINT;
BEGIN
  SELECT count(*), min(p.id) INTO n, pid FROM players p WHERE p.wikipedia_title = 'Roger Clemens'
     AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = 'MLB');
  IF n <> 1 THEN RAISE EXCEPTION '018e: expected exactly one MLB Roger Clemens, found %. Nothing changed.', n; END IF;
  INSERT INTO player_aliases (player_id, alias, alias_exact, alias_norm, kind, source, curated)
  VALUES (pid, 'The Rocket', normalize_name_exact('The Rocket'), normalize_name('The Rocket'), 'nickname', 'curated', true)
  ON CONFLICT (player_id, alias_exact) DO UPDATE SET curated = true WHERE player_aliases.kind = 'nickname';
END
$mig$;

-- --- 3. Surname-only nicknames (from Wikidata) --------------------------------------------
-- A Wikidata "nickname" that is just the player's surname ("Jones" for Eddie Jones, "Cruyff" for
-- Jordi Cruyff) would let a surname alone resolve. Removed (backed up first); only for players whose
-- name has 2+ words, so one-name players (Pele, Kaka) keep their alias. Curated rows are never touched.
CREATE TABLE backup_20260926_surname_nicknames_018e AS
  SELECT a.* FROM player_aliases a JOIN players p ON p.id = a.player_id
   WHERE a.kind = 'nickname' AND NOT a.curated AND position(' ' in a.alias_norm) = 0
     AND array_length(string_to_array(normalize_name(p.display_name), ' '), 1) >= 2
     AND a.alias_norm = (string_to_array(normalize_name(p.display_name), ' '))[array_length(string_to_array(normalize_name(p.display_name), ' '), 1)];
ALTER TABLE backup_20260926_surname_nicknames_018e ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_surname_nicknames_018e FROM anon, authenticated;
DELETE FROM player_aliases a USING backup_20260926_surname_nicknames_018e b WHERE a.id = b.id;

COMMIT;

-- --- 3. CHECKS (run after COMMIT; one row; permanent tables, catalogs and read-only calls) ---------
SELECT
  (SELECT count(*) FROM player_aliases WHERE curated)                                                   AS curated_rows,
  (SELECT count(*) FROM backup_20260926_resolve_player_018e WHERE definition LIKE '%v_floor%')          AS function_backed_up,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN ('backup_20260926_resolve_player_018e', 'backup_20260926_curated_aliases_018e')) AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name IN ('backup_20260926_resolve_player_018e', 'backup_20260926_curated_aliases_018e')
     AND grantee IN ('anon', 'authenticated'))                                                          AS backup_browser_grants,
  (SELECT count(*) FROM information_schema.role_routine_grants WHERE routine_name = 'resolve_player'
     AND grantee IN ('anon', 'authenticated'))                                                          AS resolve_grants_kept,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('The Rocket', 'MLB'))    AS r_rocket_mlb,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('The Rocket', 'NHL'))    AS r_rocket_nhl,
  (SELECT min(status) || ' x' || count(*) FROM resolve_player('Burrell', 'MLB'))                         AS r_surname_burrell,
  (SELECT min(status) || ' x' || count(*) FROM resolve_player('Mascherano', 'Soccer'))                   AS r_surname_mascherano,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ') FROM resolve_player('Olamide Zaccheus', 'NFL')) AS r_typo_two_words,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ') FROM resolve_player('Ken Grifey Jr', 'MLB'))   AS r_typo_suffix,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ') FROM resolve_player('Ichiro', 'MLB'))          AS r_mononym_nickname,
  (SELECT count(*) FROM backup_20260926_surname_nicknames_018e)                                          AS surname_nicknames_removed,
  (SELECT count(*) FROM player_aliases a JOIN backup_20260926_surname_nicknames_018e b ON b.id = a.id)   AS surname_nicknames_left,
  (SELECT min(status) FROM resolve_player('Cruyff', 'Soccer'))                                           AS r_surname_cruyff,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ') FROM resolve_player('Totti', 'Soccer'))       AS r_surname_totti,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ') FROM resolve_player(U&'Pel\00E9', 'Soccer')) AS r_one_name_pele;
-- EXPECTED: curated_rows = 63; function_backed_up = 1; backup_rls = true; backup_browser_grants = 0; resolve_grants_kept = 2; r_rocket_mlb = resolved:Roger Clemens; r_rocket_nhl = resolved:Maurice Richard; r_surname_burrell = suggest x6; r_surname_mascherano = suggest x2; r_typo_two_words = resolved:typo:Olamide Zaccheaus; r_typo_suffix = suggest:typo:Ken Griffey Jr. | suggest:typo:Ken Griffey Sr. | suggest:typo:Ken Grundt | suggest:typo:Ken Giles; r_mononym_nickname = resolved:nickname:Ichiro Suzuki; surname_nicknames_removed = 126; surname_nicknames_left = 0; r_surname_cruyff = suggest; r_surname_totti = suggest:typo:Francesco Totti | suggest:typo:Tote | suggest:typo:Toti Gomes; r_one_name_pele = resolved:exact:Pel<U+00E9>

-- --- ROLLBACK (only if needed) -----------------------------------------------------------------------
-- BEGIN;
-- DO $rb$ BEGIN EXECUTE (SELECT definition FROM backup_20260926_resolve_player_018e); END $rb$;
-- DELETE FROM player_aliases a WHERE a.curated AND a.source = 'curated'
--   AND NOT EXISTS (SELECT 1 FROM backup_20260926_curated_aliases_018e b WHERE b.id = a.id);
-- UPDATE player_aliases a SET curated = false WHERE a.curated
--   AND NOT EXISTS (SELECT 1 FROM backup_20260926_curated_aliases_018e b WHERE b.id = a.id);
-- INSERT INTO player_aliases (id, player_id, alias, alias_exact, alias_norm, kind, source, curated)
--   OVERRIDING SYSTEM VALUE SELECT id, player_id, alias, alias_exact, alias_norm, kind, source, curated
--   FROM backup_20260926_surname_nicknames_018e;
-- COMMIT;
