import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
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
