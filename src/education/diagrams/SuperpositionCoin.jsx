import React from "react";
import { D, STROKE } from "./tokens.js";

/* The spinning coin: while in the air it is genuinely both faces, and the
   balance of the blend sets the odds you'll see on landing. */

const L = {
  spinning: { en: "WHILE IT SPINS", es: "MIENTRAS GIRA" },
  notHidden: { en: "Not hidden. Undecided.", es: "No oculto. Sin decidir." },
  odds: { en: "THE BLEND SETS THE ODDS", es: "LA MEZCLA FIJA LAS PROBABILIDADES" },
  line1: {
    en: "A qubit can lean any way you like.",
    es: "Un qubit puede inclinarse como quiera.",
  },
  line2: { en: "The lean itself is information", es: "La inclinación misma es información" },
  line3: { en: "the machine computes with.", es: "con la que calcula la máquina." },
};

export default function SuperpositionCoin({ title, t }) {
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto" role="img">
      <title>{title}</title>

      <text x="30" y="30" fontFamily={D.mono} fontSize="13" fontWeight="700" fill={D.rust}>
        {t(L.spinning)}
      </text>

      {/* motion arcs */}
      <path d="M 92 60 A 70 70 0 0 1 92 176" fill="none" stroke={D.ink} strokeWidth="2" strokeDasharray="6 8" opacity="0.5" />
      <path d="M 208 176 A 70 70 0 0 1 208 60" fill="none" stroke={D.ink} strokeWidth="2" strokeDasharray="6 8" opacity="0.5" />

      {/* the coin, split into both faces at once */}
      <path d="M 150 60 A 58 58 0 0 0 150 176 Z" fill={D.blue} fillOpacity="0.85" />
      <path d="M 150 60 A 58 58 0 0 1 150 176 Z" fill={D.gold} fillOpacity="0.9" />
      <line x1="150" y1="60" x2="150" y2="176" stroke={D.ink} strokeWidth="1.5" strokeDasharray="5 5" />
      <circle cx="150" cy="118" r="58" fill="none" stroke={D.ink} strokeWidth={STROKE} />

      <text x="118" y="128" fontFamily={D.mono} fontSize="30" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <text x="182" y="128" fontFamily={D.mono} fontSize="30" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>

      <circle cx="150" cy="60" r="7" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <circle cx="150" cy="176" r="7" fill={D.gold} stroke={D.ink} strokeWidth="2" />

      <text x="150" y="212" fontFamily={D.sans} fontSize="14" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.notHidden)}
      </text>

      {/* ---- the odds ---- */}
      <text x="320" y="30" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.rust}>
        {t(L.odds)}
      </text>

      <rect x="320" y="52" width="125" height="38" fill={D.blue} fillOpacity="0.85" />
      <rect x="320" y="52" width="250" height="38" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <text x="382" y="77" fontFamily={D.mono} fontSize="14" fontWeight="700" fill={D.white} textAnchor="middle">
        0 · 50%
      </text>
      <text x="508" y="77" fontFamily={D.mono} fontSize="14" fontWeight="700" fill={D.ink} textAnchor="middle">
        1 · 50%
      </text>

      <rect x="320" y="106" width="63" height="38" fill={D.blue} fillOpacity="0.85" />
      <rect x="320" y="106" width="250" height="38" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <text x="351" y="131" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.white} textAnchor="middle">
        25%
      </text>
      <text x="477" y="131" fontFamily={D.mono} fontSize="14" fontWeight="700" fill={D.ink} textAnchor="middle">
        1 · 75%
      </text>

      <text x="320" y="178" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.line1)}
      </text>
      <text x="320" y="199" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.line2)}
      </text>
      <text x="320" y="220" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.line3)}
      </text>
    </svg>
  );
}
