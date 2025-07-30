import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

/**
 * Wall testimonial configuration
 */
export interface WallTestimonial {
  /** Customer quote */
  quote: string;
  /** Customer name */
  author: string;
  /** Customer role/title */
  role?: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Size variant for masonry effect */
  size?: "small" | "medium" | "large";
}

/**
 * Props for the TestimonialWall component
 */
export interface TestimonialWallProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of testimonials */
  testimonials: WallTestimonial[];
  /** Number of columns on desktop */
  columns?: 3 | 4;
  /** Show ratings */
  showRatings?: boolean;
}

/**
 * Masonry/wall layout of varied testimonials for visual impact.
 * Perfect for displaying many testimonials in an engaging layout.
 *
 * @example
 * ```tsx
 * <TestimonialWall
 *   headline="Wall of love"
 *   subheadline="What our community is saying"
 *   testimonials={[
 *     {
 *       quote: "Amazing product!",
 *       author: "Jane Doe",
 *       role: "Designer",
 *       rating: 5,
 *       size: "small"
 *     },
 *     {
 *       quote: "This has transformed our workflow completely...",
 *       author: "John Smith",
 *       role: "Developer",
 *       company: "TechCo",
 *       avatar: "/avatars/john.jpg",
 *       size: "large"
 *     },
 *     // ... more testimonials
 *   ]}
 *   columns={4}
 *   showRatings
 * />
 * ```
 */
export const TestimonialWall = ({
  headline,
  subheadline,
  testimonials,
  columns = 3,
  showRatings = true,
}: TestimonialWallProps) => {
  // Distribute testimonials into columns for masonry effect
  const distributeTestimonials = () => {
    const cols: WallTestimonial[][] = Array.from({ length: columns }, () => []);
    const heights = new Array(columns).fill(0);

    testimonials.forEach((testimonial) => {
      // Find the shortest column
      const shortestCol = heights.indexOf(Math.min(...heights));
      cols[shortestCol].push(testimonial);
      
      // Update height (approximate based on size)
      const sizeHeights = { small: 1, medium: 2, large: 3 };
      heights[shortestCol] += sizeHeights[testimonial.size || "medium"];
    });

    return cols;
  };

  const columnizedTestimonials = distributeTestimonials();

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md" align="center" className="max-w-3xl mx-auto">
            <Heading level={2} align="center">
              {headline}
            </Heading>
            {subheadline && (
              <Text variant="lead" align="center" color="muted">
                {subheadline}
              </Text>
            )}
          </Stack>

          {/* Testimonial Wall */}
          <div className={`grid gap-4 ${
            columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
          }`}>
            {columnizedTestimonials.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className={`${
                      testimonial.size === "small" ? "p-4" : 
                      testimonial.size === "large" ? "p-6" : "p-5"
                    }`}
                  >
                    <CardContent className="p-0">
                      <Stack spacing="sm">
                        {/* Rating */}
                        {showRatings && testimonial.rating && (
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < (testimonial.rating || 0)
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Quote */}
                        <Text 
                          className={
                            testimonial.size === "small" ? "text-sm" : 
                            testimonial.size === "large" ? "text-lg" : ""
                          }
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </Text>

                        {/* Author */}
                        <div className="flex items-center gap-2">
                          {testimonial.avatar && (
                            <Avatar className={
                              testimonial.size === "small" ? "w-8 h-8" : "w-10 h-10"
                            }>
                              <AvatarImage 
                                src={testimonial.avatar} 
                                alt={testimonial.author} 
                              />
                              <AvatarFallback className="text-xs">
                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div className={`font-medium ${
                              testimonial.size === "small" ? "text-sm" : ""
                            }`}>
                              {testimonial.author}
                            </div>
                            {(testimonial.role || testimonial.company) && (
                              <Text 
                                variant="small" 
                                color="muted" 
                                className={testimonial.size === "small" ? "text-xs" : ""}
                              >
                                {testimonial.role}
                                {testimonial.role && testimonial.company && ", "}
                                {testimonial.company}
                              </Text>
                            )}
                          </div>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialWall component
 */
export const testimonialWallSchema = {
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
    testimonials: {
      type: "array",
      items: {
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
          size: {
            type: "string",
            enum: ["small", "medium", "large"],
            description: "Size variant for masonry effect",
            default: "medium",
          },
        },
        required: ["quote", "author"],
      },
      description: "Array of testimonials",
      minItems: 6,
    },
    columns: {
      type: "number",
      enum: [3, 4],
      description: "Number of columns on desktop",
      default: 3,
    },
    showRatings: {
      type: "boolean",
      description: "Show ratings",
      default: true,
    },
  },
  required: ["headline", "testimonials"],
};