-- Migration 034: credits that rest on a defunct or other-franchise club with the same name (official franchise history)
-- PURE ASCII. Needs owner approval (it unowns facts; reversible). Names live in the backup's reason column, not here.
--   MLB (Lahman 2025 Appearances + Teams.franchID, complete): 137 credits where the player never appeared for the
--     credited franchise but did play for a same-named club of another franchise. Patterns: Rangers -> none (defunct) 32; Orioles -> none (defunct) 27; Orioles -> Yankees 24; Orioles -> Cardinals 22; Brewers -> Orioles 12; Athletics -> none (defunct) 10; Nationals -> none (defunct) 6; Brewers -> none (defunct) 3; Cardinals -> Orioles 1.
--     23 correct-franchise credits are added where the player lacked them (owner_method 'early franchise history, Lahman appearances (034)'), following MLB's own
--     records: none for the 1901-02 Baltimore Orioles (Yankees start 1903); pre-1892 American Association St. Louis years held.
--   NBA/NFL/NHL: 90 credits impossible by date whose infobox shows only the defunct namesake: original Ottawa Senators
--     (1917-34), Baltimore Bullets (1944-54), Denver Nuggets (1948-50), Baltimore Colts (1947-50), Dallas Texans (NFL, 1952),
--     plus 2 Ravens credits for players whose infobox shows neither the Ravens nor the Browns.
--   227 rows unowned in total.
-- 0. GUARD first. 1. BACKUP (RLS on, closed). 2. Changes with exact counts.

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  IF to_regclass('public.backup_20261013_facts_034') IS NOT NULL THEN RAISE EXCEPTION 'Migration 034 is already applied (found backup_20261013_facts_034). Nothing changed.'; END IF;
  SELECT count(*) INTO n FROM player_facts f JOIN (VALUES (555509,33042),(1014583,15288),(1014584,15288),(1014611,33534),(1014678,6024),(1014680,6024),(1014745,28972),(1014746,28972),(1014750,24480),(1014751,42896),(1014752,42896),(1014764,47248),(1014771,8010),(1014776,49709),(1014785,47009),(1014786,47009),(1014810,6451),(1014815,46873),(1014922,41139),(1014978,32000),(1014980,22656),(1015106,24785),(1015171,21526),(1015253,1439),(1015295,946),(1015314,42143),(1015323,7548),(1015330,40840),(1015334,807),(1015340,28836),(1015390,15733),(1015449,12807),(1015497,49692),(1015512,38432),(1015535,19738),(1015544,25070),(1015545,25070),(1015546,34708),(1015599,19667),(1015601,21354),(1015610,789),(1015611,789),(1015612,789),(1015617,38480),(1015676,31232),(1015769,12619),(1015839,15439),(1015848,10078),(1015849,10078),(1015853,33004),(1015858,34116),(1015864,26453),(1015871,35658),(1015880,25265),(1015887,29359),(1015907,38479),(1015980,13097),(1016000,33640),(1016001,14797),(1016010,36539),(1016011,39800),(1016021,5154),(1016029,38938),(1016096,19079),(1016099,19079),(1016113,41240),(1016130,2280),(1016152,40687),(1016193,22941),(1016209,25647),(1016250,1000),(1016257,408),(1016274,38868),(1016304,27806),(1016311,33477),(1016315,151),(1016329,40645),(1016344,33379),(1016345,33379),(1016350,33636),(1016359,42472),(1016365,36600),(1016438,20590),(1016549,29353),(1016551,43079),(1016565,16379),(1016567,16379),(1016568,41070),(1016618,26388),(1016657,39035),(1016658,14683),(1016659,14683),(1016728,36001),(1016746,49549),(1016750,38660),(1016871,28990),(1016889,23943),(1016890,23943),(1016977,28971),(1016978,28971),(1016983,1375),(1016987,13361),(1016991,28156),(1017029,6553),(1017077,31557),(1017095,49130),(1017299,2044),(1017311,34859),(1017313,24596),(1017318,43039),(1017377,28830),(1017411,26480),(1017413,1468),(1017513,42211),(1017514,42211),(1017590,48735),(1017608,28987),(1017613,21549),(1017617,47683),(1017810,738),(1017811,738),(1017921,28235),(1017995,22643),(1018031,38968),(1018045,29916),(1018058,38824),(1018063,28829),(1018127,26483),(1018135,11042),(1018214,45178),(1018215,45178),(1018216,13365),(1018231,42699),(1018258,5550),(1018259,21590),(1018316,29004),(1018436,1158),(1023736,4892),(1023737,29035),(1023794,15459),(1023838,2345),(1023855,17424),(1023895,15488),(1024015,15035),(1024028,35828),(1024093,15824),(997997,57628),(998076,45034),(998111,21502),(998122,35049),(998135,10490),(998147,57562),(998166,55972),(998260,30309),(998317,30214),(998463,58737),(998465,30336),(998478,4638),(998480,30438),(998487,32291),(998596,59071),(998604,41025),(998664,53761),(998665,30451),(998714,55788),(998724,61828),(998825,30497),(998842,56058),(998845,53071),(998854,30479),(998867,22496),(998881,34916),(998882,30446),(998952,25522),(998970,30229),(999008,34445),(999015,27906),(999017,47908),(999178,38559),(999298,32869),(999334,55999),(999339,28837),(999347,23489),(999348,34918),(999363,29898),(999402,55785),(999495,43269),(999509,32312),(999588,33003),(999665,57560),(999804,55103),(999806,24014),(999832,54424),(999865,30462),(999894,56021),(999931,32741),(999940,30300),(998472,57508),(998526,32707),(998951,25522),(1000322,41582),(1000514,69067),(1000792,31412),(1001285,33871),(1001287,57519),(1001856,69894),(1002359,39104),(1004606,49736),(1005071,59168),(1005344,44728),(1005383,69057),(1007014,20419),(1007389,40121),(1011040,37517),(1011345,30332),(1011640,68017),(1001832,17934),(1002618,35567),(1004199,27257),(1004302,27050),(1005375,16255),(1007219,31193),(1011491,47953),(1012702,47418),(1014530,28640),(892984,50916),(1007297,29018)) AS x(id, pid) ON f.id = x.id AND f.player_id = x.pid;
  IF n <> 227 THEN RAISE EXCEPTION '034 guard: expected 227 owned rows unchanged since review, found %. Nothing changed.', n; END IF;
END $mig$;

CREATE TABLE backup_20261013_facts_034 AS
  SELECT f.*, r.why AS reason_034 FROM player_facts f
    JOIN (VALUES
    (555509, 'MLB: played for the same-named St. Louis Browns (1942-1946), franchise BAL'),
    (1014583, 'MLB: played for the same-named Washington Senators (1893-1897), franchise WAS'),
    (1014584, 'MLB: played for the same-named Baltimore Orioles (1897-1898), franchise BLO'),
    (1014611, 'MLB: played for the same-named Baltimore Orioles (1899-1899), franchise BLO'),
    (1014678, 'MLB: played for the same-named St. Louis Browns (1883-1896), franchise STL'),
    (1014680, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1014745, 'MLB: played for the same-named Baltimore Orioles (1888-1891), franchise BLO'),
    (1014746, 'MLB: played for the same-named Philadelphia Athletics (1890-1890), franchise PHQ'),
    (1014750, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1014751, 'MLB: played for the same-named St. Louis Browns (1896-1896), franchise STL'),
    (1014752, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1014764, 'MLB: played for the same-named Philadelphia Athletics (1889-1890), franchise PHA'),
    (1014771, 'MLB: played for the same-named Washington Senators (1898-1899), franchise WAS'),
    (1014776, 'MLB: played for the same-named Washington Senators (1897-1897), franchise WAS'),
    (1014785, 'MLB: played for the same-named Washington Nationals (1884-1884), franchise WNA'),
    (1014786, 'MLB: played for the same-named Philadelphia Athletics (1885-1885), franchise PHA'),
    (1014810, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1014815, 'MLB: played for the same-named Washington Nationals (1884-1884), franchise WST'),
    (1014922, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1014978, 'MLB: played for the same-named Baltimore Orioles (1893-1898), franchise BLO'),
    (1014980, 'MLB: played for the same-named St. Louis Browns (1893-1895), franchise STL'),
    (1015106, 'MLB: played for the same-named Baltimore Orioles (1899-1899), franchise BLO'),
    (1015171, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1015253, 'MLB: played for the same-named St. Louis Browns (1891-1891), franchise STL'),
    (1015295, 'MLB: played for the same-named Washington Nationals (1886-1889), franchise WNL'),
    (1015314, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1015323, 'MLB: played for the same-named Baltimore Orioles (1901-1902), franchise NYY'),
    (1015330, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1015334, 'MLB: played for the same-named Baltimore Orioles (1894-1895), franchise BLO'),
    (1015340, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1015390, 'MLB: played for the same-named Baltimore Orioles (1899-1899), franchise BLO'),
    (1015449, 'MLB: played for the same-named Washington Statesmen/Washington Senators (1891-1899), franchise WAS'),
    (1015497, 'MLB: played for the same-named Baltimore Orioles (1897-1897), franchise BLO'),
    (1015512, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1015535, 'MLB: played for the same-named Washington Senators (1898-1899), franchise WAS'),
    (1015544, 'MLB: played for the same-named Washington Senators (1895-1897), franchise WAS'),
    (1015545, 'MLB: played for the same-named Baltimore Orioles (1898-1898), franchise BLO'),
    (1015546, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1015599, 'MLB: played for the same-named Baltimore Orioles (1898-1899), franchise BLO'),
    (1015601, 'MLB: played for the same-named St. Louis Browns (1893-1896), franchise STL'),
    (1015610, 'MLB: played for the same-named Washington Nationals (1888-1889), franchise WNL'),
    (1015611, 'MLB: played for the same-named St. Louis Browns (1891-1891), franchise STL'),
    (1015612, 'MLB: played for the same-named Washington Senators (1892-1893), franchise WAS'),
    (1015617, 'MLB: played for the same-named Baltimore Orioles (1889-1889), franchise BLO'),
    (1015676, 'MLB: played for the same-named St. Louis Browns (1896-1897), franchise STL'),
    (1015769, 'MLB: played for the same-named Baltimore Orioles/New York Highlanders (1902-1903), franchise NYY'),
    (1015839, 'MLB: played for the same-named Baltimore Orioles (1895-1898), franchise BLO'),
    (1015848, 'MLB: played for the same-named Milwaukee Brewers (1891-1891), franchise MLA'),
    (1015849, 'MLB: played for the same-named Milwaukee Brewers (1891-1891), franchise MLA'),
    (1015853, 'MLB: played for the same-named Baltimore Orioles (1885-1892), franchise BLO'),
    (1015858, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1015864, 'MLB: played for the same-named Milwaukee Brewers (1891-1891), franchise MLA'),
    (1015871, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1015880, 'MLB: played for the same-named Washington Senators (1894-1899), franchise WAS'),
    (1015887, 'MLB: played for the same-named St. Louis Browns (1893-1894), franchise STL'),
    (1015907, 'MLB: played for the same-named St. Louis Browns/St. Louis Cardinals (1897-1902), franchise STL'),
    (1015980, 'MLB: played for the same-named Philadelphia Athletics (1883-1886), franchise PHA'),
    (1016000, 'MLB: played for the same-named Baltimore Orioles (1899-1899), franchise BLO'),
    (1016001, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1016010, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016011, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1016021, 'MLB: played for the same-named Baltimore Orioles (1891-1892), franchise BLO'),
    (1016029, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016096, 'MLB: played for the same-named Philadelphia Athletics (1887-1889), franchise PHA'),
    (1016099, 'MLB: played for the same-named Washington Senators (1898-1899), franchise WAS'),
    (1016113, 'MLB: played for the same-named Washington Senators (1892-1892), franchise WAS'),
    (1016130, 'MLB: played for the same-named Washington Nationals (1886-1889), franchise WNL'),
    (1016152, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016193, 'MLB: played for the same-named St. Louis Browns/St. Louis Cardinals (1892-1913), franchise STL'),
    (1016209, 'MLB: played for the same-named Baltimore Orioles/New York Highlanders (1902-1903), franchise NYY'),
    (1016250, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1016257, 'MLB: played for the same-named Baltimore Orioles (1893-1899), franchise BLO'),
    (1016274, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1016304, 'MLB: played for the same-named St. Louis Browns (1898-1898), franchise STL'),
    (1016311, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016315, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1016329, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016344, 'MLB: played for the same-named Philadelphia Athletics (1882-1890), franchise PHA'),
    (1016345, 'MLB: played for the same-named Baltimore Orioles (1888-1888), franchise BLO'),
    (1016350, 'MLB: played for the same-named Baltimore Orioles (1899-1899), franchise BLO'),
    (1016359, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1016365, 'MLB: played for the same-named Baltimore Orioles/New York Highlanders (1902-1904), franchise NYY'),
    (1016438, 'MLB: played for the same-named Baltimore Orioles (1898-1898), franchise BLO'),
    (1016549, 'MLB: played for the same-named Baltimore Orioles (1886-1887), franchise BLO'),
    (1016551, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1016565, 'MLB: played for the same-named Milwaukee Brewers (1891-1891), franchise MLA'),
    (1016567, 'MLB: played for the same-named Milwaukee Brewers (1891-1891), franchise MLA'),
    (1016568, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1016618, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1016657, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1016658, 'MLB: played for the same-named Washington Senators (1895-1895), franchise WAS'),
    (1016659, 'MLB: played for the same-named Baltimore Orioles (1896-1897), franchise BLO'),
    (1016728, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1016746, 'MLB: played for the same-named Washington Senators (1894-1896), franchise WAS'),
    (1016750, 'MLB: played for the same-named Baltimore Orioles (1891-1899), franchise BLO'),
    (1016871, 'MLB: played for the same-named Washington Senators (1892-1893), franchise WAS'),
    (1016889, 'MLB: played for the same-named St. Louis Browns (1893-1893), franchise STL'),
    (1016890, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1016977, 'MLB: played for the same-named St. Louis Browns (1897-1898), franchise STL'),
    (1016978, 'MLB: played for the same-named Washington Statesmen/Washington Senators (1891-1899), franchise WAS'),
    (1016983, 'MLB: played for the same-named St. Louis Browns (1892-1894), franchise STL'),
    (1016987, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1016991, 'MLB: played for the same-named St. Louis Browns (1896-1897), franchise STL'),
    (1017029, 'MLB: played for the same-named St. Louis Browns/St. Louis Perfectos/St. Louis Cardinals (1898-1900), franchise STL'),
    (1017077, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1017095, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1017299, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1017311, 'MLB: played for the same-named St. Louis Browns/St. Louis Cardinals (1897-1906), franchise STL'),
    (1017313, 'MLB: played for the same-named Philadelphia Athletics (1890-1890), franchise PHQ'),
    (1017318, 'MLB: played for the same-named Baltimore Orioles (1898-1898), franchise BLO'),
    (1017377, 'MLB: played for the same-named Baltimore Orioles (1892-1892), franchise BLO'),
    (1017411, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1017413, 'MLB: played for the same-named Baltimore Orioles (1892-1892), franchise BLO'),
    (1017513, 'MLB: played for the same-named St. Louis Browns (1893-1893), franchise STL'),
    (1017514, 'MLB: played for the same-named Washington Senators (1896-1896), franchise WAS'),
    (1017590, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1017608, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1017613, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1017617, 'MLB: played for the same-named Washington Senators (1898-1898), franchise WAS'),
    (1017810, 'MLB: played for the same-named Washington Senators (1897-1897), franchise WAS'),
    (1017811, 'MLB: played for the same-named Baltimore Orioles (1901-1902), franchise NYY'),
    (1017921, 'MLB: played for the same-named Washington Nationals (1887-1887), franchise WNL'),
    (1017995, 'MLB: played for the same-named Washington Senators (1899-1899), franchise WAS'),
    (1018031, 'MLB: played for the same-named Baltimore Orioles/New York Highlanders (1902-1903), franchise NYY'),
    (1018045, 'MLB: played for the same-named Baltimore Orioles (1902-1902), franchise NYY'),
    (1018058, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1018063, 'MLB: played for the same-named St. Louis Browns (1892-1893), franchise STL'),
    (1018127, 'MLB: played for the same-named Baltimore Orioles (1901-1901), franchise NYY'),
    (1018135, 'MLB: played for the same-named St. Louis Browns/St. Louis Cardinals (1891-1901), franchise STL'),
    (1018214, 'MLB: played for the same-named Washington Senators (1897-1898), franchise WAS'),
    (1018215, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1018216, 'MLB: played for the same-named St. Louis Browns (1883-1883), franchise STL'),
    (1018231, 'MLB: played for the same-named Philadelphia Athletics (1874-1874), franchise PNA'),
    (1018258, 'MLB: played for the same-named Philadelphia Athletics (1891-1891), franchise PHQ'),
    (1018259, 'MLB: played for the same-named St. Louis Browns (1893-1898), franchise STL'),
    (1018316, 'MLB: played for the same-named Milwaukee Brewers (1901-1901), franchise BAL'),
    (1018436, 'MLB: played for the same-named Philadelphia Athletics (1886-1890), franchise PHA'),
    (1023736, 'NHL: original Ottawa Senators (1917-34) only'),
    (1023737, 'NHL: original Ottawa Senators (1917-34) only'),
    (1023794, 'NHL: original Ottawa Senators (1917-34) only'),
    (1023838, 'NHL: original Ottawa Senators (1917-34) only'),
    (1023855, 'NHL: original Ottawa Senators (1917-34) only'),
    (1023895, 'NHL: original Ottawa Senators (1917-34) only'),
    (1024015, 'NHL: original Ottawa Senators (1917-34) only'),
    (1024028, 'NHL: original Ottawa Senators (1917-34) only'),
    (1024093, 'NHL: original Ottawa Senators (1917-34) only'),
    (997997, 'NBA: Baltimore Bullets (1944-54) only'),
    (998076, 'NBA: Baltimore Bullets (1944-54) only'),
    (998111, 'NBA: Baltimore Bullets (1944-54) only'),
    (998122, 'NBA: Baltimore Bullets (1944-54) only'),
    (998135, 'NBA: Baltimore Bullets (1944-54) only'),
    (998147, 'NBA: Baltimore Bullets (1944-54) only'),
    (998166, 'NBA: Baltimore Bullets (1944-54) only'),
    (998260, 'NBA: Baltimore Bullets (1944-54) only'),
    (998317, 'NBA: Baltimore Bullets (1944-54) only'),
    (998463, 'NBA: Baltimore Bullets (1944-54) only'),
    (998465, 'NBA: Baltimore Bullets (1944-54) only'),
    (998478, 'NBA: Baltimore Bullets (1944-54) only'),
    (998480, 'NBA: Baltimore Bullets (1944-54) only'),
    (998487, 'NBA: Baltimore Bullets (1944-54) only'),
    (998596, 'NBA: Baltimore Bullets (1944-54) only'),
    (998604, 'NBA: Baltimore Bullets (1944-54) only'),
    (998664, 'NBA: Baltimore Bullets (1944-54) only'),
    (998665, 'NBA: Baltimore Bullets (1944-54) only'),
    (998714, 'NBA: Baltimore Bullets (1944-54) only'),
    (998724, 'NBA: Baltimore Bullets (1944-54) only'),
    (998825, 'NBA: Baltimore Bullets (1944-54) only'),
    (998842, 'NBA: Baltimore Bullets (1944-54) only'),
    (998845, 'NBA: Baltimore Bullets (1944-54) only'),
    (998854, 'NBA: Baltimore Bullets (1944-54) only'),
    (998867, 'NBA: Baltimore Bullets (1944-54) only'),
    (998881, 'NBA: Baltimore Bullets (1944-54) only'),
    (998882, 'NBA: Baltimore Bullets (1944-54) only'),
    (998952, 'NBA: Baltimore Bullets (1944-54) only'),
    (998970, 'NBA: Baltimore Bullets (1944-54) only'),
    (999008, 'NBA: Baltimore Bullets (1944-54) only'),
    (999015, 'NBA: Baltimore Bullets (1944-54) only'),
    (999017, 'NBA: Baltimore Bullets (1944-54) only'),
    (999178, 'NBA: Baltimore Bullets (1944-54) only'),
    (999298, 'NBA: Baltimore Bullets (1944-54) only'),
    (999334, 'NBA: Baltimore Bullets (1944-54) only'),
    (999339, 'NBA: Baltimore Bullets (1944-54) only'),
    (999347, 'NBA: Baltimore Bullets (1944-54) only'),
    (999348, 'NBA: Baltimore Bullets (1944-54) only'),
    (999363, 'NBA: Baltimore Bullets (1944-54) only'),
    (999402, 'NBA: Baltimore Bullets (1944-54) only'),
    (999495, 'NBA: Baltimore Bullets (1944-54) only'),
    (999509, 'NBA: Baltimore Bullets (1944-54) only'),
    (999588, 'NBA: Baltimore Bullets (1944-54) only'),
    (999665, 'NBA: Baltimore Bullets (1944-54) only'),
    (999804, 'NBA: Baltimore Bullets (1944-54) only'),
    (999806, 'NBA: Baltimore Bullets (1944-54) only'),
    (999832, 'NBA: Baltimore Bullets (1944-54) only'),
    (999865, 'NBA: Baltimore Bullets (1944-54) only'),
    (999894, 'NBA: Baltimore Bullets (1944-54) only'),
    (999931, 'NBA: Baltimore Bullets (1944-54) only'),
    (999940, 'NBA: Baltimore Bullets (1944-54) only'),
    (998472, 'NBA: Denver Nuggets (1948-50) only'),
    (998526, 'NBA: Denver Nuggets (1948-50) only'),
    (998951, 'NBA: Denver Nuggets (1948-50) only'),
    (1000322, 'NFL: Baltimore Colts (1947-50) only'),
    (1000514, 'NFL: Baltimore Colts (1947-50) only'),
    (1000792, 'NFL: Baltimore Colts (1947-50) only'),
    (1001285, 'NFL: Baltimore Colts (1947-50) only'),
    (1001287, 'NFL: Baltimore Colts (1947-50) only'),
    (1001856, 'NFL: Baltimore Colts (1947-50) only'),
    (1002359, 'NFL: Baltimore Colts (1947-50) only'),
    (1004606, 'NFL: Baltimore Colts (1947-50) only'),
    (1005071, 'NFL: Baltimore Colts (1947-50) only'),
    (1005344, 'NFL: Baltimore Colts (1947-50) only'),
    (1005383, 'NFL: Baltimore Colts (1947-50) only'),
    (1007014, 'NFL: Baltimore Colts (1947-50) only'),
    (1007389, 'NFL: Baltimore Colts (1947-50) only'),
    (1011040, 'NFL: Baltimore Colts (1947-50) only'),
    (1011345, 'NFL: Baltimore Colts (1947-50) only'),
    (1011640, 'NFL: Baltimore Colts (1947-50) only'),
    (1001832, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1002618, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1004199, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1004302, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1005375, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1007219, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1011491, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1012702, 'NFL: Dallas Texans (NFL, 1952) only'),
    (1014530, 'NFL: Dallas Texans (NFL, 1952) only'),
    (892984, 'NFL: 1946-95 Cleveland Browns only'),
    (1007297, 'NFL: 1946-95 Cleveland Browns only')
    ) AS r(id, why) ON r.id = f.id;
ALTER TABLE backup_20261013_facts_034 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261013_facts_034 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  UPDATE player_facts f SET player_id = NULL, owner_method = 'unowned by 034: ' || b.reason_034 FROM backup_20261013_facts_034 b WHERE b.id = f.id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 227 THEN RAISE EXCEPTION '034: expected 227 rows unowned, got %', n; END IF;

  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, 'MLB', 'played_for_team', tm.v, p.id, 'early franchise history, Lahman appearances (034)'
    FROM (VALUES (2140840,1,0), (13661185,2,0), (21843608,1,0), (8188208,1,0), (7419926,1,0), (12588866,1,0), (11723790,1,0), (5081447,2,0), (604428,2,0), (11074968,1,0), (15973832,2,0), (8905400,1,0), (11561748,1,0), (673658,1,0), (11303502,1,0), (29916071,2,0), (15465169,2,0), (21383474,1,0), (29595225,2,0), (11528719,1,0), (24260850,2,0), (7532793,1,0), (11570064,2,0)) AS r(page_id, ti, t)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'Yankees'), (1, 'Cardinals'), (2, 'Orioles'), (3, 'Rangers'), (4, 'Brewers'), (5, 'Twins'), (6, 'Athletics'), (7, 'Nationals'), (8, 'Giants'), (9, 'Dodgers'), (10, 'Braves'), (11, 'Reds'), (12, 'Pirates'), (13, 'Phillies'), (14, 'Cubs'), (15, 'White Sox'), (16, 'Red Sox'), (17, 'Tigers'), (18, 'Indians')) AS tm(ti, v) ON tm.ti = r.ti
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = 'MLB' AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 23 THEN RAISE EXCEPTION '034: expected 23 rows added, got %', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261013_facts_034)                                                                          AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method LIKE 'unowned by 034:%' AND player_id IS NULL) AS unowned_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'early franchise history, Lahman appearances (034)')                                     AS added_rows,
  (SELECT string_agg(f.fact_value, ', ' ORDER BY f.fact_value) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 604428 AND f.fact_type = 'played_for_team' AND f.fact_value IN ('Brewers', 'Orioles')) AS duffy,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 1007215 AND f.fact_value = 'Senators') AS clancy_senators,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261013_facts_034')                                 AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261013_facts_034' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants;
-- EXPECTED: backup_rows = 227; unowned_rows = 227; added_rows = 23; duffy = Orioles; clancy_senators = 0; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method = 'early franchise history, Lahman appearances (034)';
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261013_facts_034 b WHERE b.id = f.id;
-- DROP TABLE backup_20261013_facts_034;
-- COMMIT;
