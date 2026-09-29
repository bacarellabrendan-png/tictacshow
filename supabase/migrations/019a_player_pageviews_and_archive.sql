-- Migration 019a: page-view estimate keyed by PLAYER ID (+ archive answer_stats)
-- Run in Supabase SQL Editor. One transaction. PURE ASCII.
-- The ID-based app looks up each answer's page-view estimate by player id and sport, never by name,
-- so no valid answer falls back to the 0.1% default. player_pageviews has one row for every
-- (player, sport) that owns a fact:
--   1. from player_fame (the current estimate, keyed by name) through each player's stored names;
--   2. 96 Soccer players player_fame has no row for (mostly the footballers added in 018f): their
--      own article's English Wikipedia views, Sep 2025 - Aug 2026.
-- Namesakes still share one page's views here; the re-seed that follows redirects and splits namesakes
-- is the next rarity step, after the switch.
-- 3. answer_stats is read by nothing (only record_answer v1 wrote it; replaced in 012): renamed to
--    archive_20260928_answer_stats, RLS on, no browser access. No data changes, so no backup.
-- player_fame is untouched (the live app reads it until the switch).

BEGIN;

CREATE TABLE player_pageviews (
  player_id     BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  sport         TEXT   NOT NULL,
  pageviews_12m BIGINT NOT NULL,
  source        TEXT   NOT NULL,
  PRIMARY KEY (player_id, sport)
);
ALTER TABLE player_pageviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY player_pageviews_public_read ON player_pageviews FOR SELECT USING (true);
REVOKE ALL ON player_pageviews FROM anon, authenticated;
GRANT SELECT ON player_pageviews TO anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  -- 1. from player_fame, by any stored name of the player in that sport (fact names + display name)
  INSERT INTO player_pageviews (player_id, sport, pageviews_12m, source)
  SELECT x.player_id, x.sport, max(pf.wikipedia_pageviews_12m), 'player_fame by name'
    FROM (SELECT DISTINCT f.player_id, f.sport, f.player_name AS nm FROM player_facts f WHERE f.player_id IS NOT NULL
          UNION
          SELECT DISTINCT f.player_id, f.sport, p.display_name FROM player_facts f JOIN players p ON p.id = f.player_id) x
    JOIN player_fame pf ON lower(pf.player_name) = lower(x.nm) AND pf.sport = x.sport
   GROUP BY x.player_id, x.sport;
  -- 2. players player_fame does not cover: their own article's views (by page id)
  INSERT INTO player_pageviews (player_id, sport, pageviews_12m, source)
  SELECT p.id, v.sport, v.views, 'wikipedia views 2025-09..2026-08 (019a)'
    FROM (VALUES
    (2134684, 'Soccer', 14488),
    (6013706, 'Soccer', 1041),
    (6117234, 'Soccer', 5870),
    (6288111, 'Soccer', 10292),
    (11688006, 'Soccer', 1445),
    (13607198, 'Soccer', 3215),
    (13740829, 'Soccer', 1337),
    (14109727, 'Soccer', 8112),
    (14201533, 'Soccer', 2218),
    (15756456, 'Soccer', 490),
    (16027571, 'Soccer', 1263),
    (16046321, 'Soccer', 1132),
    (16254964, 'Soccer', 2279),
    (18907848, 'Soccer', 2580),
    (18979226, 'Soccer', 3189),
    (19838353, 'Soccer', 1426),
    (21483609, 'Soccer', 1390),
    (22692255, 'Soccer', 276),
    (22907308, 'Soccer', 639),
    (24236991, 'Soccer', 400),
    (28335879, 'Soccer', 716),
    (31728539, 'Soccer', 663),
    (31809064, 'Soccer', 274),
    (31895241, 'Soccer', 328),
    (34655591, 'Soccer', 693),
    (36535624, 'Soccer', 904),
    (38339669, 'Soccer', 341),
    (40758679, 'Soccer', 389),
    (41568306, 'Soccer', 561),
    (41568579, 'Soccer', 501),
    (41568729, 'Soccer', 353),
    (43698723, 'Soccer', 556),
    (47664238, 'Soccer', 423),
    (48755338, 'Soccer', 430),
    (53623538, 'Soccer', 230),
    (54500588, 'Soccer', 13712),
    (59387816, 'Soccer', 407),
    (65892258, 'Soccer', 391),
    (67788346, 'Soccer', 418),
    (67793541, 'Soccer', 293),
    (67804290, 'Soccer', 410),
    (67804432, 'Soccer', 627),
    (67832807, 'Soccer', 338),
    (68027285, 'Soccer', 414),
    (68028875, 'Soccer', 371),
    (68028905, 'Soccer', 213),
    (68029098, 'Soccer', 182),
    (68029118, 'Soccer', 177),
    (68029150, 'Soccer', 367),
    (68029216, 'Soccer', 191),
    (68029269, 'Soccer', 232),
    (68035079, 'Soccer', 338),
    (68035341, 'Soccer', 480),
    (68035369, 'Soccer', 241),
    (68035475, 'Soccer', 643),
    (68035510, 'Soccer', 212),
    (68035542, 'Soccer', 320),
    (68037156, 'Soccer', 221),
    (68037181, 'Soccer', 200),
    (68037256, 'Soccer', 278),
    (68037297, 'Soccer', 347),
    (68037312, 'Soccer', 224),
    (68037386, 'Soccer', 347),
    (68037393, 'Soccer', 237),
    (68037419, 'Soccer', 266),
    (68043103, 'Soccer', 237),
    (68043114, 'Soccer', 180),
    (68043121, 'Soccer', 402),
    (68043136, 'Soccer', 197),
    (68043270, 'Soccer', 271),
    (68062411, 'Soccer', 320),
    (68062435, 'Soccer', 324),
    (68062461, 'Soccer', 223),
    (68062494, 'Soccer', 281),
    (68062514, 'Soccer', 329),
    (68062590, 'Soccer', 3038),
    (68062609, 'Soccer', 242),
    (68062618, 'Soccer', 146),
    (68062676, 'Soccer', 205),
    (68062692, 'Soccer', 375),
    (68062725, 'Soccer', 194),
    (68062772, 'Soccer', 194),
    (68062786, 'Soccer', 295),
    (68062822, 'Soccer', 140),
    (68066945, 'Soccer', 432),
    (68189840, 'Soccer', 279),
    (68189857, 'Soccer', 234),
    (68189879, 'Soccer', 261),
    (68218765, 'Soccer', 258),
    (76132726, 'Soccer', 380),
    (80762199, 'Soccer', 600),
    (81903015, 'Soccer', 224),
    (81904990, 'Soccer', 231),
    (81908527, 'Soccer', 243),
    (81909177, 'Soccer', 421),
    (81909879, 'Soccer', 154)
    ) AS v(page_id, sport, views)
    JOIN players p ON p.wikipedia_page_id = v.page_id
  ON CONFLICT (player_id, sport) DO NOTHING;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 96 THEN RAISE EXCEPTION '019a: expected 96 fetched estimates, inserted %', n; END IF;
END
$mig$;

-- 3. archive answer_stats
ALTER TABLE answer_stats RENAME TO archive_20260928_answer_stats;
ALTER TABLE archive_20260928_answer_stats ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON archive_20260928_answer_stats FROM anon, authenticated;

COMMIT;

-- --- CHECKS (run after COMMIT; one row; permanent tables and catalogs only) -------------------------
SELECT
  (SELECT count(*) FROM player_pageviews)                                                           AS estimates,
  (SELECT count(*) FROM player_pageviews WHERE source LIKE 'wikipedia views%')                       AS fetched_estimates,
  (SELECT coalesce(string_agg(sport || ' ' || n, ', ' ORDER BY sport), 'none') FROM (
     SELECT ps.sport, count(*) AS n FROM (SELECT DISTINCT player_id, sport FROM player_facts WHERE player_id IS NOT NULL) ps
      WHERE NOT EXISTS (SELECT 1 FROM player_pageviews v WHERE v.player_id = ps.player_id AND v.sport = ps.sport)
      GROUP BY ps.sport) m) AS players_without_estimate_by_sport,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'player_pageviews')                           AS pageviews_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'player_pageviews'
     AND grantee IN ('anon', 'authenticated') AND privilege_type = 'SELECT')                         AS pageviews_read_grants,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'player_pageviews'
     AND grantee IN ('anon', 'authenticated') AND privilege_type <> 'SELECT')                        AS pageviews_write_grants,
  (to_regclass('public.answer_stats') IS NULL)                                                       AS answer_stats_gone,
  (SELECT count(*) FROM archive_20260928_answer_stats)                                               AS archived_rows,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'archive_20260928_answer_stats')              AS archive_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'archive_20260928_answer_stats'
     AND grantee IN ('anon', 'authenticated'))                                                       AS archive_browser_grants;
-- EXPECTED: estimates = 77112; fetched_estimates = 96; players_without_estimate_by_sport = none; pageviews_rls = true; pageviews_read_grants = 2; pageviews_write_grants = 0; answer_stats_gone = true; archived_rows = 459444; archive_rls = true; archive_browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- BEGIN;
-- ALTER TABLE archive_20260928_answer_stats RENAME TO answer_stats;
-- DROP TABLE IF EXISTS player_pageviews;
-- COMMIT;
