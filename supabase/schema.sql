-- ─── PLAYER_FACTS TABLE ─────────────────────────────────────────────────────
-- Stores factual attributes about athletes for answer validation.
-- Each row says: "this player, in this sport, has this fact (optionally with a value)."

CREATE TABLE IF NOT EXISTS player_facts (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_name TEXT    NOT NULL,
  sport       TEXT    NOT NULL,
  fact_type   TEXT    NOT NULL,
  fact_value  TEXT    NOT NULL DEFAULT 'true',
  UNIQUE (player_name, sport, fact_type, fact_value)
);

-- Indexes for the RPC lookup patterns
CREATE INDEX IF NOT EXISTS idx_player_facts_name_type
  ON player_facts (player_name, fact_type);

CREATE INDEX IF NOT EXISTS idx_player_facts_type_value
  ON player_facts (fact_type, fact_value);

CREATE INDEX IF NOT EXISTS idx_player_facts_sport
  ON player_facts (sport);

-- ─── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE player_facts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "player_facts_select" ON player_facts
  FOR SELECT USING (true);

-- ─── VALIDATE_ANSWER RPC ────────────────────────────────────────────────────
-- Loops through each rule, checks if a matching player_facts row exists.
-- Returns true only if ALL rules are satisfied (AND logic).
-- Uses case-insensitive matching on player_name so "lebron james" matches "LeBron James".
--
-- Rule format (JSONB array):
--   { "fact_type": "nba_champion" }                            → existence check
--   { "fact_type": "played_for_team", "fact_value": "Lakers" } → exact match

CREATE OR REPLACE FUNCTION validate_answer(
  p_player_name TEXT,
  p_sport       TEXT,
  p_rules       JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  rule  JSONB;
  found BOOLEAN;
  p_name_lower TEXT := LOWER(TRIM(p_player_name));
BEGIN
  FOR rule IN SELECT * FROM jsonb_array_elements(p_rules)
  LOOP
    IF rule ? 'fact_value' THEN
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE LOWER(player_name) = p_name_lower
          AND sport       = p_sport
          AND fact_type   = rule->>'fact_type'
          AND fact_value  = rule->>'fact_value'
      ) INTO found;
    ELSE
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE LOWER(player_name) = p_name_lower
          AND sport       = p_sport
          AND fact_type   = rule->>'fact_type'
      ) INTO found;
    END IF;

    IF NOT found THEN
      RETURN FALSE;
    END IF;
  END LOOP;

  RETURN TRUE;
END;
$$;

-- ─── VALIDATE_BOARD RPC ────────────────────────────────────────────────────
-- Checks all 9 intersections of a 3×3 board in one call.
-- Used by the board generator to verify every cell has enough valid answers.
--
-- p_row_facts / p_col_facts: JSONB arrays of 3 objects each:
--   [{"type":"played_for_team","value":"Lakers"}, ...]
-- Returns: { "valid": true, "counts": [8,12,5,15,7,3,22,9,11] }
--   counts is row-major (cell 0 = row0×col0, cell 1 = row0×col1, …)

CREATE OR REPLACE FUNCTION validate_board(
  p_sport       TEXT,
  p_row_facts   JSONB,
  p_col_facts   JSONB,
  p_min_answers INT DEFAULT 6
)
RETURNS JSONB
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  r         INT;
  c         INT;
  rf        JSONB;
  cf        JSONB;
  cnt       INT;
  counts    JSONB := '[]'::JSONB;
  all_valid BOOLEAN := TRUE;
BEGIN
  FOR r IN 0..2 LOOP
    rf := p_row_facts->r;
    FOR c IN 0..2 LOOP
      cf := p_col_facts->c;

      SELECT COUNT(DISTINCT sub.pname) INTO cnt
      FROM (
        SELECT LOWER(pf.player_name) AS pname
          FROM player_facts pf
         WHERE pf.sport      = p_sport
           AND pf.fact_type  = rf->>'type'
           AND pf.fact_value = rf->>'value'
        INTERSECT
        SELECT LOWER(pf.player_name) AS pname
          FROM player_facts pf
         WHERE pf.sport      = p_sport
           AND pf.fact_type  = cf->>'type'
           AND pf.fact_value = cf->>'value'
      ) sub;

      counts := counts || to_jsonb(cnt);
      IF cnt < p_min_answers THEN
        all_valid := FALSE;
      END IF;
    END LOOP;
  END LOOP;

  RETURN jsonb_build_object('valid', all_valid, 'counts', counts);
END;
$$;

-- Composite index for board generator queries (sport + fact_type + fact_value)
CREATE INDEX IF NOT EXISTS idx_player_facts_sport_type_value
  ON player_facts (sport, fact_type, fact_value);

-- Functional index for case-insensitive player name lookups (validate_answer RPC)
CREATE INDEX IF NOT EXISTS idx_player_facts_lower_name_sport
  ON player_facts (LOWER(player_name), sport, fact_type);

-- ─── ANSWER_STATS TABLE ─────────────────────────────────────────────────────
-- Tracks per-question answer submissions so live rarity can override position-based rarity.

CREATE TABLE IF NOT EXISTS answer_stats (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question_key     TEXT    NOT NULL,
  answer_text      TEXT    NOT NULL,
  submission_count INT     NOT NULL DEFAULT 1,
  UNIQUE (question_key, answer_text)
);

CREATE INDEX IF NOT EXISTS idx_answer_stats_question
  ON answer_stats (question_key);

-- ─── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE answer_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "answer_stats_select" ON answer_stats
  FOR SELECT USING (true);

CREATE POLICY "answer_stats_insert" ON answer_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "answer_stats_update" ON answer_stats
  FOR UPDATE USING (true);
