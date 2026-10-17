-- Migration 041: game integrity (security issue 2). Players can only make legitimate moves in their own games.
-- PURE ASCII. Schema only (triggers, functions, policies, grants); no row changes, so no backup is needed.
-- Before: any signed-in user could rewrite any waiting game (no WITH CHECK), players could write any value into their
--   own games and moves (board, scores, winner, the opponent's answer, "valid"), and anon/authenticated even held
--   TRUNCATE/DELETE on games and moves (TRUNCATE bypasses row security).
-- After (enforced in the database for browser roles; server-side functions such as delete_my_account are exempt):
--   games INSERT  only your own game, starting empty and waiting for an opponent.
--   games UPDATE  waiting game: only joining it (you become player 2, phase -> choosing, nothing else changes).
--                 in play, only the two players, and only these steps:
--                   pick     the player whose turn it is picks an open square, a "reset" square included
--                            (phase choosing -> answering);
--                   retry    both named the same player (the move's answers already cleared): phase -> retry only;
--                   resolve  the active square goes to the move's result (p1/p2/reset), that player's score +1,
--                            the other player picks next, and winner/draw/phase follow from the board;
--                   cleanup  a "reset" square reopens ("reset" -> "null"), nothing else changes.
--                 finished games can't change. Ids, players, board categories and invite code never change.
--   moves INSERT  only by the player whose turn it is, on an open square, for that square's question.
--   moves UPDATE  answering: you fill in only your own answer, and it must match the server's ruling for it
--                   (answer_submissions row written by record_answer_v3: your user, this game/move/role, this
--                   question, same valid flag and player);
--                 resolving: the result must follow from the two rulings and rarities (one valid -> that player;
--                   both valid -> lower rarity, either side when within 0.002 (the app flips a coin under 0.001;
--                   rarities are stored as real); neither -> reset);
--                 same player: both answers cleared for a retry.
--   Grants: anon/authenticated lose TRUNCATE, DELETE, REFERENCES and TRIGGER on games and moves; anon loses UPDATE
--   on games (the UPDATE policy is now for signed-in users only).
-- Not covered (reported to the owner; on the pre-public-launch list): a player who crafts API calls can still get a
--   wrong answer ruled valid, because record_answer_v3 takes the square's rules from the browser (and the host writes
--   the game's cells, rules included) and allows repeated attempts per move; and the resolver supplies the rarity
--   numbers. Fix planned: category rules stored in the database, rulings and rarity decided by the server, one
--   attempt per move.
-- 0. GUARD first.

BEGIN;

DO $mig$
BEGIN
  IF to_regprocedure('public.games_guard()') IS NOT NULL THEN RAISE EXCEPTION 'Migration 041 is already applied (found public.games_guard()). Nothing changed.'; END IF;
END $mig$;

-- Board helpers (pure)
CREATE FUNCTION public.ttt_cell(p_board JSONB, p_i INT) RETURNS TEXT
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $fn$ SELECT coalesce(p_board->>p_i, 'null') $fn$;

CREATE FUNCTION public.ttt_has_line(p_board JSONB, p_role TEXT) RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $fn$
  SELECT EXISTS (SELECT 1 FROM (VALUES (0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)) AS l(a, b, c)
                  WHERE public.ttt_cell(p_board, l.a) = p_role AND public.ttt_cell(p_board, l.b) = p_role AND public.ttt_cell(p_board, l.c) = p_role)
$fn$;

-- Lookups the triggers need from tables browsers can't read (SECURITY DEFINER, signed-in users only)
CREATE FUNCTION public.answer_matches_submission(p_sub BIGINT, p_game UUID, p_move UUID, p_role TEXT, p_qkey TEXT, p_valid BOOLEAN, p_pid BIGINT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
  SELECT EXISTS (SELECT 1 FROM public.answer_submissions s
                  WHERE s.id = p_sub AND s.user_id = auth.uid()
                    AND s.submission_key = p_game::text || ':' || p_move::text || ':' || p_role
                    AND s.question_key = p_qkey
                    AND s.valid IS NOT DISTINCT FROM p_valid AND s.player_id IS NOT DISTINCT FROM p_pid)
$fn$;
REVOKE ALL ON FUNCTION public.answer_matches_submission(BIGINT, UUID, UUID, TEXT, TEXT, BOOLEAN, BIGINT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.answer_matches_submission(BIGINT, UUID, UUID, TEXT, TEXT, BOOLEAN, BIGINT) TO authenticated;

CREATE FUNCTION public.latest_move_result(p_game UUID, p_cell INT) RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
  SELECT m.result FROM public.moves m WHERE m.game_id = p_game AND m.cell_index = p_cell ORDER BY m.created_at DESC, m.id DESC LIMIT 1
$fn$;
REVOKE ALL ON FUNCTION public.latest_move_result(UUID, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.latest_move_result(UUID, INT) TO authenticated;

CREATE FUNCTION public.latest_move_cleared(p_game UUID, p_cell INT) RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $fn$
  SELECT coalesce((SELECT m.p1_answer IS NULL AND m.p2_answer IS NULL AND m.result IS NULL FROM public.moves m
                    WHERE m.game_id = p_game AND m.cell_index = p_cell ORDER BY m.created_at DESC, m.id DESC LIMIT 1), false)
$fn$;
REVOKE ALL ON FUNCTION public.latest_move_cleared(UUID, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.latest_move_cleared(UUID, INT) TO authenticated;

-- games: the guard (SECURITY INVOKER, so current_user tells browser roles from server-side functions)
CREATE FUNCTION public.games_guard() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public, pg_temp AS $fn$
DECLARE
  uid UUID := auth.uid();
  r TEXT; v TEXT; i INT; changed INT := 0; won BOOLEAN; full_board BOOLEAN;
  o_p1 INT; o_p2 INT; n_p1 INT; n_p2 INT;
BEGIN
  IF current_user NOT IN ('anon', 'authenticated') THEN RETURN NEW; END IF;

  IF TG_OP = 'INSERT' THEN
    IF uid IS NULL OR NEW.player1_id IS DISTINCT FROM uid THEN RAISE EXCEPTION 'games: you can only create your own game' USING ERRCODE = '42501'; END IF;
    IF NEW.phase IS DISTINCT FROM 'waiting' OR NEW.player2_id IS NOT NULL OR NEW.winner IS NOT NULL OR NEW.active_cell IS NOT NULL
       OR NEW.choosing_player IS NULL OR NEW.choosing_player NOT IN ('p1', 'p2')
       OR NEW.player1_name IS NULL OR char_length(NEW.player1_name) > 60
       OR jsonb_typeof(NEW.cells) IS DISTINCT FROM 'array' OR jsonb_array_length(NEW.cells) <> 9
       OR jsonb_typeof(NEW.board) IS DISTINCT FROM 'array' OR jsonb_array_length(NEW.board) <> 9
       OR coalesce((NEW.scores->>'p1')::int, 0) <> 0 OR coalesce((NEW.scores->>'p2')::int, 0) <> 0
       OR coalesce(NEW.win_line, '[]'::jsonb) <> '[]'::jsonb
    THEN RAISE EXCEPTION 'games: a new game must start empty and wait for an opponent' USING ERRCODE = '42501'; END IF;
    FOR i IN 0..8 LOOP
      IF public.ttt_cell(NEW.board, i) <> 'null' THEN RAISE EXCEPTION 'games: a new game must start with an empty board' USING ERRCODE = '42501'; END IF;
    END LOOP;
    RETURN NEW;
  END IF;

  -- UPDATE
  IF NEW.id IS DISTINCT FROM OLD.id OR NEW.invite_code IS DISTINCT FROM OLD.invite_code OR NEW.difficulty IS DISTINCT FROM OLD.difficulty
     OR NEW.cells IS DISTINCT FROM OLD.cells OR NEW.sport IS DISTINCT FROM OLD.sport OR NEW.created_at IS DISTINCT FROM OLD.created_at
     OR NEW.player1_id IS DISTINCT FROM OLD.player1_id OR NEW.player1_name IS DISTINCT FROM OLD.player1_name
  THEN RAISE EXCEPTION 'games: the game''s players, categories and code can''t change' USING ERRCODE = '42501'; END IF;
  IF OLD.phase = 'gameover' THEN RAISE EXCEPTION 'games: a finished game can''t change' USING ERRCODE = '42501'; END IF;

  IF OLD.phase = 'waiting' THEN
    IF uid IS NULL OR uid = OLD.player1_id OR OLD.player2_id IS NOT NULL OR NEW.player2_id IS DISTINCT FROM uid
       OR NEW.phase IS DISTINCT FROM 'choosing' OR NEW.player2_name IS NULL OR char_length(NEW.player2_name) > 60
       OR NEW.board IS DISTINCT FROM OLD.board OR NEW.scores IS DISTINCT FROM OLD.scores OR NEW.active_cell IS DISTINCT FROM OLD.active_cell
       OR NEW.choosing_player IS DISTINCT FROM OLD.choosing_player OR NEW.winner IS DISTINCT FROM OLD.winner
       OR NEW.win_line IS DISTINCT FROM OLD.win_line
    THEN RAISE EXCEPTION 'games: a waiting game can only be joined' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  IF NEW.player2_id IS DISTINCT FROM OLD.player2_id OR NEW.player2_name IS DISTINCT FROM OLD.player2_name
  THEN RAISE EXCEPTION 'games: the game''s players can''t change' USING ERRCODE = '42501'; END IF;
  IF uid IS NOT NULL AND uid = OLD.player1_id THEN r := 'p1';
  ELSIF uid IS NOT NULL AND uid = OLD.player2_id THEN r := 'p2';
  ELSE RAISE EXCEPTION 'games: not your game' USING ERRCODE = '42501'; END IF;
  IF jsonb_typeof(NEW.board) IS DISTINCT FROM 'array' OR jsonb_array_length(NEW.board) <> 9
  THEN RAISE EXCEPTION 'games: the board must have 9 squares' USING ERRCODE = '42501'; END IF;
  FOR i IN 0..8 LOOP
    IF public.ttt_cell(NEW.board, i) <> public.ttt_cell(OLD.board, i) THEN changed := changed + 1; END IF;
  END LOOP;
  o_p1 := coalesce((OLD.scores->>'p1')::int, 0); o_p2 := coalesce((OLD.scores->>'p2')::int, 0);
  n_p1 := coalesce((NEW.scores->>'p1')::int, 0); n_p2 := coalesce((NEW.scores->>'p2')::int, 0);

  -- pick: the player whose turn it is picks an open square
  IF OLD.phase = 'choosing' AND NEW.phase = 'answering' THEN
    IF OLD.choosing_player IS DISTINCT FROM r THEN RAISE EXCEPTION 'games: it''s not your turn to pick' USING ERRCODE = '42501'; END IF;
    IF NEW.active_cell IS NULL OR NEW.active_cell NOT BETWEEN 0 AND 8 OR public.ttt_cell(OLD.board, NEW.active_cell) NOT IN ('null', 'reset')
    THEN RAISE EXCEPTION 'games: pick an open square' USING ERRCODE = '42501'; END IF;
    IF changed > 0 OR n_p1 <> o_p1 OR n_p2 <> o_p2 OR NEW.choosing_player IS DISTINCT FROM OLD.choosing_player
       OR NEW.winner IS DISTINCT FROM OLD.winner OR NEW.win_line IS DISTINCT FROM OLD.win_line
    THEN RAISE EXCEPTION 'games: picking a square changes nothing else' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  -- retry: both named the same player
  IF OLD.phase IN ('answering', 'retry') AND NEW.phase = 'retry' THEN
    IF changed > 0 OR NEW.active_cell IS DISTINCT FROM OLD.active_cell OR n_p1 <> o_p1 OR n_p2 <> o_p2
       OR NEW.choosing_player IS DISTINCT FROM OLD.choosing_player OR NEW.winner IS DISTINCT FROM OLD.winner
       OR NEW.win_line IS DISTINCT FROM OLD.win_line
    THEN RAISE EXCEPTION 'games: a retry changes nothing else' USING ERRCODE = '42501'; END IF;
    IF NOT public.latest_move_cleared(OLD.id, OLD.active_cell)
    THEN RAISE EXCEPTION 'games: a retry needs the move''s answers cleared first' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  -- resolve: the active square goes to the move's result
  IF OLD.phase IN ('answering', 'retry') AND NEW.phase IN ('choosing', 'gameover') THEN
    IF OLD.active_cell IS NULL THEN RAISE EXCEPTION 'games: no square is being answered' USING ERRCODE = '42501'; END IF;
    v := public.ttt_cell(NEW.board, OLD.active_cell);
    -- exactly the active square changes (no change at all when a still-"reset" square comes out "reset" again)
    IF changed <> (CASE WHEN public.ttt_cell(OLD.board, OLD.active_cell) = v THEN 0 ELSE 1 END)
       OR public.ttt_cell(OLD.board, OLD.active_cell) NOT IN ('null', 'reset') OR v NOT IN ('p1', 'p2', 'reset')
    THEN RAISE EXCEPTION 'games: only the square being answered can change' USING ERRCODE = '42501'; END IF;
    IF v IS DISTINCT FROM public.latest_move_result(OLD.id, OLD.active_cell)
    THEN RAISE EXCEPTION 'games: the square must go to the result of its move' USING ERRCODE = '42501'; END IF;
    IF n_p1 <> o_p1 + (v = 'p1')::int OR n_p2 <> o_p2 + (v = 'p2')::int
    THEN RAISE EXCEPTION 'games: the winner of the square gets exactly one point' USING ERRCODE = '42501'; END IF;
    IF NEW.active_cell IS NOT NULL OR NEW.choosing_player IS DISTINCT FROM (CASE OLD.choosing_player WHEN 'p1' THEN 'p2' ELSE 'p1' END)
    THEN RAISE EXCEPTION 'games: after a square, the other player picks' USING ERRCODE = '42501'; END IF;
    won := v IN ('p1', 'p2') AND public.ttt_has_line(NEW.board, v);
    full_board := NOT EXISTS (SELECT 1 FROM generate_series(0, 8) AS g(k) WHERE public.ttt_cell(NEW.board, g.k) NOT IN ('p1', 'p2'));
    IF won THEN
      IF NEW.phase <> 'gameover' OR NEW.winner IS DISTINCT FROM v OR jsonb_typeof(NEW.win_line) IS DISTINCT FROM 'array'
         OR jsonb_array_length(NEW.win_line) <> 3
         OR EXISTS (SELECT 1 FROM jsonb_array_elements_text(NEW.win_line) AS w(x) WHERE w.x !~ '^[0-8]$' OR public.ttt_cell(NEW.board, w.x::int) <> v)
      THEN RAISE EXCEPTION 'games: three in a row ends the game for that player' USING ERRCODE = '42501'; END IF;
    ELSIF full_board THEN
      IF NEW.phase <> 'gameover' OR NEW.winner IS DISTINCT FROM 'draw' OR coalesce(NEW.win_line, '[]'::jsonb) <> '[]'::jsonb
      THEN RAISE EXCEPTION 'games: a full board with no line is a draw' USING ERRCODE = '42501'; END IF;
    ELSE
      IF NEW.phase <> 'choosing' OR NEW.winner IS NOT NULL OR coalesce(NEW.win_line, '[]'::jsonb) <> '[]'::jsonb
      THEN RAISE EXCEPTION 'games: the game goes on until three in a row or a full board' USING ERRCODE = '42501'; END IF;
    END IF;
    RETURN NEW;
  END IF;

  -- cleanup: a "reset" square reopens
  IF NEW.phase = OLD.phase AND changed = 1 THEN
    IF NOT EXISTS (SELECT 1 FROM generate_series(0, 8) AS g(k)
                    WHERE public.ttt_cell(OLD.board, g.k) = 'reset' AND public.ttt_cell(NEW.board, g.k) = 'null')
       OR NEW.active_cell IS DISTINCT FROM OLD.active_cell OR n_p1 <> o_p1 OR n_p2 <> o_p2
       OR NEW.choosing_player IS DISTINCT FROM OLD.choosing_player OR NEW.winner IS DISTINCT FROM OLD.winner
       OR NEW.win_line IS DISTINCT FROM OLD.win_line
    THEN RAISE EXCEPTION 'games: only a reset square can reopen' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  -- nothing changed
  IF changed = 0 AND NEW.phase IS NOT DISTINCT FROM OLD.phase AND NEW.active_cell IS NOT DISTINCT FROM OLD.active_cell
     AND n_p1 = o_p1 AND n_p2 = o_p2 AND NEW.choosing_player IS NOT DISTINCT FROM OLD.choosing_player
     AND NEW.winner IS NOT DISTINCT FROM OLD.winner AND NEW.win_line IS NOT DISTINCT FROM OLD.win_line
  THEN RETURN NEW; END IF;

  RAISE EXCEPTION 'games: that change isn''t a legal move' USING ERRCODE = '42501';
END $fn$;

-- moves: the guard
CREATE FUNCTION public.moves_guard() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public, pg_temp AS $fn$
DECLARE
  uid UUID := auth.uid();
  g public.games%ROWTYPE; r TEXT; other TEXT; o JSONB; n JSONB;
  v1 BOOLEAN; v2 BOOLEAN; expect TEXT;
BEGIN
  IF current_user NOT IN ('anon', 'authenticated') THEN RETURN NEW; END IF;
  SELECT * INTO g FROM public.games WHERE id = NEW.game_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'moves: no such game' USING ERRCODE = '42501'; END IF;
  IF uid IS NOT NULL AND uid = g.player1_id THEN r := 'p1'; other := 'p2';
  ELSIF uid IS NOT NULL AND uid = g.player2_id THEN r := 'p2'; other := 'p1';
  ELSE RAISE EXCEPTION 'moves: not your game' USING ERRCODE = '42501'; END IF;

  IF TG_OP = 'INSERT' THEN
    IF g.phase IS DISTINCT FROM 'choosing' OR g.choosing_player IS DISTINCT FROM r THEN RAISE EXCEPTION 'moves: it''s not your turn to pick' USING ERRCODE = '42501'; END IF;
    IF NEW.cell_index NOT BETWEEN 0 AND 8 OR public.ttt_cell(g.board, NEW.cell_index) NOT IN ('null', 'reset') THEN RAISE EXCEPTION 'moves: pick an open square' USING ERRCODE = '42501'; END IF;
    IF NEW.question_key IS DISTINCT FROM (g.cells->NEW.cell_index->>'rowCat') || '__' || (g.cells->NEW.cell_index->>'colCat')
    THEN RAISE EXCEPTION 'moves: the question must be that square''s' USING ERRCODE = '42501'; END IF;
    IF NEW.p1_answer IS NOT NULL OR NEW.p2_answer IS NOT NULL OR NEW.p1_valid IS NOT NULL OR NEW.p2_valid IS NOT NULL
       OR NEW.p1_rarity IS NOT NULL OR NEW.p2_rarity IS NOT NULL OR NEW.result IS NOT NULL
       OR NEW.p1_submission_id IS NOT NULL OR NEW.p2_submission_id IS NOT NULL OR NEW.p1_player_id IS NOT NULL OR NEW.p2_player_id IS NOT NULL
    THEN RAISE EXCEPTION 'moves: a new move starts with no answers' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  -- UPDATE
  IF NEW.id IS DISTINCT FROM OLD.id OR NEW.game_id IS DISTINCT FROM OLD.game_id OR NEW.cell_index IS DISTINCT FROM OLD.cell_index
     OR NEW.question_key IS DISTINCT FROM OLD.question_key OR NEW.created_at IS DISTINCT FROM OLD.created_at
  THEN RAISE EXCEPTION 'moves: a move''s square and question can''t change' USING ERRCODE = '42501'; END IF;
  o := to_jsonb(OLD); n := to_jsonb(NEW);
  IF o = n THEN RETURN NEW; END IF;
  IF g.phase NOT IN ('answering', 'retry') OR g.active_cell IS DISTINCT FROM NEW.cell_index
  THEN RAISE EXCEPTION 'moves: answers only while this square is being answered' USING ERRCODE = '42501'; END IF;

  -- answering: only your own answer, matching the server's ruling
  IF o->>(r || '_answer') IS NULL AND n->>(r || '_answer') IS NOT NULL THEN
    IF n->(other || '_answer') IS DISTINCT FROM o->(other || '_answer') OR n->(other || '_valid') IS DISTINCT FROM o->(other || '_valid')
       OR n->(other || '_rarity') IS DISTINCT FROM o->(other || '_rarity') OR n->(other || '_submission_id') IS DISTINCT FROM o->(other || '_submission_id')
       OR n->(other || '_player_id') IS DISTINCT FROM o->(other || '_player_id') OR n->'result' IS DISTINCT FROM o->'result'
       OR n->>(r || '_rarity') IS NOT NULL
    THEN RAISE EXCEPTION 'moves: you can only fill in your own answer' USING ERRCODE = '42501'; END IF;
    IF NOT public.answer_matches_submission((n->>(r || '_submission_id'))::bigint, NEW.game_id, NEW.id, r, NEW.question_key,
                                            (n->>(r || '_valid'))::boolean, (n->>(r || '_player_id'))::bigint)
    THEN RAISE EXCEPTION 'moves: the answer must match the server''s ruling' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  v1 := coalesce(OLD.p1_valid, false); v2 := coalesce(OLD.p2_valid, false);

  -- same player named twice: both answers cleared for a retry
  IF v1 AND v2 AND OLD.p1_player_id IS NOT NULL AND OLD.p1_player_id = OLD.p2_player_id AND OLD.result IS NULL THEN
    IF NEW.p1_answer IS NOT NULL OR NEW.p2_answer IS NOT NULL OR NEW.p1_valid IS NOT NULL OR NEW.p2_valid IS NOT NULL
       OR NEW.p1_rarity IS NOT NULL OR NEW.p2_rarity IS NOT NULL OR NEW.result IS NOT NULL
       OR NEW.p1_submission_id IS NOT NULL OR NEW.p2_submission_id IS NOT NULL OR NEW.p1_player_id IS NOT NULL OR NEW.p2_player_id IS NOT NULL
    THEN RAISE EXCEPTION 'moves: the same player named twice is replayed' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  -- resolving: the result follows from the rulings and rarities
  IF OLD.p1_answer IS NOT NULL AND OLD.p2_answer IS NOT NULL AND OLD.result IS NULL AND NEW.result IS NOT NULL THEN
    IF NEW.p1_answer IS DISTINCT FROM OLD.p1_answer OR NEW.p2_answer IS DISTINCT FROM OLD.p2_answer
       OR NEW.p1_valid IS DISTINCT FROM OLD.p1_valid OR NEW.p2_valid IS DISTINCT FROM OLD.p2_valid
       OR NEW.p1_submission_id IS DISTINCT FROM OLD.p1_submission_id OR NEW.p2_submission_id IS DISTINCT FROM OLD.p2_submission_id
       OR NEW.p1_player_id IS DISTINCT FROM OLD.p1_player_id OR NEW.p2_player_id IS DISTINCT FROM OLD.p2_player_id
    THEN RAISE EXCEPTION 'moves: resolving can''t change the answers' USING ERRCODE = '42501'; END IF;
    IF (NEW.p1_rarity IS NOT NULL AND NOT v1) OR (NEW.p2_rarity IS NOT NULL AND NOT v2)
       OR (v1 AND (NEW.p1_rarity IS NULL OR NEW.p1_rarity < 0 OR NEW.p1_rarity > 100))
       OR (v2 AND (NEW.p2_rarity IS NULL OR NEW.p2_rarity < 0 OR NEW.p2_rarity > 100))
    THEN RAISE EXCEPTION 'moves: rarities go with valid answers only' USING ERRCODE = '42501'; END IF;
    IF NOT v1 AND NOT v2 THEN expect := 'reset';
    ELSIF v1 AND NOT v2 THEN expect := 'p1';
    ELSIF v2 AND NOT v1 THEN expect := 'p2';
    -- the app flips a coin under 0.001; rarities are stored as real, so allow either side up to 0.002
    ELSIF abs(NEW.p1_rarity - NEW.p2_rarity) < 0.002 THEN expect := NULL;
    ELSIF NEW.p1_rarity < NEW.p2_rarity THEN expect := 'p1';
    ELSE expect := 'p2'; END IF;
    IF (expect IS NULL AND NEW.result NOT IN ('p1', 'p2')) OR (expect IS NOT NULL AND NEW.result IS DISTINCT FROM expect)
    THEN RAISE EXCEPTION 'moves: the result must follow from the answers' USING ERRCODE = '42501'; END IF;
    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'moves: that change isn''t allowed' USING ERRCODE = '42501';
END $fn$;

CREATE TRIGGER games_guard BEFORE INSERT OR UPDATE ON public.games FOR EACH ROW EXECUTE FUNCTION public.games_guard();
CREATE TRIGGER moves_guard BEFORE INSERT OR UPDATE ON public.moves FOR EACH ROW EXECUTE FUNCTION public.moves_guard();

-- One UPDATE policy for games: signed-in players of the game, or anyone signed in joining a waiting game
DROP POLICY "Players can update their own games" ON public.games;
DROP POLICY games_update ON public.games;
CREATE POLICY games_update_players ON public.games FOR UPDATE TO authenticated
  USING (auth.uid() = player1_id OR auth.uid() = player2_id OR (phase = 'waiting' AND player2_id IS NULL))
  WITH CHECK (auth.uid() = player1_id OR auth.uid() = player2_id);

REVOKE TRUNCATE, DELETE, REFERENCES, TRIGGER ON public.games, public.moves FROM anon, authenticated;
REVOKE UPDATE ON public.games FROM anon;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM pg_trigger WHERE tgname IN ('games_guard', 'moves_guard') AND NOT tgisinternal)                   AS guard_triggers,
  (SELECT count(*) FROM pg_policies WHERE tablename = 'games' AND cmd = 'UPDATE')                                         AS games_update_policies,
  (SELECT count(*) FROM pg_policies WHERE tablename = 'games' AND cmd = 'UPDATE' AND with_check IS NOT NULL)              AS with_check_policies,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_schema = 'public' AND table_name IN ('games', 'moves')
      AND grantee IN ('anon', 'authenticated') AND privilege_type IN ('TRUNCATE', 'DELETE', 'REFERENCES', 'TRIGGER'))      AS risky_grants,
  has_table_privilege('anon', 'public.games', 'UPDATE')                                                                   AS anon_can_update_games,
  has_function_privilege('anon', 'public.answer_matches_submission(bigint,uuid,uuid,text,text,boolean,bigint)', 'EXECUTE') AS anon_can_probe_answers,
  has_function_privilege('authenticated', 'public.latest_move_result(uuid,integer)', 'EXECUTE')                           AS players_can_read_results;
-- EXPECTED: guard_triggers = 2; games_update_policies = 1; with_check_policies = 1; risky_grants = 0; anon_can_update_games = false; anon_can_probe_answers = false; players_can_read_results = true

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- BEGIN;
-- DROP TRIGGER games_guard ON public.games;
-- DROP TRIGGER moves_guard ON public.moves;
-- DROP FUNCTION public.games_guard();
-- DROP FUNCTION public.moves_guard();
-- DROP FUNCTION public.answer_matches_submission(BIGINT, UUID, UUID, TEXT, TEXT, BOOLEAN, BIGINT);
-- DROP FUNCTION public.latest_move_result(UUID, INT);
-- DROP FUNCTION public.latest_move_cleared(UUID, INT);
-- DROP FUNCTION public.ttt_has_line(JSONB, TEXT);
-- DROP FUNCTION public.ttt_cell(JSONB, INT);
-- DROP POLICY games_update_players ON public.games;
-- CREATE POLICY "Players can update their own games" ON public.games FOR UPDATE USING ((auth.uid() = player1_id) OR (auth.uid() = player2_id));
-- CREATE POLICY games_update ON public.games FOR UPDATE USING ((auth.uid() = player1_id) OR (auth.uid() = player2_id) OR ((phase = 'waiting') AND (player2_id IS NULL) AND (auth.uid() IS NOT NULL)));
-- GRANT TRUNCATE, DELETE, REFERENCES, TRIGGER ON public.games, public.moves TO anon, authenticated;
-- GRANT UPDATE ON public.games TO anon;
-- COMMIT;
