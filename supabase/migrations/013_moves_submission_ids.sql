-- Migration 013: link moves to answer_submissions + remove verification test rows
-- Run in Supabase SQL Editor. Steps 0–2 run as one transaction.
--
-- 1. moves.p1_submission_id / p2_submission_id: each player writes the id that
--    record_answer returned for their own answer. The report button reads them,
--    so either player can report either answer (the opponent's submission id
--    otherwise only exists in the opponent's browser). submit_wrong_answer_report_v2
--    still checks that the submission's move and role match.
-- 2. Deletes the 3 answer_submissions rows written by the Sept 25 local CPU-game
--    verification (ids 1–3), matched on id AND exact submission_key so nothing
--    else can be touched. Two were valid and would otherwise count toward rarity.

BEGIN;

-- ─── 0. BACKUPS (RLS on, no browser access) ──────────────────────────────────
CREATE TABLE backup_20260925b_moves AS SELECT * FROM moves;
ALTER TABLE backup_20260925b_moves ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925b_moves FROM anon, authenticated;

CREATE TABLE backup_20260925_answer_submissions AS SELECT * FROM answer_submissions;
ALTER TABLE backup_20260925_answer_submissions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925_answer_submissions FROM anon, authenticated;

-- ─── 1. SUBMISSION IDS ON MOVES ──────────────────────────────────────────────
ALTER TABLE moves
  ADD COLUMN IF NOT EXISTS p1_submission_id BIGINT REFERENCES answer_submissions(id),
  ADD COLUMN IF NOT EXISTS p2_submission_id BIGINT REFERENCES answer_submissions(id);

-- ─── 2. REMOVE VERIFICATION TEST ROWS ────────────────────────────────────────
DELETE FROM answer_submissions
 WHERE (id, submission_key) IN (
   (1, 'cpu-1790300990658:move-1790300991057:p1'),   -- Anthony Mason, Nets × 6MOY (valid)
   (2, 'cpu-1790300990658:move-1790301000423:p1'),   -- "Definitely Not A Player" (rejected)
   (3, 'cpu-1790300990658:move-1790301008474:p1'));  -- Sasha Vujacic, Nets × Clippers (valid)

COMMIT;

-- ─── 3. CHECKS (run after COMMIT; self-contained — permanent tables/catalogs only) ──
-- a) RLS on the new backup tables → both true
SELECT relname, relrowsecurity FROM pg_class
 WHERE relname IN ('backup_20260925b_moves', 'backup_20260925_answer_submissions') ORDER BY relname;
-- b) No browser privileges on them → 0 rows
SELECT table_name, grantee, privilege_type FROM information_schema.role_table_grants
 WHERE table_name IN ('backup_20260925b_moves', 'backup_20260925_answer_submissions')
   AND grantee IN ('anon', 'authenticated');
-- c) New columns exist → 2 rows, bigint
SELECT column_name, data_type FROM information_schema.columns
 WHERE table_name = 'moves' AND column_name IN ('p1_submission_id', 'p2_submission_id') ORDER BY 1;
-- d) Test rows gone; anything else untouched → test_rows_left 0, others equal
SELECT (SELECT count(*) FROM answer_submissions WHERE submission_key LIKE 'cpu-1790300990658:%') AS test_rows_left,
       (SELECT count(*) FROM backup_20260925_answer_submissions
         WHERE submission_key NOT LIKE 'cpu-1790300990658:%')                            AS others_before,
       (SELECT count(*) FROM answer_submissions)                                          AS others_after;

-- ─── ROLLBACK (only if needed) ───────────────────────────────────────────────
-- BEGIN;
-- ALTER TABLE moves DROP COLUMN IF EXISTS p1_submission_id, DROP COLUMN IF EXISTS p2_submission_id;
-- INSERT INTO answer_submissions OVERRIDING SYSTEM VALUE
--   SELECT * FROM backup_20260925_answer_submissions b
--    WHERE NOT EXISTS (SELECT 1 FROM answer_submissions a WHERE a.id = b.id);
-- COMMIT;
