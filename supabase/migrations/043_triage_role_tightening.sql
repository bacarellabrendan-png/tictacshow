-- Migration 043: tighten the triage role and close an old write path (independent review of the weekly triage,
-- 17 Oct 2026). PURE ASCII. No row changes.
--   1. public.submit_wrong_answer_report (old, SECURITY DEFINER, inserts rows; the app uses _v2) was executable by
--      PUBLIC/anon/authenticated, i.e. by anyone on the internet and by triage_ro: revoked.
--   2. triage_ro (042) had SELECT on every public table + BYPASSRLS. Now: NOBYPASSRLS; SELECT only on the tables the
--      triage reads; feedback WITHOUT contact_email/username/user_id/user_agent and wrong_answer_reports WITHOUT
--      reporter_id/reporter_name (so even a misbehaving run has no personal data to leak); row policies TO triage_ro
--      where row security would otherwise hide rows; EXECUTE on resolve_player (read-only; gather.mjs needs it).
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'triage_ro_read' AND tablename = 'feedback') THEN
    RAISE EXCEPTION 'Migration 043 is already applied (policy triage_ro_read exists). Nothing changed.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'triage_ro') THEN RAISE EXCEPTION '043 needs 042 (role triage_ro). Nothing changed.'; END IF;
END $mig$;

REVOKE EXECUTE ON FUNCTION public.submit_wrong_answer_report(TEXT, TEXT, BOOLEAN, TEXT) FROM PUBLIC, anon, authenticated;

ALTER ROLE triage_ro NOBYPASSRLS;
REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM triage_ro;
GRANT SELECT ON public.players, public.player_facts, public.player_aliases, public.games, public.moves,
                public.player_pageviews, public.prior_tenure, public.prior_views, public.prior_times,
                public.answer_submissions TO triage_ro;
GRANT SELECT (id, created_at, screen, message) ON public.feedback TO triage_ro;
GRANT SELECT (id, game_id, player_name, question_clue, reported_valid, created_at, submission_id, local_game_id, game_mode,
              move_id, cell_index, sport, row_category_id, row_category_label, col_category_id, col_category_label,
              typed_answer, game_ruling, reported_player, reporter_is_answerer, reporter_says_correct, note)
  ON public.wrong_answer_reports TO triage_ro;
GRANT EXECUTE ON FUNCTION public.resolve_player(TEXT, TEXT) TO triage_ro;

CREATE POLICY triage_ro_read ON public.feedback             FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.wrong_answer_reports FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.answer_submissions   FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.player_aliases       FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.prior_tenure         FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.prior_views          FOR SELECT TO triage_ro USING (true);
CREATE POLICY triage_ro_read ON public.prior_times          FOR SELECT TO triage_ro USING (true);

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  has_function_privilege('anon', 'public.submit_wrong_answer_report(text,text,boolean,text)', 'EXECUTE')        AS anon_can_call_old_report,
  has_function_privilege('triage_ro', 'public.submit_wrong_answer_report(text,text,boolean,text)', 'EXECUTE')   AS triage_can_call_old_report,
  (SELECT rolbypassrls FROM pg_roles WHERE rolname = 'triage_ro')                                               AS triage_bypasses_rls,
  has_column_privilege('triage_ro', 'public.feedback', 'message', 'SELECT')                                     AS reads_feedback_message,
  has_column_privilege('triage_ro', 'public.feedback', 'contact_email', 'SELECT')                               AS reads_contact_email,
  has_column_privilege('triage_ro', 'public.wrong_answer_reports', 'reporter_name', 'SELECT')                   AS reads_reporter_name,
  has_function_privilege('triage_ro', 'public.resolve_player(text,text)', 'EXECUTE')                            AS can_resolve,
  (SELECT count(*) FROM pg_policies WHERE policyname = 'triage_ro_read')                                        AS triage_policies,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE grantee = 'triage_ro' AND privilege_type <> 'SELECT') AS write_grants;
-- EXPECTED: anon_can_call_old_report = false; triage_can_call_old_report = false; triage_bypasses_rls = false; reads_feedback_message = true; reads_contact_email = false; reads_reporter_name = false; can_resolve = true; triage_policies = 7; write_grants = 0

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DROP POLICY triage_ro_read ON public.feedback;
-- DROP POLICY triage_ro_read ON public.wrong_answer_reports;
-- DROP POLICY triage_ro_read ON public.answer_submissions;
-- DROP POLICY triage_ro_read ON public.player_aliases;
-- DROP POLICY triage_ro_read ON public.prior_tenure;
-- DROP POLICY triage_ro_read ON public.prior_views;
-- DROP POLICY triage_ro_read ON public.prior_times;
-- REVOKE EXECUTE ON FUNCTION public.resolve_player(TEXT, TEXT) FROM triage_ro;
-- REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM triage_ro;
-- REVOKE SELECT (id, created_at, screen, message) ON public.feedback FROM triage_ro;
-- REVOKE SELECT (id, game_id, player_name, question_clue, reported_valid, created_at, submission_id, local_game_id, game_mode, move_id, cell_index, sport, row_category_id, row_category_label, col_category_id, col_category_label, typed_answer, game_ruling, reported_player, reporter_is_answerer, reporter_says_correct, note) ON public.wrong_answer_reports FROM triage_ro;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO triage_ro;
-- ALTER ROLE triage_ro BYPASSRLS;
-- GRANT EXECUTE ON FUNCTION public.submit_wrong_answer_report(TEXT, TEXT, BOOLEAN, TEXT) TO PUBLIC, anon, authenticated;
-- COMMIT;
