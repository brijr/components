import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    level: {
      1: "text-4xl sm:text-5xl font-medium tracking-tight text-balance",
      2: "text-3xl sm:text-4xl font-medium tracking-tight text-balance",
      3: "text-2xl sm:text-3xl font-medium tracking-tight text-balance",
      4: "text-xl sm:text-2xl tracking-tight text-balance",
      5: "text-lg sm:text-xl tracking-tight text-balance",
      6: "text-base sm:text-lg tracking-tight text-balance",
    },
    color: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: 2,
    color: "default",
    align: "left",
  },
});

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
}

/**
 * Heading component for consistent heading styles across the application.
 * Automatically uses the correct semantic HTML element based on level.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2} color="muted">Section Title</Heading>
 * <Heading level={3} align="center">Centered Heading</Heading>
 * <Heading as="h2" level={4}>Semantic H2 with H4 styling</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, color, align, as, children, ...props }, ref) => {
    // Use 'as' prop if provided, otherwise use level to determine element
    const Component = as || (`h${level}` as React.ElementType);

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, color, align }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
