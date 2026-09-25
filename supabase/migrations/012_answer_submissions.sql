-- Migration 012: answer_submissions log, record_answer v2, get_square_counts,
--                report-button columns linked to answer_submissions
-- Run in Supabase SQL Editor. Steps 0–6 run as one transaction.
--
-- 1. answer_submissions: one row per HUMAN answer (valid or rejected), with the
--    typed text, canonical player, game/move/role. Replaces answer_stats as the
--    source of real submission counts (answer_stats stays as the archived seed).
--    Counted once: UNIQUE (submission_key, answer_key), where
--      submission_key = "<game id>:<move id>:<p1|p2>"  (multiplayer uuids, or the
--                       CPU game's local "cpu-…" / "move-…" ids)
--      answer_key     = canonical player name (valid) or "typed:<normalized>" (rejected)
--    A retry on the same move counts only if the player names someone different.
--    Calls without a well-formed submission_key are rejected, never counted.
-- 2. record_answer(...) v2 replaces the 4-argument v1 (which wrote answer_stats).
-- 3. get_square_counts(question_key): aggregate valid counts only; no user data.
-- 4. wrong_answer_reports: new columns + submit_wrong_answer_report_v2(); reports
--    link to answer_submissions.id. Anonymous direct INSERT is removed.
-- 5. moves.p1_rarity / p2_rarity become REAL so the resolver can store the
--    blended rarity % that decided the square.

BEGIN;

-- ─── 0. BACKUPS (RLS on, no browser access) ──────────────────────────────────
CREATE TABLE backup_20260925_wrong_answer_reports AS SELECT * FROM wrong_answer_reports;
ALTER TABLE backup_20260925_wrong_answer_reports ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925_wrong_answer_reports FROM anon, authenticated;

CREATE TABLE backup_20260925_moves AS SELECT * FROM moves;
ALTER TABLE backup_20260925_moves ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925_moves FROM anon, authenticated;

-- ─── 1. ANSWER_SUBMISSIONS ───────────────────────────────────────────────────
CREATE TABLE answer_submissions (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  submission_key  TEXT    NOT NULL,
  answer_key      TEXT    NOT NULL,
  game_mode       TEXT    NOT NULL CHECK (game_mode IN ('multiplayer', 'cpu')),
  game_id         UUID,                 -- multiplayer games
  local_game_id   TEXT,                 -- CPU games ("cpu-…")
  move_id         TEXT    NOT NULL,
  role            TEXT    NOT NULL CHECK (role IN ('p1', 'p2')),
  user_id         UUID,                 -- auth.uid(); NULL when signed out
  question_key    TEXT    NOT NULL,
  sport           TEXT    NOT NULL,
  row_category_id TEXT    NOT NULL,
  col_category_id TEXT    NOT NULL,
  typed_text      TEXT    NOT NULL,
  valid           BOOLEAN NOT NULL,
  player_name     TEXT,                 -- canonical player_facts spelling; NULL if rejected
  CONSTRAINT answer_submissions_once UNIQUE (submission_key, answer_key),
  CONSTRAINT answer_submissions_valid_has_player CHECK (valid = (player_name IS NOT NULL))
);
CREATE INDEX answer_submissions_square ON answer_submissions (question_key) WHERE valid;
CREATE INDEX answer_submissions_rejected ON answer_submissions (created_at) WHERE NOT valid;
ALTER TABLE answer_submissions ENABLE ROW LEVEL SECURITY;   -- no policies: functions + service role only
REVOKE ALL ON answer_submissions FROM anon, authenticated;

-- ─── 2. RECORD_ANSWER v2 ─────────────────────────────────────────────────────
DROP FUNCTION IF EXISTS record_answer(TEXT, TEXT, JSONB, TEXT);

CREATE FUNCTION record_answer(
  p_submission_key TEXT,
  p_game_mode      TEXT,
  p_question_key   TEXT,
  p_sport          TEXT,
  p_rules          JSONB,
  p_answer         TEXT
)
RETURNS JSONB   -- {"id", "valid", "player_name", "duplicate"} or NULL if refused
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_game  TEXT;
  v_move  TEXT;
  v_role  TEXT;
  v_typed TEXT := btrim(coalesce(p_answer, ''));
  v_valid BOOLEAN;
  v_name  TEXT;
  v_key   TEXT;
  v_id    BIGINT;
BEGIN
  -- Refuse anything malformed; nothing is written.
  IF p_submission_key IS NULL
     OR p_submission_key !~ '^[A-Za-z0-9-]{1,64}:[A-Za-z0-9-]{1,64}:(p1|p2)$' THEN RETURN NULL; END IF;
  IF p_game_mode NOT IN ('multiplayer', 'cpu') THEN RETURN NULL; END IF;
  IF p_question_key IS NULL OR length(p_question_key) > 120
     OR p_question_key !~ '^[a-z0-9_]+__[a-z0-9_]+$' THEN RETURN NULL; END IF;
  IF answer_stats_sport(p_question_key) IS DISTINCT FROM p_sport THEN RETURN NULL; END IF;
  IF length(v_typed) = 0 OR length(v_typed) > 80 THEN RETURN NULL; END IF;
  IF jsonb_typeof(p_rules) IS DISTINCT FROM 'array' OR jsonb_array_length(p_rules) <> 2 THEN RETURN NULL; END IF;

  v_game := split_part(p_submission_key, ':', 1);
  v_move := split_part(p_submission_key, ':', 2);
  v_role := split_part(p_submission_key, ':', 3);
  IF p_game_mode = 'multiplayer'
     AND v_game !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN RETURN NULL; END IF;
  IF p_game_mode = 'cpu' AND (v_game !~ '^cpu-' OR v_role <> 'p1') THEN RETURN NULL; END IF;

  v_valid := validate_answer(v_typed, p_sport, p_rules);
  IF v_valid THEN
    v_name := canonical_player_name(p_sport, v_typed);
    IF v_name IS NULL THEN v_valid := FALSE; END IF;   -- defensive; validate_answer matched a name
  END IF;
  v_key := CASE WHEN v_valid THEN v_name ELSE 'typed:' || answer_norm_key(v_typed) END;

  INSERT INTO answer_submissions (
    submission_key, answer_key, game_mode, game_id, local_game_id, move_id, role, user_id,
    question_key, sport, row_category_id, col_category_id, typed_text, valid, player_name)
  VALUES (
    p_submission_key, v_key, p_game_mode,
    CASE WHEN p_game_mode = 'multiplayer' THEN v_game::uuid END,
    CASE WHEN p_game_mode = 'cpu' THEN v_game END,
    v_move, v_role, auth.uid(),
    p_question_key, p_sport,
    split_part(p_question_key, '__', 1), split_part(p_question_key, '__', 2),
    v_typed, v_valid, v_name)
  ON CONFLICT ON CONSTRAINT answer_submissions_once DO NOTHING
  RETURNING id INTO v_id;

  IF v_id IS NULL THEN
    SELECT id INTO v_id FROM answer_submissions
     WHERE submission_key = p_submission_key AND answer_key = v_key;
    RETURN jsonb_build_object('id', v_id, 'valid', v_valid, 'player_name', v_name, 'duplicate', true);
  END IF;
  RETURN jsonb_build_object('id', v_id, 'valid', v_valid, 'player_name', v_name, 'duplicate', false);
END;
$$;

REVOKE ALL ON FUNCTION record_answer(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION record_answer(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated;

-- ─── 3. GET_SQUARE_COUNTS ────────────────────────────────────────────────────
-- Valid submissions per player for one square. Aggregates only.
CREATE FUNCTION get_square_counts(p_question_key TEXT)
RETURNS TABLE (player_name TEXT, submissions BIGINT)
LANGUAGE sql STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT s.player_name, count(*)::BIGINT
    FROM answer_submissions s
   WHERE s.question_key = p_question_key AND s.valid
   GROUP BY s.player_name
$$;

REVOKE ALL ON FUNCTION get_square_counts(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_square_counts(TEXT) TO anon, authenticated;

-- ─── 4. WRONG_ANSWER_REPORTS v2 ──────────────────────────────────────────────
-- Existing columns kept (id, created_at, player_name, question_clue, reported_valid,
-- reporter_name, game_id, reporter_id); the legacy ones are filled for continuity.
ALTER TABLE wrong_answer_reports
  ADD COLUMN IF NOT EXISTS submission_id         BIGINT REFERENCES answer_submissions(id),
  ADD COLUMN IF NOT EXISTS local_game_id         TEXT,
  ADD COLUMN IF NOT EXISTS game_mode             TEXT,
  ADD COLUMN IF NOT EXISTS move_id               TEXT,
  ADD COLUMN IF NOT EXISTS cell_index            INT,
  ADD COLUMN IF NOT EXISTS sport                 TEXT,
  ADD COLUMN IF NOT EXISTS row_category_id       TEXT,
  ADD COLUMN IF NOT EXISTS row_category_label    TEXT,
  ADD COLUMN IF NOT EXISTS col_category_id       TEXT,
  ADD COLUMN IF NOT EXISTS col_category_label    TEXT,
  ADD COLUMN IF NOT EXISTS typed_answer          TEXT,
  ADD COLUMN IF NOT EXISTS game_ruling           BOOLEAN,
  ADD COLUMN IF NOT EXISTS reported_player       TEXT,
  ADD COLUMN IF NOT EXISTS reporter_is_answerer  BOOLEAN,
  ADD COLUMN IF NOT EXISTS reporter_says_correct BOOLEAN,
  ADD COLUMN IF NOT EXISTS note                  TEXT;

-- Reports now go only through the function below.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON wrong_answer_reports;
REVOKE INSERT, UPDATE, DELETE ON wrong_answer_reports FROM anon, authenticated;

CREATE FUNCTION submit_wrong_answer_report_v2(
  p_submission_id         BIGINT,    -- NULL only for CPU answers (never recorded as submissions)
  p_game_mode             TEXT,
  p_game_id               TEXT,
  p_move_id               TEXT,
  p_cell_index            INT,
  p_sport                 TEXT,
  p_row_category_id       TEXT,
  p_row_category_label    TEXT,
  p_col_category_id       TEXT,
  p_col_category_label    TEXT,
  p_typed_answer          TEXT,
  p_game_ruling           BOOLEAN,
  p_reported_player       TEXT,      -- 'p1' | 'p2' | 'cpu'
  p_reporter_is_answerer  BOOLEAN,
  p_reporter_says_correct BOOLEAN,
  p_note                  TEXT,
  p_reporter_name         TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  s    answer_submissions%ROWTYPE;
  v_id BIGINT;
  v_typed  TEXT    := left(btrim(coalesce(p_typed_answer, '')), 80);
  v_ruling BOOLEAN := p_game_ruling;
BEGIN
  IF p_game_mode NOT IN ('multiplayer', 'cpu') THEN RETURN NULL; END IF;
  IF p_reported_player NOT IN ('p1', 'p2', 'cpu') THEN RETURN NULL; END IF;
  IF p_reported_player <> 'cpu' AND p_submission_id IS NULL THEN RETURN NULL; END IF;
  IF length(coalesce(p_note, '')) > 280 OR length(coalesce(p_move_id, '')) > 64
     OR length(coalesce(p_game_id, '')) > 64 THEN RETURN NULL; END IF;

  -- Human answers: take the answer, ruling and square from the recorded
  -- submission so a client can't misstate them.
  IF p_submission_id IS NOT NULL THEN
    SELECT * INTO s FROM answer_submissions WHERE id = p_submission_id;
    IF NOT FOUND OR s.move_id IS DISTINCT FROM p_move_id
       OR s.role IS DISTINCT FROM p_reported_player THEN RETURN NULL; END IF;
    v_typed := s.typed_text; v_ruling := s.valid;
  END IF;
  IF length(v_typed) = 0 THEN RETURN NULL; END IF;

  INSERT INTO wrong_answer_reports (
    player_name, question_clue, reported_valid, reporter_name, game_id, reporter_id,
    submission_id, local_game_id, game_mode, move_id, cell_index, sport,
    row_category_id, row_category_label, col_category_id, col_category_label,
    typed_answer, game_ruling, reported_player, reporter_is_answerer, reporter_says_correct, note)
  VALUES (
    v_typed,
    left(coalesce(p_sport, '') || ': ' || coalesce(p_row_category_label, '') || ' + ' || coalesce(p_col_category_label, ''), 200),
    v_ruling,
    left(coalesce(nullif(btrim(p_reporter_name), ''), 'anonymous'), 60),
    CASE WHEN p_game_mode = 'multiplayer'
          AND p_game_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
         THEN p_game_id::uuid END,
    auth.uid(),
    p_submission_id,
    CASE WHEN p_game_mode = 'cpu' THEN left(p_game_id, 64) END,
    p_game_mode, p_move_id, p_cell_index, coalesce(s.sport, p_sport),
    coalesce(s.row_category_id, left(p_row_category_id, 64)), left(p_row_category_label, 120),
    coalesce(s.col_category_id, left(p_col_category_id, 64)), left(p_col_category_label, 120),
    v_typed, v_ruling, p_reported_player, p_reporter_is_answerer, p_reporter_says_correct,
    nullif(btrim(p_note), ''))
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION submit_wrong_answer_report_v2(BIGINT, TEXT, TEXT, TEXT, INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, TEXT, BOOLEAN, BOOLEAN, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION submit_wrong_answer_report_v2(BIGINT, TEXT, TEXT, TEXT, INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, TEXT, BOOLEAN, BOOLEAN, TEXT, TEXT) TO anon, authenticated;

-- ─── 5. MOVES: store the blended rarity that decided the square ─────────────
ALTER TABLE moves ALTER COLUMN p1_rarity TYPE REAL USING p1_rarity::REAL;
ALTER TABLE moves ALTER COLUMN p2_rarity TYPE REAL USING p2_rarity::REAL;

COMMIT;

-- ─── 6. CHECKS (run after COMMIT; self-contained — permanent tables/catalogs only) ──
-- a) RLS on for every table this migration created → all true
SELECT relname, relrowsecurity FROM pg_class
 WHERE relname IN ('answer_submissions', 'backup_20260925_wrong_answer_reports', 'backup_20260925_moves')
 ORDER BY relname;
-- b) No browser privileges on the new tables → 0 rows
SELECT table_name, grantee, privilege_type FROM information_schema.role_table_grants
 WHERE table_name IN ('answer_submissions', 'backup_20260925_wrong_answer_reports', 'backup_20260925_moves')
   AND grantee IN ('anon', 'authenticated');
-- c) Functions: record_answer has exactly one (6-arg) version; others exist → 3 rows
SELECT proname, pg_get_function_identity_arguments(oid) AS args FROM pg_proc
 WHERE proname IN ('record_answer', 'get_square_counts', 'submit_wrong_answer_report_v2')
 ORDER BY proname;
-- d) Reports: backup matches live row count; no anon INSERT policy remains
SELECT (SELECT count(*) FROM backup_20260925_wrong_answer_reports) AS reports_backup,
       (SELECT count(*) FROM wrong_answer_reports)                 AS reports_live,     -- equal
       (SELECT count(*) FROM backup_20260925_moves)                AS moves_backup,
       (SELECT count(*) FROM moves)                                AS moves_live;       -- equal
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'wrong_answer_reports';  -- no INSERT for anon
-- e) Rarity columns are REAL now → 2 rows, data_type 'real'
SELECT column_name, data_type FROM information_schema.columns
 WHERE table_name = 'moves' AND column_name IN ('p1_rarity', 'p2_rarity');

-- ─── ROLLBACK (only if needed) ───────────────────────────────────────────────
-- BEGIN;
-- DROP FUNCTION IF EXISTS submit_wrong_answer_report_v2(BIGINT, TEXT, TEXT, TEXT, INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, TEXT, BOOLEAN, BOOLEAN, TEXT, TEXT);
-- DROP FUNCTION IF EXISTS get_square_counts(TEXT);
-- DROP FUNCTION IF EXISTS record_answer(TEXT, TEXT, TEXT, TEXT, JSONB, TEXT);
-- ALTER TABLE wrong_answer_reports
--   DROP COLUMN IF EXISTS submission_id, DROP COLUMN IF EXISTS local_game_id, DROP COLUMN IF EXISTS game_mode,
--   DROP COLUMN IF EXISTS move_id, DROP COLUMN IF EXISTS cell_index, DROP COLUMN IF EXISTS sport,
--   DROP COLUMN IF EXISTS row_category_id, DROP COLUMN IF EXISTS row_category_label,
--   DROP COLUMN IF EXISTS col_category_id, DROP COLUMN IF EXISTS col_category_label,
--   DROP COLUMN IF EXISTS typed_answer, DROP COLUMN IF EXISTS game_ruling, DROP COLUMN IF EXISTS reported_player,
--   DROP COLUMN IF EXISTS reporter_is_answerer, DROP COLUMN IF EXISTS reporter_says_correct, DROP COLUMN IF EXISTS note;
-- CREATE POLICY "Allow anonymous inserts" ON wrong_answer_reports FOR INSERT TO anon WITH CHECK (true);
-- GRANT INSERT ON wrong_answer_reports TO anon;
-- DROP TABLE answer_submissions;
-- ALTER TABLE moves ALTER COLUMN p1_rarity TYPE INT USING round(p1_rarity)::INT;   -- only if they were INT before
-- ALTER TABLE moves ALTER COLUMN p2_rarity TYPE INT USING round(p2_rarity)::INT;
-- -- then re-run the record_answer v1 definition from migration 010, step 4
-- COMMIT;
