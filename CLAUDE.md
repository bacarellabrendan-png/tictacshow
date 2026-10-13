# Tic Tac Show: standing rules for Claude

Tic Tac Show (playtictacshow.com): React/Vite on Vercel, Supabase backend. These rules come from the owner and
override defaults. Detailed history lives in Claude's memory notes; this file is the rulebook.

## Working style
- Work independently: chain the planned steps, make reasonable calls yourself, proceed, and report, listing every
  decision so it can be overridden.
- Stop for the owner's approval ONLY before:
  1. pushing to production (any push to `master`);
  2. deleting data (including unowning facts, and deletes inside a migration);
  3. judgment calls about what counts as a correct answer (new inclusion or exclusion rules for facts).
  Everything else (writing, testing and running additive migrations, previews, analysis): proceed and report.
- Report outcomes faithfully: failed checks, skipped steps and blocked sources are reported, never glossed over.
- Independent review before reporting: before bringing the owner any combined report or migration, have a separate
  reviewer agent (one that has not seen Claude's reasoning) check it. Give it the plan, the migration(s) and these
  rules, and ask it to look specifically for:
  1. decisions that conflict with an earlier decision, including a standing check of how relocated franchises are
     credited: the original Winnipeg Jets (1972-96, now today's Jets), Atlanta Thrashers/today's Jets, Hartford
     Whalers, Quebec Nordiques, Minnesota North Stars, ABA/WHA years, and pre-NBA (NBL) years, each against the
     recorded decision AND the league's current official records;
  2. facts about famous players that look wrong (a real All-Star or MVP being deleted, a fake one being added);
  3. recent or surprising facts resting on a single source;
  4. anything that would accept a wrong answer or reject a correct one.
  Fix what it finds, and include a short "Reviewer findings" section in each report.
- Time-sensitive facts: Claude's training knowledge ends mid-2026, so anything that may have changed since
  (franchise histories, transfers, awards, rule changes) is checked against CURRENT sources, the league's own
  records first, before it is stated or relied on, by Claude and by the reviewer (give the reviewer web access).
  Record each such decision here with its source and date, so later sessions don't fall back on stale memory.

## Secrets
- Never print the Supabase service key in commands or output. Read it from the env var `SUPABASE_SERVICE_KEY`.
- `VERCEL_AUTOMATION_BYPASS_SECRET` is sent only as a header to the preview host and is never printed.

## Git and deploys
- Every push to `master` is a Vercel production deploy. Each push to master needs explicit approval.
- No commit or deploy until the owner has seen the verification results.
- Feature work happens in the worktree `C:\Users\bacar\tictacshow-idcheck`. Don't switch its branch while a
  migration from it is pending.
- Preview before production: every app change is tested on a Vercel preview first.
- Previews: push the feature branch, then find the preview with `gh api repos/bacarellabrendan-png/tictacshow/deployments?sha=<sha>`.
  Test with temporary accounts (`tts_test_N`), back up and delete their data afterwards.
- The main folder's `src/App.jsx` holds the owner's uncommitted password-reset work. Never commit it with other work.
- After a migration is applied live, add its SQL file in a separate "records" commit.

## Migrations
- Numbered files in `supabase/migrations/` (worktree), one per change, always written to disk and kept as the record.
- Claude runs them directly via the env var `SUPABASE_DB_URL` (set by the owner; never print it or paste it anywhere).
  Process: test on the local replica, then run the body in one connection, then run the CHECKS in a FRESH connection
  opened READ ONLY, and compare them to the `-- EXPECTED:` line automatically. On any mismatch, stop and report
  (do not improvise fixes on live). Log every run in the scratchpad.
- A migration that deletes data (or unowns facts) needs the owner's approval before it runs.
- If handing a file to the owner instead, give the full path and `Get-Content -Raw "<path>" | Set-Clipboard`, after
  confirming the file exists on disk via PowerShell.
- PURE ASCII, comments included. Non-ASCII goes in as `U&'\XXXX'` escapes.
- The first statement after `BEGIN` is an already-applied guard that raises
  `Migration 0NN is already applied (...). Nothing changed.` Only then create the backup.
- Before any data change, back up the affected rows or tables. Every table a migration creates (backups included)
  gets `ENABLE ROW LEVEL SECURITY` and `REVOKE ALL ... FROM anon, authenticated`.
- No temp tables. Split large migrations into parts that finish well within the editor's time limit.
- Never create or move extensions (pg_trgm is in `public`, unaccent in `extensions`).
- Post-COMMIT checks run alone in a fresh session, using only permanent tables, with an `-- EXPECTED:` line.
  Include a commented-out rollback.
- Test every migration first on a local PGlite replica of live data: the run, the checks, a second run (must hit the
  guard) and the rollback (must restore exactly).
- Delete only what complete sources prove wrong for every namesake. Otherwise move the fact to the right person
  or leave it unowned.

## Sources and rate limits
- Sports-Reference: respect its rate limits. If it blocks, stop and tell the owner; never work around it or retry.
- Wikimedia (Wikipedia, Wikidata, pageviews): identify with our User-Agent, at most 1 request per second across all
  Wikimedia hosts, stop immediately on 429/403 or any rate-limit response and tell the owner.
- Any source that blocks (403/429): stop using it, report it, no workarounds. (ESPN's API refused on 12 Oct 2026.)
- Sources that work: Wikidata, Wikipedia infoboxes, Lahman, nflverse, MLB Stats API (statsapi.mlb.com),
  NHL API (api-web.nhle.com), Fantasy Premier League (official PL).

## Data rules (owner decisions)
- `played_for_team` means a playing stint. Source of truth: the Wikipedia infobox playing or senior career.
  - Excluded: youth spells, reserve or B sides, manager or coaching only, draft only, NFL offseason or
    practice squad only, and soccer stints with 0 league appearances. Loans count.
- A stint that starts in the current year (2026) needs a second independent source (club or league site, or a
  major outlet) and at least one game played. Otherwise hold it.
- Franchise history counts, per the leagues' CURRENT official records (check them, not memory): relocations
  (SuperSonics -> Thunder, North Stars -> Stars, Thrashers -> Jets, and so on), plus ABA and WHA years for franchises
  that joined the NBA or NHL (Nets, Pacers, Spurs, Nuggets; Oilers, Nordiques -> Avalanche, Whalers -> Hurricanes).
  - Winnipeg: the original Winnipeg Jets (WHA 1972-79, NHL 1979-96) count for TODAY's Jets. The NHL consolidated
    that history into the current Jets on 24 Sep 2026 (NHL.com announcement; NHL stats API franchise 35 "Winnipeg
    Jets", first season 1979-80, teams WIN/ATL/WPG). The Coyotes category covers Phoenix/Arizona 1996-2024 only.
  - Pre-NBA NBL years don't count (NBA history starts with the BAA, 1946-47).
  - MLB franchises start where MLB's own records start them (MLB Stats API firstYearOfPlay), not where Lahman's
    franchID does: the Yankees from 1903 (the 1901-02 Baltimore Orioles don't count), the Cardinals from 1892
    (American Association St. Louis years before 1892 don't count), the Orioles from 1901 (1901 Milwaukee Brewers
    count; owner decision 13 Oct 2026).
  - Defunct namesakes never count for today's team: original Ottawa Senators (1917-34), Baltimore Bullets (1944-54),
    Denver Nuggets (1948-50), Baltimore Colts (1947-50), Dallas Texans (NFL, 1952), 19th-century Baltimore Orioles,
    Washington Senators/Nationals and American Association Philadelphia Athletics.
- Women's football is not part of the game (men's football only). Women's footballers own no soccer facts; if
  women's soccer is ever added, it will be a separate sport.
- MLB MVP means the BBWAA award (1931 on). NFL DPOY means the AP award. World Series winners use the on-the-roster
  definition. Negro League East-West All-Stars are not included.
- Detail lines in autocomplete and the chooser show years and position, no team. Namesakes are separated by birth year.
- New players are added only if notable (honors, or real page views), with a players row, aliases, facts and prior data.

## Rarity
- Production prior: `get_square_prior_v2_1` (v2 with the geometric mean of tenures on team x team squares),
  blended with real answers as (count + 50 * prior/100) / (total + 50).
- After any change to facts, run `node tests/check_prior.mjs` against live (every square must have a server prior).

## Infrastructure
- Supabase free plan pauses after about 7 days idle. The GitHub Actions keep-alive
  (`.github/workflows/supabase-keep-alive.yml`) runs every 3 days. Remove it after the Pro upgrade.
