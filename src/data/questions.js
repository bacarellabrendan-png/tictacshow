// ─── CENTRAL QUESTION AGGREGATOR ─────────────────────────────────────────────
// All question data lives in sport-specific files.
// This file imports, combines, and exports the unified API used by the app.

import {
  NBA_POOLS,
  NBA_BEGINNER, NBA_KNOWLEDGEABLE, NBA_EXPERT,
} from "./questions_nba.js";

import {
  NFL_POOLS,
  NFL_BEGINNER, NFL_KNOWLEDGEABLE, NFL_EXPERT,
} from "./questions_nfl.js";

import {
  MLB_POOLS,
  MLB_BEGINNER, MLB_KNOWLEDGEABLE, MLB_EXPERT,
} from "./questions_mlb.js";

import {
  NHL_POOLS,
  NHL_BEGINNER, NHL_KNOWLEDGEABLE, NHL_EXPERT,
} from "./questions_nhl.js";

import {
  SOCCER_POOLS,
  SOCCER_BEGINNER, SOCCER_KNOWLEDGEABLE, SOCCER_EXPERT,
} from "./questions_soccer.js";

import {
  MULTI_POOLS,
  MULTI_BEGINNER, MULTI_KNOWLEDGEABLE, MULTI_EXPERT,
  COLLEGE_POOL,
} from "./questions_multi.js";

// ─── COMBINED ANSWER POOL ─────────────────────────────────────────────────────
export const ANSWER_POOLS = {
  ...NBA_POOLS,
  ...NFL_POOLS,
  ...MLB_POOLS,
  ...NHL_POOLS,
  ...SOCCER_POOLS,
  ...MULTI_POOLS,
};

// ─── DIFFICULTY TIERS ────────────────────────────────────────────────────────
// Each tier is built by combining the equivalent tier from every sport file.
export const QUESTION_BANK = {
  beginner: [
    ...NBA_BEGINNER,
    ...NFL_BEGINNER,
    ...MLB_BEGINNER,
    ...NHL_BEGINNER,
    ...SOCCER_BEGINNER,
    ...MULTI_BEGINNER,
  ],
  knowledgeable: [
    ...NBA_KNOWLEDGEABLE,
    ...NFL_KNOWLEDGEABLE,
    ...MLB_KNOWLEDGEABLE,
    ...NHL_KNOWLEDGEABLE,
    ...SOCCER_KNOWLEDGEABLE,
    ...MULTI_KNOWLEDGEABLE,
  ],
  expert: [
    ...NBA_EXPERT,
    ...NFL_EXPERT,
    ...MLB_EXPERT,
    ...NHL_EXPERT,
    ...SOCCER_EXPERT,
    ...MULTI_EXPERT,
  ],
};

// ─── SPORT POOLS ─────────────────────────────────────────────────────────────
// Used by buildPuzzle when a sport filter is active.
export const SPORT_POOLS = {
  nba:     [...NBA_BEGINNER,    ...NBA_KNOWLEDGEABLE,    ...NBA_EXPERT],
  nfl:     [...NFL_BEGINNER,    ...NFL_KNOWLEDGEABLE,    ...NFL_EXPERT],
  mlb:     [...MLB_BEGINNER,    ...MLB_KNOWLEDGEABLE,    ...MLB_EXPERT],
  nhl:     [...NHL_BEGINNER,    ...NHL_KNOWLEDGEABLE,    ...NHL_EXPERT],
  soccer:  [...SOCCER_BEGINNER, ...SOCCER_KNOWLEDGEABLE, ...SOCCER_EXPERT],
  college: COLLEGE_POOL,
  multi:   [...MULTI_BEGINNER,  ...MULTI_KNOWLEDGEABLE,  ...MULTI_EXPERT],
};

// ─── DIFFICULTY META ─────────────────────────────────────────────────────────
export const DIFFICULTY_META = {
  beginner:      { label: "BEGINNER",      sublabel: "The basics — any sports fan should know these", color: "#4ECDC4" },
  knowledgeable: { label: "KNOWLEDGEABLE", sublabel: "For the dedicated sports fan",                  color: "#F7B731" },
  expert:        { label: "EXPERT",        sublabel: "Deep cuts. SportsCenter every night.",           color: "#FC5C65" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Shuffle an array in place (Fisher-Yates). */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Build a 9-question puzzle.
 * When sport !== "all", draws from that sport's pool regardless of difficulty.
 * When sport === "all", draws from the difficulty tier across all sports.
 */
export function buildPuzzle(difficulty, sport = "all") {
  let pool;
  if (sport !== "all" && SPORT_POOLS[sport]) {
    pool = [...SPORT_POOLS[sport]];
  } else {
    pool = [...QUESTION_BANK[difficulty]];
  }
  shuffle(pool);
  return pool.slice(0, 9).map(k => ({ questionKey: k }));
}

/** Normalize a string for fuzzy answer matching. */
export function normalizeStr(s) {
  return s.toLowerCase()
    .replace(/-/g, " ").replace(/\./g, "")
    .replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

/** Return the matching answer object, or null if the guess isn't valid. */
export function matchAnswer(guess, questionKey) {
  const pool = ANSWER_POOLS[questionKey];
  if (!pool) return null;
  const g = normalizeStr(guess);
  for (const answer of pool.answers) {
    if (normalizeStr(answer.name) === g) return answer;
  }
  return null;
}

/** Flat, deduplicated, sorted list of every athlete name — used for autocomplete. */
export const ATHLETE_INDEX = (() => {
  const seen = {}, list = [];
  Object.values(ANSWER_POOLS).forEach(pool =>
    pool.answers.forEach(a => {
      if (!seen[a.name]) { seen[a.name] = true; list.push(a.name); }
    })
  );
  return list.sort((a, b) => a.localeCompare(b));
})();
