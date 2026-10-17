-- Migration 039: in-app feedback inbox and self-service account deletion (pre-launch items 4/5 + privacy policy)
-- PURE ASCII. Schema only: creates one table and two functions, relaxes one NOT NULL. No existing row changes, so no
-- backup is needed; the rollback below drops what this creates.
--   feedback            the inbox. Browsers have NO direct access (RLS on, all grants revoked); rows arrive only through
--                       submit_feedback(). Read it in the Supabase dashboard / SQL.
--   submit_feedback()   SECURITY DEFINER, callable signed-in or not. Length limits; simple flood guard (60 rows/10 min
--                       across the site, 5 per signed-in user per 10 min). Records the signed-in user's id and username when there is one.
--   delete_my_account() SECURITY DEFINER, signed-in users only, acts only on auth.uid(). Matches the privacy policy:
--                         * deletes the login (auth.users: email, password hash, username) and its sessions (cascade);
--                         * deletes the user's own unjoined invite games;
--                         * unfinished games end with the opponent as winner;
--                         * all games stay for the opponent, with this player's id cleared and name "Deleted player";
--                         * answers (answer_submissions) and wrong-answer reports stay, unlinked (user id/name cleared),
--                           because anonymous answer counts drive the rarity percentages;
--                         * feedback stays, unlinked (user id, username and contact email cleared).
--   games.player1_id    DROP NOT NULL, so a deleted player's games can stay for the opponent.
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF to_regclass('public.feedback') IS NOT NULL THEN RAISE EXCEPTION 'Migration 039 is already applied (found public.feedback). Nothing changed.'; END IF;
END $mig$;

CREATE TABLE public.feedback (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id       UUID,
  username      TEXT,
  message       TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  contact_email TEXT CHECK (contact_email IS NULL OR char_length(contact_email) <= 320),
  screen        TEXT CHECK (screen IS NULL OR char_length(screen) <= 40),
  user_agent    TEXT CHECK (user_agent IS NULL OR char_length(user_agent) <= 400)
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.feedback FROM anon, authenticated;

CREATE FUNCTION public.submit_feedback(p_message TEXT, p_contact TEXT DEFAULT NULL, p_screen TEXT DEFAULT NULL, p_user_agent TEXT DEFAULT NULL)
RETURNS BIGINT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
DECLARE
  uid UUID := auth.uid();
  msg TEXT := btrim(coalesce(p_message, ''));
  new_id BIGINT;
BEGIN
  IF char_length(msg) = 0 THEN RAISE EXCEPTION 'empty feedback'; END IF;
  IF char_length(msg) > 4000 THEN RAISE EXCEPTION 'feedback too long (4000 characters max)'; END IF;
  IF uid IS NOT NULL AND (SELECT count(*) FROM public.feedback WHERE user_id = uid AND created_at > now() - interval '10 minutes') >= 5 THEN
    RAISE EXCEPTION 'too much feedback right now, please try again in a few minutes';
  END IF;
  IF (SELECT count(*) FROM public.feedback WHERE created_at > now() - interval '10 minutes') >= 60 THEN
    RAISE EXCEPTION 'too much feedback right now, please try again in a few minutes';
  END IF;
  INSERT INTO public.feedback (user_id, username, message, contact_email, screen, user_agent)
  VALUES (uid,
          (SELECT u.raw_user_meta_data->>'username' FROM auth.users u WHERE u.id = uid),
          msg,
          nullif(left(btrim(coalesce(p_contact, '')), 320), ''),
          left(p_screen, 40),
          left(p_user_agent, 400))
  RETURNING id INTO new_id;
  RETURN new_id;
END $fn$;
REVOKE ALL ON FUNCTION public.submit_feedback(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_feedback(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

ALTER TABLE public.games ALTER COLUMN player1_id DROP NOT NULL;

CREATE FUNCTION public.delete_my_account()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
DECLARE
  uid UUID := auth.uid();
  n_waiting BIGINT; n_forfeit BIGINT; n_p1 BIGINT; n_p2 BIGINT; n_answers BIGINT; n_reports BIGINT; n_feedback BIGINT; n_user BIGINT;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  DELETE FROM public.moves WHERE game_id IN (SELECT id FROM public.games WHERE player1_id = uid AND player2_id IS NULL AND phase = 'waiting');
  DELETE FROM public.games WHERE player1_id = uid AND player2_id IS NULL AND phase = 'waiting';
  GET DIAGNOSTICS n_waiting = ROW_COUNT;
  -- unfinished games end, and the opponent is recorded as the winner (they can't continue against a deleted player)
  UPDATE public.games SET phase = 'gameover', active_cell = NULL, updated_at = now(),
         winner = CASE WHEN player1_id = uid THEN 'p2' ELSE 'p1' END
   WHERE (player1_id = uid OR player2_id = uid) AND phase NOT IN ('gameover', 'waiting');
  GET DIAGNOSTICS n_forfeit = ROW_COUNT;
  UPDATE public.games SET player1_id = NULL, player1_name = 'Deleted player' WHERE player1_id = uid;
  GET DIAGNOSTICS n_p1 = ROW_COUNT;
  UPDATE public.games SET player2_id = NULL, player2_name = 'Deleted player' WHERE player2_id = uid;
  GET DIAGNOSTICS n_p2 = ROW_COUNT;
  UPDATE public.answer_submissions SET user_id = NULL WHERE user_id = uid;
  GET DIAGNOSTICS n_answers = ROW_COUNT;
  UPDATE public.wrong_answer_reports SET reporter_id = NULL, reporter_name = NULL WHERE reporter_id = uid;
  GET DIAGNOSTICS n_reports = ROW_COUNT;
  UPDATE public.feedback SET user_id = NULL, username = NULL, contact_email = NULL WHERE user_id = uid;
  GET DIAGNOSTICS n_feedback = ROW_COUNT;
  DELETE FROM auth.users WHERE id = uid;
  GET DIAGNOSTICS n_user = ROW_COUNT;
  RETURN jsonb_build_object('deleted_user', n_user, 'deleted_invites', n_waiting, 'games_forfeited', n_forfeit, 'games_kept_anonymized', n_p1 + n_p2,
                            'answers_unlinked', n_answers, 'reports_unlinked', n_reports, 'feedback_unlinked', n_feedback);
END $fn$;
REVOKE ALL ON FUNCTION public.delete_my_account() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_my_account() FROM anon;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.feedback'::regclass)                              AS feedback_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_schema = 'public' AND table_name = 'feedback' AND grantee IN ('anon', 'authenticated')) AS feedback_browser_grants,
  (SELECT count(*) FROM public.feedback)                                                                     AS feedback_rows,
  (SELECT bool_and(prosecdef) FROM pg_proc WHERE oid IN ('public.submit_feedback(text,text,text,text)'::regprocedure, 'public.delete_my_account()'::regprocedure)) AS both_security_definer,
  has_function_privilege('anon', 'public.submit_feedback(text,text,text,text)', 'EXECUTE')                   AS anon_can_send_feedback,
  has_function_privilege('anon', 'public.delete_my_account()', 'EXECUTE')                                    AS anon_can_delete,
  has_function_privilege('authenticated', 'public.delete_my_account()', 'EXECUTE')                           AS user_can_delete,
  (SELECT is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'games' AND column_name = 'player1_id') AS player1_id_nullable;
-- EXPECTED: feedback_rls = true; feedback_browser_grants = 0; feedback_rows = 0; both_security_definer = true; anon_can_send_feedback = true; anon_can_delete = false; user_can_delete = true; player1_id_nullable = YES

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DROP FUNCTION public.delete_my_account();
-- DROP FUNCTION public.submit_feedback(TEXT, TEXT, TEXT, TEXT);
-- DROP TABLE public.feedback;
-- ALTER TABLE public.games ALTER COLUMN player1_id SET NOT NULL;  -- fails if a deleted player's game has player1_id NULL
-- COMMIT;
