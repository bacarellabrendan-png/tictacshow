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
  // Map lowercase → original case (for CPU answer picking)
  const originalNames = new Map();
  // Count total fact entries per player — proxy for "fame" (more facts = more well-known)
  const factCounts = new Map();
  // Count award/accolade facts only (exclude played_for_team) — better fame proxy
  const awardCounts = new Map();
  for (const r of allRows) {
    const key = `${r.fact_type}|${r.fact_value}`;
    if (!playersByFact.has(key)) playersByFact.set(key, new Set());
    const lower = r.player_name.toLowerCase();
    playersByFact.get(key).add(lower);
    originalNames.set(lower, r.player_name);
    factCounts.set(lower, (factCounts.get(lower) || 0) + 1);
    if (r.fact_type !== 'played_for_team') {
      awardCounts.set(lower, (awardCounts.get(lower) || 0) + 1);
    }
  }

  const factKey = (c) => `${c.fact.type}|${c.fact.value}`;
  const getP = (c) => playersByFact.get(factKey(c)) || new Set();

  // For team-linked championships, get players by looking up team-specific key
  const getPForPair = (cat, teamCat) => {
    if (TEAM_LINKED_CHAMPS.has(cat.fact.type) && teamCat && teamCat.type === 'team') {
      return playersByFact.get(`${cat.fact.type}|${teamCat.fact.value}`) || new Set();
    }
    return getP(cat);
  };

  // Count total players for a category (aggregates all team-linked keys for championships)
  const getCatSize = (c) => {
    if (TEAM_LINKED_CHAMPS.has(c.fact.type)) {
      const players = new Set();
      for (const [key, set] of playersByFact) {
        if (key.startsWith(c.fact.type + '|')) {
          for (const p of set) players.add(p);
        }
      }
      return players.size;
    }
    return getP(c).size;
  };

  // Filter to categories that have enough data to be useful
  const teams = (TEAMS_BY_SPORT[sport] || []).filter(
    (c) => getP(c).size >= 10,
  );
  const nonTeam = (NON_TEAM_BY_SPORT[sport] || []).filter(
    (c) => getCatSize(c) >= 10,
  );

  // Build compatibility matrix: compat[rowId] = Map<colId, intersectionCount>
  const allCols = [...teams, ...nonTeam];
  const compat = new Map();

  for (const row of teams) {
    const rPlayers = getP(row);
    const rowMap = new Map();
    for (const col of allCols) {
      if (col.id === row.id) continue;
      // Use team-linked lookup for championship columns
      const cPlayers = getPForPair(col, row);
      let cnt = 0;
      for (const p of cPlayers) {
        if (rPlayers.has(p)) cnt++;
      }
      if (cnt >= minAnswers) rowMap.set(col.id, cnt);
    }
    compat.set(row.id, rowMap);
  }

  // Load pageview data from player_fame for this sport
  const pageviews = new Map();
  let pvOffset = 0;
  while (true) {
    const pvQs =
      `?sport=eq.${encodeURIComponent(sport)}` +
      `&select=player_name,wikipedia_pageviews_12m` +
      `&limit=${PAGE}&offset=${pvOffset}`;
    const pv = await sbFetch(`/rest/v1/player_fame${pvQs}`);
    if (!pv.ok || !Array.isArray(pv.data) || pv.data.length === 0) break;
    for (const r of pv.data) {
      pageviews.set(r.player_name.toLowerCase(), r.wikipedia_pageviews_12m || 0);
    }
    if (pv.data.length < PAGE) break;
    pvOffset += PAGE;
  }

  const result = { playersByFact, teams, nonTeam, compat, originalNames, factCounts, awardCounts, pageviews };
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
// Championship fact types that use team-linked values (fact_value = team name)
const TEAM_LINKED_CHAMPS = new Set([
  'nba_champion', 'nfl_super_bowl_winner', 'mlb_ws_winner', 'nhl_stanley_cup',
]);

export function getCellRules(rowCatId, colCatId) {
  const row = CATEGORY_MAP[rowCatId];
  const col = CATEGORY_MAP[colCatId];
  if (!row || !col) return [];

  const rowRule = { fact_type: row.fact.type, fact_value: row.fact.value };
  const colRule = { fact_type: col.fact.type, fact_value: col.fact.value };

  // When a championship intersects a team, use the team name as the championship fact_value
  if (TEAM_LINKED_CHAMPS.has(row.fact.type) && col.type === 'team') {
    rowRule.fact_value = col.fact.value;
  }
  if (TEAM_LINKED_CHAMPS.has(col.fact.type) && row.type === 'team') {
    colRule.fact_value = row.fact.value;
  }

  return [rowRule, colRule];
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

/**
 * Get players satisfying both a row and column category (for CPU answers).
 * Uses cached data from generateBoard — returns original-case names
 * sorted by fact count descending (most well-known players first).
 */
export function getIntersectionPlayers(sport, rowCatId, colCatId) {
  const row = CATEGORY_MAP[rowCatId];
  const col = CATEGORY_MAP[colCatId];
  if (!row || !col) return [];

  let cached = null;
  for (const [key, val] of _cache) {
    if (key.startsWith(sport + "|")) { cached = val; break; }
  }
  if (!cached) return [];

  const { playersByFact, originalNames, factCounts } = cached;
  let rowFactValue = row.fact.value;
  let colFactValue = col.fact.value;

  // For team-linked championships, look up by team name instead of "true"
  if (TEAM_LINKED_CHAMPS.has(row.fact.type) && col.type === 'team') {
    rowFactValue = col.fact.value;
  }
  if (TEAM_LINKED_CHAMPS.has(col.fact.type) && row.type === 'team') {
    colFactValue = row.fact.value;
  }

  const rowKey = `${row.fact.type}|${rowFactValue}`;
  const colKey = `${col.fact.type}|${colFactValue}`;
  const rowPlayers = playersByFact.get(rowKey) || new Set();
  const colPlayers = playersByFact.get(colKey) || new Set();

  const result = [];
  for (const p of rowPlayers) {
    if (colPlayers.has(p)) result.push(p);
  }
  // Sort by fact count descending — players with more facts are more well-known
  result.sort((a, b) => (factCounts.get(b) || 0) - (factCounts.get(a) || 0));
  return result.map(p => originalNames.get(p) || p);
}

/**
 * Compute per-intersection rarity percentages for all valid players.
 * Sorts players by Wikipedia pageviews (from player_fame), then applies
 * a Zipf distribution to model "what % of people would guess this player
 * for THIS specific square."
 *
 * Players with no pageview data default to the bottom of the pool.
 * Every valid player gets at least 0.01% — no valid answer is ever 0%.
 *
 * Known limitation: Wikipedia pageviews don't disambiguate common names.
 * Players like "Don Johnson", "Bobby Brown", or "Kenny Rogers" get inflated
 * pageviews from their more famous non-athlete namesakes. Once answer_stats
 * accumulates ≥25 real submissions for an intersection, live gameplay data
 * will override these Zipf-based estimates and fix the rankings naturally.
 */
export function getIntersectionRarities(sport, rowCatId, colCatId) {
  const players = getIntersectionPlayers(sport, rowCatId, colCatId);
  if (!players.length) return new Map();

  let cached = null;
  for (const [key, val] of _cache) {
    if (key.startsWith(sport + "|")) { cached = val; break; }
  }
  if (!cached) return new Map();

  const { pageviews, factCounts } = cached;

  // Sort by Wikipedia pageviews desc; no pageview data → bottom, tie-break by factCounts
  const sorted = [...players].sort((a, b) => {
    const aViews = pageviews.get(a.toLowerCase()) ?? -1;
    const bViews = pageviews.get(b.toLowerCase()) ?? -1;
    if (bViews !== aViews) return bViews - aViews;
    return (factCounts.get(b.toLowerCase()) || 0) - (factCounts.get(a.toLowerCase()) || 0);
  });

  // Zipf distribution: weight(rank) = 1 / rank^α
  const ALPHA = 2;
  let totalWeight = 0;
  const weights = sorted.map((_, i) => {
    const w = 1 / Math.pow(i + 1, ALPHA);
    totalWeight += w;
    return w;
  });

  // Normalize to percentages, enforce 0.01% minimum for every valid player
  const MIN_PCT = 0.01;
  const result = new Map();
  for (let i = 0; i < sorted.length; i++) {
    const pct = (weights[i] / totalWeight) * 100;
    result.set(sorted[i].toLowerCase(), Math.max(MIN_PCT, pct));
  }
  return result;
}

/**
 * Get rarity % for a single player on a specific intersection.
 * Returns the percentage, or null if the player isn't in the pool.
 * If the player validates but isn't in our cache, returns 0.1% (very rare).
 */
export function getPlayerRarity(sport, rowCatId, colCatId, playerName) {
  const rarities = getIntersectionRarities(sport, rowCatId, colCatId);
  const lower = playerName.toLowerCase();
  if (rarities.has(lower)) return rarities.get(lower);
  return 0.1; // Validated but not in cache = truly obscure
}
