import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Feature item configuration
 */
export interface FeatureItem {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional icon component */
  icon?: React.ReactNode;
}

/**
 * Props for the FeatureGrid component
 */
export interface FeatureGridProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of features to display */
  features: FeatureItem[];
  /** Number of columns for the grid */
  columns?: 2 | 3 | 4;
}

/**
 * Feature grid section with cards displaying features in a responsive grid.
 * Perfect for showcasing product features, services, or benefits.
 *
 * @example
 * ```tsx
 * <FeatureGrid
 *   headline="Everything you need to succeed"
 *   subheadline="Our platform provides all the tools and features to help you grow"
 *   features={[
 *     {
 *       title: "Fast Performance",
 *       description: "Lightning fast load times with optimized code",
 *       icon: <Zap className="w-5 h-5" />
 *     },
 *     // ... more features
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export const FeatureGrid = ({
  headline,
  subheadline,
  features,
  columns = 3,
}: FeatureGridProps) => {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8} className="text-center">
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center max-w-3xl">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-lg text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Features grid */}
          <div className={`grid gap-6 ${gridCols[columns]}`}>
            {features.map((feature, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <Flex direction="column" gap={2}>
                    {feature.icon && (
                      <div className="text-primary mb-2">
                        {feature.icon}
                      </div>
                    )}
                    <Header as="h3">{feature.title}</Header>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Flex>
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
 * JSON Schema for FeatureGrid component
 */
export const featureGridSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    features: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Feature title",
          },
          description: {
            type: "string",
            description: "Feature description",
          },
        },
        required: ["title", "description"],
      },
      description: "Array of features to display",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns for the grid",
      default: 3,
    },
  },
  required: ["headline", "features"],
};