import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Stat card with icon configuration
 */
export interface StatCardItem {
  /** Icon component */
  icon: React.ReactNode;
  /** The numeric value or main stat */
  value: string;
  /** Label describing the stat */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional prefix (e.g., "$", "+") */
  prefix?: string;
  /** Optional suffix (e.g., "%", "k") */
  suffix?: string;
  /** Trend indicator */
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
  /** Optional badge */
  badge?: string;
}

/**
 * Props for the StatsWithIcons component
 */
export interface StatsWithIconsProps {
  /** Section headline */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of stat cards */
  stats: StatCardItem[];
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Card variant */
  variant?: "default" | "filled" | "outline";
}

/**
 * Stats with icon indicators displayed in cards.
 * Ideal for dashboards and feature highlights with visual context.
 *
 * @example
 * ```tsx
 * <StatsWithIcons
 *   headline="Platform overview"
 *   subheadline="Real-time metrics and insights"
 *   stats={[
 *     {
 *       icon: <Users className="w-5 h-5" />,
 *       value: "2,543",
 *       label: "Active Users",
 *       description: "Currently online",
 *       trend: { value: "12%", direction: "up", label: "vs last week" }
 *     },
 *     {
 *       icon: <DollarSign className="w-5 h-5" />,
 *       value: "45.2",
 *       prefix: "$",
 *       suffix: "K",
 *       label: "Revenue",
 *       description: "This month",
 *       trend: { value: "3%", direction: "down", label: "vs last month" }
 *     }
 *   ]}
 *   columns={3}
 *   variant="default"
 * />
 * ```
 */
export const StatsWithIcons = ({
  headline,
  subheadline,
  stats,
  columns = 3,
  variant = "default",
}: StatsWithIconsProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const getCardClass = () => {
    switch (variant) {
      case "filled":
        return "bg-muted/50 border-0";
      case "outline":
        return "border-2";
      default:
        return "";
    }
  };

  const getTrendIcon = (direction: "up" | "down") => {
    return direction === "up" ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  const getTrendColor = (direction: "up" | "down") => {
    return direction === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          {(headline || subheadline) && (
            <Stack spacing="md" align="center" className="text-center">
              {headline && <Heading level={2}>{headline}</Heading>}
              {subheadline && (
                <Text variant="lead" color="muted">
                  {subheadline}
                </Text>
              )}
            </Stack>
          )}

          {/* Stats Cards */}
          <div className={`grid gap-6 ${gridCols[columns]}`}>
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`transition-all hover:shadow-lg ${getCardClass()}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                    {stat.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Stack spacing="xs">
                    <div className="text-3xl font-bold">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <CardTitle className="text-base font-medium">
                      {stat.label}
                    </CardTitle>
                    {stat.description && (
                      <CardDescription>{stat.description}</CardDescription>
                    )}
                    {stat.trend && (
                      <div
                        className={`flex items-center gap-1.5 text-sm ${getTrendColor(
                          stat.trend.direction
                        )}`}
                      >
                        {getTrendIcon(stat.trend.direction)}
                        <span className="font-medium">{stat.trend.value}</span>
                        {stat.trend.label && (
                          <span className="text-muted-foreground">
                            {stat.trend.label}
                          </span>
                        )}
                      </div>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for StatsWithIcons component
 */
export const statsWithIconsSchema = {
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
          description: {
            type: "string",
            description: "Optional description",
          },
          prefix: {
            type: "string",
            description: "Optional prefix",
          },
          suffix: {
            type: "string",
            description: "Optional suffix",
          },
          trend: {
            type: "object",
            properties: {
              value: { type: "string" },
              direction: { type: "string", enum: ["up", "down"] },
              label: { type: "string" },
            },
            required: ["value", "direction"],
            description: "Trend indicator",
          },
          badge: {
            type: "string",
            description: "Optional badge",
          },
        },
        required: ["value", "label"],
      },
      description: "Array of stat cards",
      minItems: 2,
      maxItems: 8,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns on desktop",
      default: 3,
    },
    variant: {
      type: "string",
      enum: ["default", "filled", "outline"],
      description: "Card variant",
      default: "default",
    },
  },
  required: ["stats"],
};