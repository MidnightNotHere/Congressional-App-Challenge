import React from "react";
import { D, STROKE } from "./tokens.js";

/* Measurement collapses the blend to one ordinary bit — and the blend does
   not come back. Read left to right. */

const L = {
  before: { en: "BEFORE", es: "ANTES" },
  measure: { en: "MEASURE", es: "MEDIR" },
  after: { en: "AFTER", es: "DESPUÉS" },
  both: { en: "Both at once", es: "Ambos a la vez" },
  youLook: { en: "You look", es: "Usted mira" },
  onePlain: { en: "One plain bit", es: "Un bit común" },
  gone1: { en: "BLEND", es: "MEZCLA" },
  gone2: { en: "GONE", es: "PERDIDA" },
  caption: {
    en: "Run it again and you may get 1 instead. The odds came from the blend.",
    es: "Repítalo y puede obtener 1. Las probabilidades venían de la mezcla.",
  },
};

export default function MeasurementCollapse({ title, t }) {
  return (
    <svg viewBox="0 0 600 230" className="w-full h-auto" role="img">
      <title>{title}</title>

      {/* ---- stage 1: superposition ---- */}
      <text x="20" y="28" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.rust}>
        {t(L.before)}
      </text>
      <path d="M 82 52 A 48 48 0 0 0 82 148 Z" fill={D.blue} fillOpacity="0.85" />
      <path d="M 82 52 A 48 48 0 0 1 82 148 Z" fill={D.gold} fillOpacity="0.9" />
      <line x1="82" y1="52" x2="82" y2="148" stroke={D.ink} strokeWidth="1.5" strokeDasharray="5 5" />
      <circle cx="82" cy="100" r="48" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <text x="57" y="109" fontFamily={D.mono} fontSize="24" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <text x="107" y="109" fontFamily={D.mono} fontSize="24" fontWeight="700" fill={D.ink} textAnchor="middle">
        1
      </text>
      <text x="82" y="176" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.both)}
      </text>

      {/* arrow */}
      <line x1="142" y1="100" x2="196" y2="100" stroke={D.ink} strokeWidth={STROKE} />
      <path d="M 196 100 l -11 -7 v 14 z" fill={D.ink} />

      {/* ---- stage 2: the measurement ---- */}
      <text x="212" y="28" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.rust}>
        {t(L.measure)}
      </text>
      <rect x="212" y="60" width="110" height="80" fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      {/* meter dial */}
      <path d="M 240 118 A 27 27 0 0 1 294 118" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <line x1="267" y1="118" x2="284" y2="98" stroke={D.ink} strokeWidth={STROKE} strokeLinecap="round" />
      <circle cx="267" cy="118" r="4.5" fill={D.ink} />
      <text x="267" y="176" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.youLook)}
      </text>

      {/* arrow */}
      <line x1="336" y1="100" x2="390" y2="100" stroke={D.ink} strokeWidth={STROKE} />
      <path d="M 390 100 l -11 -7 v 14 z" fill={D.ink} />

      {/* ---- stage 3: collapsed ---- */}
      <text x="406" y="28" fontFamily={D.mono} fontSize="12" fontWeight="700" fill={D.rust}>
        {t(L.after)}
      </text>
      <circle cx="468" cy="100" r="48" fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <text x="468" y="114" fontFamily={D.mono} fontSize="38" fontWeight="700" fill={D.white} textAnchor="middle">
        0
      </text>
      <text x="468" y="176" fontFamily={D.sans} fontSize="13" fontWeight="700" fill={D.ink} textAnchor="middle">
        {t(L.onePlain)}
      </text>

      {/* the blend is gone */}
      <text x="528" y="96" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.red}>
        {t(L.gone1)}
      </text>
      <text x="528" y="112" fontFamily={D.mono} fontSize="11" fontWeight="700" fill={D.red}>
        {t(L.gone2)}
      </text>

      <text x="300" y="212" fontFamily={D.sans} fontSize="13" fill="#2B2B2B" textAnchor="middle">
        {t(L.caption)}
      </text>
    </svg>
  );
}
