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
BEGIN
  FOR rule IN SELECT * FROM jsonb_array_elements(p_rules)
  LOOP
    IF rule ? 'fact_value' THEN
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE player_name = p_player_name
          AND sport       = p_sport
          AND fact_type   = rule->>'fact_type'
          AND fact_value  = rule->>'fact_value'
      ) INTO found;
    ELSE
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE player_name = p_player_name
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
