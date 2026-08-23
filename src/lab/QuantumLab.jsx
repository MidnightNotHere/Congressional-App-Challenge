/* =========================================================================
   Quantum4Colorado — "Try It Yourself: The Quantum Lab"
   A real quantum circuit simulator: place gates on 1-2 qubit wires, run
   the actual state-vector math in quantumEngine.js, and see a simulated
   measurement histogram, a Bloch sphere, and a plain-language explanation
   of what the circuit did. Sits inside the Youth Education section,
   between the four concept cards and the resource platform.

   Two fully-supported placement methods, per the app's accessibility
   requirements:
     1. Drag a gate tile from the palette onto a wire.
     2. Click a gate tile to arm it, then click a wire slot to place it —
        this is the keyboard/click-only path and gets equal support, not
        just a degraded fallback.
   CNOT (a two-qubit gate) needs two placement clicks regardless of which
   method starts it: the first click/drop picks the control qubit at a
   time step, the second click on the other qubit at that same time step
   finishes it — see handleCellClick below for the exact state machine.
   ========================================================================= */

import React, { useEffect, useRef, useState } from "react";
import { Beaker, Play, RotateCcw, Trash2 } from "lucide-react";
import { QuantumLine, SectionLabel, useLanguage, C } from "../shared/uiKit.jsx";
import {
  runCircuit,
  getProbabilities,
  simulateShots,
  getBlochVector,
} from "./quantumEngine.js";
import { generateExplanation } from "./explanations.js";
import Histogram from "./Histogram.jsx";
import BlochSphere from "./BlochSphere.jsx";

/* ------------------------------- Layout constants -------------------------- */
const LABEL_W = 92;
const CELL_W = 66;
const CELL_H = 66;
const NUM_STEPS = 5;
const NUM_SHOTS = 1000;

let idCounter = 0;
const uid = () => `gate-${idCounter++}`;

const GATE_DEFS = [
  { type: "H", short: "H", name: { en: "Hadamard", es: "Hadamard" } },
  { type: "X", short: "X", name: { en: "Pauli-X", es: "Pauli-X" } },
  { type: "Y", short: "Y", name: { en: "Pauli-Y", es: "Pauli-Y" } },
  { type: "Z", short: "Z", name: { en: "Pauli-Z", es: "Pauli-Z" } },
  { type: "CNOT", short: "CNOT", name: { en: "CNOT", es: "CNOT" } },
];

const UI = {
  sectionLabel: { en: "Try It Yourself", es: "Pruébelo Usted Mismo" },
  heading: { en: "The Quantum Lab", es: "El Laboratorio Cuántico" },
  intro: {
    en: "This is a real quantum circuit simulator running actual state-vector math underneath — not a mockup. Place gates on the wires below, press Run, and see exactly what happens when you measure the result.",
    es: "Este es un simulador de circuitos cuánticos real, con matemática de vectores de estado real por debajo, no una simulación de apariencia. Coloque compuertas en las líneas de abajo, presione Ejecutar y vea exactamente qué pasa al medir el resultado.",
  },
  presetsHeading: { en: "Not sure where to start?", es: "¿No sabe por dónde empezar?" },
  presetSuperposition: { en: "Build Superposition", es: "Construir Superposición" },
  presetEntanglement: { en: "Build Entanglement", es: "Construir Entrelazamiento" },
  presetClassical: { en: "Classical Coin Flip (Compare)", es: "Lanzamiento Clásico (Comparar)" },
  qubitModeLabel: { en: "Qubits", es: "Qubits" },
  oneQubit: { en: "1 Qubit", es: "1 Qubit" },
  twoQubits: { en: "2 Qubits", es: "2 Qubits" },
  paletteHeading: { en: "Gate Palette", es: "Paleta de Compuertas" },
  paletteHint: {
    en: "Drag a gate onto a wire, or tap a gate then tap a wire to place it.",
    es: "Arrastre una compuerta a una línea, o toque una compuerta y luego una línea para colocarla.",
  },
  cnotDisabledHint: { en: "Needs 2 qubits", es: "Requiere 2 qubits" },
  circuitHeading: { en: "Circuit", es: "Circuito" },
  qubitLabel: { en: "Qubit", es: "Qubit" },
  stepLabel: { en: "Step", es: "Paso" },
  armedStatus: {
    en: (name) => `${name} armed — tap an empty wire slot to place it.`,
    es: (name) => `${name} activada — toque una casilla vacía para colocarla.`,
  },
  cnotPendingStatus: {
    en: (qubit) => `CNOT started — tap Qubit ${qubit} at the same step to finish it.`,
    es: (qubit) => `CNOT iniciada — toque Qubit ${qubit} en el mismo paso para terminarla.`,
  },
  selectedStatus: {
    en: "Gate selected — press Delete, or the trash button below, to remove it.",
    es: "Compuerta seleccionada — presione Suprimir, o el botón de la papelera, para quitarla.",
  },
  cancelHint: { en: "Press Escape to cancel.", es: "Presione Escape para cancelar." },
  runButton: { en: "Run Circuit", es: "Ejecutar Circuito" },
  resetButton: { en: "Reset", es: "Reiniciar" },
  deleteButton: { en: "Delete Selected Gate", es: "Eliminar Compuerta Seleccionada" },
  resultsHeading: { en: "Results", es: "Resultados" },
  resultsEmptyHint: {
    en: "Press Run Circuit to see the measurement histogram, Bloch sphere, and explanation.",
    es: "Presione Ejecutar Circuito para ver el histograma de medición, la esfera de Bloch y la explicación.",
  },
  histogramHeading: { en: "Measurement Histogram", es: "Histograma de Medición" },
  blochHeading: { en: "Bloch Sphere", es: "Esfera de Bloch" },
  explanationHeading: { en: "What Just Happened", es: "Qué Acaba de Pasar" },
  shots: { en: "shots", es: "mediciones" },
  shotsRun: { en: `${NUM_SHOTS} simulated measurements.`, es: `${NUM_SHOTS} mediciones simuladas.` },
  qubitLabelShort: { en: "Qubit", es: "Qubit" },
  vectorLength: { en: "Vector length:", es: "Longitud del vector:" },
  entangledShort: { en: "entangled with the other qubit", es: "entrelazado con el otro qubit" },
  blochAriaLabel: {
    en: (label, x, y, z) =>
      `Bloch sphere for Qubit ${label}. Vector at x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}.`,
    es: (label, x, y, z) =>
      `Esfera de Bloch para Qubit ${label}. Vector en x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}.`,
  },
  categoryBadge: {
    empty: { en: "Definite State", es: "Estado Definido" },
    superposition: { en: "Superposition", es: "Superposición" },
    entanglement: { en: "Entanglement", es: "Entrelazamiento" },
    classicalFlip: { en: "Classical Bit Flip", es: "Cambio de Bit Clásico" },
    generic: { en: "Custom Circuit", es: "Circuito Personalizado" },
  },
  emptyCellLabel: {
    en: (qubit, step) => `Qubit ${qubit}, step ${step}, empty`,
    es: (qubit, step) => `Qubit ${qubit}, paso ${step}, vacío`,
  },
  gateCellLabel: {
    en: (qubit, step, gateName) => `Qubit ${qubit}, step ${step}, ${gateName} — tap to select`,
    es: (qubit, step, gateName) => `Qubit ${qubit}, paso ${step}, ${gateName} — toque para seleccionar`,
  },
};

const GATE_ARM_LABEL = {
  H: { en: "Hadamard", es: "Hadamard" },
  X: { en: "Pauli-X", es: "Pauli-X" },
  Y: { en: "Pauli-Y", es: "Pauli-Y" },
  Z: { en: "Pauli-Z", es: "Pauli-Z" },
  CNOT: { en: "CNOT", es: "CNOT" },
};

export default function QuantumLab({ presetRequest }) {
  const { t } = useLanguage();

  const [numQubits, setNumQubits] = useState(1);
  const [circuit, setCircuit] = useState([]);
  const [armedGate, setArmedGate] = useState(null);
  const [cnotPending, setCnotPending] = useState(null); // { timeStep, controlQubit }
  const [selectedGateId, setSelectedGateId] = useState(null);
  const [dragType, setDragType] = useState(null);
  const [results, setResults] = useState(null);
  const [pulsing, setPulsing] = useState(false);
  const [scrollToken, setScrollToken] = useState(0);

  const circuitRef = useRef(null);
  const resultsRef = useRef(null);
  const lastPresetNonce = useRef(null);

  /* Scrolling to the circuit after a preset loads is done via an effect,
     not requestAnimationFrame, on purpose: rAF is tied to the browser's
     paint loop and browsers legitimately suspend it for a backgrounded or
     hidden tab, which would silently drop the scroll. A commit-phase
     effect runs regardless of tab visibility. */
  useEffect(() => {
    if (scrollToken === 0) return; // skip on mount
    circuitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [scrollToken]);

  /* -------------------------------- helpers -------------------------------- */

  const isCellOccupied = (qubit, timeStep) =>
    circuit.some((op) =>
      op.timeStep !== timeStep
        ? false
        : op.type === "CNOT"
        ? op.control === qubit || op.target === qubit
        : op.qubit === qubit
    );

  const getGateAt = (qubit, timeStep) =>
    circuit.find((op) =>
      op.timeStep !== timeStep
        ? false
        : op.type === "CNOT"
        ? op.control === qubit || op.target === qubit
        : op.qubit === qubit
    ) || null;

  const isValidCnotAnchor = (timeStep) =>
    numQubits === 2 && !isCellOccupied(0, timeStep) && !isCellOccupied(1, timeStep);

  const clearInteractionState = () => {
    setArmedGate(null);
    setCnotPending(null);
    setSelectedGateId(null);
  };

  /* --------------------------------- actions -------------------------------- */

  const placeSingleGate = (type, qubit, timeStep) => {
    setCircuit((prev) => [...prev, { id: uid(), type, qubit, timeStep }]);
    setArmedGate(null);
    setResults(null);
  };

  const finalizeCnot = (targetQubit, timeStep) => {
    setCircuit((prev) => [
      ...prev,
      { id: uid(), type: "CNOT", control: cnotPending.controlQubit, target: targetQubit, timeStep },
    ]);
    setCnotPending(null);
    setArmedGate(null);
    setResults(null);
  };

  const handleCellClick = (qubit, timeStep) => {
    if (cnotPending) {
      const validTarget =
        timeStep === cnotPending.timeStep &&
        qubit !== cnotPending.controlQubit &&
        !isCellOccupied(qubit, timeStep);
      if (validTarget) finalizeCnot(qubit, timeStep);
      else clearInteractionState(); // any other click backs out cleanly
      return;
    }

    if (armedGate) {
      if (armedGate === "CNOT") {
        if (isValidCnotAnchor(timeStep)) setCnotPending({ timeStep, controlQubit: qubit });
        return;
      }
      if (!isCellOccupied(qubit, timeStep)) placeSingleGate(armedGate, qubit, timeStep);
      return;
    }

    const existing = getGateAt(qubit, timeStep);
    if (existing) setSelectedGateId((id) => (id === existing.id ? null : existing.id));
  };

  const handleDrop = (e, qubit, timeStep) => {
    e.preventDefault();
    setDragType(null);
    const type = e.dataTransfer.getData("text/plain");
    if (!type) return;

    if (type === "CNOT") {
      if (isValidCnotAnchor(timeStep) && !isCellOccupied(qubit, timeStep)) {
        setCnotPending({ timeStep, controlQubit: qubit });
      }
      return;
    }
    if (!isCellOccupied(qubit, timeStep)) placeSingleGate(type, qubit, timeStep);
  };

  const handleDeleteSelected = () => {
    if (!selectedGateId) return;
    setCircuit((prev) => prev.filter((op) => op.id !== selectedGateId));
    setSelectedGateId(null);
    setResults(null);
  };

  const handleSetNumQubits = (n) => {
    if (n === numQubits) return;
    if (n === 1) {
      setCircuit((prev) => prev.filter((op) => op.type !== "CNOT" && op.qubit !== 1));
    }
    setNumQubits(n);
    setResults(null);
    clearInteractionState();
  };

  const handleReset = () => {
    setCircuit([]);
    setResults(null);
    clearInteractionState();
  };

  const handleRun = () => {
    const { finalState } = runCircuit(circuit, numQubits);
    const probabilities = getProbabilities(finalState);
    const shotCounts = simulateShots(probabilities, NUM_SHOTS);
    const blochVectors = Array.from({ length: numQubits }, (_, i) =>
      getBlochVector(finalState, i, numQubits)
    );
    const explanation = generateExplanation(circuit, numQubits, blochVectors);
    setResults({ probabilities, shotCounts, blochVectors, explanation });
  };

  /* Same reasoning as the circuit-scroll effect above: an effect, not
     requestAnimationFrame, so it isn't silently dropped in a backgrounded
     tab. Fires whenever a run produces a fresh results object. */
  useEffect(() => {
    if (!results) return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [results]);

  const applyPreset = (name) => {
    if (name === "superposition") {
      setNumQubits(1);
      setCircuit([{ id: uid(), type: "H", qubit: 0, timeStep: 0 }]);
    } else if (name === "entanglement") {
      setNumQubits(2);
      setCircuit([
        { id: uid(), type: "H", qubit: 0, timeStep: 0 },
        { id: uid(), type: "CNOT", control: 0, target: 1, timeStep: 1 },
      ]);
    } else if (name === "classicalFlip") {
      setNumQubits(1);
      setCircuit([{ id: uid(), type: "X", qubit: 0, timeStep: 0 }]);
    }
    setResults(null);
    clearInteractionState();

    setScrollToken((n) => n + 1);
    setPulsing(true);
    setTimeout(() => setPulsing(false), 1400);
  };

  /* Listens for a preset request from the concept cards above (Superposition
     / Entanglement "Try It Yourself" links). A nonce distinguishes a fresh
     click from a stale prop on remount, so clicking the same card twice in
     a row still re-triggers the preset. */
  useEffect(() => {
    if (!presetRequest) return;
    if (presetRequest.nonce === lastPresetNonce.current) return;
    lastPresetNonce.current = presetRequest.nonce;
    applyPreset(presetRequest.preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetRequest]);

  /* Delete/Backspace removes a selected gate; Escape backs out of arming
     or a pending CNOT. Re-registered whenever the relevant state changes
     so the handler always closes over the current values. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedGateId) {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === "Escape") {
        clearInteractionState();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGateId, cnotPending, armedGate]);

  /* ---------------------------------- render --------------------------------- */

  const statusMessage = (() => {
    if (cnotPending) {
      return `${t(UI.cnotPendingStatus)(cnotPending.controlQubit === 0 ? 2 : 1)} ${t(UI.cancelHint)}`;
    }
    if (armedGate) {
      const name = t(GATE_ARM_LABEL[armedGate]);
      return `${t(UI.armedStatus)(name)} ${t(UI.cancelHint)}`;
    }
    if (selectedGateId) return t(UI.selectedStatus);
    return null;
  })();

  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-2">
        <QuantumLine />
      </div>

      <div className="mt-10">
        <div className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 bg-[#1A1AE5]/10 border-2 border-[#0A0A0A]">
            <Beaker className="w-5 h-5 text-[#1A1AE5]" aria-hidden="true" />
          </span>
          <div>
            <SectionLabel>{t(UI.sectionLabel)}</SectionLabel>
            <h3 className="font-display font-black tracking-tight text-2xl text-[#0A0A0A]">
              {t(UI.heading)}
            </h3>
          </div>
        </div>
        <p className="mt-3 text-[#2B2B2B] max-w-2xl leading-relaxed">{t(UI.intro)}</p>

        {/* ------------------------------- presets ------------------------------- */}
        <div className="mt-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C42B00] mb-3">
            {t(UI.presetsHeading)}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => applyPreset("superposition")}
              className="bg-white hover:bg-[#F2EFE4] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold text-sm px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
            >
              {t(UI.presetSuperposition)}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("entanglement")}
              className="bg-white hover:bg-[#F2EFE4] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold text-sm px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
            >
              {t(UI.presetEntanglement)}
            </button>
            <button
              type="button"
              onClick={() => applyPreset("classicalFlip")}
              className="bg-white hover:bg-[#F2EFE4] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold text-sm px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
            >
              {t(UI.presetClassical)}
            </button>
          </div>
        </div>

        {/* ---------------------------- qubit mode toggle ---------------------------- */}
        <div className="mt-8 flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
            {t(UI.qubitModeLabel)}
          </span>
          <div className="inline-flex border-2 border-[#0A0A0A] overflow-hidden">
            {[1, 2].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleSetNumQubits(n)}
                aria-pressed={numQubits === n}
                className={`px-4 py-1.5 text-sm font-bold font-mono transition-colors ${
                  numQubits === n ? "bg-[#1A1AE5] text-white" : "bg-white text-[#2B2B2B] hover:bg-[#F2EFE4]"
                } ${n === 1 ? "border-r-2 border-[#0A0A0A]" : ""}`}
              >
                {n === 1 ? t(UI.oneQubit) : t(UI.twoQubits)}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------- palette -------------------------------- */}
        <div className="mt-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B2B2B] mb-1">
            {t(UI.paletteHeading)}
          </p>
          <p className="text-sm text-[#2B2B2B] mb-3">{t(UI.paletteHint)}</p>
          <div className="flex flex-wrap gap-3">
            {GATE_DEFS.map((gate) => {
              const disabled = gate.type === "CNOT" && numQubits !== 2;
              const armed = armedGate === gate.type;
              return (
                <button
                  key={gate.type}
                  type="button"
                  draggable={!disabled}
                  disabled={disabled}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", gate.type);
                    e.dataTransfer.effectAllowed = "copy";
                    setDragType(gate.type);
                  }}
                  onDragEnd={() => setDragType(null)}
                  onClick={() => {
                    if (disabled) return;
                    setCnotPending(null);
                    setSelectedGateId(null);
                    setArmedGate((cur) => (cur === gate.type ? null : gate.type));
                  }}
                  aria-pressed={armed}
                  aria-label={`${t(gate.name)}${disabled ? ` — ${t(UI.cnotDisabledHint)}` : ""}`}
                  title={disabled ? t(UI.cnotDisabledHint) : t(gate.name)}
                  className={`w-20 h-20 flex flex-col items-center justify-center border-2 shadow-hard-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2 ${
                    disabled
                      ? "bg-[#F2EFE4] border-[#0A0A0A]/30 text-[#2B2B2B]/40 cursor-not-allowed"
                      : armed
                      ? "bg-[#FFB800] border-[#0A0A0A] text-[#0A0A0A]"
                      : "bg-white border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#F2EFE4] cursor-grab"
                  }`}
                >
                  <span className="text-xl font-bold">{gate.short}</span>
                  <span className="mt-1 text-[9px] uppercase tracking-wide">{t(gate.name)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* -------------------------------- circuit -------------------------------- */}
        <div className="mt-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#2B2B2B] mb-3">
            {t(UI.circuitHeading)}
          </p>

          <div
            ref={circuitRef}
            className={`overflow-x-auto bg-white border-2 border-[#0A0A0A] shadow-hard p-4 transition-shadow duration-300 ${
              pulsing ? "ring-4 ring-[#FFB800] ring-offset-4 ring-offset-[#F2EFE4]" : ""
            }`}
          >
            <div style={{ width: LABEL_W + CELL_W * NUM_STEPS }}>
              {/* step header */}
              <div className="flex" style={{ marginLeft: LABEL_W }}>
                {Array.from({ length: NUM_STEPS }).map((_, ts) => (
                  <div
                    key={ts}
                    style={{ width: CELL_W }}
                    className="text-center font-mono text-[10px] text-[#2B2B2B]"
                  >
                    {t(UI.stepLabel)} {ts + 1}
                  </div>
                ))}
              </div>

              <div className="relative" style={{ height: CELL_H * numQubits }}>
                {Array.from({ length: numQubits }).map((_, q) => (
                  <div
                    key={q}
                    className="absolute left-0 flex items-center"
                    style={{ top: q * CELL_H, height: CELL_H, width: LABEL_W + CELL_W * NUM_STEPS }}
                  >
                    <div style={{ width: LABEL_W }} className="shrink-0 pr-2 font-mono">
                      <div className="text-xs font-bold text-[#0A0A0A]">
                        {t(UI.qubitLabel)} {q + 1}
                      </div>
                      <div className="text-sm text-[#2B2B2B]">|0⟩</div>
                    </div>

                    <div className="relative flex" style={{ width: CELL_W * NUM_STEPS, height: CELL_H }}>
                      <div
                        className="absolute left-0 right-0 border-t-2 border-[#0A0A0A]"
                        style={{ top: CELL_H / 2 }}
                        aria-hidden="true"
                      />
                      {Array.from({ length: NUM_STEPS }).map((_, ts) => {
                        const gate = getGateAt(q, ts);
                        const occupied = gate !== null;
                        const selected = gate && gate.id === selectedGateId;
                        const isPendingAnchor =
                          cnotPending && cnotPending.timeStep === ts && cnotPending.controlQubit === q;
                        const isPendingTarget =
                          cnotPending && cnotPending.timeStep === ts && cnotPending.controlQubit !== q;

                        let dropPreview = false;
                        if (dragType && !occupied) {
                          dropPreview = dragType === "CNOT" ? isValidCnotAnchor(ts) : true;
                        }

                        let cellClass =
                          "relative shrink-0 flex items-center justify-center border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-1";
                        if (occupied && gate.type !== "CNOT") {
                          cellClass += selected
                            ? " bg-[#FFB800] border-[#0A0A0A]"
                            : " bg-[#1A1AE5] text-white border-[#0A0A0A]";
                        } else if (isPendingAnchor) {
                          cellClass += " bg-[#FFB800]/40 border-[#0A0A0A] border-dashed";
                        } else if (isPendingTarget) {
                          cellClass += " bg-[#00A94F]/10 border-[#00A94F] border-dashed";
                        } else if (dropPreview) {
                          cellClass += " bg-[#1A1AE5]/10 border-[#1A1AE5] border-dashed";
                        } else if (!occupied) {
                          cellClass += " hover:bg-[#F2EFE4]";
                        }

                        const gateLabel = gate
                          ? gate.type === "CNOT"
                            ? "CNOT"
                            : t(GATE_ARM_LABEL[gate.type])
                          : null;
                        const ariaLabel = gate
                          ? t(UI.gateCellLabel)(q + 1, ts + 1, gateLabel)
                          : t(UI.emptyCellLabel)(q + 1, ts + 1);

                        return (
                          <button
                            key={ts}
                            type="button"
                            style={{ width: CELL_W, height: CELL_H }}
                            className={cellClass}
                            onClick={() => handleCellClick(q, ts)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, q, ts)}
                            aria-label={ariaLabel}
                            aria-pressed={selected}
                          >
                            {gate && gate.type !== "CNOT" && (
                              <span className="font-mono font-bold text-lg">{gate.type}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* CNOT connectors + pending-anchor preview, drawn as one overlay so
                    the control dot, target symbol, and vertical link line are always
                    pixel-aligned to the cells above regardless of viewport width. */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width={LABEL_W + CELL_W * NUM_STEPS}
                  height={CELL_H * numQubits}
                  aria-hidden="true"
                >
                  {circuit
                    .filter((op) => op.type === "CNOT")
                    .map((op) => {
                      const colX = LABEL_W + op.timeStep * CELL_W + CELL_W / 2;
                      const y1 = op.control * CELL_H + CELL_H / 2;
                      const y2 = op.target * CELL_H + CELL_H / 2;
                      const selected = op.id === selectedGateId;
                      const stroke = selected ? C.accent : C.primary;
                      return (
                        <g key={op.id}>
                          <line x1={colX} y1={y1} x2={colX} y2={y2} stroke={stroke} strokeWidth="3" />
                          <circle cx={colX} cy={y1} r="7" fill={stroke} stroke={C.border} strokeWidth="2" />
                          <circle
                            cx={colX}
                            cy={y2}
                            r="12"
                            fill={C.surface}
                            stroke={stroke}
                            strokeWidth="3"
                          />
                          <line x1={colX - 8} y1={y2} x2={colX + 8} y2={y2} stroke={stroke} strokeWidth="2.5" />
                          <line x1={colX} y1={y2 - 8} x2={colX} y2={y2 + 8} stroke={stroke} strokeWidth="2.5" />
                        </g>
                      );
                    })}
                  {cnotPending && (
                    <circle
                      cx={LABEL_W + cnotPending.timeStep * CELL_W + CELL_W / 2}
                      cy={cnotPending.controlQubit * CELL_H + CELL_H / 2}
                      r="7"
                      fill={C.accent}
                      stroke={C.border}
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* live status line — keeps drag-and-drop's visual feedback available
              as text too, and is the only feedback channel for keyboard users */}
          <div aria-live="polite" className="mt-3 min-h-[1.5rem]">
            {statusMessage && (
              <p className="font-mono text-xs text-[#1A1AE5] font-bold">{statusMessage}</p>
            )}
          </div>

          {/* controls */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRun}
              className="inline-flex items-center gap-2 bg-[#00A94F] hover:bg-[#008F43] text-white border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {t(UI.runButton)}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F2EFE4] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              {t(UI.resetButton)}
            </button>
            {selectedGateId && (
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#D50000]/10 text-[#D50000] border-2 border-[#D50000] font-bold px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D50000] focus-visible:ring-offset-2"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                {t(UI.deleteButton)}
              </button>
            )}
          </div>
        </div>

        {/* -------------------------------- results -------------------------------- */}
        <div ref={resultsRef} className="mt-10">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C42B00] mb-3">
            {t(UI.resultsHeading)}
          </p>

          {!results ? (
            <div className="border-2 border-dashed border-[#0A0A0A]/30 p-8 text-center text-[#2B2B2B]">
              {t(UI.resultsEmptyHint)}
            </div>
          ) : (
            <div className="bg-white border-2 border-[#0A0A0A] shadow-hard p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display font-black tracking-tight text-lg text-[#0A0A0A] mb-3">
                    {t(UI.histogramHeading)}
                  </h4>
                  <Histogram counts={results.shotCounts} numShots={NUM_SHOTS} t={t} UI={UI} />
                </div>
                <div>
                  <h4 className="font-display font-black tracking-tight text-lg text-[#0A0A0A] mb-3">
                    {t(UI.blochHeading)}
                  </h4>
                  <div className={`grid gap-4 ${numQubits === 2 ? "grid-cols-2" : "grid-cols-1 max-w-[240px]"}`}>
                    {results.blochVectors.map((v, i) => (
                      <BlochSphere key={i} vector={v} qubitLabel={i + 1} t={t} UI={UI} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t-4 border-[#0A0A0A] pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block font-mono text-[10px] font-bold tracking-widest uppercase bg-[#FFB800] text-[#0A0A0A] border-2 border-[#0A0A0A] px-2 py-1">
                    {t(UI.categoryBadge[results.explanation.category])}
                  </span>
                  <h4 className="font-display font-black tracking-tight text-lg text-[#0A0A0A]">
                    {t(UI.explanationHeading)}
                  </h4>
                </div>
                <p className="text-[#2B2B2B] leading-relaxed">{t(results.explanation.main)}</p>
                {results.explanation.blochNote && (
                  <p className="mt-4 border-l-4 border-[#1A1AE5] bg-[#1A1AE5]/5 pl-4 py-3 text-[#0A0A0A] leading-relaxed">
                    {t(results.explanation.blochNote)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
