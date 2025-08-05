import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inlineVariants = cva("flex flex-wrap", {
  variants: {
    spacing: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      reverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    spacing: "md",
    align: "center",
    justify: "start",
    wrap: "wrap",
  },
});

interface InlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof inlineVariants>, "spacing"> {
  /** Spacing between items: sm (8px), md (16px), lg (24px), xl (32px) */
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | string;
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
 * // Button group
 * <Inline spacing="md">
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
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
 * // Mixed content
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
      align,
      justify,
      wrap,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    // Apply compact prop
    const finalSpacing = compact ? "sm" : spacing;

    // Check if spacing is a custom Tailwind class
    const isCustomSpacing =
      finalSpacing && !["none", "sm", "md", "lg", "xl"].includes(finalSpacing);

    return (
      <Component
        ref={ref}
        className={cn(
          inlineVariants({
            spacing: isCustomSpacing
              ? undefined
              : (finalSpacing as "none" | "sm" | "md" | "lg" | "xl"),
            align,
            justify,
            wrap,
          }),
          isCustomSpacing && finalSpacing,
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
