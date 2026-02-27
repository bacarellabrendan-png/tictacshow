// Extract player names from all downloaded sport datasets
import fs from 'fs';

function parseCsv(text) {
  const lines = text.split('\n');
  const header = parseRow(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseRow(lines[i]);
    const obj = {};
    header.forEach((h, idx) => obj[h] = cols[idx] || '');
    rows.push(obj);
  }
  return rows;
}

// Simple CSV parser that handles quoted fields
function parseRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

// ── NBA ──
console.log('=== NBA ===');
const nba = parseCsv(fs.readFileSync('nba_players.csv', 'utf8'));
const nbaNames = new Set();
for (const row of nba) {
  // BBRefName is the canonical name
  const name = row.BBRefName || row.NBAName || '';
  if (name) nbaNames.add(name);
}
console.log(`NBA: ${nbaNames.size} unique players`);
fs.writeFileSync('nba_names.txt', [...nbaNames].sort().join('\n') + '\n');

// ── NFL ──
console.log('=== NFL ===');
const nfl = parseCsv(fs.readFileSync('nfl_players.csv', 'utf8'));
const nflNames = new Set();
for (const row of nfl) {
  const name = row.display_name || '';
  if (name) nflNames.add(name);
}
console.log(`NFL: ${nflNames.size} unique players`);
fs.writeFileSync('nfl_names.txt', [...nflNames].sort().join('\n') + '\n');

// ── NHL ──
console.log('=== NHL ===');
const nhl = parseCsv(fs.readFileSync('nhl_players.csv', 'utf8'));
const nhlNames = new Set();
for (const row of nhl) {
  const first = row.firstName || '';
  const last = row.lastName || '';
  if (first && last) nhlNames.add(`${first} ${last}`);
}
console.log(`NHL: ${nhlNames.size} unique players`);
fs.writeFileSync('nhl_names.txt', [...nhlNames].sort().join('\n') + '\n');

// ── Soccer ──
console.log('=== Soccer ===');
const soccer = parseCsv(fs.readFileSync('soccer_players.csv', 'utf8'));
const soccerNames = new Set();
for (const row of soccer) {
  // "name" column has full display name (e.g. "Miroslav Klose")
  const name = row.name || '';
  if (name) soccerNames.add(name);
}
console.log(`Soccer: ${soccerNames.size} unique players`);
fs.writeFileSync('soccer_names.txt', [...soccerNames].sort().join('\n') + '\n');

// ── MLB (already extracted) ──
const mlb = fs.readFileSync('mlb_names.txt', 'utf8').trim().split('\n');
console.log(`MLB: ${mlb.length} unique players`);

// ── Summary ──
console.log('\n=== TOTALS ===');
console.log(`NBA:    ${nbaNames.size}`);
console.log(`NFL:    ${nflNames.size}`);
console.log(`MLB:    ${mlb.length}`);
console.log(`NHL:    ${nhlNames.size}`);
console.log(`Soccer: ${soccerNames.size}`);
console.log(`TOTAL:  ${nbaNames.size + nflNames.size + mlb.length + nhlNames.size + soccerNames.size}`);
