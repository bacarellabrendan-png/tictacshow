// ─── LIVE RARITY BLEND ────────────────────────────────────────────────────────
// Combines real submission counts for a square with the prior estimate:
//
//   rarity% = (count + K × prior% / 100) / (total + K) × 100
//
// With no real submissions this is exactly the prior. The prior counts as K
// imaginary submissions, so real data gets 50% weight at 50 submissions,
// 80% at 200, 95% at 1,000. Everything is keyed by player id.

export const BLEND_K = 50;

// Prior for a player the estimate doesn't know. Every player who owns a fact has a
// page-view estimate, so this should never be used; it is logged when it is.
const UNKNOWN_PRIOR_PCT = 0.1;

/**
 * @param {Map<number, number>} prior  player id → prior %
 * @param {{ total: number, counts: Map<number, number> } | null} square  real valid counts by player id
 * @returns {Map<number, number>} player id → blended %
 */
export function blendRarities(prior, square) {
  const total = square?.total || 0;
  const counts = square?.counts || new Map();
  const out = new Map();
  for (const key of new Set([...prior.keys(), ...counts.keys()])) {
    if (!prior.has(key)) console.warn(`[rarity] player ${key} has submissions but no prior; using ${UNKNOWN_PRIOR_PCT}%`);
    const priorPct = prior.get(key) ?? UNKNOWN_PRIOR_PCT;
    out.set(key, ((counts.get(key) || 0) + (BLEND_K * priorPct) / 100) / (total + BLEND_K) * 100);
  }
  return out;
}
