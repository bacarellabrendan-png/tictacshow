-- READ-ONLY. Security checks for migration 017 that can't be read through the API.
-- Pure ASCII. Returns one row; expected values are in the comments.

SELECT
  (SELECT bool_and(relrowsecurity) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname IN (
      'backup_20260925_player_facts_017', 'fact_deletions_017', 'players', 'player_aliases',
      'stage_players', 'stage_player_aliases', 'stage_fact_owners'))            AS rls_on,             -- true
  (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname IN (
      'backup_20260925_player_facts_017', 'fact_deletions_017', 'players', 'player_aliases',
      'stage_players', 'stage_player_aliases', 'stage_fact_owners'))            AS tables_found,       -- 7
  (SELECT count(*) FROM information_schema.role_table_grants
    WHERE table_schema = 'public'
      AND table_name IN ('backup_20260925_player_facts_017', 'fact_deletions_017', 'players', 'player_aliases',
                         'stage_players', 'stage_player_aliases', 'stage_fact_owners')
      AND grantee IN ('anon', 'authenticated'))                                 AS browser_grants,     -- 0
  (SELECT count(*) FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('backup_20260925_player_facts_017', 'fact_deletions_017', 'players', 'player_aliases',
                        'stage_players', 'stage_player_aliases', 'stage_fact_owners')) AS policies,          -- 0
  (SELECT count(*) FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'player_facts'
      AND column_name IN ('player_id', 'owner_method'))                         AS owner_columns;      -- 2
