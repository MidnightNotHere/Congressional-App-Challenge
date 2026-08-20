import React from "react";
import Svg, { Rect, Line, Circle, Path, G, Text as T } from "react-native-svg";
import { D, STROKE } from "./tokens";

/* The two kinds of encryption and how unevenly quantum computing threatens
   them: symmetric survives with a longer key, asymmetric does not survive. */

const L = {
  symTitle: {
    en: "SYMMETRIC — ONE SHARED KEY (AES)",
    es: "SIMÉTRICO — UNA CLAVE COMPARTIDA (AES)",
  },
  symLocks: { en: "same key locks", es: "la misma clave cierra" },
  symUnlocks: { en: "and unlocks", es: "y abre" },
  survives: { en: "SURVIVES", es: "SOBREVIVE" },
  survives1: { en: "Grover halves it —", es: "Grover la reduce a la" },
  survives2: { en: "so double the key.", es: "mitad: duplique la clave." },
  asymTitle: {
    en: "ASYMMETRIC — PUBLIC + PRIVATE PAIR (RSA)",
    es: "ASIMÉTRICO — PAR PÚBLICA + PRIVADA (RSA)",
  },
  asymLocks: { en: "public key locks", es: "la pública cierra" },
  asymUnlocks: { en: "private key unlocks", es: "la privada abre" },
  breaks: { en: "BREAKS", es: "SE ROMPE" },
  breaks1: { en: "Shor factors it. No", es: "Shor la factoriza. Ninguna" },
  breaks2: { en: "key length helps.", es: "clave larga ayuda." },
  caption: {
    en: "Your browser uses both — the asymmetric handshake is the vulnerable step.",
    es: "Su navegador usa ambos: el saludo asimétrico es el paso vulnerable.",
  },
};

/* A key: round bow plus a toothed shaft. */
function Key({ x, y, fill }) {
  return (
    <G x={x} y={y}>
      <Circle cx={12} cy={14} r={11} fill={fill} stroke={D.ink} strokeWidth={2} />
      <Line x1={23} y1={14} x2={46} y2={14} stroke={D.ink} strokeWidth={STROKE} />
      <Line x1={40} y1={14} x2={40} y2={22} stroke={D.ink} strokeWidth={STROKE} />
    </G>
  );
}

/* A padlock: body plus shackle. */
function Padlock({ x, y, fill }) {
  return (
    <G x={x} y={y}>
      <Rect width={46} height={44} fill={fill} stroke={D.ink} strokeWidth={STROKE} />
      <Path d="M 13 0 v -9 a 10 10 0 0 1 20 0 v 9" fill="none" stroke={D.ink} strokeWidth={STROKE} />
      <Circle cx={23} cy={22} r={5} fill={D.white} />
    </G>
  );
}

export const VIEW_BOX = "0 0 600 270";

export default function EncryptionLock({ width, height, t }) {
  return (
    <Svg width={width} height={height} viewBox={VIEW_BOX}>
      {/* ================= symmetric ================= */}
      <T x={20} y={26} fontFamily={D.monoBold} fontSize={10.5} fill={D.rust}>
        {t(L.symTitle)}
      </T>
      <Rect x={20} y={38} width={386} height={76} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />

      <Key x={56} y={62} fill={D.gold} />
      <Padlock x={176} y={54} fill={D.green} />
      <Key x={292} y={62} fill={D.gold} />

      <T x={120} y={106} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        {t(L.symLocks)}
      </T>
      <T x={330} y={106} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        {t(L.symUnlocks)}
      </T>

      <Rect x={418} y={38} width={166} height={76} fill={D.green} stroke={D.ink} strokeWidth={STROKE} />
      <T x={501} y={62} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.survives)}
      </T>
      <T x={501} y={82} fontFamily={D.sans} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.survives1)}
      </T>
      <T x={501} y={99} fontFamily={D.sans} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.survives2)}
      </T>

      {/* ================= asymmetric ================= */}
      <T x={20} y={152} fontFamily={D.monoBold} fontSize={10.5} fill={D.rust}>
        {t(L.asymTitle)}
      </T>
      <Rect x={20} y={164} width={386} height={76} fill={D.white} stroke={D.ink} strokeWidth={STROKE} />

      <Key x={56} y={188} fill={D.blue} />
      <Padlock x={176} y={180} fill={D.blue} />
      <Key x={292} y={188} fill={D.rust} />

      <T x={120} y={232} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        {t(L.asymLocks)}
      </T>
      <T x={330} y={232} fontFamily={D.sans} fontSize={11} fill={D.muted} textAnchor="middle">
        {t(L.asymUnlocks)}
      </T>

      <Rect x={418} y={164} width={166} height={76} fill={D.red} stroke={D.ink} strokeWidth={STROKE} />
      <T x={501} y={188} fontFamily={D.monoBold} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.breaks)}
      </T>
      <T x={501} y={208} fontFamily={D.sans} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.breaks1)}
      </T>
      <T x={501} y={225} fontFamily={D.sans} fontSize={11} fill={D.white} textAnchor="middle">
        {t(L.breaks2)}
      </T>

      <T x={300} y={262} fontFamily={D.sans} fontSize={12} fill={D.muted} textAnchor="middle">
        {t(L.caption)}
      </T>
    </Svg>
  );
}
