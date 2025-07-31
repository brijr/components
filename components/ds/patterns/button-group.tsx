import * as React from "react";
import { Inline } from "../inline";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  /** Spacing between buttons: sm, md, lg */
  spacing?: "sm" | "md" | "lg";
  /** Alignment of buttons */
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  /** Justification of button group */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Whether buttons should wrap to new line */
  wrap?: "wrap" | "nowrap" | "reverse";
  /** Button elements */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * ButtonGroup pattern component for consistent button layouts.
 * Pre-configured Inline component optimized for button groups.
 * 
 * @example
 * ```tsx
 * // Basic button group
 * <ButtonGroup>
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </ButtonGroup>
 * 
 * // With custom spacing
 * <ButtonGroup spacing="lg">
 *   <Button size="lg">Get Started</Button>
 *   <Button size="lg" variant="outline">Learn More</Button>
 * </ButtonGroup>
 * 
 * // Centered buttons
 * <ButtonGroup justify="center">
 *   <Button>Previous</Button>
 *   <Button>Next</Button>
 * </ButtonGroup>
 * 
 * // Full width justified
 * <ButtonGroup justify="between" className="w-full">
 *   <Button variant="ghost">Back</Button>
 *   <Button>Continue</Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
  spacing = "md",
  align = "center",
  justify = "start",
  wrap = "wrap",
  children,
  className,
}: ButtonGroupProps) {
  return (
    <Inline
      spacing={spacing}
      align={align}
      justify={justify}
      wrap={wrap}
      className={className}
    >
      {children}
    </Inline>
  );
}