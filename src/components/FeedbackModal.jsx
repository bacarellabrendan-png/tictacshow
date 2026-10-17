import { useState } from "react";
import Modal from "./Modal.jsx";
import { MID, LO, ACCENT2 } from "../theme.js";
import { track } from "../lib/analytics.js";

const label = { color: LO, fontSize: "0.7rem", display: "block", marginBottom: "0.4rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" };

/** Feedback form. `send({ message, contact })` resolves to { ok, error? }. Works signed in or not. */
export default function FeedbackModal({ onClose, send, screen }) {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!message.trim()) { setError("Please write a message first."); return; }
    setStatus("sending"); setError("");
    const r = await send({ message: message.trim(), contact: contact.trim() });
    if (r.ok) { setStatus("sent"); track("feedback_sent", { screen }); }
    else { setStatus("idle"); setError(r.error || "Couldn't send. Check your connection and try again."); }
  }

  return (
    <Modal title="SEND FEEDBACK" onClose={onClose}>
      {status === "sent" ? (
        <>
          <div style={{ color: ACCENT2, fontFamily: "'Bebas Neue',cursive", fontSize: "1.3rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>THANKS!</div>
          <p style={{ color: MID, lineHeight: 1.6, marginTop: 0 }}>Your feedback was sent. It really helps while the game is in testing.</p>
          <button className="big-btn" onClick={onClose}>CLOSE</button>
        </>
      ) : (
        <form onSubmit={submit}>
          <p style={{ color: MID, lineHeight: 1.6, margin: "0 0 1rem" }}>
            Bugs, confusing moments, wrong answers, ideas: anything helps.
          </p>
          <label style={label} htmlFor="fb-message">MESSAGE</label>
          <textarea id="fb-message" className="ni" rows={6} maxLength={4000} value={message}
            onChange={e => setMessage(e.target.value)} placeholder="What happened, or what would make it better?"
            style={{ resize: "vertical", minHeight: 120, fontFamily: "inherit", lineHeight: 1.5 }} />
          <label style={{ ...label, marginTop: "1rem" }} htmlFor="fb-contact">EMAIL (OPTIONAL, IF YOU&apos;D LIKE A REPLY)</label>
          <input id="fb-contact" className="ni" type="email" maxLength={320} value={contact}
            onChange={e => setContact(e.target.value)} placeholder="you@email.com" />
          {error && <div style={{ color: "#FC5C65", fontSize: "0.9rem", marginTop: "0.9rem" }}>{error}</div>}
          <button className="big-btn" type="submit" disabled={status === "sending"} style={{ marginTop: "1.25rem" }}>
            {status === "sending" ? <span className="spinner" /> : "SEND"}
          </button>
          <p style={{ color: LO, fontSize: "0.78rem", lineHeight: 1.5, marginBottom: 0 }}>
            We also save which screen you were on and your browser type, to help reproduce problems.
            See the <a href="/privacy" target="_blank" rel="noreferrer" style={{ color: LO }}>Privacy Policy</a>.
          </p>
        </form>
      )}
    </Modal>
  );
}
