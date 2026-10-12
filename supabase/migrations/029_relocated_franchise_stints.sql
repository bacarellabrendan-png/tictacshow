-- Migration 029: stints under a relocated franchise's former name, credited per official franchise history
-- PURE ASCII (no player names in this file: names come from players). Additive; guard first, backup of adopted rows.
-- Our facts already credit former names to today's franchise (Ciccarelli: North Stars -> Stars; Campbell: Houston Oilers
-- -> Titans; Robertson: Cincinnati Royals -> Kings). These players were listed by Wikidata only under the former name's own
-- item, so the earlier sweep missed them. Each is confirmed by the infobox playing career (no practice squad, coaching or draft).
--   155 stints: NBA 12, NFL 42, MLB 1, NHL 100
--   NHL Stars (Minnesota North Stars) 96; NFL Chargers (San Diego Chargers) 17; NFL Rams (St. Louis Rams) 14; NBA Thunder (Seattle SuperSonics) 7; NFL Titans (Houston Oilers) 7; NFL Cardinals (Chicago Cardinals) 4; NBA Kings (Cincinnati Royals) 3; NHL Jets (Atlanta Thrashers) 3; NBA Grizzlies (Vancouver Grizzlies) 1; NBA Warriors (Philadelphia Warriors) 1; NHL Devils (Kansas City Scouts) 1; MLB Nationals (Montreal Expos) 1
--   1 existing unowned rows get their owner; 154 rows inserted (7 under the article title).

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  SELECT count(*) INTO n FROM player_facts WHERE owner_method IN ('wikipedia infobox, relocated franchise history (029)');
  IF n > 0 OR to_regclass('public.backup_20261012_facts_029') IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 029 is already applied (% rows with its owner_method). Nothing changed.', n;
  END IF;
  SELECT count(*) INTO n FROM player_facts WHERE id IN (690058) AND player_id IS NULL AND fact_type = 'played_for_team';
  IF n <> 1 THEN RAISE EXCEPTION '029 guard: expected 1 unowned rows to own, found %. Nothing changed.', n; END IF;
END $mig$;

-- --- BACKUP: rows that get an owner, as they are now (RLS on, closed) -----------------------------
CREATE TABLE backup_20261012_facts_029 AS SELECT * FROM player_facts WHERE id IN (690058);
ALTER TABLE backup_20261012_facts_029 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261012_facts_029 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  -- --- OWNERS (fact id, page id, team, owner_method) ----------------------------------------------
  UPDATE player_facts f SET player_id = p.id, owner_method = o.m
    FROM (VALUES
    (690058, 10105040, 'Chargers', 'wikipedia infobox, relocated franchise history (029)')
    ) AS o(fact_id, page_id, team, m)
    JOIN players p ON p.wikipedia_page_id = o.page_id
   WHERE f.id = o.fact_id AND f.player_id IS NULL AND f.fact_value = o.team;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 1 THEN RAISE EXCEPTION '029: expected 1 owners set, got %', n; END IF;

  -- --- NEW ROWS (page id, team number, 1 = store under the article title, owner_method number) ------
  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, tm.sport, 'played_for_team', tm.v, p.id, mm.m
    FROM (VALUES
(1184204,20,0,0),
(5807189,20,0,0),
(2351254,20,0,0),
(2788057,20,0,0),
(11533712,20,0,0),
(11370465,20,0,0),
(4832419,20,0,0),
(6004000,29,0,0),
(1704387,24,0,0),
(11935593,24,0,0),
(9840407,24,0,0),
(1723213,2,0,0),
(1822453,112,0,0),
(12009447,112,0,0),
(10784330,112,0,0),
(14573085,112,0,0),
(12992455,112,0,0),
(11994604,112,0,0),
(16078766,112,0,0),
(6220152,112,0,0),
(10834531,112,0,0),
(16095335,112,0,0),
(7604363,112,0,0),
(662079,112,0,0),
(14095008,112,0,0),
(11422122,112,0,0),
(14258686,112,0,0),
(5950537,112,0,0),
(11171839,112,0,0),
(5393954,112,0,0),
(10784730,112,0,0),
(2027771,112,0,0),
(10392885,112,0,0),
(10802292,112,0,0),
(3700852,112,0,0),
(10834783,112,0,0),
(10814438,112,0,0),
(21394724,112,0,0),
(8628598,112,0,0),
(12114630,112,0,0),
(9583904,112,0,0),
(12573945,112,0,0),
(5867963,112,0,0),
(10335513,112,0,0),
(8614546,112,0,0),
(9250999,112,0,0),
(10831366,112,0,0),
(8628480,112,0,0),
(10815856,112,0,0),
(1372430,112,0,0),
(16339350,112,0,0),
(6158489,112,0,0),
(12572541,112,0,0),
(14777122,112,0,0),
(2027845,112,0,0),
(3986206,112,0,0),
(6125343,112,0,0),
(10117702,112,0,0),
(4982238,112,0,0),
(3705438,112,0,0),
(10832089,112,0,0),
(10843787,112,0,0),
(10815768,112,0,0),
(921600,112,0,0),
(10078368,112,0,0),
(13571945,112,0,0),
(10859662,112,0,0),
(6037718,112,0,0),
(17269481,112,0,0),
(7348258,112,0,0),
(6077083,112,0,0),
(3543292,112,0,0),
(14789515,112,0,0),
(596525,112,0,0),
(1519630,112,0,0),
(5518284,112,0,0),
(13526505,112,0,0),
(12571058,112,0,0),
(8957797,112,0,0),
(6069314,112,0,0),
(11466220,112,0,0),
(5987447,112,0,0),
(5954465,112,0,0),
(3860470,112,0,0),
(11298418,112,0,0),
(7098315,112,0,0),
(5731190,112,0,0),
(13881156,112,0,0),
(6595024,112,0,0),
(20517835,112,0,0),
(16339322,112,0,0),
(3885532,112,0,0),
(5132463,112,0,0),
(466944,112,0,0),
(4010872,112,0,0),
(6028874,112,0,0),
(3986242,112,0,0),
(7534841,112,0,0),
(4041215,112,0,0),
(15885206,112,0,0),
(7062005,112,0,0),
(5524032,112,0,0),
(629770,112,0,0),
(6250801,112,0,0),
(8340238,112,0,0),
(5803466,112,0,0),
(4895328,112,0,0),
(7300200,112,0,0),
(7779847,107,0,0),
(2994559,116,0,0),
(3664239,116,0,0),
(644533,116,0,0),
(3632496,89,0,0),
(14715887,60,1,0),
(11044469,60,0,0),
(18895040,60,0,0),
(9562235,60,0,0),
(22722328,60,0,0),
(34088662,60,1,0),
(13232674,60,0,0),
(10947398,49,1,0),
(16301976,49,0,0),
(9338527,49,0,0),
(548282,49,0,0),
(40498474,49,0,0),
(3315237,49,0,0),
(4949192,49,0,0),
(3751377,49,0,0),
(6097982,49,0,0),
(3309206,49,0,0),
(437932,49,0,0),
(3217115,49,0,0),
(2203685,49,1,0),
(1633165,49,1,0),
(13422515,56,0,0),
(51232157,56,0,0),
(21422423,56,0,0),
(25947259,56,0,0),
(2657614,44,0,0),
(9016126,44,0,0),
(11447152,44,0,0),
(15390585,44,0,0),
(9489644,44,0,0),
(10558421,44,1,0),
(10104440,44,1,0),
(21538248,44,0,0),
(2463111,44,0,0),
(13682952,44,0,0),
(10675635,44,0,0),
(59499142,44,0,0),
(59736168,44,0,0),
(3463848,44,0,0),
(4065281,44,0,0),
(10957791,44,0,0)
    ) AS r(page_id, ti, t, mi)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'NBA', 'Lakers'), (1, 'NBA', 'Celtics'), (2, 'NBA', 'Warriors'), (3, 'NBA', 'Bulls'), (4, 'NBA', 'Heat'), (5, 'NBA', 'Nets'), (6, 'NBA', 'Rockets'), (7, 'NBA', '76ers'), (8, 'NBA', 'Cavaliers'), (9, 'NBA', 'Knicks'), (10, 'NBA', 'Suns'), (11, 'NBA', 'Spurs'), (12, 'NBA', 'Raptors'), (13, 'NBA', 'Mavericks'), (14, 'NBA', 'Trail Blazers'), (15, 'NBA', 'Clippers'), (16, 'NBA', 'Bucks'), (17, 'NBA', 'Timberwolves'), (18, 'NBA', 'Hawks'), (19, 'NBA', 'Pistons'), (20, 'NBA', 'Thunder'), (21, 'NBA', 'Nuggets'), (22, 'NBA', 'Pacers'), (23, 'NBA', 'Jazz'), (24, 'NBA', 'Kings'), (25, 'NBA', 'Hornets'), (26, 'NBA', 'Magic'), (27, 'NBA', 'Wizards'), (28, 'NBA', 'Pelicans'), (29, 'NBA', 'Grizzlies'), (30, 'NFL', 'Patriots'), (31, 'NFL', 'Cowboys'), (32, 'NFL', 'Broncos'), (33, 'NFL', 'Steelers'), (34, 'NFL', '49ers'), (35, 'NFL', 'Chiefs'), (36, 'NFL', 'Raiders'), (37, 'NFL', 'Bears'), (38, 'NFL', 'Saints'), (39, 'NFL', 'Seahawks'), (40, 'NFL', 'Eagles'), (41, 'NFL', 'Packers'), (42, 'NFL', 'Ravens'), (43, 'NFL', 'Giants'), (44, 'NFL', 'Chargers'), (45, 'NFL', 'Dolphins'), (46, 'NFL', 'Vikings'), (47, 'NFL', 'Falcons'), (48, 'NFL', 'Buccaneers'), (49, 'NFL', 'Rams'), (50, 'NFL', 'Bengals'), (51, 'NFL', 'Bills'), (52, 'NFL', 'Colts'), (53, 'NFL', 'Lions'), (54, 'NFL', 'Texans'), (55, 'NFL', 'Panthers'), (56, 'NFL', 'Cardinals'), (57, 'NFL', 'Browns'), (58, 'NFL', 'Jaguars'), (59, 'NFL', 'Jets'), (60, 'NFL', 'Titans'), (61, 'NFL', 'Commanders'), (62, 'MLB', 'Yankees'), (63, 'MLB', 'Red Sox'), (64, 'MLB', 'Dodgers'), (65, 'MLB', 'Cubs'), (66, 'MLB', 'Cardinals'), (67, 'MLB', 'Braves'), (68, 'MLB', 'Giants'), (69, 'MLB', 'Mets'), (70, 'MLB', 'Phillies'), (71, 'MLB', 'Reds'), (72, 'MLB', 'Astros'), (73, 'MLB', 'White Sox'), (74, 'MLB', 'Athletics'), (75, 'MLB', 'Padres'), (76, 'MLB', 'Angels'), (77, 'MLB', 'Rangers'), (78, 'MLB', 'Marlins'), (79, 'MLB', 'Mariners'), (80, 'MLB', 'Pirates'), (81, 'MLB', 'Indians'), (82, 'MLB', 'Tigers'), (83, 'MLB', 'Orioles'), (84, 'MLB', 'Brewers'), (85, 'MLB', 'Twins'), (86, 'MLB', 'Royals'), (87, 'MLB', 'Rays'), (88, 'MLB', 'Rockies'), (89, 'MLB', 'Nationals'), (90, 'MLB', 'Diamondbacks'), (91, 'MLB', 'Blue Jays'), (92, 'NHL', 'Bruins'), (93, 'NHL', 'Penguins'), (94, 'NHL', 'Rangers'), (95, 'NHL', 'Red Wings'), (96, 'NHL', 'Blackhawks'), (97, 'NHL', 'Canadiens'), (98, 'NHL', 'Maple Leafs'), (99, 'NHL', 'Oilers'), (100, 'NHL', 'Kings'), (101, 'NHL', 'Flyers'), (102, 'NHL', 'Blues'), (103, 'NHL', 'Avalanche'), (104, 'NHL', 'Capitals'), (105, 'NHL', 'Canucks'), (106, 'NHL', 'Sabres'), (107, 'NHL', 'Devils'), (108, 'NHL', 'Sharks'), (109, 'NHL', 'Flames'), (110, 'NHL', 'Lightning'), (111, 'NHL', 'Senators'), (112, 'NHL', 'Stars'), (113, 'NHL', 'Islanders'), (114, 'NHL', 'Ducks'), (115, 'NHL', 'Hurricanes'), (116, 'NHL', 'Jets'), (117, 'NHL', 'Wild'), (118, 'NHL', 'Predators'), (119, 'NHL', 'Blue Jackets'), (120, 'NHL', 'Panthers'), (121, 'NHL', 'Golden Knights'), (122, 'NHL', 'Kraken'), (123, 'NHL', 'Coyotes'), (124, 'Soccer', 'Arsenal'), (125, 'Soccer', 'Aston Villa'), (126, 'Soccer', 'Bournemouth'), (127, 'Soccer', 'Brentford'), (128, 'Soccer', 'Brighton'), (129, 'Soccer', 'Chelsea'), (130, 'Soccer', 'Crystal Palace'), (131, 'Soccer', 'Everton'), (132, 'Soccer', 'Fulham'), (133, 'Soccer', 'Ipswich Town'), (134, 'Soccer', 'Leicester City'), (135, 'Soccer', 'Liverpool'), (136, 'Soccer', 'Manchester City'), (137, 'Soccer', 'Manchester United'), (138, 'Soccer', 'Newcastle United'), (139, 'Soccer', 'Nottingham Forest'), (140, 'Soccer', 'Southampton'), (141, 'Soccer', 'Tottenham'), (142, 'Soccer', 'West Ham United'), (143, 'Soccer', 'Wolverhampton Wanderers'), (144, 'Soccer', U&'Alav\00E9s'), (145, 'Soccer', 'Athletic Bilbao'), (146, 'Soccer', 'Atletico Madrid'), (147, 'Soccer', 'Barcelona'), (148, 'Soccer', 'Celta Vigo'), (149, 'Soccer', 'Espanyol'), (150, 'Soccer', 'Getafe'), (151, 'Soccer', 'Girona'), (152, 'Soccer', 'Las Palmas'), (153, 'Soccer', U&'Legan\00E9s'), (154, 'Soccer', 'Mallorca'), (155, 'Soccer', 'Osasuna'), (156, 'Soccer', 'Rayo Vallecano'), (157, 'Soccer', 'Real Betis'), (158, 'Soccer', 'Real Madrid'), (159, 'Soccer', 'Real Sociedad'), (160, 'Soccer', 'Sevilla'), (161, 'Soccer', 'Valencia'), (162, 'Soccer', 'Real Valladolid'), (163, 'Soccer', 'Villarreal'), (164, 'Soccer', 'Augsburg'), (165, 'Soccer', 'Bayern Munich'), (166, 'Soccer', 'Bayer Leverkusen'), (167, 'Soccer', 'Bochum'), (168, 'Soccer', 'Borussia Dortmund'), (169, 'Soccer', U&'Borussia M\00F6nchengladbach'), (170, 'Soccer', 'Eintracht Frankfurt'), (171, 'Soccer', 'Freiburg'), (172, 'Soccer', 'Heidenheim'), (173, 'Soccer', 'Hoffenheim'), (174, 'Soccer', 'Holstein Kiel'), (175, 'Soccer', 'Mainz'), (176, 'Soccer', 'RB Leipzig'), (177, 'Soccer', 'St. Pauli'), (178, 'Soccer', 'Stuttgart'), (179, 'Soccer', 'Union Berlin'), (180, 'Soccer', 'Werder Bremen'), (181, 'Soccer', 'Wolfsburg'), (182, 'Soccer', 'AC Milan'), (183, 'Soccer', 'Atalanta'), (184, 'Soccer', 'Bologna'), (185, 'Soccer', 'Cagliari'), (186, 'Soccer', 'Como'), (187, 'Soccer', 'Empoli'), (188, 'Soccer', 'Fiorentina'), (189, 'Soccer', 'Genoa'), (190, 'Soccer', 'Hellas Verona'), (191, 'Soccer', 'Inter Milan'), (192, 'Soccer', 'Juventus'), (193, 'Soccer', 'Lazio'), (194, 'Soccer', 'Lecce'), (195, 'Soccer', 'Monza'), (196, 'Soccer', 'Napoli'), (197, 'Soccer', 'Parma'), (198, 'Soccer', 'Roma'), (199, 'Soccer', 'Torino'), (200, 'Soccer', 'Udinese'), (201, 'Soccer', 'Venezia'), (202, 'Soccer', 'Angers'), (203, 'Soccer', 'Auxerre'), (204, 'Soccer', 'Brest'), (205, 'Soccer', 'Le Havre'), (206, 'Soccer', 'Lens'), (207, 'Soccer', 'Lille'), (208, 'Soccer', 'Lyon'), (209, 'Soccer', 'Marseille'), (210, 'Soccer', 'Monaco'), (211, 'Soccer', 'Montpellier'), (212, 'Soccer', 'Nantes'), (213, 'Soccer', 'Nice'), (214, 'Soccer', 'Paris Saint-Germain'), (215, 'Soccer', 'Reims'), (216, 'Soccer', 'Rennes'), (217, 'Soccer', U&'Saint-\00C9tienne'), (218, 'Soccer', 'Strasbourg'), (219, 'Soccer', 'Toulouse')) AS tm(ti, sport, v) ON tm.ti = r.ti
    JOIN (VALUES (0, 'wikipedia infobox, relocated franchise history (029)')) AS mm(mi, m) ON mm.mi = r.mi
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = tm.sport AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 154 THEN RAISE EXCEPTION '029: expected 154 rows inserted, got %. Nothing changed.', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261012_facts_029)                                                                         AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'wikipedia infobox, relocated franchise history (029)')                                       AS rows_m1,
  (SELECT count(*) FROM player_facts WHERE owner_method IN ('wikipedia infobox, relocated franchise history (029)') AND player_id IS NULL) AS unowned_new,
  (SELECT count(*) FROM (SELECT f.player_id, f.sport, f.fact_value FROM player_facts f WHERE f.fact_type = 'played_for_team'
     AND f.player_id IN (SELECT player_id FROM player_facts WHERE owner_method IN ('wikipedia infobox, relocated franchise history (029)')) GROUP BY 1, 2, 3
     HAVING count(*) FILTER (WHERE owner_method IN ('wikipedia infobox, relocated franchise history (029)')) > 0 AND count(*) > 1) d) AS doubled,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261012_facts_029')                              AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261012_facts_029' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 1184204 AND f.sport = 'NBA' AND f.fact_type = 'played_for_team' AND f.fact_value = 'Thunder') AS delonte_west_thunder,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'wikipedia infobox, relocated franchise history (029)' AND sport = 'NHL') AS nhl_rows;
-- EXPECTED: backup_rows = 1; rows_m1 = 155; unowned_new = 0; doubled = 0; backup_rls = true; backup_browser_grants = 0; delonte_west_thunder = 1; nhl_rows = 100

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method IN ('wikipedia infobox, relocated franchise history (029)') AND id NOT IN (SELECT id FROM backup_20261012_facts_029);
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261012_facts_029 b WHERE b.id = f.id;
-- DROP TABLE backup_20261012_facts_029;
-- COMMIT;
