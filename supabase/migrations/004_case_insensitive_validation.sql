-- Migration 004: Case-insensitive validation
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
--
-- Fixes: validate_answer RPC now matches player names case-insensitively,
-- so "lebron james" matches "LeBron James" in player_facts.

-- 1. Add functional index for LOWER(player_name) lookups
CREATE INDEX IF NOT EXISTS idx_player_facts_lower_name_sport
  ON player_facts (LOWER(player_name), sport, fact_type);

-- 2. Update validate_answer to use case-insensitive matching
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
