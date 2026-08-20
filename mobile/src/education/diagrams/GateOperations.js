import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

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

export const VIEW_BOX = "0 0 600 280";

export default function GateOperations({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ================= X gate ================= */}
      <T x={20} y={26} fontFamily={D.monoBold} fontSize={11.5} fill={D.rust}>
        {t(L.xTitle)}
      </T>
      <Line x1={20} y1={60} x2={360} y2={60} stroke={D.ink} strokeWidth={2} />
      <Circle cx={46} cy={60} r={17} fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <T x={46} y={67} fontFamily={D.monoBold} fontSize={16} fill={D.white} textAnchor="middle">
        0
      </T>
      <Rect x={168} y={38} width={44} height={44} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <T x={190} y={68} fontFamily={D.monoBold} fontSize={20} fill={D.ink} textAnchor="middle">
        X
      </T>
      <Circle cx={334} cy={60} r={17} fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <T x={334} y={67} fontFamily={D.monoBold} fontSize={16} fill={D.ink} textAnchor="middle">
        1
      </T>
      <T x={384} y={65} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.xBody)}
      </T>

      {/* ================= H gate ================= */}
      <T x={20} y={126} fontFamily={D.monoBold} fontSize={11.5} fill={D.rust}>
        {t(L.hTitle)}
      </T>
      <Line x1={20} y1={160} x2={360} y2={160} stroke={D.ink} strokeWidth={2} />
      <Circle cx={46} cy={160} r={17} fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <T x={46} y={167} fontFamily={D.monoBold} fontSize={16} fill={D.white} textAnchor="middle">
        0
      </T>
      <Rect x={168} y={138} width={44} height={44} fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      <T x={190} y={168} fontFamily={D.monoBold} fontSize={20} fill={D.ink} textAnchor="middle">
        H
      </T>
      {/* blended output */}
      <Path d="M 334 143 A 17 17 0 0 0 334 177 Z" fill={D.blue} fillOpacity={0.85} />
      <Path d="M 334 143 A 17 17 0 0 1 334 177 Z" fill={D.gold} fillOpacity={0.9} />
      <Circle cx={334} cy={160} r={17} fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <T x={384} y={158} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.hBody1)}
      </T>
      <T x={384} y={175} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.hBody2)}
      </T>

      {/* ================= CNOT ================= */}
      <T x={20} y={226} fontFamily={D.monoBold} fontSize={11.5} fill={D.rust}>
        {t(L.cTitle)}
      </T>
      <Line x1={20} y1={250} x2={360} y2={250} stroke={D.ink} strokeWidth={2} />
      <Line x1={20} y1={272} x2={360} y2={272} stroke={D.ink} strokeWidth={2} />
      {/* control dot on the top wire, target on the bottom */}
      <Line x1={190} y1={250} x2={190} y2={272} stroke={D.ink} strokeWidth={STROKE} />
      <Circle cx={190} cy={250} r={7} fill={D.ink} />
      <Circle cx={190} cy={272} r={11} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Line x1={179} y1={272} x2={201} y2={272} stroke={D.ink} strokeWidth={2} />
      <Line x1={190} y1={261} x2={190} y2={283} stroke={D.ink} strokeWidth={2} />
      <T x={384} y={255} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.cBody1)}
      </T>
      <T x={384} y={272} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.cBody2)}
      </T>
    </Svg>
  );
}
