import * as React from "react";
import { cn } from "@/lib/utils";
import {
  type ResponsiveValue,
  responsive,
  isResponsiveValue,
} from "./utils/responsive";

type GapValue = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
type AlignValue = "start" | "center" | "end" | "stretch" | "baseline";
type JustifyValue = "start" | "center" | "end" | "stretch";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns. Can be responsive */
  cols?: ResponsiveValue<number | "auto-fit" | "auto-fill">;
  /** Number of rows. Can be responsive */
  rows?: ResponsiveValue<number>;
  /** Gap between items. Can be responsive or custom Tailwind class */
  gap?: ResponsiveValue<GapValue> | string;
  /** Column gap specifically. Overrides gap for columns */
  gapX?: ResponsiveValue<GapValue> | string;
  /** Row gap specifically. Overrides gap for rows */
  gapY?: ResponsiveValue<GapValue> | string;
  /** Minimum column width for auto-fit/auto-fill */
  minChildWidth?: ResponsiveValue<string>;
  /** Grid template areas for complex layouts */
  areas?: string[];
  /** Flow direction */
  flow?: "row" | "col" | "row-dense" | "col-dense";
  /** Alignment of items. Can be responsive */
  align?: ResponsiveValue<AlignValue>;
  /** Justification of items. Can be responsive */
  justify?: ResponsiveValue<JustifyValue>;
  /** Shorthand for gap="sm" */
  compact?: boolean;
  /** HTML element to render */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Grid component for creating responsive grid layouts
 *
 * @example
 * ```tsx
 * // Simple responsive grid
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // Auto-fit grid with minimum width
 * <Grid cols="auto-fit" minChildWidth="250px" gap="md">
 *   {items.map(item => <Card key={item.id}>{item.name}</Card>)}
 * </Grid>
 *
 * // Compact spacing
 * <Grid cols={3} compact>
 *   {children}
 * </Grid>
 *
 * // Different gaps for rows and columns
 * <Grid cols={3} gapX="sm" gapY="lg">
 *   {children}
 * </Grid>
 *
 * // Grid with template areas
 * <Grid
 *   areas={[
 *     "header header header",
 *     "sidebar main main",
 *     "footer footer footer"
 *   ]}
 *   gap="md"
 * >
 *   <div style={{ gridArea: "header" }}>Header</div>
 *   <div style={{ gridArea: "sidebar" }}>Sidebar</div>
 *   <div style={{ gridArea: "main" }}>Main Content</div>
 *   <div style={{ gridArea: "footer" }}>Footer</div>
 * </Grid>
 *
 * // Responsive alignment
 * <Grid 
 *   cols={{ base: 1, md: 2 }}
 *   align={{ base: "center", md: "start" }}
 *   justify={{ base: "center", md: "stretch" }}
 * >
 *   {children}
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      rows,
      gap,
      gapX,
      gapY,
      minChildWidth,
      areas,
      flow,
      align = "stretch",
      justify = "stretch",
      compact,
      as: Component = "div",
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Apply compact prop
    const finalGap = compact ? "sm" : gap || "md";

    // Handle columns
    const colClasses = cols
      ? responsive(cols, (value) => {
          if (value === "auto-fit" || value === "auto-fill") {
            const minWidth = minChildWidth || "250px";
            const minWidthValue = isResponsiveValue(minWidth)
              ? (
                  minWidth as Partial<
                    Record<"base" | "sm" | "md" | "lg" | "xl" | "2xl", string>
                  >
                ).base || "250px"
              : minWidth;
            return `grid-cols-[repeat(${value},minmax(${minWidthValue},1fr))]`;
          }
          return `grid-cols-${value}`;
        })
      : "";

    // Handle rows
    const rowClasses = rows
      ? responsive(rows, (value) => `grid-rows-${value}`)
      : "";

    // Handle gap
    const isCustomGap =
      typeof finalGap === "string" &&
      !["none", "sm", "md", "lg", "xl", "2xl"].includes(finalGap);

    const gapClasses =
      finalGap && !gapX && !gapY
        ? isCustomGap
          ? finalGap
          : responsive(finalGap as ResponsiveValue<GapValue>, (value) => {
              switch (value) {
                case "none":
                  return "gap-0";
                case "sm":
                  return "gap-2";
                case "md":
                  return "gap-4";
                case "lg":
                  return "gap-6";
                case "xl":
                  return "gap-8";
                case "2xl":
                  return "gap-12";
                default:
                  return "gap-4";
              }
            })
        : "";

    // Handle separate X and Y gaps
    const gapXClasses = gapX
      ? typeof gapX === "string" &&
        !["none", "sm", "md", "lg", "xl", "2xl"].includes(gapX)
        ? gapX.replace("gap-", "gap-x-")
        : responsive(gapX as ResponsiveValue<GapValue>, (value) => {
            switch (value) {
              case "none":
                return "gap-x-0";
              case "sm":
                return "gap-x-2";
              case "md":
                return "gap-x-4";
              case "lg":
                return "gap-x-6";
              case "xl":
                return "gap-x-8";
              case "2xl":
                return "gap-x-12";
              default:
                return "gap-x-4";
            }
          })
      : "";

    const gapYClasses = gapY
      ? typeof gapY === "string" &&
        !["none", "sm", "md", "lg", "xl", "2xl"].includes(gapY)
        ? gapY.replace("gap-", "gap-y-")
        : responsive(gapY as ResponsiveValue<GapValue>, (value) => {
            switch (value) {
              case "none":
                return "gap-y-0";
              case "sm":
                return "gap-y-2";
              case "md":
                return "gap-y-4";
              case "lg":
                return "gap-y-6";
              case "xl":
                return "gap-y-8";
              case "2xl":
                return "gap-y-12";
              default:
                return "gap-y-4";
            }
          })
      : "";

    // Handle flow
    const flowClasses = flow ? `grid-flow-${flow}` : "";

    // Handle alignment
    const alignClasses = responsive(align, (value) => {
      switch (value) {
        case "start":
          return "items-start";
        case "center":
          return "items-center";
        case "end":
          return "items-end";
        case "stretch":
          return "items-stretch";
        case "baseline":
          return "items-baseline";
        default:
          return "items-stretch";
      }
    });

    // Handle justification
    const justifyClasses = responsive(justify, (value) => {
      switch (value) {
        case "start":
          return "justify-items-start";
        case "center":
          return "justify-items-center";
        case "end":
          return "justify-items-end";
        case "stretch":
          return "justify-items-stretch";
        default:
          return "justify-items-stretch";
      }
    });

    // Combine styles for template areas
    const gridStyle = areas
      ? {
          ...style,
          gridTemplateAreas: areas.map((area) => `"${area}"`).join(" "),
        }
      : style;

    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          colClasses,
          rowClasses,
          gapClasses,
          gapXClasses,
          gapYClasses,
          flowClasses,
          alignClasses,
          justifyClasses,
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Grid.displayName = "Grid";