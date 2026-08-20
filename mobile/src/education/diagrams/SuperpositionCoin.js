import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* The spinning coin: while in the air it is genuinely both faces, and the
   balance of the blend sets the odds you'll see on landing. */

const L = {
  spinning: { en: "WHILE IT SPINS", es: "MIENTRAS GIRA" },
  notHidden: { en: "Not hidden. Undecided.", es: "No oculto. Sin decidir." },
  odds: { en: "THE BLEND SETS THE ODDS", es: "LA MEZCLA FIJA LAS PROBABILIDADES" },
  line1: {
    en: "A qubit can lean any way you like.",
    es: "Un qubit puede inclinarse como quiera.",
  },
  line2: { en: "The lean itself is information", es: "La inclinación misma es información" },
  line3: { en: "the machine computes with.", es: "con la que calcula la máquina." },
};

export const VIEW_BOX = "0 0 600 250";

export default function SuperpositionCoin({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      <T x={30} y={30} fontFamily={D.monoBold} fontSize={13} fill={D.rust}>
        {t(L.spinning)}
      </T>

      {/* motion arcs */}
      <Path d="M 92 60 A 70 70 0 0 1 92 176" fill="none" stroke={D.ink} strokeWidth={2} strokeDasharray={[6, 8]} opacity={0.5} />
      <Path d="M 208 176 A 70 70 0 0 1 208 60" fill="none" stroke={D.ink} strokeWidth={2} strokeDasharray={[6, 8]} opacity={0.5} />

      {/* the coin, split into both faces at once */}
      <Path d="M 150 60 A 58 58 0 0 0 150 176 Z" fill={D.blue} fillOpacity={0.85} />
      <Path d="M 150 60 A 58 58 0 0 1 150 176 Z" fill={D.gold} fillOpacity={0.9} />
      <Line x1={150} y1={60} x2={150} y2={176} stroke={D.ink} strokeWidth={1.5} strokeDasharray={[5, 5]} />
      <Circle cx={150} cy={118} r={58} fill="none" stroke={D.ink} strokeWidth={STROKE} />

      <T x={118} y={128} fontFamily={D.monoBold} fontSize={30} fill={D.white} textAnchor="middle">
        0
      </T>
      <T x={182} y={128} fontFamily={D.monoBold} fontSize={30} fill={D.ink} textAnchor="middle">
        1
      </T>

      <Circle cx={150} cy={60} r={7} fill={D.gold} stroke={D.ink} strokeWidth={2} />
      <Circle cx={150} cy={176} r={7} fill={D.gold} stroke={D.ink} strokeWidth={2} />

      <T x={150} y={212} fontFamily={D.sansBold} fontSize={14} fill={D.ink} textAnchor="middle">
        {t(L.notHidden)}
      </T>

      {/* ---- the odds ---- */}
      <T x={320} y={30} fontFamily={D.monoBold} fontSize={11} fill={D.rust}>
        {t(L.odds)}
      </T>

      <Rect x={320} y={52} width={125} height={38} fill={D.blue} fillOpacity={0.85} />
      <Rect x={320} y={52} width={250} height={38} fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <T x={382} y={77} fontFamily={D.monoBold} fontSize={14} fill={D.white} textAnchor="middle">
        0 · 50%
      </T>
      <T x={508} y={77} fontFamily={D.monoBold} fontSize={14} fill={D.ink} textAnchor="middle">
        1 · 50%
      </T>

      <Rect x={320} y={106} width={63} height={38} fill={D.blue} fillOpacity={0.85} />
      <Rect x={320} y={106} width={250} height={38} fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <T x={351} y={131} fontFamily={D.monoBold} fontSize={12} fill={D.white} textAnchor="middle">
        25%
      </T>
      <T x={477} y={131} fontFamily={D.monoBold} fontSize={14} fill={D.ink} textAnchor="middle">
        1 · 75%
      </T>

      <T x={320} y={178} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.line1)}
      </T>
      <T x={320} y={199} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.line2)}
      </T>
      <T x={320} y={220} fontFamily={D.sans} fontSize={13} fill={D.muted}>
        {t(L.line3)}
      </T>
    </Svg>
  );
}
