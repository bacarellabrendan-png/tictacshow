-- Standalone SQL for running in the Supabase dashboard.
-- Creates the player_facts table, indexes, RLS policy, and validate_answer RPC.

-- ─── TABLE ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS player_facts (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_name TEXT    NOT NULL,
  sport       TEXT    NOT NULL,
  fact_type   TEXT    NOT NULL,
  fact_value  TEXT    NOT NULL DEFAULT 'true',
  UNIQUE (player_name, sport, fact_type, fact_value)
);

-- ─── INDEXES ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_player_facts_name_type
  ON player_facts (player_name, fact_type);

CREATE INDEX IF NOT EXISTS idx_player_facts_type_value
  ON player_facts (fact_type, fact_value);

CREATE INDEX IF NOT EXISTS idx_player_facts_sport
  ON player_facts (sport);

-- ─── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE player_facts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'player_facts' AND policyname = 'player_facts_select'
  ) THEN
    CREATE POLICY "player_facts_select" ON player_facts
      FOR SELECT USING (true);
  END IF;
END
$$;

-- ─── VALIDATE_ANSWER RPC ────────────────────────────────────────────────────
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
