// Golden answer-checking test: every case must pass (exit code 1 otherwise).
// Uses the public anon key and read-only RPCs only (resolve_player, validate_answer_v2),
// so it is safe to run against production after every data import.
//   node tests/golden/run_golden.mjs            (reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from .env.local)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(here, "..", "..", ".env.local");
const env = fs.existsSync(envFile)
  ? Object.fromEntries(fs.readFileSync(envFile, "utf8").split(/\r?\n/).filter(l => l.includes("=")).map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]))
  : {};
const URL = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;
if (!URL || !KEY) { console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY"); process.exit(2); }

async function rpc(fn, body) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = await fetch(`${URL}/rest/v1/rpc/${fn}`, { method: "POST", headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) return r.json();
    if (r.status < 500) throw new Error(`${fn}: ${r.status} ${await r.text()}`);
    await new Promise(res => setTimeout(res, 1000 * attempt));
  }
  throw new Error(`${fn}: gave up`);
}

async function check(c) {
  const rows = await rpc("resolve_player", { p_text: c.text, p_sport: c.sport });
  const status = rows[0]?.status ?? "none";
  const cands = rows.filter(r => r.player_id != null);
  for (const x of cands) x.valid = await rpc("validate_answer_v2", { p_player_id: x.player_id, p_sport: c.sport, p_rules: c.rules });
  // database ids differ between environments; compare players by Wikipedia page id
  let pageId = null;
  if (status === "resolved") {
    const r = await fetch(`${URL}/rest/v1/players?id=eq.${cands[0].player_id}&select=wikipedia_page_id`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
    pageId = r.ok ? Number((await r.json())[0]?.wikipedia_page_id) : null;
  }
  const got = { status, names: cands.map(x => x.display_name), valid: status === "resolved" ? cands[0].valid : false,   // not resolved = not accepted
    page_id: pageId };
  const e = c.expect, why = [];
  if (e.status && e.status !== status) why.push(`status ${status}, expected ${e.status}`);
  if (e.status_not && e.status_not === status) why.push(`status must not be ${status}`);
  if (e.name && got.names[0] !== e.name) why.push(`resolved to ${got.names[0]}, expected ${e.name}`);
  if (e.page_id != null && got.page_id !== e.page_id) why.push(`resolved to ${got.names[0]} (page ${got.page_id}), expected ${e.player} (page ${e.page_id})`);
  if (e.valid != null && got.valid !== e.valid) why.push(`valid ${got.valid}, expected ${e.valid}`);
  if (e.includes && !got.names.includes(e.includes)) why.push(`options ${JSON.stringify(got.names)} lack ${e.includes}`);
  if (e.valid_option != null && cands.some(x => x.valid) !== e.valid_option) why.push(`a valid option ${e.valid_option ? "expected" : "not expected"}`);
  return { ok: !why.length, why, got };
}

const { cases } = JSON.parse(fs.readFileSync(path.join(here, "golden_set.json"), "utf8"));
const results = new Array(cases.length); let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => { while (next < cases.length) { const i = next++; try { results[i] = await check(cases[i]); } catch (err) { results[i] = { ok: false, why: [String(err.message || err)] }; } } }));
const byGroup = {};
cases.forEach((c, i) => { const g = (byGroup[c.group] ??= { pass: 0, fail: 0 }); results[i].ok ? g.pass++ : g.fail++; });
for (const [g, v] of Object.entries(byGroup)) console.log(`${g.padEnd(10)} ${v.pass}/${v.pass + v.fail} passed`);
const fails = cases.map((c, i) => [c, results[i]]).filter(([, r]) => !r.ok);
for (const [c, r] of fails) console.log(`FAIL [${c.group}] ${c.sport} ${c.question_key} "${c.text}"${c.note ? ` (${c.note})` : ""}: ${r.why.join("; ")}`);
console.log(fails.length ? `${fails.length} of ${cases.length} FAILED` : `ALL ${cases.length} PASSED`);
process.exit(fails.length ? 1 : 0);
