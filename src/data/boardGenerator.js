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

/** Fetch every row of a PostgREST query, 1,000 at a time. */
async function fetchAll(sbFetch, path, qs) {
  const rows = [];
  const PAGE = 1000;
  for (let offset = 0; ; offset += PAGE) {
    const { ok, data } = await sbFetch(`/rest/v1/${path}?${qs}&limit=${PAGE}&offset=${offset}`);
    if (!ok || !Array.isArray(data) || data.length === 0) break;
    rows.push(...data);
    if (data.length < PAGE) break;
  }
  return rows;
}

/**
 * Fetch a sport's OWNED player_facts (facts linked to a player id) and build a local
 * index + compatibility matrix. Everything is keyed by player id, never by name, so
 * namesakes stay separate and boards/CPU answers only use facts the checker accepts.
 */
async function preloadSport(sport, sbFetch, minAnswers) {
  const cacheKey = `${sport}|${minAnswers}`;
  if (_cache.has(cacheKey)) return _cache.get(cacheKey);

  const sportEq = `sport=eq.${encodeURIComponent(sport)}`;
  const [allRows, people, views] = await Promise.all([
    fetchAll(sbFetch, "player_facts", `${sportEq}&player_id=not.is.null&select=player_id,fact_type,fact_value&order=id`),
    fetchAll(sbFetch, "players", `sports=cs.${encodeURIComponent(`{${sport}}`)}&select=id,display_name&order=id`),
    fetchAll(sbFetch, "player_pageviews", `${sportEq}&select=player_id,pageviews_12m&order=player_id`),
  ]);

  // Build index: "fact_type|fact_value" → Set<player id>
  const playersByFact = new Map();
  // player id → display name (CPU answers, reveal)
  const names = new Map(people.map(p => [p.id, p.display_name]));
  // Count total fact entries per player — proxy for "fame" (more facts = more well-known)
  const factCounts = new Map();
  // Count award/accolade facts only (exclude played_for_team) — better fame proxy
  const awardCounts = new Map();
  for (const r of allRows) {
    const key = `${r.fact_type}|${r.fact_value}`;
    if (!playersByFact.has(key)) playersByFact.set(key, new Set());
    const id = r.player_id;
    playersByFact.get(key).add(id);
    factCounts.set(id, (factCounts.get(id) || 0) + 1);
    if (r.fact_type !== 'played_for_team') {
      awardCounts.set(id, (awardCounts.get(id) || 0) + 1);
    }
  }

  const factKey = (c) => `${c.fact.type}|${c.fact.value}`;
  const getP = (c) => playersByFact.get(factKey(c)) || new Set();

  // Championship categories now use generic fact_value="true",
  // so no special team-linked lookup is needed.
  const getPForPair = (cat, _teamCat) => getP(cat);

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

  // Page-view estimate per player id for this sport (player_pageviews: every player who
  // owns a fact has one, so no valid answer falls back to the default)
  const pageviews = new Map(views.map(v => [v.player_id, Number(v.pageviews_12m) || 0]));

  const result = { playersByFact, teams, nonTeam, compat, names, factCounts, awardCounts, pageviews };
  _cache.set(cacheKey, result);
  return result;
}

/**
 * Make sure a sport's data (facts + page views) is loaded, so rarity lookups
 * work in a browser that didn't generate the board (e.g. the player who joined).
 * Concurrent callers share one download.
 */
const _loading = new Map();
export function ensureSportData(sport, sbFetch, minAnswers = 3) {
  const key = `${sport}|${minAnswers}`;
  if (_cache.has(key)) return Promise.resolve();
  if (!_loading.has(key)) {
    _loading.set(key, preloadSport(sport, sbFetch, minAnswers).finally(() => _loading.delete(key)));
  }
  return _loading.get(key);
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

  // Championship × Team: keep championship as generic (=true).
  // The team axis provides played_for_team=<team>, so the intersection finds
  // players who played for that team AND won a championship with ANY team.
  // (Matches Immaculate Grid rules.)

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

function cachedSport(sport) {
  for (const [key, val] of _cache) {
    if (key.startsWith(sport + "|")) return val;
  }
  return null;
}

/**
 * Get the ids of players satisfying both a row and column category (for CPU answers
 * and rarity). Uses cached data from generateBoard, sorted by fact count descending
 * (most well-known players first).
 */
export function getIntersectionPlayers(sport, rowCatId, colCatId) {
  const row = CATEGORY_MAP[rowCatId];
  const col = CATEGORY_MAP[colCatId];
  if (!row || !col) return [];
  const cached = cachedSport(sport);
  if (!cached) return [];

  const { playersByFact, factCounts } = cached;
  const rowPlayers = playersByFact.get(`${row.fact.type}|${row.fact.value}`) || new Set();
  const colPlayers = playersByFact.get(`${col.fact.type}|${col.fact.value}`) || new Set();

  const result = [];
  for (const id of rowPlayers) {
    if (colPlayers.has(id)) result.push(id);
  }
  // Sort by fact count descending — players with more facts are more well-known
  result.sort((a, b) => (factCounts.get(b) || 0) - (factCounts.get(a) || 0));
  return result;
}

/** Display name for a player id (from the sport's cached data), or null. */
export function getPlayerName(sport, playerId) {
  return cachedSport(sport)?.names.get(playerId) ?? null;
}

// Server-side prior (formula v2, get_square_prior), cached per square: player id → prior %
const _serverPrior = new Map();
const priorKey = (sport, rowCatId, colCatId) => `${sport}|${rowCatId}|${colCatId}`;

/**
 * Load a square's prior from the server (formula v2: tenure × award count × page views,
 * ranked, e^(-0.55·rank)). Cached per square; concurrent callers share one request.
 * Resolves false if the call failed; getIntersectionRarities then falls back to the
 * page-view estimate.
 */
export function loadSquarePrior(sbFetch, sport, rowCatId, colCatId) {
  const key = priorKey(sport, rowCatId, colCatId);
  const hit = _serverPrior.get(key);
  if (hit instanceof Map) return Promise.resolve(true);
  if (hit) return hit;
  const row = CATEGORY_MAP[rowCatId], col = CATEGORY_MAP[colCatId];
  if (!row || !col) return Promise.resolve(false);
  const p = sbFetch("/rest/v1/rpc/get_square_prior", {
    method: "POST",
    body: JSON.stringify({
      p_sport: sport,
      p_row_type: row.fact.type, p_row_value: row.fact.value, p_row_is_team: row.type === "team",
      p_col_type: col.fact.type, p_col_value: col.fact.value, p_col_is_team: col.type === "team",
    }),
  }).then(r => {
    if (!r.ok || !Array.isArray(r.data)) throw new Error(`get_square_prior failed (${r.status})`);
    _serverPrior.set(key, new Map(r.data.map(x => [Number(x.player_id), Number(x.prior_pct)])));
    return true;
  }).catch(err => {
    console.warn(`[rarity] ${err.message}; using the page-view estimate for ${rowCatId}__${colCatId}`);
    _serverPrior.delete(key);
    return false;
  });
  _serverPrior.set(key, p);
  return p;
}

/**
 * Per-intersection rarity percentages for all valid players (player id → prior %).
 * Uses the server prior (formula v2) once loadSquarePrior has fetched it for this
 * square. Otherwise falls back to the page-view estimate: players sorted by
 * Wikipedia page views, weighted e^(-0.55·rank).
 *
 * Every valid player gets at least 0.01% — no valid answer is ever 0%.
 */
export function getIntersectionRarities(sport, rowCatId, colCatId) {
  const server = _serverPrior.get(priorKey(sport, rowCatId, colCatId));
  if (server instanceof Map) return server;
  const players = getIntersectionPlayers(sport, rowCatId, colCatId);
  if (!players.length) return new Map();
  const cached = cachedSport(sport);
  if (!cached) return new Map();

  const { pageviews, factCounts } = cached;
  const missing = players.filter(id => !pageviews.has(id));
  if (missing.length) console.warn(`[rarity] ${missing.length} players without a page-view estimate on ${rowCatId}__${colCatId}:`, missing);

  // Sort by Wikipedia pageviews desc; tie-break by fact count
  const sorted = [...players].sort((a, b) => {
    const aViews = pageviews.get(a) ?? -1;
    const bViews = pageviews.get(b) ?? -1;
    if (bViews !== aViews) return bViews - aViews;
    return (factCounts.get(b) || 0) - (factCounts.get(a) || 0);
  });

  // Exponential decay: weight(rank) = e^(-k * rank)
  // k=0.55 gives stable tiers: #1 ≈ 42%, #2 ≈ 24%, #3 ≈ 14%, rest < 10%
  const K = 0.55;
  let totalWeight = 0;
  const weights = sorted.map((_, i) => {
    const w = Math.exp(-K * i);
    totalWeight += w;
    return w;
  });

  // Normalize to percentages, enforce 0.01% minimum for every valid player
  const MIN_PCT = 0.01;
  const result = new Map();
  for (let i = 0; i < sorted.length; i++) {
    const pct = (weights[i] / totalWeight) * 100;
    result.set(sorted[i], Math.max(MIN_PCT, pct));   // player id → prior %
  }
  return result;
}
