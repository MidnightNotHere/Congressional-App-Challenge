import React from "react";
import { D, STROKE } from "./tokens.js";

/* Bit vs qubit: a classical bit must be one value, a qubit holds both. */

const L = {
  bit: { en: "CLASSICAL BIT", es: "BIT CLÁSICO" },
  qubit: { en: "QUBIT", es: "QUBIT" },
  bitLead: { en: "Exactly one, always.", es: "Exactamente uno, siempre." },
  bitSub: { en: "Off or on. No third option.", es: "Apagado o encendido. Sin más." },
  qubitLead: { en: "Both at once, genuinely.", es: "Ambos a la vez, de verdad." },
  qubitSub: { en: "Undecided until measured.", es: "Sin decidir hasta medirlo." },
};

export default function ClassicalVsQuantum({ title, t }) {
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ---- classical bit ---- */}
      <text x="30" y="34" fontFamily={D.mono} fontSize="13" fontWeight="700" fill={D.rust}>
        {t(L.bit)}
      </text>

      <rect x="30" y="52" width="90" height="90" fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <text x="75" y="108" fontFamily={D.mono} fontSize="42" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>

      <rect x="140" y="52" width="90" height="90" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <text x="185" y="108" fontFamily={D.mono} fontSize="42" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>

      <text x="30" y="172" fontFamily={D.sans} fontSize="14" fontWeight="700" fill={D.ink}>
        {t(L.bitLead)}
      </text>
      <text x="30" y="194" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.bitSub)}
      </text>

      {/* ---- divider ---- */}
      <line x1="300" y1="30" x2="300" y2="215" stroke={D.ink} strokeWidth={STROKE} strokeDasharray="8 7" />

      {/* ---- qubit ---- */}
      <text x="345" y="34" fontFamily={D.mono} fontSize="13" fontWeight="700" fill={D.rust}>
        {t(L.qubit)}
      </text>

      {/* the blend: two halves of one box, not two boxes */}
      <rect x="345" y="52" width="100" height="90" fill={D.blue} fillOpacity="0.85" />
      <rect x="445" y="52" width="100" height="90" fill={D.gold} fillOpacity="0.9" />
      <line x1="445" y1="52" x2="445" y2="142" stroke={D.ink} strokeWidth="1.5" strokeDasharray="5 5" />
      <rect x="345" y="52" width="200" height="90" fill="none" stroke={D.ink} strokeWidth={STROKE} />

      <text x="395" y="108" fontFamily={D.mono} fontSize="42" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <text x="495" y="108" fontFamily={D.mono} fontSize="42" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>

      {/* gold accent nodes, the QuantumLine motif */}
      <circle cx="445" cy="52" r="7" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <circle cx="445" cy="142" r="7" fill={D.gold} stroke={D.ink} strokeWidth="2" />

      <text x="345" y="172" fontFamily={D.sans} fontSize="14" fontWeight="700" fill={D.ink}>
        {t(L.qubitLead)}
      </text>
      <text x="345" y="194" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.qubitSub)}
      </text>
    </svg>
  );
}
