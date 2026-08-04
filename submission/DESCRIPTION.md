# Written Submission Description

The Congressional App Challenge portal's exact prompt wording changes
year to year, but it's consistently built around the sections below.
Copy the relevant paragraphs into whatever fields the 2026 form actually
shows — edit anything that reads as written *for* a form rather than
in your own voice, since judges can tell.

---

## Summary (1–2 sentences, for anywhere a short blurb is needed)

Quantum4Colorado is a bilingual civic platform — on the web and as a
native mobile app — that helps Colorado's 6th District residents,
organizations, and elected officials understand what quantum computing
means for them, assess their own post-quantum-cryptography risk, and see
concrete policy steps the state could take to lead rather than lag.

## Inspiration

Colorado hosts some of the country's most important quantum computing
infrastructure — NIST's Boulder laboratories, JILA, CU Boulder's quantum
program, Quantinuum's headquarters — but almost none of that is visible
to the people it affects. Meanwhile, NIST finalized its first
post-quantum cryptography standards in 2024, starting a clock on a
migration every organization handling sensitive data will eventually
have to make, whether or not they know it yet. We wanted to close both
gaps at once: make Colorado's quantum leadership legible to its own
residents, and give organizations a concrete, low-effort way to start
understanding their exposure today.

## What it does

- **Colorado's Quantum Story** turns the state's research infrastructure
  into a plain-language, visual explainer — what quantum computing is,
  why the encryption most systems rely on today won't survive it, and
  which Colorado institutions are already working on the solution.
- **The PQC Readiness Tool** is an 8-question assessment that gives any
  organization — a small business, a hospital, a school district, a
  state agency — a real risk score, the specific factors behind it, and
  a prioritized action list built from actual NIST, CISA, and NSA
  guidance. Results export as a PDF or share as a link/QR code that
  reopens to the exact same result on another device.
- **For Representatives** translates the same underlying data into
  legislative terms: an investment-gap comparison against states already
  funding coordinated quantum initiatives, and four policy
  recommendations, each grounded in a real precedent.
- **Youth & Education** connects students to real Colorado quantum
  career paths through a short interactive quiz, plus curated learning
  resources and competitions.
- Every section works in **English and Spanish**, on **both a web app and
  a native mobile app**, and every factual claim in the app links back to
  its public source (see About → Where This Data Comes From).

## How we built it

A shared content layer (`/data`) holds every fact, question, and
translated string used by both the web app (React + Vite + Tailwind CSS)
and the mobile app (Expo / React Native), so a correction or translation
only ever has to be made once and both platforms stay in sync
automatically. Bilingual strings live inline as `{ en, es }` pairs,
resolved at render time. The PQC Readiness Tool's scoring logic is a
pure function shared by both platforms so the web report and the mobile
PDF export are guaranteed to agree. A small Vercel serverless backend
(Redis via Upstash) tracks anonymous, aggregate usage statistics — no
personal data, ever.

## Challenges we ran into

Keeping a single source of truth across two genuinely different
rendering platforms (React DOM vs. React Native) meant designing every
piece of shared content to be platform-agnostic from the start — icons,
for instance, are stored as string names and resolved through a
platform-local registry, since a shared file can't hold a
`lucide-react` component and a `lucide-react-native` component at once.
We also hit a real, hard-to-diagnose Metro bundler bug: files outside
the mobile app's own project root weren't reliably discovered by
Metro's file-map crawler on Windows, which worked fine against a warm
dev-server cache but broke silently on a clean production build — we
tracked it down by crawling the filesystem manually to compare what
Metro should versus did discover, and fixed it with a self-healing
local directory link instead of relying on Metro's cross-directory
`watchFolders` behavior.

## Accomplishments we're proud of

A judge — or any resident — can go from "I've never thought about
quantum computing" to a personalized, actionable risk assessment for
their own organization in under three minutes, in whichever of two
languages they're more comfortable in, on whichever device they have in
hand. That's the whole point of a civic tool: the value is in how little
friction stands between someone and the information that's actually
relevant to them.

## What's next

- Expanding the anonymous usage-stats backend into a small public
  dashboard (e.g. "X readiness assessments completed statewide") once
  there's real usage data to show.
- Extending bilingual coverage to additional languages spoken in the
  district, if there's demonstrated need.
- Reaching out to the organizations named in the ecosystem map and the
  Colorado Quantum Network to verify and keep the underlying data
  current beyond the competition.

## Built with

React · React Native (Expo) · Vite · Tailwind CSS · Vercel (hosting +
serverless functions) · Upstash Redis · Recharts · lucide-react /
lucide-react-native · qrcode-generator

---

## Notes for whoever fills out the actual form

- Fill in the deployed URL and GitHub repo URL wherever the portal asks —
  neither is filled in above since they weren't given to me.
- If the portal asks for team member names/roles, add them — I don't
  have that information.
- Double-check the current CAC portal's exact character limits before
  pasting these in; trim from the middle paragraphs first, since the
  opening/closing lines carry the most weight with a skimming reader.
