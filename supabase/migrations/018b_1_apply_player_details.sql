-- Migration 018b-1: fill the players detail columns from the verified staging table
-- Run in Supabase SQL Editor AFTER 018b-0 and after the staging load was verified. PURE ASCII.
-- One transaction, 77006 row updates (a few seconds).
-- GUARD: refuses to run unless staging holds exactly the reviewed data (row count + md5
-- fingerprint computed from the reviewed file) and the 018b-0 backup exists with every player.
-- Updates first_year, last_year, positions, main_team, birth_year. Nothing else changes.
-- Years are the seasons a fan would say (Gretzky 1979-1999); main team = franchise with the most
-- games (NFL: seasons), shown by the name it had then (Payton: SuperSonics); Soccer shows the
-- birth year and the club with the longest stint. Multi-sport players: their main sport.

BEGIN;

DO $mig$
DECLARE n BIGINT; fp TEXT; nb BIGINT; np BIGINT;
BEGIN
  SELECT count(*), md5(string_agg(wikipedia_page_id::text || '|' || coalesce(first_year::text, '') || '|' || coalesce(last_year::text, '') || '|' ||
             coalesce(positions, '') || '|' || coalesce(main_team, '') || '|' || coalesce(birth_year::text, ''), E'\n' ORDER BY wikipedia_page_id))
    INTO n, fp FROM stage_player_details;
  IF n <> 77006 OR fp IS DISTINCT FROM '551c90d25a24826ec2a6225fcf7b72e0' THEN
    RAISE EXCEPTION 'stage_player_details is not the reviewed data (rows %, fingerprint %). Nothing changed.', n, fp;
  END IF;
  SELECT count(*) INTO nb FROM backup_20260926_players_018b;
  SELECT count(*) INTO np FROM players;
  IF nb <> np THEN RAISE EXCEPTION 'backup_20260926_players_018b has % rows, players has %. Nothing changed.', nb, np; END IF;

  UPDATE players p
     SET first_year = s.first_year, last_year = s.last_year, positions = s.positions,
         main_team = s.main_team, birth_year = s.birth_year
    FROM stage_player_details s
   WHERE p.wikipedia_page_id = s.wikipedia_page_id;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 77006 THEN RAISE EXCEPTION 'expected 77006 players updated, got %. Rolled back.', n; END IF;
END
$mig$;

COMMIT;

-- --- CHECKS (run after COMMIT; one row; permanent tables and read-only calls) -----------------
SELECT
  (SELECT count(*) FROM players WHERE first_year IS NOT NULL)                              AS with_years,
  (SELECT count(*) FROM players WHERE positions IS NOT NULL)                               AS with_position,
  (SELECT count(*) FROM players WHERE main_team IS NOT NULL)                               AS with_main_team,
  (SELECT count(*) FROM players WHERE birth_year IS NOT NULL)                              AS with_birth_year,
  (SELECT count(*) FROM players WHERE first_year > last_year OR first_year < 1869 OR last_year > 2026) AS bad_years,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Jr.'), 'MLB')  AS d_griffey_jr,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Sr.'), 'MLB')  AS d_griffey_sr,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Gary Payton'), 'NBA')      AS d_payton,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Gary Payton II'), 'NBA')   AS d_payton_ii,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Wayne Gretzky'), 'NHL')    AS d_gretzky,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Josh Johnson (quarterback)'), 'NFL') AS d_josh_johnson_qb,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Lionel Messi'), 'Soccer')  AS d_messi,
  (SELECT string_agg(display_name || ' = ' || detail, ' | ' ORDER BY display_name COLLATE "C")
     FROM resolve_player('Ken Griffey', 'MLB'))                                            AS chooser_ken_griffey;
-- EXPECTED: with_years = 70315; with_position = 72893; with_main_team = 72161; with_birth_year = 76555; bad_years = 0; d_griffey_jr = 1989-2010 <U+00B7> OF <U+00B7> Mariners; d_griffey_sr = 1973-1991 <U+00B7> OF <U+00B7> Reds; d_payton = 1990-2007 <U+00B7> PG <U+00B7> SuperSonics; d_payton_ii = 2016-2026 <U+00B7> PG <U+00B7> Warriors; d_gretzky = 1979-1999 <U+00B7> C <U+00B7> Oilers; d_josh_johnson_qb = 2008-2025 <U+00B7> QB <U+00B7> Buccaneers; d_messi = born 1987 <U+00B7> MF/FW <U+00B7> FC Barcelona; chooser_ken_griffey = Ken Griffey Jr. = 1989-2010 <U+00B7> OF <U+00B7> Mariners | Ken Griffey Sr. = 1973-1991 <U+00B7> OF <U+00B7> Reds

-- --- ROLLBACK (only if needed; puts back the detail columns exactly as backed up) --------------
-- BEGIN;
-- UPDATE players p SET first_year = b.first_year, last_year = b.last_year, positions = b.positions,
--        main_team = b.main_team, birth_year = b.birth_year
--   FROM backup_20260926_players_018b b WHERE b.id = p.id;
-- COMMIT;
