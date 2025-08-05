/**
 * Design System Tokens
 * Simplified token values for consistent design
 */

/**
 * Spacing scale - used for margins, padding, gaps
 */
export const spacing = {
  none: "0",
  xs: "0.125rem", // 2px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
} as const;

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Border radius scale
 */
export const radius = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
} as const;

/**
 * Common transitions
 */
export const transitions = {
  fast: "150ms ease-in-out",
  base: "200ms ease-in-out",
  slow: "300ms ease-in-out",
} as const;

// Type exports
export type Spacing = keyof typeof spacing;
export type Breakpoint = keyof typeof breakpoints;
export type Radius = keyof typeof radius;
