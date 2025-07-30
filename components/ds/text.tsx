import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "ds-text-h1 font-medium tracking-tight text-balance",
      h2: "ds-text-h2 font-medium tracking-tight text-balance",
      h3: "ds-text-h3 font-medium tracking-tight text-balance",
      h4: "ds-text-h4 tracking-tight text-balance",
      h5: "ds-text-h5 tracking-tight text-balance",
      h6: "ds-text-h6 tracking-tight text-balance",
      body: "ds-text-body text-pretty",
      lead: "ds-text-lead text-pretty",
      large: "ds-text-large text-pretty",
      small: "ds-text-small",
      muted: "ds-text-muted text-muted-foreground",
      caption: "ds-text-caption text-muted-foreground",
      code: "rounded border bg-muted/50 px-1 py-px font-mono ds-text-code font-medium",
      link: "text-primary dark:text-primary/50 transition-all no-underline hover:underline hover:text-primary/100 underline-offset-2 decoration-primary/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
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
 * Extracts typography styles from the Prose component for reusability.
 *
 * @example
 * ```tsx
 * <Text variant="h1">Main Heading</Text>
 * <Text variant="body" color="muted">Description text</Text>
 * <Text variant="caption">Small caption</Text>
 * <Text variant="link" as="a" href="/about">Learn more</Text>
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
      as: Component = "p",
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = Component as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({ variant, color, weight, align }),
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
