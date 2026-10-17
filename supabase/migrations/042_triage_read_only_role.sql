-- Migration 042: read-only database role for the weekly feedback triage (owner request, 17 Oct 2026).
-- PURE ASCII. No row changes. The weekly job runs with this role only (its launcher removes the write-capable
-- SUPABASE_DB_URL and service key from its environment), so it can read everything it needs and change nothing.
--   triage_ro   NOLOGIN here. Its password is set separately by a local script (stored only in the owner's Windows
--               user environment as TRIAGE_DB_URL; never in a file, a migration or the conversation).
--               SELECT on the public tables (incl. feedback and wrong-answer reports, hence BYPASSRLS: it can read
--               rows that row security hides from the browser roles). No INSERT/UPDATE/DELETE anywhere; every
--               session starts read-only and has a 2-minute statement timeout.
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'triage_ro') THEN RAISE EXCEPTION 'Migration 042 is already applied (role triage_ro exists). Nothing changed.'; END IF;
END $mig$;

CREATE ROLE triage_ro NOLOGIN BYPASSRLS NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
ALTER ROLE triage_ro SET default_transaction_read_only = on;
ALTER ROLE triage_ro SET statement_timeout = '120s';
GRANT USAGE ON SCHEMA public TO triage_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO triage_ro;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM pg_roles WHERE rolname = 'triage_ro')                                                       AS role_exists,
  has_table_privilege('triage_ro', 'public.feedback', 'SELECT')                                                     AS reads_feedback,
  has_table_privilege('triage_ro', 'public.wrong_answer_reports', 'SELECT')                                         AS reads_reports,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE grantee = 'triage_ro' AND privilege_type <> 'SELECT') AS write_grants,
  (SELECT 'default_transaction_read_only=on' = ANY (setconfig) FROM pg_db_role_setting s JOIN pg_roles r ON r.oid = s.setrole WHERE r.rolname = 'triage_ro') AS read_only_sessions,
  (SELECT rolsuper OR rolcreaterole OR rolcreatedb FROM pg_roles WHERE rolname = 'triage_ro')                        AS has_admin_powers;
-- EXPECTED: role_exists = 1; reads_feedback = true; reads_reports = true; write_grants = 0; read_only_sessions = true; has_admin_powers = false

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM triage_ro;
-- REVOKE USAGE ON SCHEMA public FROM triage_ro;
-- DROP ROLE triage_ro;
-- COMMIT;
