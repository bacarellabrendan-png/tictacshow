-- Migration 020b-1: rarity prior formula v2 on the server (get_square_prior)
-- Run in Supabase SQL Editor AFTER 020b-0 and after the staging load is verified. One transaction. PURE ASCII.
-- Approved 1 Oct 2026 (step G). Formula v2, exactly as locked for blind test #2 (rarity/LOCK2.txt):
--   score  = max(tenure, 0.1) x max(times, 0.5) x (views + 100) ^ 0.25
--   tenure = seasons with the square's team; team x team squares use the SMALLER of the two
--   times  = award count when the other category is a counted award (NBA MVP/DPOY/ROY/Sixth Man/
--            Finals MVP, NHL Hart/Norris/Vezina, MLB MVP/Cy Young/ROY, NFL Pro Bowl), MLB All-Star
--            selections with the square's franchise; 1 for team x team and every other category
--   rank by score (ties: more views, then lower player id); prior % = e^(-0.55 rank), normalised, min 0.01%
-- Valid players = owners of both facts (generic values, as the app's board uses).
-- 1. GUARD: staging row counts and md5 fingerprints match the locked files exactly; all page ids known.
-- 2. prior_tenure, prior_times, prior_views: keyed by player id. RLS on, no browser access; the app
--    reads them only through get_square_prior (SECURITY DEFINER, read-only).
-- 3. get_square_prior(sport, row fact type/value/is-team, col fact type/value/is-team).
-- 4. Staging tables dropped. Nothing existing is changed: player_pageviews stays as it is until the
--    app switch, so today's production prior is untouched by this migration.

BEGIN;

DO $mig$
DECLARE n BIGINT; h TEXT;
BEGIN
  -- --- 1. GUARD ------------------------------------------------------------------------------
  SELECT count(*), md5(string_agg(concat_ws('|', wikipedia_page_id, sport, team, tenure::text), E'\n'
           ORDER BY concat_ws('|', wikipedia_page_id, sport, team, tenure::text) COLLATE "C"))
    INTO n, h FROM stage_prior_tenure;
  IF n <> 148385 OR h <> '15a7e42eb00fb89603e419af29def244' THEN RAISE EXCEPTION '020b-1 guard: tenure staging % rows, md5 % (expected 148385, 15a7e42eb00fb89603e419af29def244)', n, h; END IF;
  SELECT count(*), md5(string_agg(concat_ws('|', wikipedia_page_id, sport, fact_type, team, times), E'\n'
           ORDER BY concat_ws('|', wikipedia_page_id, sport, fact_type, team, times) COLLATE "C"))
    INTO n, h FROM stage_prior_times;
  IF n <> 5463 OR h <> 'b006f59728b7b2c667122d76aa70747e' THEN RAISE EXCEPTION '020b-1 guard: times staging % rows, md5 % (expected 5463, b006f59728b7b2c667122d76aa70747e)', n, h; END IF;
  SELECT count(*), md5(string_agg(concat_ws('|', wikipedia_page_id, pageviews_12m, redirect_views), E'\n'
           ORDER BY concat_ws('|', wikipedia_page_id, pageviews_12m, redirect_views) COLLATE "C"))
    INTO n, h FROM stage_prior_views;
  IF n <> 77072 OR h <> '4a254b6e161db1c4f05133be29ed2e54' THEN RAISE EXCEPTION '020b-1 guard: views staging % rows, md5 % (expected 77072, 4a254b6e161db1c4f05133be29ed2e54)', n, h; END IF;
  SELECT (SELECT count(*) FROM stage_prior_tenure s WHERE NOT EXISTS (SELECT 1 FROM players p WHERE p.wikipedia_page_id = s.wikipedia_page_id))
       + (SELECT count(*) FROM stage_prior_times s WHERE NOT EXISTS (SELECT 1 FROM players p WHERE p.wikipedia_page_id = s.wikipedia_page_id))
       + (SELECT count(*) FROM stage_prior_views s WHERE NOT EXISTS (SELECT 1 FROM players p WHERE p.wikipedia_page_id = s.wikipedia_page_id))
    INTO n;
  IF n <> 0 THEN RAISE EXCEPTION '020b-1 guard: % staging rows have no player (expected 0)', n; END IF;
END
$mig$;

-- --- 2. PRIOR TABLES (RLS on, no browser access) ------------------------------------------
CREATE TABLE prior_tenure (
  player_id BIGINT  NOT NULL REFERENCES players(id),
  sport     TEXT    NOT NULL,
  team      TEXT    NOT NULL,
  tenure    NUMERIC NOT NULL,
  PRIMARY KEY (player_id, sport, team)
);
CREATE TABLE prior_times (
  player_id BIGINT  NOT NULL REFERENCES players(id),
  sport     TEXT    NOT NULL,
  fact_type TEXT    NOT NULL,
  team      TEXT    NOT NULL,
  times     INT     NOT NULL,
  PRIMARY KEY (player_id, fact_type, team)
);
CREATE TABLE prior_views (
  player_id      BIGINT PRIMARY KEY REFERENCES players(id),
  pageviews_12m  BIGINT NOT NULL,
  redirect_views BIGINT NOT NULL,
  source         TEXT   NOT NULL
);
CREATE INDEX prior_times_fact_type ON prior_times (fact_type);
ALTER TABLE prior_tenure ENABLE ROW LEVEL SECURITY;
ALTER TABLE prior_times  ENABLE ROW LEVEL SECURITY;
ALTER TABLE prior_views  ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON prior_tenure, prior_times, prior_views FROM anon, authenticated;

INSERT INTO prior_tenure (player_id, sport, team, tenure)
  SELECT p.id, s.sport, s.team, s.tenure FROM stage_prior_tenure s JOIN players p ON p.wikipedia_page_id = s.wikipedia_page_id;
INSERT INTO prior_times (player_id, sport, fact_type, team, times)
  SELECT p.id, s.sport, s.fact_type, s.team, s.times FROM stage_prior_times s JOIN players p ON p.wikipedia_page_id = s.wikipedia_page_id;
INSERT INTO prior_views (player_id, pageviews_12m, redirect_views, source)
  SELECT p.id, s.pageviews_12m, s.redirect_views, 'Wikimedia pageview_complete monthly dumps 2025-09..2026-08 (user agents, en.wikipedia, by page id)'
    FROM stage_prior_views s JOIN players p ON p.wikipedia_page_id = s.wikipedia_page_id;

-- --- 3. get_square_prior ---------------------------------------------------------------------
CREATE FUNCTION get_square_prior(
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
           CASE WHEN c.other_is_team THEN LEAST(COALESCE(t1.tenure, 0), COALESCE(t2.tenure, 0))
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
REVOKE ALL ON FUNCTION get_square_prior(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_square_prior(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN) TO anon, authenticated;

-- --- 4. STAGING DROPPED ----------------------------------------------------------------------
DROP TABLE stage_prior_tenure, stage_prior_times, stage_prior_views;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM prior_tenure)                                                            AS tenure_rows,
  (SELECT count(*) FROM prior_times)                                                             AS times_rows,
  (SELECT count(*) FROM prior_views)                                                             AS views_rows,
  (SELECT count(DISTINCT f.player_id) FROM player_facts f WHERE f.player_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM prior_views v WHERE v.player_id = f.player_id))              AS owners_without_views,
  (SELECT string_agg(pl.display_name || ' ' || round(q.prior_pct::numeric, 1), ', ' ORDER BY q.prior_pct DESC)
     FROM (SELECT * FROM get_square_prior('NBA', 'played_for_team', 'Suns', true, 'nba_mvp', 'true', false)
           ORDER BY prior_pct DESC LIMIT 3) q JOIN players pl ON pl.id = q.player_id)            AS suns_mvp_top3,
  (SELECT string_agg(pl.display_name, ', ' ORDER BY q.prior_pct DESC)
     FROM (SELECT * FROM get_square_prior('NHL', 'played_for_team', 'Rangers', true, 'played_for_team', 'Oilers', true)
           ORDER BY prior_pct DESC LIMIT 2) q JOIN players pl ON pl.id = q.player_id)            AS rangers_oilers_top2,
  (SELECT count(*) FROM get_square_prior('MLB', 'played_for_team', 'Cardinals', true, 'mlb_all_star', 'true', false) q
     JOIN players pl ON pl.id = q.player_id WHERE pl.wikipedia_page_id = 280101)                    AS musial_cardinals_allstar,
  (SELECT count(*) FROM pg_class WHERE relname LIKE 'stage_prior_%')                             AS staging_left,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN ('prior_tenure', 'prior_times', 'prior_views')) AS rls_on,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name IN ('prior_tenure', 'prior_times', 'prior_views') AND grantee IN ('anon', 'authenticated')) AS browser_grants,
  (SELECT prosecdef FROM pg_proc WHERE proname = 'get_square_prior')                             AS security_definer,
  (SELECT has_function_privilege('anon', 'get_square_prior(text,text,text,boolean,text,text,boolean)', 'EXECUTE')) AS anon_can_call;
-- EXPECTED: tenure_rows = 148385; times_rows = 5463; views_rows = 77072; owners_without_views = 0;
--   suns_mvp_top3 = Steve Nash 47.6, Charles Barkley 27.4, Kevin Durant 15.8; rangers_oilers_top2 = Mark Messier, Wayne Gretzky; musial_cardinals_allstar = 1 (020a must run first);
--   staging_left = 0; rls_on = true; browser_grants = 0; security_definer = true; anon_can_call = true

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- DROP FUNCTION get_square_prior(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT, BOOLEAN);
-- DROP TABLE prior_tenure, prior_times, prior_views;
