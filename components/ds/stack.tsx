import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
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
    Omit<VariantProps<typeof stackVariants>, "spacing"> {
  /** Spacing between items: sm (8px), md (16px), lg (24px), xl (32px) */
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | string;
  /** Shorthand for spacing="sm" */
  compact?: boolean;
  /** HTML element to render */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Stack component for consistent vertical spacing between elements.
 * Replaces the need for manual spacing with margin/padding.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Stack spacing="lg">
 *   <Heading size={2}>Feature Title</Heading>
 *   <Text>Feature description...</Text>
 *   <Button>Learn More</Button>
 * </Stack>
 *
 * // Compact spacing
 * <Stack compact>
 *   <Badge>New</Badge>
 *   <Heading size={3}>Product Name</Heading>
 * </Stack>
 * 
 * // With custom gap class
 * <Stack spacing="gap-10">
 *   <Component1 />
 *   <Component2 />
 * </Stack>
 * 
 * // Centered content
 * <Stack spacing="md" align="center">
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
      compact,
      align,
      justify,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    // Apply compact prop
    const finalSpacing = compact ? "sm" : spacing;
    
    // Check if spacing is a custom Tailwind class
    const isCustomSpacing = finalSpacing && !["none", "sm", "md", "lg", "xl"].includes(finalSpacing);
    
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ 
            spacing: isCustomSpacing ? undefined : finalSpacing, 
            align, 
            justify 
          }),
          isCustomSpacing && finalSpacing,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";
