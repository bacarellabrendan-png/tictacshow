-- Migration 045: close the legacy answer-recording function (independent review of 044, 17 Oct 2026).
-- PURE ASCII. No row changes.
--   public.record_answer(text,text,text,text,jsonb,text) is the pre-ID-checking version (SECURITY DEFINER; inserts into
--   answer_submissions). Neither the live app nor the next release calls it (they use record_answer_v3), yet anon and
--   authenticated could still call it through the API and add rows (without a player id, so rarity counts ignore them).
--   Revoked from PUBLIC, anon and authenticated; the function itself stays (rollback).
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF NOT has_function_privilege('anon', 'public.record_answer(text,text,text,text,jsonb,text)', 'EXECUTE')
     AND NOT has_function_privilege('authenticated', 'public.record_answer(text,text,text,text,jsonb,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'Migration 045 is already applied (record_answer is closed to anon and authenticated). Nothing changed.'; END IF;
END $mig$;

REVOKE EXECUTE ON FUNCTION public.record_answer(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) FROM PUBLIC, anon, authenticated;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  has_function_privilege('anon', 'public.record_answer(text,text,text,text,jsonb,text)', 'EXECUTE')                    AS anon_can_call_legacy,
  has_function_privilege('authenticated', 'public.record_answer(text,text,text,text,jsonb,text)', 'EXECUTE')           AS players_can_call_legacy,
  has_function_privilege('authenticated', 'public.record_answer_v3(text,text,text,text,jsonb,text,bigint)', 'EXECUTE') AS players_record_answers_v3;
-- EXPECTED: anon_can_call_legacy = false; players_can_call_legacy = false; players_record_answers_v3 = true

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- GRANT EXECUTE ON FUNCTION public.record_answer(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated;
-- COMMIT;
