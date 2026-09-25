-- Migration 015: remove the second set of Sept 25 test accounts (game-ending reveal test + regression)
-- Run in Supabase SQL Editor. Steps 0–1 run as one transaction. No temp tables:
-- the backup tables hold the id lists, and every statement reads only permanent tables.
-- The check block was run ALONE in a separate session against a local test database.
--
-- Test accounts: tts_test_3@example.com, tts_test_4@example.com.
-- Removes, in foreign-key order: wrong_answer_reports → moves → answer_submissions
-- → games → auth.users. Public rows are backed up first (RLS on, no browser access).
-- For accounts only id + email are kept (no password hashes in the public schema).

BEGIN;

-- ─── 0. BACKUPS (also the id lists for step 1) ──────────────────────────────
CREATE TABLE backup_20260925c_test_users AS
  SELECT id, email FROM auth.users
   WHERE email IN ('tts_test_3@example.com', 'tts_test_4@example.com');
CREATE TABLE backup_20260925c_test_games AS
  SELECT * FROM games
   WHERE player1_id IN (SELECT id FROM backup_20260925c_test_users)
      OR player2_id IN (SELECT id FROM backup_20260925c_test_users);
CREATE TABLE backup_20260925c_test_submissions AS
  SELECT * FROM answer_submissions
   WHERE user_id IN (SELECT id FROM backup_20260925c_test_users)
      OR game_id IN (SELECT id FROM backup_20260925c_test_games);
CREATE TABLE backup_20260925c_test_reports AS
  SELECT * FROM wrong_answer_reports
   WHERE reporter_id   IN (SELECT id FROM backup_20260925c_test_users)
      OR submission_id IN (SELECT id FROM backup_20260925c_test_submissions);
CREATE TABLE backup_20260925c_test_moves AS
  SELECT * FROM moves WHERE game_id IN (SELECT id FROM backup_20260925c_test_games);

ALTER TABLE backup_20260925c_test_users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925c_test_games       ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925c_test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925c_test_reports     ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925c_test_moves       ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925c_test_users, backup_20260925c_test_games, backup_20260925c_test_submissions,
              backup_20260925c_test_reports, backup_20260925c_test_moves FROM anon, authenticated;

-- ─── 1. DELETE (foreign-key order) ───────────────────────────────────────────
DELETE FROM wrong_answer_reports WHERE id IN (SELECT id FROM backup_20260925c_test_reports);
DELETE FROM moves                WHERE id IN (SELECT id FROM backup_20260925c_test_moves);
DELETE FROM answer_submissions   WHERE id IN (SELECT id FROM backup_20260925c_test_submissions);
DELETE FROM games                WHERE id IN (SELECT id FROM backup_20260925c_test_games);
DELETE FROM auth.users           WHERE id IN (SELECT id FROM backup_20260925c_test_users);

COMMIT;

-- ─── 2. CHECK (run after COMMIT; one row; permanent tables + catalogs only) ──
-- Expected: every "*_left" = 0, backups_rls_on = true, answer_submissions_total_now = 0,
-- reports_total_now = 2 (the original March reports).
SELECT
  (SELECT count(*) FROM auth.users
    WHERE id IN (SELECT id FROM backup_20260925c_test_users))                   AS test_accounts_left,
  (SELECT count(*) FROM games
    WHERE id IN (SELECT id FROM backup_20260925c_test_games))                   AS test_games_left,
  (SELECT count(*) FROM moves
    WHERE id IN (SELECT id FROM backup_20260925c_test_moves))                   AS test_moves_left,
  (SELECT count(*) FROM answer_submissions
    WHERE id IN (SELECT id FROM backup_20260925c_test_submissions))             AS test_submissions_left,
  (SELECT count(*) FROM wrong_answer_reports
    WHERE id IN (SELECT id FROM backup_20260925c_test_reports))                 AS test_reports_left,
  (SELECT count(*) FROM answer_submissions)                                    AS answer_submissions_total_now,
  (SELECT count(*) FROM wrong_answer_reports)                                  AS reports_total_now,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN (
     'backup_20260925c_test_users', 'backup_20260925c_test_games', 'backup_20260925c_test_submissions',
     'backup_20260925c_test_reports', 'backup_20260925c_test_moves'))            AS backups_rls_on;

-- ─── ROLLBACK (public rows only; test accounts are not restored) ────────────
-- BEGIN;
-- INSERT INTO games SELECT * FROM backup_20260925c_test_games;
-- INSERT INTO answer_submissions OVERRIDING SYSTEM VALUE SELECT * FROM backup_20260925c_test_submissions;
-- INSERT INTO moves SELECT * FROM backup_20260925c_test_moves;
-- INSERT INTO wrong_answer_reports OVERRIDING SYSTEM VALUE SELECT * FROM backup_20260925c_test_reports;
-- COMMIT;
