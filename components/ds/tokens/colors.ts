/**
 * Color tokens
 * Semantic color values that adapt to light/dark themes
 */

/**
 * Semantic color tokens
 * These map to CSS variables defined in the global styles
 */
export const colors = {
  // Background colors
  background: {
    DEFAULT: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
  },

  // Card colors
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },

  // Popover colors
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },

  // Primary colors
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },

  // Secondary colors
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },

  // Muted colors
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },

  // Accent colors
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },

  // Destructive colors
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },

  // Border colors
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",

  // Chart colors (for data visualization)
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))",
  },
} as const;

/**
 * Color opacity modifiers
 * Use with Tailwind's opacity utilities
 */
export const opacity = {
  0: "0",
  5: "0.05",
  10: "0.1",
  15: "0.15",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  85: "0.85",
  90: "0.9",
  95: "0.95",
  100: "1",
} as const;

export type OpacityScale = keyof typeof opacity;

/**
 * Semantic color classes for common use cases
 */
export const semanticColors = {
  // Text colors
  text: {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    destructive: "text-destructive",
    inverse: "text-primary-foreground",
  },

  // Background colors
  bg: {
    default: "bg-background",
    card: "bg-card",
    muted: "bg-muted",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    destructive: "bg-destructive",
    popover: "bg-popover",
  },

  // Border colors
  border: {
    default: "border-border",
    input: "border-input",
    muted: "border-muted",
    primary: "border-primary",
    secondary: "border-secondary",
    destructive: "border-destructive",
  },

  // Ring colors (focus states)
  ring: {
    default: "ring-ring",
    primary: "ring-primary",
    secondary: "ring-secondary",
    destructive: "ring-destructive",
  },
} as const;