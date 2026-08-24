/* =========================================================================
   Course diagram registry
   Lessons in data/curriculum.js reference diagrams by string key (the data
   layer can't hold component references), the same indirection
   ICON_REGISTRY uses for lucide icons.

   Adding a diagram: drop a new file in this folder and add one line below.
   A key with no entry here renders nothing rather than throwing, so lesson
   prose can land before its artwork does.
   ========================================================================= */

import React from "react";
import { useLanguage } from "../../shared/uiKit.jsx";

import ClassicalVsQuantum from "./ClassicalVsQuantum.jsx";
import SuperpositionCoin from "./SuperpositionCoin.jsx";
import MeasurementCollapse from "./MeasurementCollapse.jsx";
import EntangledPair from "./EntangledPair.jsx";
import GateOperations from "./GateOperations.jsx";
import CircuitDiagram from "./CircuitDiagram.jsx";
import GroverAmplitude from "./GroverAmplitude.jsx";
import AdvantageDomains from "./AdvantageDomains.jsx";
import QubitHardware from "./QubitHardware.jsx";
import ErrorCorrection from "./ErrorCorrection.jsx";
import EncryptionLock from "./EncryptionLock.jsx";

export const DIAGRAM_REGISTRY = {
  classicalVsQuantum: ClassicalVsQuantum,
  superpositionCoin: SuperpositionCoin,
  measurementCollapse: MeasurementCollapse,
  entangledPair: EntangledPair,
  gateOperations: GateOperations,
  circuitDiagram: CircuitDiagram,
  groverAmplitude: GroverAmplitude,
  advantageDomains: AdvantageDomains,
  qubitHardware: QubitHardware,
  errorCorrection: ErrorCorrection,
  encryptionLock: EncryptionLock,
};

/* Accessible names, kept here rather than in the shared data layer because
   they describe this platform's artwork specifically. Each becomes the
   SVG's <title>, which is what a screen reader announces for role="img". */
const DIAGRAM_TITLES = {
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

/* Renders one diagram by key, framed to match the app's bordered cards.
   Unknown keys render nothing at all — never a broken box.

   Each diagram receives `t` and translates its own labels: SVG text is
   baked into the drawing, so it can't be handled by the page around it,
   and leaving it English would strand Spanish readers mid-lesson. */
export default function Diagram({ name }) {
  const { t } = useLanguage();
  const Component = DIAGRAM_REGISTRY[name];
  if (!Component) return null;

  const title = DIAGRAM_TITLES[name] ? t(DIAGRAM_TITLES[name]) : "";

  return (
    <figure className="my-8 bg-white border-2 border-[#0A0A0A] shadow-[6px_6px_0_0_#FFFFFF] p-4 sm:p-6 overflow-x-auto">
      <Component title={title} t={t} />
    </figure>
  );
}
