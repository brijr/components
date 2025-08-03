import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Feature item configuration for bento grid
 */
export interface BentoFeatureItem {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Optional image for featured items */
  image?: {
    src: string;
    alt: string;
  };
  /** Size of the card in the grid */
  size?: "small" | "medium" | "large";
  /** Optional custom className for the card */
  className?: string;
}

/**
 * Props for the FeatureBento component
 */
export interface FeatureBentoProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of features to display in bento grid */
  features: BentoFeatureItem[];
}

/**
 * Bento grid feature section with different sized cards for visual hierarchy.
 * Perfect for showcasing features with varying importance levels.
 *
 * @example
 * ```tsx
 * <FeatureBento
 *   headline="Powerful features for modern teams"
 *   subheadline="Everything you need in one integrated platform"
 *   features={[
 *     {
 *       title: "Real-time Collaboration",
 *       description: "Work together seamlessly with live updates and shared workspaces",
 *       icon: <Users className="w-6 h-6" />,
 *       size: "large",
 *       image: {
 *         src: "/collaboration.jpg",
 *         alt: "Team collaboration interface"
 *       }
 *     },
 *     {
 *       title: "Advanced Analytics",
 *       description: "Get insights with powerful reporting tools",
 *       icon: <BarChart className="w-5 h-5" />,
 *       size: "medium"
 *     },
 *     {
 *       title: "Security First",
 *       description: "Enterprise-grade security",
 *       icon: <Shield className="w-5 h-5" />,
 *       size: "small"
 *     }
 *   ]}
 * />
 * ```
 */
export const FeatureBento = ({
  headline,
  subheadline,
  features,
}: FeatureBentoProps) => {
  return (
    <Section>
      <Container>
        <Stack spacing="xl">
          {/* Header */}
          <Stack spacing="md" align="center">
            <Heading size={2} centered>
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" centered subdued className="max-w-3xl">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Bento Grid */}
          <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12 auto-rows-[200px]">
            {features.map((feature, index) => {
              const size = feature.size || "medium";
              const gridClass = {
                small: "md:col-span-2 lg:col-span-3",
                medium: "md:col-span-3 lg:col-span-4",
                large: "md:col-span-4 lg:col-span-6 md:row-span-2",
              }[size];

              return (
                <Card
                  key={index}
                  className={cn(
                    "group relative overflow-hidden hover:shadow-lg transition-all duration-300",
                    gridClass,
                    feature.className
                  )}
                >
                  <CardContent className="relative h-full p-6 flex flex-col">
                    {/* Background image for featured items */}
                    {feature.image && size === "large" && (
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Image
                          src={feature.image.src}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <Stack spacing="md" className="relative z-10 h-full">
                      {feature.icon && (
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                      )}
                      <Stack spacing="sm" className="flex-1">
                        <Heading size={size === "large" ? 3 : 4}>
                          {feature.title}
                        </Heading>
                        <Text 
                          subdued 
                          variant={size === "small" ? "small" : undefined}
                          className={cn(
                            size === "large" && "lg:text-lg"
                          )}
                        >
                          {feature.description}
                        </Text>
                      </Stack>
                    </Stack>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureBento component
 */
export const featureBentoSchema = {
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
          title: {
            type: "string",
            description: "Feature title",
          },
          description: {
            type: "string",
            description: "Feature description",
          },
          size: {
            type: "string",
            enum: ["small", "medium", "large"],
            description: "Size of the card in the grid",
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
        },
        required: ["title", "description"],
      },
      minItems: 1,
    },
  },
  required: ["headline", "features"],
};