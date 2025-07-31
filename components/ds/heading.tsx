import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    size: {
      1: "text-4xl sm:text-5xl font-medium tracking-tight text-balance leading-tight",
      2: "text-3xl sm:text-4xl font-medium tracking-tight text-balance leading-tight",
      3: "text-2xl sm:text-3xl font-medium tracking-tight text-balance leading-tight",
      4: "text-xl sm:text-2xl tracking-tight text-balance leading-tight",
      5: "text-lg sm:text-xl tracking-tight text-balance leading-tight",
      6: "text-base sm:text-lg tracking-tight text-balance leading-tight",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: 2,
    color: "default",
    align: "left",
  },
});

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    Omit<VariantProps<typeof headingVariants>, "size"> {
  /** Heading size (1-6). Controls both visual size and semantic HTML element */
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  /** @deprecated Use `size` instead */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
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
    
    // Use 'as' prop if provided, otherwise use size to determine element
    const Component = as || (`h${headingSize}` as React.ElementType);

    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({ 
            size: headingSize, 
            color: finalColor, 
            align: finalAlign 
          }), 
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
