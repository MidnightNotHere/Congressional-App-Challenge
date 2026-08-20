/* Drawing tokens for the course diagrams (native port of
   src/education/diagrams/tokens.js in the web app).

   One difference from web worth knowing: SVG text here can't rely on
   fontWeight, because the app loads specific named font files rather than
   a variable family. Every weight is therefore its own fontFamily value —
   `monoBold` instead of mono + fontWeight 700. */

import { colors, fonts } from "../../theme";

export const D = {
  ink: colors.textPrimary,
  blue: colors.primary,
  gold: colors.accent,
  green: colors.secondary,
  red: colors.danger,
  rust: colors.accentDark,
  cream: colors.bg,
  white: colors.surface,
  muted: colors.textSecondary,

  mono: fonts.mono,
  monoBold: fonts.monoBold,
  sans: fonts.body,
  sansBold: fonts.bodyBold,
};

/* Matches the 2px borders used on cards throughout the app. */
export const STROKE = 2.5;

/* Every diagram is drawn against a 600-unit-wide viewBox and scaled to fit
   the screen, so coordinates can be copied straight across from the web
   versions without rescaling by hand. */
export const VB_WIDTH = 600;
