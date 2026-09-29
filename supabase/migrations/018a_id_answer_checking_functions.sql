-- Migration 018a: ID-based answer checking - new columns + functions (no data changes)
-- Run in Supabase SQL Editor. Steps 1-7 run as one transaction. PURE ASCII.
-- Adds functions NEXT TO the old name-based ones; the live app keeps using the old ones until
-- the ruling comparison is approved. Nothing existing is modified or removed, so no backup.
-- Small and fast (schema + function definitions only).
-- Checks were run ALONE in a fresh session on a full local copy of the live database as of 017
-- (pg_trgm in public, unaccent in extensions; all facts, players, aliases).
--
-- 1. Columns: players.birth_year, players.main_team (filled by 018b);
--    answer_submissions.player_id; moves.p1_player_id / p2_player_id (same-answer by player).
-- 2. players becomes publicly READABLE (display names, years, positions, main team) - the
--    board generator needs display names in the browser. Aliases/staging/settings stay closed.
-- 3. name_match_settings: typo thresholds (0.6 similarity, 0.15 lead) tunable without code.
-- 4. player_detail(id, sport): "1989-2010 . OF . Mariners" / Soccer "born 1987 . FW . Barcelona"
--    (the separator is U+00B7, written as an escape). Empty until 018b fills the columns.
-- 5. resolve_player(text, sport) -> rows of (status, match_kind, player_id, display_name,
--    detail, similarity). status: resolved | ambiguous | suggest | none.
--      exact alias (not nicknames) -> name without Jr/Sr/II -> nickname -> typo match.
--      NEVER GUESS: a name typed WITHOUT a suffix that matches several players differing only
--      by suffix is ambiguous ("Ken Griffey", "Gary Payton"). Nicknames resolve only when
--      unique within the sport. A typo resolves only with one clear winner (>= min_similarity
--      and >= min_lead ahead of the runner-up); otherwise "suggest" (did you mean).
--    Only players who OWN at least one fact in that sport are candidates.
-- 6. autocomplete_players_v2(query, sport, limit): one row per player with the detail line.
--    validate_answer_v2(player_id, sport, rules): owned facts only.
--    record_answer_v3(..., answer, player_id): records by player id; an ambiguous or
--    suggest-only name returns {status: "choose", kind, candidates} and records nothing.
--    get_square_counts_v2(question_key): valid submissions per player id.
-- 7. Functions that use pg_trgm get pg_trgm's actual schema on their search_path (looked up).

BEGIN;

-- --- 1. COLUMNS -------------------------------------------------------------------
ALTER TABLE players ADD COLUMN IF NOT EXISTS birth_year INT;
ALTER TABLE players ADD COLUMN IF NOT EXISTS main_team  TEXT;
ALTER TABLE answer_submissions ADD COLUMN IF NOT EXISTS player_id BIGINT REFERENCES players(id);
ALTER TABLE moves ADD COLUMN IF NOT EXISTS p1_player_id BIGINT REFERENCES players(id);
ALTER TABLE moves ADD COLUMN IF NOT EXISTS p2_player_id BIGINT REFERENCES players(id);
CREATE INDEX IF NOT EXISTS answer_submissions_square_player ON answer_submissions (question_key, player_id) WHERE valid;

-- --- 2. PLAYERS READABLE ------------------------------------------------------------
CREATE POLICY players_public_read ON players FOR SELECT USING (true);
GRANT SELECT ON players TO anon, authenticated;

-- --- 3. SETTINGS ----------------------------------------------------------------------
CREATE TABLE name_match_settings (
  name  TEXT PRIMARY KEY,
  value REAL NOT NULL,
  note  TEXT
);
ALTER TABLE name_match_settings ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON name_match_settings FROM anon, authenticated;
INSERT INTO name_match_settings (name, value, note) VALUES
  ('min_similarity', 0.6,  'a typo match resolves only at or above this trigram similarity'),
  ('min_lead',       0.15, '... and only this far ahead of the next player'),
  ('suggest_floor',  0.3,  'below this, no did-you-mean suggestions'),
  ('max_choices',    6,    'most players shown in a chooser');

-- --- 4. DETAIL LINE -------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.player_detail(p_player_id BIGINT, p_sport TEXT)
RETURNS TEXT
LANGUAGE sql STABLE
SET search_path = public, pg_temp
AS $$
  SELECT nullif(concat_ws(U&' \00B7 ',
           CASE WHEN p_sport = 'Soccer' THEN 'born ' || p.birth_year::text
                WHEN p.first_year IS NULL THEN NULL
                WHEN p.first_year = p.last_year OR p.last_year IS NULL THEN p.first_year::text
                ELSE p.first_year::text || '-' || p.last_year::text END,
           nullif(p.positions, ''),
           nullif(p.main_team, '')), '')
    FROM players p WHERE p.id = p_player_id
$$;

-- --- 5. RESOLVER ----------------------------------------------------------------------
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
  v_pids  BIGINT[]; v_sims REAL[];
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

  -- 4. typo match: resolves only with one clear winner (best similarity per player, ranked)
  PERFORM set_config('pg_trgm.similarity_threshold', v_floor::TEXT, true);
  SELECT array_agg(c.pid ORDER BY c.sim DESC, c.pid), array_agg(c.sim ORDER BY c.sim DESC, c.pid)
    INTO v_pids, v_sims
    FROM (SELECT a.player_id AS pid, max(similarity(a.alias_norm, v_base)) AS sim
            FROM player_aliases a
           WHERE a.alias_norm % v_base AND a.kind <> 'nickname'
             AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport)
           GROUP BY a.player_id) c;
  v_top := v_sims[1]; v_second := coalesce(v_sims[2], 0);
  IF v_top IS NULL OR v_top < v_floor THEN
    RETURN QUERY SELECT 'none'::TEXT, NULL::TEXT, NULL::BIGINT, NULL::TEXT, NULL::TEXT, NULL::REAL; RETURN;
  END IF;
  IF v_top >= v_min AND v_top - v_second >= v_lead THEN
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

-- --- 6. AUTOCOMPLETE, VALIDATE, RECORD, COUNTS -----------------------------------------
CREATE OR REPLACE FUNCTION public.autocomplete_players_v2(p_query TEXT, p_sport TEXT, p_limit INT DEFAULT 8)
RETURNS TABLE (player_id BIGINT, display_name TEXT, detail TEXT, matched_alias TEXT)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE q TEXT := normalize_name(coalesce(p_query, ''));
BEGIN
  IF length(q) < 2 THEN RETURN; END IF;
  RETURN QUERY
  WITH hits AS (
    SELECT a.player_id AS pid, a.alias, a.kind,
           CASE WHEN a.alias_norm = q THEN 0 WHEN a.alias_norm LIKE q || '%' THEN 1 ELSE 2 END AS rnk
      FROM player_aliases a
     WHERE (a.alias_norm LIKE q || '%' OR a.alias_norm LIKE '% ' || q || '%')
       AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = a.player_id AND f.sport = p_sport)
  ), best AS (
    SELECT DISTINCT ON (h.pid) h.pid, h.alias, h.kind, h.rnk
      FROM hits h ORDER BY h.pid, h.rnk, (h.kind = 'nickname'), h.alias COLLATE "C"
  ), top AS (
    SELECT * FROM best ORDER BY rnk LIMIT 200
  )
  SELECT t.pid, p.display_name, player_detail(t.pid, p_sport),
         CASE WHEN t.kind = 'nickname' THEN t.alias END
    FROM top t JOIN players p ON p.id = t.pid
   ORDER BY t.rnk,
            (SELECT count(*) FROM player_facts f WHERE f.player_id = t.pid) DESC,
            p.display_name COLLATE "C"
   LIMIT greatest(1, least(coalesce(p_limit, 8), 20));
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_answer_v2(p_player_id BIGINT, p_sport TEXT, p_rules JSONB)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT p_player_id IS NOT NULL
     AND jsonb_typeof(p_rules) = 'array' AND jsonb_array_length(p_rules) > 0
     AND NOT EXISTS (
       SELECT 1 FROM jsonb_array_elements(p_rules) r
        WHERE NOT EXISTS (
          SELECT 1 FROM player_facts f
           WHERE f.player_id = p_player_id AND f.sport = p_sport
             AND f.fact_type = r->>'fact_type'
             AND (NOT (r ? 'fact_value') OR f.fact_value = r->>'fact_value')))
$$;

CREATE OR REPLACE FUNCTION public.record_answer_v3(
  p_submission_key TEXT, p_game_mode TEXT, p_question_key TEXT, p_sport TEXT,
  p_rules JSONB, p_answer TEXT, p_player_id BIGINT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_game TEXT; v_move TEXT; v_role TEXT;
  v_typed TEXT := btrim(coalesce(p_answer, ''));
  v_pid BIGINT; v_name TEXT; v_kind TEXT; v_valid BOOLEAN; v_key TEXT; v_id BIGINT;
  v_status TEXT; v_choices JSONB;
BEGIN
  IF p_submission_key IS NULL
     OR p_submission_key !~ '^[A-Za-z0-9-]{1,64}:[A-Za-z0-9-]{1,64}:(p1|p2)$' THEN RETURN NULL; END IF;
  IF p_game_mode NOT IN ('multiplayer', 'cpu') THEN RETURN NULL; END IF;
  IF p_question_key IS NULL OR length(p_question_key) > 120
     OR p_question_key !~ '^[a-z0-9_]+__[a-z0-9_]+$' THEN RETURN NULL; END IF;
  IF answer_stats_sport(p_question_key) IS DISTINCT FROM p_sport THEN RETURN NULL; END IF;
  IF length(v_typed) = 0 OR length(v_typed) > 80 THEN RETURN NULL; END IF;
  IF jsonb_typeof(p_rules) IS DISTINCT FROM 'array' OR jsonb_array_length(p_rules) <> 2 THEN RETURN NULL; END IF;
  v_game := split_part(p_submission_key, ':', 1);
  v_move := split_part(p_submission_key, ':', 2);
  v_role := split_part(p_submission_key, ':', 3);
  IF p_game_mode = 'multiplayer'
     AND v_game !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN RETURN NULL; END IF;
  IF p_game_mode = 'cpu' AND (v_game !~ '^cpu-' OR v_role <> 'p1') THEN RETURN NULL; END IF;

  IF p_player_id IS NOT NULL THEN
    -- chosen from autocomplete or the chooser: must be a player with facts in this sport
    IF NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p_player_id AND f.sport = p_sport) THEN RETURN NULL; END IF;
    v_pid := p_player_id; v_kind := 'chosen';
  ELSE
    SELECT r.status, r.match_kind INTO v_status, v_kind FROM resolve_player(v_typed, p_sport) r LIMIT 1;
    IF v_status IN ('ambiguous', 'suggest') THEN
      SELECT jsonb_agg(jsonb_build_object('player_id', r.player_id, 'display_name', r.display_name, 'detail', r.detail))
        INTO v_choices FROM resolve_player(v_typed, p_sport) r;
      RETURN jsonb_build_object('status', 'choose', 'kind', v_status, 'candidates', v_choices);
    ELSIF v_status = 'resolved' THEN
      SELECT r.player_id INTO v_pid FROM resolve_player(v_typed, p_sport) r LIMIT 1;
    END IF;
  END IF;

  v_valid := coalesce(validate_answer_v2(v_pid, p_sport, p_rules), false);
  IF v_pid IS NOT NULL THEN SELECT display_name INTO v_name FROM players WHERE id = v_pid; END IF;
  v_key := CASE WHEN v_pid IS NOT NULL THEN 'player:' || v_pid ELSE 'typed:' || normalize_name_exact(v_typed) END;

  INSERT INTO answer_submissions (
    submission_key, answer_key, game_mode, game_id, local_game_id, move_id, role, user_id,
    question_key, sport, row_category_id, col_category_id, typed_text, valid, player_name, player_id)
  VALUES (
    p_submission_key, v_key, p_game_mode,
    CASE WHEN p_game_mode = 'multiplayer' THEN v_game::uuid END,
    CASE WHEN p_game_mode = 'cpu' THEN v_game END,
    v_move, v_role, auth.uid(),
    p_question_key, p_sport,
    split_part(p_question_key, '__', 1), split_part(p_question_key, '__', 2),
    v_typed, v_valid, CASE WHEN v_valid THEN v_name END, v_pid)
  ON CONFLICT ON CONSTRAINT answer_submissions_once DO NOTHING
  RETURNING id INTO v_id;

  IF v_id IS NULL THEN
    SELECT s.id INTO v_id FROM answer_submissions s WHERE s.submission_key = p_submission_key AND s.answer_key = v_key;
    RETURN jsonb_build_object('status', 'recorded', 'id', v_id, 'valid', v_valid, 'player_id', v_pid, 'player_name', v_name, 'match_kind', v_kind, 'duplicate', true);
  END IF;
  RETURN jsonb_build_object('status', 'recorded', 'id', v_id, 'valid', v_valid, 'player_id', v_pid, 'player_name', v_name, 'match_kind', v_kind, 'duplicate', false);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_square_counts_v2(p_question_key TEXT)
RETURNS TABLE (player_id BIGINT, submissions BIGINT)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT s.player_id, count(*)::BIGINT FROM answer_submissions s
   WHERE s.question_key = p_question_key AND s.valid AND s.player_id IS NOT NULL
   GROUP BY s.player_id
$$;

REVOKE ALL ON FUNCTION public.player_detail(BIGINT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.resolve_player(TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.autocomplete_players_v2(TEXT, TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.validate_answer_v2(BIGINT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_answer_v3(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, BIGINT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_square_counts_v2(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.resolve_player(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.autocomplete_players_v2(TEXT, TEXT, INT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_answer_v2(BIGINT, TEXT, JSONB) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_answer_v3(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, BIGINT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_square_counts_v2(TEXT) TO anon, authenticated;

-- --- 7. pg_trgm's actual schema on the search_path of the functions that use it ---------
DO $mig$
DECLARE tg TEXT;
BEGIN
  SELECT n.nspname INTO tg FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pg_trgm';
  IF tg IS NULL THEN RAISE EXCEPTION 'Migration 018a needs the pg_trgm extension; it is not installed.'; END IF;
  EXECUTE format('ALTER FUNCTION public.resolve_player(TEXT, TEXT) SET search_path = public, %I, pg_temp', tg);
  EXECUTE format('ALTER FUNCTION public.autocomplete_players_v2(TEXT, TEXT, INT) SET search_path = public, %I, pg_temp', tg);
END
$mig$;

COMMIT;

-- --- 8. CHECKS (run after COMMIT; one row; permanent tables, catalogs and read-only calls) ---
SELECT
  (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname = 'public'
     AND p.proname IN ('player_detail', 'resolve_player', 'autocomplete_players_v2', 'validate_answer_v2',
                       'record_answer_v3', 'get_square_counts_v2'))                              AS functions,
  (SELECT count(*) FROM information_schema.columns WHERE table_schema = 'public' AND (
     (table_name = 'players' AND column_name IN ('birth_year', 'main_team')) OR
     (table_name = 'answer_submissions' AND column_name = 'player_id') OR
     (table_name = 'moves' AND column_name IN ('p1_player_id', 'p2_player_id'))))                AS new_columns,
  (SELECT count(*) FROM name_match_settings)                                                       AS settings,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'name_match_settings')                      AS settings_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'name_match_settings'
     AND grantee IN ('anon', 'authenticated'))                                                     AS settings_browser_grants,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'players'
     AND grantee IN ('anon', 'authenticated') AND privilege_type = 'SELECT')                       AS players_read_grants,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C")
     FROM resolve_player('Ken Griffey', 'MLB'))                                                    AS r_ken_griffey,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Ken Griffey Jr', 'MLB')) AS r_griffey_jr,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C")
     FROM resolve_player('Gary Payton', 'NBA'))                                                    AS r_gary_payton,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Gary Payton II', 'NBA')) AS r_payton_ii,
  (SELECT count(*) || ' ' || min(status) FROM resolve_player('Josh Johnson', 'NFL'))              AS r_josh_johnson_nfl,
  (SELECT string_agg(status || ':' || match_kind, ' | ')
     FROM resolve_player(U&'Iv\00E1n Rodr\00EDguez', 'MLB'))                                      AS r_ivan_rodriguez,
  (SELECT string_agg(status || ':' || match_kind, ' | ') FROM resolve_player('JR Smith', 'NBA'))  AS r_jr_smith,
  (SELECT string_agg(status || ':' || match_kind || ':' || display_name, ' | ')
     FROM resolve_player('Olamide Zaccheus', 'NFL'))                                               AS r_zaccheus_typo,
  (SELECT string_agg(status, ' | ') FROM resolve_player('SL Benfica', 'Soccer'))                  AS r_sl_benfica,
  validate_answer_v2((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Jr.'), 'MLB',
    '[{"fact_type":"played_for_team","fact_value":"Mariners"},{"fact_type":"mlb_mvp","fact_value":"true"}]'::jsonb) AS v_griffey_jr_mariners_mvp,
  validate_answer_v2((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Sr.'), 'MLB',
    '[{"fact_type":"played_for_team","fact_value":"Mariners"},{"fact_type":"mlb_mvp","fact_value":"true"}]'::jsonb) AS v_griffey_sr_mariners_mvp,
  (SELECT string_agg(display_name, ' | ') FROM autocomplete_players_v2('griffey', 'MLB', 8))     AS ac_griffey;
-- EXPECTED: functions = 6; new_columns = 5; settings = 4; settings_rls = true; settings_browser_grants = 0; players_read_grants = 2; r_ken_griffey = ambiguous:Ken Griffey Jr. | ambiguous:Ken Griffey Sr.; r_griffey_jr = resolved:Ken Griffey Jr.; r_gary_payton = ambiguous:Gary Payton | ambiguous:Gary Payton II; r_payton_ii = resolved:Gary Payton II; r_josh_johnson_nfl = 2 ambiguous; r_ivan_rodriguez = resolved:exact; r_jr_smith = resolved:exact; r_zaccheus_typo = resolved:typo:Olamide Zaccheaus; r_sl_benfica = none; v_griffey_jr_mariners_mvp = true; v_griffey_sr_mariners_mvp = false; ac_griffey = Ken Griffey Jr. | Ken Griffey Sr.

-- --- ROLLBACK (only if needed; nothing uses these yet) ---------------------------------
-- BEGIN;
-- DROP FUNCTION IF EXISTS public.get_square_counts_v2(TEXT);
-- DROP FUNCTION IF EXISTS public.record_answer_v3(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, BIGINT);
-- DROP FUNCTION IF EXISTS public.validate_answer_v2(BIGINT, TEXT, JSONB);
-- DROP FUNCTION IF EXISTS public.autocomplete_players_v2(TEXT, TEXT, INT);
-- DROP FUNCTION IF EXISTS public.resolve_player(TEXT, TEXT);
-- DROP FUNCTION IF EXISTS public.player_detail(BIGINT, TEXT);
-- DROP TABLE IF EXISTS name_match_settings;
-- REVOKE SELECT ON players FROM anon, authenticated; DROP POLICY IF EXISTS players_public_read ON players;
-- ALTER TABLE moves DROP COLUMN IF EXISTS p1_player_id, DROP COLUMN IF EXISTS p2_player_id;
-- ALTER TABLE answer_submissions DROP COLUMN IF EXISTS player_id;
-- ALTER TABLE players DROP COLUMN IF EXISTS birth_year, DROP COLUMN IF EXISTS main_team;
-- COMMIT;
