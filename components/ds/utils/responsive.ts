import * as React from "react";

/**
 * Breakpoint values matching Tailwind's default breakpoints
 */
export const breakpoints = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * A value that can be responsive across breakpoints
 * Can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Check if a value is a responsive object
 */
export function isResponsiveValue<T>(
  value: ResponsiveValue<T>
): value is Partial<Record<Breakpoint, T>> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).some((key) => key in breakpoints)
  );
}

/**
 * Convert a responsive value to Tailwind classes
 * 
 * @example
 * ```tsx
 * // Single value
 * responsive(2, (v) => `gap-${v}`) // "gap-2"
 * 
 * // Responsive object
 * responsive(
 *   { base: 2, md: 4, lg: 6 },
 *   (v) => `gap-${v}`
 * ) // "gap-2 md:gap-4 lg:gap-6"
 * ```
 */
export function responsive<T>(
  value: ResponsiveValue<T> | undefined,
  classMap: (val: T, breakpoint?: Breakpoint) => string | undefined
): string {
  if (value === undefined) return "";

  if (!isResponsiveValue(value)) {
    const className = classMap(value);
    return className || "";
  }

  const classes: string[] = [];
  const sortedBreakpoints = Object.keys(breakpoints) as Breakpoint[];

  sortedBreakpoints.forEach((bp) => {
    if (bp in value) {
      const val = value[bp];
      if (val !== undefined) {
        const className = classMap(val, bp);
        if (className) {
          if (bp === "base") {
            classes.push(className);
          } else {
            classes.push(`${bp}:${className}`);
          }
        }
      }
    }
  });

  return classes.join(" ");
}

/**
 * Map responsive values to CSS variable values
 * Useful for inline styles with responsive values
 */
export function responsiveStyle<T>(
  value: ResponsiveValue<T> | undefined,
  styleMap: (val: T) => React.CSSProperties
): React.CSSProperties {
  if (value === undefined) return {};
  
  if (!isResponsiveValue(value)) {
    return styleMap(value);
  }

  // For responsive values, we return the base value
  // (CSS-in-JS responsive would need a different approach)
  const baseValue = value.base || value.sm || value.md || value.lg || value.xl || value["2xl"];
  return baseValue ? styleMap(baseValue) : {};
}

/**
 * Hook to get the current breakpoint
 * Useful for runtime responsive behavior
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("base");

  React.useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const width = window.innerWidth;
      const sortedBreakpoints = Object.entries(breakpoints)
        .sort(([, a], [, b]) => b - a) as [Breakpoint, number][];

      for (const [bp, minWidth] of sortedBreakpoints) {
        if (width >= minWidth) {
          return bp;
        }
      }
      return "base";
    };

    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook to get the current value for a responsive prop
 * 
 * @example
 * ```tsx
 * const spacing = useResponsive({ base: "sm", md: "md", lg: "xl" });
 * // Returns "sm" on mobile, "md" on tablet, "xl" on desktop
 * ```
 */
export function useResponsive<T>(value: ResponsiveValue<T>): T {
  const breakpoint = useBreakpoint();

  if (!isResponsiveValue(value)) {
    return value;
  }

  // Find the value for current breakpoint or fall back to smaller ones
  const sortedBreakpoints = Object.keys(breakpoints) as Breakpoint[];
  const currentIndex = sortedBreakpoints.indexOf(breakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    const bp = sortedBreakpoints[i];
    if (bp in value && value[bp] !== undefined) {
      return value[bp]!;
    }
  }

  // If no value found, try to find any value
  for (const bp of sortedBreakpoints) {
    if (bp in value && value[bp] !== undefined) {
      return value[bp]!;
    }
  }

  // This shouldn't happen if the value is properly defined
  throw new Error("No responsive value found");
}

/**
 * Create a responsive prop handler for components
 * 
 * @example
 * ```tsx
 * const sizeClasses = createResponsiveProp(
 *   size,
 *   (v) => `text-${v}xl`
 * );
 * ```
 */
export function createResponsiveProp<T>(
  value: ResponsiveValue<T> | undefined,
  defaultValue: T,
  classMap: (val: T) => string
): string {
  if (value === undefined) {
    return classMap(defaultValue);
  }
  return responsive(value, classMap);
}