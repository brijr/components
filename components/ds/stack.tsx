import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

type SpacingValue = "none" | "sm" | "md" | "lg" | "xl";
type AlignValue = "start" | "center" | "end" | "stretch";
type JustifyValue = "start" | "center" | "end" | "between" | "around" | "evenly";

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between items. Can be responsive or custom Tailwind class */
  spacing?: ResponsiveValue<SpacingValue> | string;
  /** Alignment of items. Can be responsive */
  align?: ResponsiveValue<AlignValue>;
  /** Justification of items. Can be responsive */
  justify?: ResponsiveValue<JustifyValue>;
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
    
    // Check if spacing is a custom Tailwind class (string but not a preset)
    const isCustomSpacing = typeof finalSpacing === "string" && 
      !["none", "sm", "md", "lg", "xl"].includes(finalSpacing);
    
    // Generate responsive spacing classes
    const spacingClasses = finalSpacing && !isCustomSpacing
      ? responsive(finalSpacing as ResponsiveValue<SpacingValue>, (value) => {
          const spacingMap = {
            none: "gap-0",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
          };
          return spacingMap[value];
        })
      : "";
    
    // Generate responsive align classes
    const alignClasses = align
      ? responsive(align, (value) => {
          const alignMap = {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
          };
          return alignMap[value];
        })
      : "";
    
    // Generate responsive justify classes
    const justifyClasses = justify
      ? responsive(justify, (value) => {
          const justifyMap = {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
            evenly: "justify-evenly",
          };
          return justifyMap[value];
        })
      : "";
    
    return (
      <Component
        ref={ref}
        className={cn(
          "flex flex-col",
          spacingClasses || (isCustomSpacing && finalSpacing),
          alignClasses || (!align && "items-stretch"),
          justifyClasses || (!justify && "justify-start"),
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
