/* =========================================================================
   Course diagram registry (mobile)
   Lessons in /data/curriculum.js reference diagrams by string key, the same
   indirection the shared data layer uses for icons — a data file can't hold
   component references from either platform's rendering library.

   Keep the keys identical to the web registry
   (src/education/diagrams/index.jsx). A key present there but missing here
   renders nothing rather than throwing, so the two can drift temporarily
   without breaking a lesson.
   ========================================================================= */

import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { colors, space, shadow } from "../../theme";
import { useLanguage } from "../../i18n/LanguageContext";

import ClassicalVsQuantum, { VIEW_BOX as VB_CLASSICAL } from "./ClassicalVsQuantum";
import SuperpositionCoin, { VIEW_BOX as VB_SUPERPOSITION } from "./SuperpositionCoin";
import MeasurementCollapse, { VIEW_BOX as VB_MEASUREMENT } from "./MeasurementCollapse";
import EntangledPair, { VIEW_BOX as VB_ENTANGLED } from "./EntangledPair";
import GateOperations, { VIEW_BOX as VB_GATES } from "./GateOperations";
import CircuitDiagram, { VIEW_BOX as VB_CIRCUIT } from "./CircuitDiagram";
import GroverAmplitude, { VIEW_BOX as VB_GROVER } from "./GroverAmplitude";
import AdvantageDomains, { VIEW_BOX as VB_ADVANTAGE } from "./AdvantageDomains";
import QubitHardware, { VIEW_BOX as VB_HARDWARE } from "./QubitHardware";
import ErrorCorrection, { VIEW_BOX as VB_ERROR } from "./ErrorCorrection";
import EncryptionLock, { VIEW_BOX as VB_ENCRYPTION } from "./EncryptionLock";

export const DIAGRAM_REGISTRY = {
  classicalVsQuantum: { Component: ClassicalVsQuantum, viewBox: VB_CLASSICAL },
  superpositionCoin: { Component: SuperpositionCoin, viewBox: VB_SUPERPOSITION },
  measurementCollapse: { Component: MeasurementCollapse, viewBox: VB_MEASUREMENT },
  entangledPair: { Component: EntangledPair, viewBox: VB_ENTANGLED },
  gateOperations: { Component: GateOperations, viewBox: VB_GATES },
  circuitDiagram: { Component: CircuitDiagram, viewBox: VB_CIRCUIT },
  groverAmplitude: { Component: GroverAmplitude, viewBox: VB_GROVER },
  advantageDomains: { Component: AdvantageDomains, viewBox: VB_ADVANTAGE },
  qubitHardware: { Component: QubitHardware, viewBox: VB_HARDWARE },
  errorCorrection: { Component: ErrorCorrection, viewBox: VB_ERROR },
  encryptionLock: { Component: EncryptionLock, viewBox: VB_ENCRYPTION },
};

/* Accessible descriptions, kept alongside the artwork rather than in the
   shared data layer because they describe this platform's drawings. Read
   aloud by TalkBack/VoiceOver in place of the image. */
const DIAGRAM_LABELS = {
  classicalVsQuantum: {
    en: "A classical bit holds exactly one value; a qubit holds both 0 and 1 at once.",
    es: "Un bit clásico contiene exactamente un valor; un qubit contiene 0 y 1 a la vez.",
  },
  superpositionCoin: {
    en: "A spinning coin showing both faces at once, with bars showing how the blend sets the odds.",
    es: "Una moneda girando que muestra ambas caras a la vez, con barras que muestran cómo la mezcla fija las probabilidades.",
  },
  measurementCollapse: {
    en: "A blended qubit passes through a measurement and becomes a single definite bit; the blend is destroyed.",
    es: "Un qubit mezclado pasa por una medición y se convierte en un solo bit definido; la mezcla se destruye.",
  },
  entangledPair: {
    en: "Two linked qubits at a distance always show opposite results, but no message travels between them.",
    es: "Dos qubits vinculados a distancia siempre muestran resultados opuestos, pero ningún mensaje viaja entre ellos.",
  },
  gateOperations: {
    en: "Three gates: X flips a qubit, Hadamard creates superposition, and CNOT links two qubits together.",
    es: "Tres compuertas: X invierte un qubit, Hadamard crea superposición y CNOT vincula dos qubits.",
  },
  circuitDiagram: {
    en: "The Bell state circuit: a Hadamard gate, then a CNOT, then measurement, producing only 00 or 11.",
    es: "El circuito del estado de Bell: una compuerta Hadamard, luego una CNOT, luego medición, produciendo solo 00 u 11.",
  },
  groverAmplitude: {
    en: "Bar charts across three rounds showing the correct answer growing while the others shrink.",
    es: "Gráficos de barras en tres rondas que muestran la respuesta correcta creciendo mientras las demás se encogen.",
  },
  advantageDomains: {
    en: "A short list of problems where quantum may win, beside a longer list where classical computers stay better.",
    es: "Una lista corta de problemas donde lo cuántico puede ganar, junto a una lista más larga donde las computadoras clásicas siguen siendo mejores.",
  },
  qubitHardware: {
    en: "Three qubit technologies compared: superconducting, trapped ion, and photonic.",
    es: "Tres tecnologías de qubits comparadas: superconductora, de iones atrapados y fotónica.",
  },
  errorCorrection: {
    en: "Thousands of physical qubits combine to protect a single reliable logical qubit.",
    es: "Miles de qubits físicos se combinan para proteger un único qubit lógico confiable.",
  },
  encryptionLock: {
    en: "Symmetric encryption survives quantum attack with a longer key; asymmetric encryption does not survive.",
    es: "El cifrado simétrico sobrevive al ataque cuántico con una clave más larga; el cifrado asimétrico no sobrevive.",
  },
};

/* Pulls the width/height out of a "0 0 W H" viewBox string so the drawing
   can be scaled to the screen while keeping its proportions. */
function parseViewBox(viewBox) {
  const parts = String(viewBox).trim().split(/\s+/).map(Number);
  return { w: parts[2] || 600, h: parts[3] || 250 };
}

/* Renders one diagram by key, framed to match the app's bordered cards.
   Unknown keys render nothing at all — never a broken box.

   These drawings are dense and were laid out for a wide canvas, so on a
   phone they're scaled down to the content width rather than reflowed. */
export default function Diagram({ name, contentWidth }) {
  const { t } = useLanguage();
  /* Hooks must run before any early return, so this sits above the
     unknown-key check even though it isn't always used. */
  const { width: screenWidth } = useWindowDimensions();

  const entry = DIAGRAM_REGISTRY[name];
  if (!entry) return null;

  const { Component, viewBox } = entry;
  const { w, h } = parseViewBox(viewBox);

  const outerWidth = contentWidth || Math.max(0, screenWidth - 40);
  const innerWidth = Math.max(0, outerWidth - CARD_INSET);
  const innerHeight = Math.round((innerWidth * h) / w);

  const label = DIAGRAM_LABELS[name] ? t(DIAGRAM_LABELS[name]) : undefined;

  return (
    <View
      style={[styles.frame, { width: outerWidth }, shadow(1)]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
    >
      <Component width={innerWidth} height={innerHeight} t={t} />
    </View>
  );
}

/* 2px border either side + padding either side. */
const CARD_PADDING = 10;
const CARD_INSET = (2 + CARD_PADDING) * 2;

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    padding: CARD_PADDING,
    marginTop: space.lg,
    marginBottom: space.lg,
  },
});
