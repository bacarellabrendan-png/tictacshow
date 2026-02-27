-- ─── TIC TAC SHOW — SUPABASE SCHEMA ────────────────────────────────────────
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE throughout.

-- ── GAMES ────────────────────────────────────────────────────────────────────
create table if not exists public.games (
  id              uuid        primary key default gen_random_uuid(),
  invite_code     text        unique not null,

  -- game config (set at creation, never changes)
  difficulty      text        not null default 'beginner',
  cells           jsonb       not null default '[]',
  -- cells is a 9-element array: [{ questionKey: "q_nba_champ" }, ...]

  -- players
  player1_id      uuid        references auth.users not null,
  player1_name    text        not null,
  player2_id      uuid        references auth.users,
  player2_name    text,

  -- live state
  phase           text        not null default 'waiting',
  -- waiting | choosing | answering | gameover

  board           jsonb       not null default '["null","null","null","null","null","null","null","null","null"]',
  -- 9-element array: "null" = empty, "p1" = owned by p1, "p2" = owned by p2, "reset" = briefly after a tie

  scores          jsonb       not null default '{"p1":0,"p2":0}',
  win_line        jsonb       not null default '[]',
  active_cell     integer,            -- index 0-8 of the square being played right now
  choosing_player text        default 'p1', -- p1 | p2
  winner          text,               -- p1 | p2 | draw

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── MOVES ────────────────────────────────────────────────────────────────────
create table if not exists public.moves (
  id           uuid        primary key default gen_random_uuid(),
  game_id      uuid        references public.games on delete cascade not null,
  cell_index   integer     not null,
  question_key text        not null,

  -- answers (written independently by each player)
  p1_answer    text,
  p2_answer    text,
  p1_valid     boolean,
  p2_valid     boolean,
  p1_rarity    integer,    -- % popularity of p1's answer (lower = rarer = better)
  p2_rarity    integer,

  result       text,       -- p1 | p2 | reset (set once both answers are in)

  created_at   timestamptz not null default now()
);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists games_set_updated_at on public.games;
create trigger games_set_updated_at
  before update on public.games
  for each row execute function public.set_updated_at();

-- ── ROW-LEVEL SECURITY ───────────────────────────────────────────────────────
alter table public.games enable row level security;
alter table public.moves enable row level security;

-- Games: anyone authenticated can read; only player1 can create; players can update their own game
drop policy if exists "games_select" on public.games;
create policy "games_select" on public.games
  for select using (true);

drop policy if exists "games_insert" on public.games;
create policy "games_insert" on public.games
  for insert with check (auth.uid() = player1_id);

drop policy if exists "games_update" on public.games;
create policy "games_update" on public.games
  for update using (
    auth.uid() = player1_id
    or auth.uid() = player2_id
    or (phase = 'waiting' and player2_id is null and auth.uid() is not null)
  );

-- Moves: any authenticated user can read / insert / update
drop policy if exists "moves_select" on public.moves;
create policy "moves_select" on public.moves
  for select using (true);

drop policy if exists "moves_insert" on public.moves;
create policy "moves_insert" on public.moves
  for insert with check (auth.uid() is not null);

drop policy if exists "moves_update" on public.moves;
create policy "moves_update" on public.moves
  for update using (auth.uid() is not null);
