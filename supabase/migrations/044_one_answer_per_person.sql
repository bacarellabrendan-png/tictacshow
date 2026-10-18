-- Migration 044: rarity counts one answer per person per square (owner decision, 17 Oct 2026).
-- PURE ASCII. No row changes: raw answers stay as they are; the de-duplication happens when counting.
--   get_square_counts_v3(question_key): like v2 (valid answers with a player, by player), but each person counts once
--     per square, with their FIRST valid answer on that square (any mode: head-to-head, CPU, later the daily grid).
--     Answers of deleted accounts (user_id cleared by delete_my_account) count once each. Same signature and output
--     as v2, so the app switches by name. v2 stays (rollback / comparison).
--   record_answer_v3: no longer callable without a login (anon could write answers with no user through the API,
--     which the one-per-person rule couldn't de-duplicate). The app only records answers for signed-in players.
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF to_regprocedure('public.get_square_counts_v3(text)') IS NOT NULL THEN RAISE EXCEPTION 'Migration 044 is already applied (found get_square_counts_v3). Nothing changed.'; END IF;
END $mig$;

CREATE FUNCTION public.get_square_counts_v3(p_question_key TEXT)
RETURNS TABLE(player_id BIGINT, submissions BIGINT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
  SELECT f.player_id, count(*)::BIGINT
    FROM (SELECT DISTINCT ON (coalesce(s.user_id::text, 'row:' || s.id::text)) s.player_id
            FROM public.answer_submissions s
           WHERE s.question_key = p_question_key AND s.valid AND s.player_id IS NOT NULL
           ORDER BY coalesce(s.user_id::text, 'row:' || s.id::text), s.created_at, s.id) AS f
   GROUP BY f.player_id
$fn$;
REVOKE ALL ON FUNCTION public.get_square_counts_v3(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_square_counts_v3(TEXT) TO anon, authenticated, triage_ro;

REVOKE EXECUTE ON FUNCTION public.record_answer_v3(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, BIGINT) FROM PUBLIC, anon;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT prosecdef FROM pg_proc WHERE oid = 'public.get_square_counts_v3(text)'::regprocedure)                                AS v3_security_definer,
  has_function_privilege('anon', 'public.get_square_counts_v3(text)', 'EXECUTE')                                              AS anon_reads_counts,
  has_function_privilege('anon', 'public.record_answer_v3(text,text,text,text,jsonb,text,bigint)', 'EXECUTE')                 AS anon_records_answers,
  has_function_privilege('authenticated', 'public.record_answer_v3(text,text,text,text,jsonb,text,bigint)', 'EXECUTE')        AS players_record_answers,
  (SELECT count(*) FROM (SELECT DISTINCT question_key FROM answer_submissions WHERE valid AND player_id IS NOT NULL) q
    WHERE (SELECT coalesce(sum(submissions), 0) FROM get_square_counts_v3(q.question_key))
        > (SELECT coalesce(sum(submissions), 0) FROM get_square_counts_v2(q.question_key)))                                  AS squares_where_v3_exceeds_v2;
-- EXPECTED: v3_security_definer = true; anon_reads_counts = true; anon_records_answers = false; players_record_answers = true; squares_where_v3_exceeds_v2 = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DROP FUNCTION public.get_square_counts_v3(TEXT);
-- GRANT EXECUTE ON FUNCTION public.record_answer_v3(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, BIGINT) TO anon;
-- COMMIT;
