import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Enterprise feature configuration
 */
export interface EnterpriseFeature {
  /** Feature icon */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

/**
 * Props for the PricingEnterprise component
 */
export interface PricingEnterpriseProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Features list */
  features: EnterpriseFeature[];
  /** Primary CTA */
  primaryCTA: {
    text: string;
    href: string;
  };
  /** Optional secondary CTA */
  secondaryCTA?: {
    text: string;
    href: string;
  };
  /** Optional logos section */
  logos?: {
    headline: string;
    images: {
      src: string;
      alt: string;
    }[];
  };
}

/**
 * Enterprise pricing section focused on custom solutions.
 * Perfect for B2B products with tailored enterprise offerings.
 *
 * @example
 * ```tsx
 * <PricingEnterprise
 *   headline="Enterprise solutions tailored to your needs"
 *   subheadline="Get custom pricing, dedicated support, and advanced features"
 *   features={[
 *     {
 *       icon: <Shield className="w-5 h-5" />,
 *       title: "Advanced Security",
 *       description: "Enterprise-grade security with SSO, 2FA, and compliance"
 *     },
 *     // ... more features
 *   ]}
 *   primaryCTA={{ text: "Contact Sales", href: "/contact-sales" }}
 *   secondaryCTA={{ text: "Schedule Demo", href: "/demo" }}
 *   logos={{
 *     headline: "Trusted by leading companies",
 *     images: [
 *       { src: "/logos/company1.svg", alt: "Company 1" },
 *       // ... more logos
 *     ]
 *   }}
 * />
 * ```
 */
export const PricingEnterprise = ({
  headline,
  subheadline,
  features,
  primaryCTA,
  secondaryCTA,
  logos,
}: PricingEnterpriseProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={10}>
          {/* Header */}
          <Flex direction="column" gap={4} className="items-center max-w-3xl mx-auto text-center">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {feature.icon && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {feature.icon}
                      </div>
                    )}
                    <Header as="h4">{feature.title}</Header>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground ${feature.icon ? "ml-13" : ""}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTAs */}
          <div className="text-center">
            <Flex gap={4} className="justify-center">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </Flex>
          </div>

          {/* Logos Section */}
          {logos && (
            <Flex direction="column" gap={6} className="items-center pt-8">
              <p className="text-xl text-muted-foreground text-center">
                {logos.headline}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                {logos.images.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={32}
                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for PricingEnterprise component
 */
export const pricingEnterpriseSchema = {
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
      description: "Features list",
      minItems: 1,
    },
    primaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Primary CTA",
    },
    secondaryCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Optional secondary CTA",
    },
    logos: {
      type: "object",
      properties: {
        headline: {
          type: "string",
          description: "Logos section headline",
        },
        images: {
          type: "array",
          items: {
            type: "object",
            properties: {
              src: { type: "string" },
              alt: { type: "string" },
            },
            required: ["src", "alt"],
          },
          description: "Logo images",
        },
      },
      required: ["headline", "images"],
      description: "Optional logos section",
    },
  },
  required: ["headline", "features", "primaryCTA"],
};