-- Player fame table: Wikipedia pageviews as a proxy for how likely
-- a casual fan would pick this player for any intersection.
CREATE TABLE IF NOT EXISTS player_fame (
  id                      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_name             TEXT    NOT NULL,
  sport                   TEXT    NOT NULL,
  wikipedia_pageviews_12m BIGINT  NOT NULL DEFAULT 0,
  UNIQUE (player_name, sport)
);

CREATE INDEX IF NOT EXISTS idx_player_fame_sport ON player_fame (sport);

ALTER TABLE player_fame ENABLE ROW LEVEL SECURITY;
CREATE POLICY "player_fame_select" ON player_fame FOR SELECT USING (true);
