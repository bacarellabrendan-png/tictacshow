import { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://uqufvtajxqbicuxlxcxu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_pd4ivJb9U-FeNgeRcPcRaA_cA5vlCHk";

// ─── SUPABASE CLIENT ─────────────────────────────────────────────
async function sbFetch(path, options = {}) {
  const session = JSON.parse(localStorage.getItem("tts_session") || "null");
  const headers = {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    ...options.headers,
  };
  const res = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

async function signUp(email, password, username) {
  const r = await sbFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, options: { data: { username } } }),
  });
  if (r.ok && r.data.access_token) {
    localStorage.setItem("tts_session", JSON.stringify(r.data));
    localStorage.setItem("tts_user", JSON.stringify({ id: r.data.user.id, email, username }));
  }
  return r;
}

async function signIn(email, password) {
  const r = await sbFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (r.ok && r.data.access_token) {
    localStorage.setItem("tts_session", JSON.stringify(r.data));
    const username = r.data.user?.user_metadata?.username || email.split("@")[0];
    localStorage.setItem("tts_user", JSON.stringify({ id: r.data.user.id, email, username }));
  }
  return r;
}

function signOut() {
  localStorage.removeItem("tts_session");
  localStorage.removeItem("tts_user");
}

function getUser() {
  return JSON.parse(localStorage.getItem("tts_user") || "null");
}

async function dbSelect(table, params = "") {
  return sbFetch(`/rest/v1/${table}${params}`, { method: "GET", headers: { "Prefer": "return=representation" } });
}

async function dbInsert(table, data) {
  return sbFetch(`/rest/v1/${table}`, { method: "POST", body: JSON.stringify(data), headers: { "Prefer": "return=representation" } });
}

async function dbUpdate(table, params, data) {
  return sbFetch(`/rest/v1/${table}${params}`, { method: "PATCH", body: JSON.stringify(data), headers: { "Prefer": "return=representation" } });
}

// ─── COLORS ──────────────────────────────────────────────────────
const BG = "#1c1c2e", SURFACE = "#25253a", SURFACE2 = "#2e2e46";
const BORDER = "#3a3a55", TEXT_HI = "#f0f0fa", TEXT_MID = "#a8a8c8", TEXT_LO = "#6a6a90";

// ─── ANSWER POOLS ────────────────────────────────────────────────
const ANSWER_POOLS = {
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
    {name:"Brett Hull",rarity:28},{name:"Phil Esposito",rarity:12},{name:"Marcel Dionne",rarity:8},{name:"Mike Gartner",rarity:6},
  ]},
  q_two_decades: { clue: "Name an athlete who won a league MVP award in two different decades", sport: "Multi", answers: [
    {name:"LeBron James",rarity:45},{name:"Tom Brady",rarity:30},{name:"Peyton Manning",rarity:25},
    {name:"Barry Bonds",rarity:20},{name:"Brett Favre",rarity:18},{name:"Roger Clemens",rarity:12},{name:"Steve Nash",rarity:10},
  ]},
  q_heisman_hof: { clue: "Name a Heisman Trophy winner inducted into the Pro Football Hall of Fame", sport: "NFL/NCAA", answers: [
    {name:"Barry Sanders",rarity:55},{name:"Marcus Allen",rarity:30},{name:"O.J. Simpson",rarity:22},
    {name:"Roger Staubach",rarity:20},{name:"Tony Dorsett",rarity:18},{name:"Earl Campbell",rarity:15},
    {name:"Tim Brown",rarity:9},{name:"Paul Hornung",rarity:8},{name:"Doak Walker",rarity:4},{name:"Vic Janowicz",rarity:1},
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
    {name:"Elgin Baylor",rarity:20},{name:"Rick Barry",rarity:12},{name:"LeBron James",rarity:18},
    {name:"Kevin Durant",rarity:15},{name:"James Harden",rarity:14},{name:"Damian Lillard",rarity:8},
    {name:"Devin Booker",rarity:7},{name:"David Thompson",rarity:5},
  ]},
  q_nfl_rushing: { clue: "Name an NFL player who rushed for 1,500+ yards in a single season", sport: "NFL", answers: [
    {name:"Eric Dickerson",rarity:55},{name:"Barry Sanders",rarity:60},{name:"Adrian Peterson",rarity:50},
    {name:"Jamal Lewis",rarity:25},{name:"Barry Foster",rarity:12},{name:"Chris Johnson",rarity:30},
    {name:"LaDainian Tomlinson",rarity:45},{name:"Earl Campbell",rarity:18},{name:"Emmitt Smith",rarity:35},
    {name:"O.J. Simpson",rarity:28},{name:"Derrick Henry",rarity:32},
  ]},
  q_mlb_batting: { clue: "Name an MLB player who hit .400 or above in a single season since 1900", sport: "MLB", answers: [
    {name:"Ted Williams",rarity:60},{name:"Rogers Hornsby",rarity:45},{name:"Ty Cobb",rarity:50},
    {name:"George Sisler",rarity:20},{name:"Harry Heilmann",rarity:10},{name:"Babe Ruth",rarity:15},{name:"Bill Terry",rarity:8},
  ]},
  q_nba_scoring: { clue: "Name an NBA player who won the scoring title 3 or more times", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:70},{name:"Wilt Chamberlain",rarity:55},{name:"George Gervin",rarity:20},
    {name:"Allen Iverson",rarity:30},{name:"Kevin Durant",rarity:25},{name:"James Harden",rarity:20},
    {name:"Bob McAdoo",rarity:10},{name:"Neil Johnston",rarity:4},
  ]},
  q_nfl_sb_mvp: { clue: "Name an NFL player who won Super Bowl MVP more than once", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:75},{name:"Joe Montana",rarity:55},{name:"Bart Starr",rarity:20},
    {name:"Terry Bradshaw",rarity:30},{name:"Eli Manning",rarity:35},
  ]},
  q_mlb_cy_young: { clue: "Name an MLB pitcher who won the Cy Young Award 3 or more times", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:60},{name:"Randy Johnson",rarity:50},{name:"Greg Maddux",rarity:45},
    {name:"Steve Carlton",rarity:25},{name:"Clayton Kershaw",rarity:35},{name:"Tom Seaver",rarity:18},{name:"Pedro Martinez",rarity:30},
  ]},
  q_mlb_stolen: { clue: "Name an MLB player with 900 or more career stolen bases", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:70},{name:"Lou Brock",rarity:40},{name:"Billy Hamilton",rarity:15},
    {name:"Ty Cobb",rarity:20},{name:"Tim Raines",rarity:18},{name:"Vince Coleman",rarity:12},
  ]},
  q_nba_assists: { clue: "Name an NBA player who averaged 10+ assists per game for a full season", sport: "NBA", answers: [
    {name:"John Stockton",rarity:55},{name:"Magic Johnson",rarity:60},{name:"Isiah Thomas",rarity:35},
    {name:"Kevin Porter",rarity:10},{name:"Norm Nixon",rarity:6},{name:"Jason Kidd",rarity:25},
    {name:"Chris Paul",rarity:30},{name:"Guy Rodgers",rarity:4},
  ]},
  q_nfl_receiving: { clue: "Name an NFL wide receiver or tight end with 1,000+ career receptions", sport: "NFL", answers: [
    {name:"Jerry Rice",rarity:55},{name:"Tony Gonzalez",rarity:35},{name:"Larry Fitzgerald",rarity:40},
    {name:"Jason Witten",rarity:25},{name:"Marvin Harrison",rarity:20},{name:"Terrell Owens",rarity:30},
    {name:"Randy Moss",rarity:28},{name:"Isaac Bruce",rarity:12},{name:"Tim Brown",rarity:15},
    {name:"Reggie Wayne",rarity:14},{name:"Andre Johnson",rarity:16},{name:"Wes Welker",rarity:12},
  ]},
  q_nhl_points: { clue: "Name an NHL player with 1,700 or more career points", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Mark Messier",rarity:35},{name:"Gordie Howe",rarity:45},
    {name:"Ron Francis",rarity:20},{name:"Marcel Dionne",rarity:12},{name:"Steve Yzerman",rarity:25},
    {name:"Mario Lemieux",rarity:55},{name:"Phil Esposito",rarity:18},{name:"Raymond Bourque",rarity:15},{name:"Jaromir Jagr",rarity:30},
  ]},
  q_mlb_strikeouts: { clue: "Name an MLB pitcher with 3,500 or more career strikeouts", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Randy Johnson",rarity:55},{name:"Roger Clemens",rarity:45},
    {name:"Steve Carlton",rarity:30},{name:"Bert Blyleven",rarity:15},{name:"Tom Seaver",rarity:20},
    {name:"Don Sutton",rarity:12},{name:"Gaylord Perry",rarity:8},{name:"Walter Johnson",rarity:18},
    {name:"Greg Maddux",rarity:25},{name:"Bob Gibson",rarity:22},{name:"Pedro Martinez",rarity:28},{name:"Curt Schilling",rarity:14},
  ]},
  q_nfl_defensive: { clue: "Name an NFL player who won Defensive Player of the Year more than twice", sport: "NFL", answers: [
    {name:"Lawrence Taylor",rarity:45},{name:"Reggie White",rarity:35},{name:"Bruce Smith",rarity:25},
    {name:"Deion Sanders",rarity:20},{name:"Rod Woodson",rarity:12},{name:"Aaron Donald",rarity:30},{name:"Micah Parsons",rarity:10},
  ]},
  q_mlb_triple_crown: { clue: "Name an MLB player who won the Triple Crown since 1950", sport: "MLB", answers: [
    {name:"Mickey Mantle",rarity:35},{name:"Frank Robinson",rarity:22},{name:"Carl Yastrzemski",rarity:30},{name:"Miguel Cabrera",rarity:40},
  ]},
  q_nba_dpoy: { clue: "Name an NBA player who won Defensive Player of the Year 3 or more times", sport: "NBA", answers: [
    {name:"Dikembe Mutombo",rarity:50},{name:"Ben Wallace",rarity:40},{name:"Dwight Howard",rarity:45},
    {name:"Mark Eaton",rarity:15},{name:"Sidney Moncrief",rarity:10},{name:"Rudy Gobert",rarity:35},
  ]},
  q_nhl_cup_foreign: { clue: "Name a European-born NHL player who won 3 or more Stanley Cups", sport: "NHL", answers: [
    {name:"Nicklas Lidstrom",rarity:35},{name:"Tomas Holmstrom",rarity:12},{name:"Peter Forsberg",rarity:45},
    {name:"Jari Kurri",rarity:20},{name:"Esa Tikkanen",rarity:8},{name:"Vladimir Konstantinov",rarity:6},
  ]},
  q_mlb_no_hitter: { clue: "Name an MLB pitcher who threw 2 or more career no-hitters", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Sandy Koufax",rarity:40},{name:"Bob Feller",rarity:20},
    {name:"Cy Young",rarity:18},{name:"Jim Maloney",rarity:6},{name:"Larry Corcoran",rarity:4},
    {name:"Virgil Trucks",rarity:5},{name:"Allie Reynolds",rarity:5},{name:"Max Scherzer",rarity:22},{name:"Justin Verlander",rarity:18},
  ]},
  q_nfl_coach_rings: { clue: "Name an NFL head coach who won 3 or more Super Bowls", sport: "NFL", answers: [
    {name:"Bill Belichick",rarity:70},{name:"Chuck Noll",rarity:30},{name:"Joe Gibbs",rarity:22},
    {name:"Bill Walsh",rarity:20},{name:"Vince Lombardi",rarity:18},{name:"Tom Landry",rarity:12},
  ]},
};

const QUESTION_BANK = {
  beginner:      ["q_nba_champ","q_nfl_sb","q_mlb_hr","q_nba_50pts","q_nfl_rushing","q_mlb_batting","q_nba_scoring","q_nfl_sb_mvp","q_mlb_cy_young"],
  knowledgeable: ["q_nhl_goals","q_300_wins","q_nhl_50goals","q_two_decades","q_mlb_stolen","q_nba_assists","q_nfl_receiving","q_nhl_points","q_mlb_strikeouts"],
  expert:        ["q_heisman_hof","q_nba_bust","q_two_decades","q_nfl_defensive","q_mlb_triple_crown","q_nba_dpoy","q_nhl_cup_foreign","q_mlb_no_hitter","q_nfl_coach_rings"],
};

const DIFFICULTY_META = {
  beginner:      { label: "BEGINNER",      sublabel: "The basics — any sports fan should know these", color: "#4ECDC4" },
  knowledgeable: { label: "KNOWLEDGEABLE", sublabel: "For the dedicated sports fan",                  color: "#F7B731" },
  expert:        { label: "EXPERT",        sublabel: "Deep cuts. SportsCenter every night.",           color: "#FC5C65" },
};

function buildPuzzle(difficulty) {
  const bank = [...QUESTION_BANK[difficulty]];
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank.slice(0, 9).map(k => ({ questionKey: k }));
}

function normalizeStr(s) {
  return s.toLowerCase().replace(/-/g, " ").replace(/\./g, "").replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function matchAnswer(guess, questionKey) {
  const pool = ANSWER_POOLS[questionKey];
  if (!pool) return null;
  const g = normalizeStr(guess);
  for (let i = 0; i < pool.answers.length; i++) {
    if (normalizeStr(pool.answers[i].name) === g) return pool.answers[i];
  }
  return null;
}

const ATHLETE_INDEX = (() => {
  const seen = {}, list = [];
  Object.values(ANSWER_POOLS).forEach(pool => pool.answers.forEach(a => { if (!seen[a.name]) { seen[a.name] = true; list.push(a.name); } }));
  return list.sort((a, b) => a.localeCompare(b));
})();

function genInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const WINNING_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] !== "reset")
      return { winner: board[a], line: [a, b, c] };
  }
  if (board.every(v => v !== null && v !== "null")) return { winner: "draw", line: [] };
  return null;
}

// ─── COMPONENTS ──────────────────────────────────────────────────
function RarityBar({ score }) {
  const pct = Math.max(2, Math.min(100, score));
  const col = score < 10 ? "#FC5C65" : score < 30 ? "#F7B731" : "#4ECDC4";
  const tier = score < 10 ? "RARE" : score < 30 ? "UNCOMMON" : "COMMON";
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.25rem" }}>
        <span style={{ fontSize:"0.62rem", color:TEXT_LO, letterSpacing:"1px" }}>POPULARITY</span>
        <span style={{ fontSize:"0.62rem", color:col, letterSpacing:"1px" }}>{tier} {score}%</span>
      </div>
      <div style={{ height:4, background:BORDER, borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:pct+"%", height:"100%", background:col, borderRadius:2 }} />
      </div>
    </div>
  );
}

function AutocompleteInput({ value, onChange, onSelect, onSubmit, disabled, placeholder, diffColor }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef(null);
  const suggestions = value.trim().length >= 1
    ? ATHLETE_INDEX.filter(n => normalizeStr(n).includes(normalizeStr(value))).slice(0, 8)
    : [];
  useEffect(() => setHi(0), [value]);
  useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={wrapRef} style={{ position:"relative", flex:1 }}>
      <input className="ai" value={value} disabled={disabled} autoComplete="off" placeholder={placeholder}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => {
          if (e.key === "ArrowDown") { e.preventDefault(); setHi(h => Math.min(h+1, suggestions.length-1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setHi(h => Math.max(h-1, 0)); }
          else if (e.key === "Enter") { e.preventDefault(); if (open && suggestions.length > 0) { onSelect(suggestions[hi]); setOpen(false); } else onSubmit(); }
          else if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && suggestions.length > 0 && !disabled && (
        <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0, background:SURFACE2, border:"1px solid "+diffColor+"66", borderRadius:10, zIndex:100, overflow:"hidden", boxShadow:"0 8px 24px rgba(0,0,0,0.5)" }}>
          {suggestions.map((name, i) => (
            <div key={name} onMouseDown={e => { e.preventDefault(); onSelect(name); setOpen(false); }} onMouseEnter={() => setHi(i)}
              style={{ padding:"0.65rem 1rem", background:i===hi ? diffColor+"22" : "transparent", color:i===hi ? TEXT_HI : TEXT_MID, fontSize:"0.9rem", cursor:"pointer", borderBottom:i < suggestions.length-1 ? "1px solid "+BORDER : "none" }}>
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function TicTacShow() {
  const [user, setUser] = useState(getUser());
  const [screen, setScreen] = useState("lobby"); // auth | lobby | create | join | game
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "", username: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [myGames, setMyGames] = useState([]);
  const [lobbyLoading, setLobbyLoading] = useState(false);
  const [game, setGame] = useState(null);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [myAnswer, setMyAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentMove, setCurrentMove] = useState(null);
  const [showReveal, setShowReveal] = useState(false);
  const [revealStep, setRevealStep] = useState(0);
  const [historyModal, setHistoryModal] = useState(null);
  const [copyMsg, setCopyMsg] = useState("");
  const pollRef = useRef(null);

  useEffect(() => {
    if (!user) { setScreen("auth"); return; }
    setScreen("lobby");
    loadMyGames();
  }, [user]);

  // Check URL for invite code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("join");
    if (code && user) { setJoinCode(code); setScreen("join"); }
  }, [user]);

  // Poll for game updates
  useEffect(() => {
    if (screen !== "game" || !game) return;
    pollRef.current = setInterval(() => refreshGame(), 3000);
    return () => clearInterval(pollRef.current);
  }, [screen, game?.id]);

  async function loadMyGames() {
    setLobbyLoading(true);
    const r = await dbSelect("games", `?or=(player1_id.eq.${user.id},player2_id.eq.${user.id})&order=updated_at.desc&limit=20`);
    if (r.ok) setMyGames(r.data);
    setLobbyLoading(false);
  }

  async function refreshGame() {
    if (!game) return;
    const r = await dbSelect("games", `?id=eq.${game.id}`);
    if (r.ok && r.data[0]) {
      const fresh = r.data[0];
      // Check for new move completion
      if (fresh.phase === "choosing" && game.phase === "answering") {
        setShowReveal(true);
        setRevealStep(0);
        setTimeout(() => setRevealStep(1), 500);
        setTimeout(() => setRevealStep(2), 1300);
        setTimeout(() => setRevealStep(3), 2300);
        setTimeout(() => { setShowReveal(false); setRevealStep(0); setSubmitted(false); setMyAnswer(""); setCurrentMove(null); }, 4500);
      }
      setGame(fresh);
    }
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError(""); setAuthLoading(true);
    if (authMode === "signup") {
      if (!authForm.username.trim()) { setAuthError("Username is required"); setAuthLoading(false); return; }
      const r = await signUp(authForm.email, authForm.password, authForm.username);
      if (r.ok) { setUser(getUser()); }
      else { setAuthError(r.data?.msg || r.data?.error_description || "Sign up failed"); }
    } else {
      const r = await signIn(authForm.email, authForm.password);
      if (r.ok) { setUser(getUser()); }
      else { setAuthError(r.data?.error_description || "Invalid email or password"); }
    }
    setAuthLoading(false);
  }

  async function createGame() {
    const cells = buildPuzzle(difficulty);
    const code = genInviteCode();
    const r = await dbInsert("games", {
      invite_code: code,
      difficulty,
      cells,
      player1_id: user.id,
      player1_name: user.username,
      phase: "waiting",
      board: Array(9).fill("null"),
      scores: { p1: 0, p2: 0 },
      win_line: [],
    });
    if (r.ok && r.data[0]) {
      setGame(r.data[0]);
      setScreen("game");
      setSubmitted(false); setMyAnswer(""); setCurrentMove(null); setShowReveal(false);
    }
  }

  async function joinGame() {
    setJoinError("");
    const r = await dbSelect("games", `?invite_code=eq.${joinCode.toUpperCase().trim()}`);
    if (!r.ok || !r.data[0]) { setJoinError("Game not found. Check the code and try again."); return; }
    const g = r.data[0];
    if (g.player2_id) { setJoinError("This game already has two players."); return; }
    if (g.player1_id === user.id) { setJoinError("You cannot join your own game."); return; }
    const upd = await dbUpdate("games", `?id=eq.${g.id}`, { player2_id: user.id, player2_name: user.username, phase: "choosing" });
    if (upd.ok) {
      const fresh = await dbSelect("games", `?id=eq.${g.id}`);
      setGame(fresh.data[0]);
      setScreen("game");
      setSubmitted(false); setMyAnswer(""); setCurrentMove(null); setShowReveal(false);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }

  async function selectCell(idx) {
    if (!game || game.phase !== "choosing") return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    if (game.choosing_player !== myRole) return;
    if (game.board[idx] !== "null" && game.board[idx] !== null) return;
    const qKey = game.cells[idx].questionKey;
    // Create move row
    const mv = await dbInsert("moves", { game_id: game.id, cell_index: idx, question_key: qKey });
    if (mv.ok && mv.data[0]) setCurrentMove(mv.data[0]);
    await dbUpdate("games", `?id=eq.${game.id}`, { active_cell: idx, phase: "answering" });
    await refreshGame();
  }

  async function submitAnswer() {
    if (submitted || !myAnswer.trim() || !game || !currentMove) return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    const qKey = game.cells[game.active_cell].questionKey;
    const match = matchAnswer(myAnswer, qKey);
    const answerData = myRole === "p1"
      ? { p1_answer: myAnswer, p1_valid: !!match, p1_rarity: match ? match.rarity : null }
      : { p2_answer: myAnswer, p2_valid: !!match, p2_rarity: match ? match.rarity : null };
    await dbUpdate("moves", `?id=eq.${currentMove.id}`, answerData);
    setSubmitted(true);
    // Check if other player already answered
    const freshMove = await dbSelect("moves", `?id=eq.${currentMove.id}`);
    if (freshMove.ok && freshMove.data[0]) {
      const mv = freshMove.data[0];
      const bothIn = myRole === "p1" ? mv.p2_answer !== null : mv.p1_answer !== null;
      if (bothIn) await resolveMove(mv);
    }
  }

  async function resolveMove(mv) {
    const p1v = mv.p1_valid, p2v = mv.p2_valid;
    let result;
    if (!p1v && !p2v) result = "reset";
    else if (!p1v) result = "p2";
    else if (!p2v) result = "p1";
    else if (normalizeStr(mv.p1_answer) === normalizeStr(mv.p2_answer)) result = "reset";
    else result = mv.p1_rarity <= mv.p2_rarity ? "p1" : "p2";

    await dbUpdate("moves", `?id=eq.${mv.id}`, { result });

    const freshGame = await dbSelect("games", `?id=eq.${game.id}`);
    const g = freshGame.data[0];
    const newBoard = [...g.board];
    const idx = g.active_cell;

    if (result === "reset") {
      newBoard[idx] = "reset";
    } else {
      newBoard[idx] = result;
    }

    const newScores = { ...g.scores };
    if (result !== "reset") newScores[result] = (newScores[result] || 0) + 1;

    const winCheck = checkWinner(newBoard.map(v => v === "null" ? null : v));
    const nextChoose = result === "reset"
      ? (g.choosing_player === "p1" ? "p2" : "p1")
      : (result === "p1" ? "p2" : "p1");

    await dbUpdate("games", `?id=eq.${game.id}`, {
      board: newBoard,
      scores: newScores,
      active_cell: null,
      phase: winCheck ? "gameover" : "choosing",
      choosing_player: nextChoose,
      winner: winCheck ? winCheck.winner : null,
      win_line: winCheck ? winCheck.line : [],
    });

    if (result === "reset") {
      setTimeout(async () => {
        const nb = [...newBoard];
        nb[idx] = "null";
        await dbUpdate("games", `?id=eq.${game.id}`, { board: nb });
      }, 2000);
    }

    await refreshGame();
  }

  // Poll for opponent answer when we've submitted
  useEffect(() => {
    if (!submitted || !currentMove || !game) return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    const iv = setInterval(async () => {
      const r = await dbSelect("moves", `?id=eq.${currentMove.id}`);
      if (r.ok && r.data[0]) {
        const mv = r.data[0];
        const otherAnswered = myRole === "p1" ? mv.p2_answer !== null : mv.p1_answer !== null;
        if (otherAnswered && !mv.result) {
          clearInterval(iv);
          await resolveMove(mv);
        }
      }
    }, 2000);
    return () => clearInterval(iv);
  }, [submitted, currentMove?.id]);

  const myRole = game ? (game.player1_id === user.id ? "p1" : "p2") : null;
  const diffMeta = difficulty ? DIFFICULTY_META[difficulty] : DIFFICULTY_META.beginner;
  const gameDiffMeta = game ? DIFFICULTY_META[game.difficulty] : null;
  const diffColor = gameDiffMeta ? gameDiffMeta.color : "#FF6B35";
  const activeQ = game && game.active_cell != null ? ANSWER_POOLS[game.cells[game.active_cell].questionKey] : null;
  const isMyPickTurn = game && game.phase === "choosing" && myRole === game.choosing_player;
  const inviteLink = game ? `${window.location.origin}${window.location.pathname}?join=${game.invite_code}` : "";

  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
    @keyframes shimmer { 0% { background-position:-200% center } 100% { background-position:200% center } }
    @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
    @keyframes winPulse { from { box-shadow:0 0 0 0 rgba(255,107,53,0.45) } to { box-shadow:0 0 0 14px rgba(255,107,53,0) } }
    .ni { background:${SURFACE2}; border:1px solid ${BORDER}; border-radius:10px; color:${TEXT_HI}; padding:0.85rem 1.1rem; font-size:1rem; font-family:'DM Serif Display',serif; width:100%; outline:none; transition:border-color 0.2s; }
    .ni:focus { border-color:#FF6B35; }
    .ai { background:${SURFACE2}; border:2px solid ${BORDER}; border-radius:10px; color:${TEXT_HI}; padding:0.8rem 1rem; font-size:1rem; font-family:'DM Serif Display',serif; width:100%; outline:none; transition:border-color 0.2s; }
    .ai:focus { border-color:${diffColor}; }
    .ai:disabled { opacity:0.4; cursor:not-allowed; }
    .big-btn { background:linear-gradient(135deg,#FF6B35,#e8460a); border:none; border-radius:12px; color:#fff; padding:1rem 2.5rem; font-size:1.3rem; font-family:'Bebas Neue',cursive; letter-spacing:3px; cursor:pointer; width:100%; box-shadow:0 6px 24px rgba(255,107,53,0.35); transition:all 0.2s; }
    .big-btn:hover { transform:translateY(-2px); }
    .sb { background:${diffColor}; border:none; border-radius:10px; color:#000; padding:0.8rem 1.3rem; font-family:'Bebas Neue',cursive; letter-spacing:2px; font-size:1rem; cursor:pointer; transition:all 0.15s; white-space:nowrap; }
    .sb:disabled { opacity:0.35; cursor:not-allowed; }
    .cell { aspect-ratio:1; border-radius:14px; border:2px solid ${BORDER}; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.65rem; transition:all 0.2s; position:relative; overflow:hidden; text-align:center; min-height:82px; background:${SURFACE}; }
    .pickable { cursor:pointer; }
    .pickable:hover { border-color:${diffColor}99; background:${SURFACE2} !important; transform:scale(1.03); }
    .active-cell { border-color:${diffColor} !important; box-shadow:0 0 0 3px ${diffColor}33; }
    .win-cell { animation:winPulse 1.1s infinite; border-color:${diffColor} !important; }
    .completed { cursor:pointer; }
    .completed:hover { filter:brightness(1.15); transform:scale(1.02); }
  `;

  // ── AUTH SCREEN ──────────────────────────────────────────────────
  if (!user || screen === "auth") return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
      <style>{globalCSS}</style>
      <div style={{ textAlign:"center", marginBottom:"2rem" }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,10vw,6rem)", lineHeight:0.9, letterSpacing:"2px" }}>
          <span style={{ color:TEXT_HI }}>TIC TAC </span>
          <span style={{ background:"linear-gradient(90deg,#FF6B35,#FC5C65,#FF6B35)", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>SHOW</span>
        </div>
        <div style={{ color:TEXT_LO, fontFamily:"'DM Serif Display',serif", fontStyle:"italic", marginTop:"0.5rem" }}>The sports trivia showdown</div>
      </div>
      <div style={{ background:SURFACE, border:"1px solid "+BORDER, borderRadius:20, padding:"2rem", width:"100%", maxWidth:420, animation:"fadeIn 0.5s ease" }}>
        <div style={{ display:"flex", marginBottom:"1.5rem", borderBottom:"1px solid "+BORDER }}>
          {["login","signup"].map(m => (
            <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }}
              style={{ flex:1, padding:"0.6rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"'Bebas Neue',cursive", fontSize:"1.1rem", letterSpacing:"2px", color:authMode===m ? TEXT_HI : TEXT_LO, borderBottom:authMode===m ? "3px solid #FF6B35" : "3px solid transparent" }}>
              {m === "login" ? "LOG IN" : "SIGN UP"}
            </button>
          ))}
        </div>
        <form onSubmit={handleAuth}>
          {authMode === "signup" && (
            <div style={{ marginBottom:"1rem" }}>
              <label style={{ color:TEXT_LO, fontSize:"0.72rem", display:"block", marginBottom:"0.35rem", letterSpacing:"1.5px", fontFamily:"'Roboto Mono',monospace" }}>USERNAME</label>
              <input className="ni" placeholder="Your display name" value={authForm.username} onChange={e => setAuthForm(f => ({...f, username: e.target.value}))} />
            </div>
          )}
          <div style={{ marginBottom:"1rem" }}>
            <label style={{ color:TEXT_LO, fontSize:"0.72rem", display:"block", marginBottom:"0.35rem", letterSpacing:"1.5px", fontFamily:"'Roboto Mono',monospace" }}>EMAIL</label>
            <input className="ni" type="email" placeholder="you@email.com" value={authForm.email} onChange={e => setAuthForm(f => ({...f, email: e.target.value}))} />
          </div>
          <div style={{ marginBottom:"1.5rem" }}>
            <label style={{ color:TEXT_LO, fontSize:"0.72rem", display:"block", marginBottom:"0.35rem", letterSpacing:"1.5px", fontFamily:"'Roboto Mono',monospace" }}>PASSWORD</label>
            <input className="ni" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f => ({...f, password: e.target.value}))} />
          </div>
          {authError && <div style={{ color:"#FC5C65", fontSize:"0.85rem", marginBottom:"1rem", textAlign:"center" }}>{authError}</div>}
          <button className="big-btn" type="submit" disabled={authLoading}>
            {authLoading ? "..." : authMode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>
    </div>
  );

  // ── LOBBY ────────────────────────────────────────────────────────
  if (screen === "lobby") return (
    <div style={{ minHeight:"100vh", background:BG, color:TEXT_HI }}>
      <style>{globalCSS}</style>
      <div style={{ background:SURFACE, borderBottom:"1px solid "+BORDER, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", letterSpacing:"2px" }}>
          TIC TAC <span style={{ color:"#FF6B35" }}>SHOW</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <span style={{ color:TEXT_LO, fontSize:"0.85rem" }}>{user.username}</span>
          <button onClick={() => { signOut(); setUser(null); }} style={{ background:"transparent", border:"1px solid "+BORDER, borderRadius:8, color:TEXT_LO, padding:"0.4rem 0.8rem", cursor:"pointer", fontSize:"0.8rem" }}>Log out</button>
        </div>
      </div>
      <div style={{ maxWidth:600, margin:"0 auto", padding:"1.5rem" }}>
        <div style={{ display:"flex", gap:"0.8rem", marginBottom:"2rem" }}>
          <button className="big-btn" onClick={() => setScreen("create")} style={{ flex:1 }}>NEW GAME</button>
          <button onClick={() => setScreen("join")} style={{ flex:1, background:SURFACE, border:"1px solid "+BORDER, borderRadius:12, color:TEXT_HI, padding:"1rem", fontSize:"1.1rem", fontFamily:"'Bebas Neue',cursive", letterSpacing:"3px", cursor:"pointer" }}>JOIN GAME</button>
        </div>
        <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:"0.7rem", color:TEXT_LO, letterSpacing:"2px", marginBottom:"1rem" }}>YOUR GAMES</div>
        {lobbyLoading && <div style={{ color:TEXT_LO, textAlign:"center", padding:"2rem" }}>Loading...</div>}
        {!lobbyLoading && myGames.length === 0 && (
          <div style={{ color:TEXT_LO, textAlign:"center", padding:"3rem", fontStyle:"italic", fontFamily:"'DM Serif Display',serif" }}>No games yet — start one!</div>
        )}
        {myGames.map(g => {
          const role = g.player1_id === user.id ? "p1" : "p2";
          const oppName = role === "p1" ? (g.player2_name || "Waiting for opponent...") : g.player1_name;
          const meta = DIFFICULTY_META[g.difficulty];
          const isMyTurn = g.phase === "choosing" && g.choosing_player === role;
          const isAnswering = g.phase === "answering";
          return (
            <div key={g.id} onClick={() => { setGame(g); setScreen("game"); setSubmitted(false); setMyAnswer(""); setCurrentMove(null); setShowReveal(false); }}
              style={{ background:SURFACE, border:"1px solid "+(isMyTurn ? meta.color : BORDER), borderRadius:16, padding:"1.2rem 1.5rem", marginBottom:"0.8rem", cursor:"pointer", transition:"all 0.2s", animation:"fadeIn 0.3s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.1rem", letterSpacing:"1px" }}>vs {oppName}</div>
                <div style={{ background:meta.color+"22", border:"1px solid "+meta.color+"44", borderRadius:20, padding:"0.15rem 0.6rem", fontSize:"0.65rem", color:meta.color, fontFamily:"'Roboto Mono',monospace", letterSpacing:"1px" }}>{meta.label}</div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:"0.75rem", color:TEXT_LO, fontFamily:"'Roboto Mono',monospace" }}>
                  {g.phase === "waiting" ? "Waiting for opponent to join" :
                   g.phase === "gameover" ? "Game over — " + (g.winner === role ? "You won!" : g.winner === "draw" ? "Draw" : "You lost") :
                   isMyTurn ? "Your turn to pick" :
                   isAnswering ? "Answering in progress..." :
                   "Opponent's turn"}
                </div>
                {isMyTurn && <div style={{ fontSize:"0.65rem", color:meta.color, fontFamily:"'Roboto Mono',monospace", letterSpacing:"1px" }}>YOUR TURN</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── CREATE GAME ──────────────────────────────────────────────────
  if (screen === "create") return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
      <style>{globalCSS}</style>
      <div style={{ width:"100%", maxWidth:480 }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.5rem", letterSpacing:"4px", color:TEXT_HI, marginBottom:"0.4rem" }}>NEW GAME</div>
        <div style={{ color:TEXT_LO, fontFamily:"'DM Serif Display',serif", fontStyle:"italic", marginBottom:"2rem" }}>Pick a difficulty then share the invite link</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem", marginBottom:"2rem" }}>
          {Object.keys(DIFFICULTY_META).map(key => {
            const meta = DIFFICULTY_META[key];
            return (
              <button key={key} onClick={() => setDifficulty(key)}
                style={{ background:SURFACE, border:"2px solid "+(difficulty===key ? meta.color : BORDER), borderRadius:16, padding:"1.2rem 1.5rem", cursor:"pointer", textAlign:"left", color:TEXT_HI, transition:"all 0.2s" }}>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.5rem", letterSpacing:"2px", color:meta.color }}>{meta.label}</div>
                <div style={{ color:TEXT_MID, fontSize:"0.85rem", fontFamily:"'DM Serif Display',serif", fontStyle:"italic" }}>{meta.sublabel}</div>
              </button>
            );
          })}
        </div>
        <button className="big-btn" onClick={createGame}>CREATE & GET INVITE LINK</button>
        <button onClick={() => setScreen("lobby")} style={{ marginTop:"1rem", width:"100%", background:"transparent", border:"none", color:TEXT_LO, cursor:"pointer", fontFamily:"'DM Serif Display',serif", fontStyle:"italic" }}>Back to lobby</button>
      </div>
    </div>
  );

  // ── JOIN GAME ────────────────────────────────────────────────────
  if (screen === "join") return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
      <style>{globalCSS}</style>
      <div style={{ width:"100%", maxWidth:420 }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.5rem", letterSpacing:"4px", color:TEXT_HI, marginBottom:"0.4rem" }}>JOIN GAME</div>
        <div style={{ color:TEXT_LO, fontFamily:"'DM Serif Display',serif", fontStyle:"italic", marginBottom:"2rem" }}>Enter the invite code your opponent shared</div>
        <input className="ni" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
          placeholder="6-DIGIT CODE" style={{ marginBottom:"1rem", fontSize:"1.5rem", letterSpacing:"4px", textAlign:"center", fontFamily:"'Bebas Neue',cursive" }} />
        {joinError && <div style={{ color:"#FC5C65", marginBottom:"1rem", textAlign:"center", fontSize:"0.9rem" }}>{joinError}</div>}
        <button className="big-btn" onClick={joinGame}>JOIN GAME</button>
        <button onClick={() => { setScreen("lobby"); setJoinCode(""); setJoinError(""); window.history.replaceState({}, "", window.location.pathname); }}
          style={{ marginTop:"1rem", width:"100%", background:"transparent", border:"none", color:TEXT_LO, cursor:"pointer", fontFamily:"'DM Serif Display',serif", fontStyle:"italic" }}>Back to lobby</button>
      </div>
    </div>
  );

  // ── GAME SCREEN ──────────────────────────────────────────────────
  if (!game) return null;

  const board = game.board || Array(9).fill("null");
  const p1Colors = { p1: "#FF6B35", p2: "#4ECDC4" };

  return (
    <div style={{ minHeight:"100vh", background:BG, color:TEXT_HI, display:"flex", flexDirection:"column" }}>
      <style>{globalCSS}</style>

      {/* Header */}
      <div style={{ background:SURFACE, borderBottom:"1px solid "+BORDER, padding:"0.75rem 1.2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => { setScreen("lobby"); loadMyGames(); }} style={{ background:"transparent", border:"none", color:TEXT_LO, cursor:"pointer", fontFamily:"'Bebas Neue',cursive", fontSize:"0.9rem", letterSpacing:"1px" }}>LOBBY</button>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.3rem", letterSpacing:"2px" }}>TIC TAC <span style={{ color:"#FF6B35" }}>SHOW</span></div>
        <div style={{ background:diffColor+"22", border:"1px solid "+diffColor+"44", borderRadius:20, padding:"0.2rem 0.7rem", fontSize:"0.65rem", color:diffColor, fontFamily:"'Roboto Mono',monospace", letterSpacing:"1px" }}>
          {gameDiffMeta ? gameDiffMeta.label : ""}
        </div>
      </div>

      {/* Waiting for opponent */}
      {game.phase === "waiting" && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2rem", letterSpacing:"3px", marginBottom:"1rem" }}>WAITING FOR OPPONENT</div>
          <div style={{ color:TEXT_LO, fontFamily:"'DM Serif Display',serif", fontStyle:"italic", marginBottom:"2rem" }}>Share this link with your opponent:</div>
          <div style={{ background:SURFACE, border:"1px solid "+BORDER, borderRadius:12, padding:"1rem 1.5rem", fontFamily:"'Roboto Mono',monospace", fontSize:"0.9rem", color:TEXT_MID, marginBottom:"1rem", wordBreak:"break-all", maxWidth:480, textAlign:"center" }}>
            {inviteLink}
          </div>
          <div style={{ display:"flex", gap:"0.8rem" }}>
            <button className="sb" onClick={() => { navigator.clipboard.writeText(inviteLink); setCopyMsg("Copied!"); setTimeout(() => setCopyMsg(""), 2000); }}>
              {copyMsg || "COPY LINK"}
            </button>
            <button className="sb" style={{ background:SURFACE2, color:TEXT_HI }} onClick={() => { navigator.clipboard.writeText(game.invite_code); setCopyMsg("Code copied!"); setTimeout(() => setCopyMsg(""), 2000); }}>
              CODE: {game.invite_code}
            </button>
          </div>
          <div style={{ marginTop:"1.5rem", color:TEXT_LO, fontSize:"0.8rem", fontStyle:"italic" }}>This page will update automatically when they join</div>
        </div>
      )}

      {/* Active game */}
      {game.phase !== "waiting" && (
        <div style={{ flex:1, padding:"1rem", maxWidth:720, margin:"0 auto", width:"100%", display:"flex", flexDirection:"column", gap:"0.9rem" }}>

          {/* Score bar */}
          <div style={{ display:"flex", gap:"0.5rem" }}>
            {["p1","p2"].map(p => {
              const name = p === "p1" ? game.player1_name : game.player2_name;
              const isMe = myRole === p;
              const picking = game.phase === "choosing" && game.choosing_player === p;
              return (
                <div key={p} style={{ flex:1, background:SURFACE, border:"2px solid "+(picking ? p1Colors[p] : BORDER), borderRadius:12, padding:"0.7rem 1rem", display:"flex", alignItems:"center", gap:"0.5rem", transition:"all 0.3s" }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:p1Colors[p], display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontFamily:"'Bebas Neue',cursive", color:"#000" }}>{p==="p1"?"X":"O"}</div>
                  <div>
                    <div style={{ fontSize:"0.82rem", fontWeight:700 }}>{name} {isMe ? "(you)" : ""}</div>
                    <div style={{ fontSize:"0.62rem", color:TEXT_LO, fontFamily:"'Roboto Mono',monospace" }}>{(game.scores||{})[p]||0} sq</div>
                  </div>
                  {picking && <div style={{ marginLeft:"auto", fontSize:"0.6rem", color:p1Colors[p], fontFamily:"'Roboto Mono',monospace", letterSpacing:"1px" }}>PICKING</div>}
                </div>
              );
            })}
          </div>

          {/* Status */}
          <div style={{ textAlign:"center", color:TEXT_LO, fontSize:"0.8rem", fontStyle:"italic", minHeight:"1.2rem" }}>
            {game.phase === "choosing" && (isMyPickTurn ? "Your turn — pick a square" : `Waiting for ${game.choosing_player === "p1" ? game.player1_name : game.player2_name} to pick...`)}
            {game.phase === "answering" && !showReveal && (submitted ? "Answer locked in — waiting for opponent..." : `Both players answer: ${activeQ ? activeQ.clue : ""}`)}
            {game.phase === "gameover" && "Game over!"}
          </div>

          {/* Board */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem" }}>
            {(game.cells || []).map((cell, i) => {
              const owner = board[i];
              const isOwned = owner === "p1" || owner === "p2";
              const isReset = owner === "reset";
              const isActive = game.active_cell === i;
              const inWin = (game.win_line || []).includes(i);
              const canPick = game.phase === "choosing" && isMyPickTurn && !isOwned && !isReset && owner === "null";
              const q = ANSWER_POOLS[cell.questionKey];
              const classes = "cell" + (isActive?" active-cell":"") + (inWin?" win-cell":"") + (canPick?" pickable":"") + (isOwned?" completed":"");
              return (
                <div key={i} className={classes}
                  style={{ borderColor: isOwned ? p1Colors[owner]+"55" : isActive ? diffColor : BORDER, background: isOwned ? p1Colors[owner]+"18" : SURFACE }}
                  onClick={() => canPick ? selectCell(i) : null}>
                  {isOwned ? (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.6rem", color:p1Colors[owner], lineHeight:1 }}>{owner==="p1"?"X":"O"}</div>
                    </div>
                  ) : isReset ? (
                    <div style={{ fontSize:"1.6rem" }}>↺</div>
                  ) : (
                    <div style={{ fontSize:"0.72rem", color:isActive ? TEXT_HI : TEXT_MID, lineHeight:1.55, fontFamily:"'Roboto Mono',monospace", fontWeight:500 }}>
                      {q && <div style={{ fontSize:"0.56rem", color:isActive ? diffColor : TEXT_LO, marginBottom:"0.3rem", letterSpacing:"1.5px", fontWeight:700, textTransform:"uppercase" }}>{q.sport}</div>}
                      {q ? (q.clue.length > 62 ? q.clue.slice(0,60)+"..." : q.clue) : ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answer panel */}
          {game.phase === "answering" && activeQ && !showReveal && (
            <div style={{ background:SURFACE, border:"1px solid "+diffColor+"44", borderRadius:16, padding:"1.2rem", animation:"fadeIn 0.3s ease" }}>
              <div style={{ fontSize:"0.62rem", color:diffColor, letterSpacing:"1px", marginBottom:"0.5rem", fontFamily:"'Roboto Mono',monospace" }}>{activeQ.sport} CLUE</div>
              <div style={{ fontSize:"1rem", color:TEXT_HI, lineHeight:1.65, marginBottom:"0.9rem", fontFamily:"'DM Serif Display',serif" }}>{activeQ.clue}</div>
              {!submitted ? (
                <div style={{ display:"flex", gap:"0.5rem" }}>
                  <AutocompleteInput value={myAnswer} disabled={submitted} diffColor={diffColor}
                    placeholder="Type a name..."
                    onChange={v => setMyAnswer(v)}
                    onSelect={v => setMyAnswer(v)}
                    onSubmit={submitAnswer}
                  />
                  <button className="sb" onClick={submitAnswer} disabled={!myAnswer.trim()}>LOCK IN</button>
                </div>
              ) : (
                <div style={{ background:SURFACE2, border:"1px solid #4ECDC4", borderRadius:10, padding:"0.9rem 1.2rem", color:"#4ECDC4", fontFamily:"'Roboto Mono',monospace", fontSize:"0.85rem", textAlign:"center" }}>
                  Answer locked in — waiting for opponent...
                </div>
              )}
            </div>
          )}

          {/* Reveal */}
          {showReveal && game.active_cell != null && (
            <div style={{ background:SURFACE, border:"1px solid "+BORDER, borderRadius:16, padding:"1.5rem", animation:"fadeIn 0.3s ease" }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive", letterSpacing:"4px", fontSize:"0.9rem", color:TEXT_LO, textAlign:"center", marginBottom:"1rem" }}>ANSWERS REVEALED</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem", marginBottom:"1rem" }}>
                {["p1","p2"].map((p, idx) => {
                  const show = revealStep > idx;
                  const name = p === "p1" ? game.player1_name : game.player2_name;
                  return (
                    <div key={p} style={{ background:show ? SURFACE2 : SURFACE, border:"1px solid "+(show ? BORDER : "transparent"), borderRadius:12, padding:"1rem", transition:"all 0.4s", opacity:show ? 1 : 0.2 }}>
                      <div style={{ fontSize:"0.62rem", color:TEXT_LO, marginBottom:"0.5rem", letterSpacing:"1px", textTransform:"uppercase" }}>{name}</div>
                      {show ? <div style={{ fontSize:"1rem", color:TEXT_HI, fontWeight:700 }}>?</div> : <div style={{ color:BORDER, fontSize:"1.8rem", textAlign:"center" }}>?</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Game over */}
          {game.phase === "gameover" && (
            <div style={{ background:SURFACE, border:"2px solid "+diffColor, borderRadius:20, padding:"2rem", textAlign:"center", animation:"fadeIn 0.4s ease" }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.4rem", letterSpacing:"4px", marginBottom:"0.4rem" }}>
                {game.winner === "draw" ? "ITS A DRAW" : (game.winner === myRole ? "YOU WIN!" : (game.winner === "p1" ? game.player1_name : game.player2_name)+" WINS!")}
              </div>
              <div style={{ color:TEXT_MID, fontFamily:"'DM Serif Display',serif", fontStyle:"italic", marginBottom:"1.5rem" }}>
                {game.player1_name} {(game.scores||{}).p1||0} — {(game.scores||{}).p2||0} {game.player2_name}
              </div>
              <button className="big-btn" onClick={() => { setScreen("lobby"); loadMyGames(); }}>BACK TO LOBBY</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
