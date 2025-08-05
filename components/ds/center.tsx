import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

const centerVariants = cva("flex", {
  variants: {
    direction: {
      both: "items-center justify-center",
      horizontal: "justify-center",
      vertical: "items-center",
    },
    inline: {
      true: "inline-flex",
      false: "flex",
    },
  },
  defaultVariants: {
    direction: "both",
    inline: false,
  },
});

interface CenterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centerVariants> {
  /** Maximum width constraint. Can be responsive */
  maxW?: ResponsiveValue<string | number>;
  /** Minimum height for vertical centering */
  minH?: ResponsiveValue<string | number>;
  /** Whether to use text-align: center for inline content */
  text?: boolean;
  /** HTML element to render */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Center component for easily centering content
 * 
 * @example
 * ```tsx
 * // Center content both horizontally and vertically
 * <Center className="h-screen">
 *   <Card>Centered Content</Card>
 * </Center>
 * 
 * // Center only horizontally
 * <Center direction="horizontal">
 *   <Button>Centered Button</Button>
 * </Center>
 * 
 * // Center with max width constraint
 * <Center maxW="800px">
 *   <Text>This content won't exceed 800px width</Text>
 * </Center>
 * 
 * // Responsive max width
 * <Center maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
 *   <Content />
 * </Center>
 * 
 * // Center text content
 * <Center text>
 *   <Heading>Centered Heading</Heading>
 *   <Text>This text is also centered</Text>
 * </Center>
 * 
 * // Inline centering
 * <Center inline>
 *   <Icon />
 *   <span>Centered with icon</span>
 * </Center>
 * 
 * // Full viewport centering
 * <Center minH="100vh">
 *   <Stack spacing="md">
 *     <Heading>404</Heading>
 *     <Text>Page not found</Text>
 *   </Stack>
 * </Center>
 * ```
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  (
    {
      className,
      direction = "both",
      inline = false,
      maxW,
      minH,
      text = false,
      as: Component = "div",
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Handle max width
    const maxWidthClasses = maxW
      ? responsive(maxW, (value) => {
          if (typeof value === "number") {
            return `max-w-[${value}px]`;
          }
          if (value.includes("px") || value.includes("rem") || value.includes("%")) {
            return `max-w-[${value}]`;
          }
          // Assume it's a Tailwind class like "2xl" or "prose"
          return `max-w-${value}`;
        })
      : "";

    // Handle min height
    const minHeightClasses = minH
      ? responsive(minH, (value) => {
          if (typeof value === "number") {
            return `min-h-[${value}px]`;
          }
          if (value.includes("px") || value.includes("vh") || value.includes("rem") || value.includes("%")) {
            return `min-h-[${value}]`;
          }
          // Assume it's a Tailwind class like "screen" or "full"
          return `min-h-${value}`;
        })
      : "";

    // Add text centering if requested
    const textClasses = text ? "text-center" : "";

    // Add width classes for horizontal centering with max width
    const widthClasses = maxW && direction !== "vertical" ? "w-full mx-auto" : "";

    return (
      <Component
        ref={ref}
        className={cn(
          centerVariants({ direction, inline }),
          maxWidthClasses,
          minHeightClasses,
          textClasses,
          widthClasses,
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Center.displayName = "Center";