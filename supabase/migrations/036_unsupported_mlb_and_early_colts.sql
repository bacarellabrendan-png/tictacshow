-- Migration 036: MLB credits no source supports, and Colts credits resting on the defunct 1947-50 Baltimore Colts
-- PURE ASCII. Needs owner approval (it unowns facts; reversible).
--   MLB (222 rows): Lahman 2025 has the player but no appearance for the credited franchise, AND the infobox's playing
--     career (teams before "As manager/coach", debut/final team) doesn't show it either; the two sources describe the same
--     career (overlapping teams). Players active in 2025 or later are excluded (Lahman ends with 2024). Kept for review:
--     sources disagree, no infobox team list, or a possible Lahman id mismatch (e.g. Bob McClure).
--   NFL (8 rows): Colts credits whose infobox Baltimore Colts years are all 1947-50 (defunct franchise; today's Colts
--     start in 1953): Don Colo, George Blanda, Y. A. Tittle, Chick Jagade, George Buksar, Hardy Brown, Herb Rich, John Schweder.
--   230 rows unowned in total.
--   ADDED (8): playing teams both Lahman and the infobox confirm that these same players lacked (owner_method
--     'Lahman + infobox, missing playing team (036)'): Doug Davis (infielder) -> Rangers; Al Simmons -> Braves; Bob Allen (shortstop) -> Braves; Charlie Jones (infielder) -> Dodgers; Tyson Miller -> Cubs; Bryce Montes de Oca -> Mets; George Stallings -> Dodgers; Tip Tobin -> Giants.
-- 0. GUARD first. 1. BACKUP (RLS on, closed). 2. Unown with an exact count.

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  IF to_regclass('public.backup_20261013_facts_036') IS NOT NULL THEN RAISE EXCEPTION 'Migration 036 is already applied (found backup_20261013_facts_036). Nothing changed.'; END IF;
  SELECT count(*) INTO n FROM player_facts f JOIN (VALUES (544362,5217),(563355,4549),(564092,1414),(564432,1158),(564751,1112),(565015,41246),(565263,50564),(565416,9614),(565515,21291),(565614,22068),(576830,1595),(577000,4332),(577124,57380),(579300,35244),(579301,21951),(579340,2957),(579341,8387),(579342,34507),(579386,2888),(581737,5993),(581892,57380),(582326,5099),(582421,26027),(582654,38501),(582837,8717),(582839,9458),(584744,54182),(585207,1699),(588869,810),(589432,37254),(595973,35132),(596263,26450),(597160,38519),(598222,8017),(598850,8064),(599520,57380),(599521,1226),(599990,861),(600089,7160),(600134,295),(600220,2904),(600316,29886),(600470,7053),(601107,45601),(601370,5400),(601579,9831),(602284,19126),(602675,8938),(604000,7625),(604523,8074),(606455,7547),(606456,5355),(606457,45601),(606557,30779),(606560,56643),(606771,7373),(606917,10099),(606963,31379),(606967,40606),(607075,37181),(607121,8186),(607345,40439),(607405,9172),(608139,6521),(608146,6674),(608227,1376),(608289,4332),(609445,57380),(615491,9469),(617116,40282),(617315,28736),(617382,36655),(617485,38796),(617587,12799),(617690,25652),(617769,26681),(617842,8115),(618007,1798),(618122,1229),(618161,36681),(618164,1825),(618202,6578),(618244,15347),(618416,3004),(618559,455),(618647,46865),(618648,37394),(618820,28922),(618821,22125),(618862,20579),(618863,28923),(618864,10280),(618994,32818),(619079,31437),(619080,481),(619211,1973),(619329,32048),(619367,24519),(619574,9744),(619659,14892),(619763,26458),(619764,37181),(619869,34371),(619929,21936),(619976,23978),(620956,11156),(620958,26439),(621069,70337),(621074,50020),(621128,5757),(621187,35408),(625479,13539),(631537,32242),(631541,8186),(632337,66531),(632477,22395),(633554,10129),(642267,39523),(642641,34854),(643082,8694),(643087,6762),(643456,56643),(643508,13329),(643620,2753),(643624,7321),(643895,9831),(643947,54182),(644049,9319),(645058,5156),(645101,1627),(645198,36761),(645202,13441),(645405,4557),(645407,38954),(645520,35383),(645573,17066),(645915,4855),(646089,20013),(646138,39144),(646139,10195),(646357,7241),(648601,40945),(648839,19004),(649086,43556),(649492,54182),(649496,45712),(650101,31986),(650202,57380),(650938,55636),(651524,7636),(651855,20670),(651906,19422),(653514,61233),(653574,591),(1014598,19155),(1014622,1728),(1014818,1376),(1014819,23532),(1014884,21535),(1014957,31325),(1015073,44635),(1015166,3080),(1015189,35992),(1015190,33311),(1015240,6203),(1015279,22281),(1015447,10141),(1016289,6783),(1016610,12726),(1016721,41051),(1016736,2441),(1016756,26784),(1016829,31651),(1016830,31651),(1016831,31651),(1016832,31651),(1016836,6195),(1016837,6195),(1016838,6195),(1016839,6195),(1016840,6195),(1017678,41468),(1017679,41468),(1017981,40449),(1039750,62566),(1039789,60588),(1039799,54514),(1039834,67525),(1039860,64461),(1039865,58400),(1039889,75699),(1039916,74740),(1039918,59389),(1039937,64454),(1039942,56078),(1039966,74483),(1039990,18872),(1040001,72114),(1040012,73133),(1040028,60712),(1040051,59387),(1040053,67197),(1040061,54280),(1040078,75940),(1040084,71626),(1040129,75935),(1040145,66531),(1040169,15534),(1040182,76099),(1040188,75945),(1040189,73770),(1040199,65809),(1053420,8808),(1096197,42102),(1142037,29456),(1170175,54182),(1196732,35796),(1197496,22183),(1257837,4332),(1258459,57380),(1535934,360),(1603088,2638),(1002357,39242),(1004301,27050),(1005337,415),(1005338,29056),(1005652,12430),(1005749,29399),(1007422,53641),(1014417,3879)) AS x(id, pid) ON f.id = x.id AND f.player_id = x.pid AND f.fact_type = 'played_for_team';
  IF n <> 230 THEN RAISE EXCEPTION '036 guard: expected 230 owned rows unchanged since review, found %. Nothing changed.', n; END IF;
END $mig$;

CREATE TABLE backup_20261013_facts_036 AS
  SELECT f.*, r.why AS reason_036 FROM player_facts f
    JOIN (VALUES
    (544362, 'MLB: neither Lahman nor the infobox shows it'),
    (563355, 'MLB: neither Lahman nor the infobox shows it'),
    (564092, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (564432, 'MLB: neither Lahman nor the infobox shows it'),
    (564751, 'MLB: neither Lahman nor the infobox shows it'),
    (565015, 'MLB: neither Lahman nor the infobox shows it'),
    (565263, 'MLB: neither Lahman nor the infobox shows it'),
    (565416, 'MLB: neither Lahman nor the infobox shows it'),
    (565515, 'MLB: neither Lahman nor the infobox shows it'),
    (565614, 'MLB: neither Lahman nor the infobox shows it'),
    (576830, 'MLB: neither Lahman nor the infobox shows it'),
    (577000, 'MLB: neither Lahman nor the infobox shows it'),
    (577124, 'MLB: neither Lahman nor the infobox shows it'),
    (579300, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (579301, 'MLB: neither Lahman nor the infobox shows it'),
    (579340, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (579341, 'MLB: neither Lahman nor the infobox shows it'),
    (579342, 'MLB: neither Lahman nor the infobox shows it'),
    (579386, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (581737, 'MLB: neither Lahman nor the infobox shows it'),
    (581892, 'MLB: neither Lahman nor the infobox shows it'),
    (582326, 'MLB: neither Lahman nor the infobox shows it'),
    (582421, 'MLB: neither Lahman nor the infobox shows it'),
    (582654, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (582837, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (582839, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (584744, 'MLB: neither Lahman nor the infobox shows it'),
    (585207, 'MLB: neither Lahman nor the infobox shows it'),
    (588869, 'MLB: neither Lahman nor the infobox shows it'),
    (589432, 'MLB: neither Lahman nor the infobox shows it'),
    (595973, 'MLB: neither Lahman nor the infobox shows it'),
    (596263, 'MLB: neither Lahman nor the infobox shows it'),
    (597160, 'MLB: neither Lahman nor the infobox shows it'),
    (598222, 'MLB: neither Lahman nor the infobox shows it'),
    (598850, 'MLB: neither Lahman nor the infobox shows it'),
    (599520, 'MLB: neither Lahman nor the infobox shows it'),
    (599521, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (599990, 'MLB: neither Lahman nor the infobox shows it'),
    (600089, 'MLB: neither Lahman nor the infobox shows it'),
    (600134, 'MLB: neither Lahman nor the infobox shows it'),
    (600220, 'MLB: neither Lahman nor the infobox shows it'),
    (600316, 'MLB: neither Lahman nor the infobox shows it'),
    (600470, 'MLB: neither Lahman nor the infobox shows it'),
    (601107, 'MLB: neither Lahman nor the infobox shows it'),
    (601370, 'MLB: neither Lahman nor the infobox shows it'),
    (601579, 'MLB: neither Lahman nor the infobox shows it'),
    (602284, 'MLB: neither Lahman nor the infobox shows it'),
    (602675, 'MLB: neither Lahman nor the infobox shows it'),
    (604000, 'MLB: neither Lahman nor the infobox shows it'),
    (604523, 'MLB: neither Lahman nor the infobox shows it'),
    (606455, 'MLB: neither Lahman nor the infobox shows it'),
    (606456, 'MLB: neither Lahman nor the infobox shows it'),
    (606457, 'MLB: neither Lahman nor the infobox shows it'),
    (606557, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (606560, 'MLB: neither Lahman nor the infobox shows it'),
    (606771, 'MLB: neither Lahman nor the infobox shows it'),
    (606917, 'MLB: neither Lahman nor the infobox shows it'),
    (606963, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (606967, 'MLB: neither Lahman nor the infobox shows it'),
    (607075, 'MLB: neither Lahman nor the infobox shows it'),
    (607121, 'MLB: neither Lahman nor the infobox shows it'),
    (607345, 'MLB: neither Lahman nor the infobox shows it'),
    (607405, 'MLB: neither Lahman nor the infobox shows it'),
    (608139, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (608146, 'MLB: neither Lahman nor the infobox shows it'),
    (608227, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (608289, 'MLB: neither Lahman nor the infobox shows it'),
    (609445, 'MLB: neither Lahman nor the infobox shows it'),
    (615491, 'MLB: neither Lahman nor the infobox shows it'),
    (617116, 'MLB: neither Lahman nor the infobox shows it'),
    (617315, 'MLB: neither Lahman nor the infobox shows it'),
    (617382, 'MLB: neither Lahman nor the infobox shows it'),
    (617485, 'MLB: neither Lahman nor the infobox shows it'),
    (617587, 'MLB: neither Lahman nor the infobox shows it'),
    (617690, 'MLB: neither Lahman nor the infobox shows it'),
    (617769, 'MLB: neither Lahman nor the infobox shows it'),
    (617842, 'MLB: neither Lahman nor the infobox shows it'),
    (618007, 'MLB: neither Lahman nor the infobox shows it'),
    (618122, 'MLB: neither Lahman nor the infobox shows it'),
    (618161, 'MLB: neither Lahman nor the infobox shows it'),
    (618164, 'MLB: neither Lahman nor the infobox shows it'),
    (618202, 'MLB: neither Lahman nor the infobox shows it'),
    (618244, 'MLB: neither Lahman nor the infobox shows it'),
    (618416, 'MLB: neither Lahman nor the infobox shows it'),
    (618559, 'MLB: neither Lahman nor the infobox shows it'),
    (618647, 'MLB: neither Lahman nor the infobox shows it'),
    (618648, 'MLB: neither Lahman nor the infobox shows it'),
    (618820, 'MLB: neither Lahman nor the infobox shows it'),
    (618821, 'MLB: neither Lahman nor the infobox shows it'),
    (618862, 'MLB: neither Lahman nor the infobox shows it'),
    (618863, 'MLB: neither Lahman nor the infobox shows it'),
    (618864, 'MLB: neither Lahman nor the infobox shows it'),
    (618994, 'MLB: neither Lahman nor the infobox shows it'),
    (619079, 'MLB: neither Lahman nor the infobox shows it'),
    (619080, 'MLB: neither Lahman nor the infobox shows it'),
    (619211, 'MLB: neither Lahman nor the infobox shows it'),
    (619329, 'MLB: neither Lahman nor the infobox shows it'),
    (619367, 'MLB: neither Lahman nor the infobox shows it'),
    (619574, 'MLB: neither Lahman nor the infobox shows it'),
    (619659, 'MLB: neither Lahman nor the infobox shows it'),
    (619763, 'MLB: neither Lahman nor the infobox shows it'),
    (619764, 'MLB: neither Lahman nor the infobox shows it'),
    (619869, 'MLB: neither Lahman nor the infobox shows it'),
    (619929, 'MLB: neither Lahman nor the infobox shows it'),
    (619976, 'MLB: neither Lahman nor the infobox shows it'),
    (620956, 'MLB: neither Lahman nor the infobox shows it'),
    (620958, 'MLB: neither Lahman nor the infobox shows it'),
    (621069, 'MLB: neither Lahman nor the infobox shows it'),
    (621074, 'MLB: neither Lahman nor the infobox shows it'),
    (621128, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (621187, 'MLB: neither Lahman nor the infobox shows it'),
    (625479, 'MLB: neither Lahman nor the infobox shows it'),
    (631537, 'MLB: neither Lahman nor the infobox shows it'),
    (631541, 'MLB: neither Lahman nor the infobox shows it'),
    (632337, 'MLB: neither Lahman nor the infobox shows it'),
    (632477, 'MLB: neither Lahman nor the infobox shows it'),
    (633554, 'MLB: neither Lahman nor the infobox shows it'),
    (642267, 'MLB: neither Lahman nor the infobox shows it'),
    (642641, 'MLB: neither Lahman nor the infobox shows it'),
    (643082, 'MLB: neither Lahman nor the infobox shows it'),
    (643087, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (643456, 'MLB: neither Lahman nor the infobox shows it'),
    (643508, 'MLB: neither Lahman nor the infobox shows it'),
    (643620, 'MLB: neither Lahman nor the infobox shows it'),
    (643624, 'MLB: neither Lahman nor the infobox shows it'),
    (643895, 'MLB: neither Lahman nor the infobox shows it'),
    (643947, 'MLB: neither Lahman nor the infobox shows it'),
    (644049, 'MLB: neither Lahman nor the infobox shows it'),
    (645058, 'MLB: neither Lahman nor the infobox shows it'),
    (645101, 'MLB: neither Lahman nor the infobox shows it'),
    (645198, 'MLB: neither Lahman nor the infobox shows it'),
    (645202, 'MLB: neither Lahman nor the infobox shows it'),
    (645405, 'MLB: neither Lahman nor the infobox shows it'),
    (645407, 'MLB: neither Lahman nor the infobox shows it'),
    (645520, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (645573, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (645915, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (646089, 'MLB: neither Lahman nor the infobox shows it'),
    (646138, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (646139, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (646357, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (648601, 'MLB: neither Lahman nor the infobox shows it'),
    (648839, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (649086, 'MLB: neither Lahman nor the infobox shows it'),
    (649492, 'MLB: neither Lahman nor the infobox shows it'),
    (649496, 'MLB: neither Lahman nor the infobox shows it'),
    (650101, 'MLB: neither Lahman nor the infobox shows it'),
    (650202, 'MLB: neither Lahman nor the infobox shows it'),
    (650938, 'MLB: neither Lahman nor the infobox shows it'),
    (651524, 'MLB: neither Lahman nor the infobox shows it'),
    (651855, 'MLB: neither Lahman nor the infobox shows it'),
    (651906, 'MLB: neither Lahman nor the infobox shows it'),
    (653514, 'MLB: neither Lahman nor the infobox shows it'),
    (653574, 'MLB: neither Lahman nor the infobox shows it'),
    (1014598, 'MLB: neither Lahman nor the infobox shows it'),
    (1014622, 'MLB: neither Lahman nor the infobox shows it'),
    (1014818, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1014819, 'MLB: neither Lahman nor the infobox shows it'),
    (1014884, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1014957, 'MLB: neither Lahman nor the infobox shows it'),
    (1015073, 'MLB: neither Lahman nor the infobox shows it'),
    (1015166, 'MLB: neither Lahman nor the infobox shows it'),
    (1015189, 'MLB: neither Lahman nor the infobox shows it'),
    (1015190, 'MLB: neither Lahman nor the infobox shows it'),
    (1015240, 'MLB: neither Lahman nor the infobox shows it'),
    (1015279, 'MLB: neither Lahman nor the infobox shows it'),
    (1015447, 'MLB: neither Lahman nor the infobox shows it'),
    (1016289, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1016610, 'MLB: neither Lahman nor the infobox shows it'),
    (1016721, 'MLB: neither Lahman nor the infobox shows it'),
    (1016736, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1016756, 'MLB: neither Lahman nor the infobox shows it'),
    (1016829, 'MLB: neither Lahman nor the infobox shows it'),
    (1016830, 'MLB: neither Lahman nor the infobox shows it'),
    (1016831, 'MLB: neither Lahman nor the infobox shows it'),
    (1016832, 'MLB: neither Lahman nor the infobox shows it'),
    (1016836, 'MLB: neither Lahman nor the infobox shows it'),
    (1016837, 'MLB: neither Lahman nor the infobox shows it'),
    (1016838, 'MLB: neither Lahman nor the infobox shows it'),
    (1016839, 'MLB: neither Lahman nor the infobox shows it'),
    (1016840, 'MLB: neither Lahman nor the infobox shows it'),
    (1017678, 'MLB: neither Lahman nor the infobox shows it'),
    (1017679, 'MLB: neither Lahman nor the infobox shows it'),
    (1017981, 'MLB: neither Lahman nor the infobox shows it'),
    (1039750, 'MLB: neither Lahman nor the infobox shows it'),
    (1039789, 'MLB: neither Lahman nor the infobox shows it'),
    (1039799, 'MLB: neither Lahman nor the infobox shows it'),
    (1039834, 'MLB: neither Lahman nor the infobox shows it'),
    (1039860, 'MLB: neither Lahman nor the infobox shows it'),
    (1039865, 'MLB: neither Lahman nor the infobox shows it'),
    (1039889, 'MLB: neither Lahman nor the infobox shows it'),
    (1039916, 'MLB: neither Lahman nor the infobox shows it'),
    (1039918, 'MLB: neither Lahman nor the infobox shows it'),
    (1039937, 'MLB: neither Lahman nor the infobox shows it'),
    (1039942, 'MLB: neither Lahman nor the infobox shows it'),
    (1039966, 'MLB: neither Lahman nor the infobox shows it'),
    (1039990, 'MLB: neither Lahman nor the infobox shows it'),
    (1040001, 'MLB: neither Lahman nor the infobox shows it'),
    (1040012, 'MLB: neither Lahman nor the infobox shows it'),
    (1040028, 'MLB: neither Lahman nor the infobox shows it'),
    (1040051, 'MLB: neither Lahman nor the infobox shows it'),
    (1040053, 'MLB: neither Lahman nor the infobox shows it'),
    (1040061, 'MLB: neither Lahman nor the infobox shows it'),
    (1040078, 'MLB: neither Lahman nor the infobox shows it'),
    (1040084, 'MLB: neither Lahman nor the infobox shows it'),
    (1040129, 'MLB: neither Lahman nor the infobox shows it'),
    (1040145, 'MLB: neither Lahman nor the infobox shows it'),
    (1040169, 'MLB: neither Lahman nor the infobox shows it'),
    (1040182, 'MLB: neither Lahman nor the infobox shows it'),
    (1040188, 'MLB: neither Lahman nor the infobox shows it'),
    (1040189, 'MLB: neither Lahman nor the infobox shows it'),
    (1040199, 'MLB: neither Lahman nor the infobox shows it'),
    (1053420, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1096197, 'MLB: neither Lahman nor the infobox shows it'),
    (1142037, 'MLB: coach/manager/executive only (Lahman + infobox)'),
    (1170175, 'MLB: neither Lahman nor the infobox shows it'),
    (1196732, 'MLB: neither Lahman nor the infobox shows it'),
    (1197496, 'MLB: neither Lahman nor the infobox shows it'),
    (1257837, 'MLB: neither Lahman nor the infobox shows it'),
    (1258459, 'MLB: neither Lahman nor the infobox shows it'),
    (1535934, 'MLB: neither Lahman nor the infobox shows it'),
    (1603088, 'MLB: neither Lahman nor the infobox shows it'),
    (1002357, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1004301, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1005337, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1005338, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1005652, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1005749, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1007422, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)'),
    (1014417, 'NFL: Colts years only 1947-50 (defunct Baltimore Colts)')
    ) AS r(id, why) ON r.id = f.id;
ALTER TABLE backup_20261013_facts_036 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261013_facts_036 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  UPDATE player_facts f SET player_id = NULL, owner_method = 'unowned by 036: ' || b.reason_036 FROM backup_20261013_facts_036 b WHERE b.id = f.id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 230 THEN RAISE EXCEPTION '036: expected 230 rows unowned, got %', n; END IF;

  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, 'MLB', 'played_for_team', tm.v, p.id, 'Lahman + infobox, missing playing team (036)'
    FROM (VALUES (12638114,0,1), (643764,1,0), (12210521,1,0), (13589061,2,0), (60686063,3,0), (71669392,4,0), (2929233,2,0), (21303436,5,0)) AS r(page_id, ti, t)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'Rangers'), (1, 'Braves'), (2, 'Dodgers'), (3, 'Cubs'), (4, 'Mets'), (5, 'Giants')) AS tm(ti, v) ON tm.ti = r.ti
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = 'MLB' AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 8 THEN RAISE EXCEPTION '036: expected 8 rows added, got %', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261013_facts_036)                                                                          AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method LIKE 'unowned by 036:%' AND player_id IS NULL) AS unowned_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'Lahman + infobox, missing playing team (036)')                                      AS added_rows,
  (SELECT string_agg(f.fact_value, ', ' ORDER BY f.fact_value) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 541631 AND f.sport = 'MLB' AND f.fact_type = 'played_for_team') AS lemon_teams,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 1465770 AND f.fact_value = 'Colts') AS tittle_colts,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 1465770 AND f.fact_value = '49ers') AS tittle_49ers_kept,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261013_facts_036')                                 AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261013_facts_036' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants;
-- EXPECTED: backup_rows = 230; unowned_rows = 230; added_rows = 8; lemon_teams = Guardians, Indians; tittle_colts = 0; tittle_49ers_kept = 1; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method = 'Lahman + infobox, missing playing team (036)';
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261013_facts_036 b WHERE b.id = f.id;
-- DROP TABLE backup_20261013_facts_036;
-- COMMIT;
