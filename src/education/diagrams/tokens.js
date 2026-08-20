/* Shared drawing tokens for the course diagrams. These mirror the brand
   palette in src/shared/uiKit.jsx, but SVG needs literal attribute values
   rather than Tailwind classes, so they're repeated here as plain strings.

   Every diagram uses the same visual language as QuantumLine: heavy black
   strokes, flat fills, gold accent nodes, no gradients or soft shadows. */

export const D = {
  ink: "#0A0A0A",
  blue: "#1A1AE5",
  gold: "#FFB800",
  green: "#00A94F",
  red: "#D50000",
  rust: "#C42B00",
  cream: "#F2EFE4",
  white: "#FFFFFF",
  mono: '"Martian Mono", ui-monospace, monospace',
  sans: '"Archivo", system-ui, sans-serif',
};

/* Standard stroke weight for diagram outlines — matches the border-2 used
   on cards elsewhere in the app. */
export const STROKE = 2.5;
