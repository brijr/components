import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive, isResponsiveValue } from "./utils/responsive";

type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> {
  /** Heading size (1-6). Controls both visual size and semantic HTML element. Can be responsive */
  size?: ResponsiveValue<HeadingSize>;
  /** @deprecated Use `size` instead */
  level?: HeadingSize;
  /** Text alignment. Can be responsive */
  align?: ResponsiveValue<"left" | "center" | "right">;
  /** Text color */
  color?: "default" | "muted";
  /** Shorthand for align="center" */
  centered?: boolean;
  /** Shorthand for color="muted" */
  subdued?: boolean;
  /** Override semantic element while keeping visual style */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
}

/**
 * Heading component for consistent heading styles across the application.
 * Automatically uses the correct semantic HTML element based on size.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Heading size={1}>Page Title</Heading>
 * <Heading size={2}>Section Title</Heading>
 * 
 * // With convenience props
 * <Heading size={1} centered>Centered Hero Title</Heading>
 * <Heading size={2} subdued>Muted Section Title</Heading>
 * 
 * // With custom styling
 * <Heading size={3} className="text-primary">Custom Color</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className, 
    size, 
    level, 
    color, 
    align, 
    centered, 
    subdued, 
    as, 
    children, 
    ...props 
  }, ref) => {
    // Support legacy 'level' prop
    const headingSize = size || level || 2;
    
    // Apply convenience props
    const finalAlign = centered ? "center" : align;
    const finalColor = subdued ? "muted" : color;
    
    // Determine the semantic element
    // If size is responsive, use the base value for the element
    const semanticSize = isResponsiveValue(headingSize) 
      ? headingSize.base || headingSize.sm || headingSize.md || 2
      : headingSize;
    
    // Use 'as' prop if provided, otherwise use size to determine element
    const Component = as || (`h${semanticSize}` as React.ElementType);

    // Generate responsive classes for size
    const sizeClasses = responsive(headingSize, (value) => {
      const sizeMap = {
        1: "text-4xl sm:text-5xl font-medium tracking-tight text-balance leading-[1.1]",
        2: "text-3xl sm:text-4xl font-medium tracking-tight text-balance leading-[1.2]",
        3: "text-2xl sm:text-3xl font-medium tracking-tight text-balance leading-[1.3]",
        4: "text-xl sm:text-2xl tracking-tight text-balance leading-tight",
        5: "text-lg sm:text-xl tracking-tight text-balance leading-tight",
        6: "text-base sm:text-lg tracking-tight text-balance leading-tight",
      };
      return sizeMap[value as 1 | 2 | 3 | 4 | 5 | 6];
    });

    // Generate responsive classes for alignment
    const alignClasses = finalAlign 
      ? responsive(finalAlign, (value) => {
          const alignMap = {
            left: "text-left",
            center: "text-center",
            right: "text-right",
          };
          return alignMap[value];
        })
      : "";

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClasses,
          alignClasses,
          finalColor === "muted" && "text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";
