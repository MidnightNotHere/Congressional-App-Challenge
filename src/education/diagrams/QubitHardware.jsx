import React from "react";
import { D, STROKE } from "./tokens.js";

/* Three competing physical qubit technologies and the trade-off each makes.
   Nobody yet knows which approach wins. */

const L = {
  superconducting: { en: "SUPERCONDUCTING", es: "SUPERCONDUCTOR" },
  trappedIon: { en: "TRAPPED ION", es: "IÓN ATRAPADO" },
  photonic: { en: "PHOTONIC", es: "FOTÓNICO" },
  fast: { en: "Fast", es: "Rápido" },
  fragile1: { en: "Fragile, needs", es: "Frágil, requiere" },
  fragile2: { en: "huge cooling", es: "mucho frío" },
  stable: { en: "Very stable", es: "Muy estable" },
  slower1: { en: "Slower to", es: "Más lento" },
  slower2: { en: "operate", es: "de operar" },
  roomTemp: { en: "ROOM TEMP", es: "TEMP. AMBIENTE" },
  noCooling: { en: "No deep cooling", es: "Sin frío extremo" },
  harder1: { en: "Harder to make", es: "Más difícil que los" },
  harder2: { en: "photons interact", es: "fotones interactúen" },
  caption: {
    en: "Qubit count alone means little — error rate and coherence time matter just as much.",
    es: "La cantidad de qubits dice poco: la tasa de error y la coherencia importan igual.",
  },
};

export default function QubitHardware({ title, t }) {
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ================= superconducting ================= */}
      <rect x="16" y="20" width="180" height="176" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <rect x="16" y="20" width="180" height="30" fill={D.blue} />
      <text x="106" y="41" fontFamily={D.mono} fontSize="10" fontWeight="700" fill={D.white} textAnchor="middle">
        {t(L.superconducting)}
      </text>
      {/* a chilled loop */}
      <rect x="72" y="66" width="68" height="46" rx="4" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <line x1="92" y1="66" x2="92" y2="112" stroke={D.ink} strokeWidth="2" />
      <line x1="120" y1="66" x2="120" y2="112" stroke={D.ink} strokeWidth="2" />
      <circle cx="106" cy="89" r="7" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <text x="106" y="134" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.blue} textAnchor="middle">
        15 mK
      </text>
      <text x="106" y="156" fontFamily={D.sans} fontSize="12" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.fast)}
      </text>
      <text x="106" y="176" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.fragile1)}
      </text>
      <text x="106" y="190" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.fragile2)}
      </text>

      {/* ================= trapped ion ================= */}
      <rect x="210" y="20" width="180" height="176" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      {/* D.green is a bright, light cyan under this palette — dark ink on
          top of it, not white, is what actually stays readable. */}
      <rect x="210" y="20" width="180" height="30" fill={D.green} />
      <text x="300" y="41" fontFamily={D.mono} fontSize="10" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.trappedIon)}
      </text>
      {/* suspended atoms hit by a laser */}
      <line x1="238" y1="89" x2="362" y2="89" stroke={D.ink} strokeWidth="2" strokeDasharray="4 5" />
      <circle cx="264" cy="89" r="9" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <circle cx="300" cy="89" r="9" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <circle cx="336" cy="89" r="9" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <line x1="300" y1="60" x2="300" y2="78" stroke={D.red} strokeWidth="3" />
      <path d="M 300 80 l -5 -8 h 10 z" fill={D.red} />
      {/* On the white card below the header bar, not on D.green itself —
          needs the darker on-light teal (D.rust), not the bright fill. */}
      <text x="300" y="134" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.rust} textAnchor="middle">
        COLORADO
      </text>
      <text x="300" y="156" fontFamily={D.sans} fontSize="12" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.stable)}
      </text>
      <text x="300" y="176" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.slower1)}
      </text>
      <text x="300" y="190" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.slower2)}
      </text>

      {/* ================= photonic ================= */}
      <rect x="404" y="20" width="180" height="176" fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <rect x="404" y="20" width="180" height="30" fill={D.gold} />
      <text x="494" y="41" fontFamily={D.mono} fontSize="10" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.photonic)}
      </text>
      {/* a light wave */}
      <path
        d="M 434 89 q 15 -20 30 0 q 15 20 30 0 q 15 -20 30 0"
        fill="none"
        stroke={D.ink}
        strokeWidth={STROKE}
      />
      <circle cx="434" cy="89" r="6" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <circle cx="554" cy="89" r="6" fill={D.gold} stroke={D.ink} strokeWidth="2" />
      <text x="494" y="134" fontFamily={D.mono} fontSize="10.5" fontWeight="700" fill={D.rust} textAnchor="middle">
        {t(L.roomTemp)}
      </text>
      <text x="494" y="156" fontFamily={D.sans} fontSize="12" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.noCooling)}
      </text>
      <text x="494" y="176" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.harder1)}
      </text>
      <text x="494" y="190" fontFamily={D.sans} fontSize="11.5" fill="#2B2B2B" textAnchor="middle">
        {t(L.harder2)}
      </text>

      <text x="300" y="228" fontFamily={D.sans} fontSize="12" fill="#2B2B2B" textAnchor="middle">
        {t(L.caption)}
      </text>
    </svg>
  );
}
