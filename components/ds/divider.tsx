import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

type OrientationValue = "horizontal" | "vertical";
type VariantValue = "solid" | "dashed" | "dotted";
type ThicknessValue = "thin" | "medium" | "thick";
type ColorValue = "default" | "muted" | "primary" | "secondary";

interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** Orientation of the divider. Can be responsive */
  orientation?: ResponsiveValue<OrientationValue>;
  /** Visual style variant. Can be responsive */
  variant?: ResponsiveValue<VariantValue>;
  /** Thickness of the divider. Can be responsive */
  thickness?: ResponsiveValue<ThicknessValue>;
  /** Color of the divider */
  color?: ColorValue;
  /** Text or element to display in the middle of the divider */
  children?: React.ReactNode;
  /** Position of the text (if provided) */
  textAlign?: "left" | "center" | "right";
  /** Decorative element (ignored by screen readers) */
  decorative?: boolean;
}

/**
 * Divider component for visual separation between content
 *
 * @example
 * ```tsx
 * // Simple horizontal divider
 * <Divider />
 *
 * // Divider with text
 * <Divider>OR</Divider>
 *
 * // Vertical divider in a flex container
 * <div className="flex items-center gap-4">
 *   <span>Option A</span>
 *   <Divider orientation="vertical" className="h-6" />
 *   <span>Option B</span>
 * </div>
 *
 * // Responsive orientation
 * <Divider orientation={{ base: "horizontal", md: "vertical" }} />
 *
 * // Dashed divider with custom color
 * <Divider variant="dashed" color="primary" />
 *
 * // Responsive thickness
 * <Divider thickness={{ base: "thin", md: "medium", lg: "thick" }} />
 *
 * // Divider with aligned text
 * <Divider textAlign="left">Section Title</Divider>
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      thickness = "thin",
      color = "default",
      textAlign = "center",
      decorative = true,
      children,
      ...props
    },
    ref,
  ) => {
    // Build orientation classes
    const orientationClasses = responsive(orientation, (value) => {
      return value === "horizontal" ? "w-full" : "h-full";
    });

    // Build thickness classes
    const thicknessClasses = responsive(thickness, (value) => {
      const isHorizontal = 
        typeof orientation === "string" 
          ? orientation === "horizontal" 
          : orientation.base === "horizontal" || orientation.sm === "horizontal";
      
      if (isHorizontal) {
        switch (value) {
          case "thin":
            return "h-px";
          case "medium":
            return "h-[2px]";
          case "thick":
            return "h-1";
          default:
            return "h-px";
        }
      } else {
        switch (value) {
          case "thin":
            return "w-px";
          case "medium":
            return "w-[2px]";
          case "thick":
            return "w-1";
          default:
            return "w-px";
        }
      }
    });

    // Build variant classes
    const variantClasses = responsive(variant, (value) => {
      const isHorizontal = 
        typeof orientation === "string" 
          ? orientation === "horizontal" 
          : orientation.base === "horizontal" || orientation.sm === "horizontal";
      
      switch (value) {
        case "dashed":
          return isHorizontal 
            ? "border-t border-dashed bg-transparent" 
            : "border-l border-dashed bg-transparent";
        case "dotted":
          return isHorizontal 
            ? "border-t border-dotted bg-transparent" 
            : "border-l border-dotted bg-transparent";
        case "solid":
        default:
          return "";
      }
    });

    // Build color classes
    const colorClasses = (() => {
      const isBorder = variant === "dashed" || variant === "dotted";
      
      if (isBorder) {
        switch (color) {
          case "muted":
            return "border-muted";
          case "primary":
            return "border-primary";
          case "secondary":
            return "border-secondary";
          case "default":
          default:
            return "border-border";
        }
      } else {
        switch (color) {
          case "muted":
            return "bg-muted";
          case "primary":
            return "bg-primary";
          case "secondary":
            return "bg-secondary";
          case "default":
          default:
            return "bg-border";
        }
      }
    })();

    // If there's no content, render a simple divider
    if (!children) {
      return (
        <div
          ref={ref}
          role={decorative ? "presentation" : "separator"}
          aria-orientation={
            typeof orientation === "string" 
              ? orientation as "horizontal" | "vertical"
              : "horizontal"
          }
          className={cn(
            orientationClasses,
            thicknessClasses,
            variantClasses,
            colorClasses,
            className,
          )}
          {...props}
        />
      );
    }

    // Render divider with content
    const isHorizontal = 
      typeof orientation === "string" 
        ? orientation === "horizontal" 
        : true; // Default to horizontal for responsive values
    
    const containerClasses = isHorizontal
      ? "flex items-center w-full"
      : "flex flex-col items-center h-full";

    const lineClasses = cn(
      orientationClasses,
      thicknessClasses,
      variantClasses,
      colorClasses,
      "flex-1",
    );

    const textClasses = cn(
      isHorizontal ? "px-3" : "py-3",
      "text-sm text-muted-foreground flex-shrink-0",
    );

    // Determine the order of elements based on text alignment
    const leftLine = <div className={lineClasses} />;
    const rightLine = <div className={lineClasses} />;
    const content = <span className={textClasses}>{children}</span>;

    if (isHorizontal) {
      if (textAlign === "left") {
        return (
          <div ref={ref} className={cn(containerClasses, className)} {...props}>
            <div className={cn(lineClasses, "w-4 flex-none")} />
            {content}
            {rightLine}
          </div>
        );
      }
      if (textAlign === "right") {
        return (
          <div ref={ref} className={cn(containerClasses, className)} {...props}>
            {leftLine}
            {content}
            <div className={cn(lineClasses, "w-4 flex-none")} />
          </div>
        );
      }
    }

    // Default center alignment or vertical orientation
    return (
      <div
        ref={ref}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={
          typeof orientation === "string" 
            ? orientation as "horizontal" | "vertical"
            : "horizontal"
        }
        className={cn(containerClasses, className)}
        {...props}
      >
        {leftLine}
        {content}
        {rightLine}
      </div>
    );
  },
);

Divider.displayName = "Divider";