-- Migration 030: 5 soccer stints that 024 skipped because its reserve-side pattern read the C in "A.C." / "F.C." as a C team
-- PURE ASCII. Additive. Each is in the infobox senior career with league appearances (Parma, Genoa, Torino, AC Milan).
--   0 adopted, 5 inserted (0 under the article title).

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  SELECT count(*) INTO n FROM player_facts WHERE owner_method IN ('wikipedia infobox, reserve-pattern fix (030)');
  IF n > 0 OR to_regclass('public.backup_20261012_facts_030') IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 030 is already applied (% rows with its owner_method). Nothing changed.', n;
  END IF;
  SELECT count(*) INTO n FROM player_facts WHERE id IN (NULL) AND player_id IS NULL AND fact_type = 'played_for_team';
  IF n <> 0 THEN RAISE EXCEPTION '030 guard: expected 0 unowned rows to own, found %. Nothing changed.', n; END IF;
END $mig$;

-- --- BACKUP: rows that get an owner, as they are now (RLS on, closed) -----------------------------
CREATE TABLE backup_20261012_facts_030 AS SELECT * FROM player_facts WHERE id IN (NULL);
ALTER TABLE backup_20261012_facts_030 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261012_facts_030 FROM anon, authenticated;

DO $mig$
DECLARE n BIGINT;
BEGIN
  -- --- OWNERS (fact id, page id, team, owner_method) ----------------------------------------------
  UPDATE player_facts f SET player_id = p.id, owner_method = o.m
    FROM (VALUES
    (NULL::bigint, NULL::bigint, NULL::text, NULL::text)
    ) AS o(fact_id, page_id, team, m)
    JOIN players p ON p.wikipedia_page_id = o.page_id
   WHERE f.id = o.fact_id AND f.player_id IS NULL AND f.fact_value = o.team;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 0 THEN RAISE EXCEPTION '030: expected 0 owners set, got %', n; END IF;

  -- --- NEW ROWS (page id, team number, 1 = store under the article title, owner_method number) ------
  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, tm.sport, 'played_for_team', tm.v, p.id, mm.m
    FROM (VALUES
(18170151,197,0,0),
(15784674,189,0,0),
(12424455,199,0,0),
(7739632,182,0,0),
(23625890,197,0,0)
    ) AS r(page_id, ti, t, mi)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'NBA', 'Lakers'), (1, 'NBA', 'Celtics'), (2, 'NBA', 'Warriors'), (3, 'NBA', 'Bulls'), (4, 'NBA', 'Heat'), (5, 'NBA', 'Nets'), (6, 'NBA', 'Rockets'), (7, 'NBA', '76ers'), (8, 'NBA', 'Cavaliers'), (9, 'NBA', 'Knicks'), (10, 'NBA', 'Suns'), (11, 'NBA', 'Spurs'), (12, 'NBA', 'Raptors'), (13, 'NBA', 'Mavericks'), (14, 'NBA', 'Trail Blazers'), (15, 'NBA', 'Clippers'), (16, 'NBA', 'Bucks'), (17, 'NBA', 'Timberwolves'), (18, 'NBA', 'Hawks'), (19, 'NBA', 'Pistons'), (20, 'NBA', 'Thunder'), (21, 'NBA', 'Nuggets'), (22, 'NBA', 'Pacers'), (23, 'NBA', 'Jazz'), (24, 'NBA', 'Kings'), (25, 'NBA', 'Hornets'), (26, 'NBA', 'Magic'), (27, 'NBA', 'Wizards'), (28, 'NBA', 'Pelicans'), (29, 'NBA', 'Grizzlies'), (30, 'NFL', 'Patriots'), (31, 'NFL', 'Cowboys'), (32, 'NFL', 'Broncos'), (33, 'NFL', 'Steelers'), (34, 'NFL', '49ers'), (35, 'NFL', 'Chiefs'), (36, 'NFL', 'Raiders'), (37, 'NFL', 'Bears'), (38, 'NFL', 'Saints'), (39, 'NFL', 'Seahawks'), (40, 'NFL', 'Eagles'), (41, 'NFL', 'Packers'), (42, 'NFL', 'Ravens'), (43, 'NFL', 'Giants'), (44, 'NFL', 'Chargers'), (45, 'NFL', 'Dolphins'), (46, 'NFL', 'Vikings'), (47, 'NFL', 'Falcons'), (48, 'NFL', 'Buccaneers'), (49, 'NFL', 'Rams'), (50, 'NFL', 'Bengals'), (51, 'NFL', 'Bills'), (52, 'NFL', 'Colts'), (53, 'NFL', 'Lions'), (54, 'NFL', 'Texans'), (55, 'NFL', 'Panthers'), (56, 'NFL', 'Cardinals'), (57, 'NFL', 'Browns'), (58, 'NFL', 'Jaguars'), (59, 'NFL', 'Jets'), (60, 'NFL', 'Titans'), (61, 'NFL', 'Commanders'), (62, 'MLB', 'Yankees'), (63, 'MLB', 'Red Sox'), (64, 'MLB', 'Dodgers'), (65, 'MLB', 'Cubs'), (66, 'MLB', 'Cardinals'), (67, 'MLB', 'Braves'), (68, 'MLB', 'Giants'), (69, 'MLB', 'Mets'), (70, 'MLB', 'Phillies'), (71, 'MLB', 'Reds'), (72, 'MLB', 'Astros'), (73, 'MLB', 'White Sox'), (74, 'MLB', 'Athletics'), (75, 'MLB', 'Padres'), (76, 'MLB', 'Angels'), (77, 'MLB', 'Rangers'), (78, 'MLB', 'Marlins'), (79, 'MLB', 'Mariners'), (80, 'MLB', 'Pirates'), (81, 'MLB', 'Indians'), (82, 'MLB', 'Tigers'), (83, 'MLB', 'Orioles'), (84, 'MLB', 'Brewers'), (85, 'MLB', 'Twins'), (86, 'MLB', 'Royals'), (87, 'MLB', 'Rays'), (88, 'MLB', 'Rockies'), (89, 'MLB', 'Nationals'), (90, 'MLB', 'Diamondbacks'), (91, 'MLB', 'Blue Jays'), (92, 'NHL', 'Bruins'), (93, 'NHL', 'Penguins'), (94, 'NHL', 'Rangers'), (95, 'NHL', 'Red Wings'), (96, 'NHL', 'Blackhawks'), (97, 'NHL', 'Canadiens'), (98, 'NHL', 'Maple Leafs'), (99, 'NHL', 'Oilers'), (100, 'NHL', 'Kings'), (101, 'NHL', 'Flyers'), (102, 'NHL', 'Blues'), (103, 'NHL', 'Avalanche'), (104, 'NHL', 'Capitals'), (105, 'NHL', 'Canucks'), (106, 'NHL', 'Sabres'), (107, 'NHL', 'Devils'), (108, 'NHL', 'Sharks'), (109, 'NHL', 'Flames'), (110, 'NHL', 'Lightning'), (111, 'NHL', 'Senators'), (112, 'NHL', 'Stars'), (113, 'NHL', 'Islanders'), (114, 'NHL', 'Ducks'), (115, 'NHL', 'Hurricanes'), (116, 'NHL', 'Jets'), (117, 'NHL', 'Wild'), (118, 'NHL', 'Predators'), (119, 'NHL', 'Blue Jackets'), (120, 'NHL', 'Panthers'), (121, 'NHL', 'Golden Knights'), (122, 'NHL', 'Kraken'), (123, 'NHL', 'Coyotes'), (124, 'Soccer', 'Arsenal'), (125, 'Soccer', 'Aston Villa'), (126, 'Soccer', 'Bournemouth'), (127, 'Soccer', 'Brentford'), (128, 'Soccer', 'Brighton'), (129, 'Soccer', 'Chelsea'), (130, 'Soccer', 'Crystal Palace'), (131, 'Soccer', 'Everton'), (132, 'Soccer', 'Fulham'), (133, 'Soccer', 'Ipswich Town'), (134, 'Soccer', 'Leicester City'), (135, 'Soccer', 'Liverpool'), (136, 'Soccer', 'Manchester City'), (137, 'Soccer', 'Manchester United'), (138, 'Soccer', 'Newcastle United'), (139, 'Soccer', 'Nottingham Forest'), (140, 'Soccer', 'Southampton'), (141, 'Soccer', 'Tottenham'), (142, 'Soccer', 'West Ham United'), (143, 'Soccer', 'Wolverhampton Wanderers'), (144, 'Soccer', U&'Alav\00E9s'), (145, 'Soccer', 'Athletic Bilbao'), (146, 'Soccer', 'Atletico Madrid'), (147, 'Soccer', 'Barcelona'), (148, 'Soccer', 'Celta Vigo'), (149, 'Soccer', 'Espanyol'), (150, 'Soccer', 'Getafe'), (151, 'Soccer', 'Girona'), (152, 'Soccer', 'Las Palmas'), (153, 'Soccer', U&'Legan\00E9s'), (154, 'Soccer', 'Mallorca'), (155, 'Soccer', 'Osasuna'), (156, 'Soccer', 'Rayo Vallecano'), (157, 'Soccer', 'Real Betis'), (158, 'Soccer', 'Real Madrid'), (159, 'Soccer', 'Real Sociedad'), (160, 'Soccer', 'Sevilla'), (161, 'Soccer', 'Valencia'), (162, 'Soccer', 'Real Valladolid'), (163, 'Soccer', 'Villarreal'), (164, 'Soccer', 'Augsburg'), (165, 'Soccer', 'Bayern Munich'), (166, 'Soccer', 'Bayer Leverkusen'), (167, 'Soccer', 'Bochum'), (168, 'Soccer', 'Borussia Dortmund'), (169, 'Soccer', U&'Borussia M\00F6nchengladbach'), (170, 'Soccer', 'Eintracht Frankfurt'), (171, 'Soccer', 'Freiburg'), (172, 'Soccer', 'Heidenheim'), (173, 'Soccer', 'Hoffenheim'), (174, 'Soccer', 'Holstein Kiel'), (175, 'Soccer', 'Mainz'), (176, 'Soccer', 'RB Leipzig'), (177, 'Soccer', 'St. Pauli'), (178, 'Soccer', 'Stuttgart'), (179, 'Soccer', 'Union Berlin'), (180, 'Soccer', 'Werder Bremen'), (181, 'Soccer', 'Wolfsburg'), (182, 'Soccer', 'AC Milan'), (183, 'Soccer', 'Atalanta'), (184, 'Soccer', 'Bologna'), (185, 'Soccer', 'Cagliari'), (186, 'Soccer', 'Como'), (187, 'Soccer', 'Empoli'), (188, 'Soccer', 'Fiorentina'), (189, 'Soccer', 'Genoa'), (190, 'Soccer', 'Hellas Verona'), (191, 'Soccer', 'Inter Milan'), (192, 'Soccer', 'Juventus'), (193, 'Soccer', 'Lazio'), (194, 'Soccer', 'Lecce'), (195, 'Soccer', 'Monza'), (196, 'Soccer', 'Napoli'), (197, 'Soccer', 'Parma'), (198, 'Soccer', 'Roma'), (199, 'Soccer', 'Torino'), (200, 'Soccer', 'Udinese'), (201, 'Soccer', 'Venezia'), (202, 'Soccer', 'Angers'), (203, 'Soccer', 'Auxerre'), (204, 'Soccer', 'Brest'), (205, 'Soccer', 'Le Havre'), (206, 'Soccer', 'Lens'), (207, 'Soccer', 'Lille'), (208, 'Soccer', 'Lyon'), (209, 'Soccer', 'Marseille'), (210, 'Soccer', 'Monaco'), (211, 'Soccer', 'Montpellier'), (212, 'Soccer', 'Nantes'), (213, 'Soccer', 'Nice'), (214, 'Soccer', 'Paris Saint-Germain'), (215, 'Soccer', 'Reims'), (216, 'Soccer', 'Rennes'), (217, 'Soccer', U&'Saint-\00C9tienne'), (218, 'Soccer', 'Strasbourg'), (219, 'Soccer', 'Toulouse')) AS tm(ti, sport, v) ON tm.ti = r.ti
    JOIN (VALUES (0, 'wikipedia infobox, reserve-pattern fix (030)')) AS mm(mi, m) ON mm.mi = r.mi
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = tm.sport AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 5 THEN RAISE EXCEPTION '030: expected 5 rows inserted, got %. Nothing changed.', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261012_facts_030)                                                                         AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'wikipedia infobox, reserve-pattern fix (030)')                                       AS rows_m1,
  (SELECT count(*) FROM player_facts WHERE owner_method IN ('wikipedia infobox, reserve-pattern fix (030)') AND player_id IS NULL) AS unowned_new,
  (SELECT count(*) FROM (SELECT f.player_id, f.sport, f.fact_value FROM player_facts f WHERE f.fact_type = 'played_for_team'
     AND f.player_id IN (SELECT player_id FROM player_facts WHERE owner_method IN ('wikipedia infobox, reserve-pattern fix (030)')) GROUP BY 1, 2, 3
     HAVING count(*) FILTER (WHERE owner_method IN ('wikipedia infobox, reserve-pattern fix (030)')) > 0 AND count(*) > 1) d) AS doubled,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261012_facts_030')                              AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261012_facts_030' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 18170151 AND f.sport = 'Soccer' AND f.fact_type = 'played_for_team' AND f.fact_value = 'Parma') AS gambaro_parma,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'wikipedia infobox, reserve-pattern fix (030)' AND sport = 'Soccer') AS soccer_rows;
-- EXPECTED: backup_rows = 0; rows_m1 = 5; unowned_new = 0; doubled = 0; backup_rls = true; backup_browser_grants = 0; gambaro_parma = 1; soccer_rows = 5

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method IN ('wikipedia infobox, reserve-pattern fix (030)') AND id NOT IN (SELECT id FROM backup_20261012_facts_030);
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261012_facts_030 b WHERE b.id = f.id;
-- DROP TABLE backup_20261012_facts_030;
-- COMMIT;
