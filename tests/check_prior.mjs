// Live check of the server prior (get_square_prior, formula v2), with the browser's public key.
// For every square a board can contain (team row × enabled category, 3+ valid answers, as the board
// generator requires): the server returns exactly the valid players the app computes, each with a prior
// >= 0.01%, so no answer falls back to the 0.1% default. Also prints where the expected answers rank on
// the blind-test squares (tests/blind_squares.json).   node tests/check_prior.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TEAMS_BY_SPORT, NON_TEAM_BY_SPORT, CATEGORY_MAP } from "../src/data/categories.js";
const here = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(here, "..", ".env.local");
const env = fs.existsSync(envFile) ? Object.fromEntries(fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter(l => l.includes("=")).map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])) : {};
const URL = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL, KEY = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
async function all(table, qs) {
  const rows = [];
  for (let off = 0; ; off += 1000) {
    const r = await fetch(`${URL}/rest/v1/${table}?${qs}&limit=1000&offset=${off}`, { headers: H });
    if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`);
    const b = await r.json(); rows.push(...b); if (b.length < 1000) break;
  }
  return rows;
}
async function prior(sport, a, b) {
  const r = await fetch(`${URL}/rest/v1/rpc/get_square_prior`, { method: "POST", headers: H, body: JSON.stringify({
    p_sport: sport, p_row_type: a.fact.type, p_row_value: a.fact.value, p_row_is_team: a.type === "team",
    p_col_type: b.fact.type, p_col_value: b.fact.value, p_col_is_team: b.type === "team" }) });
  if (!r.ok) throw new Error(`get_square_prior ${a.id} x ${b.id}: ${r.status} ${await r.text()}`);
  return new Map((await r.json()).map(x => [Number(x.player_id), Number(x.prior_pct)]));
}
const names = new Map();
let squares = 0, bad = 0;
const pools = new Map();
for (const sport of ["NBA", "NFL", "MLB", "NHL", "Soccer"]) {
  const facts = await all("player_facts", `sport=eq.${sport}&player_id=not.is.null&select=player_id,fact_type,fact_value&order=id`);
  const holders = new Map();
  for (const f of facts) { const k = `${f.fact_type}|${f.fact_value}`; (holders.get(k) || holders.set(k, new Set()).get(k)).add(f.player_id); }
  const teams = TEAMS_BY_SPORT[sport] || [], cols = [...teams, ...(NON_TEAM_BY_SPORT[sport] || [])];
  const todo = [];
  for (const a of teams) for (const b of cols) {
    if (a.id === b.id || (b.type === "team" && b.id < a.id)) continue;   // team x team once
    const A = holders.get(`${a.fact.type}|${a.fact.value}`) || new Set(), B = holders.get(`${b.fact.type}|${b.fact.value}`) || new Set();
    const pool = [...A].filter(id => B.has(id));
    if (pool.length >= 3) todo.push([a, b, pool]);
  }
  let sq = 0, mism = 0, low = 0, largest = 0;
  for (let i = 0; i < todo.length; i += 6) await Promise.all(todo.slice(i, i + 6).map(async ([a, b, pool]) => {
    const m = await prior(sport, a, b); sq++;
    const missing = pool.filter(id => !m.has(id)), extra = [...m.keys()].filter(id => !pool.includes(id));
    const under = [...m.values()].filter(v => !(v >= 0.01)).length;
    if (missing.length || extra.length) { mism++; if (mism <= 3) console.log(`  MISMATCH ${a.id} x ${b.id}: missing ${missing.length}, extra ${extra.length}`); }
    if (under) low++;
    largest = Math.max(largest, pool.length);
  }));
  squares += sq; bad += mism + low;
  console.log(`${sport.padEnd(7)} squares ${String(sq).padStart(5)} | pool != server ${mism} | prior < 0.01% ${low} | largest pool ${largest}`);
}
console.log(bad ? `${bad} squares FAILED` : `all ${squares} squares: every valid player has a server prior (no default, no fallback)`);
const blindFile = path.join(here, "blind_squares.json");
if (fs.existsSync(blindFile)) {
  const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
  let n1 = 0, n3 = 0; const blind = JSON.parse(fs.readFileSync(blindFile, "utf8"));
  for (const sq of blind) {
    const a = CATEGORY_MAP[sq.row], b = CATEGORY_MAP[sq.col], m = await prior(a.sport, a, b);
    const ids = [...m.entries()].sort((x, y) => y[1] - x[1]).map(x => x[0]);
    const need = ids.slice(0, 25).filter(id => !names.has(id));
    if (need.length) for (const p of await all("players", `id=in.(${need.join(",")})&select=id,display_name&order=id`)) names.set(p.id, p.display_name);
    const k = ids.findIndex(id => sq.obvious.map(norm).includes(norm(names.get(id) || "")));
    const rank = k < 0 ? "not in top 25" : k + 1; if (k === 0) n1++; if (k >= 0 && k < 3) n3++;
    console.log(`  ${sq.row} x ${sq.col}: expected answer rank ${rank} | top 3: ${ids.slice(0, 3).map(id => `${names.get(id)} ${m.get(id).toFixed(1)}%`).join(", ")}`);
  }
  console.log(`blind squares: #1 ${n1}/${blind.length}, top 3 ${n3}/${blind.length}`);
}
process.exit(bad ? 1 : 0);
