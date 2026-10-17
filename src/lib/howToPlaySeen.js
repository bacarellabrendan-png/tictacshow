// Remembers (per browser) that How to Play was shown, so it auto-opens only on the first visit.
const SEEN_KEY = "tts_seen_how_to_play";

/** True until this browser has seen How to Play once (storage can be blocked: then never auto-open). */
export function shouldAutoOpenHowToPlay() {
  try { return !localStorage.getItem(SEEN_KEY); } catch { return false; }
}

export function markHowToPlaySeen() {
  try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* private mode */ }
}
