// Google Analytics 4 (gtag is loaded in index.html with send_page_view off; screens are sent from here).
// Every call is a no-op when gtag is blocked or missing.

/** Send one GA4 event. */
export function track(name, params = {}) {
  try { window.gtag?.("event", name, params); } catch { /* analytics must never break the game */ }
}

/** Send a page_view for an in-app screen as a virtual path (/lobby, /game, /privacy, ...). The query string is kept,
 *  so campaign tags (utm_*, gclid) on the landing URL still reach GA. */
export function trackScreen(screen) {
  const path = "/" + screen;
  const q = new URLSearchParams(window.location.search);
  for (const k of ["join", "code", "error", "error_code", "error_description"]) q.delete(k); // invite and reset codes stay out of GA
  const search = q.toString() ? "?" + q.toString() : "";
  track("page_view", {
    page_title: screen.charAt(0).toUpperCase() + screen.slice(1),
    page_location: window.location.origin + path + search,
    page_path: path,
  });
}
