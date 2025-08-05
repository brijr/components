import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

type SpacingValue = "none" | "sm" | "md" | "lg" | "xl";
type AlignValue = "start" | "center" | "end" | "baseline" | "stretch";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";
type WrapValue = "wrap" | "nowrap" | "reverse";

interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between items. Can be responsive or custom Tailwind class */
  spacing?: ResponsiveValue<SpacingValue> | string;
  /** Alignment of items. Can be responsive */
  align?: ResponsiveValue<AlignValue>;
  /** Justification of items. Can be responsive */
  justify?: ResponsiveValue<JustifyValue>;
  /** Wrap behavior. Can be responsive */
  wrap?: ResponsiveValue<WrapValue>;
  /** Shorthand for spacing="sm" */
  compact?: boolean;
  /** HTML element to render */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Inline component for consistent horizontal spacing between elements.
 * Automatically wraps items when they don't fit.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Inline spacing="sm">
 *   <Badge>New</Badge>
 *   <Badge>Featured</Badge>
 *   <Badge>Popular</Badge>
 * </Inline>
 *
 * // Responsive spacing
 * <Inline spacing={{ base: "sm", md: "md", lg: "lg" }}>
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </Inline>
 *
 * // Responsive alignment
 * <Inline align={{ base: "center", md: "start" }} justify={{ base: "center", md: "between" }}>
 *   <Logo />
 *   <Navigation />
 * </Inline>
 *
 * // Compact spacing
 * <Inline compact>
 *   <Icon />
 *   <Text>Settings</Text>
 * </Inline>
 *
 * // With custom gap class
 * <Inline spacing="gap-1">
 *   <Chip>One</Chip>
 *   <Chip>Two</Chip>
 * </Inline>
 *
 * // Mixed content with baseline alignment
 * <Inline spacing="lg" align="baseline">
 *   <Text weight="semibold">Sort:</Text>
 *   <Button variant="ghost" size="sm">Date</Button>
 *   <Button variant="ghost" size="sm">Name</Button>
 * </Inline>
 * ```
 */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      className,
      spacing,
      compact,
      align = "center",
      justify = "start",
      wrap = "wrap",
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    // Apply compact prop
    const finalSpacing = compact ? "sm" : spacing || "md";

    // Check if spacing is a custom Tailwind class
    const isCustomSpacing =
      typeof finalSpacing === "string" &&
      !["none", "sm", "md", "lg", "xl"].includes(finalSpacing);

    // Build spacing classes
    const spacingClasses = isCustomSpacing
      ? finalSpacing
      : responsive(finalSpacing as ResponsiveValue<SpacingValue>, (value) => {
          switch (value) {
            case "none":
              return "gap-0";
            case "sm":
              return "gap-2";
            case "md":
              return "gap-4";
            case "lg":
              return "gap-6";
            case "xl":
              return "gap-8";
            default:
              return "gap-4";
          }
        });

    // Build alignment classes
    const alignClasses = responsive(align, (value) => {
      switch (value) {
        case "start":
          return "items-start";
        case "center":
          return "items-center";
        case "end":
          return "items-end";
        case "baseline":
          return "items-baseline";
        case "stretch":
          return "items-stretch";
        default:
          return "items-center";
      }
    });

    // Build justify classes
    const justifyClasses = responsive(justify, (value) => {
      switch (value) {
        case "start":
          return "justify-start";
        case "center":
          return "justify-center";
        case "end":
          return "justify-end";
        case "between":
          return "justify-between";
        case "around":
          return "justify-around";
        case "evenly":
          return "justify-evenly";
        default:
          return "justify-start";
      }
    });

    // Build wrap classes
    const wrapClasses = responsive(wrap, (value) => {
      switch (value) {
        case "wrap":
          return "flex-wrap";
        case "nowrap":
          return "flex-nowrap";
        case "reverse":
          return "flex-wrap-reverse";
        default:
          return "flex-wrap";
      }
    });

    return (
      <Component
        ref={ref}
        className={cn(
          "flex",
          spacingClasses,
          alignClasses,
          justifyClasses,
          wrapClasses,
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Inline.displayName = "Inline";