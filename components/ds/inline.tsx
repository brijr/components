import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inlineVariants = cva("flex flex-wrap", {
  variants: {
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
      "3xl": "gap-16",
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
    VariantProps<typeof inlineVariants> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Inline component for consistent horizontal spacing between elements.
 * Automatically wraps items when they don't fit.
 *
 * @example
 * ```tsx
 * <Inline spacing="sm">
 *   <Badge>New</Badge>
 *   <Badge>Featured</Badge>
 *   <Badge>Popular</Badge>
 * </Inline>
 *
 * <Inline spacing="lg" align="center">
 *   <Button>Primary</Button>
 *   <Button variant="outline">Secondary</Button>
 *   <Text color="muted">or</Text>
 *   <Button variant="link">Skip</Button>
 * </Inline>
 * ```
 */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      className,
      spacing,
      align,
      justify,
      wrap,
      as: Component = "div",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          inlineVariants({ spacing, align, justify, wrap, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Inline.displayName = "Inline";
