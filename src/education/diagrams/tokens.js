/* Shared drawing tokens for the course diagrams. These mirror CYBER in
   src/shared/uiKit.jsx, but SVG needs literal attribute values rather than
   Tailwind classes, so they're repeated here as plain strings.

   Each diagram renders inside a white card (see the <figure> wrapper in
   ./index.jsx) exactly like every other card in the cyber-scoped surfaces
   — only the page canvas behind that card went dark, not the card itself
   — so `ink`/`cream`/`white` stay as they were: this is still black text
   on a light diagram surface. Only the four hue colors move to their Void
   Blue equivalents.

   `rust` is the odd one out: every diagram uses it for small mono labels
   (not fills or graphics), so it needs the darker on-light teal rather
   than the bright secondary cyan — raw #00D4FF measures well under 3:1 as
   text on the white card, the same contrast failure fixed elsewhere in
   this palette (see CYBER.secondaryTextOnLight in src/shared/uiKit.jsx). */
export const D = {
  ink: "#0A0A0A",
  blue: "#375FFF",
  gold: "#FFE600",
  green: "#00D4FF",
  // Not the bright CYBER.danger (#FF2D55) — that measures ~3.65:1 against
  // white in either direction (red text on white, or white text on a red
  // fill), and contrast is symmetric so darkening it here fixes both at
  // once. Same value as CYBER.dangerTextOnLight in src/shared/uiKit.jsx.
  red: "#B8123F",
  rust: "#00707A",
  cream: "#F2EFE4",
  white: "#FFFFFF",
  mono: '"Martian Mono", ui-monospace, monospace',
  sans: '"Archivo", system-ui, sans-serif',
};

/* Standard stroke weight for diagram outlines — matches the border-2 used
   on cards elsewhere in the app. */
export const STROKE = 2.5;
