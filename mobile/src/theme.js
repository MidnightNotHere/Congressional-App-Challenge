/* Quantum4Colorado — shared design tokens (native port of the web palette).
   Bold/high-contrast brutalist palette: electric ultramarine, saturated
   amber, true black borders on warm bone. Kept in lockstep with the hex
   values in Quantum4Colorado.jsx and the shared /data color fields. */
export const colors = {
  primary: "#1A1AE5", // electric ultramarine
  primaryDark: "#05003D", // deep ink (hero gradient end)
  secondary: "#00A94F", // vivid green
  accent: "#FFB800", // saturated amber
  accentDark: "#C42B00", // deep accent for text on light surfaces
  danger: "#D50000", // strong red
  orange: "#FF6A00", // significant-exposure tier
  bg: "#F2EFE4", // warm bone
  surface: "#FFFFFF",
  textPrimary: "#0A0A0A",
  textSecondary: "#2B2B2B",
  textMuted: "#555555",
  border: "#0A0A0A", // black borders are the brutalist signature
  borderLight: "#0A0A0A",
  // tints (stronger than the previous washes so they still read as color)
  blueTint: "#DCDCFF",
  greenTint: "#D6F5E3",
  goldTint: "#FFF0C2",
  orangeTint: "#FFE3CC",
  redTint: "#FFDAD6",
};

/* Type stack — mirrors the web app (Unbounded display / Archivo body /
   Martian Mono technical accents). Loaded in App.js via useFonts; these
   names must match the keys passed to it. */
export const fonts = {
  display: "Unbounded_800ExtraBold",
  displayBlack: "Unbounded_900Black",
  body: "Archivo_500Medium",
  bodyBold: "Archivo_700Bold",
  bodyBlack: "Archivo_800ExtraBold",
  mono: "MartianMono_500Medium",
  monoBold: "MartianMono_700Bold",
};

export const mono = fonts.mono;

/* Brutalist: hard edges. Kept as a token so the pill toggle can opt back in. */
export const radius = {
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  pill: 999,
};

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

/* Hard offset shadow (no blur, full opacity) — the native equivalent of the
   web app's `shadow-hard` utility. */
export function shadow(level = 1) {
  if (level === 0) return {};
  const offset = { 1: 3, 2: 5, 3: 7 }[level] || 3;
  return {
    shadowColor: "#0A0A0A",
    shadowOffset: { width: offset, height: offset },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: level * 3,
  };
}

/* Picks black or white text for a given background so the bold palette's
   light colors (amber especially) stay readable on dynamically-colored
   chips. Web has the same helper in Quantum4Colorado.jsx. */
export function readableOn(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0A0A0A" : "#FFFFFF";
}

/* Add an alpha channel to a #RRGGBB hex value. */
export function withAlpha(hex, alpha) {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
