import React from "react";
import Svg, { Rect, Line, Circle, Path, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

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

export const VIEW_BOX = "0 0 600 230";

export default function MeasurementCollapse({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ---- stage 1: superposition ---- */}
      <T x={20} y={28} fontFamily={D.monoBold} fontSize={12} fill={D.rust}>
        {t(L.before)}
      </T>
      <Path d="M 82 52 A 48 48 0 0 0 82 148 Z" fill={D.blue} fillOpacity={0.85} />
      <Path d="M 82 52 A 48 48 0 0 1 82 148 Z" fill={D.gold} fillOpacity={0.9} />
      <Line x1={82} y1={52} x2={82} y2={148} stroke={D.ink} strokeWidth={1.5} strokeDasharray={[5, 5]} />
      <Circle cx={82} cy={100} r={48} fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <T x={57} y={109} fontFamily={D.monoBold} fontSize={24} fill={D.white} textAnchor="middle">
        0
      </T>
      <T x={107} y={109} fontFamily={D.monoBold} fontSize={24} fill={D.ink} textAnchor="middle">
        1
      </T>
      <T x={82} y={176} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.both)}
      </T>

      {/* arrow */}
      <Line x1={142} y1={100} x2={196} y2={100} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 196 100 l -11 -7 v 14 z" fill={D.ink} />

      {/* ---- stage 2: the measurement ---- */}
      <T x={212} y={28} fontFamily={D.monoBold} fontSize={12} fill={D.rust}>
        {t(L.measure)}
      </T>
      <Rect x={212} y={60} width={110} height={80} fill={D.gold} stroke={D.ink} strokeWidth={STROKE} />
      {/* meter dial */}
      <Path d="M 240 118 A 27 27 0 0 1 294 118" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <Line x1={267} y1={118} x2={284} y2={98} stroke={D.ink} strokeWidth={STROKE} strokeLinecap="round" />
      <Circle cx={267} cy={118} r={4.5} fill={D.ink} />
      <T x={267} y={176} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.youLook)}
      </T>

      {/* arrow */}
      <Line x1={336} y1={100} x2={390} y2={100} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 390 100 l -11 -7 v 14 z" fill={D.ink} />

      {/* ---- stage 3: collapsed ---- */}
      <T x={406} y={28} fontFamily={D.monoBold} fontSize={12} fill={D.rust}>
        {t(L.after)}
      </T>
      <Circle cx={468} cy={100} r={48} fill={D.blue} stroke={D.ink} strokeWidth={STROKE} />
      <T x={468} y={114} fontFamily={D.monoBold} fontSize={38} fill={D.white} textAnchor="middle">
        0
      </T>
      <T x={468} y={176} fontFamily={D.sansBold} fontSize={13} fill={D.ink} textAnchor="middle">
        {t(L.onePlain)}
      </T>

      {/* the blend is gone */}
      <T x={528} y={96} fontFamily={D.monoBold} fontSize={11} fill={D.red}>
        {t(L.gone1)}
      </T>
      <T x={528} y={112} fontFamily={D.monoBold} fontSize={11} fill={D.red}>
        {t(L.gone2)}
      </T>

      <T x={300} y={212} fontFamily={D.sans} fontSize={13} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
