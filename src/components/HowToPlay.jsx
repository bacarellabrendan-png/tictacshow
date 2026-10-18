import Modal from "./Modal.jsx";
import { SURF2, BORDER, HI, MID, LO, ACCENT, ACCENT2 } from "../theme.js";
import { markHowToPlaySeen as markSeen } from "../lib/howToPlaySeen.js";

const h = { fontFamily: "'Bebas Neue',cursive", fontSize: "1.15rem", letterSpacing: "2px", color: ACCENT, margin: "1.25rem 0 0.4rem" };
const p = { color: MID, fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 0.5rem" };
const li = { color: MID, fontSize: "0.95rem", lineHeight: 1.55, marginBottom: "0.35rem" };
const b = { color: HI, fontWeight: 600 };

function Example({ square, answer, why }) {
  return (
    <div style={{ background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0.7rem 0.9rem", marginBottom: "0.5rem" }}>
      <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.72rem", letterSpacing: "1.5px", color: LO, textTransform: "uppercase" }}>{square}</div>
      <div style={{ color: HI, fontWeight: 600, margin: "0.15rem 0" }}>{answer}</div>
      <div style={{ color: MID, fontSize: "0.88rem", lineHeight: 1.5 }}>{why}</div>
    </div>
  );
}

export default function HowToPlay({ onClose, onFeedback }) {
  const close = () => { markSeen(); onClose(); };
  return (
    <Modal title="HOW TO PLAY" onClose={close}>
      <p style={p}>Tic-tac-toe, but every square is a sports trivia question. Get three in a row to win.</p>

      <div style={h}>THE BOARD</div>
      <p style={p}>
        Each row and each column has a category: a team, an award, a championship or a career milestone.
        A square asks for <span style={b}>a player who fits both its row and its column</span>.
      </p>

      <div style={h}>BOTH CONDITIONS, ONE CAREER</div>
      <p style={p}>
        Both categories have to be true of the player&apos;s career, <span style={b}>but not at the same time
        and not with the same team</span>. A title won anywhere counts with any team the player played for.
      </p>
      <Example square="Yankees + Red Sox" answer="Johnny Damon ✓" why="He played for both teams during his career." />
      <Example square="Lakers + NBA Champion" answer="Dennis Rodman ✓"
        why="He played for the Lakers in 1999 and won his titles with the Pistons and Bulls. That still counts." />

      <div style={h}>EACH TURN</div>
      <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
        <li style={li}>Players take turns picking a square.</li>
        <li style={li}>Then <span style={b}>both</span> players answer that square, without seeing each other&apos;s answer.
          Pick your player from the suggestions; namesakes are told apart by years and position.</li>
        <li style={li}>The answers are revealed and the square is decided.</li>
      </ol>

      <div style={h}>WHO TAKES THE SQUARE</div>
      <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
        <li style={li}><span style={b}>Only one correct answer:</span> that player takes it.</li>
        <li style={li}><span style={b}>Both correct:</span> the <span style={{ color: ACCENT2, fontWeight: 600 }}>rarer</span> answer wins.
          Each answer shows a % for how often players give it on that square, so the <span style={b}>lower %</span> wins. New squares start from our <span style={b}>estimate</span>; once enough real answers come in (each player counts once per square), the % is <span style={b}>based on those answers</span>.
          An exact tie is a coin flip.</li>
        <li style={li}><span style={b}>Same player:</span> you both answer that square again.</li>
        <li style={li}><span style={b}>Neither correct:</span> the square stays open.</li>
      </ul>

      <div style={h}>WINNING</div>
      <p style={p}>Three squares in a row, column or diagonal wins. A full board with no line is a draw.</p>
      <p style={{ ...p, marginTop: "1rem", color: LO, fontSize: "0.85rem" }}>
        Think a ruling was wrong? Use &ldquo;Report a wrong ruling&rdquo; on the answer reveal.
        {onFeedback && <> Other ideas or problems? <button onClick={() => { markSeen(); onFeedback(); }}
          style={{ background: "none", border: "none", color: ACCENT, cursor: "pointer", padding: 0, font: "inherit", textDecoration: "underline" }}>Send feedback</button>.</>}
      </p>

      <button className="big-btn" onClick={close} style={{ marginTop: "1rem" }}>GOT IT</button>
    </Modal>
  );
}
