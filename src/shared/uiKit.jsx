/* =========================================================================
   Quantum4Colorado — shared web UI kit
   Design tokens and the small primitives built on them, extracted from
   Quantum4Colorado.jsx so that both the main app file and the pages under
   src/education can import them.

   This file is deliberately a leaf: it imports from /data and lucide-react
   and nothing else in the app. Quantum4Colorado.jsx imports the course
   pages (to route to them) and those pages import from here, so keeping
   this dependency-free is what stops that becoming an import cycle.

   Mobile has its own equivalents (mobile/src/theme.js and
   mobile/src/components/) since React Native can't consume any of this.
   ========================================================================= */

import React, { createContext, useContext } from "react";
import {
  Atom,
  Lock,
  Shield,
  MapPin,
  Landmark,
  GraduationCap,
  Cpu,
  Building2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Briefcase,
  Globe,
  Layers,
  Link2,
  KeyRound,
  Zap,
  Trophy,
  FlaskConical,
  Laptop,
  Code2,
  Handshake,
  Compass,
  FileText,
  Sparkles,
} from "lucide-react";
import { DEFAULT_LANGUAGE, makeTranslator } from "../../data/i18n.js";

/* Resolves the string icon names used throughout /data to actual
   lucide-react components. Mobile has an equivalent registry
   (mobile/src/components/Icon.js) resolving the same string names against
   lucide-react-native, since a shared data file can't hold component
   references from either platform's icon package.

   Keep this in sync with mobile's registry: a name used in /data must
   resolve on both platforms. Mobile returns null for an unknown name;
   here an unknown name yields undefined and would throw on render, so
   only reference names that appear below. */
export const ICON_REGISTRY = {
  Atom,
  Lock,
  Shield,
  MapPin,
  Landmark,
  GraduationCap,
  Cpu,
  Building2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Briefcase,
  Globe,
  Layers,
  Link2,
  KeyRound,
  Zap,
  Trophy,
  FlaskConical,
  Laptop,
  Code2,
  Handshake,
  Compass,
  FileText,
  Sparkles,
};

/* ----------------------------- Brand palette ----------------------------- */
export const C = {
  primary: "#1A1AE5", // Colorado sky blue
  secondary: "#00A94F", // Rocky Mountain forest green
  accent: "#FFB800", // sandstone gold
  danger: "#D50000", // deep red
  bg: "#F2EFE4",
  surface: "#FFFFFF",
  textPrimary: "#0A0A0A",
  textSecondary: "#2B2B2B",
  border: "#0A0A0A",
};

/* ------------------------------ Cyber palette ------------------------------ */
/* "Void Blue" — the site-wide dark theme (Story, Assessment, Representatives,
   About, the shared nav/footer, and the education/lab surfaces). `C` above is
   kept and still used within it: several components (BlochSphere, Histogram,
   ScoreRing, DetailRow) render inside a nested white card/panel and reach for
   `C.textPrimary`/`C.border`/`C.bg` etc. for that inner light surface, which
   is identical in both themes — a white card needs dark ink whether the page
   around it is cream or near-black. `CYBER` supplies everything that touches
   the dark page canvas directly.

   The page canvas goes dark, but cards and buttons stay WHITE (same as the
   light theme) — which forces a split the light theme never needed:

   - `border` stays BLACK. It always outlines a white or bright fill, and
     black reads fine against both regardless of what's behind it — this is
     unchanged from the light theme on purpose.
   - `shadowHex` (and the two ready-made `shadowClass*` strings below) is
     WHITE instead. The signature hard-shadow's visible sliver lands on
     whatever surface sits *behind* the element — the dark page canvas here
     — so it has to flip for the same reason it stays black in the light
     theme: the shadow must contrast the surface behind it, not the surface
     it's attached to. It can't come from the shared `shadow-hard` Tailwind
     utility (tailwind.config.js — a single global black value used by every
     other page), so cyber components use the arbitrary-value classes below
     instead of that utility.
   - Text needs two pairs, not one: `textOnDark*` for copy sitting directly
     on the page canvas (headings, intro paragraphs), `textOnLight*` for
     copy inside a white card or button (identical to the light theme's ink,
     since white surfaces still need dark text no matter the page bg).
     Picking the wrong one is exactly the "pale text on a white button"
     mistake to avoid — check what's immediately behind the text, not what
     page it's on. */
export const CYBER = {
  bg: "#04070F",
  surface: "#FFFFFF",
  primary: "#375FFF",
  primaryInk: "#FFFFFF",
  // #375FFF is fine as a *fill* (white ink on top does the contrast work),
  // but measures ~4.2:1 used directly as small text/links on the #04070F
  // page — under the 4.5:1 AA threshold for normal text. This lighter,
  // more saturated variant is for exactly that case: inline links and
  // labels sitting straight on the dark canvas, not inside a fill.
  primaryTextOnDark: "#6E8CFF",
  secondary: "#00D4FF",
  secondaryInk: "#04070F",
  // #00D4FF itself fails contrast as small text on a pale tint (e.g. a
  // 10%-opacity success badge on white) the same way the light theme's
  // #00A94F secondary is already too dark to use as a *fill* but exactly
  // right as *text* — this is that same darker, readable-as-text shade,
  // just built for the cyan hue instead of green.
  secondaryTextOnLight: "#00707A",
  accent: "#FFE600",
  accentInk: "#04070F",
  danger: "#FF2D55",
  dangerInk: "#FFFFFF",
  // Same problem as secondaryTextOnLight, different color: #FF2D55 measures
  // ~3.6:1 as small text/borders on a white surface — under the 4.5:1 text
  // threshold. Darker red for that specific case.
  dangerTextOnLight: "#B8123F",
  border: "#0A0A0A",
  shadowHex: "#FFFFFF",
  shadowClass: "shadow-[6px_6px_0_0_#FFFFFF]",
  shadowClassSm: "shadow-[3px_3px_0_0_#FFFFFF]",
  textOnDark: "#EEF1FA",
  textOnDarkMuted: "#9FA8C4",
  textOnLight: "#0A0A0A",
  textOnLightMuted: "#2B2B2B",
  // A third accent (Colorado-flag orange) used sparingly — the logo's "4",
  // map pins, Q-number labels. Not bright enough on #04070F to use directly
  // as text/icon color on the dark canvas (fails 4.5:1), so — same split as
  // secondary/danger above — `tertiary` is the on-dark-safe brightened
  // version and `tertiaryTextOnLight` is the original, already-dark value,
  // still correct wherever it sits on a white card.
  tertiary: "#FF6A3D",
  tertiaryTextOnLight: "#C42B00",
};

/* ------------------------- Signature design element ----------------------- */
/* A thin quantum-circuit line with gold accent nodes. Used at the top of the
   hero and as a divider between the three major layers. */
/* `tone="cyber"` swaps the line/node colors for the Void Blue palette —
   see the SectionLabel note above, same reasoning. */
export function QuantumLine({ className = "", nodes = [80, 300, 520, 740, 960, 1140], tone = "gold" }) {
  const stroke = tone === "cyber" ? CYBER.primary : C.primary;
  const node = tone === "cyber" ? CYBER.accent : C.accent;
  return (
    <svg
      viewBox="0 0 1200 24"
      className={`w-full h-6 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="12"
        x2="1200"
        y2="12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {nodes.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="12" r="9" fill={node} fillOpacity="0.2" />
          <circle cx={x} cy="12" r="4.5" fill={node} />
        </g>
      ))}
    </svg>
  );
}

/* Picks black or white text for a given background so the bold palette's
   light colors (amber especially) stay readable on dynamically-colored
   chips. Mobile has the same helper in its theme module. */
export function readableOn(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0A0A0A" : "#FFFFFF";
}

/* `tone="cyber"` swaps the gold chip for the Void Blue accent, for use
   only within the cyber-scoped surfaces (Youth/Learn/Lab). Every other
   call site is unaffected — the default stays the original gold-on-black
   chip used across the rest of the app. */
export function SectionLabel({ children, tone = "gold" }) {
  const cls =
    tone === "cyber"
      ? "bg-[#FFE600] text-[#04070F] border-[#0A0A0A]"
      : "bg-[#FFB800] text-[#0A0A0A] border-[#0A0A0A]";
  return (
    <p
      className={`inline-block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase border-2 px-2.5 py-1 mb-4 ${cls}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------ Language context --------------------------- */
/* Bilingual support (English/Spanish). Content fields are { en, es } pairs
   living directly in /data (see data/i18n.js); this context tracks which
   language is active. The provider (and the localStorage persistence that
   backs it) lives in Quantum4Colorado.jsx, which wraps the whole app. */
export const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  t: makeTranslator(DEFAULT_LANGUAGE),
});

export function useLanguage() {
  return useContext(LanguageContext);
}
