import React from "react";
import { D, STROKE } from "./tokens.js";

/* Where quantum computers are expected to win, and the much larger set of
   tasks where classical machines stay the right tool. */

const L = {
  quantumWins: { en: "QUANTUM MAY WIN", es: "LO CUÁNTICO PUEDE GANAR" },
  classicalWins: { en: "CLASSICAL STAYS BETTER", es: "LO CLÁSICO SIGUE MEJOR" },
  narrow: { en: "A NARROW LIST", es: "UNA LISTA CORTA" },
  caption: {
    en: "A quantum computer is a specialist instrument, not a faster laptop.",
    es: "Una computadora cuántica es un instrumento especializado, no una laptop más rápida.",
  },
};

const QUANTUM = [
  { en: "Simulating molecules", es: "Simular moléculas" },
  { en: "Materials & battery chemistry", es: "Materiales y baterías" },
  { en: "Certain optimization problems", es: "Ciertos problemas de optimización" },
  { en: "Breaking / building cryptography", es: "Romper o construir criptografía" },
];

const CLASSICAL = [
  { en: "Email, browsing, messaging", es: "Correo, navegación, mensajería" },
  { en: "Databases & spreadsheets", es: "Bases de datos y hojas de cálculo" },
  { en: "Graphics & video", es: "Gráficos y video" },
  { en: "Everyday AI models", es: "Modelos de IA cotidianos" },
  { en: "Essentially all other software", es: "Prácticamente todo el demás software" },
];

export default function AdvantageDomains({ title, t }) {
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ================= quantum wins ================= */}
      <rect x="16" y="20" width="272" height="200" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <rect x="16" y="20" width="272" height="34" fill={D.blue} />
      <text x="152" y="43" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.white} textAnchor="middle">
        {t(L.quantumWins)}
      </text>
      {QUANTUM.map((item, i) => (
        <g key={item.en}>
          <circle cx="42" cy={80 + i * 32} r="6" fill={D.gold} stroke={D.ink} strokeWidth="2" />
          <text x="60" y={85 + i * 32} fontFamily={D.sans} fontSize="12" fill={D.ink}>
            {t(item)}
          </text>
        </g>
      ))}
      <text x="42" y="204" fontFamily={D.mono} fontSize="9.5" fontWeight="700" fill={D.rust}>
        {t(L.narrow)}
      </text>

      {/* ================= classical wins ================= */}
      <rect x="312" y="20" width="272" height="200" fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      <rect x="312" y="20" width="272" height="34" fill={D.ink} />
      <text x="448" y="43" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.white} textAnchor="middle">
        {t(L.classicalWins)}
      </text>
      {CLASSICAL.map((item, i) => (
        <g key={item.en}>
          <circle cx="338" cy={78 + i * 28} r="6" fill={D.white} stroke={D.ink} strokeWidth="2" />
          <text x="356" y={83 + i * 28} fontFamily={D.sans} fontSize="12" fill="#2B2B2B">
            {t(item)}
          </text>
        </g>
      ))}

      <text x="300" y="246" fontFamily={D.sans} fontSize="12.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.caption)}
      </text>
    </svg>
  );
}
