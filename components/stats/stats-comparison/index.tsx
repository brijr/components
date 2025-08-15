import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

/**
 * Comparison stat configuration
 */
export interface ComparisonStatItem {
  /** Stat label/metric name */
  label: string;
  /** Current/primary value */
  current: {
    value: string;
    label?: string;
    prefix?: string;
    suffix?: string;
  };
  /** Previous/comparison value */
  previous: {
    value: string;
    label?: string;
    prefix?: string;
    suffix?: string;
  };
  /** Change between values */
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
    isPositive?: boolean; // Whether the change is good (green) or bad (red)
  };
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional description */
  description?: string;
}

/**
 * Props for the StatsComparison component
 */
export interface StatsComparisonProps {
  /** Section headline */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of comparison stats */
  stats: ComparisonStatItem[];
  /** Comparison period labels */
  periodLabels?: {
    current: string;
    previous: string;
  };
  /** Layout variant */
  variant?: "cards" | "table" | "minimal";
  /** Number of columns for cards variant */
  columns?: 2 | 3 | 4;
}

/**
 * Before/after or comparative stats showing changes over time.
 * Perfect for showing growth, performance improvements, or period comparisons.
 *
 * @example
 * ```tsx
 * <StatsComparison
 *   headline="Monthly comparison"
 *   subheadline="Key metrics vs last month"
 *   stats={[
 *     {
 *       label: "Revenue",
 *       current: { value: "125.5", prefix: "$", suffix: "K" },
 *       previous: { value: "98.2", prefix: "$", suffix: "K" },
 *       change: { value: "27.8%", type: "increase", isPositive: true },
 *       icon: <DollarSign className="w-5 h-5" />
 *     },
 *     {
 *       label: "Active Users",
 *       current: { value: "8,429" },
 *       previous: { value: "7,812" },
 *       change: { value: "7.9%", type: "increase", isPositive: true }
 *     }
 *   ]}
 *   periodLabels={{ current: "This month", previous: "Last month" }}
 *   variant="cards"
 *   columns={3}
 * />
 * ```
 */
export const StatsComparison = ({
  headline,
  subheadline,
  stats,
  periodLabels = { current: "Current", previous: "Previous" },
  variant = "cards",
  columns = 3,
}: StatsComparisonProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const getChangeIcon = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return <ArrowUp className="w-4 h-4" />;
      case "decrease":
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColor = (
    type: "increase" | "decrease" | "neutral",
    isPositive?: boolean
  ) => {
    if (type === "neutral") return "text-muted-foreground";
    
    // If isPositive is explicitly set, use it
    if (isPositive !== undefined) {
      return isPositive ? "text-green-600" : "text-red-600";
    }
    
    // Otherwise, default: increase = green, decrease = red
    return type === "increase" ? "text-green-600" : "text-red-600";
  };

  if (variant === "table") {
    return (
      <Section>
        <Container>
          <Flex gap={10} className="flex-col">
            {/* Header */}
            {(headline || subheadline) && (
              <Flex gap={4} className="flex-col">
                {headline && <Header as="h2">{headline}</Header>}
                {subheadline && (
                  <p className="text-xl text-muted-foreground">
                    {subheadline}
                  </p>
                )}
              </Flex>
            )}

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Metric</th>
                        <th className="text-right p-4 font-medium">
                          {periodLabels.previous}
                        </th>
                        <th className="text-right p-4 font-medium">
                          {periodLabels.current}
                        </th>
                        <th className="text-right p-4 font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((stat, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {stat.icon && (
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                  {stat.icon}
                                </div>
                              )}
                              <div>
                                <div className="font-medium">{stat.label}</div>
                                {stat.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {stat.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right text-muted-foreground">
                            {stat.previous.prefix}
                            {stat.previous.value}
                            {stat.previous.suffix}
                          </td>
                          <td className="p-4 text-right font-semibold">
                            {stat.current.prefix}
                            {stat.current.value}
                            {stat.current.suffix}
                          </td>
                          <td className="p-4 text-right">
                            {stat.change && (
                              <div
                                className={`flex items-center justify-end gap-1 ${getChangeColor(
                                  stat.change.type,
                                  stat.change.isPositive
                                )}`}
                              >
                                {getChangeIcon(stat.change.type)}
                                <span className="font-medium">
                                  {stat.change.value}
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </Flex>
        </Container>
      </Section>
    );
  }

  if (variant === "minimal") {
    return (
      <Section>
        <Container>
          <Flex gap={10} className="flex-col">
            {/* Header */}
            {(headline || subheadline) && (
              <Flex gap={4} className="flex-col items-center text-center">
                {headline && <Header as="h2">{headline}</Header>}
                {subheadline && (
                  <p className="text-xl text-muted-foreground">
                    {subheadline}
                  </p>
                )}
              </Flex>
            )}

            {/* Minimal Stats */}
            <div className={`grid gap-8 ${gridCols[columns]}`}>
              {stats.map((stat, index) => (
                <Flex key={index} gap={2} className="flex-col items-center">
                  {stat.icon && (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  )}
                  <p className="font-medium text-center">{stat.label}</p>
                  <div className="text-3xl font-bold">
                    {stat.current.prefix}
                    {stat.current.value}
                    {stat.current.suffix}
                  </div>
                  {stat.change && (
                    <div
                      className={`flex items-center gap-1 ${getChangeColor(
                        stat.change.type,
                        stat.change.isPositive
                      )}`}
                    >
                      {getChangeIcon(stat.change.type)}
                      <span className="font-medium">{stat.change.value}</span>
                    </div>
                  )}
                </Flex>
              ))}
            </div>
          </Flex>
        </Container>
      </Section>
    );
  }

  // Default cards variant
  return (
    <Section>
      <Container>
        <Flex gap={10} className="flex-col">
          {/* Header */}
          {(headline || subheadline) && (
            <Flex gap={4} className="flex-col">
              {headline && <Header as="h2">{headline}</Header>}
              {subheadline && (
                <p className="text-xl text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </Flex>
          )}

          {/* Comparison Cards */}
          <div className={`grid gap-6 ${gridCols[columns]}`}>
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {stat.icon && (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {stat.icon}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{stat.label}</CardTitle>
                        {stat.description && (
                          <CardDescription className="mt-1">
                            {stat.description}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    {stat.change && (
                      <Badge
                        variant={
                          stat.change.isPositive !== false &&
                          (stat.change.type === "increase" ||
                            (stat.change.isPositive === true))
                            ? "default"
                            : "destructive"
                        }
                        className="gap-1"
                      >
                        {getChangeIcon(stat.change.type)}
                        {stat.change.value}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {periodLabels.current}
                      </p>
                      <div className="text-2xl font-bold">
                        {stat.current.prefix}
                        {stat.current.value}
                        {stat.current.suffix}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {periodLabels.previous}
                      </p>
                      <div className="text-lg text-muted-foreground">
                        {stat.previous.prefix}
                        {stat.previous.value}
                        {stat.previous.suffix}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for StatsComparison component
 */
export const statsComparisonSchema = {
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
          label: {
            type: "string",
            description: "Stat label/metric name",
          },
          current: {
            type: "object",
            properties: {
              value: { type: "string" },
              label: { type: "string" },
              prefix: { type: "string" },
              suffix: { type: "string" },
            },
            required: ["value"],
          },
          previous: {
            type: "object",
            properties: {
              value: { type: "string" },
              label: { type: "string" },
              prefix: { type: "string" },
              suffix: { type: "string" },
            },
            required: ["value"],
          },
          change: {
            type: "object",
            properties: {
              value: { type: "string" },
              type: {
                type: "string",
                enum: ["increase", "decrease", "neutral"],
              },
              isPositive: { type: "boolean" },
            },
            required: ["value", "type"],
          },
          description: { type: "string" },
        },
        required: ["label", "current", "previous"],
      },
      description: "Array of comparison stats",
      minItems: 1,
    },
    periodLabels: {
      type: "object",
      properties: {
        current: { type: "string" },
        previous: { type: "string" },
      },
      required: ["current", "previous"],
      description: "Comparison period labels",
    },
    variant: {
      type: "string",
      enum: ["cards", "table", "minimal"],
      description: "Layout variant",
      default: "cards",
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns for cards variant",
      default: 3,
    },
  },
  required: ["stats"],
};