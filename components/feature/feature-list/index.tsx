import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";

/**
 * Feature item configuration
 */
export interface FeatureListItem {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional icon component */
  icon?: React.ReactNode;
}

/**
 * Props for the FeatureList component
 */
export interface FeatureListProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of features to display */
  features: FeatureListItem[];
  /** Maximum width of the list container */
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

/**
 * Vertical list of features with icons and descriptions.
 * Perfect for detailed feature explanations in a scannable format.
 *
 * @example
 * ```tsx
 * <FeatureList
 *   headline="Why choose our platform"
 *   subheadline="Built with your needs in mind"
 *   features={[
 *     {
 *       title: "Advanced Analytics",
 *       description: "Get deep insights into your data with our powerful analytics engine",
 *       icon: <BarChart className="w-6 h-6" />
 *     },
 *     // ... more features
 *   ]}
 *   maxWidth="lg"
 * />
 * ```
 */
export const FeatureList = ({
  headline,
  subheadline,
  features,
  maxWidth = "lg",
}: FeatureListProps) => {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
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

          {/* Features list */}
          <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
            <Flex direction="column" gap={6}>
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {feature.icon && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <Header as="h3" className="mb-2">
                      {feature.title}
                    </Header>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </Flex>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureList component
 */
export const featureListSchema = {
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
    maxWidth: {
      type: "string",
      enum: ["sm", "md", "lg", "xl"],
      description: "Maximum width of the list container",
      default: "lg",
    },
  },
  required: ["headline", "features"],
};