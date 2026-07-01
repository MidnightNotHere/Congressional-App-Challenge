import React from "react";
import Svg, { Line, Circle } from "react-native-svg";
import { colors } from "../theme";

/* Signature quantum-circuit line: a thin horizontal line with gold accent nodes. */
export default function QuantumLine({ width = 320, color = colors.primary, node = colors.accent }) {
  const y = 12;
  const nodes = [0.06, 0.26, 0.46, 0.64, 0.82, 0.96].map((f) => Math.round(f * width));
  return (
    <Svg width={width} height={24}>
      <Line x1={0} y1={y} x2={width} y2={y} stroke={color} strokeWidth={1.5} strokeOpacity={0.4} />
      {nodes.map((x, i) => (
        <React.Fragment key={i}>
          <Circle cx={x} cy={y} r={9} fill={node} fillOpacity={0.2} />
          <Circle cx={x} cy={y} r={4.5} fill={node} />
        </React.Fragment>
      ))}
    </Svg>
  );
}
