import { LO } from "../theme.js";

const link = { background: "none", border: "none", color: LO, cursor: "pointer", font: "inherit", padding: "0.25rem 0", textDecoration: "none" };

/** Small footer: How to Play · Feedback · Privacy · Terms. */
export default function SiteFooter({ onHowToPlay, onFeedback }) {
  return (
    <footer style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem 1.25rem", padding: "2rem 1rem 1.5rem", fontFamily: "'Roboto Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.5px" }}>
      <button style={link} onClick={onHowToPlay}>How to Play</button>
      <button style={link} onClick={onFeedback}>Feedback</button>
      <a style={link} href="/privacy">Privacy</a>
      <a style={link} href="/terms">Terms</a>
    </footer>
  );
}
