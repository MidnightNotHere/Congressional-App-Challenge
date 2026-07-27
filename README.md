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

## Data & sources

All data is hardcoded from public sources (NIST, CISA, NSA, CU Boulder / JILA public records, Colorado OEDIT, the Colorado Quantum Network, and public company information). Statistics are approximate and reflect the most recent publicly available reporting. Quantum-threat timelines are inherently uncertain; the app frames preparation as prudent rather than predicting a specific date.

*A nonpartisan civic resource. Not a substitute for professional cybersecurity advice.*
