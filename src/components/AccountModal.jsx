import { useState } from "react";
import Modal from "./Modal.jsx";
import { SURF2, BORDER, HI, MID, LO } from "../theme.js";
import { track } from "../lib/analytics.js";

const RED = "#FC5C65";
const label = { color: LO, fontSize: "0.7rem", letterSpacing: "1.5px", fontFamily: "'Roboto Mono',monospace" };

/**
 * Account details + self-service deletion (matches the Privacy Policy's "Deleting your account").
 * `deleteAccount()` resolves to { ok, error? }; `onDeleted()` signs out and returns to the start screen.
 */
export default function AccountModal({ user, onClose, deleteAccount, onDeleted }) {
  const [confirmText, setConfirmText] = useState("");
  const [status, setStatus] = useState("idle"); // idle | deleting | deleted
  const [error, setError] = useState("");
  const armed = confirmText.trim().toUpperCase() === "DELETE";

  async function doDelete() {
    if (!armed) return;
    setStatus("deleting"); setError("");
    const r = await deleteAccount();
    if (r.ok) { track("account_deleted"); setStatus("deleted"); }
    else { setStatus("idle"); setError(r.error || "Couldn't delete your account. Please try again."); }
  }

  if (status === "deleted") return (
    <Modal title="ACCOUNT DELETED" onClose={onDeleted}>
      <p style={{ color: MID, lineHeight: 1.6, marginTop: 0 }}>
        Your account has been deleted. Thanks for playing Tic Tac Show.
      </p>
      <button className="big-btn" onClick={onDeleted}>OK</button>
    </Modal>
  );

  return (
    <Modal title="YOUR ACCOUNT" onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5rem 1rem", alignItems: "baseline", marginBottom: "1.5rem" }}>
        <span style={label}>USERNAME</span><span style={{ color: HI, overflowWrap: "anywhere" }}>{user.username}</span>
        <span style={label}>EMAIL</span><span style={{ color: HI, overflowWrap: "anywhere" }}>{user.email}</span>
      </div>

      <div style={{ background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1rem 1.1rem" }}>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.2rem", letterSpacing: "2px", color: RED, marginBottom: "0.5rem" }}>DELETE ACCOUNT</div>
        <ul style={{ color: MID, fontSize: "0.9rem", lineHeight: 1.55, paddingLeft: "1.1rem", margin: "0 0 0.75rem" }}>
          <li>Your login (email, password and username) is deleted right away and can&apos;t be recovered.</li>
          <li>Invite games nobody has joined yet are deleted.</li>
          <li>Finished games stay for your opponents, with your name shown as &ldquo;Deleted player&rdquo;. Unfinished games end, and your opponent wins.</li>
          <li>Your answers, reports and feedback stay, but are no longer linked to your account (answer counts power the rarity percentages).</li>
        </ul>
        <label style={{ ...label, display: "block", marginBottom: "0.4rem" }} htmlFor="del-confirm">TYPE DELETE TO CONFIRM</label>
        <input id="del-confirm" className="ni" value={confirmText} onChange={e => setConfirmText(e.target.value)}
          autoComplete="off" placeholder="DELETE" />
        {error && <div style={{ color: RED, fontSize: "0.9rem", marginTop: "0.75rem" }}>{error}</div>}
        <button onClick={doDelete} disabled={!armed || status === "deleting"}
          style={{
            marginTop: "0.9rem", width: "100%", padding: "0.8rem", borderRadius: 10, border: "none",
            background: armed ? RED : `${RED}44`, color: "#fff", cursor: armed ? "pointer" : "not-allowed",
            fontFamily: "'Bebas Neue',cursive", fontSize: "1.1rem", letterSpacing: "2px",
          }}>
          {status === "deleting" ? <span className="spinner" /> : "DELETE MY ACCOUNT"}
        </button>
      </div>
      <p style={{ color: LO, fontSize: "0.8rem", lineHeight: 1.5, marginBottom: 0 }}>
        Details in the <a href="/privacy" target="_blank" rel="noreferrer" style={{ color: LO }}>Privacy Policy</a>.
      </p>
    </Modal>
  );
}
