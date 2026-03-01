#!/usr/bin/env node
// Test the board generator against live Supabase data.
// Usage: node scripts/test_board_gen.mjs [sportMode]

import https from "https";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, "..", "src", "data");
const toURL = (f) => pathToFileURL(path.join(srcDir, f)).href;

const { generateBoard, expandBoard, getCategoryDisplay } = await import(
  toURL("boardGenerator.js")
);
const { CATEGORY_MAP } = await import(toURL("categories.js"));

const SB_URL = "https://uqufvtajxqbicuxlxcxu.supabase.co";
const SB_KEY = "sb_publishable_pd4ivJb9U-FeNgeRcPcRaA_cA5vlCHk";

function sbFetch(urlPath, opts = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, SB_URL);
    const body = opts.body || null;
    const req = https.request(
      {
        method: opts.method || "GET",
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: {
          "Content-Type": "application/json",
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString();
          let data;
          try {
            data = JSON.parse(text);
          } catch {
            data = text;
          }
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            data,
          });
        });
      },
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// ─── Quick data check ────────────────────────────────────────────────────────

const sportMode = process.argv[2] || "all";
const resolvedSport =
  sportMode === "all"
    ? "NBA"
    : { nba: "NBA", nfl: "NFL", mlb: "MLB", nhl: "NHL", soccer: "Soccer" }[
        sportMode
      ] || sportMode;

console.log(`\n═══ Board Generator Test (sport: ${sportMode}) ═══\n`);

// Check data count
const countRes = await sbFetch(
  `/rest/v1/player_facts?sport=eq.${resolvedSport}&select=id&limit=1`,
  { headers: { Prefer: "count=exact", "Range-Unit": "items", Range: "0-0" } },
);
console.log(`  Data check: ${resolvedSport} query status=${countRes.status}`);
if (countRes.ok) {
  console.log(`  Data rows returned: ${Array.isArray(countRes.data) ? countRes.data.length : "N/A"}`);
} else {
  console.log(`  ERROR: ${JSON.stringify(countRes.data).slice(0, 200)}`);
}

// Quick sanity: fetch first 5 rows
const sample = await sbFetch(
  `/rest/v1/player_facts?sport=eq.${resolvedSport}&select=player_name,fact_type,fact_value&limit=5`,
);
console.log(`  Sample (${sample.ok ? "ok" : "fail"}):`);
if (Array.isArray(sample.data)) {
  sample.data.forEach((r) =>
    console.log(`    ${r.player_name} | ${r.fact_type} | ${r.fact_value}`),
  );
} else {
  console.log(`    ${JSON.stringify(sample.data).slice(0, 200)}`);
}
console.log("");

// ─── Generate board ──────────────────────────────────────────────────────────

const start = Date.now();
const board = await generateBoard(sportMode, sbFetch, {
  minAnswers: 3,
  maxAttempts: 50,
});
const elapsed = Date.now() - start;

if (!board) {
  console.log("  FAILED: Could not generate a valid board after 50 attempts.");
  console.log(`  Elapsed: ${elapsed}ms\n`);
  process.exit(1);
}

console.log(`  Sport:   ${board.sport}`);
console.log(`  Elapsed: ${elapsed}ms\n`);

const rowLabels = board.rows.map((id) => getCategoryDisplay(id));
const colLabels = board.cols.map((id) => getCategoryDisplay(id));

console.log("  COLUMNS:");
colLabels.forEach((c, i) => console.log(`    C${i}: ${c.label}`));
console.log("\n  ROWS:");
rowLabels.forEach((r, i) => console.log(`    R${i}: ${r.label}`));
console.log("");

const cells = expandBoard(board);
console.log("  GRID (9 cells):");
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    const cell = cells[r * 3 + c];
    const rCat = CATEGORY_MAP[cell.rowCat];
    const cCat = CATEGORY_MAP[cell.colCat];
    console.log(`    [${r},${c}] ${rCat.shortLabel} × ${cCat.shortLabel}`);
    cell.rules.forEach((rule) =>
      console.log(`          → ${rule.fact_type} = ${rule.fact_value}`),
    );
  }
}

console.log("\n═══ PASS ═══\n");
