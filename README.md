# Quantum4Colorado

A nonpartisan civic information platform that answers one question for three audiences:
**"What does quantum computing mean for me, my organization, and my state?"**

Built for the **2026 Congressional App Challenge**, Colorado's 6th Congressional District (Rep. Jason Crow).

The app has four sections, available on both a web app and a native mobile app, in English and Spanish:

1. **Colorado's Quantum Story** — a plain-language, visual overview of Colorado's quantum ecosystem (NIST Boulder, JILA, Quantinuum, and more) and why the state's lead matters.
2. **PQC Readiness Tool** — an 8-question assessment that gives any organization a post-quantum-cryptography risk score, specific risk factors, a prioritized action list, and a downloadable report — shareable via link or QR code.
3. **For Representatives** — ecosystem data, an investment-gap analysis, policy recommendations, and engagement tools formatted for legislative use.
4. **Youth & Education** — a quantum-careers quiz, learning resources, and Colorado-specific opportunities aimed at students.

Every fact in the app links back to its public source — see **About → Where This Data Comes From** on either platform.

## How the project is organized

```
Quantum4Colorado.jsx   ← the entire web app (the primary submission artifact)
index.html, src/       ← Vite entry point and Tailwind setup for the web app
api/                    ← Vercel serverless functions (anonymous usage stats)
data/                   ← shared content layer — both apps import from here
mobile/                 ← the native Expo/React Native app
```

### The shared `/data` layer

Both apps read from the same seven files in `data/` — `ecosystem.js`, `pqc-scoring.js`, `quiz-data.js`, `policy-recommendations.js`, `careers.js`, `resources.js`, `i18n.js` — so a factual correction or a translation only ever needs to happen in one place. Every user-facing string in these files is bilingual, stored inline as `{ en: "...", es: "..." }` and resolved at render time (see `data/i18n.js`). The mobile app reaches these files through a local `mobile/data` link (recreated automatically by `npm install` — see `mobile/scripts/link-data.js`) since Metro doesn't reliably resolve files outside its project root on every platform.

### The web app

The app itself lives in a single component file, **`Quantum4Colorado.jsx`** (at the repo root), styled entirely with Tailwind CSS. It uses [lucide-react](https://lucide.dev) for icons, [recharts](https://recharts.org) for the one chart, and [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) for the assessment's shareable QR code.

### The mobile app

`mobile/` is a self-contained Expo (React Native) app covering the same four sections as bottom tabs, using `react-navigation`, `react-native-svg`, and `expo-print` (for the readiness report PDF). See `mobile/ON_DEVICE_TESTING.md` for a manual test checklist to run on a real iOS/Android device before submission.

## Running locally

### Web app

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Vite prints a local URL (typically http://localhost:5173).

To build a production bundle:

```bash
npm run build
npm run preview
```

### Mobile App

```bash
cd mobile
npm install
npm run web      # runs in the browser via react-native-web
npm run ios       # or: npm run android (requires Xcode / Android Studio)
```

`npm start` opens Expo's dev tools, from which you can also open the app in Expo Go on a physical device.

## Generating the readiness report (PDF)

**Web:** in **Is Your Org Ready?**, complete the assessment and click **Download my organization's report (PDF)**. This opens the browser's print dialog showing only the formatted report — choose **Save as PDF**.

**Mobile:** the same button generates and shares a PDF via the native share sheet (`expo-print` + `expo-sharing`).

## Sharing assessment results

Once an assessment completes, **Share this assessment** copies a link that reopens to the same result (not just the empty form), and **Show QR code** renders that link as a scannable code — useful for sharing a result across devices without re-answering the questions.

## Anonymous usage stats

Completing the PQC Readiness Tool on the web app fires a fire-and-forget request to `/api/track-assessment`, a Vercel serverless function that increments a few Redis counters (total completions, plus breakdowns by organization type and risk tier — no PII, no per-response data). `/api/stats` returns the aggregate as JSON.

To enable this on a deployed project: in the Vercel dashboard, add a **Redis** database (Upstash) from **Storage** or the [Marketplace](https://vercel.com/marketplace?category=storage&search=redis) and connect it to the project — Vercel auto-injects the required `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` env vars, no manual config needed. Without this set up, the tracking call fails silently and the assessment tool works exactly the same — it's purely supplementary telemetry, never a dependency. For local testing of the API routes specifically, use the [Vercel CLI](https://vercel.com/docs/cli): `vercel env pull .env.local`, then `vercel dev` instead of `npm run dev`.

## Bilingual support

Every section works in English and Spanish now. Toggle with the **EN / ES** control in the web nav or the mobile header; the choice persists (`localStorage` on web, `AsyncStorage` on mobile).

## Data & sources

All data is drawn from public sources (NIST, CISA, NSA, CU Boulder / JILA public records, Colorado OEDIT, the Colorado Quantum Network, and public company information) — see the full citation list in **About → Where This Data Comes From** on either platform. Statistics are approximate and reflect the most recent publicly available reporting. Quantum-threat timelines are inherently uncertain; the app frames preparation as prudent rather than predicting a specific date.

*A nonpartisan civic resource. Not a substitute for professional cybersecurity advice.*
