-- Migration 010: Lock answer_stats + merge spelling variants
-- Run in Supabase SQL Editor. Runs as one transaction; if any step fails, nothing changes.
--
-- 1. Backs up answer_stats.
-- 2. Merges rows whose answer_text is a spelling variant of the same player
--    ("A. C. Green" / "A.C. Green", "shaquille o'neal" / "Shaquille O'Neal")
--    into the canonical player_facts spelling, summing submission_count.
--    Canonical = the spelling with the most player_facts rows for that sport
--    (ties → alphabetical).
-- 2b. Moves rows that match no current player into answer_stats_quarantine.
-- 3. Removes browser INSERT/UPDATE/DELETE access; reads stay public.
-- 4. Adds record_answer(), the only way browsers can add a submission.

BEGIN;

-- ─── 0. BACKUP ───────────────────────────────────────────────────────────────
CREATE TABLE backup_20260924_answer_stats AS SELECT * FROM answer_stats;
ALTER TABLE backup_20260924_answer_stats ENABLE ROW LEVEL SECURITY;  -- no policies: service role only
REVOKE ALL ON backup_20260924_answer_stats FROM anon, authenticated;

LOCK TABLE answer_stats IN EXCLUSIVE MODE;

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA extensions;

-- ─── 1. HELPERS ──────────────────────────────────────────────────────────────
-- Mirrors normalizeStr() in src/data/questions.js: strip accents, lowercase,
-- hyphen→space, drop periods, drop other punctuation, collapse spaces.
-- (Phase 1 replaces this with the shared normalize_name().)
CREATE OR REPLACE FUNCTION answer_norm_key(p text)
RETURNS text
LANGUAGE sql STABLE
SET search_path = public, extensions, pg_temp
AS $$
  SELECT btrim(regexp_replace(regexp_replace(
           replace(replace(lower(unaccent(p)), '-', ' '), '.', ''),
           '[^a-z0-9\s]', '', 'g'), '\s+', ' ', 'g'))
$$;

-- question_key "nba_lakers__nba_heat" → "NBA"
CREATE OR REPLACE FUNCTION answer_stats_sport(p_question_key text)
RETURNS text
LANGUAGE sql IMMUTABLE
AS $$
  SELECT CASE split_part(p_question_key, '_', 1)
    WHEN 'nba' THEN 'NBA' WHEN 'nfl' THEN 'NFL' WHEN 'mlb' THEN 'MLB'
    WHEN 'nhl' THEN 'NHL' WHEN 'soc' THEN 'Soccer' END
$$;

-- Canonical player_facts spelling for a typed/stored name, or NULL.
CREATE OR REPLACE FUNCTION canonical_player_name(p_sport text, p_name text)
RETURNS text
LANGUAGE sql STABLE
SET search_path = public, extensions, pg_temp
AS $$
  SELECT player_name
    FROM player_facts
   WHERE sport = p_sport
     AND answer_norm_key(player_name) = answer_norm_key(p_name)
   GROUP BY player_name
   ORDER BY count(*) DESC, player_name
   LIMIT 1
$$;

-- ─── 2. MERGE SPELLING VARIANTS ──────────────────────────────────────────────
-- Canonical spelling per (sport, normalized key), computed once, set-based.
CREATE TEMP TABLE canon AS
SELECT DISTINCT ON (sport, nkey) sport, nkey, player_name
  FROM (
    SELECT sport, answer_norm_key(player_name) AS nkey, player_name, count(*) AS n
      FROM player_facts
     WHERE sport IN ('NBA', 'NFL', 'MLB', 'NHL', 'Soccer')
     GROUP BY sport, player_name
  ) t
 ORDER BY sport, nkey, n DESC, player_name;
CREATE INDEX ON canon (sport, nkey);

CREATE TEMP TABLE as_mapped AS
SELECT a.id, a.question_key, a.answer_text, a.submission_count, c.player_name AS canonical
  FROM answer_stats a
  JOIN canon c
    ON c.sport = answer_stats_sport(a.question_key)
   AND c.nkey  = answer_norm_key(a.answer_text);

-- Only groups that actually change: >1 row collapses, or spelling differs.
CREATE TEMP TABLE as_groups AS
SELECT question_key, canonical, sum(submission_count) AS total, count(*) AS n_rows
  FROM as_mapped
 GROUP BY question_key, canonical
HAVING count(*) > 1 OR bool_or(answer_text <> canonical);

DELETE FROM answer_stats a
 USING as_mapped m
  JOIN as_groups g ON g.question_key = m.question_key AND g.canonical = m.canonical
 WHERE a.id = m.id;

INSERT INTO answer_stats (question_key, answer_text, submission_count)
SELECT question_key, canonical, total FROM as_groups;

-- ─── 2b. QUARANTINE NON-PLAYER ROWS ──────────────────────────────────────────
-- Rows whose answer matches no current player for that sport (seeded junk such
-- as "Citizenship of the European Union", "CA Osasuna"). Moved, not deleted.
CREATE TABLE IF NOT EXISTS answer_stats_quarantine (
  id               BIGINT PRIMARY KEY,           -- original answer_stats.id
  question_key     TEXT        NOT NULL,
  answer_text      TEXT        NOT NULL,
  submission_count INT         NOT NULL,
  reason           TEXT        NOT NULL,
  quarantined_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE answer_stats_quarantine ENABLE ROW LEVEL SECURITY;  -- no policies: service role only
REVOKE ALL ON answer_stats_quarantine FROM anon, authenticated;

WITH moved AS (
  DELETE FROM answer_stats a
   WHERE NOT EXISTS (
     SELECT 1 FROM canon c
      WHERE c.sport = answer_stats_sport(a.question_key)
        AND c.nkey  = answer_norm_key(a.answer_text))
  RETURNING a.id, a.question_key, a.answer_text, a.submission_count
)
INSERT INTO answer_stats_quarantine (id, question_key, answer_text, submission_count, reason)
SELECT id, question_key, answer_text, submission_count, 'no matching player_facts name (migration 010)'
  FROM moved;

-- ─── 3. LOCK DOWN WRITES ─────────────────────────────────────────────────────
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
            WHERE schemaname = 'public' AND tablename = 'answer_stats' AND cmd <> 'SELECT'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.answer_stats', p.policyname);
  END LOOP;
END $$;

REVOKE INSERT, UPDATE, DELETE ON answer_stats FROM anon, authenticated;

-- ─── 4. RECORD_ANSWER RPC ────────────────────────────────────────────────────
-- Records one submission for a square, only if the answer is valid for the
-- given rules. Stores the canonical spelling. Returns it, or NULL if nothing
-- was recorded.
-- Known limit: rules still come from the client, so a tampered client could
-- inflate a real player on a real square — but can no longer write arbitrary
-- rows. Fixed properly when category definitions move into the database.
CREATE OR REPLACE FUNCTION record_answer(
  p_question_key TEXT,
  p_sport        TEXT,
  p_rules        JSONB,
  p_answer       TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_name TEXT;
BEGIN
  IF p_question_key IS NULL OR length(p_question_key) > 120
     OR p_question_key !~ '^[a-z0-9_]+__[a-z0-9_]+$' THEN RETURN NULL; END IF;
  IF p_answer IS NULL OR length(btrim(p_answer)) = 0 OR length(p_answer) > 80 THEN RETURN NULL; END IF;
  IF answer_stats_sport(p_question_key) IS DISTINCT FROM p_sport THEN RETURN NULL; END IF;
  IF jsonb_typeof(p_rules) IS DISTINCT FROM 'array' OR jsonb_array_length(p_rules) <> 2 THEN RETURN NULL; END IF;
  IF NOT validate_answer(p_answer, p_sport, p_rules) THEN RETURN NULL; END IF;

  v_name := canonical_player_name(p_sport, p_answer);
  IF v_name IS NULL THEN RETURN NULL; END IF;

  INSERT INTO answer_stats (question_key, answer_text, submission_count)
  VALUES (p_question_key, v_name, 1)
  ON CONFLICT (question_key, answer_text)
  DO UPDATE SET submission_count = answer_stats.submission_count + 1;

  RETURN v_name;
END;
$$;

REVOKE ALL ON FUNCTION record_answer(TEXT, TEXT, JSONB, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION record_answer(TEXT, TEXT, JSONB, TEXT) TO anon, authenticated;

-- Drop working tables explicitly so nothing after COMMIT can depend on them.
DROP TABLE canon, as_mapped, as_groups;

COMMIT;

-- ─── 5. CHECKS (run after COMMIT; expected values in comments) ───────────────
-- Self-contained: only permanent tables and catalogs, nothing from the transaction.
-- Actual results when applied: rows_after 459,444, quarantined 15,061,
-- submissions 116,037,993 before = after + quarantine.
SELECT (SELECT count(*) FROM backup_20260924_answer_stats) AS rows_before,          -- 474,813
       (SELECT count(*) FROM answer_stats)                 AS rows_after,           -- ≈ 459,457
       (SELECT count(*) FROM answer_stats_quarantine)      AS rows_quarantined,     -- ≈ 15,060
       (SELECT sum(submission_count) FROM backup_20260924_answer_stats) AS subs_before,
       (SELECT sum(submission_count) FROM answer_stats)
     + (SELECT sum(submission_count) FROM answer_stats_quarantine)      AS subs_after_plus_quarantine;  -- must equal subs_before
SELECT answer_text, sum(submission_count) FROM answer_stats_quarantine
 GROUP BY 1 ORDER BY 2 DESC LIMIT 25;                                                -- eyeball: should all be non-players
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'answer_stats';          -- only SELECT policies
SELECT relname, relrowsecurity FROM pg_class
 WHERE relname IN ('backup_20260924_answer_stats', 'answer_stats_quarantine');      -- both true
SELECT table_name, grantee, privilege_type FROM information_schema.role_table_grants
 WHERE table_name IN ('backup_20260924_answer_stats', 'answer_stats_quarantine')
   AND grantee IN ('anon', 'authenticated');                                          -- 0 rows
SELECT question_key, answer_text, count(*) FROM answer_stats
 GROUP BY 1, 2 HAVING count(*) > 1;                                                  -- 0 rows

-- ─── ROLLBACK (only if needed) ───────────────────────────────────────────────
-- BEGIN;
-- DROP FUNCTION IF EXISTS record_answer(TEXT, TEXT, JSONB, TEXT);
-- TRUNCATE answer_stats;
-- INSERT INTO answer_stats OVERRIDING SYSTEM VALUE SELECT * FROM backup_20260924_answer_stats;
-- DROP TABLE answer_stats_quarantine;
-- GRANT INSERT, UPDATE ON answer_stats TO anon, authenticated;
-- CREATE POLICY "answer_stats_insert" ON answer_stats FOR INSERT WITH CHECK (true);
-- CREATE POLICY "answer_stats_update" ON answer_stats FOR UPDATE USING (true);
-- COMMIT;
