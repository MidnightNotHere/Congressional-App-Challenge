import React from "react";
import Svg, { Rect, Circle, G, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* Where quantum computers are expected to win, and the much larger set of
   tasks where classical machines stay the right tool. */

const L = {
  quantumWins: { en: "QUANTUM MAY WIN", es: "LO CUÁNTICO PUEDE GANAR" },
  classicalWins: { en: "CLASSICAL STAYS BETTER", es: "LO CLÁSICO SIGUE MEJOR" },
  narrow: { en: "A NARROW LIST", es: "UNA LISTA CORTA" },
  caption: {
    en: "A quantum computer is a specialist instrument, not a faster laptop.",
    es: "Una computadora cuántica es un instrumento especializado, no una laptop rápida.",
  },
};

const QUANTUM = [
  { en: "Simulating molecules", es: "Simular moléculas" },
  { en: "Materials & battery chemistry", es: "Materiales y baterías" },
  { en: "Certain optimization problems", es: "Ciertos problemas de optimización" },
  { en: "Breaking / building cryptography", es: "Romper o construir criptografía" },
];

const CLASSICAL = [
  { en: "Email, browsing, messaging", es: "Correo, navegación, mensajería" },
  { en: "Databases & spreadsheets", es: "Bases de datos y hojas de cálculo" },
  { en: "Graphics & video", es: "Gráficos y video" },
  { en: "Everyday AI models", es: "Modelos de IA cotidianos" },
  { en: "Essentially all other software", es: "Prácticamente todo el software" },
];

export const VIEW_BOX = "0 0 600 260";

export default function AdvantageDomains({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ================= quantum wins ================= */}
      <Rect x={16} y={20} width={272} height={200} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />
      <Rect x={16} y={20} width={272} height={34} fill={D.blue} />
      <T x={152} y={43} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.quantumWins)}
      </T>
      {QUANTUM.map((item, i) => (
        <G key={item.en}>
          <Circle cx={42} cy={80 + i * 32} r={6} fill={D.gold} stroke={D.ink} strokeWidth={2} />
          <T x={60} y={85 + i * 32} fontFamily={D.sans} fontSize={12} fill={D.ink}>
            {t(item)}
          </T>
        </G>
      ))}
      <T x={42} y={204} fontFamily={D.monoBold} fontSize={9.5} fill={D.rust}>
        {t(L.narrow)}
      </T>

      {/* ================= classical wins ================= */}
      <Rect x={312} y={20} width={272} height={200} fill={D.cream} stroke={D.ink} strokeWidth={STROKE} />
      <Rect x={312} y={20} width={272} height={34} fill={D.ink} />
      <T x={448} y={43} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.classicalWins)}
      </T>
      {CLASSICAL.map((item, i) => (
        <G key={item.en}>
          <Circle cx={338} cy={78 + i * 28} r={6} fill={D.white} stroke={D.ink} strokeWidth={2} />
          <T x={356} y={83 + i * 28} fontFamily={D.sans} fontSize={12} fill={D.muted}>
            {t(item)}
          </T>
        </G>
      ))}

      <T x={300} y={246} fontFamily={D.sans} fontSize={12.5} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
