import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
    thickness: {
      thin: "",
      medium: "",
      thick: "",
    },
    color: {
      default: "bg-border",
      muted: "bg-muted",
      primary: "bg-primary",
      secondary: "bg-secondary",
    },
  },
  compoundVariants: [
    // Horizontal variants
    {
      orientation: "horizontal",
      thickness: "thin",
      className: "h-px",
    },
    {
      orientation: "horizontal",
      thickness: "medium",
      className: "h-[2px]",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      className: "h-1",
    },
    {
      orientation: "horizontal",
      variant: "dashed",
      className: "border-t border-dashed bg-transparent",
    },
    {
      orientation: "horizontal",
      variant: "dotted",
      className: "border-t border-dotted bg-transparent",
    },
    // Vertical variants
    {
      orientation: "vertical",
      thickness: "thin",
      className: "w-px",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      className: "w-[2px]",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      className: "w-1",
    },
    {
      orientation: "vertical",
      variant: "dashed",
      className: "border-l border-dashed bg-transparent",
    },
    {
      orientation: "vertical",
      variant: "dotted",
      className: "border-l border-dotted bg-transparent",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    thickness: "thin",
    color: "default",
  },
});

interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof dividerVariants> {
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
 * // Dashed divider with custom color
 * <Divider variant="dashed" color="primary" />
 *
 * // Thick divider
 * <Divider thickness="thick" />
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
    // If there's no content, render a simple divider
    if (!children) {
      return (
        <div
          ref={ref}
          role={decorative ? "presentation" : "separator"}
          aria-orientation={orientation as "horizontal" | "vertical"}
          className={cn(
            dividerVariants({ orientation, variant, thickness, color }),
            variant === "dashed" || variant === "dotted"
              ? color === "default"
                ? "border-border"
                : color === "muted"
                  ? "border-muted"
                  : color === "primary"
                    ? "border-primary"
                    : "border-secondary"
              : "",
            className,
          )}
          {...props}
        />
      );
    }

    // Render divider with content
    const isHorizontal = orientation === "horizontal";
    const containerClasses = isHorizontal
      ? "flex items-center w-full"
      : "flex flex-col items-center h-full";

    const lineClasses = cn(
      dividerVariants({ orientation, variant, thickness, color }),
      variant === "dashed" || variant === "dotted"
        ? color === "default"
          ? "border-border"
          : color === "muted"
            ? "border-muted"
            : color === "primary"
              ? "border-primary"
              : "border-secondary"
        : "",
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
        aria-orientation={orientation as "horizontal" | "vertical"}
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
