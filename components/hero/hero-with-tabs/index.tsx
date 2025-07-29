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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Props for individual tab items
 */
export interface TabItem {
  /** Tab trigger label */
  label: string;
  /** Unique value for the tab */
  value: string;
  /** Tab content title */
  title: string;
  /** Tab content description */
  description: string;
  /** Optional features or bullet points */
  features?: string[];
  /** Optional image for the tab */
  image?: {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt: string;
  };
}

/**
 * Props for the HeroWithTabs component
 */
export interface HeroWithTabsProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline?: string;
  /** Array of tab items */
  tabs: TabItem[];
  /** Default active tab value */
  defaultTab?: string;
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
}

/**
 * Hero section with tabbed content panels.
 * Perfect for showcasing different features, use cases, or product variations.
 *
 * @example
 * ```tsx
 * <HeroWithTabs
 *   headline="One platform, endless possibilities"
 *   subheadline="Discover how our solution adapts to your unique needs"
 *   tabs={[
 *     {
 *       label: "For Developers",
 *       value: "developers",
 *       title: "Build faster with powerful APIs",
 *       description: "Access comprehensive documentation and SDKs",
 *       features: ["RESTful APIs", "GraphQL support", "Real-time webhooks"]
 *     },
 *     {
 *       label: "For Designers",
 *       value: "designers",
 *       title: "Create beautiful experiences",
 *       description: "Design tools that integrate seamlessly",
 *       features: ["Figma plugin", "Design system", "Component library"]
 *     }
 *   ]}
 *   primaryCTA={{ text: "Get Started", href: "/signup" }}
 *   secondaryCTA={{ text: "View Docs", href: "/docs" }}
 * />
 * ```
 */
export const HeroWithTabs = ({
  headline,
  subheadline,
  tabs,
  defaultTab,
  primaryCTA,
  secondaryCTA,
}: HeroWithTabsProps) => {
  const defaultValue = defaultTab || tabs[0]?.value;

  return (
    <Section>
      <Container>
        <Stack spacing="2xl" align="center">
          {/* Text content */}
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

          {/* Tabs */}
          <Tabs defaultValue={defaultValue} className="w-full max-w-3xl">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <Stack spacing="lg" align="center" className="mt-6">
                  <Stack spacing="md" align="center">
                    <Heading level={3} align="center">
                      {tab.title}
                    </Heading>
                    <Text align="center" color="muted" className="max-w-2xl">
                      {tab.description}
                    </Text>
                  </Stack>

                  {tab.features && tab.features.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-3 w-full max-w-xl">
                      {tab.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Text className="text-primary">•</Text>
                          <Text variant="small">{feature}</Text>
                        </li>
                      ))}
                    </ul>
                  )}

                  {tab.image && (
                    <img
                      src={tab.image.src}
                      alt={tab.image.alt}
                      className="rounded-lg shadow-lg max-w-full"
                    />
                  )}
                </Stack>
              </TabsContent>
            ))}
          </Tabs>

          {/* CTAs */}
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
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for HeroWithTabs component
 */
export const heroWithTabsSchema = {
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
    tabs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            description: "Tab trigger label",
          },
          value: {
            type: "string",
            description: "Unique value for the tab",
          },
          title: {
            type: "string",
            description: "Tab content title",
          },
          description: {
            type: "string",
            description: "Tab content description",
          },
          features: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Optional features or bullet points",
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
                description: "Alt text for accessibility",
              },
            },
            required: ["src", "alt"],
            description: "Optional image for the tab",
          },
        },
        required: ["label", "value", "title", "description"],
      },
      description: "Array of tab items",
      minItems: 2,
    },
    defaultTab: {
      type: "string",
      description: "Default active tab value",
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
  },
  required: ["headline", "tabs"],
};