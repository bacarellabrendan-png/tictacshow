// ─── ANSWER POOLS ────────────────────────────────────────────────
// rarity = % of people who would give this answer (lower = rarer = wins)
export const ANSWER_POOLS = {
  q_nba_champ: { clue: "Name an NBA player who won 5 or more championships", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:72},{name:"Magic Johnson",rarity:58},{name:"Kareem Abdul-Jabbar",rarity:45},
    {name:"LeBron James",rarity:38},{name:"Kobe Bryant",rarity:35},{name:"Scottie Pippen",rarity:28},
    {name:"Bill Russell",rarity:22},{name:"Robert Horry",rarity:14},{name:"John Havlicek",rarity:9},
    {name:"Ron Harper",rarity:8},{name:"John Salley",rarity:5},{name:"Sam Jones",rarity:4},
  ]},
  q_nfl_sb: { clue: "Name an NFL quarterback with 4 or more Super Bowl victories", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:85},{name:"Joe Montana",rarity:55},{name:"Terry Bradshaw",rarity:30},
  ]},
  q_mlb_hr: { clue: "Name an MLB player who hit 500 or more career home runs", sport: "MLB", answers: [
    {name:"Babe Ruth",rarity:70},{name:"Barry Bonds",rarity:65},{name:"Hank Aaron",rarity:60},
    {name:"Alex Rodriguez",rarity:45},{name:"Willie Mays",rarity:42},{name:"Ken Griffey Jr",rarity:35},
    {name:"David Ortiz",rarity:30},{name:"Sammy Sosa",rarity:28},{name:"Mark McGwire",rarity:25},
    {name:"Manny Ramirez",rarity:22},{name:"Frank Thomas",rarity:20},{name:"Jim Thome",rarity:18},
    {name:"Reggie Jackson",rarity:15},{name:"Gary Sheffield",rarity:12},{name:"Mike Schmidt",rarity:10},
    {name:"Ernie Banks",rarity:9},{name:"Rafael Palmeiro",rarity:8},{name:"Harmon Killebrew",rarity:7},
    {name:"Eddie Mathews",rarity:5},{name:"Mel Ott",rarity:3},
  ]},
  q_nhl_goals: { clue: "Name an NHL player who scored 700 or more career goals", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Gordie Howe",rarity:45},{name:"Jaromir Jagr",rarity:35},
    {name:"Brett Hull",rarity:28},{name:"Phil Esposito",rarity:12},{name:"Marcel Dionne",rarity:8},
    {name:"Mike Gartner",rarity:6},
  ]},
  q_two_decades: { clue: "Name an athlete who won a league MVP award in two different decades", sport: "Multi", answers: [
    {name:"LeBron James",rarity:45},{name:"Tom Brady",rarity:30},{name:"Peyton Manning",rarity:25},
    {name:"Barry Bonds",rarity:20},{name:"Brett Favre",rarity:18},{name:"Roger Clemens",rarity:12},
    {name:"Steve Nash",rarity:10},
  ]},
  q_heisman_hof: { clue: "Name a Heisman Trophy winner inducted into the Pro Football Hall of Fame", sport: "NFL/NCAA", answers: [
    {name:"Barry Sanders",rarity:55},{name:"Marcus Allen",rarity:30},{name:"O.J. Simpson",rarity:22},
    {name:"Roger Staubach",rarity:20},{name:"Tony Dorsett",rarity:18},{name:"Earl Campbell",rarity:15},
    {name:"Tim Brown",rarity:9},{name:"Paul Hornung",rarity:8},{name:"Doak Walker",rarity:4},
    {name:"Vic Janowicz",rarity:1},
  ]},
  q_nba_bust: { clue: "Name an NBA player drafted top-5 overall who never made an All-Star game", sport: "NBA", answers: [
    {name:"Kwame Brown",rarity:40},{name:"Anthony Bennett",rarity:35},{name:"Michael Olowokandi",rarity:22},
    {name:"Andrea Bargnani",rarity:20},{name:"Hasheem Thabeet",rarity:18},{name:"Adam Morrison",rarity:12},
    {name:"Marvin Williams",rarity:10},{name:"Olden Polynice",rarity:5},
  ]},
  q_300_wins: { clue: "Name an MLB pitcher with 300 or more career wins", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:60},{name:"Roger Clemens",rarity:50},{name:"Randy Johnson",rarity:48},
    {name:"Greg Maddux",rarity:42},{name:"Tom Seaver",rarity:25},{name:"Steve Carlton",rarity:20},
    {name:"Warren Spahn",rarity:15},{name:"Don Sutton",rarity:12},{name:"Phil Niekro",rarity:8},
    {name:"Gaylord Perry",rarity:7},{name:"Early Wynn",rarity:5},{name:"Kid Nichols",rarity:2},
  ]},
  q_nhl_50goals: { clue: "Name an NHL player who scored 50 or more goals in a single season", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:75},{name:"Mario Lemieux",rarity:55},{name:"Brett Hull",rarity:40},
    {name:"Mike Bossy",rarity:25},{name:"Steve Yzerman",rarity:20},{name:"Teemu Selanne",rarity:18},
    {name:"Phil Esposito",rarity:18},{name:"Marcel Dionne",rarity:15},{name:"Guy Lafleur",rarity:14},
    {name:"Jaromir Jagr",rarity:12},{name:"Jari Kurri",rarity:10},{name:"Luc Robitaille",rarity:8},
  ]},
  q_nba_50pts: { clue: "Name an NBA player who scored 50+ points in a game multiple times", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:65},{name:"Michael Jordan",rarity:55},{name:"Kobe Bryant",rarity:50},
    {name:"Elgin Baylor",rarity:20},{name:"LeBron James",rarity:18},{name:"Rick Barry",rarity:12},
    {name:"Kevin Durant",rarity:15},{name:"James Harden",rarity:14},{name:"Damian Lillard",rarity:8},
    {name:"Devin Booker",rarity:7},{name:"David Thompson",rarity:5},
  ]},
  q_nfl_rushing: { clue: "Name an NFL player who rushed for 1,500+ yards in a single season", sport: "NFL", answers: [
    {name:"Barry Sanders",rarity:60},{name:"Eric Dickerson",rarity:55},{name:"Adrian Peterson",rarity:50},
    {name:"LaDainian Tomlinson",rarity:45},{name:"Emmitt Smith",rarity:35},{name:"Derrick Henry",rarity:32},
    {name:"Chris Johnson",rarity:30},{name:"O.J. Simpson",rarity:28},{name:"Jamal Lewis",rarity:25},
    {name:"Earl Campbell",rarity:18},{name:"Barry Foster",rarity:12},
  ]},
  q_mlb_batting: { clue: "Name an MLB player who hit .400 or above in a single season since 1900", sport: "MLB", answers: [
    {name:"Ted Williams",rarity:60},{name:"Ty Cobb",rarity:50},{name:"Rogers Hornsby",rarity:45},
    {name:"Babe Ruth",rarity:15},{name:"George Sisler",rarity:20},{name:"Bill Terry",rarity:8},
    {name:"Harry Heilmann",rarity:10},
  ]},
  q_nba_scoring: { clue: "Name an NBA player who won the scoring title 3 or more times", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:70},{name:"Wilt Chamberlain",rarity:55},{name:"Allen Iverson",rarity:30},
    {name:"Kevin Durant",rarity:25},{name:"James Harden",rarity:20},{name:"George Gervin",rarity:20},
    {name:"Bob McAdoo",rarity:10},{name:"Neil Johnston",rarity:4},
  ]},
  q_nfl_sb_mvp: { clue: "Name an NFL player who won Super Bowl MVP more than once", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:75},{name:"Joe Montana",rarity:55},{name:"Eli Manning",rarity:35},
    {name:"Terry Bradshaw",rarity:30},{name:"Bart Starr",rarity:20},
  ]},
  q_mlb_cy_young: { clue: "Name an MLB pitcher who won the Cy Young Award 3 or more times", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:60},{name:"Randy Johnson",rarity:50},{name:"Greg Maddux",rarity:45},
    {name:"Clayton Kershaw",rarity:35},{name:"Pedro Martinez",rarity:30},{name:"Steve Carlton",rarity:25},
    {name:"Tom Seaver",rarity:18},
  ]},
  q_mlb_stolen: { clue: "Name an MLB player with 900 or more career stolen bases", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:70},{name:"Lou Brock",rarity:40},{name:"Ty Cobb",rarity:20},
    {name:"Tim Raines",rarity:18},{name:"Vince Coleman",rarity:12},{name:"Billy Hamilton",rarity:15},
  ]},
  q_nba_assists: { clue: "Name an NBA player who averaged 10+ assists per game for a full season", sport: "NBA", answers: [
    {name:"Magic Johnson",rarity:60},{name:"John Stockton",rarity:55},{name:"Isiah Thomas",rarity:35},
    {name:"Chris Paul",rarity:30},{name:"Jason Kidd",rarity:25},{name:"Kevin Porter",rarity:10},
    {name:"Guy Rodgers",rarity:4},{name:"Norm Nixon",rarity:6},
  ]},
  q_nfl_receiving: { clue: "Name an NFL wide receiver or tight end with 1,000+ career receptions", sport: "NFL", answers: [
    {name:"Jerry Rice",rarity:55},{name:"Larry Fitzgerald",rarity:40},{name:"Tony Gonzalez",rarity:35},
    {name:"Terrell Owens",rarity:30},{name:"Randy Moss",rarity:28},{name:"Jason Witten",rarity:25},
    {name:"Marvin Harrison",rarity:20},{name:"Andre Johnson",rarity:16},{name:"Wes Welker",rarity:12},
    {name:"Tim Brown",rarity:15},{name:"Isaac Bruce",rarity:12},{name:"Reggie Wayne",rarity:14},
  ]},
  q_nhl_points: { clue: "Name an NHL player with 1,700 or more career points", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Mario Lemieux",rarity:55},{name:"Gordie Howe",rarity:45},
    {name:"Mark Messier",rarity:35},{name:"Jaromir Jagr",rarity:30},{name:"Steve Yzerman",rarity:25},
    {name:"Phil Esposito",rarity:18},{name:"Raymond Bourque",rarity:15},{name:"Ron Francis",rarity:20},
    {name:"Marcel Dionne",rarity:12},
  ]},
  q_mlb_strikeouts: { clue: "Name an MLB pitcher with 3,500 or more career strikeouts", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Randy Johnson",rarity:55},{name:"Roger Clemens",rarity:45},
    {name:"Pedro Martinez",rarity:28},{name:"Greg Maddux",rarity:25},{name:"Steve Carlton",rarity:30},
    {name:"Bob Gibson",rarity:22},{name:"Walter Johnson",rarity:18},{name:"Tom Seaver",rarity:20},
    {name:"Bert Blyleven",rarity:15},{name:"Curt Schilling",rarity:14},{name:"Don Sutton",rarity:12},
    {name:"Gaylord Perry",rarity:8},
  ]},
  q_nfl_defensive: { clue: "Name an NFL player who won Defensive Player of the Year more than twice", sport: "NFL", answers: [
    {name:"Lawrence Taylor",rarity:45},{name:"Aaron Donald",rarity:30},{name:"Reggie White",rarity:35},
    {name:"Bruce Smith",rarity:25},{name:"Deion Sanders",rarity:20},{name:"Rod Woodson",rarity:12},
    {name:"Micah Parsons",rarity:10},
  ]},
  q_mlb_triple_crown: { clue: "Name an MLB player who won the Triple Crown since 1950", sport: "MLB", answers: [
    {name:"Miguel Cabrera",rarity:40},{name:"Mickey Mantle",rarity:35},{name:"Carl Yastrzemski",rarity:30},
    {name:"Frank Robinson",rarity:22},
  ]},
  q_nba_dpoy: { clue: "Name an NBA player who won Defensive Player of the Year 3 or more times", sport: "NBA", answers: [
    {name:"Dikembe Mutombo",rarity:50},{name:"Dwight Howard",rarity:45},{name:"Ben Wallace",rarity:40},
    {name:"Rudy Gobert",rarity:35},{name:"Mark Eaton",rarity:15},{name:"Sidney Moncrief",rarity:10},
  ]},
  q_nhl_cup_foreign: { clue: "Name a European-born NHL player who won 3 or more Stanley Cups", sport: "NHL", answers: [
    {name:"Peter Forsberg",rarity:45},{name:"Nicklas Lidstrom",rarity:35},{name:"Jari Kurri",rarity:20},
    {name:"Tomas Holmstrom",rarity:12},{name:"Esa Tikkanen",rarity:8},{name:"Vladimir Konstantinov",rarity:6},
  ]},
  q_mlb_no_hitter: { clue: "Name an MLB pitcher who threw 2 or more career no-hitters", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Sandy Koufax",rarity:40},{name:"Max Scherzer",rarity:22},
    {name:"Justin Verlander",rarity:18},{name:"Bob Feller",rarity:20},{name:"Cy Young",rarity:18},
    {name:"Jim Maloney",rarity:6},{name:"Allie Reynolds",rarity:5},{name:"Virgil Trucks",rarity:5},
    {name:"Larry Corcoran",rarity:4},
  ]},
  q_nfl_coach_rings: { clue: "Name an NFL head coach who won 3 or more Super Bowls", sport: "NFL", answers: [
    {name:"Bill Belichick",rarity:70},{name:"Chuck Noll",rarity:30},{name:"Joe Gibbs",rarity:22},
    {name:"Bill Walsh",rarity:20},{name:"Vince Lombardi",rarity:18},{name:"Tom Landry",rarity:12},
  ]},
};

// ─── DIFFICULTY BUCKETS ──────────────────────────────────────────
// Each difficulty has exactly 9 questions so every square on the board is covered.
// Expert reuses q_two_decades intentionally (it spans difficulty levels).
export const QUESTION_BANK = {
  beginner:      ["q_nba_champ","q_nfl_sb","q_mlb_hr","q_nba_50pts","q_nfl_rushing","q_mlb_batting","q_nba_scoring","q_nfl_sb_mvp","q_mlb_cy_young"],
  knowledgeable: ["q_nhl_goals","q_300_wins","q_nhl_50goals","q_two_decades","q_mlb_stolen","q_nba_assists","q_nfl_receiving","q_nhl_points","q_mlb_strikeouts"],
  expert:        ["q_heisman_hof","q_nba_bust","q_two_decades","q_nfl_defensive","q_mlb_triple_crown","q_nba_dpoy","q_nhl_cup_foreign","q_mlb_no_hitter","q_nfl_coach_rings"],
};

export const DIFFICULTY_META = {
  beginner:      { label: "BEGINNER",      sublabel: "The basics — any sports fan should know these", color: "#4ECDC4" },
  knowledgeable: { label: "KNOWLEDGEABLE", sublabel: "For the dedicated sports fan",                  color: "#F7B731" },
  expert:        { label: "EXPERT",        sublabel: "Deep cuts. SportsCenter every night.",           color: "#FC5C65" },
};

// ─── HELPERS ─────────────────────────────────────────────────────

/** Shuffle and assign one question per square for a new game. */
export function buildPuzzle(difficulty) {
  const bank = [...QUESTION_BANK[difficulty]];
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank.slice(0, 9).map(k => ({ questionKey: k }));
}

/** Normalize a string for fuzzy answer matching. */
export function normalizeStr(s) {
  return s.toLowerCase().replace(/-/g, " ").replace(/\./g, "").replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

/** Return the matching answer object, or null if the guess isn't in the pool. */
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
    pool.answers.forEach(a => { if (!seen[a.name]) { seen[a.name] = true; list.push(a.name); } })
  );
  return list.sort((a, b) => a.localeCompare(b));
})();
