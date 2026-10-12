-- Migration 032: owner-approved unowns (12 Oct 2026). PURE ASCII. Reversible (rows are unowned, not deleted).
--   33 soccer facts of 11 women's footballers: the game is men's football only (women's soccer, if
--     ever added, will be a separate sport). None of them has a men's career.
--   Herm Schaefer's Pistons fact: rests only on NBL years (Fort Wayne Zollner Pistons 1941-46), before the NBA.
--   4 soccer rows the infobox contradicts: Moriero / AC Milan (Inter), Marco Estrada / Everton (Chile's Everton),
--     Beaucourt / Lille (Olympique Lillois), Famewo / Stuttgart (amateur side). No second source confirms them.
-- 0. GUARD first. 1. BACKUP (RLS on, closed). 2. Unown with an exact count.

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  IF to_regclass('public.backup_20261012_facts_032') IS NOT NULL THEN RAISE EXCEPTION 'Migration 032 is already applied (found backup_20261012_facts_032). Nothing changed.'; END IF;
  SELECT count(*) INTO n FROM player_facts f JOIN (VALUES (808015,54251),(1020928,54251),(1020929,54251),(808016,53222),(1020440,53222),(1020441,53222),(1020442,53222),(808028,53221),(1022294,53221),(808035,53091),(1023168,53091),(1023169,53091),(808043,53797),(1022072,53797),(808044,72500),(1020910,72500),(808047,53103),(1018803,53103),(808048,53125),(1020894,53125),(1020895,53125),(1020896,53125),(1020897,53125),(808050,53124),(1022206,53124),(1022207,53124),(808051,14695),(1021890,14695),(1021891,14695),(1021892,14695),(808052,65367),(1021960,65367),(1021961,65367),(1616676,30440),(820797,16828),(1022161,23510),(1020468,35489),(817727,51812)) AS x(id, pid) ON f.id = x.id AND f.player_id = x.pid;
  IF n <> 38 THEN RAISE EXCEPTION '032 guard: expected 38 owned rows unchanged since review, found %. Nothing changed.', n; END IF;
END $mig$;

CREATE TABLE backup_20261012_facts_032 AS
  SELECT f.*, a.reason AS reason_032 FROM player_facts f
    JOIN (VALUES
    (808015, 'women''s footballer (men''s football only)'),
    (1020928, 'women''s footballer (men''s football only)'),
    (1020929, 'women''s footballer (men''s football only)'),
    (808016, 'women''s footballer (men''s football only)'),
    (1020440, 'women''s footballer (men''s football only)'),
    (1020441, 'women''s footballer (men''s football only)'),
    (1020442, 'women''s footballer (men''s football only)'),
    (808028, 'women''s footballer (men''s football only)'),
    (1022294, 'women''s footballer (men''s football only)'),
    (808035, 'women''s footballer (men''s football only)'),
    (1023168, 'women''s footballer (men''s football only)'),
    (1023169, 'women''s footballer (men''s football only)'),
    (808043, 'women''s footballer (men''s football only)'),
    (1022072, 'women''s footballer (men''s football only)'),
    (808044, 'women''s footballer (men''s football only)'),
    (1020910, 'women''s footballer (men''s football only)'),
    (808047, 'women''s footballer (men''s football only)'),
    (1018803, 'women''s footballer (men''s football only)'),
    (808048, 'women''s footballer (men''s football only)'),
    (1020894, 'women''s footballer (men''s football only)'),
    (1020895, 'women''s footballer (men''s football only)'),
    (1020896, 'women''s footballer (men''s football only)'),
    (1020897, 'women''s footballer (men''s football only)'),
    (808050, 'women''s footballer (men''s football only)'),
    (1022206, 'women''s footballer (men''s football only)'),
    (1022207, 'women''s footballer (men''s football only)'),
    (808051, 'women''s footballer (men''s football only)'),
    (1021890, 'women''s footballer (men''s football only)'),
    (1021891, 'women''s footballer (men''s football only)'),
    (1021892, 'women''s footballer (men''s football only)'),
    (808052, 'women''s footballer (men''s football only)'),
    (1021960, 'women''s footballer (men''s football only)'),
    (1021961, 'women''s footballer (men''s football only)'),
    (1616676, 'NBL years only (pre-NBA)'),
    (820797, 'infobox shows Inter, not AC Milan'),
    (1022161, 'infobox shows Everton de Vina del Mar (Chile)'),
    (1020468, 'infobox shows Olympique Lillois, not Lille OSC'),
    (817727, 'infobox shows VfB Stuttgart amateur side')
    ) AS a(id, reason) ON a.id = f.id;
ALTER TABLE backup_20261012_facts_032 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261012_facts_032 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  UPDATE player_facts f SET player_id = NULL, owner_method = 'unowned by 032: ' || b.reason_032 FROM backup_20261012_facts_032 b WHERE b.id = f.id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 38 THEN RAISE EXCEPTION '032: expected 38 rows unowned, got %', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261012_facts_032)                                                                          AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method LIKE 'unowned by 032:%' AND player_id IS NULL) AS unowned_rows,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id IN (34791231, 33516524, 33516280, 33358503, 34249390, 69040192, 33369986, 33403788, 33402498, 5032197, 56704235) AND f.sport = 'Soccer') AS women_owned_soccer_facts,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 12198173 AND f.fact_value = 'Pistons') AS schaefer_pistons,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261012_facts_032')                                 AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261012_facts_032' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants;
-- EXPECTED: backup_rows = 38; unowned_rows = 38; women_owned_soccer_facts = 0; schaefer_pistons = 0; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261012_facts_032 b WHERE b.id = f.id;
-- DROP TABLE backup_20261012_facts_032;
-- COMMIT;
