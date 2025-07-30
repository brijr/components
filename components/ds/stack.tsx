import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      none: "ds-stack-gap-none",
      xs: "ds-stack-gap-xs",
      sm: "ds-stack-gap-sm",
      md: "ds-stack-gap-md",
      lg: "ds-stack-gap-lg",
      xl: "ds-stack-gap-xl",
      "2xl": "ds-stack-gap-2xl",
      "3xl": "ds-stack-gap-3xl",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
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
  },
  defaultVariants: {
    spacing: "md",
    align: "stretch",
    justify: "start",
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Stack component for consistent vertical spacing between elements.
 * Replaces the need for manual spacing with margin/padding.
 *
 * @example
 * ```tsx
 * <Stack spacing="lg">
 *   <Heading level={2}>Feature Title</Heading>
 *   <Text>Feature description...</Text>
 *   <Button>Learn More</Button>
 * </Stack>
 *
 * <Stack spacing="sm" align="center">
 *   <Avatar />
 *   <Text>User Name</Text>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      spacing,
      align,
      justify,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(stackVariants({ spacing, align, justify, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";
