# Quantum4Colorado

A nonpartisan civic information platform that answers one question for three audiences:
**"What does quantum computing mean for me, my organization, and my state?"**

Built for the **2026 Congressional App Challenge**, Colorado's 6th Congressional District (Rep. Jason Crow).

The app has three layers:

1. **Colorado's Quantum Story** — a plain-language, visual overview of Colorado's quantum ecosystem (NIST Boulder, JILA, Quantinuum, and more) and why the state's lead matters.
2. **PQC Readiness Tool** — an 8-question assessment that gives any organization a post-quantum-cryptography risk score, specific risk factors, a prioritized action list, and a downloadable report.
3. **For Representatives** — ecosystem data, an investment-gap analysis, policy recommendations, and engagement tools formatted for legislative use.

## The app itself

The entire application lives in a single component file: **`Quantum4Colorado.jsx`** (at the repo root). It uses only React, [lucide-react](https://lucide.dev) (icons), and [recharts](https://recharts.org) (one chart), styled entirely with Tailwind CSS utility classes. Everything around it in this folder is just the minimal Vite + Tailwind harness needed to run it.

## Running locally

You need [Node.js](https://nodejs.org) 18+ installed (the `node` and `npm` commands available on your PATH).

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Vite will print a local URL (typically http://localhost:5173). Open it in a browser.

To build a production bundle:

```bash
npm run build
npm run preview
```

## Generating the readiness report (Is PDF)

In the **Is Your Org Ready?** section, complete the assessment and click **Download my organization's report (PDF)**. This triggers the browser's print dialog showing only the formatted report — choose **Save as PDF** as the destination.

## Project structure

```
Quantum4Colorado.jsx   ← the entire app (the submission artifact)
index.html             ← Vite entry HTML
src/
  main.jsx             ← mounts <App /> from Quantum4Colorado.jsx
  index.css            ← Tailwind directives
vite.config.js
tailwind.config.js
postcss.config.js
package.json
```

## Anonymous usage stats (Phase 5)

Completing the PQC Readiness Tool fires a fire-and-forget POST to `/api/track-assessment`, which increments a few Redis counters (total completions, plus breakdowns by organization type and risk tier — no PII, no per-response data). `/api/stats` returns the aggregate as JSON. Both live in `/api` as Vercel serverless functions and use [`@upstash/redis`](https://github.com/upstash/redis-js) (Vercel KV was deprecated and migrated to Upstash Redis under Vercel's Marketplace integrations).

To make this work on a deployed project:

1. In the Vercel dashboard, open the project → **Storage** → **Create Database** → **Redis** (Upstash), or add it from the [Marketplace](https://vercel.com/marketplace?category=storage&search=redis").
2. Connect it to this project. Vercel auto-injects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` as environment variables — no manual config needed.
3. Redeploy.

For local testing of the API routes specifically (not needed for normal frontend dev — `npm run dev` doesn't run `/api`), use the [Vercel CLI](https://vercel.com/docs/cli): `vercel env pull .env.local` after step 2, then `vercel dev` instead of `npm run dev`.

If the Redis integration isn't set up yet, the tracking call fails silently and the assessment tool works exactly the same — this is purely supplementary telemetry, never a dependency for the core app.

## Data & sources

All data is hardcoded from public sources (NIST, CISA, NSA, CU Boulder / JILA public records, Colorado OEDIT, the Colorado Quantum Network, and public company information). Statistics are approximate and reflect the most recent publicly available reporting. Quantum-threat timelines are inherently uncertain; the app frames preparation as prudent rather than predicting a specific date.

*A nonpartisan civic resource. Not a substitute for professional cybersecurity advice.*
