/**
 * Typography scale tokens
 * Font sizes, line heights, and font weights
 */

/**
 * Font size scale
 */
export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
  base: ["1rem", { lineHeight: "1.5rem" }], // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
  "5xl": ["3rem", { lineHeight: "1" }], // 48px
  "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
  "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
  "8xl": ["6rem", { lineHeight: "1" }], // 96px
  "9xl": ["8rem", { lineHeight: "1" }], // 128px
} as const;

export type FontSizeScale = keyof typeof fontSize;

/**
 * Font weight scale
 */
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

export type FontWeightScale = keyof typeof fontWeight;

/**
 * Line height scale
 */
export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  3: ".75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
} as const;

export type LineHeightScale = keyof typeof lineHeight;

/**
 * Letter spacing scale
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

export type LetterSpacingScale = keyof typeof letterSpacing;

/**
 * Typography presets for common text styles
 */
export const typographyPresets = {
  // Headings
  h1: {
    fontSize: "text-4xl sm:text-5xl",
    fontWeight: "font-medium",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },
  h2: {
    fontSize: "text-3xl sm:text-4xl",
    fontWeight: "font-medium",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },
  h3: {
    fontSize: "text-2xl sm:text-3xl",
    fontWeight: "font-medium",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },
  h4: {
    fontSize: "text-xl sm:text-2xl",
    fontWeight: "font-normal",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },
  h5: {
    fontSize: "text-lg sm:text-xl",
    fontWeight: "font-normal",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },
  h6: {
    fontSize: "text-base sm:text-lg",
    fontWeight: "font-normal",
    lineHeight: "leading-tight",
    letterSpacing: "tracking-tight",
  },

  // Body text
  body: {
    fontSize: "text-base",
    fontWeight: "font-normal",
    lineHeight: "leading-7",
  },
  lead: {
    fontSize: "text-lg sm:text-xl",
    fontWeight: "font-normal",
    lineHeight: "leading-8",
  },
  small: {
    fontSize: "text-sm",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
  },
  tiny: {
    fontSize: "text-xs",
    fontWeight: "font-normal",
    lineHeight: "leading-4",
  },

  // Special styles
  code: {
    fontSize: "text-sm",
    fontWeight: "font-medium",
    fontFamily: "font-mono",
  },
  label: {
    fontSize: "text-sm",
    fontWeight: "font-medium",
    lineHeight: "leading-none",
  },
  caption: {
    fontSize: "text-xs",
    fontWeight: "font-normal",
    lineHeight: "leading-4",
  },
} as const;

export type TypographyPreset = keyof typeof typographyPresets;