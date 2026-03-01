#!/usr/bin/env node
// Seed position facts into player_facts using Wikidata P413.
// For every player in our question pools, query Wikidata for their position
// and insert the appropriate fact (nba_center, nba_forward, nba_guard, etc.)
//
// Usage: node scripts/seed_positions.mjs <SUPABASE_SERVICE_ROLE_KEY>

import https from 'https';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/seed_positions.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  process.exit(1);
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function sparqlQuery(query) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ query, format: 'json' });
    const url = new URL(`https://query.wikidata.org/sparql?${params}`);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Accept': 'application/sparql-results+json',
        'User-Agent': 'TicTacShowSeeder/1.0 (https://tictacshow.com)',
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(text)); }
          catch (e) { reject(new Error(`SPARQL parse error: ${text.slice(0, 200)}`)); }
        } else {
          reject(new Error(`SPARQL ${res.statusCode}: ${text.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function postBatch(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url = new URL('/rest/v1/player_facts?on_conflict=player_name,sport,fact_type,fact_value', SUPABASE_URL);
    const req = https.request({
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'resolution=ignore-duplicates',
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, body: text });
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── LOAD ALL PLAYERS FROM POOLS ───────────────────────────────────────────────

async function loadAllPlayers() {
  const srcDir = path.resolve(__dirname, '..', 'src', 'data');
  const toURL = (file) => pathToFileURL(path.join(srcDir, file)).href;
  const { NBA_POOLS }    = await import(toURL('questions_nba.js'));
  const { NFL_POOLS }    = await import(toURL('questions_nfl.js'));
  const { MLB_POOLS }    = await import(toURL('questions_mlb.js'));
  const { NHL_POOLS }    = await import(toURL('questions_nhl.js'));
  const { SOCCER_POOLS } = await import(toURL('questions_soccer.js'));
  const { MULTI_POOLS }  = await import(toURL('questions_multi.js'));

  const allPools = { ...NBA_POOLS, ...NFL_POOLS, ...MLB_POOLS, ...NHL_POOLS, ...SOCCER_POOLS, ...MULTI_POOLS };

  // Collect unique players per sport
  const playersBySport = {};
  for (const pool of Object.values(allPools)) {
    const sport = pool.sport;
    if (!playersBySport[sport]) playersBySport[sport] = new Set();
    for (const a of pool.answers || []) {
      playersBySport[sport].add(a.name);
    }
  }

  return playersBySport;
}

// ─── WIKIDATA POSITION QUERIES ─────────────────────────────────────────────────

// Maps: Wikidata position entity → our fact_type(s)
const POSITION_MAP = {
  NBA: [
    // [Wikidata QID, Wikidata label, fact_types to assign]
    ['Q212413', 'Center',          ['nba_center']],
    ['Q212414', 'Power forward',   ['nba_forward']],
    ['Q212415', 'Small forward',   ['nba_forward']],
    ['Q212411', 'Shooting guard',  ['nba_guard']],
    ['Q212412', 'Point guard',     ['nba_guard', 'nba_point_guard']],
  ],
  NFL: [
    ['Q622747', 'Quarterback',      ['nfl_quarterback']],
    ['Q622748', 'Running back',     ['nfl_running_back']],
    ['Q622749', 'Wide receiver',    ['nfl_wide_receiver']],
    ['Q622751', 'Tight end',        ['nfl_tight_end']],
    ['Q622756', 'Defensive end',    ['nfl_defensive_line']],
    ['Q622757', 'Defensive tackle', ['nfl_defensive_line']],
    ['Q622758', 'Linebacker',       ['nfl_linebacker']],
    ['Q622759', 'Cornerback',       ['nfl_defensive_back']],
    ['Q622760', 'Safety',           ['nfl_defensive_back']],
    ['Q622753', 'Offensive tackle', ['nfl_offensive_line']],
    ['Q622754', 'Offensive guard',  ['nfl_offensive_line']],
    ['Q622755', 'Center (football)','nfl_offensive_line'],
    ['Q622745', 'Kicker',           ['nfl_kicker']],
    ['Q622746', 'Punter',           ['nfl_punter']],
  ],
  MLB: [
    ['Q691708', 'Pitcher',    ['mlb_pitcher']],
    ['Q691695', 'Catcher',    ['mlb_catcher']],
    ['Q691687', 'First baseman', ['mlb_infielder']],
    ['Q691700', 'Second baseman',['mlb_infielder']],
    ['Q691703', 'Shortstop',  ['mlb_infielder']],
    ['Q691706', 'Third baseman',['mlb_infielder']],
    ['Q18195092','Outfielder', ['mlb_outfielder']],
    ['Q691690', 'Left fielder',['mlb_outfielder']],
    ['Q691697', 'Center fielder',['mlb_outfielder']],
    ['Q691692', 'Right fielder',['mlb_outfielder']],
    ['Q5765085','Designated hitter',['mlb_designated_hitter']],
  ],
  NHL: [
    ['Q127950', 'Goaltender',   ['nhl_goalie']],
    ['Q127955', 'Defenceman',   ['nhl_defenseman']],
    ['Q127954', 'Centre (ice hockey)',  ['nhl_forward', 'nhl_center']],
    ['Q127953', 'Winger',       ['nhl_forward', 'nhl_winger']],
    ['Q1143898','Left winger',  ['nhl_forward', 'nhl_winger']],
    ['Q1143896','Right winger', ['nhl_forward', 'nhl_winger']],
  ],
  Soccer: [
    ['Q193592', 'Goalkeeper',   ['soccer_goalkeeper']],
    ['Q336286', 'Defender',     ['soccer_defender']],
    ['Q6648722','Centre-back',  ['soccer_defender']],
    ['Q6648724','Full-back',    ['soccer_defender']],
    ['Q193593', 'Midfielder',   ['soccer_midfielder']],
    ['Q6648727','Defensive midfielder',['soccer_midfielder']],
    ['Q6648728','Attacking midfielder',['soccer_midfielder']],
    ['Q280658', 'Forward (soccer)',['soccer_forward']],
    ['Q6648729','Winger (soccer)', ['soccer_forward']],
    ['Q280658', 'Striker',      ['soccer_forward']],
  ],
};

async function queryPositionPlayers(wikidataQID, label) {
  const query = `
SELECT DISTINCT ?playerLabel WHERE {
  ?player wdt:P413 wd:${wikidataQID} .
  ?player wdt:P31 wd:Q5 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}`;
  try {
    const result = await sparqlQuery(query);
    const names = result.results.bindings
      .map(b => b.playerLabel.value)
      .filter(name => !/^Q\d+$/.test(name));
    return names;
  } catch (err) {
    console.error(`  ERROR querying ${label} (${wikidataQID}): ${err.message}`);
    return [];
  }
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  TicTacShow — Seed Position Facts');
  console.log('═══════════════════════════════════════════════════════════\n');

  const playersBySport = await loadAllPlayers();

  for (const [sport, players] of Object.entries(playersBySport)) {
    console.log(`  ${sport}: ${players.size} unique players`);
  }

  const allRows = [];
  const matched = {};   // sport → count of players matched
  const unmatched = {}; // sport → list of unmatched player names

  for (const [sport, positions] of Object.entries(POSITION_MAP)) {
    const ourPlayers = playersBySport[sport];
    if (!ourPlayers || ourPlayers.size === 0) {
      console.log(`\n  Skipping ${sport} (no players in pools)`);
      continue;
    }

    console.log(`\n═══ ${sport}: Querying ${positions.length} position categories ═══\n`);

    // Build a lowercase lookup set for matching
    const ourPlayersLower = new Map();
    for (const name of ourPlayers) {
      ourPlayersLower.set(name.toLowerCase(), name);
    }

    const playerPositions = new Map(); // playerName → Set of fact_types
    let queryNum = 0;

    for (const [qid, label, factTypes] of positions) {
      queryNum++;
      const facts = Array.isArray(factTypes) ? factTypes : [factTypes];

      const wikidataPlayers = await queryPositionPlayers(qid, label);
      let matchCount = 0;

      for (const wdName of wikidataPlayers) {
        const ourName = ourPlayersLower.get(wdName.toLowerCase());
        if (ourName) {
          matchCount++;
          if (!playerPositions.has(ourName)) playerPositions.set(ourName, new Set());
          for (const ft of facts) {
            playerPositions.get(ourName).add(ft);
          }
        }
      }

      console.log(`  [${queryNum}/${positions.length}] ${label.padEnd(22)} Wikidata: ${String(wikidataPlayers.length).padStart(5)} | Matched: ${matchCount}`);
      await sleep(2000);
    }

    // Count matched vs unmatched
    const matchedPlayers = new Set(playerPositions.keys());
    const unmatchedPlayers = [];
    for (const name of ourPlayers) {
      if (!matchedPlayers.has(name)) {
        unmatchedPlayers.push(name);
      }
    }

    matched[sport] = matchedPlayers.size;
    unmatched[sport] = unmatchedPlayers;

    console.log(`\n  ${sport} summary: ${matchedPlayers.size}/${ourPlayers.size} players matched (${unmatchedPlayers.length} unmatched)`);

    // Build rows
    for (const [playerName, factTypes] of playerPositions) {
      for (const factType of factTypes) {
        allRows.push({ player_name: playerName, sport, fact_type: factType, fact_value: 'true' });
      }
    }
  }

  // Upload
  console.log(`\n═══ UPLOADING ${allRows.length} position facts ═══\n`);

  let uploaded = 0;
  let errors = 0;
  const BATCH_SIZE = 500;
  for (let i = 0; i < allRows.length; i += BATCH_SIZE) {
    const batch = allRows.slice(i, i + BATCH_SIZE);
    const result = await postBatch(batch);
    if (result.ok) {
      uploaded += batch.length;
      process.stdout.write(`  Uploaded ${uploaded}/${allRows.length}\r`);
    } else {
      errors++;
      console.error(`  Batch error (${result.status}): ${(result.body || '').slice(0, 200)}`);
    }
  }
  console.log(`\n  Done: ${uploaded} uploaded, ${errors} errors`);

  // Report unmatched players
  console.log('\n═══ UNMATCHED PLAYERS (no Wikidata position found) ═══\n');
  for (const [sport, names] of Object.entries(unmatched)) {
    if (names.length > 0) {
      console.log(`  ${sport} (${names.length} unmatched):`);
      for (const name of names.slice(0, 30)) {
        console.log(`    - ${name}`);
      }
      if (names.length > 30) console.log(`    ... and ${names.length - 30} more`);
      console.log('');
    }
  }

  console.log('═══ DONE ═══\n');
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
