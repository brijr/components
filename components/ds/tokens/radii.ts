/**
 * Border radius tokens
 * Consistent corner radius values
 */

/**
 * Radius scale
 */
export const radii = {
  none: "0px",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

export type RadiusScale = keyof typeof radii;

/**
 * Semantic radius tokens
 */
export const semanticRadii = {
  button: radii.md,
  input: radii.md,
  card: radii.lg,
  dialog: radii.lg,
  dropdown: radii.md,
  badge: radii.full,
  avatar: radii.full,
  tooltip: radii.md,
} as const;

/**
 * Component-specific radius classes
 */
export const componentRadii = {
  button: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  },
  card: {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  },
  input: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  },
  badge: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  },
} as const;