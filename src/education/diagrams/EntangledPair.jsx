import React from "react";
import { D, STROKE } from "./tokens.js";

/* Two entangled qubits: perfectly correlated at any distance, but the link
   carries no message you can control. */

const L = {
  here: { en: "HERE", es: "AQUÍ" },
  tokyo: { en: "TOKYO", es: "TOKIO" },
  youMeasure: { en: "You measure", es: "Usted mide" },
  opposite: { en: "Instantly opposite", es: "Opuesto al instante" },
  joint: {
    en: "One joint state, not two separate qubits",
    es: "Un estado conjunto, no dos qubits separados",
  },
  noMessage: { en: "NO MESSAGE TRAVELS", es: "NINGÚN MENSAJE VIAJA" },
  random: {
    en: "Your result is random — you can't choose it.",
    es: "Su resultado es azaroso: no puede elegirlo.",
  },
};

export default function EntangledPair({ title, t }) {
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ---- the link ---- */}
      <path
        d="M 128 100 q 34 -26 68 0 q 34 26 68 0 q 34 -26 68 0 q 34 26 68 0"
        fill="none"
        stroke={D.gold}
        strokeWidth="4"
      />
      <path
        d="M 128 100 q 34 -26 68 0 q 34 26 68 0 q 34 -26 68 0 q 34 26 68 0"
        fill="none"
        stroke={D.ink}
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />

      {/* ---- left qubit ---- */}
      <text x="30" y="34" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.rust}>
        {t(L.here)}
      </text>
      <circle cx="80" cy="100" r="46" fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <text x="80" y="114" fontFamily={D.mono} fontSize="34" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <text x="80" y="172" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.youMeasure)}
      </text>

      {/* ---- right qubit ---- */}
      <text x="486" y="34" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.rust}>
        {t(L.tokyo)}
      </text>
      <circle cx="520" cy="100" r="46" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <text x="520" y="114" fontFamily={D.mono} fontSize="34" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>
      <text x="520" y="172" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.opposite)}
      </text>

      {/* ---- the caveat ---- */}
      <rect x="140" y="192" width="320" height="44" fill={D.white} stroke={D.red} strokeWidth={STROKE} />
      <text x="300" y="212" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.red} textAnchor="middle">
        {t(L.noMessage)}
      </text>
      <text x="300" y="228" fontFamily={D.sans} fontSize="12" fill="#2B2B2B" textAnchor="middle">
        {t(L.random)}
      </text>

      <text x="300" y="60" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.joint)}
      </text>
    </svg>
  );
}
