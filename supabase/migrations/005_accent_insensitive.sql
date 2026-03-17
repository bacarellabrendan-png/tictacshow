-- Migration 005: Accent-insensitive matching
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
--
-- Fixes: "Ivan Rodriguez" now matches "Iván Rodríguez" in validate_answer
--        and autocomplete.

-- 1. Enable the unaccent extension
CREATE EXTENSION IF NOT EXISTS unaccent;

-- 2. Create an immutable wrapper so we can use it in indexes
--    (unaccent is STABLE, not IMMUTABLE, but for our purposes it's safe)
CREATE OR REPLACE FUNCTION immutable_unaccent(text)
RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
AS $$ SELECT public.unaccent($1) $$;

-- 3. Functional index for accent+case insensitive lookups
DROP INDEX IF EXISTS idx_player_facts_lower_name_sport;
CREATE INDEX idx_player_facts_norm_name_sport
  ON player_facts (immutable_unaccent(LOWER(player_name)), sport, fact_type);

-- 4. Update validate_answer to use accent-insensitive matching
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
  p_name_norm TEXT := immutable_unaccent(LOWER(TRIM(p_player_name)));
BEGIN
  FOR rule IN SELECT * FROM jsonb_array_elements(p_rules)
  LOOP
    IF rule ? 'fact_value' THEN
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE immutable_unaccent(LOWER(player_name)) = p_name_norm
          AND sport       = p_sport
          AND fact_type   = rule->>'fact_type'
          AND fact_value  = rule->>'fact_value'
      ) INTO found;
    ELSE
      SELECT EXISTS(
        SELECT 1 FROM player_facts
        WHERE immutable_unaccent(LOWER(player_name)) = p_name_norm
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

-- 5. Update validate_board to use accent-insensitive matching
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
        SELECT immutable_unaccent(LOWER(pf.player_name)) AS pname
          FROM player_facts pf
         WHERE pf.sport      = p_sport
           AND pf.fact_type  = rf->>'type'
           AND pf.fact_value = rf->>'value'
        INTERSECT
        SELECT immutable_unaccent(LOWER(pf.player_name)) AS pname
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

-- 6. Create autocomplete RPC — accent-insensitive player name search
CREATE OR REPLACE FUNCTION autocomplete_players(
  p_query  TEXT,
  p_sport  TEXT DEFAULT NULL,
  p_limit  INT DEFAULT 8
)
RETURNS TABLE(player_name TEXT)
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  q_norm TEXT := immutable_unaccent(LOWER(TRIM(p_query)));
BEGIN
  RETURN QUERY
    SELECT DISTINCT pf.player_name
    FROM player_facts pf
    WHERE immutable_unaccent(LOWER(pf.player_name)) LIKE '%' || q_norm || '%'
      AND (p_sport IS NULL OR pf.sport = p_sport)
    ORDER BY pf.player_name
    LIMIT p_limit;
END;
$$;
