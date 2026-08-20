import React from "react";
import Svg, { Rect, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

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

const LINK = "M 128 100 q 34 -26 68 0 q 34 26 68 0 q 34 -26 68 0 q 34 26 68 0";

export const VIEW_BOX = "0 0 600 250";

export default function EntangledPair({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ---- the link ---- */}
      <Path d={LINK} fill="none" stroke={D.gold} strokeWidth={4} />
      <Path d={LINK} fill="none" stroke={D.ink} strokeWidth={1.5} strokeDasharray={[4, 6]} />

      {/* ---- left qubit ---- */}
      <T x={30} y={34} fontFamily={D.monoBold} fontSize={12} fill={D.rust}>
        {t(L.here)}
      </T>
      <Circle cx={80} cy={100} r={46} fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <T x={80} y={114} fontFamily={D.monoBold} fontSize={34} fill={D.white} textAnchor="middle">
        0
      </T>
      <T x={80} y={172} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.youMeasure)}
      </T>

      {/* ---- right qubit ---- */}
      <T x={486} y={34} fontFamily={D.monoBold} fontSize={12} fill={D.rust}>
        {t(L.tokyo)}
      </T>
      <Circle cx={520} cy={100} r={46} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <T x={520} y={114} fontFamily={D.monoBold} fontSize={34} fill={D.ink} textAnchor="middle">
        1
      </T>
      <T x={520} y={172} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.opposite)}
      </T>

      {/* ---- the caveat ---- */}
      <Rect x={140} y={192} width={320} height={44} fill={D.white} stroke={D.red} strokeWidth={STROKE} />
      <T x={300} y={212} fontFamily={D.monoBold} fontSize={11} fill={D.red} textAnchor="middle">
        {t(L.noMessage)}
      </T>
      <T x={300} y={228} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.random)}
      </T>

      <T x={300} y={60} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.joint)}
      </T>
    </Svg>
  );
}
