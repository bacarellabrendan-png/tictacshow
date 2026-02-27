// Download MLB player names from Chadwick Register
// Filters to only players who actually played in MLB (mlb_played_first is non-empty)
import https from 'https';

const BASE = 'https://raw.githubusercontent.com/chadwickbureau/register/master/data/';
const FILES = [
  'people-0.csv','people-1.csv','people-2.csv','people-3.csv',
  'people-4.csv','people-5.csv','people-6.csv','people-7.csv',
  'people-8.csv','people-9.csv','people-a.csv','people-b.csv',
  'people-c.csv','people-d.csv','people-e.csv','people-f.csv',
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString()));
      res.on('error', reject);
    }).on('error', reject);
  });
}

const names = new Set();
let total = 0;

for (const file of FILES) {
  process.stderr.write(`Downloading ${file}...`);
  const csv = await fetch(BASE + file);
  const lines = csv.split('\n');
  const header = lines[0].split(',');
  const iFirst = header.indexOf('name_first');
  const iLast = header.indexOf('name_last');
  const iMlbFirst = header.indexOf('mlb_played_first');

  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols[iMlbFirst] && cols[iMlbFirst].trim()) {
      const first = (cols[iFirst] || '').trim();
      const last = (cols[iLast] || '').trim();
      if (first && last) {
        names.add(`${first} ${last}`);
        count++;
      }
    }
  }
  total += count;
  process.stderr.write(` ${count} MLB players\n`);
}

process.stderr.write(`\nTotal unique MLB players: ${names.size} (from ${total} records)\n`);

// Write output
const sorted = [...names].sort();
import fs from 'fs';
fs.writeFileSync('mlb_names.txt', sorted.join('\n') + '\n');
process.stderr.write(`Written to mlb_names.txt\n`);
