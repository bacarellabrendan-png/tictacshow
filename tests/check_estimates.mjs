// Count players who could be a valid answer (own a fact in the sport) but have no page-view
// estimate, by sport — the same public queries the app makes. Every count must be 0.
//   node tests/check_estimates.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(here, "..", ".env.local");
const env = fs.existsSync(envFile) ? Object.fromEntries(fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter(l => l.includes("=")).map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])) : {};
const URL = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL, KEY = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
async function all(table, qs) {
  const rows = [];
  for (let off = 0; ; off += 1000) {
    const r = await fetch(`${URL}/rest/v1/${table}?${qs}&limit=1000&offset=${off}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
    if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`);
    const b = await r.json(); rows.push(...b); if (b.length < 1000) break;
  }
  return rows;
}
let bad = 0;
for (const sport of ["NBA", "NFL", "MLB", "NHL", "Soccer"]) {
  const owners = new Set((await all("player_facts", `sport=eq.${sport}&player_id=not.is.null&select=player_id&order=id`)).map(r => r.player_id));
  const est = new Set((await all("player_pageviews", `sport=eq.${sport}&select=player_id&order=player_id`)).map(r => r.player_id));
  const missing = [...owners].filter(id => !est.has(id));
  bad += missing.length;
  console.log(`${sport.padEnd(7)} players who can be answers ${String(owners.size).padStart(6)} | without estimate ${missing.length}${missing.length ? " -> " + missing.slice(0, 10).join(", ") : ""}`);
}
console.log(bad ? `${bad} players WITHOUT an estimate` : "every answerable player has an estimate");
process.exit(bad ? 1 : 0);
