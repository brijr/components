import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  type ResponsiveValue,
  responsive,
  isResponsiveValue,
} from "./utils/responsive";

const gridVariants = cva("grid", {
  variants: {
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    gap: "md",
    align: "stretch",
    justify: "stretch",
  },
});

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof gridVariants>, "gap"> {
  /** Number of columns. Can be responsive */
  cols?: ResponsiveValue<number | "auto-fit" | "auto-fill">;
  /** Number of rows. Can be responsive */
  rows?: ResponsiveValue<number>;
  /** Gap between items. Can be responsive or custom Tailwind class */
  gap?: ResponsiveValue<"none" | "sm" | "md" | "lg" | "xl" | "2xl"> | string;
  /** Column gap specifically. Overrides gap for columns */
  gapX?: ResponsiveValue<"none" | "sm" | "md" | "lg" | "xl" | "2xl"> | string;
  /** Row gap specifically. Overrides gap for rows */
  gapY?: ResponsiveValue<"none" | "sm" | "md" | "lg" | "xl" | "2xl"> | string;
  /** Minimum column width for auto-fit/auto-fill */
  minChildWidth?: ResponsiveValue<string>;
  /** Grid template areas for complex layouts */
  areas?: string[];
  /** Flow direction */
  flow?: "row" | "col" | "row-dense" | "col-dense";
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
      align,
      justify,
      as: Component = "div",
      style,
      children,
      ...props
    },
    ref,
  ) => {
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
      gap &&
      typeof gap === "string" &&
      !["none", "sm", "md", "lg", "xl", "2xl"].includes(gap);

    const gapClasses =
      gap && !gapX && !gapY
        ? isCustomGap
          ? gap
          : responsive(
              gap as ResponsiveValue<
                "none" | "sm" | "md" | "lg" | "xl" | "2xl"
              >,
              (value) => {
                const gapMap = {
                  none: "gap-0",
                  sm: "gap-2",
                  md: "gap-4",
                  lg: "gap-6",
                  xl: "gap-8",
                  "2xl": "gap-12",
                };
                return gapMap[value];
              },
            )
        : "";

    // Handle separate X and Y gaps
    const gapXClasses = gapX
      ? typeof gapX === "string" &&
        !["none", "sm", "md", "lg", "xl", "2xl"].includes(gapX)
        ? gapX.replace("gap-", "gap-x-")
        : responsive(
            gapX as ResponsiveValue<"none" | "sm" | "md" | "lg" | "xl" | "2xl">,
            (value) => {
              const gapMap = {
                none: "gap-x-0",
                sm: "gap-x-2",
                md: "gap-x-4",
                lg: "gap-x-6",
                xl: "gap-x-8",
                "2xl": "gap-x-12",
              };
              return gapMap[value];
            },
          )
      : "";

    const gapYClasses = gapY
      ? typeof gapY === "string" &&
        !["none", "sm", "md", "lg", "xl", "2xl"].includes(gapY)
        ? gapY.replace("gap-", "gap-y-")
        : responsive(
            gapY as ResponsiveValue<"none" | "sm" | "md" | "lg" | "xl" | "2xl">,
            (value) => {
              const gapMap = {
                none: "gap-y-0",
                sm: "gap-y-2",
                md: "gap-y-4",
                lg: "gap-y-6",
                xl: "gap-y-8",
                "2xl": "gap-y-12",
              };
              return gapMap[value];
            },
          )
      : "";

    // Handle flow
    const flowClasses = flow ? `grid-flow-${flow}` : "";

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
          gridVariants({
            gap:
              !isCustomGap && !gapX && !gapY
                ? (gap as
                    | "none"
                    | "sm"
                    | "md"
                    | "lg"
                    | "xl"
                    | "2xl"
                    | undefined)
                : undefined,
            align,
            justify,
          }),
          colClasses,
          rowClasses,
          isCustomGap && gapClasses,
          gapXClasses,
          gapYClasses,
          flowClasses,
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
