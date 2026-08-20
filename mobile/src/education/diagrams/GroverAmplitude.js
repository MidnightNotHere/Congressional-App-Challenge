import React from "react";
import Svg, { Rect, Line, Path, G, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* Grover's amplification, three snapshots: every candidate starts level,
   the marked one grows each round until it dominates the measurement. */

const L = {
  start: { en: "START", es: "INICIO" },
  midway: { en: "AFTER A FEW ROUNDS", es: "TRAS VARIAS RONDAS" },
  optimum: { en: "AT THE OPTIMUM", es: "EN EL ÓPTIMO" },
  allEqual: { en: "All equal", es: "Todas iguales" },
  onePulls: { en: "One pulls ahead", es: "Una se adelanta" },
  measureNow: { en: "Measure it now", es: "Mídala ahora" },
  answer: { en: "ANSWER", es: "RESPUESTA" },
  caption: {
    en: "Keep going past the optimum and the answer shrinks again — the rotation overshoots.",
    es: "Si sigue más allá del óptimo, la respuesta se encoge otra vez: la rotación se pasa.",
  },
};

const BASE = 190; // y of the baseline all bars sit on
const BAR_W = 20;
const GAP = 9;
const MARKED = 2; // index of the answer being amplified

export const VIEW_BOX = "0 0 600 250";

export default function GroverAmplitude({ width, height, t }) {
  const panels = [
    { x: 20, label: t(L.start), caption: t(L.allEqual), bars: [40, 40, 40, 40, 40, 40] },
    { x: 215, label: t(L.midway), caption: t(L.onePulls), bars: [30, 30, 72, 30, 30, 30] },
    { x: 410, label: t(L.optimum), caption: t(L.measureNow), bars: [10, 10, 118, 10, 10, 10] },
  ];

  const markerX = panels[0].x + MARKED * (BAR_W + GAP) + BAR_W / 2;

  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {panels.map((panel) => (
        <G key={panel.label}>
          <T x={panel.x} y={26} fontFamily={D.monoBold} fontSize={10} fill={D.rust}>
            {panel.label}
          </T>

          {panel.bars.map((h, i) => {
            const isMarked = i === MARKED;
            return (
              <Rect
                key={i}
                x={panel.x + i * (BAR_W + GAP)}
                y={BASE - h}
                width={BAR_W}
                height={h}
                fill={isMarked ? D.gold : D.blue}
                fillOpacity={isMarked ? 1 : 0.35}
                stroke={D.ink}
                strokeWidth={2}
              />
            );
          })}

          {/* baseline */}
          <Line
            x1={panel.x - 4}
            y1={BASE}
            x2={panel.x + 6 * (BAR_W + GAP) - GAP + 4}
            y2={BASE}
            stroke={D.ink}
            strokeWidth={STROKE}
          />

          <T x={panel.x} y={212} fontFamily={D.sansBold} fontSize={12.5} fill={D.ink}>
            {panel.caption}
          </T>
        </G>
      ))}

      {/* marker showing which bar is the answer */}
      <T x={markerX} y={BASE - 48} fontFamily={D.monoBold} fontSize={9.5} fill={D.rust} textAnchor="middle">
        {t(L.answer)}
      </T>
      <Line x1={markerX} y1={BASE - 44} x2={markerX} y2={BASE - 30} stroke={D.rust} strokeWidth={2} />
      <Path d={`M ${markerX} ${BASE - 28} l -5 -8 h 10 z`} fill={D.rust} />

      <T x={300} y={240} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
