import * as React from "react";
import { cn } from "@/lib/utils";
import { type ResponsiveValue, responsive } from "./utils/responsive";

/**
 * Common aspect ratio presets
 */
const aspectRatioPresets = {
  square: "1/1",
  video: "16/9",
  wide: "21/9",
  portrait: "3/4",
  landscape: "4/3",
  golden: "1.618/1",
  "2/3": "2/3",
  "3/2": "3/2",
  "4/5": "4/5",
  "5/4": "5/4",
  "9/16": "9/16",
} as const;

type AspectRatioPreset = keyof typeof aspectRatioPresets;
type AspectRatioValue = AspectRatioPreset | `${number}/${number}` | number;

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio as a preset, fraction string, or decimal number. Can be responsive */
  ratio?: ResponsiveValue<AspectRatioValue>;
  /** HTML element to render */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * AspectRatio component for maintaining consistent aspect ratios
 *
 * @example
 * ```tsx
 * // Using preset ratios
 * <AspectRatio ratio="video">
 *   <Image src="/video-thumbnail.jpg" alt="Video" fill />
 * </AspectRatio>
 *
 * // Using custom ratio
 * <AspectRatio ratio="4/3">
 *   <video className="h-full w-full object-cover" />
 * </AspectRatio>
 *
 * // Responsive ratios
 * <AspectRatio ratio={{ base: "square", md: "video" }}>
 *   <Image src="/hero.jpg" alt="Hero" fill />
 * </AspectRatio>
 *
 * // With decimal ratio
 * <AspectRatio ratio={1.85}>
 *   <div className="bg-muted h-full w-full" />
 * </AspectRatio>
 *
 * // Common presets
 * <AspectRatio ratio="portrait"> // 3:4
 * <AspectRatio ratio="landscape"> // 4:3
 * <AspectRatio ratio="golden"> // Golden ratio (~1.618:1)
 *
 * // With iframe
 * <AspectRatio ratio="video">
 *   <iframe
 *     src="https://youtube.com/embed/..."
 *     className="h-full w-full"
 *   />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      className,
      ratio = "video",
      as: Component = "div",
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Convert ratio value to CSS aspect-ratio value
    const getRatioValue = (value: AspectRatioValue): string => {
      // Check if it's a preset
      if (typeof value === "string" && value in aspectRatioPresets) {
        return aspectRatioPresets[value as AspectRatioPreset];
      }

      // If it's a fraction string like "16/9"
      if (typeof value === "string" && value.includes("/")) {
        return value;
      }

      // If it's a number, use it directly (e.g., 1.5 becomes "1.5/1")
      if (typeof value === "number") {
        return `${value}/1`;
      }

      // Default fallback
      return "16/9";
    };

    // Generate the aspect ratio class
    const ratioClasses = responsive(ratio, (value) => {
      const ratioValue = getRatioValue(value);
      // Use arbitrary value syntax for aspect ratio
      return `aspect-[${ratioValue}]`;
    });

    return (
      <Component
        ref={ref}
        className={cn("relative overflow-hidden", ratioClasses, className)}
        style={style}
        {...props}
      >
        {children && <div className="absolute inset-0">{children}</div>}
      </Component>
    );
  },
);

AspectRatio.displayName = "AspectRatio";
