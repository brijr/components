import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";

/**
 * Individual stat configuration
 */
export interface StatItem {
  /** The numeric value or main stat */
  value: string;
  /** Label describing the stat */
  label: string;
  /** Optional prefix (e.g., "$", "+") */
  prefix?: string;
  /** Optional suffix (e.g., "%", "k") */
  suffix?: string;
}

/**
 * Props for the StatsSimple component
 */
export interface StatsSimpleProps {
  /** Section headline */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of statistics to display */
  stats: StatItem[];
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Visual style variant */
  variant?: "default" | "large" | "compact";
}

/**
 * Basic stats grid displaying key metrics in a clean layout.
 * Perfect for showcasing achievements, metrics, or KPIs.
 *
 * @example
 * ```tsx
 * <StatsSimple
 *   headline="Our impact in numbers"
 *   subheadline="Trusted by companies worldwide"
 *   stats={[
 *     { value: "10", suffix: "M+", label: "Active Users" },
 *     { value: "99.9", suffix: "%", label: "Uptime" },
 *     { value: "24/7", label: "Support" },
 *     { value: "150", suffix: "+", label: "Countries" }
 *   ]}
 *   columns={4}
 *   variant="default"
 * />
 * ```
 */
export const StatsSimple = ({
  headline,
  subheadline,
  stats,
  columns = 3,
  variant = "default",
}: StatsSimpleProps) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const getTextSize = () => {
    switch (variant) {
      case "large":
        return "text-5xl sm:text-6xl md:text-7xl";
      case "compact":
        return "text-2xl sm:text-3xl";
      default:
        return "text-4xl sm:text-5xl";
    }
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={10}>
          {/* Header */}
          {(headline || subheadline) && (
            <Flex direction="column" gap={4} className="items-center text-center">
              {headline && <Header as="h2">{headline}</Header>}
              {subheadline && (
                <p className="text-xl text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </Flex>
          )}

          {/* Stats Grid */}
          <div className={`grid gap-8 md:gap-12 ${gridCols[columns]}`}>
            {stats.map((stat, index) => (
              <Flex key={index} direction="column" gap={1} className="items-center">
                <div className={`font-bold ${getTextSize()}`}>
                  {stat.prefix && (
                    <span className="text-muted-foreground">
                      {stat.prefix}
                    </span>
                  )}
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-muted-foreground">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className={`text-center text-muted-foreground ${variant === "compact" ? "text-sm" : ""}`}>
                  {stat.label}
                </p>
              </Flex>
            ))}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for StatsSimple component
 */
export const statsSimpleSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    stats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "The numeric value or main stat",
          },
          label: {
            type: "string",
            description: "Label describing the stat",
          },
          prefix: {
            type: "string",
            description: "Optional prefix (e.g., '$', '+')",
          },
          suffix: {
            type: "string",
            description: "Optional suffix (e.g., '%', 'k')",
          },
        },
        required: ["value", "label"],
      },
      description: "Array of statistics to display",
      minItems: 2,
      maxItems: 6,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns on desktop",
      default: 3,
    },
    variant: {
      type: "string",
      enum: ["default", "large", "compact"],
      description: "Visual style variant",
      default: "default",
    },
  },
  required: ["stats"],
};