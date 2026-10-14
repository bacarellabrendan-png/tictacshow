-- Migration 037: the 50 MLB rows 036 kept for review, settled with MLB's own records (Stats API year-by-year)
-- PURE ASCII. Needs owner approval (it unowns facts; reversible).
--   UNOWNED (33, incl. the "Guardians" twin of each removed "Indians" credit): MLB shows no games for the credited franchise (coaches, broadcasters, wrong person). E.g. Bob Uecker /
--     Brewers (broadcaster), Kevin Seitzer / Braves, Mariners, Diamondbacks, Blue Jays (coach), Red Badgro / Giants (NFL
--     Giants), Tom Loftus / Rangers, Cubs (manager), Bob McClure / Twins.
--   KEPT (20): MLB confirms the games (Bob McClure's 7 real teams, Charley Hall, Tom Turner, Bob Johnson b. 1943).
--   ADDED (2): teams MLB records AND Lahman or the infobox confirm that the same players lacked (owner_method 'MLB records + Lahman/infobox, missing playing team (037)'): Rabbit Warstler -> Braves; Terrance Gore -> Mets.
--   Left with no MLB team on purpose (defunct clubs / non-counting years only): Jim Duncan, Henry Moore, Tom Loftus.
--   Bob McClure's Baseball-Reference id (mcclubo01) is correct; Lahman 2025 also gives that id to a Negro Leagues namesake (born
--   1891), which is what made the earlier check mismatch. No id change is needed.
-- 0. GUARD first. 1. BACKUP (RLS on, closed). 2. Changes with exact counts.

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  IF to_regclass('public.backup_20261013_facts_037') IS NOT NULL THEN RAISE EXCEPTION 'Migration 037 is already applied (found backup_20261013_facts_037). Nothing changed.'; END IF;
  SELECT count(*) INTO n FROM player_facts f JOIN (VALUES (549086,12627),(560959,20912),(563430,4455),(564922,4901),(565348,43079),(565587,20221),(610891,4455),(617653,12778),(618512,20912),(620744,25610),(640206,8172),(640570,20912),(642858,56960),(650257,4455),(653006,25610),(653190,4455),(1014734,44482),(1014874,38099),(1014946,1053),(1014995,11814),(1016354,22078),(1016526,38458),(1017339,37343),(1017629,32795),(1018146,58803),(1018150,17108),(1018219,13365),(1057308,12627),(1144472,13365),(1617712,27808),(1017488,12778),(1016625,20912),(1017128,25610)) AS x(id, pid) ON f.id = x.id AND f.player_id = x.pid AND f.fact_type = 'played_for_team';
  IF n <> 33 THEN RAISE EXCEPTION '037 guard: expected 33 owned rows unchanged since review, found %. Nothing changed.', n; END IF;
END $mig$;

CREATE TABLE backup_20261013_facts_037 AS
  SELECT f.*, r.why AS reason_037 FROM player_facts f
    JOIN (VALUES
    (549086, 'MLB records show no games for the franchise'),
    (560959, 'MLB records show no games for the franchise'),
    (563430, 'MLB records show no games for the franchise'),
    (564922, 'MLB records show no games for the franchise'),
    (565348, 'MLB records (Jim Duncan b.1871-07-01, teams: Cleveland Spiders, Washington Senators) show no Giants'),
    (565587, 'MLB records (Henry Moore b.1862-01-01, teams: Washington Nationals) show no Giants'),
    (610891, 'MLB records show no games for the franchise'),
    (617653, 'MLB records show no games for the franchise'),
    (618512, 'MLB records show no games for the franchise'),
    (620744, 'MLB records show no games for the franchise'),
    (640206, 'MLB records show no games for the franchise'),
    (640570, 'MLB records show no games for the franchise'),
    (642858, 'MLB records show no games for the franchise'),
    (650257, 'MLB records show no games for the franchise'),
    (653006, 'MLB records show no games for the franchise'),
    (653190, 'MLB records show no games for the franchise'),
    (1014734, 'MLB records show no games for the franchise'),
    (1014874, 'MLB records show no games for the franchise'),
    (1014946, 'MLB records show no games for the franchise'),
    (1014995, 'MLB records show no games for the franchise'),
    (1016354, 'MLB records show no games for the franchise'),
    (1016526, 'MLB records show no games for the franchise'),
    (1017339, 'MLB records show no games for the franchise'),
    (1017629, 'MLB records show no games for the franchise'),
    (1018146, 'MLB records show no games for the franchise'),
    (1018150, 'MLB records show no games for the franchise'),
    (1018219, 'MLB records (Tom Loftus b.1856-11-15, teams: St. Louis Brown Stockings, St. Louis Cardinals) show no Rangers'),
    (1057308, 'MLB records show no games for the franchise'),
    (1144472, 'MLB records (Tom Loftus b.1856-11-15, teams: St. Louis Brown Stockings, St. Louis Cardinals) show no Cubs'),
    (1617712, 'MLB records show no games for the franchise'),
    (1017488, 'Guardians label of the same Cleveland credit; MLB records show no games for the franchise'),
    (1016625, 'Guardians label of the same Cleveland credit; MLB records show no games for the franchise'),
    (1017128, 'Guardians label of the same Cleveland credit; MLB records show no games for the franchise')
    ) AS r(id, why) ON r.id = f.id;
ALTER TABLE backup_20261013_facts_037 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261013_facts_037 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  UPDATE player_facts f SET player_id = NULL, owner_method = 'unowned by 037: ' || b.reason_037 FROM backup_20261013_facts_037 b WHERE b.id = f.id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 33 THEN RAISE EXCEPTION '037: expected 33 rows unowned, got %', n; END IF;

  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, 'MLB', 'played_for_team', tm.v, p.id, 'MLB records + Lahman/infobox, missing playing team (037)'
    FROM (VALUES (13242147,0,0), (43634268,1,0)) AS r(page_id, ti, t)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'Braves'), (1, 'Mets')) AS tm(ti, v) ON tm.ti = r.ti
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = 'MLB' AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 2 THEN RAISE EXCEPTION '037: expected 2 rows added, got %', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261013_facts_037)                                                                          AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method LIKE 'unowned by 037:%' AND player_id IS NULL) AS unowned_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'MLB records + Lahman/infobox, missing playing team (037)')                                     AS added_rows,
  (SELECT string_agg(f.fact_value, ', ' ORDER BY f.fact_value) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 2795886 AND f.sport = 'MLB' AND f.fact_type = 'played_for_team') AS mcclure_teams,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 614427 AND f.fact_value = 'Brewers') AS uecker_brewers,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261013_facts_037')                                 AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261013_facts_037' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants;
-- EXPECTED: backup_rows = 33; unowned_rows = 33; added_rows = 2; mcclure_teams = Angels, Brewers, Cardinals, Marlins, Mets, Nationals, Royals; uecker_brewers = 0; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method = 'MLB records + Lahman/infobox, missing playing team (037)';
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261013_facts_037 b WHERE b.id = f.id;
-- DROP TABLE backup_20261013_facts_037;
-- COMMIT;
