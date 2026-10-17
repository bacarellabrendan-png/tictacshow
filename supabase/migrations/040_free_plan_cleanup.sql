-- Migration 040: free-plan cleanup. Drops 10 old backup/archive/staging tables and the unused, publicly writable
-- player_facts_championship_staging table (security issue 1). Owner approval: 16 Oct 2026.
-- PURE ASCII. Why: the free plan goes READ-ONLY above 500 MB; the database measured 555 MB on 16 Oct 2026.
--   Nothing references these tables (no function, view, foreign key, policy, trigger, grant to the app, or src code);
--   an independent review confirmed it. DROP without CASCADE, so any unexpected dependency stops the migration.
--   Owned sequences go with them (answer_stats_id_seq, players_id_seq, player_facts_championship_staging_id_seq);
--   none is used elsewhere (players uses players_id_seq1).
-- BACKUP: every table was exported read-only before this migration, rows counted and checked:
--   C:/Users/bacar/tictacshow-backups/2026-10-16_free-plan-cleanup  (<table>.jsonl.gz, manifest.json, schema.json)
-- 0. GUARD first (already applied; then every table present with exactly the exported row count).

BEGIN;

DO $mig$
DECLARE n BIGINT;
BEGIN
  IF to_regclass('public.archive_20260928_answer_stats') IS NULL THEN RAISE EXCEPTION 'Migration 040 is already applied (archive_20260928_answer_stats is gone). Nothing changed.'; END IF;
  SELECT count(*) INTO n FROM public.archive_20260928_answer_stats;
  IF n <> 459444 THEN RAISE EXCEPTION '040 guard: archive_20260928_answer_stats has % rows, the export has 459444. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.backup_20260924_answer_stats;
  IF n <> 474813 THEN RAISE EXCEPTION '040 guard: backup_20260924_answer_stats has % rows, the export has 474813. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.players_legacy_20260925;
  IF n <> 92430 THEN RAISE EXCEPTION '040 guard: players_legacy_20260925 has % rows, the export has 92430. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.stage_fact_owners;
  IF n <> 214437 THEN RAISE EXCEPTION '040 guard: stage_fact_owners has % rows, the export has 214437. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.stage_players;
  IF n <> 77008 THEN RAISE EXCEPTION '040 guard: stage_players has % rows, the export has 77008. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.stage_player_aliases;
  IF n <> 138962 THEN RAISE EXCEPTION '040 guard: stage_player_aliases has % rows, the export has 138962. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.stage_player_details;
  IF n <> 77006 THEN RAISE EXCEPTION '040 guard: stage_player_details has % rows, the export has 77006. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.backup_20260925_player_facts_017;
  IF n <> 225039 THEN RAISE EXCEPTION '040 guard: backup_20260925_player_facts_017 has % rows, the export has 225039. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.backup_20260926_player_aliases_018c;
  IF n <> 138962 THEN RAISE EXCEPTION '040 guard: backup_20260926_player_aliases_018c has % rows, the export has 138962. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.backup_20260926_players_018b;
  IF n <> 77008 THEN RAISE EXCEPTION '040 guard: backup_20260926_players_018b has % rows, the export has 77008. Nothing changed.', n; END IF;
  SELECT count(*) INTO n FROM public.player_facts_championship_staging;
  IF n <> 7566 THEN RAISE EXCEPTION '040 guard: player_facts_championship_staging has % rows, the export has 7566. Nothing changed.', n; END IF;
END $mig$;

DROP TABLE public.archive_20260928_answer_stats;
DROP TABLE public.backup_20260924_answer_stats;
DROP TABLE public.players_legacy_20260925;
DROP TABLE public.stage_fact_owners;
DROP TABLE public.stage_players;
DROP TABLE public.stage_player_aliases;
DROP TABLE public.stage_player_details;
DROP TABLE public.backup_20260925_player_facts_017;
DROP TABLE public.backup_20260926_player_aliases_018c;
DROP TABLE public.backup_20260926_players_018b;
DROP TABLE public.player_facts_championship_staging;

COMMIT;

-- --- CHECKS (run after COMMIT, alone, in a fresh session; one row) ---------------------------------
SELECT
  (SELECT count(*) FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname IN ('archive_20260928_answer_stats', 'backup_20260924_answer_stats', 'players_legacy_20260925', 'stage_fact_owners', 'stage_players', 'stage_player_aliases', 'stage_player_details', 'backup_20260925_player_facts_017', 'backup_20260926_player_aliases_018c', 'backup_20260926_players_018b', 'player_facts_championship_staging')) AS tables_left,
  (SELECT sum(pg_database_size(datname)) < 400 * 1024 * 1024 FROM pg_database) AS under_400_mb,
  (SELECT count(*) FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relkind = 'r' AND relname IN ('player_facts', 'players', 'player_aliases', 'games', 'moves', 'answer_submissions', 'feedback', 'fact_deletions_017')) AS live_tables_present;
-- EXPECTED: tables_left = 0; under_400_mb = true; live_tables_present = 8

-- --- ROLLBACK (only if needed) ------------------------------------------------------------------------
-- The rows are no longer in the database; restore them from the export. The script re-creates each table with its
-- columns and rows, then turns RLS on and revokes browser access (tested on a local replica):
--   node <scratchpad>/dbtool/restore_tables.mjs "C:/Users/bacar/tictacshow-backups/2026-10-16_free-plan-cleanup" archive_20260928_answer_stats backup_20260924_answer_stats players_legacy_20260925 stage_fact_owners stage_players stage_player_aliases stage_player_details backup_20260925_player_facts_017 backup_20260926_player_aliases_018c backup_20260926_players_018b player_facts_championship_staging
