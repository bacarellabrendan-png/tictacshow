-- Migration 018b-0: detail-line staging table + backup of players (no player data changed)
-- Run in Supabase SQL Editor. One small transaction. PURE ASCII.
-- 1. BACKUP: backup_20260926_players_018b = the detail columns of every player, as they are now.
-- 2. stage_player_details: empty table the detail data is loaded into (with the service key,
--    through the API - the data has accented club names, which the SQL editor copy step mangles).
--    Both tables: RLS on, no browser access.
-- After this, I load staging and verify it row-for-row; then 018b-1 copies it into players.

BEGIN;

-- --- 1. BACKUP (RLS on, no browser access) -------------------------------------------
CREATE TABLE backup_20260926_players_018b AS
  SELECT id, wikipedia_page_id, first_year, last_year, positions, main_team, birth_year FROM players;
ALTER TABLE backup_20260926_players_018b ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_players_018b FROM anon, authenticated;

-- --- 2. STAGING -------------------------------------------------------------------------
CREATE TABLE stage_player_details (
  wikipedia_page_id BIGINT PRIMARY KEY,
  first_year        INT,
  last_year         INT,
  positions         TEXT,
  main_team         TEXT,
  birth_year        INT
);
ALTER TABLE stage_player_details ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON stage_player_details FROM anon, authenticated;

COMMIT;

-- --- 3. CHECKS (run after COMMIT; one row; permanent tables and catalogs only) -----------
SELECT
  (SELECT count(*) FROM backup_20260926_players_018b)                                     AS backup_rows,
  (SELECT count(*) FROM players)                                                          AS players,
  (SELECT count(*) FROM stage_player_details)                                             AS staging_rows,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN ('backup_20260926_players_018b', 'stage_player_details')) AS rls_on,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name IN ('backup_20260926_players_018b', 'stage_player_details')
       AND grantee IN ('anon', 'authenticated'))                                          AS browser_grants;
-- EXPECTED: backup_rows = 77008; players = 77008; staging_rows = 0; rls_on = true; browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------
-- DROP TABLE IF EXISTS stage_player_details;
-- DROP TABLE IF EXISTS backup_20260926_players_018b;
