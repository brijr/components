import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

/**
 * Feature card configuration
 */
export interface FeatureCardItem {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Image source URL */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
}

/**
 * Props for the FeatureCardsLeft component
 */
export interface FeatureCardsLeftProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of feature cards to display */
  features: FeatureCardItem[];
  /** Number of columns for the grid */
  columns?: 2 | 3;
}

/**
 * Left-aligned feature cards section with images showcasing key features.
 * Perfect for visual feature presentations with screenshots or illustrations.
 *
 * @example
 * ```tsx
 * <FeatureCardsLeft
 *   headline="See it in action"
 *   subheadline="Powerful features that help you work smarter"
 *   features={[
 *     {
 *       title: "Analytics Dashboard",
 *       description: "Track your metrics in real-time",
 *       imageSrc: "/images/dashboard.png",
 *       imageAlt: "Analytics dashboard screenshot"
 *     },
 *     // ... more features
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export const FeatureCardsLeft = ({
  headline,
  subheadline,
  features,
  columns = 3,
}: FeatureCardsLeftProps) => {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          {/* Header */}
          <Flex direction="column" gap={4} className="max-w-3xl">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-lg text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Feature cards grid */}
          <div className={`grid gap-6 ${gridCols[columns]}`}>
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <Flex direction="column" gap={2}>
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
 * JSON Schema for FeatureCardsLeft component
 */
export const featureCardsLeftSchema = {
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
          imageSrc: {
            type: "string",
            description: "Image source URL",
          },
          imageAlt: {
            type: "string",
            description: "Image alt text",
          },
        },
        required: ["title", "description", "imageSrc", "imageAlt"],
      },
      description: "Array of feature cards to display",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3],
      description: "Number of columns for the grid",
      default: 3,
    },
  },
  required: ["headline", "features"],
};