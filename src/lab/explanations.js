/* =========================================================================
   Quantum4Colorado — Quantum Lab explanation generator
   Rule-based, not a language model: this looks at which gates are present
   and in what combination, and returns a pre-written bilingual { en, es }
   explanation. No dependency on React — pure functions, easy to test
   alongside quantumEngine.js.
   ========================================================================= */

import { blochVectorLength } from "./quantumEngine.js";

const GATE_NAMES = {
  H: { en: "Hadamard (H)", es: "Hadamard (H)" },
  X: { en: "Pauli-X (X)", es: "Pauli-X (X)" },
  Y: { en: "Pauli-Y (Y)", es: "Pauli-Y (Y)" },
  Z: { en: "Pauli-Z (Z)", es: "Pauli-Z (Z)" },
  CNOT: { en: "CNOT", es: "CNOT" },
};

/* Below this Bloch-vector length, a qubit in a two-qubit circuit is
   flagged as "no longer independently describable" — 0.3 comfortably
   separates a maximally-entangled qubit (length 0) from a lightly-mixed
   or still-pure one (length close to 1), without being so strict that
   floating-point noise near a clean 0 could miss it. */
const ENTANGLEMENT_NOTE_THRESHOLD = 0.3;

function qubitLabel(index) {
  return index + 1; // UI labels qubits 1 and 2, engine indexes 0 and 1
}

function describeStep(op) {
  if (op.type === "CNOT") {
    return {
      en: `CNOT (control: Qubit ${qubitLabel(op.control)} → target: Qubit ${qubitLabel(op.target)})`,
      es: `CNOT (control: Qubit ${qubitLabel(op.control)} → objetivo: Qubit ${qubitLabel(op.target)})`,
    };
  }
  const name = GATE_NAMES[op.type];
  return {
    en: `${name.en} on Qubit ${qubitLabel(op.qubit)}`,
    es: `${name.es} en Qubit ${qubitLabel(op.qubit)}`,
  };
}

const T = {
  empty: {
    en: "No gates are on the circuit yet. The qubit stays in the definite state |0⟩ — exactly like a normal classical bit set to 0. Measuring it will always give the same result: 0, every time, with no randomness at all.",
    es: "Todavía no hay compuertas en el circuito. El qubit permanece en el estado definido |0⟩, igual que un bit clásico normal puesto en 0. Medirlo siempre dará el mismo resultado: 0, cada vez, sin ninguna aleatoriedad.",
  },
  superposition: {
    en: "This circuit uses only the Hadamard gate, which creates superposition: the qubit becomes a genuine blend of 0 and 1 rather than settling on one value. That is why the histogram below shows roughly a 50/50 split instead of a single guaranteed outcome — the randomness is not uncertainty about a hidden value, it is a real property of the state itself.",
    es: "Este circuito usa solo la compuerta Hadamard, que crea superposición: el qubit se convierte en una mezcla real de 0 y 1 en lugar de decidirse por un valor. Por eso el histograma de abajo muestra aproximadamente un reparto 50/50 en lugar de un único resultado garantizado: la aleatoriedad no es incertidumbre sobre un valor oculto, es una propiedad real del estado mismo.",
  },
  entanglement: {
    en: "This circuit uses a Hadamard gate together with a CNOT — the pattern that creates entanglement. The two qubits stop having independent states and share a single joint state instead. That is why the histogram below only ever shows matching outcomes (00 or 11) and never a mismatched one (01 or 10): measuring one qubit instantly determines the other, no matter which qubit you look at first.",
    es: "Este circuito usa una compuerta Hadamard junto con una CNOT: el patrón que crea entrelazamiento. Los dos qubits dejan de tener estados independientes y comparten un único estado conjunto. Por eso el histograma de abajo solo muestra resultados que coinciden (00 u 11) y nunca uno que no coincide (01 o 10): medir un qubit determina instantáneamente al otro, sin importar cuál se mida primero.",
  },
  classicalFlip: {
    en: "This circuit uses only the Pauli-X gate, which is a classical bit flip: 0 becomes 1 (or 1 becomes 0), completely deterministically. There is no randomness here at all — every run gives the identical result. Compare this to the Hadamard gate: X flips a definite value to another definite value, while H creates a genuine blend with no definite value until measured. That contrast is the difference between classical and quantum behavior in one gate each.",
    es: "Este circuito usa solo la compuerta Pauli-X, que es un cambio de bit clásico: el 0 se convierte en 1 (o el 1 en 0), de forma completamente determinista. Aquí no hay ninguna aleatoriedad: cada ejecución da el mismo resultado. Compare esto con la compuerta Hadamard: X cambia un valor definido a otro valor definido, mientras que H crea una mezcla real sin valor definido hasta que se mide. Ese contraste es la diferencia entre comportamiento clásico y cuántico, cada uno en una sola compuerta.",
  },
  genericIntro: {
    en: "You built:",
    es: "Usted construyó:",
  },
  genericOutro: {
    en: "The histogram below reflects the exact probability distribution this specific sequence of gates produces.",
    es: "El histograma de abajo refleja la distribución de probabilidad exacta que produce esta secuencia específica de compuertas.",
  },
  blochNoteRest: {
    en: "toward the center of the sphere. That is not a rendering glitch — it is the physical signature of entanglement. Once a qubit is entangled with another, it no longer has a well-defined state on its own; only the pair, taken together, does.",
    es: "hacia el centro de la esfera. Esto no es un error de la representación gráfica: es la firma física del entrelazamiento. Una vez que un qubit está entrelazado con otro, ya no tiene un estado bien definido por sí solo; solo lo tiene el par, tomado en conjunto.",
  },
};

/* Classifies a circuit's gate composition into the rule buckets used to
   pick an explanation. Exported mainly so the UI can also badge the run
   (e.g. label a result "Entanglement") without re-deriving this logic. */
export function classifyCircuit(circuit) {
  if (circuit.length === 0) return "empty";
  const types = new Set(circuit.map((op) => op.type));
  const hasCNOT = types.has("CNOT");
  const hasH = types.has("H");
  const onlyH = hasH && !hasCNOT && !types.has("X") && !types.has("Y") && !types.has("Z");
  const onlyX = types.has("X") && types.size === 1;

  if (hasH && hasCNOT) return "entanglement";
  if (onlyH) return "superposition";
  if (onlyX) return "classicalFlip";
  return "generic";
}

/* Returns { en, es } main explanation plus an optional { en, es }
   blochNote when a qubit's reduced state has visibly shrunk. `circuit` is
   the placement list actually run (sorted or not, order doesn't matter
   here beyond generic step listing), `blochVectors` is an array indexed
   by qubit of { x, y, z } from getBlochVector. */
export function generateExplanation(circuit, numQubits, blochVectors) {
  const category = classifyCircuit(circuit);

  let main;
  if (category === "generic") {
    const ordered = [...circuit].sort((a, b) => a.timeStep - b.timeStep);
    const steps = ordered.map(describeStep);
    main = {
      en: `${T.genericIntro.en} ${steps.map((s) => s.en).join(" → ")}. ${T.genericOutro.en}`,
      es: `${T.genericIntro.es} ${steps.map((s) => s.es).join(" → ")}. ${T.genericOutro.es}`,
    };
  } else {
    main = T[category];
  }

  let blochNote = null;
  if (numQubits === 2 && circuit.some((op) => op.type === "CNOT") && blochVectors) {
    const shrunk = blochVectors
      .map((v, i) => ({ i, len: blochVectorLength(v) }))
      .filter((entry) => entry.len < ENTANGLEMENT_NOTE_THRESHOLD);
    if (shrunk.length > 0) {
      // Kept "Qubit N" untranslated in Spanish (matches how the rest of the
      // app treats technical labels like NIST/JILA as proper nouns), and
      // built each sentence as one flat string rather than composing
      // fragments, so subject/verb agreement (singular vs "y") stays
      // correct for both a single qubit and a pair.
      const labels = shrunk.map((s) => `Qubit ${qubitLabel(s.i)}`);
      const isPair = labels.length > 1;
      const subjectEn = isPair
        ? `${labels.join(" and ")}'s Bloch vectors have shrunk`
        : `${labels[0]}'s Bloch vector has shrunk`;
      const subjectEs = isPair
        ? `los vectores de Bloch de ${labels.join(" y ")} se han encogido`
        : `el vector de Bloch de ${labels[0]} se ha encogido`;
      blochNote = {
        en: `Notice that ${subjectEn} ${T.blochNoteRest.en}`,
        es: `Note que ${subjectEs} ${T.blochNoteRest.es}`,
      };
    }
  }

  return { category, main, blochNote };
}
