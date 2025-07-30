import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";

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
 * Props for the FeatureListLeft component
 */
export interface FeatureListLeftProps {
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
 * Left-aligned vertical list of features with icons and descriptions.
 * Perfect for detailed feature explanations in a scannable format.
 *
 * @example
 * ```tsx
 * <FeatureListLeft
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
export const FeatureListLeft = ({
  headline,
  subheadline,
  features,
  maxWidth = "lg",
}: FeatureListLeftProps) => {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
  };

  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="start">
          {/* Header */}
          <Stack spacing="md" align="start" className="max-w-3xl">
            <Heading level={2}>
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Features list */}
          <div className={`${maxWidthClasses[maxWidth]} w-full`}>
            <Stack spacing="lg">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {feature.icon && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <Heading level={3} className="mb-2">
                      {feature.title}
                    </Heading>
                    <Text color="muted">
                      {feature.description}
                    </Text>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureListLeft component
 */
export const featureListLeftSchema = {
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