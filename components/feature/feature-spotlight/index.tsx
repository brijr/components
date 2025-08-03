"use client";

import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Spotlight feature configuration
 */
export interface SpotlightFeature {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Feature image */
  image: {
    src: string;
    alt: string;
  };
  /** Optional badge */
  badge?: string;
  /** Optional benefits list */
  benefits?: string[];
  /** Optional CTA */
  cta?: {
    label: string;
    href: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
  };
  /** Optional testimonial */
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: {
      src: string;
      alt: string;
    };
  };
}

/**
 * Props for the FeatureSpotlight component
 */
export interface FeatureSpotlightProps {
  /** Main headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of features to spotlight */
  features: SpotlightFeature[];
  /** Layout direction */
  direction?: "left" | "right" | "alternating";
}

/**
 * Feature spotlight section with large images and detailed content.
 * Perfect for highlighting key features with visual storytelling.
 *
 * @example
 * ```tsx
 * <FeatureSpotlight
 *   headline="Powerful features that drive results"
 *   subheadline="See how our platform transforms your workflow"
 *   direction="alternating"
 *   features={[
 *     {
 *       title: "Advanced Analytics Dashboard",
 *       description: "Get deep insights into your data with our comprehensive analytics suite. Track performance, identify trends, and make data-driven decisions.",
 *       image: {
 *         src: "/analytics-dashboard.jpg",
 *         alt: "Analytics dashboard showing charts and metrics"
 *       },
 *       badge: "New",
 *       benefits: [
 *         "Real-time data visualization",
 *         "Custom report builder",
 *         "Export to multiple formats",
 *         "Team collaboration features"
 *       ],
 *       cta: {
 *         label: "Explore Analytics",
 *         href: "/features/analytics"
 *       },
 *       testimonial: {
 *         quote: "The analytics dashboard transformed how we make decisions. We now have insights we never had before.",
 *         author: "Sarah Chen",
 *         role: "Head of Product",
 *         company: "TechCorp",
 *         avatar: {
 *           src: "/sarah-avatar.jpg",
 *           alt: "Sarah Chen"
 *         }
 *       }
 *     },
 *     {
 *       title: "Intelligent Automation",
 *       description: "Automate repetitive tasks and focus on what matters most. Our AI-powered automation tools help you save time and reduce errors.",
 *       image: {
 *         src: "/automation-flow.jpg",
 *         alt: "Visual workflow automation builder"
 *       },
 *       benefits: [
 *         "Visual workflow builder",
 *         "100+ integrations",
 *         "Conditional logic",
 *         "Error handling"
 *       ],
 *       cta: {
 *         label: "Learn More",
 *         href: "/features/automation",
 *         variant: "outline"
 *       }
 *     }
 *   ]}
 * />
 * ```
 */
export const FeatureSpotlight = ({
  headline,
  subheadline,
  features,
  direction = "alternating",
}: FeatureSpotlightProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Section>
      <Container className="max-w-7xl">
        <Stack spacing="2xl">
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

          {/* Features */}
          <Stack spacing="4xl">
            {features.map((feature, index) => {
              const isLeft = direction === "left" || 
                (direction === "alternating" && index % 2 === 0);
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={cn(
                    "grid gap-12 lg:grid-cols-2 lg:items-center",
                    !isLeft && "lg:grid-flow-col-dense"
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Content */}
                  <Stack spacing="lg" className={cn(!isLeft && "lg:col-start-2")}>
                    <Stack spacing="md">
                      {feature.badge && (
                        <div>
                          <Badge variant="secondary">
                            {feature.badge}
                          </Badge>
                        </div>
                      )}
                      <Heading size={3}>
                        {feature.title}
                      </Heading>
                      <Text variant="lead" subdued>
                        {feature.description}
                      </Text>
                    </Stack>

                    {feature.benefits && feature.benefits.length > 0 && (
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-1 mt-1 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </div>
                            <Text>{benefit}</Text>
                          </li>
                        ))}
                      </ul>
                    )}

                    {feature.testimonial && (
                      <div className="border-l-2 border-primary/20 pl-6 py-2">
                        <blockquote className="space-y-3">
                          <Text variant="lead" className="italic">
                            &ldquo;{feature.testimonial.quote}&rdquo;
                          </Text>
                          <div className="flex items-center gap-3">
                            {feature.testimonial.avatar && (
                              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={feature.testimonial.avatar.src}
                                  alt={feature.testimonial.avatar.alt}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <Text className="font-medium">
                                {feature.testimonial.author}
                              </Text>
                              {(feature.testimonial.role || feature.testimonial.company) && (
                                <Text variant="small" subdued>
                                  {feature.testimonial.role}
                                  {feature.testimonial.role && feature.testimonial.company && ", "}
                                  {feature.testimonial.company}
                                </Text>
                              )}
                            </div>
                          </div>
                        </blockquote>
                      </div>
                    )}

                    {feature.cta && (
                      <div>
                        <Button
                          variant={feature.cta.variant || "default"}
                          asChild
                        >
                          <a href={feature.cta.href}>
                            {feature.cta.label}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </Stack>

                  {/* Image */}
                  <div className={cn(
                    "relative",
                    !isLeft && "lg:col-start-1"
                  )}>
                    <div className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-lg bg-muted",
                      "transition-all duration-500",
                      isActive && "shadow-2xl scale-[1.02]"
                    )}>
                      <Image
                        src={feature.image.src}
                        alt={feature.image.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FeatureSpotlight component
 */
export const featureSpotlightSchema = {
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
          badge: {
            type: "string",
            description: "Optional badge text",
          },
          benefits: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Optional benefits list",
          },
          cta: {
            type: "object",
            properties: {
              label: {
                type: "string",
                description: "CTA button label",
              },
              href: {
                type: "string",
                description: "CTA destination URL",
              },
              variant: {
                type: "string",
                enum: ["default", "secondary", "outline", "ghost"],
                description: "Button variant",
              },
            },
            required: ["label", "href"],
          },
          testimonial: {
            type: "object",
            properties: {
              quote: {
                type: "string",
                description: "Testimonial quote",
              },
              author: {
                type: "string",
                description: "Quote author name",
              },
              role: {
                type: "string",
                description: "Author's role",
              },
              company: {
                type: "string",
                description: "Author's company",
              },
              avatar: {
                type: "object",
                properties: {
                  src: {
                    type: "string",
                    description: "Avatar image URL",
                  },
                  alt: {
                    type: "string",
                    description: "Avatar alt text",
                  },
                },
                required: ["src", "alt"],
              },
            },
            required: ["quote", "author"],
          },
        },
        required: ["title", "description", "image"],
      },
      minItems: 1,
    },
    direction: {
      type: "string",
      enum: ["left", "right", "alternating"],
      description: "Layout direction for images",
      default: "alternating",
    },
  },
  required: ["headline", "features"],
};