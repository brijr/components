import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl sm:text-5xl font-medium tracking-tight text-balance",
      h2: "text-3xl sm:text-4xl font-medium tracking-tight text-balance",
      h3: "text-2xl sm:text-3xl font-medium tracking-tight text-balance",
      h4: "text-xl sm:text-2xl tracking-tight text-balance",
      h5: "text-lg sm:text-xl tracking-tight text-balance",
      h6: "text-base sm:text-lg tracking-tight text-balance",
      body: "text-base leading-7 text-pretty",
      lead: "text-lg sm:text-xl leading-8 text-pretty",
      large: "text-lg leading-7 text-pretty",
      small: "text-sm leading-snug",
      muted: "text-sm text-muted-foreground leading-snug",
      caption: "text-xs leading-snug text-muted-foreground",
      code: "rounded border bg-muted/50 px-1 py-px font-mono text-sm font-medium",
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
    ref
  ) => {
    const Comp = Component as React.ElementType;

    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({ variant, color, weight, align }),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Text.displayName = "Text";
