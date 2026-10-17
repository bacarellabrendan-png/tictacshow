/* global process */
// Second Supabase keep-alive (the first is .github/workflows/supabase-keep-alive.yml, every 3 days).
// Vercel Cron calls this once a day on the production deployment (vercel.json "crons"); it reads one row with the
// public anon key, which counts as project activity. Independent of GitHub, so GitHub's 60-day inactivity rule
// for scheduled workflows can't stop it. Permanent: the project stays on the Supabase free plan.
export default async function handler(req, res) {
  // When CRON_SECRET is set in Vercel, only Vercel Cron (which sends it as a Bearer token) may call this.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ ok: false });
  const url = process.env.VITE_SUPABASE_URL, key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ ok: false, error: "Supabase env vars missing" });
  try {
    const r = await fetch(`${url}/rest/v1/players?select=id&limit=1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    const body = await r.text();
    if (r.ok && body.includes('"id"')) return res.status(200).json({ ok: true, at: new Date().toISOString() });
    return res.status(502).json({ ok: false, status: r.status });
  } catch (e) {
    return res.status(502).json({ ok: false, error: String(e).slice(0, 200) });
  }
}
