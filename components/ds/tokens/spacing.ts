/**
 * Spacing scale tokens
 * Consistent spacing values used throughout the design system
 */
export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

export type SpacingScale = keyof typeof spacing;

/**
 * Semantic spacing tokens
 * Named spacing values for common use cases
 */
export const semanticSpacing = {
  none: spacing[0],
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  "2xl": spacing[12],
  "3xl": spacing[16],
  "4xl": spacing[20],
  "5xl": spacing[24],
  "6xl": spacing[32],
} as const;

export type SemanticSpacing = keyof typeof semanticSpacing;

/**
 * Component-specific spacing defaults
 */
export const componentSpacing = {
  stack: {
    sm: "gap-2", // 8px
    md: "gap-4", // 16px
    lg: "gap-6", // 24px
    xl: "gap-8", // 32px
  },
  inline: {
    sm: "gap-2", // 8px
    md: "gap-4", // 16px
    lg: "gap-6", // 24px
    xl: "gap-8", // 32px
  },
  section: {
    sm: "py-8 sm:py-12", // 32px mobile, 48px desktop
    md: "py-12 sm:py-16", // 48px mobile, 64px desktop
    lg: "py-16 sm:py-20", // 64px mobile, 80px desktop
    xl: "py-20 sm:py-24", // 80px mobile, 96px desktop
  },
  container: {
    sm: "px-4 sm:px-6", // 16px mobile, 24px desktop
    md: "px-6 sm:px-8", // 24px mobile, 32px desktop
    lg: "px-8 sm:px-10", // 32px mobile, 40px desktop
  },
} as const;