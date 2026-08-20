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

/* ------------------------- Signature design element ----------------------- */
/* A thin quantum-circuit line with gold accent nodes. Used at the top of the
   hero and as a divider between the three major layers. */
export function QuantumLine({ className = "", nodes = [80, 300, 520, 740, 960, 1140] }) {
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
        stroke={C.primary}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {nodes.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="12" r="9" fill={C.accent} fillOpacity="0.2" />
          <circle cx={x} cy="12" r="4.5" fill={C.accent} />
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

export function SectionLabel({ children }) {
  return (
    <p className="inline-block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-[#FFB800] text-[#0A0A0A] border-2 border-[#0A0A0A] px-2.5 py-1 mb-4">
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
