-- Migration 018d: fill player_id on answers recorded before ID-based checking
-- Run in Supabase SQL Editor AFTER 018c. One small transaction. PURE ASCII.
-- 0. BACKUP: backup_20260926_answer_ids_018d = id + player id columns of answer_submissions
--    and moves, as they are now (RLS on, closed).
-- 1. answer_submissions.player_id: from the stored player_name (valid rows) or the typed text
--    (invalid rows), ONLY when resolve_player gives exactly one "resolved" player in that sport.
-- 2. moves.p1_player_id / p2_player_id: from the linked submission when there is one, otherwise
--    from the answer text the same way. Sport comes from the question key (old "q_" keys too).
-- Never guesses: ambiguous, did-you-mean and unknown names stay NULL (listed by the checks).
-- Only rows whose player id is still NULL are touched, so it is safe to re-run later.

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20260926_answer_ids_018d AS
  SELECT 'answer_submissions'::text AS tbl, id::text AS row_id, player_id AS p1_player_id, NULL::bigint AS p2_player_id
    FROM answer_submissions
  UNION ALL
  SELECT 'moves', id::text, p1_player_id, p2_player_id FROM moves;
ALTER TABLE backup_20260926_answer_ids_018d ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_answer_ids_018d FROM anon, authenticated;

-- --- 1. answer_submissions ------------------------------------------------------------------
UPDATE answer_submissions s
   SET player_id = (SELECT CASE WHEN count(*) = 1 AND min(r.status) = 'resolved' THEN min(r.player_id) END
                      FROM resolve_player(coalesce(s.player_name, s.typed_text), s.sport) r)
 WHERE s.player_id IS NULL;

-- --- 2. moves -------------------------------------------------------------------------------
UPDATE moves m
   SET p1_player_id = coalesce(
         (SELECT a.player_id FROM answer_submissions a WHERE a.id = m.p1_submission_id),
         (SELECT CASE WHEN count(*) = 1 AND min(r.status) = 'resolved' THEN min(r.player_id) END
            FROM resolve_player(m.p1_answer, answer_stats_sport(regexp_replace(m.question_key, '^q_', ''))) r))
 WHERE m.p1_player_id IS NULL AND m.p1_answer IS NOT NULL;
UPDATE moves m
   SET p2_player_id = coalesce(
         (SELECT a.player_id FROM answer_submissions a WHERE a.id = m.p2_submission_id),
         (SELECT CASE WHEN count(*) = 1 AND min(r.status) = 'resolved' THEN min(r.player_id) END
            FROM resolve_player(m.p2_answer, answer_stats_sport(regexp_replace(m.question_key, '^q_', ''))) r))
 WHERE m.p2_player_id IS NULL AND m.p2_answer IS NOT NULL;

COMMIT;

-- --- 3. CHECKS (run after COMMIT; one row; permanent tables only) ------------------------------
SELECT
  (SELECT count(*) FROM answer_submissions)                                                   AS submissions,
  (SELECT count(*) FROM answer_submissions WHERE player_id IS NOT NULL)                       AS submissions_with_id,
  (SELECT count(*) FROM answer_submissions WHERE valid AND player_id IS NULL)                 AS valid_without_id,
  (SELECT count(*) FROM moves WHERE p1_answer IS NOT NULL) + (SELECT count(*) FROM moves WHERE p2_answer IS NOT NULL) AS move_answers,
  (SELECT count(*) FROM moves WHERE p1_player_id IS NOT NULL) + (SELECT count(*) FROM moves WHERE p2_player_id IS NOT NULL) AS move_answers_with_id,
  (SELECT string_agg(x, ' | ' ORDER BY x) FROM (
     SELECT 'sub ' || id || ': ' || coalesce(player_name, typed_text) AS x FROM answer_submissions WHERE player_id IS NULL
     UNION ALL SELECT 'move ' || left(id::text, 8) || ' p1: ' || p1_answer FROM moves WHERE p1_answer IS NOT NULL AND p1_player_id IS NULL
     UNION ALL SELECT 'move ' || left(id::text, 8) || ' p2: ' || p2_answer FROM moves WHERE p2_answer IS NOT NULL AND p2_player_id IS NULL) u) AS left_without_id,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'backup_20260926_answer_ids_018d')     AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20260926_answer_ids_018d'
     AND grantee IN ('anon', 'authenticated'))                                                AS backup_browser_grants;
-- EXPECTED: submissions = 4; submissions_with_id = 4; valid_without_id = 0; move_answers = 23; move_answers_with_id = 23; left_without_id = null; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- BEGIN;
-- UPDATE answer_submissions s SET player_id = b.p1_player_id FROM backup_20260926_answer_ids_018d b
--  WHERE b.tbl = 'answer_submissions' AND b.row_id = s.id::text;
-- UPDATE moves m SET p1_player_id = b.p1_player_id, p2_player_id = b.p2_player_id FROM backup_20260926_answer_ids_018d b
--  WHERE b.tbl = 'moves' AND b.row_id = m.id::text;
-- COMMIT;
