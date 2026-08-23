/* =========================================================================
   Quantum4Colorado — quantum state engine
   A real state-vector simulator: complex arithmetic and linear algebra
   implemented directly, no external quantum library. This module has no
   dependency on React or the DOM and is safe to import from a plain Node
   script for testing.

   ---------------------------------------------------------------------
   CONVENTION (read this before touching the math below)

   Qubit indexing: qubit 0 is the TOP wire in the circuit diagram and is
   the MOST SIGNIFICANT bit of the state-vector index. For n qubits, the
   basis state at index i corresponds to the bitstring i.toString(2)
   padded to n digits, read left-to-right as qubit 0, qubit 1, ..., qubit
   n-1 — i.e. exactly the standard physics ket |q0 q1 ... qn-1⟩, and
   exactly the order the wires are drawn top-to-bottom in the UI.

   Example (n=2): index 0 = "00", index 1 = "01", index 2 = "10" (qubit 0
   is 1, qubit 1 is 0), index 3 = "11".

   This choice is what makes the standard CNOT matrix
     [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]
   correct for control=qubit0, target=qubit1 without any re-indexing.
   ========================================================================= */

/* ------------------------------ Complex numbers -------------------------- */

export const cAdd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
export const cMul = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
export const cConj = (a) => ({ re: a.re, im: -a.im });
export const cAbs2 = (a) => a.re * a.re + a.im * a.im;
export const cScale = (a, s) => ({ re: a.re * s, im: a.im * s });

const RE = (n) => ({ re: n, im: 0 });
const ZERO = RE(0);
const ONE = RE(1);

/* ------------------------------- Gate matrices ---------------------------- */
/* Each gate is a 2x2 matrix of complex numbers, [[g00, g01], [g10, g11]],
   applied to a single qubit's amplitude pair as
     new0 = g00*a0 + g01*a1
     new1 = g10*a0 + g11*a1
   where a0, a1 are the amplitudes of that qubit being 0 and 1 respectively
   (see applyGate below). */

const INV_SQRT2 = 1 / Math.sqrt(2);

export const GATE_H = [
  [RE(INV_SQRT2), RE(INV_SQRT2)],
  [RE(INV_SQRT2), RE(-INV_SQRT2)],
];

export const GATE_X = [
  [ZERO, ONE],
  [ONE, ZERO],
];

export const GATE_Y = [
  [ZERO, { re: 0, im: -1 }],
  [{ re: 0, im: 1 }, ZERO],
];

export const GATE_Z = [
  [ONE, ZERO],
  [ZERO, RE(-1)],
];

export const GATES = { H: GATE_H, X: GATE_X, Y: GATE_Y, Z: GATE_Z };

/* -------------------------------- State vector ---------------------------- */

/* |0...0⟩: amplitude 1 at index 0, 0 everywhere else. */
export function initState(numQubits) {
  const size = 1 << numQubits; // 2^n
  const state = new Array(size);
  for (let i = 0; i < size; i++) state[i] = i === 0 ? { ...ONE } : { ...ZERO };
  return state;
}

/* Bit value (0 or 1) of `qubitIndex` within a state-vector index, under the
   convention documented above. */
function bitOf(index, qubitIndex, numQubits) {
  const bitPos = numQubits - 1 - qubitIndex;
  return (index >> bitPos) & 1;
}

/* Applies a single-qubit gate to `qubitIndex` within an n-qubit state.
   Uses the direct amplitude-pair update: for every pair of basis states
   that differ only in this qubit's bit, the gate's 2x2 matrix mixes their
   two amplitudes. This is mathematically identical to tensoring the gate
   into the full 2^n x 2^n operator, without materializing that matrix. */
export function applyGate(stateVector, gateMatrix, qubitIndex, numQubits) {
  const size = stateVector.length;
  const bitPos = numQubits - 1 - qubitIndex;
  const mask = 1 << bitPos;
  const next = new Array(size);

  for (let i = 0; i < size; i++) {
    if ((i & mask) !== 0) continue; // handled as the "1" partner below
    const i0 = i;
    const i1 = i | mask;
    const a0 = stateVector[i0];
    const a1 = stateVector[i1];
    next[i0] = cAdd(cMul(gateMatrix[0][0], a0), cMul(gateMatrix[0][1], a1));
    next[i1] = cAdd(cMul(gateMatrix[1][0], a0), cMul(gateMatrix[1][1], a1));
  }
  return next;
}

/* CNOT is a permutation of basis states (a classical XOR conditioned on the
   control bit), so it can be applied directly as an index remap rather than
   a general 4x4 multiply — cheaper and just as exact. new[i] = old[i] when
   the control bit of i is 0; when it is 1, new[i] = old[i with target bit
   flipped]. This permutation is its own inverse, which is what makes the
   single-pass remap below correct (verified against the standard 4x4 CNOT
   matrix in the accompanying test script). */
export function applyCNOT(stateVector, controlQubit, targetQubit, numQubits) {
  const size = stateVector.length;
  const controlMask = 1 << (numQubits - 1 - controlQubit);
  const targetMask = 1 << (numQubits - 1 - targetQubit);
  const next = new Array(size);

  for (let i = 0; i < size; i++) {
    const source = (i & controlMask) !== 0 ? i ^ targetMask : i;
    next[i] = stateVector[source];
  }
  return next;
}

/* Dispatcher for a single circuit operation. `op` is either
   { type: "H"|"X"|"Y"|"Z", qubit } or { type: "CNOT", control, target }. */
export function applyOp(stateVector, op, numQubits) {
  if (op.type === "CNOT") {
    return applyCNOT(stateVector, op.control, op.target, numQubits);
  }
  const matrix = GATES[op.type];
  if (!matrix) throw new Error(`Unknown gate type: ${op.type}`);
  return applyGate(stateVector, matrix, op.qubit, numQubits);
}

/* Applies an unordered list of circuit placements in time-step order.
   Returns both the final state and the state after each individual
   operation (stateHistory), so a future step-through visualization can be
   added without changing this function. */
export function runCircuit(placements, numQubits) {
  const ordered = [...placements].sort((a, b) => a.timeStep - b.timeStep);
  let state = initState(numQubits);
  const stateHistory = [state];
  for (const op of ordered) {
    state = applyOp(state, op, numQubits);
    stateHistory.push(state);
  }
  return { finalState: state, stateHistory };
}

/* ------------------------------- Measurement ------------------------------ */

export function getProbabilities(stateVector) {
  return stateVector.map(cAbs2);
}

export function formatBitstring(index, numQubits) {
  return index.toString(2).padStart(numQubits, "0");
}

/* Samples `numShots` simulated measurements from a probability
   distribution, returning a { bitstring: count } histogram. Uses inverse-
   CDF sampling; the number of qubits is inferred from the array length
   (probabilities.length === 2^n). */
export function simulateShots(probabilities, numShots = 1000) {
  const numQubits = Math.round(Math.log2(probabilities.length));
  const labels = probabilities.map((_, i) => formatBitstring(i, numQubits));

  const counts = {};
  for (const label of labels) counts[label] = 0;

  const cumulative = [];
  let running = 0;
  for (const p of probabilities) {
    running += p;
    cumulative.push(running);
  }
  const total = cumulative[cumulative.length - 1] || 1; // guard fp drift from 1

  for (let shot = 0; shot < numShots; shot++) {
    const r = Math.random() * total;
    let idx = cumulative.findIndex((c) => r <= c);
    if (idx === -1) idx = cumulative.length - 1;
    counts[labels[idx]]++;
  }
  return counts;
}

/* --------------------------------- Bloch vector ---------------------------- */

/* Reduced single-qubit Bloch vector for `qubitIndex` within an n-qubit
   state, via the partial trace over every other qubit:

     rho_q[a][b] = sum over i,j that agree on every bit except qubitIndex,
                   with bit_q(i)=a, bit_q(j)=b, of amp[i] * conj(amp[j])

   then, using rho = 1/2 (I + x*sigma_x + y*sigma_y + z*sigma_z):
     x = 2*Re(rho01), y = -2*Im(rho01), z = Re(rho00) - Re(rho11)

   For a pure single-qubit state this reduces to the ordinary Bloch vector.
   For a qubit entangled with the rest of the system, the reduced state is
   mixed and the vector's length is correspondingly less than 1 — for a
   maximally entangled qubit it lands at the origin. That shrinkage is not
   an approximation artifact; it is the correct physical statement that an
   entangled qubit has no well-defined pure state of its own. */
export function getBlochVector(stateVector, qubitIndex, numQubits) {
  const size = stateVector.length;
  const bitPos = numQubits - 1 - qubitIndex;
  const mask = 1 << bitPos;
  const otherBitsMask = ~mask;

  let rho00 = { ...ZERO };
  let rho01 = { ...ZERO };
  let rho11 = { ...ZERO };

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if ((i & otherBitsMask) !== (j & otherBitsMask)) continue;
      const bi = (i & mask) !== 0 ? 1 : 0;
      const bj = (j & mask) !== 0 ? 1 : 0;
      const contribution = cMul(stateVector[i], cConj(stateVector[j]));
      if (bi === 0 && bj === 0) rho00 = cAdd(rho00, contribution);
      else if (bi === 0 && bj === 1) rho01 = cAdd(rho01, contribution);
      else if (bi === 1 && bj === 1) rho11 = cAdd(rho11, contribution);
      // rho10 is conj(rho01) by construction and isn't needed separately.
    }
  }

  return {
    x: 2 * rho01.re,
    y: -2 * rho01.im,
    z: rho00.re - rho11.re,
  };
}

export function blochVectorLength({ x, y, z }) {
  return Math.sqrt(x * x + y * y + z * z);
}
