/**
 * Breakpoint tokens
 * Responsive design breakpoints matching Tailwind defaults
 */

/**
 * Breakpoint values in pixels
 */
export const breakpoints = {
  base: 0,
  sm: 640, // Small devices (landscape phones)
  md: 768, // Medium devices (tablets)
  lg: 1024, // Large devices (desktops)
  xl: 1280, // Extra large devices (large desktops)
  "2xl": 1536, // 2X large devices (larger desktops)
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Media query strings for use in CSS-in-JS
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]}px)`,
} as const;

/**
 * Container max widths at different breakpoints
 */
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Common responsive patterns
 */
export const responsivePatterns = {
  // Hide/show at breakpoints
  hideBelow: {
    sm: "hidden sm:block",
    md: "hidden md:block",
    lg: "hidden lg:block",
    xl: "hidden xl:block",
  },
  hideAbove: {
    sm: "block sm:hidden",
    md: "block md:hidden",
    lg: "block lg:hidden",
    xl: "block xl:hidden",
  },
  
  // Grid columns
  gridCols: {
    "1-2": "grid-cols-1 sm:grid-cols-2",
    "1-2-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "1-2-3-4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    "1-2-4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    "2-3-4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  },
  
  // Flex direction
  flexDirection: {
    "col-row": "flex-col sm:flex-row",
    "col-row-md": "flex-col md:flex-row",
    "col-row-lg": "flex-col lg:flex-row",
  },
} as const;