import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* One logical qubit is spread across thousands of physical ones, and errors
   are found by comparing qubits rather than reading them. */

const L = {
  manyPhysical: { en: "MANY PHYSICAL QUBITS", es: "MUCHOS QUBITS FÍSICOS" },
  protect: { en: "PROTECT", es: "PROTEGEN" },
  oneLogical: { en: "ONE LOGICAL QUBIT", es: "UN QUBIT LÓGICO" },
  reliable1: { en: "RELIABLE", es: "QUBIT" },
  reliable2: { en: "QUBIT", es: "CONFIABLE" },
  perLogical: { en: "physical per logical", es: "físicos por cada lógico" },
  checksAsk: { en: "Checks ask", es: "Las pruebas preguntan" },
  checkYes: { en: "“do these agree?”", es: "“¿estos coinciden?”" },
  checkNo: { en: "never “what are you?”", es: "nunca “¿qué eres?”" },
  caption: {
    en: "Reading a qubit would destroy it — so errors are found by comparison alone.",
    es: "Leer un qubit lo destruiría: los errores se hallan solo por comparación.",
  },
};

/* A 6x6 grid standing in for the physical qubits backing one logical
   qubit — one is drawn as faulted to show what a check catches. */
const COLS = 6;
const ROWS = 6;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);
const FAULTED = 15;

export const VIEW_BOX = "0 0 600 250";

export default function ErrorCorrection({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ---- the physical grid ---- */}
      <T x={20} y={26} fontFamily={D.monoBold} fontSize={10.5} fill={D.rust}>
        {t(L.manyPhysical)}
      </T>
      <Rect x={20} y={38} width={168} height={168} fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      {CELLS.map((i) => {
        const cx = 44 + (i % COLS) * 28;
        const cy = 62 + Math.floor(i / COLS) * 28;
        const faulted = i === FAULTED;
        return (
          <Circle
            key={i}
            cx={cx}
            cy={cy}
            r={9}
            fill={faulted ? D.red : D.blue}
            fillOpacity={faulted ? 1 : 0.75}
            stroke={D.ink}
            strokeWidth={2}
          />
        );
      })}
      {/* highlight the faulted one */}
      <Rect
        x={44 + (FAULTED % COLS) * 28 - 15}
        y={62 + Math.floor(FAULTED / COLS) * 28 - 15}
        width={30}
        height={30}
        fill="none"
        stroke={D.red}
        strokeWidth={STROKE}
      />

      {/* ---- arrow ---- */}
      <Line x1={204} y1={122} x2={256} y2={122} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 256 122 l -11 -7 v 14 z" fill={D.ink} />
      <T x={230} y={106} fontFamily={D.monoBold} fontSize={9} fill={D.rust} textAnchor="middle">
        {t(L.protect)}
      </T>

      {/* ---- the logical qubit ---- */}
      <T x={266} y={26} fontFamily={D.monoBold} fontSize={10.5} fill={D.rust}>
        {t(L.oneLogical)}
      </T>
      <Rect x={274} y={72} width={110} height={100} fill={D.green} stroke={D.ink} strokeWidth={STROKE} />
      <T x={329} y={118} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.reliable1)}
      </T>
      <T x={329} y={140} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.reliable2)}
      </T>

      {/* ---- the cost ---- */}
      <Rect x={404} y={52} width={180} height={66} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <T x={494} y={76} fontFamily={D.monoBold} fontSize={15} fill={D.ink} textAnchor="middle">
        1,000–10,000
      </T>
      <T x={494} y={98} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.perLogical)}
      </T>

      <Rect x={404} y={130} width={180} height={66} fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      <T x={494} y={152} fontFamily={D.sansBold} fontSize={11.5} fill={D.ink} textAnchor="middle">
        {t(L.checksAsk)}
      </T>
      <T x={494} y={170} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.checkYes)}
      </T>
      <T x={494} y={187} fontFamily={D.sans} fontSize={11.5} fill={D.muted} textAnchor="middle">
        {t(L.checkNo)}
      </T>

      <T x={300} y={234} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
