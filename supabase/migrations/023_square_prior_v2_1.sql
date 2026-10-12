-- Migration 023: rarity prior v2.1 = v2 with the geometric mean of the two tenures on team x team squares
-- Run in Supabase SQL Editor. One small transaction. PURE ASCII.
-- Approved 11 Oct 2026 (after blind test #3: team x team #1 v3 12/16 vs v2 10/16).
--   Adds a NEW function get_square_prior_v2_1. Identical to get_square_prior (020b-1) except team x team
--   squares use sqrt(tenure with team A x tenure with team B) instead of the smaller of the two.
--   Award, championship, stat and attribute squares are unchanged (v2).
--   get_square_prior itself is NOT changed: production keeps using it until the app is switched
--   (preview first). Afterwards get_square_prior can be dropped in a later migration.
-- 0. GUARD: stops with a clear message if already applied. No data changes, so no data backup.

BEGIN;

DO $mig$
BEGIN
  IF to_regprocedure('public.get_square_prior_v2_1(text, text, text, boolean, text, text, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 023 is already applied (found function get_square_prior_v2_1). Nothing changed.';
  END IF;
  IF to_regclass('public.prior_tenure') IS NULL OR to_regclass('public.prior_times') IS NULL OR to_regclass('public.prior_views') IS NULL THEN
    RAISE EXCEPTION 'Migration 023 needs the prior tables from 020b-1. Nothing changed.';
  END IF;
END
$mig$;

CREATE FUNCTION get_square_prior_v2_1(
  p_sport TEXT,
  p_row_type TEXT, p_row_value TEXT, p_row_is_team BOOLEAN,
  p_col_type TEXT, p_col_value TEXT, p_col_is_team BOOLEAN)
RETURNS TABLE (player_id BIGINT, prior_pct DOUBLE PRECISION)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $fn$
  WITH pool AS (
    SELECT f.player_id FROM player_facts f
     WHERE f.sport = p_sport AND f.fact_type = p_row_type AND f.fact_value = p_row_value AND f.player_id IS NOT NULL
    INTERSECT
    SELECT f.player_id FROM player_facts f
     WHERE f.sport = p_sport AND f.fact_type = p_col_type AND f.fact_value = p_col_value AND f.player_id IS NOT NULL
  ),
  cat AS (   -- the team category is the row when the row is a team, else the column
    SELECT CASE WHEN p_row_is_team THEN p_row_value  ELSE p_col_value  END AS team_value,
           CASE WHEN p_row_is_team THEN p_col_type   ELSE p_row_type   END AS other_type,
           CASE WHEN p_row_is_team THEN p_col_value  ELSE p_row_value  END AS other_value,
           CASE WHEN p_row_is_team THEN p_col_is_team ELSE p_row_is_team END AS other_is_team
  ),
  scored AS (
    SELECT pool.player_id,
           CASE WHEN c.other_is_team THEN sqrt(COALESCE(t1.tenure, 0) * COALESCE(t2.tenure, 0))   -- v2.1: geometric mean (was LEAST)
                ELSE COALESCE(t1.tenure, 0) END::DOUBLE PRECISION AS tenure,
           CASE WHEN c.other_is_team THEN 1
                WHEN c.other_type = 'mlb_all_star' THEN COALESCE(ta.times, 0)
                WHEN EXISTS (SELECT 1 FROM prior_times x WHERE x.fact_type = c.other_type) THEN COALESCE(tc.times, 0)
                ELSE 1 END::DOUBLE PRECISION AS times,
           COALESCE(v.pageviews_12m, 0)::DOUBLE PRECISION AS views
      FROM pool CROSS JOIN cat c
      LEFT JOIN prior_tenure t1 ON t1.player_id = pool.player_id AND t1.sport = p_sport AND t1.team = c.team_value
      LEFT JOIN prior_tenure t2 ON t2.player_id = pool.player_id AND t2.sport = p_sport AND t2.team = c.other_value
      LEFT JOIN prior_times  ta ON ta.player_id = pool.player_id AND ta.fact_type = 'mlb_all_star' AND ta.team = c.team_value
      LEFT JOIN prior_times  tc ON tc.player_id = pool.player_id AND tc.fact_type = c.other_type AND tc.team = ''
      LEFT JOIN prior_views  v  ON v.player_id = pool.player_id
  ),
  ranked AS (
    SELECT s.player_id,
           exp(-0.55 * (row_number() OVER (ORDER BY GREATEST(s.tenure, 0.1) * GREATEST(s.times, 0.5) * power(s.views + 100, 0.25) DESC,
                                                    s.views DESC, s.player_id) - 1)) AS w
      FROM scored s
  )
  SELECT r.player_id, GREATEST(0.01, r.w / SUM(r.w) OVER () * 100) FROM ranked r;
$fn$;
REVOKE ALL ON FUNCTION get_square_prior_v2_1(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_square_prior_v2_1(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN) TO anon, authenticated;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM pg_proc WHERE proname IN ('get_square_prior', 'get_square_prior_v2_1'))  AS functions,
  (SELECT string_agg(pl.display_name, ', ' ORDER BY q.prior_pct DESC)
     FROM (SELECT * FROM get_square_prior_v2_1('NBA', 'played_for_team', 'Celtics', true, 'played_for_team', 'Nets', true)
           ORDER BY prior_pct DESC LIMIT 3) q JOIN players pl ON pl.id = q.player_id)                AS celtics_nets_top3,
  (SELECT string_agg(pl.display_name, ', ' ORDER BY q.prior_pct DESC)
     FROM (SELECT * FROM get_square_prior('NBA', 'played_for_team', 'Celtics', true, 'played_for_team', 'Nets', true)
           ORDER BY prior_pct DESC LIMIT 3) q JOIN players pl ON pl.id = q.player_id)                AS celtics_nets_top3_old,
  (SELECT string_agg(pl.display_name || ' ' || round(q.prior_pct::numeric, 1), ', ' ORDER BY q.prior_pct DESC)
     FROM (SELECT * FROM get_square_prior_v2_1('NBA', 'played_for_team', 'Suns', true, 'nba_mvp', 'true', false)
           ORDER BY prior_pct DESC LIMIT 3) q JOIN players pl ON pl.id = q.player_id)                AS suns_mvp_top3_unchanged,
  (SELECT prosecdef FROM pg_proc WHERE proname = 'get_square_prior_v2_1')                             AS security_definer,
  (SELECT has_function_privilege('anon', 'get_square_prior_v2_1(text,text,text,boolean,text,text,boolean)', 'EXECUTE')) AS anon_can_call;
-- EXPECTED: functions = 2; celtics_nets_top3 = Paul Pierce, Kevin Garnett, Brian Scalabrine; celtics_nets_top3_old = Brian Scalabrine, Kenny Anderson, Kyrie Irving; suns_mvp_top3_unchanged = Steve Nash 47.6, Charles Barkley 27.4, Kevin Durant 15.8; security_definer = true; anon_can_call = true
-- A second run stops with: Migration 023 is already applied (found function get_square_prior_v2_1). Nothing changed.

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- DROP FUNCTION get_square_prior_v2_1(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN);
