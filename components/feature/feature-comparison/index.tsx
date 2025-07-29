import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

/**
 * Comparison feature item
 */
export interface ComparisonFeature {
  /** Feature name */
  name: string;
  /** Whether option A has this feature */
  optionA: boolean;
  /** Whether option B has this feature */
  optionB: boolean;
  /** Optional tooltip or additional info */
  tooltip?: string;
}

/**
 * Props for the FeatureComparison component
 */
export interface FeatureComparisonProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Name of option A */
  optionAName: string;
  /** Description of option A */
  optionADescription?: string;
  /** Name of option B */
  optionBName: string;
  /** Description of option B */
  optionBDescription?: string;
  /** Array of features to compare */
  features: ComparisonFeature[];
}

/**
 * Side-by-side feature comparison section.
 * Perfect for comparing plans, products, or different options.
 *
 * @example
 * ```tsx
 * <FeatureComparison
 *   headline="Compare our plans"
 *   subheadline="Choose the right plan for your needs"
 *   optionAName="Basic"
 *   optionADescription="For individuals and small teams"
 *   optionBName="Pro"
 *   optionBDescription="For growing businesses"
 *   features={[
 *     { name: "Unlimited projects", optionA: true, optionB: true },
 *     { name: "Advanced analytics", optionA: false, optionB: true },
 *     // ... more features
 *   ]}
 * />
 * ```
 */
export const FeatureComparison = ({
  headline,
  subheadline,
  optionAName,
  optionADescription,
  optionBName,
  optionBDescription,
  features,
}: FeatureComparisonProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Header */}
          <Stack spacing="md" align="center" className="max-w-3xl">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Comparison table */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {/* Feature names column */}
              <div className="space-y-2">
                <div className="h-32" /> {/* Spacer for headers */}
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="h-12 flex items-center px-4 text-sm font-medium"
                  >
                    {feature.name}
                  </div>
                ))}
              </div>

              {/* Option A column */}
              <Card>
                <CardHeader className="text-center h-32 flex flex-col justify-center">
                  <CardTitle>{optionAName}</CardTitle>
                  {optionADescription && (
                    <Text size="sm" color="muted" align="center">
                      {optionADescription}
                    </Text>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="h-12 flex items-center justify-center border-t"
                    >
                      {feature.optionA ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Option B column */}
              <Card>
                <CardHeader className="text-center h-32 flex flex-col justify-center">
                  <CardTitle>{optionBName}</CardTitle>
                  {optionBDescription && (
                    <Text size="sm" color="muted" align="center">
                      {optionBDescription}
                    </Text>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="h-12 flex items-center justify-center border-t"
                    >
                      {feature.optionB ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureComparison component
 */
export const featureComparisonSchema = {
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
    optionAName: {
      type: "string",
      description: "Name of option A",
    },
    optionADescription: {
      type: "string",
      description: "Description of option A",
    },
    optionBName: {
      type: "string",
      description: "Name of option B",
    },
    optionBDescription: {
      type: "string",
      description: "Description of option B",
    },
    features: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Feature name",
          },
          optionA: {
            type: "boolean",
            description: "Whether option A has this feature",
          },
          optionB: {
            type: "boolean",
            description: "Whether option B has this feature",
          },
          tooltip: {
            type: "string",
            description: "Optional tooltip or additional info",
          },
        },
        required: ["name", "optionA", "optionB"],
      },
      description: "Array of features to compare",
      minItems: 1,
    },
  },
  required: ["headline", "optionAName", "optionBName", "features"],
};