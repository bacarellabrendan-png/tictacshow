-- Migration 014: remove the Sept 25 verification test accounts and everything they created
-- APPLIED Sept 25 2026. This file is the corrected RECORD — do not re-run.
--
-- Correction: the applied version collected ids in session temp tables (t_users,
-- t_games, t_subs) and a "t_users does not exist" error was reported after COMMIT.
-- The post-COMMIT checks never referenced those tables, but to rule out any
-- dependence on session objects this version uses NO temp tables: the backup
-- tables themselves hold the id lists, and every statement reads only permanent
-- tables. The check block was run on its own, in a separate session, against a
-- local test database after the body ran.
--
-- Test accounts: tts_test_1@example.com, tts_test_2@example.com.
-- Removes, in foreign-key order: wrong_answer_reports → moves → answer_submissions
-- → games → auth.users. Public rows are backed up first (RLS on, no browser access).
-- For accounts only id + email are kept: copying auth rows (password hashes) into
-- the public schema would be a risk, and the accounts are disposable.
--
-- Applied result: test_accounts_left 0, answer_submissions 0, test reports 0,
-- reports_total 2 (the original March reports), all backups RLS on.

BEGIN;

-- ─── 0. BACKUPS (also the id lists for step 1) ──────────────────────────────
CREATE TABLE backup_20260925_test_users AS
  SELECT id, email FROM auth.users
   WHERE email IN ('tts_test_1@example.com', 'tts_test_2@example.com');
CREATE TABLE backup_20260925_test_games AS
  SELECT * FROM games
   WHERE player1_id IN (SELECT id FROM backup_20260925_test_users)
      OR player2_id IN (SELECT id FROM backup_20260925_test_users);
CREATE TABLE backup_20260925_test_submissions AS
  SELECT * FROM answer_submissions
   WHERE user_id IN (SELECT id FROM backup_20260925_test_users)
      OR game_id IN (SELECT id FROM backup_20260925_test_games);
CREATE TABLE backup_20260925_test_reports AS
  SELECT * FROM wrong_answer_reports
   WHERE reporter_id   IN (SELECT id FROM backup_20260925_test_users)
      OR submission_id IN (SELECT id FROM backup_20260925_test_submissions);
CREATE TABLE backup_20260925_test_moves AS
  SELECT * FROM moves WHERE game_id IN (SELECT id FROM backup_20260925_test_games);

ALTER TABLE backup_20260925_test_users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925_test_games       ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925_test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925_test_reports     ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_20260925_test_moves       ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925_test_users, backup_20260925_test_games, backup_20260925_test_submissions,
              backup_20260925_test_reports, backup_20260925_test_moves FROM anon, authenticated;

-- ─── 1. DELETE (foreign-key order) ───────────────────────────────────────────
DELETE FROM wrong_answer_reports WHERE id IN (SELECT id FROM backup_20260925_test_reports);
DELETE FROM moves                WHERE id IN (SELECT id FROM backup_20260925_test_moves);
DELETE FROM answer_submissions   WHERE id IN (SELECT id FROM backup_20260925_test_submissions);
DELETE FROM games                WHERE id IN (SELECT id FROM backup_20260925_test_games);
DELETE FROM auth.users           WHERE id IN (SELECT id FROM backup_20260925_test_users);

COMMIT;

-- ─── 2. CHECK (run after COMMIT; one row; permanent tables + catalogs only) ──
-- Every "*_left" must be 0; all RLS flags true.
SELECT
  (SELECT count(*) FROM auth.users
    WHERE id IN (SELECT id FROM backup_20260925_test_users))                   AS test_accounts_left,
  (SELECT count(*) FROM games
    WHERE id IN (SELECT id FROM backup_20260925_test_games))                   AS test_games_left,
  (SELECT count(*) FROM moves
    WHERE id IN (SELECT id FROM backup_20260925_test_moves))                   AS test_moves_left,
  (SELECT count(*) FROM answer_submissions
    WHERE id IN (SELECT id FROM backup_20260925_test_submissions))             AS test_submissions_left,
  (SELECT count(*) FROM wrong_answer_reports
    WHERE id IN (SELECT id FROM backup_20260925_test_reports))                 AS test_reports_left,
  (SELECT count(*) FROM answer_submissions)                                    AS answer_submissions_total_now,
  (SELECT count(*) FROM wrong_answer_reports)                                  AS reports_total_now,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN (
     'backup_20260925_test_users', 'backup_20260925_test_games', 'backup_20260925_test_submissions',
     'backup_20260925_test_reports', 'backup_20260925_test_moves'))            AS backups_rls_on;

-- ─── ROLLBACK (public rows only; test accounts are not restored) ────────────
-- BEGIN;
-- INSERT INTO games SELECT * FROM backup_20260925_test_games;
-- INSERT INTO answer_submissions OVERRIDING SYSTEM VALUE SELECT * FROM backup_20260925_test_submissions;
-- INSERT INTO moves SELECT * FROM backup_20260925_test_moves;
-- INSERT INTO wrong_answer_reports OVERRIDING SYSTEM VALUE SELECT * FROM backup_20260925_test_reports;
-- COMMIT;
