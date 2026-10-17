import { useEffect } from "react";
import { SURF, BORDER, HI, LO } from "../theme.js";

/** Centered dialog over a dimmed backdrop. Closes on Escape, the × button, or a click outside the panel. */
export default function Modal({ title, onClose, children, maxWidth = 560 }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,10,22,0.78)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "max(1rem, 4vh) 1rem", overflowY: "auto",
      }}>
      <div onClick={e => e.stopPropagation()}
        style={{
          background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, width: "100%", maxWidth,
          padding: "1.5rem 1.5rem 1.75rem", color: HI, animation: "fadeUp 0.3s ease", position: "relative",
        }}>
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", color: LO, fontSize: "1.6rem", cursor: "pointer", lineHeight: 1, padding: "0.25rem 0.5rem" }}>
          ×
        </button>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.8rem", letterSpacing: "3px", marginBottom: "1rem", paddingRight: "2rem" }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
