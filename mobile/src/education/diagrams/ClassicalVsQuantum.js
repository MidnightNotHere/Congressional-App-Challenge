import React from "react";
import Svg, { Rect, Line, Circle, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* Bit vs qubit: a classical bit must be one value, a qubit holds both. */

const L = {
  bit: { en: "CLASSICAL BIT", es: "BIT CLÁSICO" },
  qubit: { en: "QUBIT", es: "QUBIT" },
  bitLead: { en: "Exactly one, always.", es: "Exactamente uno, siempre." },
  bitSub: { en: "Off or on. No third option.", es: "Apagado o encendido. Sin más." },
  qubitLead: { en: "Both at once, genuinely.", es: "Ambos a la vez, de verdad." },
  qubitSub: { en: "Undecided until measured.", es: "Sin decidir hasta medirlo." },
};

export const VIEW_BOX = "0 0 600 250";

export default function ClassicalVsQuantum({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ---- classical bit ---- */}
      <T x={30} y={34} fontFamily={D.monoBold} fontSize={13} fill={D.rust}>
        {t(L.bit)}
      </T>

      <Rect x={30} y={52} width={90} height={90} fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <T x={75} y={108} fontFamily={D.monoBold} fontSize={42} fill={D.white} textAnchor="middle">
        0
      </T>

      <Rect x={140} y={52} width={90} height={90} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <T x={185} y={108} fontFamily={D.monoBold} fontSize={42} fill={D.ink} textAnchor="middle">
        1
      </T>

      <T x={30} y={172} fontFamily={D.sansBold} fontSize={14} fill={D.ink}>
        {t(L.bitLead)}
      </T>
      <T x={30} y={194} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.bitSub)}
      </T>

      {/* ---- divider ---- */}
      <Line x1={300} y1={30} x2={300} y2={215} stroke={D.ink} strokeWidth={STROKE} strokeDasharray={[8, 7]} />

      {/* ---- qubit ---- */}
      <T x={345} y={34} fontFamily={D.monoBold} fontSize={13} fill={D.rust}>
        {t(L.qubit)}
      </T>

      {/* the blend: two halves of one box, not two boxes */}
      <Rect x={345} y={52} width={100} height={90} fill={D.blue} fillOpacity={0.85} />
      <Rect x={445} y={52} width={100} height={90} fill={D.gold} fillOpacity={0.9} />
      <Line x1={445} y1={52} x2={445} y2={142} stroke={D.ink} strokeWidth={1.5} strokeDasharray={[5, 5]} />
      <Rect x={345} y={52} width={200} height={90} fill="none" stroke={D.ink} strokeWidth={STROKE} />

      <T x={395} y={108} fontFamily={D.monoBold} fontSize={42} fill={D.white} textAnchor="middle">
        0
      </T>
      <T x={495} y={108} fontFamily={D.monoBold} fontSize={42} fill={D.ink} textAnchor="middle">
        1
      </T>

      {/* gold accent nodes, the QuantumLine motif */}
      <Circle cx={445} cy={52} r={7} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Circle cx={445} cy={142} r={7} fill={D.gold} stroke={D.ink} strokeWidth={2} />

      <T x={345} y={172} fontFamily={D.sansBold} fontSize={14} fill={D.ink}>
        {t(L.qubitLead)}
      </T>
      <T x={345} y={194} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.qubitSub)}
      </T>
    </Svg>
  );
}
