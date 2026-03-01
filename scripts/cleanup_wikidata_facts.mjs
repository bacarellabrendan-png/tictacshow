#!/usr/bin/env node
// Delete unverified Wikidata facts from player_facts per Option 3:
// - DELETE: HIGH true errors (cross-sport contamination)
// - DELETE: LOW played_for_team facts (unknown players, can't verify)
// - DELETE: Specific bad award facts (garbled names, wrong award type)
// - KEEP: MEDIUM facts (known players, likely correct)
// - KEEP: LOW award facts (well-documented public records)
//
// Usage: node scripts/cleanup_wikidata_facts.mjs <SUPABASE_SERVICE_ROLE_KEY>

import https from 'https';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/cleanup_wikidata_facts.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  process.exit(1);
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function supabaseGet(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, SUPABASE_URL);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'Authorization': `Bearer ${SERVICE_KEY}`, 'apikey': SERVICE_KEY },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch { resolve([]); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function supabaseDelete(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, SUPABASE_URL);
    const req = https.request({
      method: 'DELETE',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'Authorization': `Bearer ${SERVICE_KEY}`, 'apikey': SERVICE_KEY },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString() });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── LOAD HARDCODED POOLS ──────────────────────────────────────────────────────

async function loadHardcodedPools() {
  const srcDir = path.resolve(__dirname, '..', 'src', 'data');
  const toURL = (file) => pathToFileURL(path.join(srcDir, file)).href;
  const { NBA_POOLS }    = await import(toURL('questions_nba.js'));
  const { NFL_POOLS }    = await import(toURL('questions_nfl.js'));
  const { MLB_POOLS }    = await import(toURL('questions_mlb.js'));
  const { NHL_POOLS }    = await import(toURL('questions_nhl.js'));
  const { SOCCER_POOLS } = await import(toURL('questions_soccer.js'));
  const { MULTI_POOLS }  = await import(toURL('questions_multi.js'));
  return { ...NBA_POOLS, ...NFL_POOLS, ...MLB_POOLS, ...NHL_POOLS, ...SOCCER_POOLS, ...MULTI_POOLS };
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══ Cleanup: Option 3 (Selective) ═══\n');

  // 1. Load hardcoded pools
  const allPools = await loadHardcodedPools();

  // Build trusted set and known-players-per-sport
  const trusted = new Set();
  const knownPlayers = new Map(); // sport → Set of player names

  for (const pool of Object.values(allPools)) {
    const sport = pool.sport;
    if (!knownPlayers.has(sport)) knownPlayers.set(sport, new Set());
    for (const answer of pool.answers || []) {
      knownPlayers.get(sport).add(answer.name);
      for (const rule of pool.rules || []) {
        trusted.add(`${answer.name}|${sport}|${rule.fact_type}|${rule.fact_value || 'true'}`);
      }
    }
  }

  // 2. Fetch all facts
  console.log('Fetching all player_facts...');
  const allFacts = [];
  let offset = 0;
  while (true) {
    const batch = await supabaseGet(
      `/rest/v1/player_facts?select=id,player_name,sport,fact_type,fact_value&order=id&offset=${offset}&limit=1000`
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    allFacts.push(...batch);
    offset += batch.length;
    if (batch.length < 1000) break;
  }
  console.log(`  ${allFacts.length} total facts\n`);

  // 3. Classify Wikidata-only facts and decide what to delete
  const toDelete = [];
  const toKeep = [];

  // Known bad award facts (garbled names, wrong award category)
  const badAwardFacts = new Set([
    'Fernando landero',  // garbled name
    'Artūrs Irbe',       // goalie, Norris Trophy is for defensemen
    'Aitana Bonmatí',    // women's Ballon d'Or, our game is men's
  ]);

  // HIGH true errors: cross-sport contamination IDs
  // Larry Robinson (NHL) in NBA, Jim Brown (NFL) in Soccer
  const highErrorPlayers = new Map([
    ['Larry Robinson|NBA', 'NHL defenseman, not NBA player'],
    ['Jim Brown|Soccer', 'NFL running back, not soccer player'],
  ]);

  let hardcodedCount = 0;
  let highDeleteCount = 0;
  let lowTeamDeleteCount = 0;
  let badAwardDeleteCount = 0;
  let mediumKeepCount = 0;
  let lowAwardKeepCount = 0;

  for (const fact of allFacts) {
    const key = `${fact.player_name}|${fact.sport}|${fact.fact_type}|${fact.fact_value}`;

    // Skip hardcoded (trusted) facts — never delete
    if (trusted.has(key)) {
      hardcodedCount++;
      continue;
    }

    // This is a Wikidata-only fact. Classify it.
    const playerSportKey = `${fact.player_name}|${fact.sport}`;
    const isKnownInSport = knownPlayers.get(fact.sport)?.has(fact.player_name) || false;

    // HIGH: cross-sport errors
    if (highErrorPlayers.has(playerSportKey)) {
      toDelete.push({ ...fact, reason: `HIGH: ${highErrorPlayers.get(playerSportKey)}` });
      highDeleteCount++;
      continue;
    }

    // Bad award facts (specific known errors)
    if (badAwardFacts.has(fact.player_name)) {
      toDelete.push({ ...fact, reason: `BAD_AWARD: Known error for ${fact.player_name}` });
      badAwardDeleteCount++;
      continue;
    }

    // MEDIUM: known player in this sport, unverified fact → KEEP
    if (isKnownInSport) {
      toKeep.push({ ...fact, reason: 'MEDIUM: Known player, likely correct' });
      mediumKeepCount++;
      continue;
    }

    // LOW: unknown player
    if (fact.fact_type === 'played_for_team') {
      // LOW team facts → DELETE
      toDelete.push({ ...fact, reason: 'LOW_TEAM: Unknown player, cannot verify team' });
      lowTeamDeleteCount++;
    } else {
      // LOW award facts → KEEP (well-documented public records)
      toKeep.push({ ...fact, reason: 'LOW_AWARD: Award fact, well-documented' });
      lowAwardKeepCount++;
    }
  }

  // 4. Report
  console.log('── CLASSIFICATION ──\n');
  console.log(`  Hardcoded (untouched):         ${hardcodedCount}`);
  console.log(`  MEDIUM kept (known players):   ${mediumKeepCount}`);
  console.log(`  LOW awards kept:               ${lowAwardKeepCount}`);
  console.log(`  HIGH errors to delete:         ${highDeleteCount}`);
  console.log(`  Bad award facts to delete:     ${badAwardDeleteCount}`);
  console.log(`  LOW team facts to delete:      ${lowTeamDeleteCount}`);
  console.log(`  ────────────────────────────`);
  console.log(`  TOTAL TO DELETE:               ${toDelete.length}`);
  console.log(`  TOTAL TO KEEP (Wikidata):      ${toKeep.length}\n`);

  // Per-sport deletion breakdown
  const deleteBySport = {};
  for (const d of toDelete) {
    deleteBySport[d.sport] = (deleteBySport[d.sport] || 0) + 1;
  }
  console.log('  Deletions by sport:');
  for (const [sport, count] of Object.entries(deleteBySport).sort()) {
    console.log(`    ${sport}: ${count}`);
  }

  // Show HIGH and BAD_AWARD deletions explicitly
  console.log('\n── HIGH + BAD_AWARD DELETIONS (explicit) ──\n');
  for (const d of toDelete.filter(d => d.reason.startsWith('HIGH') || d.reason.startsWith('BAD'))) {
    console.log(`  [${d.sport}] "${d.player_name}" — ${d.fact_type}: ${d.fact_value} (id: ${d.id})`);
    console.log(`    ${d.reason}`);
  }

  // 5. Execute deletions in batches
  console.log('\n── EXECUTING DELETIONS ──\n');

  const deleteIds = toDelete.map(d => d.id);
  const BATCH = 200; // delete in batches of 200 IDs
  let deleted = 0;
  let errors = 0;

  for (let i = 0; i < deleteIds.length; i += BATCH) {
    const batch = deleteIds.slice(i, i + BATCH);
    const idList = batch.join(',');
    const result = await supabaseDelete(`/rest/v1/player_facts?id=in.(${idList})`);
    if (result.status >= 200 && result.status < 300) {
      deleted += batch.length;
      process.stdout.write(`  Deleted ${deleted}/${deleteIds.length}\r`);
    } else {
      errors++;
      console.error(`  Batch error (${result.status}): ${result.body.slice(0, 200)}`);
    }
  }

  console.log(`\n  Done: ${deleted} facts deleted, ${errors} errors`);

  // 6. Final count
  const finalUrl = '/rest/v1/player_facts?select=id&limit=1';
  const finalCount = await new Promise((resolve, reject) => {
    const url = new URL(finalUrl, SUPABASE_URL);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'count=exact',
        'Range-Unit': 'items',
        'Range': '0-0',
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const cr = res.headers['content-range'] || '';
        resolve(cr.split('/')[1] || '?');
      });
    });
    req.on('error', reject);
    req.end();
  });

  console.log(`\n── FINAL STATE ──\n`);
  console.log(`  player_facts rows remaining: ${finalCount}`);
  console.log(`  Composition:`);
  console.log(`    Hardcoded (trusted):        ${hardcodedCount}`);
  console.log(`    Wikidata awards (kept):     ${mediumKeepCount + lowAwardKeepCount}`);
  console.log(`    Wikidata teams (deleted):   ${lowTeamDeleteCount + highDeleteCount + badAwardDeleteCount} removed`);

  console.log('\n═══ CLEANUP COMPLETE ═══\n');
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
