-- Migration 022: detail line without the team (autocomplete and choosers)
-- Run in Supabase SQL Editor AFTER 021. One small transaction. PURE ASCII.
-- Requested 2 Oct 2026: the team gives away part of the answer.
--   US sports: "1989-2010 . OF" (years active . position)      was "1989-2010 . OF . Mariners"
--   Soccer:    "born 1987 . FW" (birth year . position)         was "born 1987 . FW . Barcelona"
--   Tie-break (proposed): a player whose name, years and position match a namesake's in the same sport
--   also shows the birth year ("1960 . G . born 1932"). Today that is 2 NFL pairs (Jack Davis,
--   Jaylon Jones); every other namesake, and every golden-set chooser, stays distinct without it.
-- player_detail is used by autocomplete_players_v2 and resolve_player (choosers); nothing else changes.
-- 0. BACKUP: the current player_detail definition. RLS on, no browser access.
-- 1. Index on players(display_name) for the namesake check (none exists).

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20261002_player_detail_022 AS
  SELECT pg_get_functiondef('public.player_detail(bigint, text)'::regprocedure) AS definition;
ALTER TABLE backup_20261002_player_detail_022 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20261002_player_detail_022 FROM anon, authenticated;

-- --- 1. INDEX ---------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS players_display_name ON players (display_name);

-- --- 2. player_detail ----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.player_detail(p_player_id BIGINT, p_sport TEXT)
RETURNS TEXT
LANGUAGE sql STABLE
SET search_path = public, pg_temp
AS $$
  SELECT nullif(concat_ws(U&' \00B7 ',
           CASE WHEN p_sport = 'Soccer' THEN 'born ' || p.birth_year::text
                WHEN p.first_year IS NULL THEN NULL
                WHEN p.first_year = p.last_year OR p.last_year IS NULL THEN p.first_year::text
                ELSE p.first_year::text || '-' || p.last_year::text END,
           nullif(p.positions, ''),
           CASE WHEN p_sport <> 'Soccer' AND p.birth_year IS NOT NULL AND EXISTS (
                  SELECT 1 FROM players q
                   WHERE q.display_name = p.display_name AND q.id <> p.id
                     AND q.first_year IS NOT DISTINCT FROM p.first_year AND q.last_year IS NOT DISTINCT FROM p.last_year
                     AND coalesce(q.positions, '') = coalesce(p.positions, '')
                     AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = q.id AND f.sport = p_sport))
                THEN 'born ' || p.birth_year::text END), '')
    FROM players p WHERE p.id = p_player_id
$$;

COMMIT;

-- --- 3. CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM backup_20261002_player_detail_022)                                            AS function_backed_up,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Jr.'), 'MLB')           AS d_griffey_jr,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Ken Griffey Sr.'), 'MLB')           AS d_griffey_sr,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Gary Payton'), 'NBA')               AS d_payton,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Lionel Messi'), 'Soccer')           AS d_messi,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Jack Davis (guard, born 1932)'), 'NFL') AS d_jack_davis_1932,
  player_detail((SELECT id FROM players WHERE wikipedia_title = 'Jack Davis (guard, born 1933)'), 'NFL') AS d_jack_davis_1933,
  (SELECT string_agg(display_name || ' [' || coalesce(detail, '') || ']', ' | ') FROM autocomplete_players_v2('griffey', 'MLB', 8)) AS ac_griffey,
  (SELECT string_agg(detail, ' | ') FROM resolve_player('Ken Griffey', 'MLB'))                       AS chooser_griffey,
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname = 'backup_20261002_player_detail_022') AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name = 'backup_20261002_player_detail_022' AND grantee IN ('anon', 'authenticated'))  AS backup_browser_grants;
-- EXPECTED: function_backed_up = 1; d_griffey_jr = 1989-2010 <U+00B7> OF; d_griffey_sr = 1973-1991 <U+00B7> OF; d_payton = 1990-2007 <U+00B7> PG; d_messi = born 1987 <U+00B7> MF/FW; d_jack_davis_1932 = 1960 <U+00B7> G <U+00B7> born 1932; d_jack_davis_1933 = 1960 <U+00B7> G <U+00B7> born 1933; ac_griffey = Ken Griffey Jr. [1989-2010 <U+00B7> OF] | Ken Griffey Sr. [1973-1991 <U+00B7> OF]; chooser_griffey = 1989-2010 <U+00B7> OF | 1973-1991 <U+00B7> OF; backup_rls = true; backup_browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- BEGIN;
-- DO $rb$ BEGIN EXECUTE (SELECT definition FROM backup_20261002_player_detail_022); END $rb$;
-- DROP INDEX IF EXISTS players_display_name;
-- DROP TABLE backup_20261002_player_detail_022;
-- COMMIT;
