import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

/**
 * Statistic configuration
 */
export interface Stat {
  /** Stat value */
  value: string;
  /** Stat label */
  label: string;
  /** Optional suffix (e.g., "%", "+") */
  suffix?: string;
}

/**
 * Testimonial configuration
 */
export interface TestimonialWithStat {
  /** Customer quote */
  quote: string;
  /** Customer name */
  author: string;
  /** Customer role/title */
  role: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
}

/**
 * Props for the TestimonialWithStats component
 */
export interface TestimonialWithStatsProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of statistics */
  stats: Stat[];
  /** Featured testimonial */
  testimonial: TestimonialWithStat;
  /** Layout variant */
  layout?: "centered" | "split";
}

/**
 * Testimonials combined with impressive metrics for social proof.
 * Perfect for showcasing both qualitative feedback and quantitative results.
 *
 * @example
 * ```tsx
 * <TestimonialWithStats
 *   headline="Proven results"
 *   subheadline="Numbers that speak for themselves"
 *   stats={[
 *     { value: "98", label: "Customer satisfaction", suffix: "%" },
 *     { value: "2.5M", label: "Active users", suffix: "+" },
 *     { value: "150", label: "Countries served" }
 *   ]}
 *   testimonial={{
 *     quote: "The results exceeded our expectations.",
 *     author: "John Doe",
 *     role: "CEO",
 *     company: "Acme Corp",
 *     avatar: "/avatars/john.jpg",
 *     rating: 5
 *   }}
 *   layout="centered"
 * />
 * ```
 */
export const TestimonialWithStats = ({
  headline,
  subheadline,
  stats,
  testimonial,
  layout = "centered",
}: TestimonialWithStatsProps) => {
  const statsComponent = (
    <div className={`grid gap-8 ${
      stats.length === 2 ? "grid-cols-2" : 
      stats.length === 3 ? "grid-cols-3" : 
      stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : 
      "grid-cols-2 md:grid-cols-3"
    } ${layout === "split" ? "" : "max-w-3xl mx-auto"}`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-primary">
            {stat.value}
            {stat.suffix && (
              <span className="text-3xl md:text-4xl">{stat.suffix}</span>
            )}
          </div>
          <Text color="muted" className="mt-2">
            {stat.label}
          </Text>
        </div>
      ))}
    </div>
  );

  const testimonialComponent = (
    <Card className={layout === "split" ? "" : "max-w-3xl mx-auto"}>
      <CardContent className="p-6 md:p-8">
        <Stack spacing="md">
          {/* Rating */}
          {testimonial.rating && (
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote>
            <Text variant="lead">
              "{testimonial.quote}"
            </Text>
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-3">
            {testimonial.avatar && (
              <Avatar>
                <AvatarImage 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                />
                <AvatarFallback>
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <div className="font-semibold">
                {testimonial.author}
              </div>
              <Text size="sm" color="muted">
                {testimonial.role}
                {testimonial.company && ` at ${testimonial.company}`}
              </Text>
            </div>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );

  if (layout === "split") {
    return (
      <Section>
        <Container>
          <Stack spacing="2xl">
            {/* Header */}
            <Stack spacing="md">
              <Heading level={2}>{headline}</Heading>
              {subheadline && (
                <Text variant="lead" color="muted">
                  {subheadline}
                </Text>
              )}
            </Stack>

            {/* Content */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {statsComponent}
              {testimonialComponent}
            </div>
          </Stack>
        </Container>
      </Section>
    );
  }

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

          {/* Stats */}
          {statsComponent}

          {/* Testimonial */}
          {testimonialComponent}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialWithStats component
 */
export const testimonialWithStatsSchema = {
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
    stats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "Stat value",
          },
          label: {
            type: "string",
            description: "Stat label",
          },
          suffix: {
            type: "string",
            description: "Optional suffix",
          },
        },
        required: ["value", "label"],
      },
      description: "Array of statistics",
      minItems: 2,
      maxItems: 6,
    },
    testimonial: {
      type: "object",
      properties: {
        quote: {
          type: "string",
          description: "Customer quote",
        },
        author: {
          type: "string",
          description: "Customer name",
        },
        role: {
          type: "string",
          description: "Customer role/title",
        },
        company: {
          type: "string",
          description: "Company name",
        },
        avatar: {
          type: "string",
          description: "Avatar image URL",
        },
        rating: {
          type: "number",
          minimum: 1,
          maximum: 5,
          description: "Star rating (1-5)",
        },
      },
      required: ["quote", "author", "role"],
      description: "Featured testimonial",
    },
    layout: {
      type: "string",
      enum: ["centered", "split"],
      description: "Layout variant",
      default: "centered",
    },
  },
  required: ["headline", "stats", "testimonial"],
};