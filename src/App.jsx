import { useState, useEffect, useRef } from "react";
import {
  ANSWER_POOLS, DIFFICULTY_META, SPORT_POOLS,
  buildPuzzle, matchAnswer, normalizeStr,
} from "./data/questions.js";

// ─── SUPABASE ──────────────────────────────────────────────────────────────────
const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!SB_URL || !SB_KEY) {
  console.error(
    "TicTacShow: missing Supabase env vars!\n" +
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local (local) " +
    "and in Vercel → Project Settings → Environment Variables (production).\n" +
    `Current values: VITE_SUPABASE_URL=${SB_URL} VITE_SUPABASE_ANON_KEY=${SB_KEY ? "[SET]" : "[MISSING]"}`
  );
}

async function sbFetch(path, opts = {}) {
  let session = JSON.parse(localStorage.getItem("tts_session") || "null");

  // Auto-refresh token if it's about to expire (Supabase tokens last 1 hour)
  if (session?.expires_at && Date.now() / 1000 > session.expires_at - 60) {
    try {
      const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=refresh_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SB_KEY },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      });
      if (res.ok) {
        const fresh = await res.json();
        localStorage.setItem("tts_session", JSON.stringify(fresh));
        const u = fresh.user;
        localStorage.setItem("tts_user", JSON.stringify({
          id: u.id, email: u.email,
          username: u.user_metadata?.username ?? u.email.split("@")[0],
        }));
        session = fresh;
      } else {
        localStorage.removeItem("tts_session");
        localStorage.removeItem("tts_user");
        window.location.reload();
        return { ok: false, status: 401, data: "Session expired" };
      }
    } catch { /* network issue, let the request fail naturally */ }
  }

  const headers = {
    "Content-Type": "application/json",
    apikey: SB_KEY,
    Authorization: `Bearer ${session?.access_token ?? SB_KEY}`,
    ...opts.headers,
  };
  const res  = await fetch(`${SB_URL}${path}`, { ...opts, headers });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

async function signUp(email, password, username) {
  // GoTrue REST API uses top-level "data" for user_metadata, NOT "options.data"
  const r = await sbFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, data: { username } }),
  });
  if (!r.ok) return r; // real error (duplicate email, weak password, etc.)
  if (r.data?.access_token) {
    // Email auto-confirm is ON — we got tokens immediately
    const u = r.data.user ?? r.data;
    const uname = u?.user_metadata?.username ?? username;
    localStorage.setItem("tts_session", JSON.stringify(r.data));
    localStorage.setItem("tts_user", JSON.stringify({ id: u.id, email, username: uname }));
    return { ...r, confirmed: true };
  }
  // 200 with user object but NO access_token:
  // - If auto-confirm is OFF → email confirmation required
  // - If auto-confirm is ON  → email already exists (Supabase hides this for security)
  // Detect the duplicate-email case: identities array is empty for fake 200 responses
  const u = r.data?.user ?? r.data;
  if (u?.id) {
    const identities = u.identities ?? r.data?.identities ?? [];
    if (identities.length === 0) {
      // Fake 200 — email already exists
      return { ...r, ok: false, duplicateEmail: true };
    }
    return { ...r, emailConfirmationRequired: true };
  }
  return r;
}

async function signIn(email, password) {
  const r = await sbFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (r.ok && r.data?.access_token) {
    localStorage.setItem("tts_session", JSON.stringify(r.data));
    const u = r.data.user;
    const username = u?.user_metadata?.username ?? email.split("@")[0];
    localStorage.setItem("tts_user", JSON.stringify({ id: u.id, email, username }));
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

async function dbSelect(table, qs = "") {
  return sbFetch(`/rest/v1/${table}${qs}`, { headers: { Prefer: "return=representation" } });
}

async function dbInsert(table, body) {
  return sbFetch(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { Prefer: "return=representation" },
  });
}

async function dbUpdate(table, qs, body) {
  return sbFetch(`/rest/v1/${table}${qs}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { Prefer: "return=representation" },
  });
}

/** Track an answer submission for live rarity. Select → increment or insert. */
async function trackAnswer(questionKey, answerText) {
  const norm = normalizeStr(answerText);
  const sel = await dbSelect("answer_stats",
    `?question_key=eq.${encodeURIComponent(questionKey)}&answer_text=eq.${encodeURIComponent(norm)}`);
  if (sel.ok && sel.data?.[0]) {
    await dbUpdate("answer_stats", `?id=eq.${sel.data[0].id}`,
      { submission_count: sel.data[0].submission_count + 1 });
  } else {
    await dbInsert("answer_stats",
      { question_key: questionKey, answer_text: norm, submission_count: 1 });
  }
}

/** Fetch live rarity stats for a question. Returns { totalSubmissions, answerCounts: Map<normalizedAnswer, count> } */
async function fetchAnswerStats(questionKey) {
  const r = await dbSelect("answer_stats", `?question_key=eq.${encodeURIComponent(questionKey)}`);
  if (!r.ok || !Array.isArray(r.data)) return null;
  const answerCounts = {};
  let total = 0;
  for (const row of r.data) {
    answerCounts[row.answer_text] = row.submission_count;
    total += row.submission_count;
  }
  return { totalSubmissions: total, answerCounts };
}

// ─── GAME LOGIC ────────────────────────────────────────────────────────────────
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] !== "reset")
      return { winner: board[a], line: [a, b, c] };
  }
  if (board.every(v => v === "p1" || v === "p2")) return { winner: "draw", line: [] };
  return null;
}

function genCode() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }

// ─── CPU HELPERS ───────────────────────────────────────────────────────────────
const CPU_NAMES = { easy: "Rookie", medium: "Veteran", hard: "Coach" };

/*
  cpuDiff controls answer quality only — completely independent of question difficulty.
  easy   — picks common answers (rarity 50–99); falls back to any valid answer
  medium — picks mid-tier answers (rarity 20–60); falls back to any valid answer
  hard   — picks rare answers (rarity 1–30); falls back to mid-tier, then any valid answer
*/
function cpuPickAnswer(qKey, cpuDiff) {
  const pool = ANSWER_POOLS[qKey]?.answers ?? [];
  if (!pool.length) return { name: "No answer", valid: false, rarity: null };

  function pickFrom(candidates) {
    const src = candidates.length ? candidates : pool;
    const pick = src[Math.floor(Math.random() * src.length)];
    return { name: pick.name, valid: true, rarity: pick.rarity };
  }

  if (cpuDiff === "easy") {
    return pickFrom(pool.filter(a => a.rarity >= 50));
  }

  if (cpuDiff === "medium") {
    return pickFrom(pool.filter(a => a.rarity >= 20 && a.rarity <= 60));
  }

  // hard — prefers rarest; falls back to mid-tier if no rare answers exist
  const rare = pool.filter(a => a.rarity >= 1 && a.rarity <= 30);
  if (rare.length) return pickFrom(rare);
  return pickFrom(pool.filter(a => a.rarity >= 20 && a.rarity <= 60));
}

function cpuPickCell(board) {
  const avail = board.reduce((acc, v, i) => (v === "null" || v == null) ? [...acc, i] : acc, []);
  if (!avail.length) return null;
  for (const [a, b, c] of LINES) {
    const vals = [board[a], board[b], board[c]];
    if (vals.filter(v => v === "p2").length === 2 && vals.some(v => v === "null" || v == null))
      return [a, b, c][vals.findIndex(v => v === "null" || v == null)];
  }
  for (const [a, b, c] of LINES) {
    const vals = [board[a], board[b], board[c]];
    if (vals.filter(v => v === "p1").length === 2 && vals.some(v => v === "null" || v == null))
      return [a, b, c][vals.findIndex(v => v === "null" || v == null)];
  }
  return avail[Math.floor(Math.random() * avail.length)];
}

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const BG      = "#1a1a2e";
const SURF    = "#22223a";
const SURF2   = "#2b2b46";
const SURF3   = "#343454";
const BORDER  = "#38385a";
const HI      = "#f2f2ff";
const MID     = "#a0a0c0";
const LO      = "#60608a";
const ACCENT  = "#FF6B35";
const ACCENT2 = "#4ECDC4";
const PC      = { p1: ACCENT, p2: ACCENT2 };

// ─── RARITY BAR ────────────────────────────────────────────────────────────────
function RarityBar({ score, limitedData }) {
  const pct  = Math.max(2, Math.min(100, score));
  const col  = score < 10 ? "#FC5C65" : score < 30 ? "#F7B731" : ACCENT2;
  const tier = score < 10 ? "RARE" : score < 30 ? "UNCOMMON" : "COMMON";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.65rem", color: LO, letterSpacing: "1px", fontFamily: "'Roboto Mono',monospace" }}>POPULARITY</span>
        <span style={{ fontSize: "0.65rem", color: col, letterSpacing: "1px", fontFamily: "'Roboto Mono',monospace" }}>{tier} · {Math.round(score)}%</span>
      </div>
      <div style={{ height: 5, background: BORDER, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 3, transition: "width 0.9s ease" }} />
      </div>
      {limitedData && (
        <div style={{ fontSize: "0.55rem", color: LO, marginTop: "0.25rem", fontStyle: "italic", fontFamily: "'Roboto Mono',monospace" }}>
          based on limited data
        </div>
      )}
    </div>
  );
}

// ─── AUTOCOMPLETE INPUT ────────────────────────────────────────────────────────
function AutocompleteInput({ value, onChange, onSelect, onSubmit, disabled, placeholder, accentColor, sport }) {
  const [open, setOpen]               = useState(false);
  const [hi,   setHi]                 = useState(0);
  const [suggestions, setSuggestions]  = useState([]);
  const wrapRef   = useRef(null);
  const debounceT = useRef(null);

  // Query Supabase players table with debounce
  useEffect(() => {
    const q = value.trim();
    if (q.length < 1) { setSuggestions([]); return; }
    clearTimeout(debounceT.current);
    debounceT.current = setTimeout(async () => {
      const validSports = ["nba", "nfl", "mlb", "nhl", "soccer"];
      const sportFilter = sport && validSports.includes(sport) ? `&sport=eq.${encodeURIComponent(sport)}` : "";
      const r = await dbSelect("players",
        `?name=ilike.*${encodeURIComponent(q)}*${sportFilter}&select=name&limit=8`);
      if (r.ok && Array.isArray(r.data)) {
        setSuggestions(r.data.map(row => row.name));
      }
    }, 150);
    return () => clearTimeout(debounceT.current);
  }, [value, sport]);

  useEffect(() => setHi(0), [value]);

  useEffect(() => {
    const close = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", flex: 1 }}>
      <input
        className="ai"
        value={value}
        disabled={disabled}
        autoComplete="off"
        placeholder={placeholder ?? "Type a name…"}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => {
          if (e.key === "ArrowDown") { e.preventDefault(); setHi(h => Math.min(h + 1, suggestions.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setHi(h => Math.max(h - 1, 0)); }
          else if (e.key === "Enter") {
            e.preventDefault();
            if (open && suggestions.length > 0) { onSelect(suggestions[hi]); setOpen(false); }
            else onSubmit();
          }
          else if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && suggestions.length > 0 && !disabled && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: SURF2, border: `1px solid ${accentColor ?? ACCENT}88`,
          borderRadius: 10, zIndex: 200, overflow: "hidden",
          boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
        }}>
          {suggestions.map((name, i) => (
            <div
              key={name}
              onMouseDown={e => { e.preventDefault(); onSelect(name); setOpen(false); }}
              onMouseEnter={() => setHi(i)}
              style={{
                padding: "0.7rem 1.1rem",
                background: i === hi ? `${accentColor ?? ACCENT}22` : "transparent",
                color: i === hi ? HI : MID,
                fontSize: "0.92rem", cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? `1px solid ${BORDER}` : "none",
                transition: "background 0.1s",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── GLOBAL CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }
  body { display: block; background: ${BG}; color: ${HI}; font-family: 'DM Serif Display', Georgia, serif; -webkit-font-smoothing: antialiased; }
  #root { width: 100%; min-height: 100vh; }
  a { color: inherit; text-decoration: none; }

  @keyframes fadeIn  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer { 0% { background-position:-200% center } 100% { background-position:200% center } }
  @keyframes blink   { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
  @keyframes pulse   { 0% { box-shadow:0 0 0 0 rgba(255,107,53,0.6) } 100% { box-shadow:0 0 0 16px rgba(255,107,53,0) } }
  @keyframes spin    { to { transform: rotate(360deg) } }

  /* ─── Inputs ─── */
  .ni {
    background: ${SURF2}; border: 1.5px solid ${BORDER}; border-radius: 10px;
    color: ${HI}; padding: 0.85rem 1.1rem; font-size: 1rem;
    font-family: 'DM Serif Display', serif; width: 100%; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ni:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 3px ${ACCENT}22; }

  .ai {
    background: ${SURF2}; border: 1.5px solid ${BORDER}; border-radius: 10px;
    color: ${HI}; padding: 0.85rem 1.1rem; font-size: 1rem;
    font-family: 'DM Serif Display', serif; width: 100%; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ai:focus  { border-color: ${ACCENT}; box-shadow: 0 0 0 3px ${ACCENT}22; }
  .ai:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ─── Buttons ─── */
  .big-btn {
    background: linear-gradient(135deg, ${ACCENT}, #d63a00); border: none; border-radius: 12px;
    color: #fff; padding: 1rem 2.5rem; font-size: 1.25rem; font-family: 'Bebas Neue', cursive;
    letter-spacing: 3px; cursor: pointer; width: 100%;
    box-shadow: 0 6px 28px rgba(255,107,53,0.38); transition: all 0.2s;
  }
  .big-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(255,107,53,0.5); }
  .big-btn:active:not(:disabled) { transform: translateY(0); }
  .big-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .ghost-btn {
    background: transparent; border: 1.5px solid ${BORDER}; border-radius: 10px;
    color: ${MID}; padding: 0.8rem 1.5rem; font-size: 0.9rem;
    font-family: 'Bebas Neue', cursive; letter-spacing: 2px; cursor: pointer;
    transition: all 0.2s;
  }
  .ghost-btn:hover { border-color: ${MID}; color: ${HI}; }

  .icon-btn {
    background: transparent; border: none; cursor: pointer; color: ${LO};
    padding: 0.4rem; border-radius: 6px; transition: color 0.15s;
  }
  .icon-btn:hover { color: ${HI}; }

  .sb {
    border: none; border-radius: 10px; color: #000; padding: 0.8rem 1.4rem;
    font-family: 'Bebas Neue', cursive; letter-spacing: 2px; font-size: 0.95rem;
    cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
  }
  .sb:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  .sb:disabled { opacity: 0.35; cursor: not-allowed; }

  /* ─── Board cells ─── */
  .cell {
    aspect-ratio: 1; border-radius: 14px; border: 1.5px solid ${BORDER};
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 0.7rem; transition: all 0.2s; position: relative;
    overflow: hidden; text-align: center; background: ${SURF}; cursor: default;
    min-height: 90px;
  }
  .pickable { cursor: pointer; }
  .pickable:hover {
    background: ${SURF3} !important; transform: scale(1.04);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
  .active-cell { box-shadow: 0 0 0 3px ${ACCENT}55 !important; }
  .win-cell { animation: pulse 1.2s infinite; }

  /* ─── Layout ─── */
  .game-wrap {
    display: flex; gap: 1.75rem; padding: 1.5rem;
    max-width: 1200px; margin: 0 auto; align-items: flex-start;
  }
  .board-col {
    flex: 1 1 0; min-width: 0;
  }
  .sidebar {
    flex: 0 0 360px; display: flex; flex-direction: column; gap: 1rem;
    position: sticky; top: 1rem;
  }
  .board-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem;
    width: 100%;
  }

  @media (max-width: 860px) {
    .game-wrap { flex-direction: column; padding: 1rem; gap: 1rem; }
    .sidebar { flex: none; position: static; }
  }

  /* ─── Lobby ─── */
  .lobby-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 0.85rem;
  }
  .game-card {
    background: ${SURF}; border: 1.5px solid ${BORDER}; border-radius: 16px;
    padding: 1.2rem 1.4rem; cursor: pointer; transition: all 0.2s; animation: fadeIn 0.3s ease;
  }
  .game-card:hover { border-color: ${MID}; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.4); }

  /* ─── Difficulty / mode selectors ─── */
  .diff-card {
    background: ${SURF}; border: 2px solid ${BORDER}; border-radius: 14px;
    padding: 1.1rem 1.4rem; cursor: pointer; text-align: left;
    transition: all 0.2s;
  }
  .diff-card:hover { border-color: ${MID}; transform: translateY(-1px); }

  /* ─── Section label ─── */
  .section-label {
    font-family: 'Roboto Mono', monospace; font-size: 0.7rem;
    color: ${LO}; letter-spacing: 2.5px; text-transform: uppercase;
    margin-bottom: 0.85rem;
  }

  /* ─── Spinner ─── */
  .spinner {
    width: 18px; height: 18px; border: 2px solid ${BORDER};
    border-top-color: ${ACCENT}; border-radius: 50%;
    animation: spin 0.7s linear infinite; display: inline-block;
  }
`;

// ─── SPORT META ────────────────────────────────────────────────────────────────
const SPORT_META = [
  { key: "all",     label: "All Sports",      emoji: "🏆", sub: "Questions from every sport" },
  { key: "nba",     label: "NBA",             emoji: "🏀", sub: "Basketball questions only" },
  { key: "nfl",     label: "NFL",             emoji: "🏈", sub: "Football questions only" },
  { key: "mlb",     label: "MLB",             emoji: "⚾", sub: "Baseball questions only" },
  { key: "nhl",     label: "NHL",             emoji: "🏒", sub: "Hockey questions only" },
  { key: "college", label: "College Sports",  emoji: "🎓", sub: "NCAA football & basketball" },
  { key: "soccer",  label: "European Soccer", emoji: "⚽", sub: "Premier League, La Liga, Bundesliga, Serie A, Ligue 1, UCL" },
];

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  // Auth
  const [user,          setUser]          = useState(getUser);
  const [screen,        setScreen]        = useState("lobby");
  const [authMode,      setAuthMode]      = useState("login");
  const [authForm,      setAuthForm]      = useState({ email: "", password: "", username: "" });
  const [authError,     setAuthError]     = useState("");
  const [authLoading,   setAuthLoading]   = useState(false);
  const [authInfo,      setAuthInfo]      = useState(""); // e.g. "check your email"

  // Lobby
  const [myGames,       setMyGames]       = useState([]);
  const [lobbyLoading,  setLobbyLoading]  = useState(false);

  // Create
  const [qDiff,         setQDiff]         = useState("beginner");   // question difficulty
  const [cpuDiff,       setCpuDiff]       = useState("medium");     // cpu skill level
  const [gameMode,      setGameMode]      = useState("vs_friend");  // "vs_friend" | "vs_cpu"
  const [sport,         setSport]         = useState("all");        // sport filter
  const [createLoading, setCreateLoading] = useState(false);
  const [createError,   setCreateError]   = useState("");

  // Join
  const [joinCode,      setJoinCode]      = useState("");
  const [joinError,     setJoinError]     = useState("");

  // Game
  const [game,          setGame]          = useState(null);
  const [currentMove,   setCurrentMove]   = useState(null);
  const [myAnswer,      setMyAnswer]      = useState("");
  const [submitted,     setSubmitted]     = useState(false);
  const [copyMsg,       setCopyMsg]       = useState("");
  const [revealData,    setRevealData]    = useState(null);
  const [revealStep,    setRevealStep]    = useState(0);

  // Refs for stale-closure-safe async ops
  const gameRef          = useRef(null);
  const resolving        = useRef(false);
  const showingReveal    = useRef(false);
  const cpuThinking      = useRef(false);
  const pendingRetryMove = useRef(null); // holds next move after same-answer retry

  useEffect(() => { gameRef.current = game; }, [game]);

  // ── Boot ──────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) { setScreen("auth"); return; }
    setScreen("lobby");
    loadMyGames();
    const code = new URLSearchParams(window.location.search).get("join");
    if (code) { setJoinCode(code); setScreen("join"); }
  }, [user]);

  // ── Multiplayer polling ───────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "game" || !game || game.isCpu) return;
    const iv = setInterval(refreshGame, 3000);
    return () => clearInterval(iv);
  }, [screen, game?.id, game?.isCpu]); // eslint-disable-line

  // ── Load move for non-picking player (multiplayer) ────────────────────────────
  useEffect(() => {
    if (game?.isCpu) return;
    if (game?.phase !== "answering" && game?.phase !== "retry") return;
    if (game.active_cell == null || currentMove) return;
    dbSelect("moves",
      `?game_id=eq.${game.id}&cell_index=eq.${game.active_cell}&order=created_at.desc&limit=1`)
      .then(r => { if (r.ok && r.data?.[0]) setCurrentMove(r.data[0]); });
  }, [game?.phase, game?.active_cell, game?.isCpu]); // eslint-disable-line

  // ── Poll for opponent answer (multiplayer) ────────────────────────────────────
  useEffect(() => {
    if (game?.isCpu || !submitted || !currentMove || !game) return;
    const myRole = game.player1_id === user?.id ? "p1" : "p2";
    const iv = setInterval(async () => {
      const r = await dbSelect("moves", `?id=eq.${currentMove.id}`);
      if (!r.ok || !r.data?.[0]) return;
      const mv = r.data[0];
      const otherIn = myRole === "p1" ? mv.p2_answer !== null : mv.p1_answer !== null;
      if (otherIn && !mv.result && !resolving.current) {
        clearInterval(iv);
        resolving.current = true;
        await resolveMove(mv);
      }
      if (mv.result) clearInterval(iv);
    }, 2000);
    return () => clearInterval(iv);
  }, [submitted, currentMove?.id, game?.isCpu]); // eslint-disable-line

  // ── CPU auto-pick square ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!game?.isCpu) return;
    if (game.phase !== "choosing" || game.choosing_player !== "p2") return;
    if (game.phase === "gameover" || cpuThinking.current || revealData) return;

    cpuThinking.current = true;
    const delay = 1200 + Math.random() * 1000;
    const t = setTimeout(() => {
      const g = gameRef.current;
      if (!g || g.phase !== "choosing" || g.choosing_player !== "p2") {
        cpuThinking.current = false;
        return;
      }
      const idx = cpuPickCell(g.board);
      if (idx !== null && idx !== undefined) selectCellCpu(idx);
      cpuThinking.current = false;
    }, delay);
    return () => { clearTimeout(t); cpuThinking.current = false; };
  }, [game?.phase, game?.choosing_player, game?.isCpu, revealData]); // eslint-disable-line

  // ─────────────────────────────────────────────────────────────────────────────
  // POLLING (multiplayer)
  // ─────────────────────────────────────────────────────────────────────────────
  async function refreshGame() {
    const cur = gameRef.current;
    if (!cur || cur.isCpu) return;
    const r = await dbSelect("games", `?id=eq.${cur.id}`);
    if (!r.ok || !r.data?.[0]) return;
    const fresh = r.data[0];

    if (fresh.phase === "choosing" && cur.phase === "answering" && !showingReveal.current) {
      const prevCell = cur.active_cell;
      if (prevCell != null) {
        const mr = await dbSelect("moves",
          `?game_id=eq.${cur.id}&cell_index=eq.${prevCell}&order=created_at.desc&limit=1`);
        if (mr.ok && mr.data?.[0]?.result) triggerReveal(mr.data[0], fresh);
      }
    }
    // Same-answer retry: resolver set phase to "retry" — non-resolver resets for re-answering
    if (fresh.phase === "retry" && cur.phase === "answering" && !showingReveal.current) {
      setSubmitted(false);
      setMyAnswer("");
      setCurrentMove(null); // triggers load-move effect to re-fetch the updated move
    }
    setGame(fresh);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // REVEAL
  // ─────────────────────────────────────────────────────────────────────────────
  function triggerReveal(move, g) {
    showingReveal.current = true;
    const winnerName =
      move.result === "p1" ? g.player1_name :
      move.result === "p2" ? g.player2_name : null;
    const isSameAnswer  = move.p1_valid && move.p2_valid &&
      normalizeStr(move.p1_answer ?? "") === normalizeStr(move.p2_answer ?? "");
    const isBothInvalid = !move.p1_valid && !move.p2_valid;
    // On same-answer retry the SAME player goes again; otherwise the OTHER player picks next
    const nextPickerName = isSameAnswer
      ? (g.choosing_player === "p1" ? g.player1_name : g.player2_name)
      : (g.choosing_player === "p1" ? g.player2_name : g.player1_name);
    // Snapshot the question NOW — active_cell may be nulled when game state updates
    const revealQ = ANSWER_POOLS[move.question_key] ?? null;
    setRevealData({ move, result: move.result, winnerName, nextPickerName, isSameAnswer, isBothInvalid, q: revealQ, liveStats: null });
    setRevealStep(0);
    // Stagger the answer cards in — no auto-close, user clicks Continue
    setTimeout(() => setRevealStep(1), 350);
    setTimeout(() => setRevealStep(2), 800);
    setTimeout(() => setRevealStep(3), 1400);
    // Fetch live rarity stats in background — updates revealData when available
    fetchAnswerStats(move.question_key).then(stats => {
      if (stats) setRevealData(prev => prev ? { ...prev, liveStats: stats } : prev);
    });
  }

  function dismissReveal() {
    setRevealData(null); setRevealStep(0);
    setSubmitted(false); setMyAnswer("");
    resolving.current = false; showingReveal.current = false;
    // On same-answer retry, restore the new move so the player can answer again
    if (pendingRetryMove.current) {
      setCurrentMove(pendingRetryMove.current);
      pendingRetryMove.current = null;
    } else {
      setCurrentMove(null);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────────────

  /** Pick a fresh question key not already used on the board (excluding the active cell). */
  function getNewQuestionKey(cells, activeCellIdx, gameSport) {
    const usedKeys = new Set(cells.filter((_, i) => i !== activeCellIdx).map(c => c.questionKey));
    // Use the sport-specific pool if a sport filter is active, otherwise all keys
    const pool = (gameSport && gameSport !== "all" && SPORT_POOLS[gameSport])
      ? SPORT_POOLS[gameSport]
      : Object.keys(ANSWER_POOLS);
    const available = pool.filter(k => !usedKeys.has(k));
    return available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : pool[Math.floor(Math.random() * pool.length)];
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DATA HELPERS
  // ─────────────────────────────────────────────────────────────────────────────
  async function loadMyGames() {
    if (!user) return;
    setLobbyLoading(true);
    const r = await dbSelect("games",
      `?or=(player1_id.eq.${user.id},player2_id.eq.${user.id})&order=updated_at.desc&limit=40`);
    if (r.ok) setMyGames(Array.isArray(r.data) ? r.data : []);
    setLobbyLoading(false);
  }

  function resetGameState(g) {
    setGame(g); gameRef.current = g;
    setCurrentMove(null); setMyAnswer(""); setSubmitted(false);
    setRevealData(null); setRevealStep(0);
    resolving.current = false; showingReveal.current = false; cpuThinking.current = false;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // AUTH
  // ─────────────────────────────────────────────────────────────────────────────
  async function handleAuth(e) {
    e.preventDefault();
    setAuthError(""); setAuthInfo(""); setAuthLoading(true);
    try {
      if (authMode === "signup") {
        if (!authForm.username.trim()) { setAuthError("Username is required"); setAuthLoading(false); return; }
        if (authForm.password.length < 6) { setAuthError("Password must be at least 6 characters"); setAuthLoading(false); return; }
        const r = await signUp(authForm.email, authForm.password, authForm.username.trim());
        if (r.confirmed) {
          setUser(getUser());
        } else if (r.duplicateEmail) {
          setAuthError("An account with that email already exists. Try logging in instead.");
        } else if (r.emailConfirmationRequired) {
          setAuthError(
            "Account created but email confirmation is required. " +
            "Ask the site admin to disable 'Confirm email' in Supabase → Authentication → Settings."
          );
        } else {
          const code   = r.data?.error_code ?? r.data?.code ?? "";
          const errMsg = r.data?.msg || r.data?.message || r.data?.error_description
            || (typeof r.data === "string" ? r.data : null);
          console.error("signup failed:", r.status, r.data);
          if (code === "user_already_exists" || r.status === 422) {
            setAuthError("An account with that email already exists. Try logging in instead.");
          } else if (r.status === 0 || r.status >= 500) {
            setAuthError("Connection error — please check your internet and try again.");
          } else {
            setAuthError(errMsg || `Sign up failed (${r.status}). Please try again.`);
          }
        }
      } else {
        const r = await signIn(authForm.email, authForm.password);
        if (r.ok) {
          setUser(getUser());
        } else {
          const errCode = r.data?.error_code ?? "";
          const errMsg  = r.data?.msg || r.data?.message || r.data?.error_description;
          console.error("signin failed:", r.status, r.data);
          if (errCode === "email_not_confirmed") {
            setAuthError("Your email isn't confirmed yet. Check your inbox for the confirmation link.");
          } else if (errCode === "invalid_credentials" || r.status === 400) {
            setAuthError("Incorrect email or password.");
          } else if (r.status === 0 || r.status >= 500) {
            setAuthError("Connection error — please check your internet and try again.");
          } else {
            setAuthError(errMsg || `Login failed (${r.status}). Please try again.`);
          }
        }
      }
    } catch (err) {
      console.error("auth error:", err);
      setAuthError("Connection error — please check your internet and try again.");
    }
    setAuthLoading(false);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // START CPU GAME
  // ─────────────────────────────────────────────────────────────────────────────
  function startCpuGame() {
    const firstPick = Math.random() < 0.5 ? "p1" : "p2";
    const g = {
      id: `cpu-${Date.now()}`,
      isCpu: true,
      cpuDiff,
      difficulty: qDiff,
      sport,
      cells: buildPuzzle(qDiff, sport),
      phase: "choosing",
      board: Array(9).fill("null"),
      scores: { p1: 0, p2: 0 },
      win_line: [],
      active_cell: null,
      choosing_player: firstPick,
      winner: null,
      player1_id: user.id,
      player1_name: user.username,
      player2_id: "cpu",
      player2_name: CPU_NAMES[cpuDiff] ?? "Bot",
    };
    resetGameState(g);
    setScreen("game");
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CREATE GAME (multiplayer)
  // ─────────────────────────────────────────────────────────────────────────────
  async function createGame() {
    setCreateLoading(true); setCreateError("");
    try {
      const firstPick = Math.random() < 0.5 ? "p1" : "p2";
      const payload = {
        invite_code: genCode(),
        difficulty: qDiff,
        sport,
        cells: buildPuzzle(qDiff, sport),
        player1_id: user.id,
        player1_name: user.username,
        phase: "waiting",
        board: Array(9).fill("null"),
        scores: { p1: 0, p2: 0 },
        win_line: [],
        choosing_player: firstPick,
      };
      const r = await dbInsert("games", payload);
      if (r.ok && r.data?.[0]) {
        resetGameState(r.data[0]);
        setScreen("game");
      } else {
        const msg = typeof r.data === "string" ? r.data : JSON.stringify(r.data);
        console.error("createGame failed →", r.status, msg);
        setCreateError(`Failed to create game (${r.status}). ${
          r.status === 401 ? "Try logging out and back in." :
          r.status === 403 ? "Permission denied — check Supabase RLS policies." :
          msg.slice(0, 200)
        }`);
      }
    } catch (err) {
      console.error("createGame error →", err);
      setCreateError(`Network error: ${err.message}`);
    }
    setCreateLoading(false);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // JOIN GAME
  // ─────────────────────────────────────────────────────────────────────────────
  async function joinGame() {
    setJoinError("");
    const r = await dbSelect("games", `?invite_code=eq.${joinCode.toUpperCase().trim()}`);
    if (!r.ok || !r.data?.[0]) { setJoinError("Game not found. Check the code and try again."); return; }
    const g = r.data[0];
    if (g.player2_id)            { setJoinError("This game already has two players."); return; }
    if (g.player1_id === user.id) { setJoinError("You can't join your own game."); return; }
    const upd = await dbUpdate("games", `?id=eq.${g.id}`,
      { player2_id: user.id, player2_name: user.username, phase: "choosing" });
    // Supabase returns empty array when RLS blocks the update (still HTTP 200)
    if (upd.ok && Array.isArray(upd.data) && upd.data.length > 0) {
      const fresh = await dbSelect("games", `?id=eq.${g.id}`);
      resetGameState(fresh.data[0]);
      setScreen("game");
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      console.error("joinGame update failed:", upd.status, upd.data);
      setJoinError("Could not join game — the update was blocked. Ask the host to recreate the game, or try again.");
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SELECT CELL — multiplayer
  // ─────────────────────────────────────────────────────────────────────────────
  async function selectCell(idx) {
    if (!game || game.phase !== "choosing") return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    if (game.choosing_player !== myRole) return;
    const owner = game.board[idx];
    if (owner !== "null" && owner != null) return;
    const qKey = game.cells[idx].questionKey;
    const mv = await dbInsert("moves", { game_id: game.id, cell_index: idx, question_key: qKey });
    if (!mv.ok || !mv.data?.[0]) return;
    setCurrentMove(mv.data[0]);
    await dbUpdate("games", `?id=eq.${game.id}`, { active_cell: idx, phase: "answering" });
    await refreshGame();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SELECT CELL — CPU
  // ─────────────────────────────────────────────────────────────────────────────
  function selectCellCpu(idx) {
    const g = gameRef.current;
    if (!g || g.phase !== "choosing") return;
    const owner = g.board[idx];
    if (owner !== "null" && owner != null) return;
    const qKey = g.cells[idx].questionKey;
    const move = {
      id: `move-${Date.now()}`, game_id: g.id, cell_index: idx, question_key: qKey,
      p1_answer: null, p2_answer: null,
      p1_valid: null, p2_valid: null,
      p1_rarity: null, p2_rarity: null, result: null,
    };
    setCurrentMove(move);
    const updated = { ...g, active_cell: idx, phase: "answering" };
    setGame(updated); gameRef.current = updated;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SUBMIT ANSWER — multiplayer
  // ─────────────────────────────────────────────────────────────────────────────
  async function submitAnswer() {
    if (submitted || !myAnswer.trim() || !game || !currentMove) return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    const qKey   = game.cells[game.active_cell].questionKey;
    const match  = matchAnswer(myAnswer, qKey);
    const patch  = myRole === "p1"
      ? { p1_answer: myAnswer, p1_valid: !!match, p1_rarity: match?.rarity ?? null }
      : { p2_answer: myAnswer, p2_valid: !!match, p2_rarity: match?.rarity ?? null };
    await dbUpdate("moves", `?id=eq.${currentMove.id}`, patch);
    trackAnswer(qKey, myAnswer); // fire-and-forget — don't block the UI
    setSubmitted(true);
    const freshMv = await dbSelect("moves", `?id=eq.${currentMove.id}`);
    if (freshMv.ok && freshMv.data?.[0]) {
      const mv = freshMv.data[0];
      const otherIn = myRole === "p1" ? mv.p2_answer !== null : mv.p1_answer !== null;
      if (otherIn && !resolving.current) { resolving.current = true; await resolveMove(mv); }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SUBMIT ANSWER — CPU
  // ─────────────────────────────────────────────────────────────────────────────
  function submitAnswerCpu() {
    if (submitted || !myAnswer.trim() || !game || !currentMove) return;
    const qKey  = game.cells[game.active_cell].questionKey;
    const match = matchAnswer(myAnswer, qKey);
    const updatedMove = {
      ...currentMove,
      p1_answer: myAnswer, p1_valid: !!match, p1_rarity: match?.rarity ?? null,
    };
    setCurrentMove(updatedMove);
    setSubmitted(true);
    trackAnswer(qKey, myAnswer); // fire-and-forget

    // CPU "thinks" for 2-3 seconds
    const delay = 2000 + Math.random() * 1000;
    setTimeout(() => {
      const g = gameRef.current;
      if (!g) return;
      const cpuAns = cpuPickAnswer(qKey, g.cpuDiff ?? "medium");
      const finalMove = {
        ...updatedMove,
        p2_answer: cpuAns.name,
        p2_valid:  cpuAns.valid,
        p2_rarity: cpuAns.rarity,
      };
      resolveCpuMove(finalMove);
    }, delay);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RESOLVE MOVE — multiplayer
  // ─────────────────────────────────────────────────────────────────────────────
  async function resolveMove(mv) {
    const gRes = await dbSelect("games", `?id=eq.${game.id}`);
    const g    = gRes.data[0];

    // ── Same answer: replace question on same square, same player retries ──
    if (mv.p1_valid && mv.p2_valid &&
        normalizeStr(mv.p1_answer ?? "") === normalizeStr(mv.p2_answer ?? "")) {
      const newKey   = getNewQuestionKey(g.cells, g.active_cell, g.sport);
      const newCells = g.cells.map((c, i) => i === g.active_cell ? { questionKey: newKey } : c);
      // Clear answers on the move and update its question key
      await dbUpdate("moves", `?id=eq.${mv.id}`, {
        question_key: newKey,
        p1_answer: null, p2_answer: null,
        p1_valid: null,  p2_valid: null,
        p1_rarity: null, p2_rarity: null,
      });
      // Keep same active_cell and choosing_player; switch to "retry" phase
      await dbUpdate("games", `?id=eq.${game.id}`, { cells: newCells, phase: "retry" });
      // Resolver gets the retry move restored after reveal is dismissed
      pendingRetryMove.current = {
        ...mv, question_key: newKey,
        p1_answer: null, p2_answer: null,
        p1_valid: null, p2_valid: null,
        p1_rarity: null, p2_rarity: null, result: null,
      };
      triggerReveal({ ...mv, result: "same_answer" }, g);
      await refreshGame();
      return;
    }

    let result;
    if (!mv.p1_valid && !mv.p2_valid)  result = "reset";
    else if (!mv.p1_valid)             result = "p2";
    else if (!mv.p2_valid)             result = "p1";
    else                               result = mv.p1_rarity <= mv.p2_rarity ? "p1" : "p2";

    await dbUpdate("moves", `?id=eq.${mv.id}`, { result });
    const newBoard  = [...g.board];
    newBoard[g.active_cell] = result === "reset" ? "reset" : result;
    const newScores = { ...g.scores };
    if (result !== "reset") newScores[result] = (newScores[result] || 0) + 1;
    const check    = checkWinner(newBoard.map(v => (v === "null" || v == null || v === "reset") ? null : v));
    // Simple alternation — the other player always picks next
    const nextPick = g.choosing_player === "p1" ? "p2" : "p1";
    triggerReveal({ ...mv, result }, g);
    await dbUpdate("games", `?id=eq.${game.id}`, {
      board: newBoard, scores: newScores, active_cell: null,
      phase: check ? "gameover" : "choosing", choosing_player: nextPick,
      winner: check ? check.winner : null, win_line: check ? check.line : [],
    });
    if (result === "reset") {
      setTimeout(async () => {
        const nb = [...newBoard]; nb[g.active_cell] = "null";
        await dbUpdate("games", `?id=eq.${game.id}`, { board: nb });
      }, 2000);
    }
    await refreshGame();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RESOLVE MOVE — CPU
  // ─────────────────────────────────────────────────────────────────────────────
  function resolveCpuMove(mv) {
    const g = gameRef.current;
    if (!g) return;

    // ── Same answer: replace question on same square, same player retries ──
    if (mv.p1_valid && mv.p2_valid &&
        normalizeStr(mv.p1_answer ?? "") === normalizeStr(mv.p2_answer ?? "")) {
      const newKey   = getNewQuestionKey(g.cells, g.active_cell, g.sport);
      const newCells = g.cells.map((c, i) => i === g.active_cell ? { questionKey: newKey } : c);
      const newMove  = {
        id: `move-${Date.now()}`, game_id: g.id, cell_index: g.active_cell,
        question_key: newKey, p1_answer: null, p2_answer: null,
        p1_valid: null, p2_valid: null, p1_rarity: null, p2_rarity: null, result: null,
      };
      pendingRetryMove.current = newMove;
      const updated = { ...g, cells: newCells, phase: "retry" };
      setGame(updated); gameRef.current = updated;
      triggerReveal({ ...mv, result: "same_answer" }, g);
      return;
    }

    let result;
    if (!mv.p1_valid && !mv.p2_valid)  result = "reset";
    else if (!mv.p1_valid)             result = "p2";
    else if (!mv.p2_valid)             result = "p1";
    else                               result = mv.p1_rarity <= mv.p2_rarity ? "p1" : "p2";

    const newBoard  = [...g.board];
    newBoard[g.active_cell] = result === "reset" ? "reset" : result;
    const newScores = { ...g.scores };
    if (result !== "reset") newScores[result] = (newScores[result] || 0) + 1;
    const check    = checkWinner(newBoard.map(v => (v === "null" || v == null || v === "reset") ? null : v));
    // Simple alternation — the other player always picks next
    const nextPick = g.choosing_player === "p1" ? "p2" : "p1";
    triggerReveal({ ...mv, result }, g);
    const updated = {
      ...g, board: newBoard, scores: newScores, active_cell: null,
      phase: check ? "gameover" : "choosing", choosing_player: nextPick,
      winner: check ? check.winner : null, win_line: check ? check.line : [],
    };
    setGame(updated); gameRef.current = updated;

    if (result === "reset") {
      setTimeout(() => {
        const cur = gameRef.current;
        if (!cur) return;
        const nb = [...cur.board]; nb[g.active_cell] = "null";
        const r2 = { ...cur, board: nb };
        setGame(r2); gameRef.current = r2;
      }, 2000);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DERIVED
  // ─────────────────────────────────────────────────────────────────────────────
  const myRole    = game ? (game.player1_id === user?.id ? "p1" : "p2") : null;
  const diffMeta  = game ? (DIFFICULTY_META[game.difficulty] ?? DIFFICULTY_META.beginner) : null;
  const diffColor = diffMeta?.color ?? ACCENT;
  const activeQ   = game?.active_cell != null
    ? ANSWER_POOLS[game.cells?.[game.active_cell]?.questionKey]
    : null;
  const isMyPick  = game?.phase === "choosing" && myRole === game.choosing_player;
  const board     = game?.board ?? Array(9).fill("null");
  const inviteLink = game && !game.isCpu
    ? `${window.location.origin}${window.location.pathname}?join=${game.invite_code}`
    : "";

  // ══════════════════════════════════════════════════════════════════════════════
  // SCREEN: AUTH
  // ══════════════════════════════════════════════════════════════════════════════
  if (!user || screen === "auth") return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{GLOBAL_CSS}</style>

      {/* Config error banner — visible if env vars missing */}
      {(!SB_URL || !SB_KEY) && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#FC5C65", color: "#fff", textAlign: "center", padding: "0.75rem 1rem", fontSize: "0.9rem", fontFamily: "'Roboto Mono',monospace", zIndex: 9999 }}>
          ⚠️ Missing Supabase config — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Environment Variables
        </div>
      )}

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(3.5rem,10vw,6rem)", lineHeight: 0.9, letterSpacing: "2px" }}>
          <span style={{ color: HI }}>TIC TAC </span>
          <span style={{
            background: `linear-gradient(90deg,${ACCENT},#FC5C65,${ACCENT})`,
            backgroundSize: "200%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
          }}>SHOW</span>
        </div>
        <div style={{ color: LO, fontStyle: "italic", marginTop: "0.6rem", fontSize: "1.05rem" }}>
          Sports trivia meets tic-tac-toe
        </div>
      </div>

      {/* Auth card */}
      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 440, animation: "fadeUp 0.4s ease" }}>
        <div style={{ display: "flex", marginBottom: "1.75rem", gap: "0.25rem" }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); setAuthInfo(""); }}
              style={{
                flex: 1, padding: "0.65rem", background: "transparent", border: "none",
                cursor: "pointer", fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem",
                letterSpacing: "2px", color: authMode === m ? HI : LO,
                borderBottom: `3px solid ${authMode === m ? ACCENT : "transparent"}`,
                transition: "all 0.2s",
              }}>
              {m === "login" ? "LOG IN" : "SIGN UP"}
            </button>
          ))}
        </div>

        <form onSubmit={handleAuth}>
          {authMode === "signup" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: LO, fontSize: "0.7rem", display: "block", marginBottom: "0.4rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>USERNAME</label>
              <input className="ni" placeholder="Your display name" value={authForm.username}
                onChange={e => setAuthForm(f => ({ ...f, username: e.target.value }))} />
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: LO, fontSize: "0.7rem", display: "block", marginBottom: "0.4rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>EMAIL</label>
            <input className="ni" type="email" placeholder="you@email.com" value={authForm.email}
              onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ color: LO, fontSize: "0.7rem", display: "block", marginBottom: "0.4rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>PASSWORD</label>
            <input className="ni" type="password" placeholder="••••••••" value={authForm.password}
              onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          {authError && (
            <div style={{ color: "#FC5C65", fontSize: "0.9rem", marginBottom: "1rem", textAlign: "center", background: "#FC5C6515", border: "1px solid #FC5C6555", borderRadius: 10, padding: "0.75rem 1rem", lineHeight: 1.5 }}>
              {authError}
            </div>
          )}
          {authInfo && (
            <div style={{ marginBottom: "1rem", textAlign: "center", background: `${ACCENT2}18`, border: `2px solid ${ACCENT2}66`, borderRadius: 12, padding: "1.1rem 1rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>📧</div>
              <div style={{ color: ACCENT2, fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>CHECK YOUR EMAIL</div>
              <div style={{ color: MID, fontSize: "0.88rem", lineHeight: 1.55 }}>{authInfo}</div>
              <button type="button" onClick={() => { setAuthMode("login"); setAuthInfo(""); setAuthError(""); }}
                style={{ marginTop: "0.85rem", background: ACCENT2, border: "none", borderRadius: 8, color: "#0a0a16", padding: "0.55rem 1.5rem", fontFamily: "'Bebas Neue',cursive", fontSize: "1rem", letterSpacing: "2px", cursor: "pointer" }}>
                GO TO LOG IN
              </button>
            </div>
          )}
          {!authInfo && (
            <button className="big-btn" type="submit" disabled={authLoading}>
              {authLoading ? <span className="spinner" /> : authMode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
            </button>
          )}
        </form>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════════
  // SCREEN: LOBBY
  // ══════════════════════════════════════════════════════════════════════════════
  if (screen === "lobby") {
    const activeGames    = myGames.filter(g => g.phase !== "gameover");
    const completedGames = myGames.filter(g => g.phase === "gameover");

    return (
      <div style={{ minHeight: "100vh", background: BG, color: HI }}>
        <style>{GLOBAL_CSS}</style>

        {/* Top nav */}
        <nav style={{
          background: SURF, borderBottom: `1px solid ${BORDER}`,
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.7rem", letterSpacing: "2px" }}>
              TIC TAC <span style={{ color: ACCENT }}>SHOW</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <span style={{ color: LO, fontSize: "0.88rem", fontFamily: "'Roboto Mono',monospace" }}>
                {user.username}
              </span>
              <button className="ghost-btn" onClick={() => { signOut(); setUser(null); }}
                style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
                Log out
              </button>
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

          {/* Hero CTAs */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <button className="big-btn" onClick={() => { setGameMode("vs_friend"); setScreen("create"); }}
              style={{ flex: "1 1 220px", maxWidth: 340, width: "auto" }}>
              NEW GAME VS FRIEND
            </button>
            <button onClick={() => { setGameMode("vs_cpu"); setScreen("create"); }}
              style={{
                flex: "1 1 200px", maxWidth: 300, background: SURF2,
                border: `1.5px solid ${BORDER}`, borderRadius: 12, color: HI,
                fontSize: "1.25rem", fontFamily: "'Bebas Neue',cursive", letterSpacing: "3px",
                cursor: "pointer", transition: "all 0.2s", padding: "1rem 2.5rem",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT2; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "none"; }}>
              PLAY vs CPU
            </button>
            <button onClick={() => setScreen("join")}
              style={{
                flex: "1 1 160px", maxWidth: 200, background: "transparent",
                border: `1.5px solid ${BORDER}`, borderRadius: 12, color: MID,
                fontSize: "1.1rem", fontFamily: "'Bebas Neue',cursive", letterSpacing: "3px",
                cursor: "pointer", transition: "all 0.2s", padding: "1rem 1.5rem",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MID; e.currentTarget.style.color = HI; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MID; }}>
              JOIN BY CODE
            </button>
          </div>

          {lobbyLoading && (
            <div style={{ color: LO, textAlign: "center", padding: "3rem", fontStyle: "italic" }}>
              Loading your games…
            </div>
          )}

          {/* Active games */}
          {!lobbyLoading && activeGames.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="section-label">Active Games</div>
              <div className="lobby-grid">
                {activeGames.map(g => {
                  const role    = g.player1_id === user.id ? "p1" : "p2";
                  const oppName = role === "p1" ? (g.player2_name || "Waiting for opponent…") : g.player1_name;
                  const meta    = DIFFICULTY_META[g.difficulty] ?? DIFFICULTY_META.beginner;
                  const myTurn  = g.phase === "choosing" && g.choosing_player === role;
                  const waiting = g.phase === "waiting";
                  const answering = g.phase === "answering";
                  return (
                    <div key={g.id} className="game-card"
                      style={{ borderColor: myTurn ? meta.color : BORDER }}
                      onClick={() => { resetGameState(g); setScreen("game"); }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.15rem", letterSpacing: "1px" }}>
                          vs {oppName}
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                          <div style={{
                            background: `${meta.color}22`, border: `1px solid ${meta.color}44`,
                            borderRadius: 20, padding: "0.12rem 0.55rem",
                            fontSize: "0.62rem", color: meta.color,
                            fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px",
                          }}>
                            {meta.label}
                          </div>
                          {myTurn && (
                            <div style={{
                              background: `${ACCENT}22`, border: `1px solid ${ACCENT}55`,
                              borderRadius: 20, padding: "0.12rem 0.55rem",
                              fontSize: "0.62rem", color: ACCENT,
                              fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px",
                              animation: "blink 2s ease infinite",
                            }}>
                              YOUR TURN
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "0.78rem", color: LO, fontFamily: "'Roboto Mono',monospace" }}>
                          {waiting ? "Waiting for opponent to join" :
                           answering ? "Both players answering…" :
                           myTurn ? "Your turn to pick a square" :
                           "Opponent's turn to pick"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: MID, fontFamily: "'Roboto Mono',monospace" }}>
                          {(g.scores?.p1 ?? 0)}–{(g.scores?.p2 ?? 0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed games */}
          {!lobbyLoading && completedGames.length > 0 && (
            <div>
              <div className="section-label">Completed Games</div>
              <div className="lobby-grid">
                {completedGames.map(g => {
                  const role    = g.player1_id === user.id ? "p1" : "p2";
                  const oppName = role === "p1" ? g.player2_name : g.player1_name;
                  const meta    = DIFFICULTY_META[g.difficulty] ?? DIFFICULTY_META.beginner;
                  const iWon    = g.winner === role;
                  const isDraw  = g.winner === "draw";
                  return (
                    <div key={g.id} className="game-card"
                      style={{ opacity: 0.7 }}
                      onClick={() => { resetGameState(g); setScreen("game"); }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem", letterSpacing: "1px" }}>
                          vs {oppName}
                        </div>
                        <div style={{
                          background: `${meta.color}22`, border: `1px solid ${meta.color}44`,
                          borderRadius: 20, padding: "0.12rem 0.55rem",
                          fontSize: "0.62rem", color: meta.color,
                          fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px",
                        }}>
                          {meta.label}
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontSize: "0.78rem", fontFamily: "'Roboto Mono',monospace",
                          color: isDraw ? MID : iWon ? PC.p1 : "#FC5C65" }}>
                          {isDraw ? "Draw" : iWon ? "Won" : "Lost"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: MID, fontFamily: "'Roboto Mono',monospace" }}>
                          {(g.scores?.p1 ?? 0)}–{(g.scores?.p2 ?? 0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!lobbyLoading && myGames.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: LO, fontStyle: "italic", fontSize: "1.15rem" }}>
              No games yet — challenge a friend or play vs the CPU!
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SCREEN: CREATE
  // ══════════════════════════════════════════════════════════════════════════════
  if (screen === "create") {
    const isCpu = gameMode === "vs_cpu";
    return (
      <div style={{ minHeight: "100vh", background: BG, color: HI }}>
        <style>{GLOBAL_CSS}</style>

        <nav style={{ background: SURF, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", height: 60, gap: "1.2rem" }}>
            <button className="ghost-btn" onClick={() => { setScreen("lobby"); setCreateError(""); }}
              style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
              ← Back
            </button>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.4rem", letterSpacing: "2px", color: HI }}>
              NEW GAME
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: 680, margin: "3rem auto", padding: "0 1.5rem" }}>

          {/* Mode toggle */}
          <div className="section-label">Game Mode</div>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {[
              { key: "vs_friend", label: "VS FRIEND", sub: "Async multiplayer — play at your own pace" },
              { key: "vs_cpu",    label: "VS CPU",    sub: "Single player — challenge the computer" },
            ].map(m => (
              <button key={m.key} className="diff-card"
                onClick={() => setGameMode(m.key)}
                style={{ flex: 1, borderColor: gameMode === m.key ? ACCENT : BORDER }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.3rem", letterSpacing: "2px", color: gameMode === m.key ? ACCENT : HI }}>
                  {m.label}
                </div>
                <div style={{ color: LO, fontSize: "0.82rem", marginTop: "0.25rem" }}>{m.sub}</div>
              </button>
            ))}
          </div>

          {/* Question difficulty */}
          <div className="section-label">Question Difficulty</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2.5rem" }}>
            {Object.entries(DIFFICULTY_META).map(([key, meta]) => (
              <button key={key} className="diff-card"
                onClick={() => setQDiff(key)}
                style={{ borderColor: qDiff === key ? meta.color : BORDER }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.4rem", letterSpacing: "2px", color: meta.color }}>
                      {meta.label}
                    </div>
                    <div style={{ color: LO, fontSize: "0.85rem", fontStyle: "italic" }}>{meta.sublabel}</div>
                  </div>
                  {qDiff === key && (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: meta.color, flexShrink: 0 }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Sport filter */}
          <div className="section-label">Sport</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.6rem", marginBottom: "2.5rem" }}>
            {SPORT_META.map(s => (
              <button key={s.key} className="diff-card"
                onClick={() => setSport(s.key)}
                style={{ borderColor: sport === s.key ? ACCENT2 : BORDER, padding: "0.85rem 1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>{s.emoji}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.05rem", letterSpacing: "2px", color: sport === s.key ? ACCENT2 : HI }}>
                      {s.label}
                    </div>
                    <div style={{ color: LO, fontSize: "0.72rem", lineHeight: 1.3 }}>{s.sub}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CPU difficulty (only if vs CPU) */}
          {isCpu && (
            <>
              <div className="section-label">CPU Difficulty</div>
              <div style={{ display: "flex", gap: "0.65rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
                {[
                  { key: "easy",   label: "EASY",   sub: "Picks obvious answers (rarity 50–99)",   color: ACCENT2 },
                  { key: "medium", label: "MEDIUM", sub: "Picks mid-tier answers (rarity 20–60)",    color: "#F7B731" },
                  { key: "hard",   label: "HARD",   sub: "Picks rare answers (rarity 1–30)",         color: "#FC5C65" },
                ].map(d => (
                  <button key={d.key} className="diff-card"
                    onClick={() => setCpuDiff(d.key)}
                    style={{ flex: "1 1 160px", borderColor: cpuDiff === d.key ? d.color : BORDER }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.2rem", letterSpacing: "2px", color: cpuDiff === d.key ? d.color : HI }}>
                      {d.label}
                    </div>
                    <div style={{ color: LO, fontSize: "0.78rem", marginTop: "0.2rem" }}>{d.sub}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {createError && (
            <div style={{
              color: "#FC5C65", fontSize: "0.88rem", marginBottom: "1.2rem",
              background: "#FC5C6515", border: "1px solid #FC5C6533",
              borderRadius: 10, padding: "0.85rem 1.1rem", lineHeight: 1.5,
            }}>
              {createError}
            </div>
          )}

          <button className="big-btn" disabled={createLoading}
            onClick={isCpu ? startCpuGame : createGame}>
            {createLoading
              ? <span className="spinner" />
              : isCpu ? `START vs ${CPU_NAMES[cpuDiff] ?? "CPU"}` : "CREATE GAME & GET INVITE LINK"}
          </button>

          {!isCpu && (
            <p style={{ textAlign: "center", color: LO, fontSize: "0.85rem", marginTop: "1rem", fontStyle: "italic" }}>
              You'll get a shareable link and 6-digit code to send your friend.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SCREEN: JOIN
  // ══════════════════════════════════════════════════════════════════════════════
  if (screen === "join") return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.5rem", letterSpacing: "4px", marginBottom: "0.4rem" }}>JOIN GAME</div>
        <div style={{ color: LO, fontStyle: "italic", marginBottom: "2rem" }}>Enter the invite code your friend shared with you</div>
        <input className="ni" value={joinCode}
          onChange={e => setJoinCode(e.target.value.toUpperCase())}
          placeholder="6-DIGIT CODE"
          style={{ marginBottom: "1.2rem", fontSize: "1.8rem", letterSpacing: "6px", textAlign: "center", fontFamily: "'Bebas Neue',cursive" }} />
        {joinError && (
          <div style={{ color: "#FC5C65", marginBottom: "1rem", fontSize: "0.9rem", textAlign: "center" }}>{joinError}</div>
        )}
        <button className="big-btn" onClick={joinGame}>JOIN GAME</button>
        <button onClick={() => { setScreen("lobby"); setJoinCode(""); setJoinError(""); window.history.replaceState({}, "", window.location.pathname); }}
          style={{ marginTop: "1rem", width: "100%", background: "transparent", border: "none", color: LO, cursor: "pointer", fontStyle: "italic", fontSize: "0.9rem" }}>
          ← Back to lobby
        </button>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════════
  // SCREEN: GAME
  // ══════════════════════════════════════════════════════════════════════════════
  if (!game) return null;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: HI, display: "flex", flexDirection: "column" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── Header ── */}
      <nav style={{
        background: SURF, borderBottom: `1px solid ${BORDER}`,
        flexShrink: 0, position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <button
            onClick={() => { setScreen("lobby"); loadMyGames(); resetGameState(null); }}
            style={{ background: "transparent", border: "none", color: LO, cursor: "pointer", fontFamily: "'Bebas Neue',cursive", fontSize: "0.95rem", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ← LOBBY
          </button>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.4rem", letterSpacing: "2px" }}>
            TIC TAC <span style={{ color: ACCENT }}>SHOW</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {game.isCpu && (
              <span style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.7rem", color: LO }}>
                vs {game.player2_name}
              </span>
            )}
            {diffMeta && (
              <div style={{
                background: `${diffColor}22`, border: `1px solid ${diffColor}44`,
                borderRadius: 20, padding: "0.2rem 0.75rem",
                fontSize: "0.65rem", color: diffColor,
                fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px",
              }}>
                {diffMeta.label}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── Waiting phase (multiplayer) ── */}
      {game.phase === "waiting" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem" }}>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2rem", letterSpacing: "3px", marginBottom: "0.5rem", animation: "blink 2s ease infinite" }}>
            WAITING FOR OPPONENT
          </div>
          <div style={{ color: LO, fontStyle: "italic", marginBottom: "2.5rem" }}>
            Share this code or link to invite a friend
          </div>

          {/* Big code display */}
          <div style={{
            fontFamily: "'Bebas Neue',cursive", fontSize: "4rem", letterSpacing: "12px",
            color: ACCENT, background: SURF, border: `2px solid ${ACCENT}55`,
            borderRadius: 16, padding: "0.75rem 2.5rem", marginBottom: "1.5rem",
            userSelect: "all",
          }}>
            {game.invite_code}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="sb" style={{ background: ACCENT }}
              onClick={() => { navigator.clipboard.writeText(inviteLink); setCopyMsg("Link copied!"); setTimeout(() => setCopyMsg(""), 2500); }}>
              {copyMsg || "COPY INVITE LINK"}
            </button>
            <button className="sb" style={{ background: SURF2, color: HI }}
              onClick={() => { navigator.clipboard.writeText(game.invite_code); setCopyMsg("Code copied!"); setTimeout(() => setCopyMsg(""), 2500); }}>
              COPY CODE
            </button>
          </div>

          <div style={{ color: LO, fontSize: "0.8rem", maxWidth: 400, textAlign: "center", lineHeight: 1.6, fontFamily: "'Roboto Mono',monospace" }}>
            {inviteLink}
          </div>
          <div style={{ color: LO, fontSize: "0.78rem", fontStyle: "italic", marginTop: "1.5rem" }}>
            Page updates automatically when your friend joins
          </div>
        </div>
      )}

      {/* ── Active game ── */}
      {game.phase !== "waiting" && (
        <div className="game-wrap">

          {/* ── Left: Score bar + Board ── */}
          <div className="board-col">

            {/* Score bar */}
            <div style={{ display: "flex", gap: "0.65rem", marginBottom: "1.2rem" }}>
              {["p1", "p2"].map(p => {
                const name    = p === "p1" ? game.player1_name : game.player2_name;
                const isMe    = myRole === p;
                const picking = game.phase === "choosing" && game.choosing_player === p;
                const col     = PC[p];
                return (
                  <div key={p} style={{
                    flex: 1, background: SURF, border: `1.5px solid ${picking ? col : BORDER}`,
                    borderRadius: 14, padding: "0.85rem 1.1rem",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", background: col,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue',cursive", fontSize: "1rem",
                      color: "#000", flexShrink: 0, fontWeight: 700,
                    }}>
                      {p === "p1" ? "X" : "O"}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {name}{isMe ? " (you)" : ""}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: LO, fontFamily: "'Roboto Mono',monospace" }}>
                        {(game.scores ?? {})[p] ?? 0} squares
                      </div>
                    </div>
                    {picking && (
                      <div style={{ fontSize: "0.6rem", color: col, fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px", flexShrink: 0, animation: "blink 1.5s ease infinite" }}>
                        PICKING
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Board */}
            <div className="board-grid">
              {(game.cells ?? []).map((cell, i) => {
                const owner   = board[i];
                const isOwned = owner === "p1" || owner === "p2";
                const isReset = owner === "reset";
                const isActive = game.active_cell === i;
                const inWin   = (game.win_line ?? []).includes(i);
                const canPick = game.phase === "choosing" && isMyPick && !isOwned && !isReset && (owner === "null" || owner == null);
                const q       = ANSWER_POOLS[cell.questionKey];
                let cls = "cell";
                if (isActive) cls += " active-cell";
                if (inWin)    cls += " win-cell";
                if (canPick)  cls += " pickable";
                return (
                  <div key={i} className={cls}
                    style={{
                      borderColor: isOwned ? `${PC[owner]}55` : isActive ? diffColor : BORDER,
                      background:  isOwned ? `${PC[owner]}18` : SURF,
                    }}
                    onClick={() => canPick && (game.isCpu ? selectCellCpu(i) : selectCell(i))}>
                    {isOwned ? (
                      <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "3rem", color: PC[owner], lineHeight: 1 }}>
                        {owner === "p1" ? "X" : "O"}
                      </div>
                    ) : isReset ? (
                      <div style={{ fontSize: "2rem", opacity: 0.45 }}>↺</div>
                    ) : (
                      <>
                        {q && (
                          <div style={{ fontSize: "0.55rem", color: isActive ? diffColor : LO, marginBottom: "0.35rem", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", fontFamily: "'Roboto Mono',monospace" }}>
                            {q.sport}
                          </div>
                        )}
                        <div style={{ fontSize: "0.7rem", color: isActive ? HI : MID, lineHeight: 1.5, fontFamily: "'Roboto Mono',monospace", fontWeight: 500 }}>
                          {q ? (q.clue.length > 72 ? q.clue.slice(0, 70) + "…" : q.clue) : ""}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status under board */}
            <div style={{ marginTop: "1rem", textAlign: "center", color: LO, fontSize: "0.82rem", fontStyle: "italic", minHeight: "1.4rem" }}>
              {game.phase === "choosing" && (
                isMyPick
                  ? "Your turn — click a square to play it"
                  : `Waiting for ${game.choosing_player === "p1" ? game.player1_name : game.player2_name} to pick…`
              )}
              {(game.phase === "answering" || game.phase === "retry") && !revealData && !submitted && "Both players answering…"}
              {(game.phase === "answering" || game.phase === "retry") && submitted && !revealData && "Answer locked in — waiting for opponent…"}
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="sidebar">

            {/* Clue + answer input */}
            {(game.phase === "answering" || game.phase === "retry") && activeQ && !revealData && (
              <div style={{
                background: SURF, border: `1.5px solid ${diffColor}55`,
                borderRadius: 18, padding: "1.5rem", animation: "fadeIn 0.3s ease",
              }}>
                <div style={{ fontSize: "0.65rem", color: diffColor, letterSpacing: "2px", marginBottom: "0.6rem", fontFamily: "'Roboto Mono',monospace", fontWeight: 600 }}>
                  {activeQ.sport} · CLUE
                </div>
                <div style={{ fontSize: "1.15rem", color: HI, lineHeight: 1.7, marginBottom: "1.4rem" }}>
                  {activeQ.clue}
                </div>
                {!submitted ? (
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    <AutocompleteInput
                      value={myAnswer}
                      disabled={submitted}
                      accentColor={diffColor}
                      placeholder="Type a name…"
                      onChange={v => setMyAnswer(v)}
                      onSelect={v => setMyAnswer(v)}
                      onSubmit={game.isCpu ? submitAnswerCpu : submitAnswer}
                      sport={game.sport}
                    />
                    <button className="sb" style={{ background: diffColor }}
                      onClick={game.isCpu ? submitAnswerCpu : submitAnswer}
                      disabled={!myAnswer.trim()}>
                      LOCK IN
                    </button>
                  </div>
                ) : (
                  <div style={{
                    background: SURF2, border: `1.5px solid ${PC[myRole ?? "p1"]}`,
                    borderRadius: 10, padding: "0.9rem 1.2rem",
                    color: PC[myRole ?? "p1"], fontFamily: "'Roboto Mono',monospace",
                    fontSize: "0.85rem", textAlign: "center",
                    display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center",
                  }}>
                    <span className="spinner" style={{ borderTopColor: PC[myRole ?? "p1"] }} />
                    Answer locked — waiting for {game.isCpu ? game.player2_name : "opponent"}…
                  </div>
                )}
              </div>
            )}

            {/* Picking prompt in sidebar */}
            {game.phase === "choosing" && (
              <div style={{
                background: SURF, border: `1.5px solid ${BORDER}`,
                borderRadius: 18, padding: "1.5rem", textAlign: "center",
              }}>
                {isMyPick ? (
                  <>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.4rem", letterSpacing: "2px", color: ACCENT, marginBottom: "0.4rem" }}>
                      YOUR TURN
                    </div>
                    <div style={{ color: MID, fontSize: "0.9rem" }}>
                      Click any open square on the board to play it
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.3rem", letterSpacing: "2px", color: LO, marginBottom: "0.4rem" }}>
                      WAITING
                    </div>
                    <div style={{ color: LO, fontSize: "0.88rem" }}>
                      {game.choosing_player === "p1" ? game.player1_name : game.player2_name} is choosing a square…
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Reveal placeholder in sidebar — keeps layout stable while modal is open */}
            {revealData && (
              <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "1rem", textAlign: "center", color: LO, fontStyle: "italic" }}>
                Reviewing answers…
              </div>
            )}

            {/* Game over */}
            {game.phase === "gameover" && !revealData && (
              <div style={{
                background: SURF, border: `2px solid ${diffColor}`,
                borderRadius: 20, padding: "2rem", textAlign: "center", animation: "fadeUp 0.4s ease",
              }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.4rem", letterSpacing: "4px", marginBottom: "0.5rem" }}>
                  {game.winner === "draw" ? "IT'S A DRAW" :
                   game.winner === myRole ? "YOU WIN! 🏆" :
                   `${game.winner === "p1" ? game.player1_name : game.player2_name} WINS!`}
                </div>
                <div style={{ color: MID, fontStyle: "italic", marginBottom: "1.75rem", fontSize: "1rem" }}>
                  {game.player1_name} {(game.scores ?? {}).p1 ?? 0} – {(game.scores ?? {}).p2 ?? 0} {game.player2_name}
                </div>
                <button className="big-btn" onClick={() => { setScreen("lobby"); loadMyGames(); resetGameState(null); }}>
                  BACK TO LOBBY
                </button>
                {game.isCpu && (
                  <button className="big-btn" onClick={startCpuGame}
                    style={{ marginTop: "0.75rem", background: "linear-gradient(135deg,#2b2b46,#3a3a60)" }}>
                    PLAY AGAIN
                  </button>
                )}
              </div>
            )}

            {/* Multiplayer invite while in game (waiting phase already handled above) */}
            {!game.isCpu && game.phase !== "waiting" && game.phase !== "gameover" && !revealData && (
              <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1rem 1.2rem" }}>
                <div className="section-label" style={{ marginBottom: "0.5rem" }}>Invite code</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.5rem", letterSpacing: "6px", color: ACCENT }}>
                    {game.invite_code}
                  </span>
                  <button className="sb" style={{ background: SURF3, color: HI, fontSize: "0.8rem", padding: "0.5rem 0.9rem" }}
                    onClick={() => { navigator.clipboard.writeText(inviteLink); setCopyMsg("Copied!"); setTimeout(() => setCopyMsg(""), 2000); }}>
                    {copyMsg || "COPY"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── REVEAL MODAL (full-screen overlay, dismisses on Continue click) ── */}
      {revealData && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(8,8,18,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 400, padding: "1.5rem",
          animation: "fadeIn 0.2s ease",
        }}>
          <div style={{
            background: SURF, border: `1.5px solid ${BORDER}`,
            borderRadius: 24, padding: "2.5rem",
            maxWidth: 620, width: "100%",
            boxShadow: "0 32px 96px rgba(0,0,0,0.85)",
          }}>
            {/* Clue reminder — use snapshotted revealData.q, not activeQ (active_cell is null by now) */}
            {revealData.q && (
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.62rem", color: diffColor, letterSpacing: "2px", fontFamily: "'Roboto Mono',monospace", marginBottom: "0.4rem" }}>
                  {revealData.q.sport} · CLUE
                </div>
                <div style={{ color: MID, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  {revealData.q.clue}
                </div>
              </div>
            )}

            {/* Answer cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              {["p1", "p2"].map((p, idx) => {
                const show   = revealStep > idx;
                const pName  = p === "p1" ? game.player1_name : game.player2_name;
                const isMe   = myRole === p;
                const answer = p === "p1" ? revealData.move.p1_answer : revealData.move.p2_answer;
                const valid  = p === "p1" ? revealData.move.p1_valid  : revealData.move.p2_valid;
                const hardcodedRarity = p === "p1" ? revealData.move.p1_rarity : revealData.move.p2_rarity;
                // Use live rarity if we have enough data (>= 20 submissions), else fall back to hardcoded
                const ls = revealData.liveStats;
                const liveCount = ls && answer ? (ls.answerCounts[normalizeStr(answer)] ?? 0) : 0;
                const hasLiveData = ls && ls.totalSubmissions >= 20;
                const liveRarity = hasLiveData ? Math.round((liveCount / ls.totalSubmissions) * 100) : null;
                const rarity = liveRarity ?? hardcodedRarity;
                const limitedData = !hasLiveData && hardcodedRarity != null;
                const won    = revealData.result === p;
                return (
                  <div key={p} style={{
                    background: show ? (won ? `${PC[p]}18` : SURF2) : SURF2,
                    border: `2px solid ${show ? (won ? PC[p] : BORDER) : "transparent"}`,
                    borderRadius: 16, padding: "1.4rem",
                    transition: "background 0.45s, border-color 0.45s, opacity 0.45s, transform 0.45s",
                    opacity: show ? 1 : 0,
                    transform: show ? "translateY(0)" : "translateY(14px)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.65rem", letterSpacing: "1.5px", color: MID, textTransform: "uppercase" }}>
                        {pName}{isMe ? " (you)" : ""}
                      </div>
                      {show && won && (
                        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "0.8rem", color: PC[p], letterSpacing: "1px" }}>
                          🏆 WINS
                        </div>
                      )}
                    </div>
                    {show ? (
                      <>
                        <div style={{
                          fontSize: "1.1rem",
                          color: !valid ? "#FC5C65" : won ? PC[p] : HI,
                          fontWeight: 700, lineHeight: 1.3, marginBottom: "0.85rem",
                        }}>
                          {answer}
                        </div>
                        {!valid ? (
                          <div style={{
                            display: "inline-flex", alignItems: "center", gap: "0.3rem",
                            background: "#FC5C6520", border: "1px solid #FC5C6440",
                            borderRadius: 6, padding: "0.25rem 0.65rem",
                            fontSize: "0.68rem", color: "#FC5C65",
                            fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px",
                          }}>
                            ✗ INVALID
                          </div>
                        ) : rarity != null ? (
                          <RarityBar score={rarity} limitedData={limitedData} />
                        ) : null}
                      </>
                    ) : (
                      <div style={{ fontSize: "2.8rem", color: SURF3, textAlign: "center", padding: "0.6rem 0", fontFamily: "'Bebas Neue',cursive", letterSpacing: "4px" }}>
                        ???
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Result banner */}
            {revealStep >= 3 && (
              <div style={{ textAlign: "center", marginBottom: "1.75rem", animation: "fadeUp 0.4s ease" }}>
                {revealData.isSameAnswer ? (
                  <>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.7rem", letterSpacing: "3px", color: LO }}>SAME ANSWER</div>
                    <div style={{ color: LO, fontStyle: "italic", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                      New question incoming — {revealData.nextPickerName} tries again!
                    </div>
                  </>
                ) : revealData.isBothInvalid ? (
                  <>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.7rem", letterSpacing: "3px", color: LO }}>BOTH ANSWERS INVALID</div>
                    <div style={{ color: LO, fontStyle: "italic", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                      Square resets — {revealData.nextPickerName} picks next
                    </div>
                  </>
                ) : revealData.result === "reset" ? (
                  <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.7rem", letterSpacing: "3px", color: LO }}>SQUARE RESETS</div>
                ) : (
                  <>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2rem", letterSpacing: "3px", color: PC[revealData.result] }}>
                      {revealData.winnerName} WINS THE SQUARE!
                    </div>
                    {revealData.move[`${revealData.result}_rarity`] != null &&
                     revealData.move[`${revealData.result === "p1" ? "p2" : "p1"}_rarity`] != null && (
                      <div style={{ color: MID, fontSize: "0.85rem", marginTop: "0.35rem", fontStyle: "italic" }}>
                        Rarity: {revealData.move[`${revealData.result}_rarity`]}% vs {revealData.move[`${revealData.result === "p1" ? "p2" : "p1"}_rarity`]}%
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {revealStep >= 3 && (
              <button className="big-btn" onClick={dismissReveal} style={{ animation: "fadeIn 0.4s ease" }}>
                CONTINUE
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
