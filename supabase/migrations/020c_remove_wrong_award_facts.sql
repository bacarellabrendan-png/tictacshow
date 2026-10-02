-- Migration 020c: remove award facts the official lists prove wrong; fix 2 owners, unown 1
-- Run in Supabase SQL Editor AFTER 020a, and ONLY after the confirmed-wrong list is approved. One transaction. PURE ASCII.
-- Checked 1 Oct 2026 against Wikipedia's official award lists (owner linked from the list; for lists that also
-- mention people in prose, owner inside the winners table), with Lahman / cached Sports-Reference award pages as
-- a second source, and for MLB All-Star facts the yearly All-Star Game rosters during the owner's career.
--   DELETE 107 facts (NBA 27, NFL 16, MLB 55, NHL 9): no person of that name is on the list (a namesake on it = wrong owner, not deleted)
--   MOVE   2 NFL Pro Bowl facts to the namesake the Pro Bowl rosters list
--   UNOWN  1 MLB All-Star fact (Jacob Wilson): the 2025 All-Star is not in our players
-- Championship facts are not part of this check. Deleted rows are backed up with their reasons.
-- 0. BACKUP: every touched row as it is now, with the action and reason.
-- 1. GUARD: every row still exists exactly as reviewed (name, sport, type, value, owner). Else nothing changes.

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20261001_facts_020c AS
  SELECT f.*, r.action, r.reason FROM player_facts f JOIN (VALUES
    (213, 'delete', 'Wikipedia: not on "NBA Sixth Man of the Year Award"'),
    (221, 'delete', 'Wikipedia: not on "NBA Sixth Man of the Year Award"'),
    (225, 'delete', 'Wikipedia: not on "NBA Sixth Man of the Year Award"'),
    (231, 'delete', 'Wikipedia: not on "NBA Sixth Man of the Year Award"'),
    (233, 'delete', 'Wikipedia: not on "NBA Sixth Man of the Year Award"'),
    (251, 'delete', 'Wikipedia: not on "Bill Russell NBA Finals Most Valuable Player Award"'),
    (319, 'delete', 'Wikipedia: not on "NBA Most Valuable Player Award"'),
    (381, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (383, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (385, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (387, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (393, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (483, 'delete', 'Wikipedia: not on "NBA All-Defensive Team"'),
    (593, 'delete', 'Wikipedia: not on "NBA Defensive Player of the Year Award"'),
    (631, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (640, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (865, 'delete', 'Wikipedia: not on any of the 76 official lists (1951 Pro Bowl)'),
    (934, 'delete', 'Wikipedia: not on "Heisman Trophy"'),
    (1125, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1127, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1128, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1131, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1132, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1134, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1135, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1137, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1138, 'delete', 'Wikipedia: not on "AP NFL Defensive Player of the Year"'),
    (1269, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1279, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1379, 'delete', 'Wikipedia: not on "World Series Most Valuable Player Award"'),
    (1383, 'delete', 'Wikipedia: not on "World Series Most Valuable Player Award"'),
    (1384, 'delete', 'Wikipedia: not on "Major League Baseball Most Valuable Player Award"'),
    (1385, 'delete', 'Wikipedia: not on "World Series Most Valuable Player Award"'),
    (1387, 'delete', 'Wikipedia: not on "World Series Most Valuable Player Award"'),
    (1393, 'delete', 'Wikipedia: not on "World Series Most Valuable Player Award"'),
    (1396, 'delete', 'Wikipedia: not on "Major League Baseball Most Valuable Player Award"'),
    (1398, 'delete', 'Wikipedia: not on "Major League Baseball Most Valuable Player Award"'),
    (1425, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1524, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1527, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1529, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1536, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1580, 'delete', 'Wikipedia: not on "List of Major League Baseball batting champions"'),
    (1821, 'delete', 'Wikipedia: not on "Cy Young Award"'),
    (1838, 'delete', 'Wikipedia: not on "List of Major League Baseball batting champions"'),
    (1864, 'delete', 'Wikipedia: not on "List of Major League Baseball batting champions"'),
    (1867, 'delete', 'Wikipedia: not on "List of Major League Baseball batting champions"'),
    (1870, 'delete', 'Wikipedia: not on "List of Major League Baseball batting champions"'),
    (1969, 'delete', 'Wikipedia: not on "Hart Memorial Trophy"'),
    (1971, 'delete', 'Wikipedia: not on "Hart Memorial Trophy"'),
    (1993, 'delete', 'Wikipedia: not on "Hart Memorial Trophy"'),
    (2058, 'delete', 'Wikipedia: not on "James Norris Memorial Trophy"'),
    (2060, 'delete', 'Wikipedia: not on "James Norris Memorial Trophy"'),
    (2066, 'delete', 'Wikipedia: not on "James Norris Memorial Trophy"'),
    (2128, 'delete', 'Wikipedia: not on "Vezina Trophy"'),
    (2144, 'delete', 'Wikipedia: not on "Vezina Trophy"'),
    (4538, 'delete', 'Wikipedia: not on "NBA Most Valuable Player Award"'),
    (4541, 'delete', 'Wikipedia: not on "NBA Most Valuable Player Award"'),
    (5207, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (5209, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (5213, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (5214, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (5220, 'delete', 'Wikipedia: not on "List of NBA annual scoring leaders"'),
    (5227, 'delete', 'Wikipedia: not on "NBA Defensive Player of the Year Award"'),
    (5229, 'delete', 'Wikipedia: not on "NBA Defensive Player of the Year Award"'),
    (5238, 'delete', 'Wikipedia: not on "NBA Defensive Player of the Year Award"'),
    (6403, 'delete', 'Wikipedia: not on "Super Bowl Most Valuable Player"'),
    (6405, 'delete', 'Wikipedia: not on "Super Bowl Most Valuable Player"'),
    (6406, 'delete', 'Wikipedia: not on "Super Bowl Most Valuable Player"'),
    (6408, 'delete', 'Wikipedia: not on "Super Bowl Most Valuable Player"'),
    (6409, 'delete', 'Wikipedia: not on "Super Bowl Most Valuable Player"'),
    (1029480, 'delete', 'Wikipedia: not on any of the 9 official lists (List of Silver Slugger Award winners by position)'),
    (1029484, 'delete', 'Wikipedia: not on any of the 9 official lists (List of Silver Slugger Award winners by position)'),
    (1029485, 'delete', 'Wikipedia: not on any of the 9 official lists (List of Silver Slugger Award winners by position)'),
    (1030010, 'delete', 'Wikipedia: not on any of the 8 official lists (List of Gold Glove Award winners by position)'),
    (1369, 'delete', 'Wikipedia: not in the winners table (prose mention only); Lahman agrees'),
    (1381, 'delete', 'Wikipedia: not in the winners table (prose mention only); Lahman agrees'),
    (1985, 'delete', 'Wikipedia: not in the winners table (prose mention only); Hockey-Reference (cached) agrees'),
    (1025396, 'delete', 'Wikipedia: not in any All-NBA Team table (prose mention only)'),
    (57289, 'delete', 'never played in MLB (umpire); no MLB playing record; Lahman has no All-Star selection'),
    (57307, 'delete', 'never played in MLB (umpire); no MLB playing record; Lahman has no All-Star selection'),
    (57308, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1971-1978'),
    (57334, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 2012-2025'),
    (57338, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 2019-2025'),
    (57343, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 2015-2022'),
    (57350, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 2019-2023'),
    (59627, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1975-1975'),
    (59628, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1956-1963'),
    (59629, 'delete', 'never played in MLB (manager/coach); no MLB playing record; Lahman has no All-Star selection'),
    (59630, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1955-1966'),
    (59631, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1969-1979'),
    (59632, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1961-1969'),
    (59636, 'delete', 'never played in MLB (umpire); no MLB playing record; Lahman has no All-Star selection'),
    (59637, 'delete', 'never played in MLB (umpire); no MLB playing record; Lahman has no All-Star selection'),
    (59669, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1963-1973'),
    (59670, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1964-1973'),
    (59685, 'delete', 'never played in MLB (manager/coach); no MLB playing record; Lahman has no All-Star selection'),
    (59745, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1968-1969'),
    (59746, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1966-1967'),
    (59747, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1964-1973'),
    (59748, 'delete', 'never played in MLB (coach); no MLB playing record; Lahman has no All-Star selection'),
    (59749, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1954-1956'),
    (59761, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1959-1959'),
    (59762, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1961-1969'),
    (59764, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1970-1981'),
    (59954, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1969-1975'),
    (59970, 'delete', 'Lahman has no selection and he is not linked on any All-Star Game article 1980-1981'),
    (80054, 'move', 'Wikipedia Pro Bowl rosters list Michael Brooks (page 9974962), not Michael Brooks (defensive back)'),
    (80911, 'move', 'Wikipedia Pro Bowl rosters list Eddie Jackson (page 49074950), not Eddie Jackson (chef)'),
    (58948, 'unown', 'the 2025 All-Star is Jacob Wilson (shortstop), page 73647519, not in our players; owner removed, row kept for when he is added')
  ) AS r(id, action, reason) ON r.id = f.id;
ALTER TABLE backup_20261001_facts_020c ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261001_facts_020c FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  -- --- 1. GUARD ------------------------------------------------------------------------------
  SELECT count(*) INTO n FROM player_facts f JOIN (VALUES
    (213, 'Taj Gibson', 'NBA', 'nba_sixth_man_award', 'true', 28702),
    (221, 'Vinnie Johnson', 'NBA', 'nba_sixth_man_award', 'true', 4917),
    (225, 'Thabo Sefolosha', 'NBA', 'nba_sixth_man_award', 'true', 17027),
    (231, 'Toney Douglas', 'NBA', 'nba_sixth_man_award', 'true', 44314),
    (233, 'James Jones', 'NBA', 'nba_sixth_man_award', 'true', 7293),
    (251, 'Tom Gola', 'NBA', 'nba_finals_mvp', 'true', 331),
    (319, 'Dolph Schayes', 'NBA', 'nba_mvp', 'true', 726),
    (381, 'Isiah Thomas', 'NBA', 'nba_scoring_title', 'true', 864),
    (383, 'Magic Johnson', 'NBA', 'nba_scoring_title', 'true', 43),
    (385, 'Kevin Johnson', 'NBA', 'nba_scoring_title', 'true', 130),
    (387, 'Lenny Wilkens', 'NBA', 'nba_scoring_title', 'true', 1929),
    (393, 'John Havlicek', 'NBA', 'nba_scoring_title', 'true', 2576),
    (483, 'Kevin Durant', 'NBA', 'nba_all_defensive_team', 'true', 20477),
    (593, 'Anthony Davis', 'NBA', 'nba_dpoy', 'true', 47892),
    (631, 'Richie Guerin', 'NBA', 'nba_scoring_title', 'true', 4504),
    (640, 'Damian Lillard', 'NBA', 'nba_scoring_title', 'true', 53611),
    (865, 'Santonio Holmes', 'NFL', 'nfl_pro_bowl', 'true', 11896),
    (934, 'Billy Kilmer', 'NFL', 'heisman_trophy', 'true', 11311),
    (1125, 'Dwight Freeney', 'NFL', 'nfl_dpoy', 'true', 3003),
    (1127, 'Richard Dent', 'NFL', 'nfl_dpoy', 'true', 2827),
    (1128, 'Chris Doleman', 'NFL', 'nfl_dpoy', 'true', 3330),
    (1131, 'Kevin Greene', 'NFL', 'nfl_dpoy', 'true', 6993),
    (1132, 'Jevon Kearse', 'NFL', 'nfl_dpoy', 'true', 3030),
    (1134, 'Derrick Thomas', 'NFL', 'nfl_dpoy', 'true', 2011),
    (1135, 'Von Miller', 'NFL', 'nfl_dpoy', 'true', 45494),
    (1137, 'DeMarcus Ware', 'NFL', 'nfl_dpoy', 'true', 4965),
    (1138, 'Micah Parsons', 'NFL', 'nfl_dpoy', 'true', 65135),
    (1269, 'Mike Mussina', 'MLB', 'mlb_cy_young', 'true', 2503),
    (1279, 'Tom Gordon', 'MLB', 'mlb_cy_young', 'true', 2732),
    (1379, 'Mickey Mantle', 'MLB', 'mlb_ws_mvp', 'true', 70),
    (1383, 'Lou Brock', 'MLB', 'mlb_ws_mvp', 'true', 137),
    (1384, 'Lou Brock', 'MLB', 'mlb_mvp', 'true', 137),
    (1385, 'Orlando Cepeda', 'MLB', 'mlb_ws_mvp', 'true', 749),
    (1387, 'Hank Aaron', 'MLB', 'mlb_ws_mvp', 'true', 20),
    (1393, 'Dustin Pedroia', 'MLB', 'mlb_ws_mvp', 'true', 9793),
    (1396, 'Manny Ramirez', 'MLB', 'mlb_mvp', 'true', 6176),
    (1398, 'David Ortiz', 'MLB', 'mlb_mvp', 'true', 1623),
    (1425, 'Walker Buehler', 'MLB', 'mlb_cy_young', 'true', 60526),
    (1524, 'Curt Schilling', 'MLB', 'mlb_cy_young', 'true', 227),
    (1527, 'Derek Lowe', 'MLB', 'mlb_cy_young', 'true', 527),
    (1529, 'Tim Wakefield', 'MLB', 'mlb_cy_young', 'true', 392),
    (1536, 'Cole Hamels', 'MLB', 'mlb_cy_young', 'true', 14823),
    (1580, 'Robinson Cano', 'MLB', 'mlb_batting_title', 'true', 5515),
    (1821, 'Vernon Gomez', 'MLB', 'mlb_cy_young', 'true', 985),
    (1838, 'Vladimir Guerrero', 'MLB', 'mlb_batting_title', 'true', 509),
    (1864, 'Jorge Posada', 'MLB', 'mlb_batting_title', 'true', 1736),
    (1867, 'Orlando Cepeda', 'MLB', 'mlb_batting_title', 'true', 749),
    (1870, 'Roberto Alomar', 'MLB', 'mlb_batting_title', 'true', 492),
    (1969, 'Steve Yzerman', 'NHL', 'nhl_hart_trophy', 'true', 146),
    (1971, 'Mats Sundin', 'NHL', 'nhl_hart_trophy', 'true', 666),
    (1993, 'Ted Lindsay', 'NHL', 'nhl_hart_trophy', 'true', 967),
    (2058, 'Tim Horton', 'NHL', 'nhl_norris_trophy', 'true', 616),
    (2060, 'Scott Stevens', 'NHL', 'nhl_norris_trophy', 'true', 667),
    (2066, 'Shea Weber', 'NHL', 'nhl_norris_trophy', 'true', 10675),
    (2128, 'Mike Vernon', 'NHL', 'nhl_vezina_trophy', 'true', 2727),
    (2144, 'Corey Crawford', 'NHL', 'nhl_vezina_trophy', 'true', 13334),
    (4538, 'Jerry West', 'NBA', 'nba_mvp', 'true', 393),
    (4541, 'Elgin Baylor', 'NBA', 'nba_mvp', 'true', 590),
    (5207, 'Larry Bird', 'NBA', 'nba_scoring_title', 'true', 58),
    (5209, 'Bob Cousy', 'NBA', 'nba_scoring_title', 'true', 441),
    (5213, 'Kevin McHale', 'NBA', 'nba_scoring_title', 'true', 2752),
    (5214, 'Ed Macauley', 'NBA', 'nba_scoring_title', 'true', 3830),
    (5220, 'Dave Cowens', 'NBA', 'nba_scoring_title', 'true', 4539),
    (5227, 'Scottie Pippen', 'NBA', 'nba_dpoy', 'true', 347),
    (5229, 'Horace Grant', 'NBA', 'nba_dpoy', 'true', 348),
    (5238, 'Charles Oakley', 'NBA', 'nba_dpoy', 'true', 3144),
    (6403, 'Michael Irvin', 'NFL', 'nfl_super_bowl_mvp', 'true', 704),
    (6405, 'Jay Novacek', 'NFL', 'nfl_super_bowl_mvp', 'true', 3846),
    (6406, 'Daryl Johnston', 'NFL', 'nfl_super_bowl_mvp', 'true', 3859),
    (6408, 'Deion Sanders', 'NFL', 'nfl_super_bowl_mvp', 'true', 2090),
    (6409, 'Tony Dorsett', 'NFL', 'nfl_super_bowl_mvp', 'true', 371),
    (1029480, 'Cy Young', 'MLB', 'mlb_silver_slugger', 'true', 8),
    (1029484, 'Roberto Clemente', 'MLB', 'mlb_silver_slugger', 'true', 36),
    (1029485, 'Hank Aaron', 'MLB', 'mlb_silver_slugger', 'true', 20),
    (1030010, 'Cy Young', 'MLB', 'mlb_gold_glove', 'true', 8),
    (1369, 'Barry Bonds', 'MLB', 'mlb_ws_mvp', 'true', 5),
    (1381, 'Yogi Berra', 'MLB', 'mlb_ws_mvp', 'true', 46),
    (1985, 'Jarome Iginla', 'NHL', 'nhl_hart_trophy', 'true', 671),
    (1025396, 'Khris Middleton', 'NBA', 'nba_all_nba_team', 'true', 51921),
    (57289, 'Lee Weyer', 'MLB', 'mlb_all_star', 'true', 7994),
    (57307, 'Nick Bremigan', 'MLB', 'mlb_all_star', 'true', 37169),
    (57308, 'Charlie Williams', 'MLB', 'mlb_all_star', 'true', 42937),
    (57334, 'Donovan Solano', 'MLB', 'mlb_all_star', 'true', 43292),
    (57338, 'Mike Yastrzemski', 'MLB', 'mlb_all_star', 'true', 58563),
    (57343, 'Pedro Severino', 'MLB', 'mlb_all_star', 'true', 59431),
    (57350, 'Kyle Lewis', 'MLB', 'mlb_all_star', 'true', 62311),
    (59627, 'Tom Kelly', 'MLB', 'mlb_all_star', 'true', 2241),
    (59628, 'Whitey Herzog', 'MLB', 'mlb_all_star', 'true', 1710),
    (59629, 'Tom Trebelhorn', 'MLB', 'mlb_all_star', 'true', 7151),
    (59630, 'Roger Craig', 'MLB', 'mlb_all_star', 'true', 39551),
    (59631, 'Bobby Valentine', 'MLB', 'mlb_all_star', 'true', 2609),
    (59632, 'Buck Rodgers', 'MLB', 'mlb_all_star', 'true', 6938),
    (59636, 'Larry Barnett', 'MLB', 'mlb_all_star', 'true', 7995),
    (59637, 'Terry Tata', 'MLB', 'mlb_all_star', 'true', 34699),
    (59669, 'Tony La Russa', 'MLB', 'mlb_all_star', 'true', 2624),
    (59670, 'Jeff Torborg', 'MLB', 'mlb_all_star', 'true', 5283),
    (59685, 'Jim Leyland', 'MLB', 'mlb_all_star', 'true', 400),
    (59745, 'Bobby Cox', 'MLB', 'mlb_all_star', 'true', 1945),
    (59746, 'Jimy Williams', 'MLB', 'mlb_all_star', 'true', 4633),
    (59747, 'Pat Corrales', 'MLB', 'mlb_all_star', 'true', 7730),
    (59748, 'Leo Mazzone', 'MLB', 'mlb_all_star', 'true', 7728),
    (59749, 'Tommy Lasorda', 'MLB', 'mlb_all_star', 'true', 1641),
    (59761, 'Sparky Anderson', 'MLB', 'mlb_all_star', 'true', 116),
    (59762, 'Galen Cisco', 'MLB', 'mlb_all_star', 'true', 29855),
    (59764, 'Johnny Oates', 'MLB', 'mlb_all_star', 'true', 3377),
    (59954, 'Charlie Manuel', 'MLB', 'mlb_all_star', 'true', 7208),
    (59970, 'Jim Tracy', 'MLB', 'mlb_all_star', 'true', 4855),
    (80054, 'Michael Brooks', 'NFL', 'nfl_pro_bowl', 'true', 32143),
    (80911, 'Eddie Jackson', 'NFL', 'nfl_pro_bowl', 'true', 13715),
    (58948, 'Jacob Wilson', 'MLB', 'mlb_all_star', 'true', 59314)
  ) AS g(id, player_name, sport, fact_type, fact_value, player_id)
    ON g.id = f.id AND g.player_name = f.player_name AND g.sport = f.sport AND g.fact_type = f.fact_type
   AND g.fact_value = f.fact_value AND g.player_id = f.player_id;
  IF n <> 110 THEN RAISE EXCEPTION '020c guard: % of 110 rows unchanged; nothing applied', n; END IF;

  -- --- 2. MOVE owners ------------------------------------------------------------------------
  UPDATE player_facts f SET player_id = p.id, owner_method = 'Wikipedia list (020c)'
    FROM (VALUES
    (80054, 9974962),
    (80911, 49074950)
    ) AS m(fact_id, page_id) JOIN players p ON p.wikipedia_page_id = m.page_id
   WHERE f.id = m.fact_id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 2 THEN RAISE EXCEPTION '020c: expected 2 owner moves, got %', n; END IF;

  -- --- 3. UNOWN -------------------------------------------------------------------------------
  UPDATE player_facts SET player_id = NULL, owner_method = 'unowned (020c): belongs to a player not in players'
   WHERE id IN (58948);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 1 THEN RAISE EXCEPTION '020c: expected 1 unowned, got %', n; END IF;

  -- --- 4. DELETE ------------------------------------------------------------------------------
  DELETE FROM player_facts WHERE id IN (SELECT id FROM backup_20261001_facts_020c WHERE action = 'delete');
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 107 THEN RAISE EXCEPTION '020c: expected 107 deletions, got %', n; END IF;
END
$mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM backup_20261001_facts_020c)                                                     AS backup_rows,
  (SELECT string_agg(action || ':' || c, ', ' ORDER BY action) FROM (SELECT action, count(*) c FROM backup_20261001_facts_020c GROUP BY action) t) AS by_action,
  (SELECT count(*) FROM player_facts WHERE id IN (SELECT id FROM backup_20261001_facts_020c WHERE action = 'delete')) AS deleted_still_present,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id
     WHERE f.id IN (SELECT id FROM backup_20261001_facts_020c WHERE action = 'move') AND p.wikipedia_page_id IN (9974962, 49074950)) AS moved_to_namesake,
  (SELECT count(*) FROM player_facts WHERE id IN (SELECT id FROM backup_20261001_facts_020c WHERE action = 'unown') AND player_id IS NULL) AS unowned,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id
     WHERE p.display_name = 'Jerry West' AND f.fact_type = 'nba_mvp')                                      AS jerry_west_mvp,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261001_facts_020c')            AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name = 'backup_20261001_facts_020c' AND grantee IN ('anon', 'authenticated'))            AS backup_browser_grants;
-- EXPECTED: backup_rows = 110; by_action = delete:107, move:2, unown:1; deleted_still_present = 0; moved_to_namesake = 2; unowned = 1; jerry_west_mvp = 0; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- BEGIN;
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261001_facts_020c b WHERE b.id = f.id AND b.action IN ('move', 'unown');
-- INSERT INTO player_facts (id, player_name, sport, fact_type, fact_value, player_id, owner_method)
--   OVERRIDING SYSTEM VALUE SELECT id, player_name, sport, fact_type, fact_value, player_id, owner_method FROM backup_20261001_facts_020c WHERE action = 'delete';
-- DROP TABLE backup_20261001_facts_020c;
-- COMMIT;
