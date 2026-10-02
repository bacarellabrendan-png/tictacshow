-- Migration 020b-0: staging tables for the rarity prior (formula v2), no game data changed
-- Run in Supabase SQL Editor. One small transaction. PURE ASCII.
-- Approved 1 Oct 2026 (step G: ship formula v2 to production).
-- Creates three empty staging tables, keyed by Wikipedia page id. After this, I load them with the
-- service key through the API from the LOCKED blind-test data (scratchpad rarity/LOCK2.txt) and
-- verify them; 020b-1 then checks their fingerprints and builds the prior tables and get_square_prior.
--   stage_prior_tenure: seasons with a team (NBA games/82, NHL games/80, MLB games/150 or pitcher
--                       seasons, NFL roster seasons, Soccer seasons at the club from Wikidata)
--   stage_prior_times:  award counts (NBA/NHL/MLB major awards, NFL Pro Bowls, MLB All-Star per franchise)
--   stage_prior_views:  English Wikipedia views Sep 2025 - Aug 2026 (monthly dumps, by page id)
-- Nothing existing is changed, so there is no backup. All three: RLS on, no browser access.

BEGIN;

CREATE TABLE stage_prior_tenure (
  wikipedia_page_id BIGINT  NOT NULL,
  sport             TEXT    NOT NULL,
  team              TEXT    NOT NULL,
  tenure            NUMERIC NOT NULL,
  PRIMARY KEY (wikipedia_page_id, sport, team)
);
CREATE TABLE stage_prior_times (
  wikipedia_page_id BIGINT  NOT NULL,
  sport             TEXT    NOT NULL,
  fact_type         TEXT    NOT NULL,
  team              TEXT    NOT NULL,   -- '' except MLB All-Star (per franchise)
  times             INT     NOT NULL,
  PRIMARY KEY (wikipedia_page_id, fact_type, team)
);
CREATE TABLE stage_prior_views (
  wikipedia_page_id BIGINT  PRIMARY KEY,
  pageviews_12m     BIGINT  NOT NULL,
  redirect_views    BIGINT  NOT NULL
);
ALTER TABLE stage_prior_tenure ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_prior_times  ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_prior_views  ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON stage_prior_tenure, stage_prior_times, stage_prior_views FROM anon, authenticated;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------
SELECT
  (SELECT count(*) FROM stage_prior_tenure) + (SELECT count(*) FROM stage_prior_times)
    + (SELECT count(*) FROM stage_prior_views)                                                  AS staging_rows,
  (SELECT bool_and(relrowsecurity) FROM pg_class
     WHERE relname IN ('stage_prior_tenure', 'stage_prior_times', 'stage_prior_views'))         AS rls_on,
  (SELECT count(*) FROM pg_class
     WHERE relname IN ('stage_prior_tenure', 'stage_prior_times', 'stage_prior_views'))         AS tables,
  (SELECT count(*) FROM information_schema.role_table_grants
     WHERE table_name IN ('stage_prior_tenure', 'stage_prior_times', 'stage_prior_views')
       AND grantee IN ('anon', 'authenticated'))                                                AS browser_grants;
-- EXPECTED: staging_rows = 0; rls_on = true; tables = 3; browser_grants = 0

-- --- ROLLBACK (only if needed) --------------------------------------------------------------------
-- DROP TABLE stage_prior_tenure, stage_prior_times, stage_prior_views;
