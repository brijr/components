import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
  Inline,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

/**
 * Props for individual feature items
 */
export interface FeatureItem {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional icon (as React element) */
  icon?: React.ReactNode;
}

/**
 * Props for the HeroWithFeatures component
 */
export interface HeroWithFeaturesProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline?: string;
  /** Primary call-to-action button */
  primaryCTA?: {
    /** Button text */
    text: string;
    /** Button link URL */
    href: string;
  };
  /** Secondary call-to-action button */
  secondaryCTA?: {
    /** Button text */
    text: string;
    /** Button link URL */
    href: string;
  };
  /** Array of feature items to display */
  features: FeatureItem[];
}

/**
 * Hero section with headline, CTAs, and feature cards below.
 * Great for landing pages that need to immediately showcase key benefits or features.
 *
 * @example
 * ```tsx
 * <HeroWithFeatures
 *   headline="Everything you need to succeed"
 *   subheadline="Our platform provides all the tools for modern teams"
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "Learn More", href: "/features" }}
 *   features={[
 *     {
 *       title: "Lightning Fast",
 *       description: "Experience blazing fast performance with our optimized infrastructure",
 *       icon: <Zap className="w-5 h-5" />
 *     },
 *     {
 *       title: "Secure by Default",
 *       description: "Enterprise-grade security to keep your data safe and compliant",
 *       icon: <Shield className="w-5 h-5" />
 *     },
 *     {
 *       title: "24/7 Support",
 *       description: "Get help whenever you need it with our dedicated support team",
 *       icon: <HeadphonesIcon className="w-5 h-5" />
 *     }
 *   ]}
 * />
 * ```
 */
export const HeroWithFeatures: React.FC<HeroWithFeaturesProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  features,
}) => {
  return (
    <Section>
      <Container>
        <Stack spacing="3xl" align="center">
          {/* Text content and CTAs */}
          <Stack spacing="lg" align="center">
            <Stack spacing="md" align="center">
              <Heading level={1} align="center">
                {headline}
              </Heading>
              {subheadline && (
                <Text
                  variant="lead"
                  align="center"
                  color="muted"
                  className="max-w-2xl"
                >
                  {subheadline}
                </Text>
              )}
            </Stack>

            {(primaryCTA || secondaryCTA) && (
              <Inline spacing="md">
                {primaryCTA && (
                  <Button size="lg" asChild>
                    <a href={primaryCTA.href}>{primaryCTA.text}</a>
                  </Button>
                )}
                {secondaryCTA && (
                  <Button size="lg" variant="outline" asChild>
                    <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
                  </Button>
                )}
              </Inline>
            )}
          </Stack>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <Stack spacing="sm" align="start">
                    {feature.icon && (
                      <div className="text-primary">{feature.icon}</div>
                    )}
                    <Heading level={3}>{feature.title}</Heading>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <Text color="muted">{feature.description}</Text>
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
 * JSON Schema for HeroWithFeatures component
 */
export const heroWithFeaturesSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Supporting subheadline text",
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Button text",
        },
        href: {
          type: "string",
          description: "Button link URL",
        },
      },
      required: ["text", "href"],
      description: "Primary call-to-action button",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Button text",
        },
        href: {
          type: "string",
          description: "Button link URL",
        },
      },
      required: ["text", "href"],
      description: "Secondary call-to-action button",
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
      description: "Array of feature items to display",
      minItems: 1,
    },
  },
  required: ["headline", "features"],
};