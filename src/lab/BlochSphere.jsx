/* =========================================================================
   Quantum4Colorado — Bloch sphere (2D projection)
   A simplified SVG rendering of a single qubit's Bloch vector: an ellipse
   standing in for the sphere in perspective, axis lines through the
   center, |0⟩/|1⟩ poles, and an arrow from the center to the point given
   by the actual computed (x, y, z) coordinates from getBlochVector.

   Projection: z maps to the vertical axis (|0⟩ at top, |1⟩ at bottom, as
   is conventional), x maps to the horizontal axis, and y is folded in as
   a small diagonal offset so a vector with y ≠ 0 is still visibly
   different from one that's purely x/z — a full 3D perspective isn't
   necessary for what this needs to teach.
   ========================================================================= */

import React from "react";
import { C, CYBER } from "../shared/uiKit.jsx";
import { blochVectorLength } from "./quantumEngine.js";

/* This sphere renders inside a white results card (see the Quantum Lab's
   results panel), so `C.surface`/`C.border`/`C.textPrimary`/
   `C.textSecondary` are unchanged below — that's still a light surface
   regardless of the cyber page canvas behind it. Only the actual brand
   colors (the vector itself, the shrunk-vector warning) move to CYBER. */

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 84;
const ELLIPSE_RY = RADIUS * 0.42; // flattens the circle into a perspective ellipse

export default function BlochSphere({ vector, qubitLabel, t, UI }) {
  const { x, y, z } = vector;
  const length = blochVectorLength(vector);

  // Simple oblique projection: y nudges the point diagonally so it reads
  // as "coming toward/away from you" without real 3D math.
  const px = CENTER + x * RADIUS + y * RADIUS * 0.22;
  const py = CENTER - z * RADIUS - y * RADIUS * 0.16;

  const arrowId = `bloch-arrowhead-${qubitLabel}`;
  const shrunk = length < 0.3;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[240px] h-auto"
        role="img"
        aria-label={t(UI.blochAriaLabel)(qubitLabel, x, y, z)}
      >
        <defs>
          <marker
            id={arrowId}
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={CYBER.primary} />
          </marker>
        </defs>

        {/* sphere outline, in perspective */}
        <ellipse
          cx={CENTER}
          cy={CENTER}
          rx={RADIUS}
          ry={RADIUS}
          fill={C.surface}
          stroke={C.border}
          strokeWidth="2"
        />
        <ellipse
          cx={CENTER}
          cy={CENTER}
          rx={RADIUS}
          ry={ELLIPSE_RY}
          fill="none"
          stroke={C.border}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* axes */}
        <line
          x1={CENTER}
          y1={CENTER - RADIUS - 14}
          x2={CENTER}
          y2={CENTER + RADIUS + 14}
          stroke={C.textSecondary}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <line
          x1={CENTER - RADIUS - 14}
          y1={CENTER}
          x2={CENTER + RADIUS + 14}
          y2={CENTER}
          stroke={C.textSecondary}
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* pole labels */}
        <text
          x={CENTER}
          y={CENTER - RADIUS - 20}
          textAnchor="middle"
          fontFamily="Martian Mono, monospace"
          fontSize="13"
          fontWeight="700"
          fill={C.textPrimary}
        >
          |0⟩
        </text>
        <text
          x={CENTER}
          y={CENTER + RADIUS + 32}
          textAnchor="middle"
          fontFamily="Martian Mono, monospace"
          fontSize="13"
          fontWeight="700"
          fill={C.textPrimary}
        >
          |1⟩
        </text>

        {/* center point */}
        <circle cx={CENTER} cy={CENTER} r="3" fill={C.border} />

        {/* the vector itself — this is the one part of the drawing driven
            directly by the actual computed state, not decoration */}
        {length > 0.02 && (
          <line
            x1={CENTER}
            y1={CENTER}
            x2={px}
            y2={py}
            stroke={CYBER.primary}
            strokeWidth="3"
            markerEnd={`url(#${arrowId})`}
          />
        )}
        <circle cx={px} cy={py} r="6" fill={shrunk ? CYBER.danger : CYBER.accent} stroke={C.border} strokeWidth="2" />
      </svg>

      {/* text equivalent — the visual is never the only way to get this
          information, per the app's accessibility requirements */}
      <div className="mt-3 w-full font-mono text-xs text-[#2B2B2B] bg-[#F2EFE4] border-2 border-[#0A0A0A] px-3 py-2 text-center">
        <div className="font-bold text-[#0A0A0A]">{t(UI.qubitLabel)} {qubitLabel}</div>
        <div className="mt-1">x={x.toFixed(2)} · y={y.toFixed(2)} · z={z.toFixed(2)}</div>
        <div className={shrunk ? "mt-1 font-bold text-[#B8123F]" : "mt-1 text-[#2B2B2B]"}>
          {t(UI.vectorLength)} {length.toFixed(2)}
          {shrunk && ` — ${t(UI.entangledShort)}`}
        </div>
      </div>
    </div>
  );
}
