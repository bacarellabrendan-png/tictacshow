// ─── BOARD GENERATOR ──────────────────────────────────────────────────────────
// Generates a 3×3 grid board by picking 3 row categories × 3 column categories
// where every intersection has enough valid answers in player_facts.
//
// Strategy:
//   1. Preload ALL player_facts for the sport in one Supabase query
//   2. Build a compatibility matrix: for each (row, col) pair, how many
//      players satisfy both conditions?
//   3. Pick 3 rows (teams) then find 3 columns compatible with ALL 3 rows
//   4. Guaranteed to find a valid board if one exists — no trial and error
//
// Board config shape (compact, stored in game state):
//   { sport: "NBA", rows: ["nba_lakers", ...], cols: ["nba_champion", ...] }

import {
  TEAMS_BY_SPORT,
  NON_TEAM_BY_SPORT,
  CATEGORY_MAP,
} from "./categories.js";

// ─── HELPERS ────────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── SPORT RESOLUTION ───────────────────────────────────────────────────────────

const ALL_SPORTS = ["NBA", "NFL", "MLB", "NHL", "Soccer"];
const SPORT_KEY = {
  nba: "NBA",
  nfl: "NFL",
  mlb: "MLB",
  nhl: "NHL",
  soccer: "Soccer",
};

function resolveSport(mode) {
  if (mode === "all")
    return ALL_SPORTS[Math.floor(Math.random() * ALL_SPORTS.length)];
  return SPORT_KEY[mode] ?? mode;
}

// ─── DATA PRELOADING ────────────────────────────────────────────────────────────

// Cache per sport: { playersByFact, teams, nonTeam, compat }
const _cache = new Map();

/**
 * Fetch ALL player_facts for a sport and build a local index + compatibility matrix.
 */
async function preloadSport(sport, sbFetch, minAnswers) {
  const cacheKey = `${sport}|${minAnswers}`;
  if (_cache.has(cacheKey)) return _cache.get(cacheKey);

  // Paginate to get ALL rows
  const allRows = [];
  let offset = 0;
  const PAGE = 1000;
  while (true) {
    const qs =
      `?sport=eq.${encodeURIComponent(sport)}` +
      `&select=player_name,fact_type,fact_value` +
      `&limit=${PAGE}&offset=${offset}`;
    const { ok, data } = await sbFetch(`/rest/v1/player_facts${qs}`);
    if (!ok || !Array.isArray(data) || data.length === 0) break;
    allRows.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }

  // Build index: "fact_type|fact_value" → Set<lowercase player name>
  const playersByFact = new Map();
  for (const r of allRows) {
    const key = `${r.fact_type}|${r.fact_value}`;
    if (!playersByFact.has(key)) playersByFact.set(key, new Set());
    playersByFact.get(key).add(r.player_name.toLowerCase());
  }

  const factKey = (c) => `${c.fact.type}|${c.fact.value}`;
  const getP = (c) => playersByFact.get(factKey(c)) || new Set();

  // Filter to categories that have enough data to be useful
  const teams = (TEAMS_BY_SPORT[sport] || []).filter(
    (c) => getP(c).size >= 10,
  );
  const nonTeam = (NON_TEAM_BY_SPORT[sport] || []).filter(
    (c) => getP(c).size >= 10,
  );

  // Build compatibility matrix: compat[rowId] = Map<colId, intersectionCount>
  const allCols = [...teams, ...nonTeam];
  const compat = new Map();

  for (const row of teams) {
    const rPlayers = getP(row);
    const rowMap = new Map();
    for (const col of allCols) {
      if (col.id === row.id) continue;
      const cPlayers = getP(col);
      let cnt = 0;
      for (const p of cPlayers) {
        if (rPlayers.has(p)) cnt++;
      }
      if (cnt >= minAnswers) rowMap.set(col.id, cnt);
    }
    compat.set(row.id, rowMap);
  }

  const result = { playersByFact, teams, nonTeam, compat };
  _cache.set(cacheKey, result);
  return result;
}

// ─── BOARD SELECTION ────────────────────────────────────────────────────────────

/**
 * Find a valid (rows, cols) combination using the compatibility matrix.
 * Rows = 3 teams.  Cols = mix of teams + non-team, all compatible with every row.
 */
function pickValidBoard(teams, nonTeam, compat) {
  const allCols = [...teams, ...nonTeam];
  const t = shuffle(teams);

  // Try row triplets. Since t is shuffled, first valid find is random.
  for (let a = 0; a < t.length - 2; a++) {
    for (let b = a + 1; b < t.length - 1; b++) {
      for (let c = b + 1; c < t.length; c++) {
        const rows = [t[a], t[b], t[c]];
        const rowIds = new Set(rows.map((r) => r.id));

        // Find columns compatible with ALL 3 rows
        const valid = allCols.filter((col) => {
          if (rowIds.has(col.id)) return false;
          return rows.every((row) => compat.get(row.id)?.has(col.id));
        });

        if (valid.length < 3) continue;

        // Pick 3 columns, preferring a mix of teams and non-team
        const vTeams = shuffle(valid.filter((c) => c.type === "team"));
        const vNonTeam = shuffle(valid.filter((c) => c.type !== "team"));

        let cols;
        if (vTeams.length >= 1 && vNonTeam.length >= 2) {
          const nct = Math.random() < 0.5 ? 1 : 2;
          cols = [
            ...vTeams.slice(0, nct),
            ...vNonTeam.slice(0, 3 - nct),
          ];
        } else if (vTeams.length >= 3) {
          cols = vTeams.slice(0, 3);
        } else if (vNonTeam.length >= 3) {
          cols = vNonTeam.slice(0, 3);
        } else {
          cols = shuffle(valid).slice(0, 3);
        }

        return { rows: shuffle(rows), cols: shuffle(cols) };
      }
    }
  }

  return null;
}

// ─── MAIN ENTRY POINT ───────────────────────────────────────────────────────────

/**
 * Generate a validated board.
 *
 * @param {string}   sportMode   "all"|"nba"|"nfl"|"mlb"|"nhl"|"soccer"
 * @param {Function} sbFetch     Supabase fetch wrapper (from App.jsx)
 * @param {object}   [opts]
 * @param {number}   [opts.minAnswers=3]   Minimum valid answers per cell
 * @returns {Promise<BoardConfig|null>}
 *
 * BoardConfig: { sport, rows: string[], cols: string[] }
 *   rows/cols are category IDs referencing CATEGORY_MAP.
 */
export async function generateBoard(
  sportMode,
  sbFetch,
  { minAnswers = 3 } = {},
) {
  // For "all" mode, try each sport randomly until one works
  const sports =
    sportMode === "all" ? shuffle([...ALL_SPORTS]) : [resolveSport(sportMode)];

  for (const sport of sports) {
    const { teams, nonTeam, compat } = await preloadSport(
      sport,
      sbFetch,
      minAnswers,
    );

    const pick = pickValidBoard(teams, nonTeam, compat);
    if (pick) {
      return {
        sport,
        rows: pick.rows.map((c) => c.id),
        cols: pick.cols.map((c) => c.id),
      };
    }
  }

  return null;
}

// ─── BOARD HELPERS ──────────────────────────────────────────────────────────────

/**
 * Get the two validation rules for a specific board cell.
 * Returns the format expected by the validate_answer RPC.
 */
export function getCellRules(rowCatId, colCatId) {
  const row = CATEGORY_MAP[rowCatId];
  const col = CATEGORY_MAP[colCatId];
  if (!row || !col) return [];
  return [
    { fact_type: row.fact.type, fact_value: row.fact.value },
    { fact_type: col.fact.type, fact_value: col.fact.value },
  ];
}

/**
 * Expand a compact board config into a 9-element cells array.
 * Cell index is row-major: cell i = row[floor(i/3)] × col[i % 3].
 */
export function expandBoard({ sport, rows, cols }) {
  return rows.flatMap((rowId) =>
    cols.map((colId) => ({
      rowCat: rowId,
      colCat: colId,
      sport,
      rules: getCellRules(rowId, colId),
    })),
  );
}

/**
 * Get display info for a category (for board axis labels).
 */
export function getCategoryDisplay(catId) {
  const cat = CATEGORY_MAP[catId];
  if (!cat) return { label: catId, shortLabel: catId };
  return { label: cat.label, shortLabel: cat.shortLabel };
}
