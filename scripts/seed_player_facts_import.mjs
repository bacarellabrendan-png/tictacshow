#!/usr/bin/env node
// Import player_facts rows directly into Supabase.
// Usage: node scripts/seed_player_facts_import.mjs <SUPABASE_SERVICE_ROLE_KEY>
//
// Prerequisites:
// 1. Run scripts/player_facts_table.sql in Supabase Dashboard (creates table + RPC)
// 2. Pass service_role key as first CLI argument (or set SUPABASE_SERVICE_KEY env var)

import https from 'https';

// Import all question pools
import { NBA_POOLS } from "../src/data/questions_nba.js";
import { NFL_POOLS } from "../src/data/questions_nfl.js";
import { MLB_POOLS } from "../src/data/questions_mlb.js";
import { NHL_POOLS } from "../src/data/questions_nhl.js";
import { SOCCER_POOLS } from "../src/data/questions_soccer.js";
import { MULTI_POOLS } from "../src/data/questions_multi.js";

const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/seed_player_facts_import.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  console.error('  Get the service_role key from Supabase Dashboard → Settings → API');
  process.exit(1);
}

const BATCH_SIZE = 500;

const ALL_POOLS = {
  ...NBA_POOLS,
  ...NFL_POOLS,
  ...MLB_POOLS,
  ...NHL_POOLS,
  ...SOCCER_POOLS,
  ...MULTI_POOLS,
};

// Build fact rows from question pools
function buildRows() {
  const rows = [];
  const seen = new Set();

  for (const [qKey, q] of Object.entries(ALL_POOLS)) {
    if (!q.rules || !q.answers) {
      console.error(`WARN: question ${qKey} missing rules or answers, skipping`);
      continue;
    }

    for (const answer of q.answers) {
      for (const rule of q.rules) {
        const factValue = rule.fact_value ?? 'true';
        const key = `${answer.name}|${q.sport}|${rule.fact_type}|${factValue}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({
          player_name: answer.name,
          sport: q.sport,
          fact_type: rule.fact_type,
          fact_value: factValue,
        });
      }
    }
  }

  return rows;
}

function postBatch(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url = new URL('/rest/v1/player_facts', SUPABASE_URL);
    const opts = {
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'resolution=ignore-duplicates',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode });
        } else {
          resolve({ ok: false, status: res.statusCode, body: text });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const rows = buildRows();
console.log(`=== Importing ${rows.length} player_facts rows into Supabase ===`);

let imported = 0;
let errors = 0;

for (let i = 0; i < rows.length; i += BATCH_SIZE) {
  const batch = rows.slice(i, i + BATCH_SIZE);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const result = await postBatch(batch);
  if (result.ok) {
    imported += batch.length;
    console.log(`  batch ${batchNum}: ${imported}/${rows.length}`);
  } else {
    errors++;
    console.error(`  batch ${batchNum} FAILED (${result.status}): ${result.body.slice(0, 300)}`);
  }
}

console.log(`\n=== COMPLETE: ${imported} rows imported, ${errors} batch errors ===`);
