import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base text-pretty",
      lead: "text-lg sm:text-xl text-pretty",
      small: "text-sm leading-normal",
      muted: "text-sm text-muted-foreground leading-normal",
      code: "rounded border bg-muted/50 px-1 py-px font-mono text-sm font-medium",
      link: "text-primary transition-colors no-underline hover:underline hover:text-primary/80 underline-offset-2 decoration-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
    weight: "normal",
    align: "left",
  },
});

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
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
  /** Shorthand for align="center" */
  centered?: boolean;
  /** Shorthand for color="muted" */
  subdued?: boolean;
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
 * // With convenience props
 * <Text centered>Centered text</Text>
 * <Text subdued>Muted secondary text</Text>
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
      variant,
      color,
      weight,
      align,
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

    const Comp = Component as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({
            variant,
            color: finalColor,
            weight,
            align: finalAlign,
          }),
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
