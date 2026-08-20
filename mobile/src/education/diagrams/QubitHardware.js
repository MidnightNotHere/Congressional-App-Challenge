import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

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

export const VIEW_BOX = "0 0 600 250";

export default function QubitHardware({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ================= superconducting ================= */}
      <Rect x={16} y={20} width={180} height={176} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Rect x={16} y={20} width={180} height={30} fill={D.blue} />
      <T x={106} y={41} fontFamily={D.monoBold} fontSize={10} fill={D.white} textAnchor="middle">
        {t(L.superconducting)}
      </T>
      {/* a chilled loop */}
      <Rect x={72} y={66} width={68} height={46} rx={4} fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <Line x1={92} y1={66} x2={92} y2={112} stroke={D.ink} strokeWidth={2} />
      <Line x1={120} y1={66} x2={120} y2={112} stroke={D.ink} strokeWidth={2} />
      <Circle cx={106} cy={89} r={7} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <T x={106} y={134} fontFamily={D.monoBold} fontSize={12} fill={D.blue} textAnchor="middle">
        15 mK
      </T>
      <T x={106} y={156} fontFamily={D.sansBold} fontSize={12} fill={D.ink} textAnchor="middle">
        {t(L.fast)}
      </T>
      <T x={106} y={176} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.fragile1)}
      </T>
      <T x={106} y={190} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.fragile2)}
      </T>

      {/* ================= trapped ion ================= */}
      <Rect x={210} y={20} width={180} height={176} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Rect x={210} y={20} width={180} height={30} fill={D.green} />
      <T x={300} y={41} fontFamily={D.monoBold} fontSize={10} fill={D.white} textAnchor="middle">
        {t(L.trappedIon)}
      </T>
      {/* suspended atoms hit by a laser */}
      <Line x1={238} y1={89} x2={362} y2={89} stroke={D.ink} strokeWidth={2} strokeDasharray={[4, 5]} />
      <Circle cx={264} cy={89} r={9} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Circle cx={300} cy={89} r={9} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Circle cx={336} cy={89} r={9} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Line x1={300} y1={60} x2={300} y2={78} stroke={D.red} strokeWidth={3} />
      <Path d="M 300 80 l -5 -8 h 10 z" fill={D.red} />
      <T x={300} y={134} fontFamily={D.monoBold} fontSize={11} fill={D.green} textAnchor="middle">
        COLORADO
      </T>
      <T x={300} y={156} fontFamily={D.sansBold} fontSize={12} fill={D.ink} textAnchor="middle">
        {t(L.stable)}
      </T>
      <T x={300} y={176} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.slower1)}
      </T>
      <T x={300} y={190} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.slower2)}
      </T>

      {/* ================= photonic ================= */}
      <Rect x={404} y={20} width={180} height={176} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Rect x={404} y={20} width={180} height={30} fill={D.gold} />
      <T x={494} y={41} fontFamily={D.monoBold} fontSize={10} fill={D.ink} textAnchor="middle">
        {t(L.photonic)}
      </T>
      {/* a light wave */}
      <Path
        d="M 434 89 q 15 -20 30 0 q 15 20 30 0 q 15 -20 30 0"
        fill="none"
        stroke={D.ink}
        strokeWidth={STROKE}
      />
      <Circle cx={434} cy={89} r={6} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Circle cx={554} cy={89} r={6} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <T x={494} y={134} fontFamily={D.monoBold} fontSize={10.5} fill={D.rust} textAnchor="middle">
        {t(L.roomTemp)}
      </T>
      <T x={494} y={156} fontFamily={D.sansBold} fontSize={12} fill={D.ink} textAnchor="middle">
        {t(L.noCooling)}
      </T>
      <T x={494} y={176} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.harder1)}
      </T>
      <T x={494} y={190} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.harder2)}
      </T>

      <T x={300} y={228} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
