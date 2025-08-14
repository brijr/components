"use client";

import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

/**
 * Feature tab item configuration
 */
export interface FeatureTabItem {
  /** Tab value/id */
  value: string;
  /** Tab label */
  label: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional badge text */
  badge?: string;
  /** Optional icon for tab */
  icon?: React.ReactNode;
  /** Optional image */
  image?: {
    src: string;
    alt: string;
  };
  /** Optional list of benefits */
  benefits?: string[];
}

/**
 * Props for the FeatureTabs component
 */
export interface FeatureTabsProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of feature tabs */
  features: FeatureTabItem[];
  /** Default active tab (defaults to first) */
  defaultTab?: string;
}

/**
 * Tabbed feature section for showcasing features with detailed content.
 * Perfect for complex features that need more explanation space.
 *
 * @example
 * ```tsx
 * <FeatureTabs
 *   headline="Explore our powerful features"
 *   subheadline="Switch between features to learn more"
 *   features={[
 *     {
 *       value: "analytics",
 *       label: "Analytics",
 *       title: "Comprehensive Analytics Dashboard",
 *       description: "Get deep insights into your data with our powerful analytics tools.",
 *       badge: "Popular",
 *       icon: <BarChart className="w-4 h-4" />,
 *       image: {
 *         src: "/analytics-dashboard.jpg",
 *         alt: "Analytics dashboard screenshot"
 *       },
 *       benefits: [
 *         "Real-time data visualization",
 *         "Custom report builder",
 *         "Export to multiple formats",
 *         "Team collaboration features"
 *       ]
 *     },
 *     {
 *       value: "automation",
 *       label: "Automation",
 *       title: "Intelligent Workflow Automation",
 *       description: "Automate repetitive tasks and focus on what matters.",
 *       icon: <Cpu className="w-4 h-4" />,
 *       image: {
 *         src: "/automation-flow.jpg",
 *         alt: "Automation workflow diagram"
 *       },
 *       benefits: [
 *         "Visual workflow builder",
 *         "100+ integrations",
 *         "Conditional logic",
 *         "Error handling"
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export const FeatureTabs = ({
  headline,
  subheadline,
  features,
  defaultTab,
}: FeatureTabsProps) => {
  const defaultValue = defaultTab || features[0]?.value;

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center">
            <Header as="h2">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-lg text-center text-muted-foreground max-w-3xl">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Tabs */}
          <Tabs defaultValue={defaultValue} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto" style={{ gridTemplateColumns: `repeat(${features.length}, 1fr)` }}>
              {features.map((feature) => (
                <TabsTrigger 
                  key={feature.value} 
                  value={feature.value}
                  className="flex items-center gap-2"
                >
                  {feature.icon && (
                    <span className="hidden sm:inline-block">
                      {feature.icon}
                    </span>
                  )}
                  {feature.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((feature) => (
              <TabsContent 
                key={feature.value} 
                value={feature.value}
                className="mt-8"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  {/* Content */}
                  <Flex direction="column" gap={6}>
                    <Flex direction="column" gap={4}>
                      <div className="flex items-start gap-3">
                        <Header as="h3">
                          {feature.title}
                        </Header>
                        {feature.badge && (
                          <Badge variant="secondary">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {feature.description}
                      </p>
                    </Flex>

                    {feature.benefits && feature.benefits.length > 0 && (
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-1 mt-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </div>
                            <p>{benefit}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Flex>

                  {/* Image */}
                  {feature.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={feature.image.src}
                        alt={feature.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureTabs component
 */
export const featureTabsSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Main headline text",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline text",
    },
    features: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "Tab value/id",
          },
          label: {
            type: "string",
            description: "Tab label",
          },
          title: {
            type: "string",
            description: "Feature title",
          },
          description: {
            type: "string",
            description: "Feature description",
          },
          badge: {
            type: "string",
            description: "Optional badge text",
          },
          image: {
            type: "object",
            properties: {
              src: {
                type: "string",
                description: "Image source URL",
              },
              alt: {
                type: "string",
                description: "Image alt text",
              },
            },
            required: ["src", "alt"],
          },
          benefits: {
            type: "array",
            items: {
              type: "string",
            },
            description: "List of benefits",
          },
        },
        required: ["value", "label", "title", "description"],
      },
      minItems: 1,
    },
    defaultTab: {
      type: "string",
      description: "Default active tab value",
    },
  },
  required: ["headline", "features"],
};