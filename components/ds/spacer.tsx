import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  type ResponsiveValue, 
  responsive 
} from "./utils/responsive";

type SpacingValue = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | number | string;

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spacer. Can be responsive, a token key, number (rem), or custom class */
  size?: ResponsiveValue<SpacingValue>;
  /** Direction of the spacer */
  axis?: "horizontal" | "vertical" | "both";
  /** Whether the spacer should grow to fill available space */
  grow?: boolean;
  /** Whether the spacer should shrink if needed */
  shrink?: boolean;
  /** HTML element to render */
  as?: React.ElementType;
}

/**
 * Spacer component for adding flexible space between elements
 * 
 * @example
 * ```tsx
 * // Fixed spacing
 * <Spacer size={4} /> // 16px (1rem)
 * <Spacer size="lg" /> // Using semantic token
 * 
 * // Responsive spacing
 * <Spacer size={{ base: 2, md: 4, lg: 8 }} />
 * 
 * // Flexible spacer that grows
 * <div className="flex">
 *   <Button>Left</Button>
 *   <Spacer grow />
 *   <Button>Right</Button>
 * </div>
 * 
 * // Horizontal spacer
 * <div className="flex items-center">
 *   <Icon />
 *   <Spacer size={2} axis="horizontal" />
 *   <Text>Label</Text>
 * </div>
 * 
 * // Custom size with Tailwind class
 * <Spacer size="h-20 w-20" />
 * ```
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      className,
      size = 4,
      axis = "vertical",
      grow = false,
      shrink = false,
      as: Component = "div",
      style,
      ...props
    },
    ref
  ) => {
    // Handle grow/shrink
    if (grow || shrink) {
      const flexClasses = cn(
        grow && "flex-grow",
        shrink && "flex-shrink",
        !grow && !shrink && "flex-shrink-0"
      );
      
      return (
        <Component
          ref={ref}
          className={cn(flexClasses, className)}
          aria-hidden="true"
          {...props}
        />
      );
    }

    // Convert size value to class or style
    const getSizeClass = (value: SpacingValue): string => {
      // If it's a custom Tailwind class
      if (typeof value === "string" && (value.includes("-") || value.includes(" "))) {
        return value;
      }
      
      // Simple spacing map
      const spacingMap: Record<string, string> = {
        xs: "0.125rem", // 2px
        sm: "0.5rem",   // 8px
        md: "1rem",     // 16px
        lg: "1.5rem",   // 24px
        xl: "2rem",     // 32px
        "2xl": "3rem",  // 48px
        "3xl": "4rem",  // 64px
      };
      
      // If it's a semantic spacing value
      if (typeof value === "string" && value in spacingMap) {
        const size = spacingMap[value];
        if (axis === "horizontal") {
          return `w-[${size}]`;
        } else if (axis === "vertical") {
          return `h-[${size}]`;
        } else {
          return `w-[${size}] h-[${size}]`;
        }
      }
      
      // If it's a number, use as rem value
      if (typeof value === "number") {
        const remValue = `${value}rem`;
        if (axis === "horizontal") {
          return `w-[${remValue}]`;
        } else if (axis === "vertical") {
          return `h-[${remValue}]`;
        } else {
          return `w-[${remValue}] h-[${remValue}]`;
        }
      }
      
      return "";
    };

    const sizeClasses = responsive(size, getSizeClass);

    return (
      <Component
        ref={ref}
        className={cn(sizeClasses, "flex-shrink-0", className)}
        aria-hidden="true"
        style={style}
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";