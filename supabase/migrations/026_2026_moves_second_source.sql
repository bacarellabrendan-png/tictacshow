-- Migration 026: stints that started in 2026, confirmed by the infobox AND a second independent source
-- Run in Supabase SQL Editor. One transaction. PURE ASCII (player names only in the comments below, without accents).
-- Approved 12 Oct 2026. User rule: a stint starting in 2026 needs a second independent source and must be a playing stint.
--   MLB 68 (MLB Stats API: games for the team in 2026), NHL 2 (NHL API current roster),
--   NFL 3 (news reports, and the player has played), Premier League 63 (Fantasy Premier League: in the squad, minutes > 0).
--   HELD (not here): 7 NBA 2026-27 signings (season not started; re-check mid-November), 2 NFL (no game yet),
--   231 soccer moves outside the Premier League or at clubs now in the Championship (no bulk source yet).
--   0 existing unowned rows get their owner; 136 rows are inserted (0 under the article title).
-- The moves and their second source:
--   MLB | Randal Grichuk -> Yankees | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Yankees | Randal Grichuk, 16 games in 2026
--   MLB | Heliot Ramos -> Yankees | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Yankees | Heliot Ramos, 38 games in 2026
--   MLB | Luis Garcia Jr. -> Yankees | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Yankees | Luis Garcia Jr., 43 games in 2026
--   MLB | Sonny Gray -> Red Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Boston Red Sox | Sonny Gray, 29 games in 2026
--   MLB | Tyron Guerrero -> Red Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Boston Red Sox | Tyron Guerrero, 40 games in 2026
--   MLB | Isiah Kiner-Falefa -> Red Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Boston Red Sox | Isiah Kiner-Falefa, 66 games in 2026
--   MLB | Adley Rutschman -> Red Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Boston Red Sox | Adley Rutschman, 32 games in 2026
--   MLB | Ranger Suarez -> Red Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Boston Red Sox | Ranger Suarez, 28 games in 2026
--   MLB | Alek Thomas -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Alek Thomas, 7 games in 2026
--   MLB | Charlie Barnes -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Charlie Barnes, 4 games in 2026
--   MLB | Chayce McDermott -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Chayce McDermott, 2 games in 2026
--   MLB | Eric Lauer -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Eric Lauer, 14 games in 2026
--   MLB | Edwin Diaz -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Edwin Diaz, 21 games in 2026
--   MLB | Cole Irvin -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Cole Irvin, 1 games in 2026
--   MLB | Jonathan Hernandez -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Jonathan Hernandez, 16 games in 2026
--   MLB | Wyatt Mills -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Wyatt Mills, 6 games in 2026
--   MLB | Tarik Skubal -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Tarik Skubal, 10 games in 2026
--   MLB | Jake Eder -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Jake Eder, 4 games in 2026
--   MLB | Santiago Espinal -> Dodgers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Dodgers | Santiago Espinal, 36 games in 2026
--   MLB | Michael Conforto -> Cubs | MLB Stats API (statsapi.mlb.com), 2026 season stats for Chicago Cubs | Michael Conforto, 113 games in 2026
--   MLB | Charlie Barnes -> Cubs | MLB Stats API (statsapi.mlb.com), 2026 season stats for Chicago Cubs | Charlie Barnes, 1 games in 2026
--   MLB | Brent Suter -> Braves | MLB Stats API (statsapi.mlb.com), 2026 season stats for Atlanta Braves | Brent Suter, 13 games in 2026
--   MLB | Osvaldo Bido -> Braves | MLB Stats API (statsapi.mlb.com), 2026 season stats for Atlanta Braves | Osvaldo Bido, 6 games in 2026
--   MLB | Connor Thomas -> Braves | MLB Stats API (statsapi.mlb.com), 2026 season stats for Atlanta Braves | Connor Thomas, 2 games in 2026
--   MLB | Craig Kimbrel -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Craig Kimbrel, 14 games in 2026
--   MLB | Cionel Perez -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Cionel Perez, 24 games in 2026
--   MLB | Devin Williams -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Devin Williams, 44 games in 2026
--   MLB | MJ Melendez -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | MJ Melendez, 56 games in 2026
--   MLB | Chayce McDermott -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Chayce McDermott, 3 games in 2026
--   MLB | Marcus Semien -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Marcus Semien, 139 games in 2026
--   MLB | Luis Robert Jr. -> Mets | MLB Stats API (statsapi.mlb.com), 2026 season stats for New York Mets | Luis Robert Jr., 58 games in 2026
--   MLB | Brad Keller -> Phillies | MLB Stats API (statsapi.mlb.com), 2026 season stats for Philadelphia Phillies | Brad Keller, 32 games in 2026
--   MLB | Luis Arraez -> Phillies | MLB Stats API (statsapi.mlb.com), 2026 season stats for Philadelphia Phillies | Luis Arraez, 46 games in 2026
--   MLB | Daulton Varsho -> Astros | MLB Stats API (statsapi.mlb.com), 2026 season stats for Houston Astros | Daulton Varsho, 41 games in 2026
--   MLB | Brenton Doyle -> White Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Chicago White Sox | Brenton Doyle, 42 games in 2026
--   MLB | Osvaldo Bido -> White Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Chicago White Sox | Osvaldo Bido, 5 games in 2026
--   MLB | Randal Grichuk -> White Sox | MLB Stats API (statsapi.mlb.com), 2026 season stats for Chicago White Sox | Randal Grichuk, 101 games in 2026
--   MLB | Nick Castellanos -> Padres | MLB Stats API (statsapi.mlb.com), 2026 season stats for San Diego Padres | Nick Castellanos, 39 games in 2026
--   MLB | Joey Lucchesi -> Angels | MLB Stats API (statsapi.mlb.com), 2026 season stats for Los Angeles Angels | Joey Lucchesi, 5 games in 2026
--   MLB | Pete Fairbanks -> Marlins | MLB Stats API (statsapi.mlb.com), 2026 season stats for Miami Marlins | Pete Fairbanks, 46 games in 2026
--   MLB | Owen Caissie -> Marlins | MLB Stats API (statsapi.mlb.com), 2026 season stats for Miami Marlins | Owen Caissie, 108 games in 2026
--   MLB | Esteury Ruiz -> Marlins | MLB Stats API (statsapi.mlb.com), 2026 season stats for Miami Marlins | Esteury Ruiz, 109 games in 2026
--   MLB | Taylor Ward -> Mariners | MLB Stats API (statsapi.mlb.com), 2026 season stats for Seattle Mariners | Taylor Ward, 32 games in 2026
--   MLB | Kirby Yates -> Pirates | MLB Stats API (statsapi.mlb.com), 2026 season stats for Pittsburgh Pirates | Kirby Yates, 15 games in 2026
--   MLB | Jo Adell -> Indians | MLB Stats API (statsapi.mlb.com), 2026 season stats for Cleveland Guardians | Jo Adell, 48 games in 2026
--   MLB | Stuart Fairchild -> Indians | MLB Stats API (statsapi.mlb.com), 2026 season stats for Cleveland Guardians | Stuart Fairchild, 14 games in 2026
--   MLB | Kenley Jansen -> Tigers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Detroit Tigers | Kenley Jansen, 50 games in 2026
--   MLB | Drew Anderson -> Tigers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Detroit Tigers | Drew Anderson, 49 games in 2026
--   MLB | Framber Valdez -> Tigers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Detroit Tigers | Framber Valdez, 31 games in 2026
--   MLB | Jacob Waguespack -> Tigers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Detroit Tigers | Jacob Waguespack, 35 games in 2026
--   MLB | James Outman -> Tigers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Detroit Tigers | James Outman, 45 games in 2026
--   MLB | Shane Baz -> Orioles | MLB Stats API (statsapi.mlb.com), 2026 season stats for Baltimore Orioles | Shane Baz, 31 games in 2026
--   MLB | Taylor Ward -> Orioles | MLB Stats API (statsapi.mlb.com), 2026 season stats for Baltimore Orioles | Taylor Ward, 111 games in 2026
--   MLB | Christian Encarnacion-Strand -> Orioles | MLB Stats API (statsapi.mlb.com), 2026 season stats for Baltimore Orioles | Christian Encarnacion-Strand, 58 games in 2026
--   MLB | Pete Alonso -> Orioles | MLB Stats API (statsapi.mlb.com), 2026 season stats for Baltimore Orioles | Pete Alonso, 161 games in 2026
--   MLB | Bo Naylor -> Brewers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Milwaukee Brewers | Bo Naylor, 3 games in 2026
--   MLB | Dustin May -> Brewers | MLB Stats API (statsapi.mlb.com), 2026 season stats for Milwaukee Brewers | Dustin May, 10 games in 2026
--   MLB | Craig Kimbrel -> Royals | MLB Stats API (statsapi.mlb.com), 2026 season stats for Kansas City Royals | Craig Kimbrel, 13 games in 2026
--   MLB | Carlos Duran -> Royals | MLB Stats API (statsapi.mlb.com), 2026 season stats for Kansas City Royals | Carlos Duran, 2 games in 2026
--   MLB | Craig Kimbrel -> Rays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Tampa Bay Rays | Craig Kimbrel, 19 games in 2026
--   MLB | Nick Martinez -> Rays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Tampa Bay Rays | Nick Martinez, 31 games in 2026
--   MLB | Cedric Mullins -> Rays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Tampa Bay Rays | Cedric Mullins, 137 games in 2026
--   MLB | Curtis Mead -> Nationals | MLB Stats API (statsapi.mlb.com), 2026 season stats for Washington Nationals | Curtis Mead, 87 games in 2026
--   MLB | Max Kepler -> Diamondbacks | MLB Stats API (statsapi.mlb.com), 2026 season stats for Arizona Diamondbacks | Max Kepler, 41 games in 2026
--   MLB | Lars Nootbaar -> Diamondbacks | MLB Stats API (statsapi.mlb.com), 2026 season stats for Arizona Diamondbacks | Lars Nootbaar, 42 games in 2026
--   MLB | Jameson Taillon -> Blue Jays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Toronto Blue Jays | Jameson Taillon, 3 games in 2026
--   MLB | Michael Lorenzen -> Blue Jays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Toronto Blue Jays | Michael Lorenzen, 6 games in 2026
--   MLB | Jose Soriano -> Blue Jays | MLB Stats API (statsapi.mlb.com), 2026 season stats for Toronto Blue Jays | Jose Soriano, 10 games in 2026
--   NHL | Tye Kartye -> Rangers | NHL API (api-web.nhle.com), current NYR roster | Tye Kartye
--   NHL | Mason McTavish -> Blues | NHL API (api-web.nhle.com), current STL roster | Mason McTavish
--   NFL | Jaylen Waddle -> Broncos | NFL.com / AP: traded from Miami to Denver, March 2026
--   NFL | Cody White -> Raiders | Fox Sports: two TD catches in the Raiders Week 2 win; moved to the active roster Sept 29
--   NFL | Kyler Murray -> Vikings | Fox affiliates: signed March 2026; named the 2026 starter (Aug 11)
--   Soccer | Andy Robertson -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Andrew Robertson, 366 min
--   Soccer | Exequiel Palacios -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Exequiel Palacios, 302 min
--   Soccer | Emiliano Martinez -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Emiliano Martinez Romero, 450 min
--   Soccer | Enzo Fernandez -> Manchester City | Fantasy Premier League (official Premier League game), 2026-27 squads | Enzo Fernandez, 350 min
--   Soccer | Tosin Adarabioyo -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Tosin Adarabioyo, 5 min
--   Soccer | Jordan Henderson -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Jordan Henderson, 180 min
--   Soccer | Liam Delap -> Nottingham Forest | Fantasy Premier League (official Premier League game), 2026-27 squads | Liam Delap, 348 min
--   Soccer | Sandro Tonali -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Sandro Tonali, 517 min
--   Soccer | Danny Welbeck -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Danny Welbeck, 92 min
--   Soccer | Youri Tielemans -> Manchester United | Fantasy Premier League (official Premier League game), 2026-27 squads | Youri Tielemans, 460 min
--   Soccer | Nicolas Jackson -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Nicolas Jackson, 376 min
--   Soccer | Iliman Ndiaye -> Manchester City | Fantasy Premier League (official Premier League game), 2026-27 squads | Iliman Ndiaye, 440 min
--   Soccer | Axel Disasi -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Axel Disasi, 139 min
--   Soccer | Takehiro Tomiyasu -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Takehiro Tomiyasu, 189 min
--   Soccer | Daizen Maeda -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Daizen Maeda, 339 min
--   Soccer | Bruno Guimaraes -> Arsenal | Fantasy Premier League (official Premier League game), 2026-27 squads | Bruno Guimaraes Rodriguez Moura, 150 min
--   Soccer | Sasa Lukic -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Sasa Lukic, 490 min
--   Soccer | Ronald Araujo -> Liverpool | Fantasy Premier League (official Premier League game), 2026-27 squads | Ronald Araujo, 358 min
--   Soccer | Xaver Schlager -> Nottingham Forest | Fantasy Premier League (official Premier League game), 2026-27 squads | Xaver Schlager, 441 min
--   Soccer | Ezri Konsa -> Arsenal | Fantasy Premier League (official Premier League game), 2026-27 squads | Ezri Konsa Ngoyo, 371 min
--   Soccer | Bradley Barcola -> Liverpool | Fantasy Premier League (official Premier League game), 2026-27 squads | Bradley Barcola, 255 min
--   Soccer | Mykhailo Mudryk -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Mykhailo Mudryk, 16 min
--   Soccer | Daniel Munoz -> Nottingham Forest | Fantasy Premier League (official Premier League game), 2026-27 squads | Daniel Munoz Mejia, 347 min
--   Soccer | Alejandro Garnacho -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Alejandro Garnacho Ferreyra, 31 min
--   Soccer | Ainsley Maitland-Niles -> Everton | Fantasy Premier League (official Premier League game), 2026-27 squads | Ainsley Maitland-Niles, 254 min
--   Soccer | Morgan Rogers -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Morgan Rogers, 520 min
--   Soccer | Marcos Senesi -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Marcos Senesi Baron, 178 min
--   Soccer | Carlos Baleba -> Manchester United | Fantasy Premier League (official Premier League game), 2026-27 squads | Carlos Baleba, 31 min
--   Soccer | Aaron Wan-Bissaka -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Aaron Wan-Bissaka, 197 min
--   Soccer | Maxence Lacroix -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Maxence Lacroix, 454 min
--   Soccer | Nico Gonzalez -> Newcastle United | Fantasy Premier League (official Premier League game), 2026-27 squads | Nico Gonzalez Iglesias, 164 min
--   Soccer | Omar Marmoush -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Omar Marmoush, 363 min
--   Soccer | Elliot Anderson -> Manchester City | Fantasy Premier League (official Premier League game), 2026-27 squads | Elliot Anderson, 503 min
--   Soccer | Mateus Fernandes -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Mateus Fernandes, 250 min
--   Soccer | Oscar Mingueza -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Oscar Mingueza, 16 min
--   Soccer | Pep Chavarria -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Pep Chavarria, 298 min
--   Soccer | Chema Andres -> Brighton | Fantasy Premier League (official Premier League game), 2026-27 squads | Jose Maria Andres Baixauli, 199 min
--   Soccer | Johan Manzambi -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Johan Manzambi, 183 min
--   Soccer | Bazoumana Toure -> Newcastle United | Fantasy Premier League (official Premier League game), 2026-27 squads | Bazoumana Toure, 50 min
--   Soccer | Matteo Ruggeri -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Matteo Ruggeri, 158 min
--   Soccer | Honest Ahanor -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Honest Ahanor, 108 min
--   Soccer | Zion Suzuki -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Zion Suzuki, 450 min
--   Soccer | Matias Fernandez-Pardo -> Newcastle United | Fantasy Premier League (official Premier League game), 2026-27 squads | Matias Fernandez-Pardo, 157 min
--   Soccer | Ayyoub Bouaddi -> Manchester City | Fantasy Premier League (official Premier League game), 2026-27 squads | Ayyoub Bouaddi, 32 min
--   Soccer | Amar Dedic -> Newcastle United | Fantasy Premier League (official Premier League game), 2026-27 squads | Amar Dedic, 327 min
--   Soccer | Ibrahim Mbaye -> Aston Villa | Fantasy Premier League (official Premier League game), 2026-27 squads | Ibrahim Mbaye, 59 min
--   Soccer | Jeremy Jacquet -> Liverpool | Fantasy Premier League (official Premier League game), 2026-27 squads | Jeremy Jacquet, 502 min
--   Soccer | Shea Charles -> Fulham | Fantasy Premier League (official Premier League game), 2026-27 squads | Shea Charles, 373 min
--   Soccer | Callum Wilson -> Brentford | Fantasy Premier League (official Premier League game), 2026-27 squads | Callum Wilson, 18 min
--   Soccer | Brennan Johnson -> Everton | Fantasy Premier League (official Premier League game), 2026-27 squads | Brennan Johnson, 303 min
--   Soccer | Abdul Fatawu -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Abdul Fatawu, 352 min
--   Soccer | Antonio Silva -> Bournemouth | Fantasy Premier League (official Premier League game), 2026-27 squads | Antonio Joao Pereira de Albuquerque Tavares da Silva, 540 min
--   Soccer | Dario Osorio -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Dario Osorio, 1 min
--   Soccer | Jaidon Anthony -> Brentford | Fantasy Premier League (official Premier League game), 2026-27 squads | Jaidon Anthony, 351 min
--   Soccer | Kjell Scherpen -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Kjell Scherpen, 360 min
--   Soccer | Jan Paul van Hecke -> Tottenham | Fantasy Premier League (official Premier League game), 2026-27 squads | Jan Paul van Hecke, 540 min
--   Soccer | Valentin Barco -> Chelsea | Fantasy Premier League (official Premier League game), 2026-27 squads | Valentin Barco, 115 min
--   Soccer | Andrey Santos -> Manchester United | Fantasy Premier League (official Premier League game), 2026-27 squads | Andrey Nascimento dos Santos, 82 min
--   Soccer | Dwight McNeil -> Crystal Palace | Fantasy Premier League (official Premier League game), 2026-27 squads | Dwight McNeil, 85 min
--   Soccer | Issa Diop -> Ipswich Town | Fantasy Premier League (official Premier League game), 2026-27 squads | Issa Diop, 540 min
--   Soccer | Hugo Larsson -> Fulham | Fantasy Premier League (official Premier League game), 2026-27 squads | Hugo Larsson, 40 min
--   Soccer | Michael Svoboda -> Brighton | Fantasy Premier League (official Premier League game), 2026-27 squads | Michael Svoboda, 4 min
--   Soccer | Jaouen Hadjam -> Brighton | Fantasy Premier League (official Premier League game), 2026-27 squads | Jaouen Hadjam, 2 min

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  SELECT count(*) INTO n FROM player_facts WHERE owner_method IN ('infobox + second source, 2026 move (026)');
  IF n > 0 OR to_regclass('public.backup_20261012_facts_026') IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 026 is already applied (% rows with its owner_method). Nothing changed.', n;
  END IF;
  SELECT count(*) INTO n FROM player_facts WHERE id IN (NULL) AND player_id IS NULL AND fact_type = 'played_for_team';
  IF n <> 0 THEN RAISE EXCEPTION '026 guard: expected 0 unowned rows to own, found %. Nothing changed.', n; END IF;
END $mig$;

-- --- BACKUP: rows that get an owner, as they are now (RLS on, closed) -----------------------------
CREATE TABLE backup_20261012_facts_026 AS SELECT * FROM player_facts WHERE id IN (NULL);
ALTER TABLE backup_20261012_facts_026 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261012_facts_026 FROM anon, authenticated;

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
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 0 THEN RAISE EXCEPTION '026: expected 0 owners set, got %', n; END IF;

  -- --- NEW ROWS (page id, team number, 1 = store under the article title, owner_method number) ------
  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN r.t = 1 THEN p.wikipedia_title ELSE p.display_name END, tm.sport, 'played_for_team', tm.v, p.id, mm.m
    FROM (VALUES
(36716456,62,0,0),
(54289216,62,0,0),
(54643226,62,0,0),
(33510468,63,0,0),
(44039586,63,0,0),
(55759549,63,0,0),
(57786337,63,0,0),
(55848395,63,0,0),
(61166552,64,0,0),
(68243405,64,0,0),
(70489734,64,0,0),
(50586491,64,0,0),
(50723638,64,0,0),
(57278139,64,0,0),
(54442435,64,0,0),
(60837543,64,0,0),
(60768194,64,0,0),
(63690425,64,0,0),
(62395996,64,0,0),
(42420288,65,0,0),
(68243405,65,0,0),
(51360939,67,0,0),
(74030322,67,0,0),
(67988024,67,0,0),
(27246393,69,0,0),
(55807603,69,0,0),
(61177123,69,0,0),
(57025562,69,0,0),
(70489734,69,0,0),
(40001136,69,0,0),
(53307518,69,0,0),
(53812496,70,0,0),
(59363419,70,0,0),
(54265578,72,0,0),
(67073700,73,0,0),
(74030322,73,0,0),
(36716456,73,0,0),
(34486731,75,0,0),
(53941792,76,0,0),
(60901322,78,0,0),
(68522739,78,0,0),
(70819027,78,0,0),
(46928659,79,0,0),
(41143323,80,0,0),
(53477198,81,0,0),
(54352033,81,0,0),
(22337793,82,0,0),
(52317166,82,0,0),
(58221765,82,0,0),
(59117146,82,0,0),
(69201946,82,0,0),
(54122602,83,0,0),
(46928659,83,0,0),
(70625601,83,0,0),
(52417182,83,0,0),
(55824567,84,0,0),
(61413246,84,0,0),
(27246393,86,0,0),
(78392157,86,0,0),
(27246393,87,0,0),
(42318009,87,0,0),
(53670198,87,0,0),
(68187649,89,0,0),
(36551567,90,0,0),
(67581442,90,0,0),
(27624128,91,0,0),
(39478431,91,0,0),
(66068753,91,0,0),
(73655515,94,0,0),
(68031920,102,0,0),
(61570445,32,0,0),
(68828350,36,0,0),
(44651404,46,0,0),
(40159932,141,0,0),
(48712647,133,0,0),
(35727432,129,0,0),
(65737018,136,0,0),
(49502768,141,0,0),
(20027350,129,0,0),
(65409225,139,0,0),
(55865367,141,0,0),
(19444571,129,0,0),
(40093849,137,0,0),
(65616522,125,0,0),
(67099039,136,0,0),
(50200882,130,0,0),
(51778671,130,0,0),
(52552780,133,0,0),
(58985791,124,0,0),
(45037581,133,0,0),
(58389828,135,0,0),
(50277752,139,0,0),
(51794663,124,0,0),
(69192660,135,0,0),
(58931792,141,0,0),
(63328725,139,0,0),
(70248902,125,0,0),
(44653022,131,0,0),
(59876948,129,0,0),
(51987400,141,0,0),
(71485247,137,0,0),
(56113678,125,0,0),
(59523746,129,0,0),
(68484618,138,0,0),
(63977483,141,0,0),
(66334715,136,0,0),
(72109435,141,0,0),
(65929994,130,0,0),
(65426060,129,0,0),
(77489559,128,0,0),
(79016691,125,0,0),
(78465600,138,0,0),
(65753707,125,0,0),
(77717239,130,0,0),
(66976582,125,0,0),
(77013367,138,0,0),
(75000903,136,0,0),
(61706013,138,0,0),
(77611429,125,0,0),
(76677308,135,0,0),
(70932639,132,0,0),
(23962286,127,0,0),
(61433600,131,0,0),
(67219687,133,0,0),
(70638479,126,0,0),
(70660632,130,0,0),
(65993502,127,0,0),
(57302935,133,0,0),
(65911701,141,0,0),
(68446287,129,0,0),
(67204140,137,0,0),
(57435123,130,0,0),
(48675674,133,0,0),
(70523033,132,0,0),
(61816755,128,0,0),
(65046315,128,0,0)
    ) AS r(page_id, ti, t, mi)
    JOIN players p ON p.wikipedia_page_id = r.page_id
    JOIN (VALUES (0, 'NBA', 'Lakers'), (1, 'NBA', 'Celtics'), (2, 'NBA', 'Warriors'), (3, 'NBA', 'Bulls'), (4, 'NBA', 'Heat'), (5, 'NBA', 'Nets'), (6, 'NBA', 'Rockets'), (7, 'NBA', '76ers'), (8, 'NBA', 'Cavaliers'), (9, 'NBA', 'Knicks'), (10, 'NBA', 'Suns'), (11, 'NBA', 'Spurs'), (12, 'NBA', 'Raptors'), (13, 'NBA', 'Mavericks'), (14, 'NBA', 'Trail Blazers'), (15, 'NBA', 'Clippers'), (16, 'NBA', 'Bucks'), (17, 'NBA', 'Timberwolves'), (18, 'NBA', 'Hawks'), (19, 'NBA', 'Pistons'), (20, 'NBA', 'Thunder'), (21, 'NBA', 'Nuggets'), (22, 'NBA', 'Pacers'), (23, 'NBA', 'Jazz'), (24, 'NBA', 'Kings'), (25, 'NBA', 'Hornets'), (26, 'NBA', 'Magic'), (27, 'NBA', 'Wizards'), (28, 'NBA', 'Pelicans'), (29, 'NBA', 'Grizzlies'), (30, 'NFL', 'Patriots'), (31, 'NFL', 'Cowboys'), (32, 'NFL', 'Broncos'), (33, 'NFL', 'Steelers'), (34, 'NFL', '49ers'), (35, 'NFL', 'Chiefs'), (36, 'NFL', 'Raiders'), (37, 'NFL', 'Bears'), (38, 'NFL', 'Saints'), (39, 'NFL', 'Seahawks'), (40, 'NFL', 'Eagles'), (41, 'NFL', 'Packers'), (42, 'NFL', 'Ravens'), (43, 'NFL', 'Giants'), (44, 'NFL', 'Chargers'), (45, 'NFL', 'Dolphins'), (46, 'NFL', 'Vikings'), (47, 'NFL', 'Falcons'), (48, 'NFL', 'Buccaneers'), (49, 'NFL', 'Rams'), (50, 'NFL', 'Bengals'), (51, 'NFL', 'Bills'), (52, 'NFL', 'Colts'), (53, 'NFL', 'Lions'), (54, 'NFL', 'Texans'), (55, 'NFL', 'Panthers'), (56, 'NFL', 'Cardinals'), (57, 'NFL', 'Browns'), (58, 'NFL', 'Jaguars'), (59, 'NFL', 'Jets'), (60, 'NFL', 'Titans'), (61, 'NFL', 'Commanders'), (62, 'MLB', 'Yankees'), (63, 'MLB', 'Red Sox'), (64, 'MLB', 'Dodgers'), (65, 'MLB', 'Cubs'), (66, 'MLB', 'Cardinals'), (67, 'MLB', 'Braves'), (68, 'MLB', 'Giants'), (69, 'MLB', 'Mets'), (70, 'MLB', 'Phillies'), (71, 'MLB', 'Reds'), (72, 'MLB', 'Astros'), (73, 'MLB', 'White Sox'), (74, 'MLB', 'Athletics'), (75, 'MLB', 'Padres'), (76, 'MLB', 'Angels'), (77, 'MLB', 'Rangers'), (78, 'MLB', 'Marlins'), (79, 'MLB', 'Mariners'), (80, 'MLB', 'Pirates'), (81, 'MLB', 'Indians'), (82, 'MLB', 'Tigers'), (83, 'MLB', 'Orioles'), (84, 'MLB', 'Brewers'), (85, 'MLB', 'Twins'), (86, 'MLB', 'Royals'), (87, 'MLB', 'Rays'), (88, 'MLB', 'Rockies'), (89, 'MLB', 'Nationals'), (90, 'MLB', 'Diamondbacks'), (91, 'MLB', 'Blue Jays'), (92, 'NHL', 'Bruins'), (93, 'NHL', 'Penguins'), (94, 'NHL', 'Rangers'), (95, 'NHL', 'Red Wings'), (96, 'NHL', 'Blackhawks'), (97, 'NHL', 'Canadiens'), (98, 'NHL', 'Maple Leafs'), (99, 'NHL', 'Oilers'), (100, 'NHL', 'Kings'), (101, 'NHL', 'Flyers'), (102, 'NHL', 'Blues'), (103, 'NHL', 'Avalanche'), (104, 'NHL', 'Capitals'), (105, 'NHL', 'Canucks'), (106, 'NHL', 'Sabres'), (107, 'NHL', 'Devils'), (108, 'NHL', 'Sharks'), (109, 'NHL', 'Flames'), (110, 'NHL', 'Lightning'), (111, 'NHL', 'Senators'), (112, 'NHL', 'Stars'), (113, 'NHL', 'Islanders'), (114, 'NHL', 'Ducks'), (115, 'NHL', 'Hurricanes'), (116, 'NHL', 'Jets'), (117, 'NHL', 'Wild'), (118, 'NHL', 'Predators'), (119, 'NHL', 'Blue Jackets'), (120, 'NHL', 'Panthers'), (121, 'NHL', 'Golden Knights'), (122, 'NHL', 'Kraken'), (123, 'NHL', 'Coyotes'), (124, 'Soccer', 'Arsenal'), (125, 'Soccer', 'Aston Villa'), (126, 'Soccer', 'Bournemouth'), (127, 'Soccer', 'Brentford'), (128, 'Soccer', 'Brighton'), (129, 'Soccer', 'Chelsea'), (130, 'Soccer', 'Crystal Palace'), (131, 'Soccer', 'Everton'), (132, 'Soccer', 'Fulham'), (133, 'Soccer', 'Ipswich Town'), (134, 'Soccer', 'Leicester City'), (135, 'Soccer', 'Liverpool'), (136, 'Soccer', 'Manchester City'), (137, 'Soccer', 'Manchester United'), (138, 'Soccer', 'Newcastle United'), (139, 'Soccer', 'Nottingham Forest'), (140, 'Soccer', 'Southampton'), (141, 'Soccer', 'Tottenham'), (142, 'Soccer', 'West Ham United'), (143, 'Soccer', 'Wolverhampton Wanderers'), (144, 'Soccer', U&'Alav\00E9s'), (145, 'Soccer', 'Athletic Bilbao'), (146, 'Soccer', 'Atletico Madrid'), (147, 'Soccer', 'Barcelona'), (148, 'Soccer', 'Celta Vigo'), (149, 'Soccer', 'Espanyol'), (150, 'Soccer', 'Getafe'), (151, 'Soccer', 'Girona'), (152, 'Soccer', 'Las Palmas'), (153, 'Soccer', U&'Legan\00E9s'), (154, 'Soccer', 'Mallorca'), (155, 'Soccer', 'Osasuna'), (156, 'Soccer', 'Rayo Vallecano'), (157, 'Soccer', 'Real Betis'), (158, 'Soccer', 'Real Madrid'), (159, 'Soccer', 'Real Sociedad'), (160, 'Soccer', 'Sevilla'), (161, 'Soccer', 'Valencia'), (162, 'Soccer', 'Real Valladolid'), (163, 'Soccer', 'Villarreal'), (164, 'Soccer', 'Augsburg'), (165, 'Soccer', 'Bayern Munich'), (166, 'Soccer', 'Bayer Leverkusen'), (167, 'Soccer', 'Bochum'), (168, 'Soccer', 'Borussia Dortmund'), (169, 'Soccer', U&'Borussia M\00F6nchengladbach'), (170, 'Soccer', 'Eintracht Frankfurt'), (171, 'Soccer', 'Freiburg'), (172, 'Soccer', 'Heidenheim'), (173, 'Soccer', 'Hoffenheim'), (174, 'Soccer', 'Holstein Kiel'), (175, 'Soccer', 'Mainz'), (176, 'Soccer', 'RB Leipzig'), (177, 'Soccer', 'St. Pauli'), (178, 'Soccer', 'Stuttgart'), (179, 'Soccer', 'Union Berlin'), (180, 'Soccer', 'Werder Bremen'), (181, 'Soccer', 'Wolfsburg'), (182, 'Soccer', 'AC Milan'), (183, 'Soccer', 'Atalanta'), (184, 'Soccer', 'Bologna'), (185, 'Soccer', 'Cagliari'), (186, 'Soccer', 'Como'), (187, 'Soccer', 'Empoli'), (188, 'Soccer', 'Fiorentina'), (189, 'Soccer', 'Genoa'), (190, 'Soccer', 'Hellas Verona'), (191, 'Soccer', 'Inter Milan'), (192, 'Soccer', 'Juventus'), (193, 'Soccer', 'Lazio'), (194, 'Soccer', 'Lecce'), (195, 'Soccer', 'Monza'), (196, 'Soccer', 'Napoli'), (197, 'Soccer', 'Parma'), (198, 'Soccer', 'Roma'), (199, 'Soccer', 'Torino'), (200, 'Soccer', 'Udinese'), (201, 'Soccer', 'Venezia'), (202, 'Soccer', 'Angers'), (203, 'Soccer', 'Auxerre'), (204, 'Soccer', 'Brest'), (205, 'Soccer', 'Le Havre'), (206, 'Soccer', 'Lens'), (207, 'Soccer', 'Lille'), (208, 'Soccer', 'Lyon'), (209, 'Soccer', 'Marseille'), (210, 'Soccer', 'Monaco'), (211, 'Soccer', 'Montpellier'), (212, 'Soccer', 'Nantes'), (213, 'Soccer', 'Nice'), (214, 'Soccer', 'Paris Saint-Germain'), (215, 'Soccer', 'Reims'), (216, 'Soccer', 'Rennes'), (217, 'Soccer', U&'Saint-\00C9tienne'), (218, 'Soccer', 'Strasbourg'), (219, 'Soccer', 'Toulouse')) AS tm(ti, sport, v) ON tm.ti = r.ti
    JOIN (VALUES (0, 'infobox + second source, 2026 move (026)')) AS mm(mi, m) ON mm.mi = r.mi
   WHERE NOT EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = tm.sport AND f.fact_type = 'played_for_team' AND f.fact_value = tm.v);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 136 THEN RAISE EXCEPTION '026: expected 136 rows inserted, got %. Nothing changed.', n; END IF;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM backup_20261012_facts_026)                                                                         AS backup_rows,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'infobox + second source, 2026 move (026)')                                       AS rows_m1,
  (SELECT count(*) FROM player_facts WHERE owner_method IN ('infobox + second source, 2026 move (026)') AND player_id IS NULL) AS unowned_new,
  (SELECT count(*) FROM (SELECT f.player_id, f.sport, f.fact_value FROM player_facts f WHERE f.fact_type = 'played_for_team'
     AND f.player_id IN (SELECT player_id FROM player_facts WHERE owner_method IN ('infobox + second source, 2026 move (026)')) GROUP BY 1, 2, 3
     HAVING count(*) FILTER (WHERE owner_method IN ('infobox + second source, 2026 move (026)')) > 0 AND count(*) > 1) d) AS doubled,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261012_facts_026')                              AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20261012_facts_026' AND grantee IN ('anon', 'authenticated')) AS backup_browser_grants,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 60768194 AND f.sport = 'MLB' AND f.fact_type = 'played_for_team' AND f.fact_value = 'Dodgers') AS skubal_dodgers,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 55996885 AND f.sport = 'Soccer' AND f.fact_type = 'played_for_team' AND f.fact_value = 'Barcelona') AS gordon_barcelona_still_held,
  (SELECT count(*) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 240940 AND f.sport = 'NBA' AND f.fact_type = 'played_for_team' AND f.fact_value = '76ers') AS lebron_76ers_held,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'infobox + second source, 2026 move (026)' AND sport = 'Soccer') AS soccer_rows;
-- EXPECTED: backup_rows = 0; rows_m1 = 136; unowned_new = 0; doubled = 0; backup_rls = true; backup_browser_grants = 0; skubal_dodgers = 1; gordon_barcelona_still_held = 0; lebron_76ers_held = 0; soccer_rows = 63

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_facts WHERE owner_method IN ('infobox + second source, 2026 move (026)') AND id NOT IN (SELECT id FROM backup_20261012_facts_026);
-- UPDATE player_facts f SET player_id = b.player_id, owner_method = b.owner_method FROM backup_20261012_facts_026 b WHERE b.id = f.id;
-- DROP TABLE backup_20261012_facts_026;
-- COMMIT;
