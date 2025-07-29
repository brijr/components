import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

/**
 * Feature point configuration
 */
export interface FeaturePoint {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional icon component */
  icon?: React.ReactElement<LucideIcon>;
}

/**
 * Props for the FeatureShowcase component
 */
export interface FeatureShowcaseProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Main feature points */
  features: FeaturePoint[];
  /** Screenshot or image URL */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Image position */
  imagePosition?: "left" | "right";
}

/**
 * Large feature showcase with screenshot and feature points.
 * Perfect for highlighting a major feature with visual demonstration.
 *
 * @example
 * ```tsx
 * <FeatureShowcase
 *   headline="Powerful analytics at your fingertips"
 *   subheadline="Get insights that drive growth"
 *   features={[
 *     {
 *       title: "Real-time data",
 *       description: "See changes as they happen",
 *       icon: <BarChart className="w-5 h-5" />
 *     },
 *     // ... more features
 *   ]}
 *   imageSrc="/images/analytics-dashboard.png"
 *   imageAlt="Analytics dashboard screenshot"
 *   imagePosition="right"
 * />
 * ```
 */
export const FeatureShowcase = ({
  headline,
  subheadline,
  features,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: FeatureShowcaseProps) => {
  const imageComponent = (
    <div className="relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden bg-muted">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
      />
    </div>
  );

  const contentComponent = (
    <Stack spacing="lg">
      <Stack spacing="md">
        <Heading level={2} align="center" className="lg:text-left">
          {headline}
        </Heading>
        {subheadline && (
          <Text variant="lead" align="center" color="muted" className="lg:text-left">
            {subheadline}
          </Text>
        )}
      </Stack>
      <Stack spacing="md">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-3">
            {feature.icon && (
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {feature.icon}
              </div>
            )}
            <div>
              <Heading level={4} className="mb-1">
                {feature.title}
              </Heading>
              <Text size="sm" color="muted">
                {feature.description}
              </Text>
            </div>
          </div>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {imagePosition === "left" ? (
            <>
              {imageComponent}
              {contentComponent}
            </>
          ) : (
            <>
              {contentComponent}
              {imageComponent}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureShowcase component
 */
export const featureShowcaseSchema = {
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
      description: "Main feature points",
      minItems: 1,
    },
    imageSrc: {
      type: "string",
      description: "Screenshot or image URL",
    },
    imageAlt: {
      type: "string",
      description: "Image alt text",
    },
    imagePosition: {
      type: "string",
      enum: ["left", "right"],
      description: "Image position",
      default: "right",
    },
  },
  required: ["headline", "features", "imageSrc", "imageAlt"],
};