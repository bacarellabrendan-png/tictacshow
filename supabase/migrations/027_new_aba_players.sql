-- Migration 027: notable ABA players not yet in our database (user rule: ABA years count for the Nets, Pacers, Spurs, Nuggets)
-- Run in Supabase SQL Editor. One transaction. PURE ASCII (accented names would be U& escapes; none needed here).
-- Approved 12 Oct 2026. Notable = ABA All-Star, All-ABA or Hall of Fame (Wikipedia category or infobox highlights), or
-- at least 10,000 page views in the last 12 months. 15 players: Julius Keye, Warren Jabali, Larry Cannon, Monte Towe, Jimmy Foster, Mel Daniels, Bob Netolicky, Roger Brown, Art Becker, Mike Lewis, Rick Mount, Rich Jones, Stew Johnson, Gene Moore, Tony Jackson.
-- Not included (for review): Arvesta Kelly (920 views/yr), Bill Newton (basketball) (880 views/yr), Ollie Darden (1476 views/yr), Skeeter Swift (1454 views/yr).
-- For each: players row (detail line: born . position . main team . years), aliases (title + name), played_for_team facts
-- at our franchises from the infobox playing career (historic names count), prior_tenure (seasons at the franchise),
-- prior_views and player_pageviews (Wikimedia pageviews API, user agents, Sep 2025 - Aug 2026).
-- No existing row changes, so no backup is needed. 0. GUARD first.

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  SELECT count(*) INTO n FROM players WHERE wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135);
  IF n > 0 THEN RAISE EXCEPTION 'Migration 027 is already applied (% of its players exist). Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM players WHERE wikidata_qid IN ('Q1608912', 'Q1608950', 'Q3827132', 'Q3862090', 'Q3806562', 'Q288853', 'Q1608253', 'Q1608798', 'Q3624252', 'Q3857417', 'Q3935014', 'Q3934732', 'Q3499332', 'Q3759430', 'Q3993254');
  IF n > 0 THEN RAISE EXCEPTION '027 guard: % of these people already exist under another article. Nothing changed.', n; END IF;
END $mig$;

DO $mig$
DECLARE n BIGINT;
BEGIN
  INSERT INTO players (wikipedia_page_id, wikipedia_title, wikidata_qid, display_name, sports, birth_year, positions, main_team, first_year, last_year)
  SELECT v.page_id, v.title, v.qid, v.display, ARRAY['NBA'], v.birth_year, v.positions, v.main_team, v.first_year, v.last_year
    FROM (VALUES
    (12720885, 'Julius Keye', 'Q1608912', 'Julius Keye', 1946, 'C/PF', 'Nuggets', 1969, 1975),
    (4375844, 'Warren Jabali', 'Q1608950', 'Warren Jabali', 1946, 'SG/PG', 'Nuggets', 1968, 1975),
    (13455589, 'Larry Cannon (basketball)', 'Q3827132', 'Larry Cannon', 1947, 'SG', 'Pacers', 1969, 1977),
    (9809250, 'Monte Towe', 'Q3862090', 'Monte Towe', 1953, 'PG', 'Nuggets', 1975, 1977),
    (11515115, 'Jimmy Foster (basketball)', 'Q3806562', 'Jimmy Foster', 1951, 'PG', 'Nuggets', 1974, 1976),
    (2359991, 'Mel Daniels', 'Q288853', 'Mel Daniels', 1944, 'C', 'Pacers', 1967, 1976),
    (4403012, 'Bob Netolicky', 'Q1608253', 'Bob Netolicky', 1942, 'PF/C', 'Pacers', 1967, 1976),
    (3307270, 'Roger Brown (basketball, born 1942)', 'Q1608798', 'Roger Brown', 1942, 'SF', 'Pacers', 1967, 1975),
    (11148709, 'Art Becker', 'Q3624252', 'Art Becker', 1942, 'PF/SF', 'Pacers', 1967, 1973),
    (12742448, 'Mike Lewis (basketball)', 'Q3857417', 'Mike Lewis', 1946, 'PF/C', 'Pacers', 1968, 1974),
    (8990742, 'Rick Mount', 'Q3935014', 'Rick Mount', 1947, 'SG', 'Pacers', 1970, 1975),
    (11515092, 'Rich Jones (basketball)', 'Q3934732', 'Rich Jones', 1946, 'PF/C', 'Spurs', 1969, 1977),
    (2987126, 'Stew Johnson', 'Q3499332', 'Stew Johnson', 1944, 'PF/C', 'Nets', 1966, 1983),
    (12743417, 'Gene Moore (basketball)', 'Q3759430', 'Gene Moore', 1945, 'C', 'Spurs', 1968, 1975),
    (3049135, 'Tony Jackson (basketball, born 1942)', 'Q3993254', 'Tony Jackson', 1942, 'SF/SG', 'Nets', 1961, 1969)
    ) AS v(page_id, title, qid, display, birth_year, positions, main_team, first_year, last_year);
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 15 THEN RAISE EXCEPTION '027: expected 15 players, got %', n; END IF;

  INSERT INTO player_aliases (player_id, alias, alias_exact, alias_norm, kind, source, curated)
  SELECT p.id, a.alias, normalize_name_exact(a.alias), normalize_name(a.alias), a.kind, 'wikipedia', false
    FROM (VALUES
    (12720885, 'Julius Keye', 'title'),
    (4375844, 'Warren Jabali', 'title'),
    (13455589, 'Larry Cannon (basketball)', 'title'),
    (13455589, 'Larry Cannon', 'display'),
    (9809250, 'Monte Towe', 'title'),
    (11515115, 'Jimmy Foster (basketball)', 'title'),
    (11515115, 'Jimmy Foster', 'display'),
    (2359991, 'Mel Daniels', 'title'),
    (4403012, 'Bob Netolicky', 'title'),
    (3307270, 'Roger Brown (basketball, born 1942)', 'title'),
    (3307270, 'Roger Brown', 'display'),
    (11148709, 'Art Becker', 'title'),
    (12742448, 'Mike Lewis (basketball)', 'title'),
    (12742448, 'Mike Lewis', 'display'),
    (8990742, 'Rick Mount', 'title'),
    (11515092, 'Rich Jones (basketball)', 'title'),
    (11515092, 'Rich Jones', 'display'),
    (2987126, 'Stew Johnson', 'title'),
    (12743417, 'Gene Moore (basketball)', 'title'),
    (12743417, 'Gene Moore', 'display'),
    (3049135, 'Tony Jackson (basketball, born 1942)', 'title'),
    (3049135, 'Tony Jackson', 'display')
    ) AS a(page_id, alias, kind)
    JOIN players p ON p.wikipedia_page_id = a.page_id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 22 THEN RAISE EXCEPTION '027: expected 22 aliases, got %', n; END IF;

  PERFORM setval(pg_get_serial_sequence('public.player_facts', 'id'), (SELECT max(id) FROM player_facts));
  INSERT INTO player_facts (player_name, sport, fact_type, fact_value, player_id, owner_method)
  SELECT CASE WHEN f.t = 1 THEN p.wikipedia_title ELSE p.display_name END, 'NBA', 'played_for_team', f.team, p.id, 'new ABA player, wikipedia infobox (027)'
    FROM (VALUES
    (12720885, 'Nuggets', 0),
    (4375844, 'Pacers', 0),
    (4375844, 'Nuggets', 0),
    (13455589, 'Nuggets', 0),
    (13455589, 'Pacers', 0),
    (13455589, '76ers', 0),
    (9809250, 'Nuggets', 0),
    (11515115, 'Nuggets', 0),
    (2359991, 'Pacers', 0),
    (4403012, 'Pacers', 0),
    (4403012, 'Spurs', 0),
    (3307270, 'Pacers', 0),
    (11148709, 'Pacers', 0),
    (11148709, 'Nuggets', 0),
    (11148709, 'Spurs', 0),
    (12742448, 'Pacers', 0),
    (8990742, 'Pacers', 0),
    (11515092, 'Spurs', 0),
    (2987126, 'Nets', 0),
    (2987126, 'Spurs', 0),
    (12743417, 'Spurs', 0),
    (3049135, 'Nets', 0)
    ) AS f(page_id, team, t)
    JOIN players p ON p.wikipedia_page_id = f.page_id;
  GET DIAGNOSTICS n = ROW_COUNT; IF n <> 22 THEN RAISE EXCEPTION '027: expected 22 facts, got %', n; END IF;

  INSERT INTO prior_tenure (player_id, sport, team, tenure)
  SELECT p.id, 'NBA', t.team, t.tenure
    FROM (VALUES
    (12720885, 'Nuggets', 5),
    (4375844, 'Pacers', 1),
    (4375844, 'Nuggets', 2),
    (13455589, 'Nuggets', 1),
    (13455589, 'Pacers', 2),
    (13455589, '76ers', 1),
    (9809250, 'Nuggets', 1),
    (11515115, 'Nuggets', 1),
    (2359991, 'Pacers', 6),
    (4403012, 'Pacers', 8),
    (4403012, 'Spurs', 1),
    (3307270, 'Pacers', 8),
    (11148709, 'Pacers', 1),
    (11148709, 'Nuggets', 1),
    (11148709, 'Spurs', 1),
    (12742448, 'Pacers', 1),
    (8990742, 'Pacers', 1),
    (11515092, 'Spurs', 5),
    (2987126, 'Nets', 1),
    (2987126, 'Spurs', 1),
    (12743417, 'Spurs', 1),
    (3049135, 'Nets', 1)
    ) AS t(page_id, team, tenure)
    JOIN players p ON p.wikipedia_page_id = t.page_id;

  INSERT INTO prior_views (player_id, pageviews_12m, redirect_views, source)
  SELECT p.id, v.views, 0, 'Wikimedia pageviews API 2025-09..2026-08 (user agents, en.wikipedia) (027)'
    FROM (VALUES (12720885, 1036), (4375844, 36850), (13455589, 3525), (9809250, 12776), (11515115, 1052), (2359991, 35975), (4403012, 8822), (3307270, 24140), (11148709, 5683), (12742448, 1741), (8990742, 30647), (11515092, 2002), (2987126, 2243), (12743417, 1153), (3049135, 2732)) AS v(page_id, views) JOIN players p ON p.wikipedia_page_id = v.page_id;
  INSERT INTO player_pageviews (player_id, sport, pageviews_12m, source)
  SELECT p.id, 'NBA', v.views, 'Wikimedia pageviews API 2025-09..2026-08 (027)'
    FROM (VALUES (12720885, 1036), (4375844, 36850), (13455589, 3525), (9809250, 12776), (11515115, 1052), (2359991, 35975), (4403012, 8822), (3307270, 24140), (11148709, 5683), (12742448, 1741), (8990742, 30647), (11515092, 2002), (2987126, 2243), (12743417, 1153), (3049135, 2732)) AS v(page_id, views) JOIN players p ON p.wikipedia_page_id = v.page_id;
END $mig$;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM players WHERE wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135))           AS new_players,
  (SELECT count(*) FROM player_facts WHERE owner_method = 'new ABA player, wikipedia infobox (027)')                                           AS new_facts,
  (SELECT count(*) FROM player_aliases a JOIN players p ON p.id = a.player_id WHERE p.wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135)) AS new_aliases,
  (SELECT count(*) FROM prior_views v JOIN players p ON p.id = v.player_id WHERE p.wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135)) AS new_views,
  (SELECT string_agg(f.fact_value, ', ' ORDER BY f.fact_value) FROM player_facts f JOIN players p ON p.id = f.player_id WHERE p.wikipedia_page_id = 2359991) AS mel_daniels_teams,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Mel Daniels', 'NBA'))         AS resolve_mel_daniels;
-- EXPECTED: new_players = 15; new_facts = 22; new_aliases = 22; new_views = 15; mel_daniels_teams = Pacers; resolve_mel_daniels starts with a match on Mel Daniels

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DELETE FROM player_pageviews WHERE source = 'Wikimedia pageviews API 2025-09..2026-08 (027)';
-- DELETE FROM prior_views WHERE source LIKE '%(027)';
-- DELETE FROM prior_tenure WHERE player_id IN (SELECT id FROM players WHERE wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135));
-- DELETE FROM player_facts WHERE owner_method = 'new ABA player, wikipedia infobox (027)';
-- DELETE FROM player_aliases WHERE player_id IN (SELECT id FROM players WHERE wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135));
-- DELETE FROM players WHERE wikipedia_page_id IN (12720885, 4375844, 13455589, 9809250, 11515115, 2359991, 4403012, 3307270, 11148709, 12742448, 8990742, 11515092, 2987126, 12743417, 3049135);
-- COMMIT;
