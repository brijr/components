import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  type ResponsiveValue, 
  responsive 
} from "./utils/responsive";
import { spacing as spacingTokens } from "./tokens/spacing";

type SpacingValue = keyof typeof spacingTokens | number | string;

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
      
      // If it's a spacing token key
      if (typeof value === "string" && value in spacingTokens) {
        const tokenValue = spacingTokens[value as keyof typeof spacingTokens];
        if (axis === "horizontal") {
          return `w-[${tokenValue}]`;
        } else if (axis === "vertical") {
          return `h-[${tokenValue}]`;
        } else {
          return `w-[${tokenValue}] h-[${tokenValue}]`;
        }
      }
      
      // If it's a semantic spacing value
      const semanticMap: Record<string, string> = {
        xs: "1",
        sm: "2", 
        md: "4",
        lg: "6",
        xl: "8",
        "2xl": "12",
        "3xl": "16",
        "4xl": "20",
        "5xl": "24",
        "6xl": "32",
      };
      
      if (typeof value === "string" && value in semanticMap) {
        const mappedValue = spacingTokens[semanticMap[value] as keyof typeof spacingTokens];
        if (axis === "horizontal") {
          return `w-[${mappedValue}]`;
        } else if (axis === "vertical") {
          return `h-[${mappedValue}]`;
        } else {
          return `w-[${mappedValue}] h-[${mappedValue}]`;
        }
      }
      
      // If it's a number, treat as spacing scale key
      if (typeof value === "number") {
        const tokenValue = spacingTokens[value as keyof typeof spacingTokens];
        if (tokenValue) {
          if (axis === "horizontal") {
            return `w-[${tokenValue}]`;
          } else if (axis === "vertical") {
            return `h-[${tokenValue}]`;
          } else {
            return `w-[${tokenValue}] h-[${tokenValue}]`;
          }
        }
        // Fallback to rem value
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