#!/usr/bin/env node
// Seed player_facts from hardcoded answer pools + Wikidata SPARQL.
// Usage: node scripts/seed_from_wikidata.mjs <SUPABASE_SERVICE_ROLE_KEY>

import https from 'https';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/seed_from_wikidata.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  process.exit(1);
}

const BATCH_SIZE = 500;

// ─── SUPABASE HELPERS ──────────────────────────────────────────────────────────

function postBatch(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url = new URL('/rest/v1/player_facts?on_conflict=player_name,sport,fact_type,fact_value', SUPABASE_URL);
    const opts = {
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'resolution=ignore-duplicates',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode });
        } else {
          resolve({ ok: false, status: res.statusCode, body: text });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function uploadFacts(rows) {
  let uploaded = 0;
  let errors = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const result = await postBatch(batch);
    if (result.ok) {
      uploaded += batch.length;
    } else {
      errors++;
      console.error(`  Batch error (${result.status}): ${(result.body || '').slice(0, 200)}`);
    }
  }
  return { uploaded, errors };
}

// ─── WIKIDATA SPARQL ───────────────────────────────────────────────────────────

function sparqlQuery(query) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ query, format: 'json' });
    const url = new URL(`https://query.wikidata.org/sparql?${params}`);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Accept': 'application/sparql-results+json',
        'User-Agent': 'TicTacShowSeeder/1.0 (https://tictacshow.com)',
      },
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(text));
          } catch (e) {
            reject(new Error(`SPARQL parse error: ${text.slice(0, 200)}`));
          }
        } else {
          reject(new Error(`SPARQL ${res.statusCode}: ${text.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── PHASE A: SEED FROM HARDCODED ANSWER POOLS ────────────────────────────────

async function phaseA() {
  console.log('\n═══ PHASE A: Seeding from hardcoded answer pools ═══\n');

  // Dynamic import of question files (ES modules)
  const srcDir = path.resolve(__dirname, '..', 'src', 'data');
  const toURL = (file) => pathToFileURL(path.join(srcDir, file)).href;
  const { NBA_POOLS }    = await import(toURL('questions_nba.js'));
  const { NFL_POOLS }    = await import(toURL('questions_nfl.js'));
  const { MLB_POOLS }    = await import(toURL('questions_mlb.js'));
  const { NHL_POOLS }    = await import(toURL('questions_nhl.js'));
  const { SOCCER_POOLS } = await import(toURL('questions_soccer.js'));
  const { MULTI_POOLS }  = await import(toURL('questions_multi.js'));

  const ALL_POOLS = {
    ...NBA_POOLS, ...NFL_POOLS, ...MLB_POOLS,
    ...NHL_POOLS, ...SOCCER_POOLS, ...MULTI_POOLS,
  };

  const rows = [];
  const seen = new Set();

  for (const [qKey, pool] of Object.entries(ALL_POOLS)) {
    const sport = pool.sport;
    const rules = pool.rules || [];
    const answers = pool.answers || [];

    for (const answer of answers) {
      const playerName = answer.name;
      for (const rule of rules) {
        const factType = rule.fact_type;
        const factValue = rule.fact_value || 'true';
        const key = `${playerName}|${sport}|${factType}|${factValue}`;
        if (!seen.has(key)) {
          seen.add(key);
          rows.push({ player_name: playerName, sport, fact_type: factType, fact_value: factValue });
        }
      }
    }
  }

  console.log(`  Collected ${rows.length} unique facts from ${Object.keys(ALL_POOLS).length} questions`);

  // Count per sport
  const sportCounts = {};
  for (const r of rows) {
    sportCounts[r.sport] = (sportCounts[r.sport] || 0) + 1;
  }
  for (const [sport, count] of Object.entries(sportCounts).sort()) {
    console.log(`    ${sport}: ${count} facts`);
  }

  const { uploaded, errors } = await uploadFacts(rows);
  console.log(`  Uploaded: ${uploaded} rows, ${errors} batch errors`);

  return { rows, ALL_POOLS };
}

// ─── PHASE B: AUGMENT WITH WIKIDATA SPARQL ─────────────────────────────────────

// Wikidata entity IDs for teams
const TEAM_WIKIDATA = {
  // NBA (30 teams)
  NBA: {
    'Lakers': 'Q121783', 'Celtics': 'Q131371', 'Bulls': 'Q128109',
    'Heat': 'Q169138', 'Knicks': 'Q131364', 'Nets': 'Q572134',
    'Warriors': 'Q157376', 'Cavaliers': 'Q162990', 'Spurs': 'Q134545',
    'Raptors': 'Q238071', '76ers': 'Q128818', 'Clippers': 'Q379751',
    'Thunder': 'Q842873', 'Rockets': 'Q132725', 'Mavericks': 'Q170414',
    'Suns': 'Q134541', 'Trail Blazers': 'Q209923', 'Nuggets': 'Q156502',
    'Pacers': 'Q168640', 'Hawks': 'Q160740', 'Bucks': 'Q156576',
    'Pistons': 'Q157392', 'Hornets': 'Q833660', 'Magic': 'Q187446',
    'Jazz': 'Q162944', 'Kings': 'Q47784', 'Pelicans': 'Q13552471',
    'Wizards': 'Q163174', 'Grizzlies': 'Q322247', 'Timberwolves': 'Q193463',
  },
  // NFL (32 teams)
  NFL: {
    'Cowboys': 'Q204862', '49ers': 'Q337758', 'Patriots': 'Q193390',
    'Broncos': 'Q170779', 'Packers': 'Q213837', 'Vikings': 'Q272103',
    'Giants': 'Q339437', 'Eagles': 'Q212691', 'Steelers': 'Q199570',
    'Chiefs': 'Q191637', 'Raiders': 'Q211305', 'Seahawks': 'Q212613',
    'Bears': 'Q179783', 'Ravens': 'Q279247', 'Colts': 'Q202572',
    'Buccaneers': 'Q192434', 'Bills': 'Q186588', 'Saints': 'Q265330',
    'Cardinals': 'Q204826', 'Dolphins': 'Q223243', 'Jets': 'Q223373',
    'Bengals': 'Q278350', 'Titans': 'Q310740', 'Chargers': 'Q312414',
    'Rams': 'Q201997', 'Falcons': 'Q232837', 'Panthers': 'Q326383',
    'Browns': 'Q180553', 'Jaguars': 'Q466814', 'Lions': 'Q254614',
    'Texans': 'Q477419',
  },
  // MLB (29 teams referenced)
  MLB: {
    'Yankees': 'Q213535', 'Red Sox': 'Q213430', 'Dodgers': 'Q382024',
    'Giants': 'Q473860', 'Cubs': 'Q280117', 'Cardinals': 'Q315452',
    'Braves': 'Q213483', 'Mets': 'Q232930', 'Astros': 'Q467758',
    'Athletics': 'Q370956', 'Reds': 'Q270504', 'Tigers': 'Q370920',
    'White Sox': 'Q373908', 'Phillies': 'Q308966', 'Pirates': 'Q308907',
    'Orioles': 'Q282905', 'Angels': 'Q272932', 'Twins': 'Q328022',
    'Rangers': 'Q327119', 'Mariners': 'Q331517', 'Royals': 'Q326800',
    'Indians': 'Q283748', 'Padres': 'Q331527', 'Rays': 'Q486892',
    'Brewers': 'Q328007', 'Nationals': 'Q379866', 'Diamondbacks': 'Q455655',
    'Marlins': 'Q473804', 'Rockies': 'Q377152',
  },
  // NHL (28 teams referenced)
  NHL: {
    'Canadiens': 'Q128053', 'Bruins': 'Q225463', 'Rangers': 'Q184124',
    'Red Wings': 'Q157543', 'Blackhawks': 'Q1588004', 'Penguins': 'Q188478',
    'Oilers': 'Q312124', 'Flyers': 'Q188473', 'Islanders': 'Q201475',
    'Devils': 'Q209449', 'Avalanche': 'Q282667', 'Lightning': 'Q310114',
    'Stars': 'Q220808', 'Kings': 'Q218920', 'Maple Leafs': 'Q192038',
    'Capitals': 'Q198563', 'Blues': 'Q188477', 'Flames': 'Q266602',
    'Sabres': 'Q378649', 'Canucks': 'Q235296', 'Sharks': 'Q216017',
    'Ducks': 'Q318605', 'Senators': 'Q248912', 'Hurricanes': 'Q265410',
    'Jets': 'Q2604329',
  },
  // Soccer (23 clubs referenced)
  Soccer: {
    'Real Madrid': 'Q8682', 'Barcelona': 'Q7156', 'Manchester United': 'Q18656',
    'Liverpool': 'Q1130849', 'Chelsea': 'Q9616', 'AC Milan': 'Q1543',
    'Juventus': 'Q3800', 'Bayern Munich': 'Q15789', 'Paris Saint-Germain': 'Q583',
    'Inter Milan': 'Q631', 'Arsenal': 'Q9617', 'Atletico Madrid': 'Q8701',
    'Manchester City': 'Q50602', 'Tottenham': 'Q18741', 'Borussia Dortmund': 'Q11756',
    'Napoli': 'Q6030', 'Sevilla': 'Q18149', 'Porto': 'Q52186',
    'Benfica': 'Q37995', 'Roma': 'Q2565', 'Valencia': 'Q10282',
  },
};

// Award entity IDs for Wikidata P166 queries
const AWARD_WIKIDATA = {
  NBA: {
    'nba_mvp': 'Q222047',
    'nba_finals_mvp': 'Q739499',
    'nba_dpoy': 'Q845884',
    'nba_all_nba_team': 'Q674359',
  },
  MLB: {
    'mlb_cy_young': 'Q634857',
    'mlb_mvp': 'Q1514249',
    'mlb_hall_of_fame': 'Q809892',
  },
  NHL: {
    'nhl_hart_trophy': 'Q678383',
    'nhl_norris_trophy': 'Q746498',
  },
  Soccer: {
    'ballon_dor': 'Q166177',
  },
};

async function phaseB(ALL_POOLS) {
  console.log('\n═══ PHASE B: Augmenting with Wikidata SPARQL ═══\n');

  const allRows = [];

  // ── B1: Team membership (played_for_team) ────────────────────────────────

  // Collect all unique team pairs from questions
  const teamPairs = []; // { sport, team1, team2 }
  for (const [qKey, pool] of Object.entries(ALL_POOLS)) {
    const teamRules = (pool.rules || []).filter(r => r.fact_type === 'played_for_team' && r.fact_value);
    if (teamRules.length >= 2) {
      const sport = pool.sport;
      // Query all pairs of teams in the question
      for (let i = 0; i < teamRules.length; i++) {
        for (let j = i + 1; j < teamRules.length; j++) {
          const t1 = teamRules[i].fact_value;
          const t2 = teamRules[j].fact_value;
          const sportMap = TEAM_WIKIDATA[sport];
          if (sportMap && sportMap[t1] && sportMap[t2]) {
            const key = `${sport}|${t1}|${t2}`;
            if (!teamPairs.find(p => `${p.sport}|${p.team1}|${p.team2}` === key)) {
              teamPairs.push({ sport, team1: t1, team2: t2, qid1: sportMap[t1], qid2: sportMap[t2] });
            }
          }
        }
      }
    }
  }

  console.log(`  Found ${teamPairs.length} unique team pairs to query\n`);

  let queriesDone = 0;
  for (const pair of teamPairs) {
    const query = `
SELECT DISTINCT ?playerLabel WHERE {
  ?player wdt:P54 wd:${pair.qid1} .
  ?player wdt:P54 wd:${pair.qid2} .
  ?player wdt:P31 wd:Q5 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}`;
    try {
      const result = await sparqlQuery(query);
      const players = result.results.bindings
        .map(b => b.playerLabel.value)
        .filter(name => !/^Q\d+$/.test(name)); // skip unresolved QIDs

      for (const playerName of players) {
        allRows.push({ player_name: playerName, sport: pair.sport, fact_type: 'played_for_team', fact_value: pair.team1 });
        allRows.push({ player_name: playerName, sport: pair.sport, fact_type: 'played_for_team', fact_value: pair.team2 });
      }

      queriesDone++;
      console.log(`  [${queriesDone}/${teamPairs.length}] ${pair.sport} ${pair.team1} ∩ ${pair.team2}: ${players.length} players`);
    } catch (err) {
      console.error(`  ERROR querying ${pair.team1} ∩ ${pair.team2}: ${err.message}`);
    }

    // Rate limit: 2s between queries
    if (queriesDone < teamPairs.length) await sleep(2000);
  }

  // ── B2: Awards (P166) ────────────────────────────────────────────────────

  console.log('\n  ── Querying awards ──\n');

  // Collect which award fact_types are actually used in questions
  const usedAwards = new Set();
  for (const pool of Object.values(ALL_POOLS)) {
    for (const rule of pool.rules || []) {
      if (rule.fact_type !== 'played_for_team') {
        usedAwards.add(`${pool.sport}|${rule.fact_type}`);
      }
    }
  }

  let awardQueries = 0;
  for (const [sport, awards] of Object.entries(AWARD_WIKIDATA)) {
    for (const [factType, qid] of Object.entries(awards)) {
      // Only query if this fact_type is actually used in questions
      if (!usedAwards.has(`${sport}|${factType}`)) continue;

      const query = `
SELECT DISTINCT ?playerLabel WHERE {
  ?player wdt:P166 wd:${qid} .
  ?player wdt:P31 wd:Q5 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}`;
      try {
        const result = await sparqlQuery(query);
        const players = result.results.bindings
          .map(b => b.playerLabel.value)
          .filter(name => !/^Q\d+$/.test(name));

        for (const playerName of players) {
          allRows.push({ player_name: playerName, sport, fact_type: factType, fact_value: 'true' });
        }

        awardQueries++;
        console.log(`  [Award] ${sport} ${factType}: ${players.length} players`);
      } catch (err) {
        console.error(`  ERROR querying award ${factType}: ${err.message}`);
      }

      await sleep(2000);
    }
  }

  // Deduplicate
  const seen = new Set();
  const unique = [];
  for (const row of allRows) {
    const key = `${row.player_name}|${row.sport}|${row.fact_type}|${row.fact_value}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(row);
    }
  }

  console.log(`\n  Wikidata total: ${unique.length} unique facts (${queriesDone} team queries, ${awardQueries} award queries)`);

  if (unique.length > 0) {
    const { uploaded, errors } = await uploadFacts(unique);
    console.log(`  Uploaded: ${uploaded} rows, ${errors} batch errors`);
  }

  return unique.length;
}

// ─── PHASE C: SUMMARY & VERIFICATION ──────────────────────────────────────────

async function phaseC() {
  console.log('\n═══ PHASE C: Summary & Verification ═══\n');

  // Query total count
  const countUrl = new URL('/rest/v1/player_facts?select=id&limit=1', SUPABASE_URL);
  const countResult = await new Promise((resolve, reject) => {
    const opts = {
      hostname: countUrl.hostname,
      path: countUrl.pathname + countUrl.search,
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'count=exact',
        'Range-Unit': 'items',
        'Range': '0-0',
      },
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const contentRange = res.headers['content-range'] || '';
        const total = contentRange.split('/')[1] || '?';
        resolve(total);
      });
    });
    req.on('error', reject);
    req.end();
  });

  console.log(`  Total player_facts rows: ${countResult}`);

  // Verification: Lakers + Celtics intersection
  const lakersUrl = `/rest/v1/rpc/validate_answer`;
  // Instead, let's query a simple count of Lakers facts
  const verifyUrl = new URL(
    '/rest/v1/player_facts?select=player_name&fact_type=eq.played_for_team&fact_value=eq.Lakers&sport=eq.NBA',
    SUPABASE_URL
  );
  const lakersResult = await new Promise((resolve, reject) => {
    const opts = {
      hostname: verifyUrl.hostname,
      path: verifyUrl.pathname + verifyUrl.search,
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
      },
    };
    const req = https.request(opts, res => {
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

  const celticsUrl = new URL(
    '/rest/v1/player_facts?select=player_name&fact_type=eq.played_for_team&fact_value=eq.Celtics&sport=eq.NBA',
    SUPABASE_URL
  );
  const celticsResult = await new Promise((resolve, reject) => {
    const opts = {
      hostname: celticsUrl.hostname,
      path: celticsUrl.pathname + celticsUrl.search,
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
      },
    };
    const req = https.request(opts, res => {
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

  const lakersSet = new Set(lakersResult.map(r => r.player_name));
  const bothTeams = celticsResult.filter(r => lakersSet.has(r.player_name));
  console.log(`  Lakers players: ${lakersResult.length}`);
  console.log(`  Celtics players: ${celticsResult.length}`);
  console.log(`  Lakers ∩ Celtics: ${bothTeams.length} players`);
  if (bothTeams.length > 0) {
    console.log(`    Sample: ${bothTeams.slice(0, 5).map(r => r.player_name).join(', ')}`);
  }
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  TicTacShow — Seed player_facts');
  console.log('═══════════════════════════════════════════════════════════');

  const { ALL_POOLS } = await phaseA();
  await phaseB(ALL_POOLS);
  await phaseC();

  console.log('\n═══ DONE ═══\n');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
