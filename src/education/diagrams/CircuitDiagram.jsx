import React from "react";
import { D, STROKE } from "./tokens.js";

/* The Bell-state circuit, annotated: two qubits, H then CNOT then measure,
   producing only 00 or 11. The canonical "read a circuit" example. */

const L = {
  time: { en: "TIME", es: "TIEMPO" },
  step1: { en: "1. superpose", es: "1. superponer" },
  step2: { en: "2. entangle", es: "2. entrelazar" },
  step3: { en: "3. measure", es: "3. medir" },
  results: { en: "RESULTS", es: "RESULTADOS" },
  caption: {
    en: "Never 01 or 10 — the two qubits always agree.",
    es: "Nunca 01 ni 10: los dos qubits siempre coinciden.",
  },
};

export default function CircuitDiagram({ title, t }) {
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* time axis */}
      <text x="30" y="26" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.rust}>
        {t(L.time)}
      </text>
      <line x1="86" y1="21" x2="470" y2="21" stroke={D.rust} strokeWidth="2" />
      <path d="M 470 21 l -9 -6 v 12 z" fill={D.rust} />

      {/* ---- qubit wires ---- */}
      <text x="30" y="88" fontFamily={D.mono} fontSize="15" fontWeight="700" fill={D.ink}>
        |0⟩
      </text>
      <line x1="72" y1="82" x2="470" y2="82" stroke={D.ink} strokeWidth="2" />

      <text x="30" y="176" fontFamily={D.mono} fontSize="15" fontWeight="700" fill={D.ink}>
        |0⟩
      </text>
      <line x1="72" y1="170" x2="470" y2="170" stroke={D.ink} strokeWidth="2" />

      {/* ---- H gate on the top wire ---- */}
      <rect x="128" y="60" width="44" height="44" fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <text x="150" y="90" fontFamily={D.mono} fontSize="20" fontWeight="700" fill={D.ink} textAnchor="middle">
        H
      </text>

      {/* ---- CNOT ---- */}
      <line x1="256" y1="82" x2="256" y2="170" stroke={D.ink} strokeWidth={STROKE} />
      <circle cx="256" cy="82" r="8" fill={D.ink} />
      <circle cx="256" cy="170" r="14" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <line x1="242" y1="170" x2="270" y2="170" stroke={D.ink} strokeWidth="2" />
      <line x1="256" y1="156" x2="256" y2="184" stroke={D.ink} strokeWidth="2" />

      {/* ---- measurement meters ---- */}
      <rect x="356" y="60" width="46" height="44" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <path d="M 368 92 A 11 11 0 0 1 390 92" fill="none" stroke={D.ink} strokeWidth="2" />
      <line x1="379" y1="92" x2="388" y2="79" stroke={D.ink} strokeWidth="2" strokeLinecap="round" />

      <rect x="356" y="148" width="46" height="44" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <path d="M 368 180 A 11 11 0 0 1 390 180" fill="none" stroke={D.ink} strokeWidth="2" />
      <line x1="379" y1="180" x2="388" y2="167" stroke={D.ink} strokeWidth="2" strokeLinecap="round" />

      {/* ---- step captions ---- */}
      <text x="150" y="126" fontFamily={D.sans} fontSize="12" fill="#2B2B2B" textAnchor="middle">
        {t(L.step1)}
      </text>
      <text x="256" y="212" fontFamily={D.sans} fontSize="12" fill="#2B2B2B" textAnchor="middle">
        {t(L.step2)}
      </text>
      <text x="379" y="212" fontFamily={D.sans} fontSize="12" fill="#2B2B2B" textAnchor="middle">
        {t(L.step3)}
      </text>

      {/* ---- results ---- */}
      <rect x="486" y="60" width="90" height="132" fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      <text x="531" y="82" fontFamily={D.mono} fontSize="9.5" fontWeight="700" fill={D.rust} textAnchor="middle">
        {t(L.results)}
      </text>
      <text x="531" y="110" fontFamily={D.mono} fontSize="17" fontWeight="700" fill={D.ink} textAnchor="middle">
        00
      </text>
      <text x="531" y="128" fontFamily={D.sans} fontSize="11" fill="#2B2B2B" textAnchor="middle">
        ~50%
      </text>
      <text x="531" y="156" fontFamily={D.mono} fontSize="17" fontWeight="700" fill={D.ink} textAnchor="middle">
        11
      </text>
      <text x="531" y="174" fontFamily={D.sans} fontSize="11" fill="#2B2B2B" textAnchor="middle">
        ~50%
      </text>

      <text x="300" y="244" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.caption)}
      </text>
    </svg>
  );
}
