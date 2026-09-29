-- Migration 016: Phase 1 schema — stable player identities, aliases, name normalization
-- Run in Supabase SQL Editor. Steps 0–6 run as one transaction.
-- SCHEMA ONLY: no player data is written. The unused legacy `players` table is renamed.
-- No temp tables. The check block was run ALONE in a fresh session against a local
-- Postgres set up like this project (pg_trgm in public, unaccent in extensions), and
-- again with both extensions in other schemas, after the body ran.
--
-- REVISION 2 (first attempt failed with 42704 and applied nothing): v1 said
-- CREATE EXTENSION … WITH SCHEMA extensions, which is a no-op when the extension already
-- lives elsewhere, then hard-coded extensions.gin_trgm_ops. Live project (checked read-only):
-- pg_trgm is in public, unaccent is in extensions. This version creates/moves NO extension;
-- it looks up each extension's schema in pg_extension and builds the dependent objects with
-- that schema, failing with a clear message if either extension is missing.
--
-- 1. Rename the unused 92k-row `players` (id, name, sport) → players_legacy_20260925,
--    remove browser access. No app code reads it.
-- 2. Require unaccent and pg_trgm to be installed (wherever they are).
-- 3. normalize_name_exact(text) / normalize_name(text): the ONE name normalizer.
--    lowercase → strip accents (incl. ð ø ł æ ß đ þ ı via unaccent) → drop ' ’ ` ´ .
--    → other punctuation/hyphens to spaces → join runs of single-letter initials
--    ("j r smith" → "jr smith") → collapse spaces. normalize_name() additionally drops a
--    trailing Jr/Sr/II/III/IV. src/data/normalizeName.js must return identical output
--    (enforced by a shared test list).
-- 4. players: one row per PERSON (across sports), anchored on the English Wikipedia page id.
-- 5. player_aliases: every accepted spelling of a player.
-- 6. player_facts.player_id (nullable until the 017 load) + staging tables for the load.

BEGIN;

-- ─── 1. LEGACY players TABLE ─────────────────────────────────────────────────
ALTER TABLE players RENAME TO players_legacy_20260925;
ALTER TABLE players_legacy_20260925 ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON players_legacy_20260925 FROM anon, authenticated;

-- ─── 2 + 3. EXTENSIONS (looked up, never created or moved) + NORMALIZER ─────
-- unaccent's function AND its dictionary live in the extension's schema; both are
-- schema-qualified in the generated function, whose search_path is pinned to pg_catalog.
DO $mig$
DECLARE ua TEXT;
BEGIN
  SELECT n.nspname INTO ua FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'unaccent';
  IF ua IS NULL THEN RAISE EXCEPTION 'Migration 016 needs the unaccent extension; it is not installed.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm') THEN
    RAISE EXCEPTION 'Migration 016 needs the pg_trgm extension; it is not installed.';
  END IF;

  EXECUTE format($fn$
    CREATE OR REPLACE FUNCTION public.normalize_name_exact(p TEXT)
    RETURNS TEXT
    LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
    SET search_path = pg_catalog, pg_temp
    AS $body$
      SELECT btrim(regexp_replace(
               regexp_replace(
                 regexp_replace(
                   regexp_replace(lower(%1$I.unaccent(%2$L::regdictionary, p)),
                                  '[''‘’`´.]', '', 'g'),            -- drop apostrophes and periods
                   '[^a-z0-9]+', ' ', 'g'),                           -- hyphens, commas, etc. → space
                 '\m([a-z]) (?=[a-z]\M)', '\1', 'g'),                 -- join initials: "j r smith" → "jr smith"
               '\s+', ' ', 'g'))
    $body$
  $fn$, ua, ua || '.unaccent');
END
$mig$;

CREATE OR REPLACE FUNCTION public.normalize_name(p TEXT)
RETURNS TEXT
LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
SET search_path = pg_catalog, pg_temp
AS $$
  SELECT btrim(regexp_replace(public.normalize_name_exact(p), ' (jr|sr|ii|iii|iv)$', ''))
$$;

-- ─── 4. PLAYERS ─────────────────────────────────────────────────────────────
CREATE TABLE players (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  wikipedia_page_id BIGINT NOT NULL UNIQUE,     -- the anchor (stable across article renames)
  wikipedia_title   TEXT   NOT NULL,
  wikidata_qid      TEXT   UNIQUE,
  display_name      TEXT   NOT NULL,            -- title without "(…)" disambiguator
  sports            TEXT[] NOT NULL,
  first_year        INT,
  last_year         INT,
  positions         TEXT,
  sr_nba            TEXT UNIQUE,                -- basketball-reference id
  sr_mlb            TEXT UNIQUE,                -- baseball-reference id
  sr_nfl            TEXT UNIQUE,                -- pro-football-reference id
  sr_nhl            TEXT UNIQUE,                -- hockey-reference id
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE players ENABLE ROW LEVEL SECURITY;          -- browser access decided in 018
REVOKE ALL ON players FROM anon, authenticated;

-- ─── 5. ALIASES ─────────────────────────────────────────────────────────────
CREATE TABLE player_aliases (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_id   BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  alias       TEXT   NOT NULL,
  alias_exact TEXT   NOT NULL,                  -- normalize_name_exact(alias)
  alias_norm  TEXT   NOT NULL,                  -- normalize_name(alias)
  kind        TEXT   NOT NULL CHECK (kind IN ('title', 'display', 'label', 'birth_name', 'nickname',
                                              'suffix_variant', 'accent_variant', 'punctuation_variant',
                                              'legacy_fact_name', 'manual')),
  source      TEXT   NOT NULL,                  -- 'wikipedia' | 'wikidata' | 'sports-reference' | 'player_facts' | 'curated'
  curated     BOOLEAN NOT NULL DEFAULT false,   -- editable list (nicknames etc.)
  UNIQUE (player_id, alias_exact)
);
CREATE INDEX player_aliases_norm  ON player_aliases (alias_norm);
CREATE INDEX player_aliases_exact ON player_aliases (alias_exact);
-- Trigram index: operator class qualified with pg_trgm's actual schema (public on this project)
DO $mig$
DECLARE tg TEXT;
BEGIN
  SELECT n.nspname INTO tg FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pg_trgm';
  EXECUTE format('CREATE INDEX player_aliases_trgm ON public.player_aliases USING gin (alias_norm %I.gin_trgm_ops)', tg);
END
$mig$;
ALTER TABLE player_aliases ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON player_aliases FROM anon, authenticated;

-- ─── 6. FACT OWNERSHIP + STAGING ────────────────────────────────────────────
ALTER TABLE player_facts ADD COLUMN IF NOT EXISTS player_id BIGINT REFERENCES players(id);
CREATE INDEX IF NOT EXISTS player_facts_player ON player_facts (player_id, sport, fact_type, fact_value);

-- Filled by the reviewed identity build (service key), applied by migration 017.
CREATE TABLE stage_players (
  wikipedia_page_id BIGINT PRIMARY KEY,
  wikipedia_title   TEXT NOT NULL,
  wikidata_qid      TEXT,
  display_name      TEXT NOT NULL,
  sports            TEXT[] NOT NULL,
  first_year        INT,
  last_year         INT,
  positions         TEXT,
  sr_nba TEXT, sr_mlb TEXT, sr_nfl TEXT, sr_nhl TEXT
);
CREATE TABLE stage_player_aliases (
  wikipedia_page_id BIGINT NOT NULL,
  alias             TEXT   NOT NULL,
  kind              TEXT   NOT NULL,
  source            TEXT   NOT NULL,
  curated           BOOLEAN NOT NULL DEFAULT false
);
CREATE TABLE stage_fact_owners (
  fact_id           BIGINT PRIMARY KEY,          -- player_facts.id
  wikipedia_page_id BIGINT NOT NULL,
  method            TEXT   NOT NULL,             -- how the owner was determined
  evidence          TEXT
);
ALTER TABLE stage_players        ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_player_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_fact_owners    ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON stage_players, stage_player_aliases, stage_fact_owners FROM anon, authenticated;

COMMIT;

-- ─── 7. CHECKS (run after COMMIT; one row; permanent tables + catalogs only) ──
SELECT
  (SELECT count(*) FROM players_legacy_20260925)                              AS legacy_rows,          -- 92,430
  (SELECT to_regclass('public.players') IS NOT NULL)                           AS players_exists,       -- true
  (SELECT count(*) FROM players)                                              AS players_rows,         -- 0
  (SELECT count(*) FROM player_aliases)                                       AS aliases_rows,         -- 0
  (SELECT count(*) FROM player_facts WHERE player_id IS NOT NULL)             AS facts_with_owner,     -- 0
  (SELECT bool_and(relrowsecurity) FROM pg_class WHERE relname IN
     ('players', 'player_aliases', 'players_legacy_20260925',
      'stage_players', 'stage_player_aliases', 'stage_fact_owners'))          AS rls_on_all,           -- true
  (SELECT count(*) FROM information_schema.role_table_grants
    WHERE table_name IN ('players', 'player_aliases', 'players_legacy_20260925',
                         'stage_players', 'stage_player_aliases', 'stage_fact_owners')
      AND grantee IN ('anon', 'authenticated'))                                AS browser_grants,       -- 0
  normalize_name('Ken Griffey, Sr.')                                           AS n1,  -- ken griffey
  normalize_name_exact('Ken Griffey, Sr.')                                     AS n2,  -- ken griffey sr
  normalize_name('J. R. Smith') = normalize_name('JR Smith')                   AS n3,  -- true
  normalize_name('Iván Rodríguez') = normalize_name('Ivan Rodriguez')          AS n4,  -- true
  normalize_name('Shaquille O''Neal')                                          AS n5,  -- shaquille oneal
  normalize_name('Martin Ødegaard')                                            AS n6,  -- martin odegaard
  normalize_name('Karl-Anthony Towns')                                         AS n7,  -- karl anthony towns
  normalize_name('Gary Payton II') = normalize_name('Gary Payton')             AS n8;  -- true (same base; separate ids)

-- ─── ROLLBACK (only if needed; nothing references these tables yet) ─────────
-- BEGIN;
-- DROP TABLE stage_fact_owners, stage_player_aliases, stage_players;
-- ALTER TABLE player_facts DROP COLUMN IF EXISTS player_id;
-- DROP TABLE player_aliases, players;
-- DROP FUNCTION normalize_name(TEXT); DROP FUNCTION normalize_name_exact(TEXT);
-- ALTER TABLE players_legacy_20260925 RENAME TO players;
-- COMMIT;
