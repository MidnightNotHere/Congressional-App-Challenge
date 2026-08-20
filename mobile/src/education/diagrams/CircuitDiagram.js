import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

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

export const VIEW_BOX = "0 0 600 260";

export default function CircuitDiagram({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* time axis */}
      <T x={30} y={26} fontFamily={D.monoBold} fontSize={11} fill={D.rust}>
        {t(L.time)}
      </T>
      <Line x1={86} y1={21} x2={470} y2={21} stroke={D.rust} strokeWidth={2} />
      <Path d="M 470 21 l -9 -6 v 12 z" fill={D.rust} />

      {/* ---- qubit wires ---- */}
      <T x={30} y={88} fontFamily={D.monoBold} fontSize={15} fill={D.ink}>
        |0⟩
      </T>
      <Line x1={72} y1={82} x2={470} y2={82} stroke={D.ink} strokeWidth={2} />

      <T x={30} y={176} fontFamily={D.monoBold} fontSize={15} fill={D.ink}>
        |0⟩
      </T>
      <Line x1={72} y1={170} x2={470} y2={170} stroke={D.ink} strokeWidth={2} />

      {/* ---- H gate on the top wire ---- */}
      <Rect x={128} y={60} width={44} height={44} fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <T x={150} y={90} fontFamily={D.monoBold} fontSize={20} fill={D.ink} textAnchor="middle">
        H
      </T>

      {/* ---- CNOT ---- */}
      <Line x1={256} y1={82} x2={256} y2={170} stroke={D.ink} strokeWidth={STROKE} />
      <Circle cx={256} cy={82} r={8} fill={D.ink} />
      <Circle cx={256} cy={170} r={14} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Line x1={242} y1={170} x2={270} y2={170} stroke={D.ink} strokeWidth={2} />
      <Line x1={256} y1={156} x2={256} y2={184} stroke={D.ink} strokeWidth={2} />

      {/* ---- measurement meters ---- */}
      <Rect x={356} y={60} width={46} height={44} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 368 92 A 11 11 0 0 1 390 92" fill="none" stroke={D.ink} strokeWidth={2} />
      <Line x1={379} y1={92} x2={388} y2={79} stroke={D.ink} strokeWidth={2} strokeLinecap="round" />

      <Rect x={356} y={148} width={46} height={44} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 368 180 A 11 11 0 0 1 390 180" fill="none" stroke={D.ink} strokeWidth={2} />
      <Line x1={379} y1={180} x2={388} y2={167} stroke={D.ink} strokeWidth={2} strokeLinecap="round" />

      {/* ---- step captions ---- */}
      <T x={150} y={126} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.step1)}
      </T>
      <T x={256} y={212} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.step2)}
      </T>
      <T x={379} y={212} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.step3)}
      </T>

      {/* ---- results ---- */}
      <Rect x={486} y={60} width={90} height={132} fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      <T x={531} y={82} fontFamily={D.monoBold} fontSize={9.5} fill={D.rust} textAnchor="middle">
        {t(L.results)}
      </T>
      <T x={531} y={110} fontFamily={D.monoBold} fontSize={17} fill={D.ink} textAnchor="middle">
        00
      </T>
      <T x={531} y={128} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        ~50%
      </T>
      <T x={531} y={156} fontFamily={D.monoBold} fontSize={17} fill={D.ink} textAnchor="middle">
        11
      </T>
      <T x={531} y={174} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        ~50%
      </T>

      <T x={300} y={244} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
