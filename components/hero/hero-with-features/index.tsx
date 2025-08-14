import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
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
export const HeroWithFeatures = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  features,
}: HeroWithFeaturesProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={6} align="center">
          {/* Text content and CTAs */}
          <Flex direction="column" gap={4} align="center">
            <Flex direction="column" gap={2} align="center">
              <Header as="h1" className="text-center">
                {headline}
              </Header>
              {subheadline && (
                <p className="text-xl text-muted-foreground text-center max-w-2xl">
                  {subheadline}
                </p>
              )}
            </Flex>

            {(primaryCTA || secondaryCTA) && (
              <Flex gap={4}>
                {primaryCTA && (
                  <Button size="lg" asChild>
                    <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                  </Button>
                )}
                {secondaryCTA && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                  </Button>
                )}
              </Flex>
            )}
          </Flex>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <Flex direction="column" gap={2} align="start">
                    {feature.icon && (
                      <div className="text-primary">{feature.icon}</div>
                    )}
                    <Header as="h3">{feature.title}</Header>
                  </Flex>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
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
