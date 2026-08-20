import React from "react";
import { D, STROKE } from "./tokens.js";

/* The three gates worth knowing: X flips, H creates superposition, CNOT
   links two qubits together. */

const L = {
  xTitle: { en: "X — THE QUANTUM NOT", es: "X — EL NOT CUÁNTICO" },
  xBody: { en: "Flips 0 to 1.", es: "Convierte 0 en 1." },
  hTitle: {
    en: "H — HADAMARD, MAKES SUPERPOSITION",
    es: "H — HADAMARD, CREA SUPERPOSICIÓN",
  },
  hBody1: { en: "An even blend of", es: "Una mezcla pareja" },
  hBody2: { en: "0 and 1.", es: "de 0 y 1." },
  cTitle: { en: "CNOT — LINKS TWO QUBITS", es: "CNOT — VINCULA DOS QUBITS" },
  cBody1: { en: "Flips the lower qubit", es: "Invierte el qubit inferior" },
  cBody2: { en: "only if the upper is 1.", es: "solo si el superior es 1." },
};

export default function GateOperations({ title, t }) {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ================= X gate ================= */}
      <text x="20" y="26" fontFamily={D.mono} fontSize="11.5" fontWeight="700" fill={D.rust}>
        {t(L.xTitle)}
      </text>
      <line x1="20" y1="60" x2="360" y2="60" stroke={D.ink} strokeWidth="2" />
      <circle cx="46" cy="60" r="17" fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <text x="46" y="67" fontFamily={D.mono} fontSize="16" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <rect x="168" y="38" width="44" height="44" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <text x="190" y="68" fontFamily={D.mono} fontSize="20" fontWeight="700" fill={D.ink} textAnchor="middle">
        X
      </text>
      <circle cx="334" cy="60" r="17" fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <text x="334" y="67" fontFamily={D.mono} fontSize="16" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>
      <text x="384" y="65" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.xBody)}
      </text>

      {/* ================= H gate ================= */}
      <text x="20" y="126" fontFamily={D.mono} fontSize="11.5" fontWeight="700" fill={D.rust}>
        {t(L.hTitle)}
      </text>
      <line x1="20" y1="160" x2="360" y2="160" stroke={D.ink} strokeWidth="2" />
      <circle cx="46" cy="160" r="17" fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <text x="46" y="167" fontFamily={D.mono} fontSize="16" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <rect x="168" y="138" width="44" height="44" fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <text x="190" y="168" fontFamily={D.mono} fontSize="20" fontWeight="700" fill={D.ink} textAnchor="middle">
        H
      </text>
      {/* blended output */}
      <path d="M 334 143 A 17 17 0 0 0 334 177 Z" fill={D.blue} fillOpacity="0.85" />
      <path d="M 334 143 A 17 17 0 0 1 334 177 Z" fill={D.gold} fillOpacity="0.9" />
      <circle cx="334" cy="160" r="17" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <text x="384" y="158" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.hBody1)}
      </text>
      <text x="384" y="175" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.hBody2)}
      </text>

      {/* ================= CNOT ================= */}
      <text x="20" y="226" fontFamily={D.mono} fontSize="11.5" fontWeight="700" fill={D.rust}>
        {t(L.cTitle)}
      </text>
      <line x1="20" y1="250" x2="360" y2="250" stroke={D.ink} strokeWidth="2" />
      <line x1="20" y1="272" x2="360" y2="272" stroke={D.ink} strokeWidth="2" />
      {/* control dot on the top wire, target on the bottom */}
      <line x1="190" y1="250" x2="190" y2="272" stroke={D.ink} strokeWidth={STROKE} />
      <circle cx="190" cy="250" r="7" fill={D.ink} />
      <circle cx="190" cy="272" r="11" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <line x1="179" y1="272" x2="201" y2="272" stroke={D.ink} strokeWidth="2" />
      <line x1="190" y1="261" x2="190" y2="283" stroke={D.ink} strokeWidth="2" />
      <text x="384" y="255" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.cBody1)}
      </text>
      <text x="384" y="272" fontFamily={D.sans} fontSize="13" fill="#2B2B2B">
        {t(L.cBody2)}
      </text>
    </svg>
  );
}
