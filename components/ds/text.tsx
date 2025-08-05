import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

type TextVariant = "body" | "lead" | "small" | "muted" | "code" | "link";
type TextAlign = "left" | "center" | "right";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  /** Text variant style */
  variant?: TextVariant;
  /** Text size. Can be responsive */
  size?: ResponsiveValue<TextSize>;
  /** Text alignment. Can be responsive */
  align?: ResponsiveValue<TextAlign>;
  /** Font weight. Can be responsive */
  weight?: ResponsiveValue<TextWeight>;
  /** Muted text color */
  color?: "default" | "muted";
  /** Shorthand for align="center" */
  centered?: boolean;
  /** Shorthand for color="muted" */
  subdued?: boolean;
  /** HTML element to render */
  as?:
    | "p"
    | "span"
    | "div"
    | "strong"
    | "em"
    | "small"
    | "del"
    | "ins"
    | "sub"
    | "sup"
    | "code"
    | "a";
  children?: React.ReactNode;
}

/**
 * Text component for consistent typography across the application.
 * For headings, use the Heading component instead.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Text>Regular body text</Text>
 * <Text variant="lead">Introductory paragraph</Text>
 * <Text variant="small" subdued>Fine print</Text>
 *
 * // With responsive size
 * <Text size={{ base: "sm", md: "base", lg: "lg" }}>
 *   Responsive text size
 * </Text>
 *
 * // With responsive alignment
 * <Text align={{ base: "center", md: "left" }}>
 *   Responsive alignment
 * </Text>
 *
 * // Special variants
 * <Text variant="code">const example = true</Text>
 * <Text variant="link" as="a" href="/docs">Documentation</Text>
 *
 * // With modifiers
 * <Text weight="semibold">Important note</Text>
 * <Text variant="lead" centered>Hero subtitle</Text>
 * ```
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant = "body",
      size,
      align,
      weight,
      color,
      centered,
      subdued,
      as: Component = "p",
      children,
      ...props
    },
    ref,
  ) => {
    // Apply convenience props
    const finalAlign = centered ? "center" : align;
    const finalColor = subdued ? "muted" : color;

    // Build size classes
    const sizeClasses = size
      ? responsive(size, (value) => {
          switch (value) {
            case "xs":
              return "text-xs";
            case "sm":
              return "text-sm";
            case "base":
              return "text-base";
            case "lg":
              return "text-lg";
            case "xl":
              return "text-xl";
            case "2xl":
              return "text-2xl";
            default:
              return "text-base";
          }
        })
      : "";

    // Build alignment classes
    const alignClasses = finalAlign
      ? responsive(finalAlign, (value) => {
          switch (value) {
            case "left":
              return "text-left";
            case "center":
              return "text-center";
            case "right":
              return "text-right";
            default:
              return "";
          }
        })
      : "";

    // Build weight classes
    const weightClasses = weight
      ? responsive(weight, (value) => {
          switch (value) {
            case "normal":
              return "font-normal";
            case "medium":
              return "font-medium";
            case "semibold":
              return "font-semibold";
            case "bold":
              return "font-bold";
            default:
              return "";
          }
        })
      : "";

    // Build variant classes
    const variantClasses = (() => {
      switch (variant) {
        case "body":
          return "text-pretty";
        case "lead":
          return size ? "" : "text-lg sm:text-xl text-pretty";
        case "small":
          return size ? "leading-normal" : "text-sm leading-normal";
        case "muted":
          return size ? "text-muted-foreground leading-normal" : "text-sm text-muted-foreground leading-normal";
        case "code":
          return "rounded border bg-muted/50 px-1 py-px font-mono text-sm font-medium";
        case "link":
          return "text-primary transition-colors no-underline hover:underline hover:text-primary/80 underline-offset-2 decoration-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";
        default:
          return "";
      }
    })();

    const Comp = Component as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={cn(
          // Base styles
          !size && "text-base",
          // Variant styles
          variantClasses,
          // Size (overrides variant default size)
          sizeClasses,
          // Alignment
          alignClasses,
          // Weight
          weightClasses,
          // Color
          finalColor === "muted" && "text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Text.displayName = "Text";