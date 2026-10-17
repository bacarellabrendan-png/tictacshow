import { useEffect } from "react";
import { BG, SURF, BORDER, HI, MID, LO, ACCENT } from "../theme.js";

// ─── OWNER DETAILS (filled in by the owner, 17 Oct 2026) ───────────────────────
// These pages started from a template, not legal advice: have them checked before a public launch.
export const BUSINESS_NAME = "Tic Tac Show";
export const CONTACT_EMAIL = "bacarellabrendan@gmail.com";
export const JURISDICTION  = "the State of New Jersey, United States";
export const LAST_UPDATED  = "October 17, 2026";

const SITE = "Tic Tac Show (playtictacshow.com)";

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.45rem", letterSpacing: "2px", color: ACCENT, margin: "2rem 0 0.5rem", fontWeight: 400 }}>{children}</h2>
);
const P = ({ children }) => <p style={{ margin: "0 0 0.8rem" }}>{children}</p>;
const UL = ({ children }) => <ul style={{ margin: "0 0 0.8rem", paddingLeft: "1.25rem" }}>{children}</ul>;
const LI = ({ children }) => <li style={{ marginBottom: "0.4rem" }}>{children}</li>;
const B = ({ children }) => <strong style={{ color: HI, fontWeight: 600 }}>{children}</strong>;
const Email = () => <span style={{ color: HI, userSelect: "all" }}>{CONTACT_EMAIL}</span>;

function Privacy() {
  return (<>
    <P>This policy explains what {BUSINESS_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use {SITE}, why, and the choices you have.</P>

    <H2>What we collect</H2>
    <UL>
      <LI><B>Account details:</B> your email address, username and password. Passwords are stored only in hashed form by our authentication provider; we never see them.</LI>
      <LI><B>Gameplay:</B> the games you create or join (board, opponent, scores, results, timestamps) and the answers you submit, including wrong ones. <B>Game records are public:</B> anyone using the game&apos;s public interface can read games and their moves, including the players&apos; usernames, answers and results. Your email address is never part of a game record. Don&apos;t put anything private in your username.</LI>
      <LI><B>Wrong-ruling reports:</B> the square and answer you report, your note, and your account and username.</LI>
      <LI><B>Feedback:</B> your message, the optional email you give for a reply, the screen you were on and your browser type, and your account and username if you are signed in.</LI>
      <LI><B>Analytics:</B> we use Google Analytics to understand how the game is used: screens viewed, game events (for example game started, game finished, How to Play opened, feedback sent, sign-up), device and browser type, and approximate location derived from your IP address. Google Analytics uses cookies or similar identifiers for this.</LI>
      <LI><B>Technical logs:</B> our hosting and database providers process IP addresses and request logs to run and secure the service.</LI>
      <LI><B>On your device:</B> the game stores your sign-in session and a few preferences (such as whether you&apos;ve seen How to Play) in your browser&apos;s local storage.</LI>
    </UL>
    <P>We don&apos;t sell your personal information, and the game shows no advertising.</P>

    <H2>How we use it</H2>
    <UL>
      <LI>To run the game: accounts, matchmaking by invite, judging answers and keeping score.</LI>
      <LI>To calculate rarity: how often each answer is given on each square. These counts are used in anonymous, aggregate form.</LI>
      <LI>To fix mistakes in our answer data, improve the game and respond to your feedback.</LI>
      <LI>To keep the service secure and prevent abuse.</LI>
    </UL>

    <H2>Who we share it with</H2>
    <P>Only with service providers that run the game for us, under their own privacy and security terms:</P>
    <UL>
      <LI><B>Supabase</B> (database and sign-in),</LI>
      <LI><B>Vercel</B> (website hosting),</LI>
      <LI><B>Google</B> (Google Analytics, and Google Fonts, which serves the game&apos;s typefaces and so receives your IP address when the page loads).</LI>
    </UL>
    <P>We may also disclose information if the law requires it, or to a successor if the service is transferred. These providers may process data in the United States and other countries.</P>

    <H2>Deleting your account</H2>
    <P>You can delete your account at any time in the game: open <B>Account</B> in the lobby and choose <B>Delete my account</B>. When you do:</P>
    <UL>
      <LI>your login (email, password and username) is deleted immediately;</LI>
      <LI>invite games nobody has joined yet are deleted;</LI>
      <LI>finished games remain for your opponents, with your name replaced by &ldquo;Deleted player&rdquo;; unfinished games end, and your opponent is recorded as the winner;</LI>
      <LI>your submitted answers, reports and feedback remain, but are no longer linked to your account (answer counts power the rarity percentages). Anything you wrote in a note or message yourself stays as written.</LI>
    </UL>
    <P>Deleted data can remain in our providers&apos; routine backups for a limited time before it is overwritten. You can also email <Email /> to ask for a copy of your data, a correction or deletion.</P>

    <H2>How long we keep it</H2>
    <P>Account and game data are kept while your account exists. Submitted answers are kept to calculate rarity; after an account is deleted they are no longer linked to it. Feedback and reports are kept as long as they are useful for improving the game. Google Analytics data is kept according to our Google Analytics retention setting.</P>

    <H2>Your choices</H2>
    <UL>
      <LI>Delete your account in the game (above).</LI>
      <LI>Opt out of Google Analytics with your browser&apos;s tracking protection, an ad or tracker blocker, or Google&apos;s opt-out add-on (tools.google.com/dlpage/gaoptout).</LI>
      <LI>Depending on where you live, you may have the right to access, correct, delete or export your data, or to object to some processing. Contact us at <Email /> and we&apos;ll respond within the time the law requires.</LI>
    </UL>

    <H2>Children</H2>
    <P>The game is not directed to children under 13, and we don&apos;t knowingly collect personal information from them. If you believe a child under 13 has created an account, contact us and we will delete it.</P>

    <H2>Changes</H2>
    <P>If we change this policy, we&apos;ll update the date at the top, and for significant changes we&apos;ll let players know in the game.</P>

    <H2>Contact</H2>
    <P>{BUSINESS_NAME}, <Email /></P>
  </>);
}

function Terms() {
  return (<>
    <P>These terms are an agreement between you and {BUSINESS_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) for using {SITE}. By creating an account or playing, you agree to them. If you don&apos;t agree, please don&apos;t use the game.</P>

    <H2>1. Who can play</H2>
    <P>You must be at least 13 years old. If you are under the age of majority where you live, you need a parent or guardian&apos;s permission.</P>

    <H2>2. Your account</H2>
    <UL>
      <LI>Give a valid email address and keep your password secret. You are responsible for activity on your account.</LI>
      <LI>Usernames are visible to other players. Don&apos;t choose one that impersonates someone, or that is offensive or misleading. We may change or remove usernames that break these terms.</LI>
      <LI>You can delete your account at any time, as described in the <a href="/privacy" style={{ color: ACCENT }}>Privacy Policy</a>.</LI>
    </UL>

    <H2>3. Fair play</H2>
    <P>Don&apos;t use bots or automated tools to play, scrape or overload the game; don&apos;t exploit bugs or try to access accounts or data that aren&apos;t yours; and don&apos;t harass other players. Please report bugs instead of using them.</P>

    <H2>4. Game content and rulings</H2>
    <P>Player, team and award information is compiled from public sources and may contain mistakes. Answer rulings and rarity percentages are decided automatically and are final for the game in progress. If you think a ruling was wrong, use &ldquo;Report a wrong ruling&rdquo;; we review reports and fix the data, but we can&apos;t change past results.</P>

    <H2>5. No affiliation</H2>
    <P>Tic Tac Show is an independent trivia game. It is not affiliated with, endorsed by or sponsored by the NBA, NFL, MLB, NHL, any soccer league or club, or any player. Team, league and player names and other trademarks belong to their owners and are used only to identify the subjects of trivia questions.</P>

    <H2>6. Our content and your feedback</H2>
    <P>The game, its design, software and compiled data belong to us or our licensors. You may use the game for personal, non-commercial play. If you send feedback or suggestions, you allow us to use them without obligation to you.</P>

    <H2>7. Changes and availability</H2>
    <P>The game is provided free of charge and is in testing. We may change, suspend or end any part of it at any time, and we may suspend or close accounts that break these terms.</P>

    <H2>8. Disclaimers</H2>
    <P>The game is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy and uninterrupted availability, to the extent the law allows.</P>

    <H2>9. Limitation of liability</H2>
    <P>To the extent the law allows, we are not liable for indirect, incidental, special or consequential damages, or for lost data or profits, arising from your use of the game. Our total liability for any claim is limited to the amount you paid us to use the game in the 12 months before the claim (the game is free, so this is zero). Some places don&apos;t allow these limits, so they may not apply to you.</P>

    <H2>10. Governing law</H2>
    <P>These terms are governed by the laws of {JURISDICTION}, without regard to conflict-of-law rules, except where the law of your place of residence requires otherwise.</P>

    <H2>11. Changes to these terms</H2>
    <P>We may update these terms. We&apos;ll change the date at the top, and for significant changes we&apos;ll let players know in the game. Continuing to play after a change means you accept the updated terms.</P>

    <H2>12. Contact</H2>
    <P>{BUSINESS_NAME}, <Email /></P>
  </>);
}

/** /privacy and /terms: full pages, readable without signing in. */
export default function LegalPage({ kind }) {
  const title = kind === "terms" ? "Terms of Service" : "Privacy Policy";
  useEffect(() => { document.title = `${title} | Tic Tac Show`; }, [title]);
  return (
    <div style={{ minHeight: "100vh", background: BG, color: MID, padding: "0 1rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.25rem 0 3rem" }}>
        <a href="/" style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "1.5rem", letterSpacing: "2px", color: HI, textDecoration: "none" }}>
          TIC TAC <span style={{ color: ACCENT }}>SHOW</span>
        </a>
        <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "1.75rem clamp(1rem, 4vw, 2.25rem)", marginTop: "1.25rem", lineHeight: 1.65, fontSize: "0.98rem" }}>
          <h1 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: "2.4rem", letterSpacing: "3px", color: HI, margin: 0, fontWeight: 400 }}>{title}</h1>
          <div style={{ fontFamily: "'Roboto Mono',monospace", fontSize: "0.75rem", color: LO, letterSpacing: "1px", margin: "0.25rem 0 1.5rem" }}>LAST UPDATED {LAST_UPDATED.toUpperCase()}</div>
          {kind === "terms" ? <Terms /> : <Privacy />}
        </div>
        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", marginTop: "1.5rem", fontFamily: "'Roboto Mono',monospace", fontSize: "0.8rem" }}>
          <a href="/" style={{ color: LO }}>Back to the game</a>
          <a href={kind === "terms" ? "/privacy" : "/terms"} style={{ color: LO }}>{kind === "terms" ? "Privacy Policy" : "Terms of Service"}</a>
        </div>
      </div>
    </div>
  );
}
