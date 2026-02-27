#!/usr/bin/env node
// Import player names into Supabase `players` table.
// Usage: node scripts/import_players.mjs
//
// Prerequisites:
// 1. Run the players table SQL in Supabase Dashboard
// 2. Set SUPABASE_SERVICE_KEY env var (service_role key, NOT anon key)
//    OR pass it as first CLI argument

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/import_players.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  console.error('  Get the service_role key from Supabase Dashboard → Settings → API');
  process.exit(1);
}

const SPORTS = ['nba', 'nfl', 'mlb', 'nhl', 'soccer'];
const BATCH_SIZE = 500; // PostgREST can handle large batches

function loadNames(sport) {
  const file = path.join(__dirname, 'data', `${sport}_names.txt`);
  return fs.readFileSync(file, 'utf8').trim().split('\n').filter(Boolean);
}

function postBatch(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url = new URL('/rest/v1/players', SUPABASE_URL);
    const opts = {
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'resolution=ignore-duplicates',  // skip dupes silently
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

async function importSport(sport) {
  const names = loadNames(sport);
  console.log(`\n[${sport.toUpperCase()}] ${names.length} players to import`);

  let imported = 0;
  let errors = 0;

  for (let i = 0; i < names.length; i += BATCH_SIZE) {
    const batch = names.slice(i, i + BATCH_SIZE).map(name => ({ name, sport }));
    const result = await postBatch(batch);
    if (result.ok) {
      imported += batch.length;
      process.stdout.write(`  batch ${Math.floor(i/BATCH_SIZE)+1}: ${imported}/${names.length}\r`);
    } else {
      errors++;
      console.error(`  batch ${Math.floor(i/BATCH_SIZE)+1} FAILED (${result.status}): ${result.body.slice(0, 200)}`);
    }
  }

  console.log(`  [${sport.toUpperCase()}] Done: ${imported} imported, ${errors} batch errors`);
  return imported;
}

console.log('=== Importing players into Supabase ===');
let total = 0;
for (const sport of SPORTS) {
  total += await importSport(sport);
}
console.log(`\n=== COMPLETE: ${total} total players imported ===`);
