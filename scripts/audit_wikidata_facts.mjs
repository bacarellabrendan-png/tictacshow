#!/usr/bin/env node
// Audit player_facts: find Wikidata-sourced facts, cross-reference against
// hardcoded answer pools, and flag suspected errors.
// Usage: node scripts/audit_wikidata_facts.mjs <SUPABASE_SERVICE_ROLE_KEY>

import https from 'https';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/audit_wikidata_facts.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  process.exit(1);
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function supabaseGet(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch { resolve([]); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── LOAD HARDCODED POOLS ──────────────────────────────────────────────────────

async function loadHardcodedPools() {
  const srcDir = path.resolve(__dirname, '..', 'src', 'data');
  const toURL = (file) => pathToFileURL(path.join(srcDir, file)).href;

  const { NBA_POOLS }    = await import(toURL('questions_nba.js'));
  const { NFL_POOLS }    = await import(toURL('questions_nfl.js'));
  const { MLB_POOLS }    = await import(toURL('questions_mlb.js'));
  const { NHL_POOLS }    = await import(toURL('questions_nhl.js'));
  const { SOCCER_POOLS } = await import(toURL('questions_soccer.js'));
  const { MULTI_POOLS }  = await import(toURL('questions_multi.js'));

  return { ...NBA_POOLS, ...NFL_POOLS, ...MLB_POOLS, ...NHL_POOLS, ...SOCCER_POOLS, ...MULTI_POOLS };
}

function buildTrustedSet(allPools) {
  // Build set of trusted facts: "playerName|sport|fact_type|fact_value"
  const trusted = new Set();
  // Also build: which teams does each (player, sport) belong to according to hardcoded pools?
  const playerTeams = new Map(); // "player|sport" → Set of team names
  // Also build: which players are known for each sport?
  const knownPlayers = new Map(); // sport → Set of player names
  // Also build: for each (team, sport), which players are in hardcoded pools?
  const teamRosters = new Map(); // "sport|team" → Set of player names
  // Also build: which questions involve each team pair?
  const teamPairQuestions = new Map(); // "sport|team1|team2" → question key

  for (const [qKey, pool] of Object.entries(allPools)) {
    const sport = pool.sport;
    const rules = pool.rules || [];
    const answers = pool.answers || [];

    if (!knownPlayers.has(sport)) knownPlayers.set(sport, new Set());
    const sportPlayers = knownPlayers.get(sport);

    // Track team pair questions
    const teamRules = rules.filter(r => r.fact_type === 'played_for_team' && r.fact_value);
    if (teamRules.length >= 2) {
      for (let i = 0; i < teamRules.length; i++) {
        for (let j = i + 1; j < teamRules.length; j++) {
          const key = `${sport}|${teamRules[i].fact_value}|${teamRules[j].fact_value}`;
          teamPairQuestions.set(key, qKey);
        }
      }
    }

    for (const answer of answers) {
      const playerName = answer.name;
      sportPlayers.add(playerName);

      for (const rule of rules) {
        const factType = rule.fact_type;
        const factValue = rule.fact_value || 'true';
        trusted.add(`${playerName}|${sport}|${factType}|${factValue}`);

        if (factType === 'played_for_team' && factValue !== 'true') {
          const ptKey = `${playerName}|${sport}`;
          if (!playerTeams.has(ptKey)) playerTeams.set(ptKey, new Set());
          playerTeams.get(ptKey).add(factValue);

          const trKey = `${sport}|${factValue}`;
          if (!teamRosters.has(trKey)) teamRosters.set(trKey, new Set());
          teamRosters.get(trKey).add(playerName);
        }
      }
    }
  }

  return { trusted, playerTeams, knownPlayers, teamRosters, teamPairQuestions };
}

// ─── FETCH ALL PLAYER_FACTS FROM SUPABASE ──────────────────────────────────────

async function fetchAllFacts() {
  const allFacts = [];
  let offset = 0;
  const limit = 1000;

  while (true) {
    const batch = await supabaseGet(
      `/rest/v1/player_facts?select=id,player_name,sport,fact_type,fact_value&order=id&offset=${offset}&limit=${limit}`
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    allFacts.push(...batch);
    offset += batch.length;
    if (batch.length < limit) break;
  }

  return allFacts;
}

// ─── MAIN AUDIT ────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  TicTacShow — Wikidata Facts Audit');
  console.log('═══════════════════════════════════════════════════════════\n');

  // 1. Load hardcoded pools
  console.log('Loading hardcoded answer pools...');
  const allPools = await loadHardcodedPools();
  const { trusted, playerTeams, knownPlayers, teamRosters, teamPairQuestions } = buildTrustedSet(allPools);
  console.log(`  ${trusted.size} trusted facts from ${Object.keys(allPools).length} questions\n`);

  // 2. Fetch all facts from DB
  console.log('Fetching all player_facts from Supabase...');
  const allFacts = await fetchAllFacts();
  console.log(`  ${allFacts.length} total facts in database\n`);

  // 3. Partition into hardcoded vs Wikidata-only
  const hardcodedFacts = [];
  const wikidataFacts = [];

  for (const fact of allFacts) {
    const key = `${fact.player_name}|${fact.sport}|${fact.fact_type}|${fact.fact_value}`;
    if (trusted.has(key)) {
      hardcodedFacts.push(fact);
    } else {
      wikidataFacts.push(fact);
    }
  }

  console.log(`  Hardcoded (trusted): ${hardcodedFacts.length}`);
  console.log(`  Wikidata-only: ${wikidataFacts.length}\n`);

  // 4. Audit Wikidata-only facts
  const flags = []; // { fact, reason, severity }

  // Separate by type
  const wikiTeamFacts = wikidataFacts.filter(f => f.fact_type === 'played_for_team');
  const wikiAwardFacts = wikidataFacts.filter(f => f.fact_type !== 'played_for_team');

  console.log(`  Wikidata played_for_team facts: ${wikiTeamFacts.length}`);
  console.log(`  Wikidata award/achievement facts: ${wikiAwardFacts.length}\n`);

  // ── 4a. Audit played_for_team facts ──────────────────────────────────────

  console.log('═══ AUDITING played_for_team FACTS ═══\n');

  for (const fact of wikiTeamFacts) {
    const reasons = [];
    const playerSportKey = `${fact.player_name}|${fact.sport}`;
    const isKnownPlayer = knownPlayers.get(fact.sport)?.has(fact.player_name) || false;
    const playerKnownTeams = playerTeams.get(playerSportKey);

    // Check 1: QID name (unresolved Wikidata entity)
    if (/^Q\d+$/.test(fact.player_name)) {
      reasons.push('UNRESOLVED_QID: Name is a Wikidata entity ID, not a real name');
    }

    // Check 2: Player not in any hardcoded pool for this sport
    if (!isKnownPlayer) {
      // Check if player is known in a DIFFERENT sport (cross-sport contamination)
      let otherSport = null;
      for (const [sport, players] of knownPlayers) {
        if (sport !== fact.sport && players.has(fact.player_name)) {
          otherSport = sport;
          break;
        }
      }
      if (otherSport) {
        reasons.push(`CROSS_SPORT: Player known in ${otherSport} but fact is for ${fact.sport}`);
      } else {
        reasons.push(`UNKNOWN_PLAYER: Not in any hardcoded ${fact.sport} pool`);
      }
    }

    // Check 3: Known player but NOT in any hardcoded pool for this specific team
    if (isKnownPlayer) {
      const teamRosterKey = `${fact.sport}|${fact.fact_value}`;
      const rosterForTeam = teamRosters.get(teamRosterKey);
      const isInTeamRoster = rosterForTeam?.has(fact.player_name) || false;

      if (!isInTeamRoster) {
        // Player is known in the sport but not attributed to this team in any hardcoded pool
        const teams = playerKnownTeams ? Array.from(playerKnownTeams).join(', ') : 'none';
        reasons.push(`UNVERIFIED_TEAM: Known ${fact.sport} player, hardcoded teams: [${teams}], but Wikidata says also ${fact.fact_value}`);
      }
    }

    // Check 4: Name looks like it might be non-English or garbled
    if (/[^\x20-\x7E\u00C0-\u024F\u1E00-\u1EFF'\-\.]/.test(fact.player_name)) {
      reasons.push('NON_LATIN_NAME: Contains unusual characters');
    }

    if (reasons.length > 0) {
      const severity = reasons.some(r => r.startsWith('UNRESOLVED_QID') || r.startsWith('CROSS_SPORT'))
        ? 'HIGH'
        : reasons.some(r => r.startsWith('UNVERIFIED_TEAM'))
          ? 'MEDIUM'
          : 'LOW';
      flags.push({ fact, reasons, severity });
    }
  }

  // ── 4b. Audit award/achievement facts ────────────────────────────────────

  console.log('═══ AUDITING AWARD FACTS ═══\n');

  for (const fact of wikiAwardFacts) {
    const reasons = [];
    const isKnownPlayer = knownPlayers.get(fact.sport)?.has(fact.player_name) || false;

    // Check 1: QID name
    if (/^Q\d+$/.test(fact.player_name)) {
      reasons.push('UNRESOLVED_QID: Name is a Wikidata entity ID');
    }

    // Check 2: Not in any pool for this sport
    if (!isKnownPlayer) {
      let otherSport = null;
      for (const [sport, players] of knownPlayers) {
        if (sport !== fact.sport && players.has(fact.player_name)) {
          otherSport = sport;
          break;
        }
      }
      if (otherSport) {
        reasons.push(`CROSS_SPORT: Player known in ${otherSport} but award fact is for ${fact.sport}`);
      } else {
        reasons.push(`UNKNOWN_PLAYER: Not in any hardcoded ${fact.sport} pool`);
      }
    }

    // Check 3: Known player but not in any hardcoded pool for this award type
    if (isKnownPlayer) {
      // Check if this player is in a hardcoded pool that uses this fact_type
      const awardKey = `${fact.player_name}|${fact.sport}|${fact.fact_type}|${fact.fact_value}`;
      if (!trusted.has(awardKey)) {
        reasons.push(`UNVERIFIED_AWARD: Known ${fact.sport} player but not in any hardcoded pool for ${fact.fact_type}`);
      }
    }

    // Check 4: Non-Latin name
    if (/[^\x20-\x7E\u00C0-\u024F\u1E00-\u1EFF'\-\.]/.test(fact.player_name)) {
      reasons.push('NON_LATIN_NAME: Contains unusual characters');
    }

    if (reasons.length > 0) {
      const severity = reasons.some(r => r.startsWith('UNRESOLVED_QID') || r.startsWith('CROSS_SPORT'))
        ? 'HIGH'
        : reasons.some(r => r.startsWith('UNVERIFIED_AWARD'))
          ? 'MEDIUM'
          : 'LOW';
      flags.push({ fact, reasons, severity });
    }
  }

  // ── 5. Generate Report ───────────────────────────────────────────────────

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║              AUDIT REPORT                               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Summary
  console.log('── SUMMARY ──\n');
  console.log(`Total facts in DB:       ${allFacts.length}`);
  console.log(`Hardcoded (trusted):     ${hardcodedFacts.length} (${(hardcodedFacts.length / allFacts.length * 100).toFixed(1)}%)`);
  console.log(`Wikidata-only:           ${wikidataFacts.length} (${(wikidataFacts.length / allFacts.length * 100).toFixed(1)}%)`);
  console.log(`  - played_for_team:     ${wikiTeamFacts.length}`);
  console.log(`  - awards:              ${wikiAwardFacts.length}`);
  console.log(`Total flagged:           ${flags.length}`);
  console.log(`  - HIGH severity:       ${flags.filter(f => f.severity === 'HIGH').length}`);
  console.log(`  - MEDIUM severity:     ${flags.filter(f => f.severity === 'MEDIUM').length}`);
  console.log(`  - LOW severity:        ${flags.filter(f => f.severity === 'LOW').length}`);
  console.log(`Unflagged Wikidata:      ${wikidataFacts.length - flags.length} (clean additions)\n`);

  // Per-sport breakdown
  console.log('── PER-SPORT BREAKDOWN ──\n');
  const sports = [...new Set(allFacts.map(f => f.sport))].sort();
  for (const sport of sports) {
    const sportTotal = allFacts.filter(f => f.sport === sport).length;
    const sportHardcoded = hardcodedFacts.filter(f => f.sport === sport).length;
    const sportWiki = wikidataFacts.filter(f => f.sport === sport).length;
    const sportFlagged = flags.filter(f => f.fact.sport === sport).length;
    console.log(`  ${sport.padEnd(10)} Total: ${String(sportTotal).padStart(5)} | Hardcoded: ${String(sportHardcoded).padStart(5)} | Wikidata: ${String(sportWiki).padStart(5)} | Flagged: ${String(sportFlagged).padStart(4)}`);
  }

  // HIGH severity flags (definite errors)
  const highFlags = flags.filter(f => f.severity === 'HIGH');
  if (highFlags.length > 0) {
    console.log('\n\n── HIGH SEVERITY (likely errors — delete recommended) ──\n');
    for (const flag of highFlags) {
      const f = flag.fact;
      console.log(`  [${f.sport}] "${f.player_name}" — ${f.fact_type}: ${f.fact_value}`);
      for (const r of flag.reasons) {
        console.log(`    ⚠ ${r}`);
      }
      console.log(`    DB id: ${f.id}`);
    }
  }

  // MEDIUM severity flags (needs review)
  const medFlags = flags.filter(f => f.severity === 'MEDIUM');
  if (medFlags.length > 0) {
    console.log('\n\n── MEDIUM SEVERITY (known players, unverified facts — review needed) ──\n');

    // Group by sport for readability
    const medBySport = {};
    for (const flag of medFlags) {
      const sport = flag.fact.sport;
      if (!medBySport[sport]) medBySport[sport] = [];
      medBySport[sport].push(flag);
    }

    for (const [sport, sportFlags] of Object.entries(medBySport).sort()) {
      console.log(`  ── ${sport} (${sportFlags.length} flags) ──`);

      // Group by player within sport
      const byPlayer = {};
      for (const flag of sportFlags) {
        const name = flag.fact.player_name;
        if (!byPlayer[name]) byPlayer[name] = [];
        byPlayer[name].push(flag);
      }

      for (const [player, playerFlags] of Object.entries(byPlayer).sort()) {
        const facts = playerFlags.map(f => `${f.fact.fact_type}:${f.fact.fact_value}`).join(', ');
        const firstReason = playerFlags[0].reasons[0];
        console.log(`    ${player} — ${facts}`);
        console.log(`      ${firstReason}`);
        console.log(`      IDs: [${playerFlags.map(f => f.fact.id).join(', ')}]`);
      }
      console.log('');
    }
  }

  // LOW severity flags (unknown players — probably fine but unverifiable from our data)
  const lowFlags = flags.filter(f => f.severity === 'LOW');
  if (lowFlags.length > 0) {
    console.log('\n── LOW SEVERITY (unknown players — cannot verify from hardcoded data) ──\n');

    const lowBySport = {};
    for (const flag of lowFlags) {
      const sport = flag.fact.sport;
      if (!lowBySport[sport]) lowBySport[sport] = [];
      lowBySport[sport].push(flag);
    }

    for (const [sport, sportFlags] of Object.entries(lowBySport).sort()) {
      // Group by player
      const byPlayer = {};
      for (const flag of sportFlags) {
        const name = flag.fact.player_name;
        if (!byPlayer[name]) byPlayer[name] = [];
        byPlayer[name].push(flag);
      }

      const playerCount = Object.keys(byPlayer).length;
      console.log(`  ── ${sport} (${playerCount} unknown players, ${sportFlags.length} facts) ──`);

      // Show first 50 players, summarize rest
      const playerEntries = Object.entries(byPlayer).sort();
      const showLimit = 200;
      for (const [player, playerFlags] of playerEntries.slice(0, showLimit)) {
        const teams = playerFlags
          .filter(f => f.fact.fact_type === 'played_for_team')
          .map(f => f.fact.fact_value);
        const awards = playerFlags
          .filter(f => f.fact.fact_type !== 'played_for_team')
          .map(f => f.fact.fact_type);
        const parts = [];
        if (teams.length) parts.push(`teams: ${teams.join(', ')}`);
        if (awards.length) parts.push(`awards: ${awards.join(', ')}`);
        const hasNonLatin = playerFlags.some(f => f.reasons.some(r => r.startsWith('NON_LATIN')));
        const marker = hasNonLatin ? ' ⚠NON-LATIN' : '';
        console.log(`    ${player} — ${parts.join(' | ')}${marker}`);
      }
      if (playerEntries.length > showLimit) {
        console.log(`    ... and ${playerEntries.length - showLimit} more players`);
      }
      console.log('');
    }
  }

  // ── 6. Coverage Report ─────────────────────────────────────────────────

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║              COVERAGE REPORT                            ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // For each question with played_for_team rules, count:
  // - Hardcoded answers
  // - Additional Wikidata players (unflagged)
  // - Additional Wikidata players (flagged)

  // Build Wikidata additions per team pair
  const cleanWikiFacts = new Set();
  const flaggedFactIds = new Set(flags.map(f => f.fact.id));
  for (const fact of wikidataFacts) {
    if (!flaggedFactIds.has(fact.id)) {
      cleanWikiFacts.add(`${fact.player_name}|${fact.sport}|${fact.fact_type}|${fact.fact_value}`);
    }
  }

  console.log('── PLAYED_FOR_TEAM QUESTIONS: Hardcoded vs Wikidata coverage ──\n');

  let totalHardcodedAnswers = 0;
  let totalWikidataAdditions = 0;
  let questionsWithWikidata = 0;
  let questionsWithoutWikidata = 0;

  const teamQuestions = Object.entries(allPools)
    .filter(([_, pool]) => (pool.rules || []).every(r => r.fact_type === 'played_for_team' && r.fact_value))
    .filter(([_, pool]) => (pool.rules || []).length >= 2)
    .sort(([_, a], [__, b]) => a.sport.localeCompare(b.sport));

  for (const [qKey, pool] of teamQuestions) {
    const rules = pool.rules;
    const hardcodedCount = pool.answers.length;
    totalHardcodedAnswers += hardcodedCount;

    // Find additional Wikidata players for this question
    // A player is a valid Wikidata addition if they have clean (unflagged) facts for ALL teams in the question
    const wikiPlayers = new Set();

    // Get all players who have played_for_team facts for the first team
    const firstTeam = rules[0].fact_value;
    for (const fact of wikidataFacts) {
      if (fact.sport === pool.sport && fact.fact_type === 'played_for_team' && fact.fact_value === firstTeam
          && !flaggedFactIds.has(fact.id)) {
        // Check if this player has clean facts for ALL teams
        let hasAll = true;
        for (const rule of rules) {
          const key = `${fact.player_name}|${pool.sport}|played_for_team|${rule.fact_value}`;
          if (!cleanWikiFacts.has(key) && !trusted.has(key)) {
            hasAll = false;
            break;
          }
        }
        if (hasAll) {
          // Only count if NOT already in hardcoded
          const isHardcoded = pool.answers.some(a => a.name === fact.player_name);
          if (!isHardcoded) {
            wikiPlayers.add(fact.player_name);
          }
        }
      }
    }

    if (wikiPlayers.size > 0) {
      questionsWithWikidata++;
      totalWikidataAdditions += wikiPlayers.size;
      console.log(`  ${qKey}`);
      console.log(`    ${pool.sport} | ${rules.map(r => r.fact_value).join(' ∩ ')}`);
      console.log(`    Hardcoded: ${hardcodedCount} | Wikidata adds: +${wikiPlayers.size} | Total: ${hardcodedCount + wikiPlayers.size}`);
      if (wikiPlayers.size <= 20) {
        console.log(`    New players: ${[...wikiPlayers].join(', ')}`);
      } else {
        console.log(`    New players (first 20): ${[...wikiPlayers].slice(0, 20).join(', ')}`);
        console.log(`    ... and ${wikiPlayers.size - 20} more`);
      }
      console.log('');
    } else {
      questionsWithoutWikidata++;
    }
  }

  console.log(`\n── COVERAGE SUMMARY ──\n`);
  console.log(`  Team-pair questions with Wikidata additions:    ${questionsWithWikidata}`);
  console.log(`  Team-pair questions with hardcoded data only:   ${questionsWithoutWikidata}`);
  console.log(`  Total hardcoded team-pair answers:              ${totalHardcodedAnswers}`);
  console.log(`  Total clean Wikidata additions:                 ${totalWikidataAdditions}`);
  console.log(`  Coverage increase:                              +${(totalWikidataAdditions / totalHardcodedAnswers * 100).toFixed(1)}%`);

  // Award coverage
  console.log('\n── AWARD FACTS COVERAGE ──\n');
  const awardTypes = [...new Set(wikiAwardFacts.map(f => `${f.sport}|${f.fact_type}`))].sort();
  for (const key of awardTypes) {
    const [sport, factType] = key.split('|');
    const totalWiki = wikiAwardFacts.filter(f => f.sport === sport && f.fact_type === factType).length;
    const flaggedWiki = flags.filter(f => f.fact.sport === sport && f.fact.fact_type === factType).length;
    const cleanWiki = totalWiki - flaggedWiki;
    const hardcoded = hardcodedFacts.filter(f => f.sport === sport && f.fact_type === factType).length;
    console.log(`  ${sport.padEnd(8)} ${factType.padEnd(25)} Hardcoded: ${String(hardcoded).padStart(4)} | Wikidata clean: ${String(cleanWiki).padStart(4)} | Wikidata flagged: ${String(flaggedWiki).padStart(4)}`);
  }

  console.log('\n═══ AUDIT COMPLETE ═══\n');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
