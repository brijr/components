/**
 * Shadow tokens
 * Consistent elevation and shadow values
 */

/**
 * Shadow scale
 */
export const shadows = {
  none: "0 0 #0000",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

export type ShadowScale = keyof typeof shadows;

/**
 * Semantic shadow tokens for elevation levels
 */
export const elevation = {
  0: "shadow-none",
  1: "shadow-sm",
  2: "shadow",
  3: "shadow-md",
  4: "shadow-lg",
  5: "shadow-xl",
  6: "shadow-2xl",
} as const;

export type ElevationLevel = keyof typeof elevation;

/**
 * Component-specific shadows
 */
export const componentShadows = {
  card: {
    default: "shadow-sm",
    hover: "shadow-md",
    active: "shadow",
  },
  button: {
    default: "shadow-sm",
    hover: "shadow",
    active: "shadow-none",
  },
  dropdown: {
    default: "shadow-lg",
  },
  dialog: {
    default: "shadow-xl",
  },
  tooltip: {
    default: "shadow-md",
  },
  popover: {
    default: "shadow-lg",
  },
} as const;

/**
 * Focus ring styles
 */
export const focusRing = {
  default: "ring-2 ring-ring ring-offset-2 ring-offset-background",
  primary: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  secondary: "ring-2 ring-secondary ring-offset-2 ring-offset-background",
  destructive: "ring-2 ring-destructive ring-offset-2 ring-offset-background",
  none: "ring-0",
} as const;