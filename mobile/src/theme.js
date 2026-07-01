import { Platform } from "react-native";

/* Quantum4Colorado — shared design tokens (native port of the web palette). */
export const colors = {
  primary: "#1B3A6B", // Colorado sky blue
  primaryDark: "#0E1E3A", // deep navy (hero gradient end)
  secondary: "#2E7D52", // Rocky Mountain forest green
  accent: "#C4872A", // sandstone gold
  accentDark: "#9c6a1c",
  danger: "#B03A2E", // deep red
  orange: "#DD6B20", // significant-exposure tier
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  textPrimary: "#1A1A2E",
  textSecondary: "#4A5568",
  textMuted: "#718096",
  border: "#E2E8F0",
  borderLight: "#EDF1F6",
  // soft tints
  blueTint: "#EAF1FB",
  greenTint: "#EAF5EF",
  goldTint: "#FBF3E6",
  orangeTint: "#FDEEE2",
  redTint: "#FBEAE8",
};

export const mono = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
});

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
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

/* Cross-platform elevation helper */
export function shadow(level = 1) {
  if (level === 0) return {};
  const map = {
    1: { h: 1, r: 3, o: 0.06, e: 2 },
    2: { h: 3, r: 8, o: 0.08, e: 4 },
    3: { h: 8, r: 18, o: 0.12, e: 8 },
  };
  const s = map[level] || map[1];
  return {
    shadowColor: "#0E1E3A",
    shadowoffset: undefined,
    shadowOffset: { width: 0, height: s.h },
    shadowOpacity: s.o,
    shadowRadius: s.r,
    elevation: s.e,
  };
}

/* Add an alpha channel to a #RRGGBB hex value. */
export function withAlpha(hex, alpha) {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
