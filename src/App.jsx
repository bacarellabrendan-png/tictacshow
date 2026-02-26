import { useState, useEffect, useRef } from "react";
import {
  ANSWER_POOLS, DIFFICULTY_META, ATHLETE_INDEX,
  buildPuzzle, matchAnswer, normalizeStr,
} from "./data/questions.js";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function sbFetch(path, opts = {}) {
  const session = JSON.parse(localStorage.getItem("tts_session") || "null");
  const headers = {
    "Content-Type": "application/json",
    apikey: SB_KEY,
    Authorization: `Bearer ${session?.access_token || SB_KEY}`,
    ...opts.headers,
  };
  const res = await fetch(`${SB_URL}${path}`, { ...opts, headers });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

async function signUp(email, password, username) {
  const r = await sbFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, options: { data: { username } } }),
  });
  if (r.ok && r.data?.access_token) {
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
  if (r.ok && r.data?.access_token) {
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
  return sbFetch(`/rest/v1/${table}${params}`, {
    method: "GET",
    headers: { Prefer: "return=representation" },
  });
}

async function dbInsert(table, data) {
  return sbFetch(`/rest/v1/${table}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { Prefer: "return=representation" },
  });
}

async function dbUpdate(table, params, data) {
  return sbFetch(`/rest/v1/${table}${params}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { Prefer: "return=representation" },
  });
}

// ─── GAME LOGIC ───────────────────────────────────────────────────────────────
const WINNING_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] !== "reset")
      return { winner: board[a], line: [a, b, c] };
  }
  // draw only if every square is owned (p1/p2), none empty or reset
  if (board.every(v => v === "p1" || v === "p2")) return { winner: "draw", line: [] };
  return null;
}

function genInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const BG = "#1c1c2e";
const SURFACE = "#25253a";
const SURFACE2 = "#2e2e46";
const BORDER = "#3a3a55";
const TEXT_HI = "#f0f0fa";
const TEXT_MID = "#a8a8c8";
const TEXT_LO = "#6a6a90";
const P_COLORS = { p1: "#FF6B35", p2: "#4ECDC4" };

// ─── RARITY BAR ───────────────────────────────────────────────────────────────
function RarityBar({ score }) {
  const pct = Math.max(2, Math.min(100, score));
  const col = score < 10 ? "#FC5C65" : score < 30 ? "#F7B731" : "#4ECDC4";
  const tier = score < 10 ? "RARE" : score < 30 ? "UNCOMMON" : "COMMON";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
        <span style={{ fontSize: "0.62rem", color: TEXT_LO, letterSpacing: "1px" }}>POPULARITY</span>
        <span style={{ fontSize: "0.62rem", color: col, letterSpacing: "1px" }}>{tier} · {score}%</span>
      </div>
      <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: col, borderRadius: 2, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

// ─── AUTOCOMPLETE INPUT ───────────────────────────────────────────────────────
function AutocompleteInput({ value, onChange, onSelect, onSubmit, disabled, placeholder, diffColor }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef(null);

  const suggestions = value.trim().length >= 1
    ? ATHLETE_INDEX.filter(n => normalizeStr(n).includes(normalizeStr(value))).slice(0, 8)
    : [];

  useEffect(() => setHi(0), [value]);

  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", flex: 1 }}>
      <input
        className="ai"
        value={value}
        disabled={disabled}
        autoComplete="off"
        placeholder={placeholder}
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
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: SURFACE2, border: `1px solid ${diffColor}66`, borderRadius: 10,
          zIndex: 100, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {suggestions.map((name, i) => (
            <div
              key={name}
              onMouseDown={e => { e.preventDefault(); onSelect(name); setOpen(false); }}
              onMouseEnter={() => setHi(i)}
              style={{
                padding: "0.65rem 1rem",
                background: i === hi ? `${diffColor}22` : "transparent",
                color: i === hi ? TEXT_HI : TEXT_MID,
                fontSize: "0.9rem", cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? `1px solid ${BORDER}` : "none",
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

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; }
  @keyframes fadeIn  { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes shimmer { 0% { background-position:-200% center } 100% { background-position:200% center } }
  @keyframes blink   { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
  @keyframes winPulse { 0% { box-shadow:0 0 0 0 rgba(255,107,53,0.5) } 100% { box-shadow:0 0 0 14px rgba(255,107,53,0) } }
  .ni {
    background:${SURFACE2}; border:1px solid ${BORDER}; border-radius:10px;
    color:${TEXT_HI}; padding:0.85rem 1.1rem; font-size:1rem;
    font-family:'DM Serif Display',serif; width:100%; outline:none; transition:border-color 0.2s;
  }
  .ni:focus { border-color:#FF6B35; }
  .ai {
    background:${SURFACE2}; border:2px solid ${BORDER}; border-radius:10px;
    color:${TEXT_HI}; padding:0.8rem 1rem; font-size:1rem;
    font-family:'DM Serif Display',serif; width:100%; outline:none; transition:border-color 0.2s;
  }
  .ai:focus { border-color:#FF6B35; }
  .ai:disabled { opacity:0.4; cursor:not-allowed; }
  .big-btn {
    background:linear-gradient(135deg,#FF6B35,#e8460a); border:none; border-radius:12px;
    color:#fff; padding:1rem 2.5rem; font-size:1.3rem; font-family:'Bebas Neue',cursive;
    letter-spacing:3px; cursor:pointer; width:100%; box-shadow:0 6px 24px rgba(255,107,53,0.35);
    transition:all 0.2s;
  }
  .big-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 30px rgba(255,107,53,0.45); }
  .big-btn:disabled { opacity:0.5; cursor:not-allowed; }
  .sb {
    border:none; border-radius:10px; color:#000; padding:0.8rem 1.3rem;
    font-family:'Bebas Neue',cursive; letter-spacing:2px; font-size:1rem;
    cursor:pointer; transition:all 0.15s; white-space:nowrap;
  }
  .sb:disabled { opacity:0.35; cursor:not-allowed; }
  .cell {
    aspect-ratio:1; border-radius:14px; border:2px solid ${BORDER};
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:0.65rem; transition:all 0.2s; position:relative;
    overflow:hidden; text-align:center; min-height:80px; background:${SURFACE};
  }
  .pickable { cursor:pointer; }
  .pickable:hover { background:${SURFACE2} !important; transform:scale(1.03); }
  .active-cell { box-shadow:0 0 0 3px rgba(255,107,53,0.3); }
  .win-cell { animation:winPulse 1.1s infinite; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,        setUser]        = useState(getUser);
  const [screen,      setScreen]      = useState("lobby");
  const [authMode,    setAuthMode]    = useState("login");
  const [authForm,    setAuthForm]    = useState({ email: "", password: "", username: "" });
  const [authError,   setAuthError]   = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [myGames,     setMyGames]     = useState([]);
  const [lobbyLoading,setLobbyLoading]= useState(false);
  const [game,        setGame]        = useState(null);
  const [joinCode,    setJoinCode]    = useState("");
  const [joinError,   setJoinError]   = useState("");
  const [difficulty,  setDifficulty]  = useState("beginner");
  const [currentMove, setCurrentMove] = useState(null);
  const [myAnswer,    setMyAnswer]    = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [copyMsg,     setCopyMsg]     = useState("");
  const [revealData,  setRevealData]  = useState(null);
  const [revealStep,  setRevealStep]  = useState(0);

  // Refs so polling callbacks always see fresh values without stale closures
  const gameRef        = useRef(null);
  const resolving      = useRef(false);  // prevents double-resolve on same move
  const showingReveal  = useRef(false);  // prevents duplicate reveal panels

  useEffect(() => { gameRef.current = game; }, [game]);

  // ── BOOT ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) { setScreen("auth"); return; }
    setScreen("lobby");
    loadMyGames();
    const code = new URLSearchParams(window.location.search).get("join");
    if (code) { setJoinCode(code); setScreen("join"); }
  }, [user]);

  // ── POLLING ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "game" || !game) return;
    const iv = setInterval(refreshGame, 3000);
    return () => clearInterval(iv);
  }, [screen, game?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── LOAD MOVE for non-picking player when phase switches to "answering" ──────
  useEffect(() => {
    if (game?.phase !== "answering" || game.active_cell == null || currentMove) return;
    dbSelect("moves", `?game_id=eq.${game.id}&cell_index=eq.${game.active_cell}&order=created_at.desc&limit=1`)
      .then(r => { if (r.ok && r.data?.[0]) setCurrentMove(r.data[0]); });
  }, [game?.phase, game?.active_cell]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── POLL FOR OPPONENT ANSWER after we've locked in ──────────────────────────
  useEffect(() => {
    if (!submitted || !currentMove || !game) return;
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
  }, [submitted, currentMove?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── REFRESH GAME (polling tick) ──────────────────────────────────────────────
  async function refreshGame() {
    const cur = gameRef.current;
    if (!cur) return;
    const r = await dbSelect("games", `?id=eq.${cur.id}`);
    if (!r.ok || !r.data?.[0]) return;
    const fresh = r.data[0];

    // Detect answering → choosing transition for the non-resolver's reveal
    if (fresh.phase === "choosing" && cur.phase === "answering" && !showingReveal.current) {
      const prevCell = cur.active_cell;
      if (prevCell != null) {
        const mr = await dbSelect("moves", `?game_id=eq.${cur.id}&cell_index=eq.${prevCell}&order=created_at.desc&limit=1`);
        if (mr.ok && mr.data?.[0] && mr.data[0].result) {
          triggerReveal(mr.data[0], fresh);
        }
      }
    }

    setGame(fresh);
  }

  // ── REVEAL ──────────────────────────────────────────────────────────────────
  function triggerReveal(move, freshGame) {
    showingReveal.current = true;
    const winnerName =
      move.result === "p1" ? freshGame.player1_name :
      move.result === "p2" ? freshGame.player2_name : null;
    setRevealData({ move, result: move.result, winnerName });
    setRevealStep(0);
    setTimeout(() => setRevealStep(1), 400);
    setTimeout(() => setRevealStep(2), 1100);
    setTimeout(() => setRevealStep(3), 2000);
    setTimeout(() => {
      setRevealData(null);
      setRevealStep(0);
      setSubmitted(false);
      setMyAnswer("");
      setCurrentMove(null);
      resolving.current = false;
      showingReveal.current = false;
    }, 5500);
  }

  // ── DATA HELPERS ────────────────────────────────────────────────────────────
  async function loadMyGames() {
    if (!user) return;
    setLobbyLoading(true);
    const r = await dbSelect("games",
      `?or=(player1_id.eq.${user.id},player2_id.eq.${user.id})&order=updated_at.desc&limit=20`);
    if (r.ok) setMyGames(r.data);
    setLobbyLoading(false);
  }

  function resetGameState(g) {
    setGame(g);
    gameRef.current = g;
    setCurrentMove(null);
    setMyAnswer("");
    setSubmitted(false);
    setRevealData(null);
    setRevealStep(0);
    resolving.current = false;
    showingReveal.current = false;
  }

  // ── AUTH ────────────────────────────────────────────────────────────────────
  async function handleAuth(e) {
    e.preventDefault();
    setAuthError(""); setAuthLoading(true);
    if (authMode === "signup") {
      if (!authForm.username.trim()) { setAuthError("Username is required"); setAuthLoading(false); return; }
      const r = await signUp(authForm.email, authForm.password, authForm.username);
      if (r.ok) setUser(getUser());
      else setAuthError(r.data?.msg || r.data?.error_description || "Sign up failed");
    } else {
      const r = await signIn(authForm.email, authForm.password);
      if (r.ok) setUser(getUser());
      else setAuthError(r.data?.error_description || "Invalid email or password");
    }
    setAuthLoading(false);
  }

  // ── CREATE GAME ─────────────────────────────────────────────────────────────
  async function createGame() {
    const r = await dbInsert("games", {
      invite_code: genInviteCode(),
      difficulty,
      cells: buildPuzzle(difficulty),
      player1_id: user.id,
      player1_name: user.username,
      phase: "waiting",
      board: Array(9).fill("null"),
      scores: { p1: 0, p2: 0 },
      win_line: [],
      choosing_player: "p1",
    });
    if (r.ok && r.data?.[0]) { resetGameState(r.data[0]); setScreen("game"); }
  }

  // ── JOIN GAME ───────────────────────────────────────────────────────────────
  async function joinGame() {
    setJoinError("");
    const r = await dbSelect("games", `?invite_code=eq.${joinCode.toUpperCase().trim()}`);
    if (!r.ok || !r.data?.[0]) { setJoinError("Game not found. Check the code and try again."); return; }
    const g = r.data[0];
    if (g.player2_id)          { setJoinError("This game already has two players."); return; }
    if (g.player1_id === user.id) { setJoinError("You can't join your own game."); return; }
    const upd = await dbUpdate("games", `?id=eq.${g.id}`,
      { player2_id: user.id, player2_name: user.username, phase: "choosing" });
    if (upd.ok) {
      const fresh = await dbSelect("games", `?id=eq.${g.id}`);
      resetGameState(fresh.data[0]);
      setScreen("game");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }

  // ── SELECT CELL ─────────────────────────────────────────────────────────────
  async function selectCell(idx) {
    if (!game || game.phase !== "choosing") return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    if (game.choosing_player !== myRole) return;
    const owner = (game.board ?? [])[idx];
    if (owner !== "null" && owner !== null) return;

    const qKey = game.cells[idx].questionKey;
    const mv = await dbInsert("moves", { game_id: game.id, cell_index: idx, question_key: qKey });
    if (!mv.ok || !mv.data?.[0]) return;
    setCurrentMove(mv.data[0]);
    await dbUpdate("games", `?id=eq.${game.id}`, { active_cell: idx, phase: "answering" });
    await refreshGame();
  }

  // ── SUBMIT ANSWER ───────────────────────────────────────────────────────────
  async function submitAnswer() {
    if (submitted || !myAnswer.trim() || !game || !currentMove) return;
    const myRole = game.player1_id === user.id ? "p1" : "p2";
    const qKey   = game.cells[game.active_cell].questionKey;
    const match  = matchAnswer(myAnswer, qKey);
    const patch  = myRole === "p1"
      ? { p1_answer: myAnswer, p1_valid: !!match, p1_rarity: match?.rarity ?? null }
      : { p2_answer: myAnswer, p2_valid: !!match, p2_rarity: match?.rarity ?? null };

    await dbUpdate("moves", `?id=eq.${currentMove.id}`, patch);
    setSubmitted(true);

    // If opponent already answered, resolve immediately
    const freshMv = await dbSelect("moves", `?id=eq.${currentMove.id}`);
    if (freshMv.ok && freshMv.data?.[0]) {
      const mv = freshMv.data[0];
      const otherIn = myRole === "p1" ? mv.p2_answer !== null : mv.p1_answer !== null;
      if (otherIn && !resolving.current) {
        resolving.current = true;
        await resolveMove(mv);
      }
    }
  }

  // ── RESOLVE MOVE ────────────────────────────────────────────────────────────
  async function resolveMove(mv) {
    // Determine winner: invalid answer loses; tie = same answer; rarer (lower %) wins
    let result;
    if (!mv.p1_valid && !mv.p2_valid)                           result = "reset";
    else if (!mv.p1_valid)                                      result = "p2";
    else if (!mv.p2_valid)                                      result = "p1";
    else if (normalizeStr(mv.p1_answer) === normalizeStr(mv.p2_answer)) result = "reset";
    else result = mv.p1_rarity <= mv.p2_rarity ? "p1" : "p2";

    await dbUpdate("moves", `?id=eq.${mv.id}`, { result });

    const gRes = await dbSelect("games", `?id=eq.${game.id}`);
    const g    = gRes.data[0];
    const newBoard = [...g.board];
    newBoard[g.active_cell] = result === "reset" ? "reset" : result;

    const newScores = { ...g.scores };
    if (result !== "reset") newScores[result] = (newScores[result] || 0) + 1;

    const boardForCheck = newBoard.map(v => (v === "null" || v === null || v === "reset") ? null : v);
    const winCheck   = checkWinner(boardForCheck);
    const nextPicker = result === "reset"
      ? (g.choosing_player === "p1" ? "p2" : "p1")
      : (result === "p1" ? "p2" : "p1");

    triggerReveal({ ...mv, result }, g);

    await dbUpdate("games", `?id=eq.${game.id}`, {
      board: newBoard,
      scores: newScores,
      active_cell: null,
      phase: winCheck ? "gameover" : "choosing",
      choosing_player: nextPicker,
      winner: winCheck ? winCheck.winner : null,
      win_line: winCheck ? winCheck.line : [],
    });

    // Reset tile after 2 s if tie
    if (result === "reset") {
      setTimeout(async () => {
        const nb = [...newBoard];
        nb[g.active_cell] = "null";
        await dbUpdate("games", `?id=eq.${game.id}`, { board: nb });
      }, 2000);
    }

    await refreshGame();
  }

  // ── DERIVED ──────────────────────────────────────────────────────────────────
  const myRole       = game ? (game.player1_id === user?.id ? "p1" : "p2") : null;
  const diffMeta     = game ? (DIFFICULTY_META[game.difficulty] ?? DIFFICULTY_META.beginner) : null;
  const diffColor    = diffMeta?.color ?? "#FF6B35";
  const activeQ      = game?.active_cell != null ? ANSWER_POOLS[game.cells?.[game.active_cell]?.questionKey] : null;
  const isMyPickTurn = game?.phase === "choosing" && myRole === game.choosing_player;
  const inviteLink   = game ? `${window.location.origin}${window.location.pathname}?join=${game.invite_code}` : "";
  const board        = game?.board ?? Array(9).fill("null");

  // ════════════════════════════════════════════════════════════════
  // SCREENS
  // ════════════════════════════════════════════════════════════════

  // ── AUTH ─────────────────────────────────────────────────────────────────────
  if (!user || screen === "auth") return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "clamp(3rem,10vw,6rem)", lineHeight: 0.9, letterSpacing: "2px" }}>
          <span style={{ color: TEXT_HI }}>TIC TAC </span>
          <span style={{ background: "linear-gradient(90deg,#FF6B35,#FC5C65,#FF6B35)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>SHOW</span>
        </div>
        <div style={{ color: TEXT_LO, fontFamily: "'DM Serif Display',serif", fontStyle: "italic", marginTop: "0.5rem" }}>The sports trivia showdown</div>
      </div>

      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 420, animation: "fadeIn 0.4s ease" }}>
        <div style={{ display: "flex", marginBottom: "1.5rem", borderBottom: `1px solid ${BORDER}` }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setAuthMode(m); setAuthError(""); }}
              style={{ flex: 1, padding: "0.6rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem", letterSpacing: "2px", color: authMode === m ? TEXT_HI : TEXT_LO, borderBottom: authMode === m ? "3px solid #FF6B35" : "3px solid transparent" }}>
              {m === "login" ? "LOG IN" : "SIGN UP"}
            </button>
          ))}
        </div>

        <form onSubmit={handleAuth}>
          {authMode === "signup" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: TEXT_LO, fontSize: "0.72rem", display: "block", marginBottom: "0.35rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>USERNAME</label>
              <input className="ni" placeholder="Your display name" value={authForm.username} onChange={e => setAuthForm(f => ({ ...f, username: e.target.value }))} />
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: TEXT_LO, fontSize: "0.72rem", display: "block", marginBottom: "0.35rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>EMAIL</label>
            <input className="ni" type="email" placeholder="you@email.com" value={authForm.email} onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: TEXT_LO, fontSize: "0.72rem", display: "block", marginBottom: "0.35rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" }}>PASSWORD</label>
            <input className="ni" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          {authError && <div style={{ color: "#FC5C65", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>{authError}</div>}
          <button className="big-btn" type="submit" disabled={authLoading}>
            {authLoading ? "…" : authMode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>
    </div>
  );

  // ── LOBBY ────────────────────────────────────────────────────────────────────
  if (screen === "lobby") return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT_HI }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: "0.85rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.6rem", letterSpacing: "2px" }}>
          TIC TAC <span style={{ color: "#FF6B35" }}>SHOW</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: TEXT_LO, fontSize: "0.85rem" }}>{user.username}</span>
          <button onClick={() => { signOut(); setUser(null); }}
            style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT_LO, padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
            Log out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem" }}>
          <button className="big-btn" onClick={() => setScreen("create")} style={{ flex: 1 }}>NEW GAME</button>
          <button onClick={() => setScreen("join")}
            style={{ flex: 1, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, color: TEXT_HI, fontSize: "1.1rem", fontFamily: "'Bebas Neue',cursive", letterSpacing: "3px", cursor: "pointer" }}>
            JOIN GAME
          </button>
        </div>

        <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.7rem", color: TEXT_LO, letterSpacing: "2px", marginBottom: "1rem" }}>YOUR GAMES</div>
        {lobbyLoading && <div style={{ color: TEXT_LO, textAlign: "center", padding: "2rem" }}>Loading…</div>}
        {!lobbyLoading && myGames.length === 0 && (
          <div style={{ color: TEXT_LO, textAlign: "center", padding: "3rem", fontStyle: "italic", fontFamily: "'DM Serif Display',serif" }}>No games yet — start one!</div>
        )}
        {myGames.map(g => {
          const role    = g.player1_id === user.id ? "p1" : "p2";
          const oppName = role === "p1" ? (g.player2_name || "Waiting for opponent…") : g.player1_name;
          const meta    = DIFFICULTY_META[g.difficulty] ?? DIFFICULTY_META.beginner;
          const myTurn  = g.phase === "choosing" && g.choosing_player === role;
          return (
            <div key={g.id} onClick={() => { resetGameState(g); setScreen("game"); }}
              style={{ background: SURFACE, border: `1px solid ${myTurn ? meta.color : BORDER}`, borderRadius: 16, padding: "1.2rem 1.5rem", marginBottom: "0.8rem", cursor: "pointer", transition: "all 0.2s", animation: "fadeIn 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem", letterSpacing: "1px" }}>vs {oppName}</div>
                <div style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}44`, borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.65rem", color: meta.color, fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px" }}>
                  {meta.label}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.75rem", color: TEXT_LO, fontFamily: "'Roboto Mono',monospace" }}>
                  {g.phase === "waiting"   ? "Waiting for opponent to join" :
                   g.phase === "gameover"  ? `Game over — ${g.winner === role ? "You won!" : g.winner === "draw" ? "Draw" : "You lost"}` :
                   myTurn                  ? "Your turn to pick" :
                   g.phase === "answering" ? "Answering in progress…" :
                                             "Opponent's turn"}
                </div>
                {myTurn && <div style={{ fontSize: "0.65rem", color: meta.color, fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px" }}>YOUR TURN</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── CREATE GAME ──────────────────────────────────────────────────────────────
  if (screen === "create") return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.5rem", letterSpacing: "4px", color: TEXT_HI, marginBottom: "0.4rem" }}>NEW GAME</div>
        <div style={{ color: TEXT_LO, fontFamily: "'DM Serif Display',serif", fontStyle: "italic", marginBottom: "2rem" }}>Pick a difficulty, then share the invite link</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
          {Object.entries(DIFFICULTY_META).map(([key, meta]) => (
            <button key={key} onClick={() => setDifficulty(key)}
              style={{ background: SURFACE, border: `2px solid ${difficulty === key ? meta.color : BORDER}`, borderRadius: 16, padding: "1.2rem 1.5rem", cursor: "pointer", textAlign: "left", color: TEXT_HI, transition: "all 0.2s" }}>
              <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.5rem", letterSpacing: "2px", color: meta.color }}>{meta.label}</div>
              <div style={{ color: TEXT_MID, fontSize: "0.85rem", fontFamily: "'DM Serif Display',serif", fontStyle: "italic" }}>{meta.sublabel}</div>
            </button>
          ))}
        </div>
        <button className="big-btn" onClick={createGame}>CREATE &amp; GET INVITE LINK</button>
        <button onClick={() => setScreen("lobby")} style={{ marginTop: "1rem", width: "100%", background: "transparent", border: "none", color: TEXT_LO, cursor: "pointer", fontFamily: "'DM Serif Display',serif", fontStyle: "italic" }}>
          Back to lobby
        </button>
      </div>
    </div>
  );

  // ── JOIN GAME ────────────────────────────────────────────────────────────────
  if (screen === "join") return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.5rem", letterSpacing: "4px", color: TEXT_HI, marginBottom: "0.4rem" }}>JOIN GAME</div>
        <div style={{ color: TEXT_LO, fontFamily: "'DM Serif Display',serif", fontStyle: "italic", marginBottom: "2rem" }}>Enter the invite code your opponent shared</div>
        <input className="ni" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
          placeholder="6-DIGIT CODE"
          style={{ marginBottom: "1rem", fontSize: "1.5rem", letterSpacing: "4px", textAlign: "center", fontFamily: "'Bebas Neue',cursive" }} />
        {joinError && <div style={{ color: "#FC5C65", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>{joinError}</div>}
        <button className="big-btn" onClick={joinGame}>JOIN GAME</button>
        <button onClick={() => { setScreen("lobby"); setJoinCode(""); setJoinError(""); window.history.replaceState({}, "", window.location.pathname); }}
          style={{ marginTop: "1rem", width: "100%", background: "transparent", border: "none", color: TEXT_LO, cursor: "pointer", fontFamily: "'DM Serif Display',serif", fontStyle: "italic" }}>
          Back to lobby
        </button>
      </div>
    </div>
  );

  // ── GAME ─────────────────────────────────────────────────────────────────────
  if (!game) return null;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT_HI, display: "flex", flexDirection: "column" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── Header ── */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}`, padding: "0.75rem 1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => { setScreen("lobby"); loadMyGames(); }}
          style={{ background: "transparent", border: "none", color: TEXT_LO, cursor: "pointer", fontFamily: "'Bebas Neue',cursive", fontSize: "0.9rem", letterSpacing: "1px" }}>
          ← LOBBY
        </button>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.3rem", letterSpacing: "2px" }}>
          TIC TAC <span style={{ color: "#FF6B35" }}>SHOW</span>
        </div>
        {diffMeta && (
          <div style={{ background: `${diffColor}22`, border: `1px solid ${diffColor}44`, borderRadius: 20, padding: "0.2rem 0.7rem", fontSize: "0.65rem", color: diffColor, fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px" }}>
            {diffMeta.label}
          </div>
        )}
      </div>

      {/* ── Waiting for P2 ── */}
      {game.phase === "waiting" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2rem", letterSpacing: "3px", marginBottom: "1rem", animation: "blink 2s ease infinite" }}>WAITING FOR OPPONENT</div>
          <div style={{ color: TEXT_LO, fontFamily: "'DM Serif Display',serif", fontStyle: "italic", marginBottom: "2rem" }}>Share this link with your opponent:</div>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1rem 1.5rem", fontFamily: "'Roboto Mono',monospace", fontSize: "0.85rem", color: TEXT_MID, marginBottom: "1rem", wordBreak: "break-all", maxWidth: 480, textAlign: "center" }}>
            {inviteLink}
          </div>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button className="sb" style={{ background: diffColor }} onClick={() => { navigator.clipboard.writeText(inviteLink); setCopyMsg("Copied!"); setTimeout(() => setCopyMsg(""), 2000); }}>
              {copyMsg || "COPY LINK"}
            </button>
            <button className="sb" style={{ background: SURFACE2, color: TEXT_HI }} onClick={() => { navigator.clipboard.writeText(game.invite_code); setCopyMsg("Code copied!"); setTimeout(() => setCopyMsg(""), 2000); }}>
              CODE: {game.invite_code}
            </button>
          </div>
          <div style={{ marginTop: "1.5rem", color: TEXT_LO, fontSize: "0.8rem", fontStyle: "italic" }}>Page updates automatically when they join</div>
        </div>
      )}

      {/* ── Active game ── */}
      {game.phase !== "waiting" && (
        <div style={{ flex: 1, padding: "1rem", maxWidth: 720, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "0.9rem" }}>

          {/* Score bar */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["p1", "p2"].map(p => {
              const name    = p === "p1" ? game.player1_name : game.player2_name;
              const isMe    = myRole === p;
              const picking = game.phase === "choosing" && game.choosing_player === p;
              const col     = P_COLORS[p];
              return (
                <div key={p} style={{ flex: 1, background: SURFACE, border: `2px solid ${picking ? col : BORDER}`, borderRadius: 12, padding: "0.7rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem", transition: "all 0.3s" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontFamily: "'Bebas Neue',cursive", color: "#000", flexShrink: 0 }}>
                    {p === "p1" ? "X" : "O"}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}{isMe ? " (you)" : ""}</div>
                    <div style={{ fontSize: "0.62rem", color: TEXT_LO, fontFamily: "'Roboto Mono',monospace" }}>{(game.scores ?? {})[p] ?? 0} sq</div>
                  </div>
                  {picking && <div style={{ marginLeft: "auto", fontSize: "0.6rem", color: col, fontFamily: "'Roboto Mono',monospace", letterSpacing: "1px", flexShrink: 0 }}>PICKING</div>}
                </div>
              );
            })}
          </div>

          {/* Status line */}
          <div style={{ textAlign: "center", color: TEXT_LO, fontSize: "0.8rem", fontStyle: "italic", minHeight: "1.2rem" }}>
            {game.phase === "choosing" && (isMyPickTurn ? "Your turn — tap a square" : `Waiting for ${game.choosing_player === "p1" ? game.player1_name : game.player2_name} to pick…`)}
            {game.phase === "answering" && !revealData && (submitted ? "Answer locked in — waiting for opponent…" : activeQ ? `Clue: ${activeQ.clue}` : "")}
          </div>

          {/* Board */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {(game.cells ?? []).map((cell, i) => {
              const owner   = board[i];
              const isOwned = owner === "p1" || owner === "p2";
              const isReset = owner === "reset";
              const isActive= game.active_cell === i;
              const inWin   = (game.win_line ?? []).includes(i);
              const canPick = game.phase === "choosing" && isMyPickTurn && !isOwned && !isReset && (owner === "null" || owner === null);
              const q       = ANSWER_POOLS[cell.questionKey];
              let cls = "cell";
              if (isActive) cls += " active-cell";
              if (inWin)    cls += " win-cell";
              if (canPick)  cls += " pickable";

              return (
                <div key={i} className={cls}
                  style={{
                    borderColor: isOwned ? `${P_COLORS[owner]}55` : isActive ? diffColor : BORDER,
                    background:  isOwned ? `${P_COLORS[owner]}18` : SURFACE,
                  }}
                  onClick={() => canPick && selectCell(i)}>
                  {isOwned ? (
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.6rem", color: P_COLORS[owner], lineHeight: 1 }}>
                      {owner === "p1" ? "X" : "O"}
                    </div>
                  ) : isReset ? (
                    <div style={{ fontSize: "1.6rem", opacity: 0.45 }}>↺</div>
                  ) : (
                    <div style={{ fontSize: "0.68rem", color: isActive ? TEXT_HI : TEXT_MID, lineHeight: 1.55, fontFamily: "'Roboto Mono',monospace", fontWeight: 500 }}>
                      {q && <div style={{ fontSize: "0.54rem", color: isActive ? diffColor : TEXT_LO, marginBottom: "0.3rem", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase" }}>{q.sport}</div>}
                      {q ? (q.clue.length > 65 ? q.clue.slice(0, 63) + "…" : q.clue) : ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answer panel */}
          {game.phase === "answering" && activeQ && !revealData && (
            <div style={{ background: SURFACE, border: `1px solid ${diffColor}44`, borderRadius: 16, padding: "1.2rem", animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontSize: "0.62rem", color: diffColor, letterSpacing: "1px", marginBottom: "0.5rem", fontFamily: "'Roboto Mono',monospace" }}>{activeQ.sport} CLUE</div>
              <div style={{ fontSize: "1rem", color: TEXT_HI, lineHeight: 1.65, marginBottom: "0.9rem", fontFamily: "'DM Serif Display',serif" }}>{activeQ.clue}</div>
              {!submitted ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <AutocompleteInput
                    value={myAnswer}
                    disabled={submitted}
                    diffColor={diffColor}
                    placeholder="Type a name…"
                    onChange={v => setMyAnswer(v)}
                    onSelect={v => setMyAnswer(v)}
                    onSubmit={submitAnswer}
                  />
                  <button className="sb" style={{ background: diffColor }} onClick={submitAnswer} disabled={!myAnswer.trim()}>
                    LOCK IN
                  </button>
                </div>
              ) : (
                <div style={{ background: SURFACE2, border: `1px solid ${P_COLORS[myRole]}`, borderRadius: 10, padding: "0.9rem 1.2rem", color: P_COLORS[myRole], fontFamily: "'Roboto Mono',monospace", fontSize: "0.85rem", textAlign: "center" }}>
                  ✓ Answer locked — waiting for opponent…
                </div>
              )}
            </div>
          )}

          {/* Reveal panel */}
          {revealData && (
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.5rem", animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontFamily: "'Bebas Neue',cursive", letterSpacing: "4px", fontSize: "0.85rem", color: TEXT_LO, textAlign: "center", marginBottom: "1.2rem" }}>
                ANSWERS REVEALED
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.2rem" }}>
                {["p1", "p2"].map((p, i) => {
                  const show   = revealStep > i;
                  const name   = p === "p1" ? game.player1_name : game.player2_name;
                  const answer = p === "p1" ? revealData.move.p1_answer : revealData.move.p2_answer;
                  const valid  = p === "p1" ? revealData.move.p1_valid  : revealData.move.p2_valid;
                  const rarity = p === "p1" ? revealData.move.p1_rarity : revealData.move.p2_rarity;
                  const won    = revealData.result === p;
                  return (
                    <div key={p} style={{
                      background:   show ? (won ? `${P_COLORS[p]}15` : SURFACE2) : SURFACE,
                      border:       `1px solid ${show ? (won ? P_COLORS[p] : BORDER) : "transparent"}`,
                      borderRadius: 12, padding: "1rem",
                      transition:   "all 0.5s",
                      opacity:      show ? 1 : 0.15,
                    }}>
                      <div style={{ fontSize: "0.62rem", color: TEXT_LO, marginBottom: "0.4rem", letterSpacing: "1px", fontFamily: "'Roboto Mono',monospace", textTransform: "uppercase" }}>
                        {name}{won ? " 🏆" : ""}
                      </div>
                      {show ? (
                        <>
                          <div style={{ fontSize: "0.95rem", color: valid ? TEXT_HI : "#FC5C65", fontWeight: 700, marginBottom: valid && rarity != null ? "0.6rem" : 0, fontFamily: "'DM Serif Display',serif" }}>
                            {answer}{!valid && " ✗"}
                          </div>
                          {valid && rarity != null && <RarityBar score={rarity} />}
                          {!valid && <div style={{ fontSize: "0.7rem", color: "#FC5C65", fontFamily: "'Roboto Mono',monospace", marginTop: "0.3rem" }}>not a valid answer</div>}
                        </>
                      ) : (
                        <div style={{ color: BORDER, fontSize: "2rem", textAlign: "center", padding: "0.5rem 0" }}>?</div>
                      )}
                    </div>
                  );
                })}
              </div>
              {revealStep >= 3 && (
                <div style={{ textAlign: "center", fontFamily: "'Bebas Neue',cursive", fontSize: "1.4rem", letterSpacing: "3px", color: revealData.result === "reset" ? TEXT_LO : P_COLORS[revealData.result], animation: "fadeIn 0.4s ease" }}>
                  {revealData.result === "reset" ? "TIE — SQUARE REPLAYED" : `${revealData.winnerName} WINS THE SQUARE`}
                </div>
              )}
            </div>
          )}

          {/* Game over */}
          {game.phase === "gameover" && !revealData && (
            <div style={{ background: SURFACE, border: `2px solid ${diffColor}`, borderRadius: 20, padding: "2rem", textAlign: "center", animation: "fadeIn 0.4s ease" }}>
              <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.4rem", letterSpacing: "4px", marginBottom: "0.4rem" }}>
                {game.winner === "draw"    ? "IT'S A DRAW" :
                 game.winner === myRole   ? "YOU WIN! 🏆" :
                 `${game.winner === "p1" ? game.player1_name : game.player2_name} WINS!`}
              </div>
              <div style={{ color: TEXT_MID, fontFamily: "'DM Serif Display',serif", fontStyle: "italic", marginBottom: "1.5rem" }}>
                {game.player1_name} {(game.scores ?? {}).p1 ?? 0} – {(game.scores ?? {}).p2 ?? 0} {game.player2_name}
              </div>
              <button className="big-btn" onClick={() => { setScreen("lobby"); loadMyGames(); }}>BACK TO LOBBY</button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
