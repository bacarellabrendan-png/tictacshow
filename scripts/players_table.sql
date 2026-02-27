-- Run this in Supabase SQL Editor to create the players table
-- This enables the autocomplete to search from comprehensive player databases

-- Enable trigram extension for fast ILIKE search
create extension if not exists pg_trgm;

-- Create players table
create table if not exists public.players (
  id      bigint generated always as identity primary key,
  name    text    not null,
  sport   text    not null,
  unique (name, sport)
);

-- Trigram index for fast substring search
create index if not exists players_name_trgm_idx
  on public.players using gin (name gin_trgm_ops);

-- Also add a simple index on sport for filtered queries
create index if not exists players_sport_idx
  on public.players (sport);

-- RLS: anyone can read, no one writes via API
alter table public.players enable row level security;

drop policy if exists "players_select" on public.players;
create policy "players_select" on public.players
  for select using (true);
