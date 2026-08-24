/* =========================================================================
   Quantum4Colorado — Quantum Lab measurement histogram
   Bar chart of the simulated-shot counts from simulateShots(), using
   Recharts to match the rest of the app (see the state-investment chart
   on the Representatives page).
   ========================================================================= */

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LabelList } from "recharts";
import { C, CYBER } from "../shared/uiKit.jsx";

/* Renders inside a white results card, so C.textPrimary/C.border/C.bg
   (light-surface tokens) are unchanged — only the bar fill itself moves
   to the cyber brand color. */

export default function Histogram({ counts, numShots, t, UI }) {
  const labels = Object.keys(counts).sort();
  const data = labels.map((label) => ({
    label: `|${label}⟩`,
    count: counts[label],
    percent: numShots ? Math.round((counts[label] / numShots) * 100) : 0,
  }));

  return (
    <div>
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontFamily: "Martian Mono, monospace", fontSize: 13, fill: C.textPrimary }}
              axisLine={{ stroke: C.border }}
              tickLine={false}
            />
            <YAxis hide domain={[0, numShots]} />
            <Tooltip
              cursor={{ fill: C.bg }}
              contentStyle={{
                border: `2px solid ${C.border}`,
                borderRadius: 0,
                fontFamily: "Archivo, sans-serif",
                fontSize: 12,
              }}
              formatter={(value, name, item) => [`${value} (${item.payload.percent}%)`, t(UI.shots)]}
            />
            <Bar dataKey="count" radius={0} isAnimationActive maxBarSize={90}>
              {data.map((entry) => (
                <Cell key={entry.label} fill={CYBER.primary} stroke={C.border} strokeWidth={2} />
              ))}
              <LabelList
                dataKey="percent"
                position="top"
                formatter={(v) => `${v}%`}
                style={{ fontFamily: "Martian Mono, monospace", fontSize: 12, fontWeight: 700, fill: C.textPrimary }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* text equivalent, so the results don't depend on reading the chart */}
      <div className="mt-3 font-mono text-xs text-[#2B2B2B] bg-[#F2EFE4] border-2 border-[#0A0A0A] px-3 py-2">
        <span className="font-bold text-[#0A0A0A]">
          {t(UI.shotsRun)} {numShots}.{" "}
        </span>
        {data.map((d, i) => (
          <span key={d.label}>
            {i > 0 && " · "}
            {d.label}: {d.count} ({d.percent}%)
          </span>
        ))}
      </div>
    </div>
  );
}
