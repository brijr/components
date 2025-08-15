import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

/**
 * Individual testimonial configuration
 */
export interface Testimonial {
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
 * Props for the TestimonialGrid component
 */
export interface TestimonialGridProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Number of columns on desktop */
  columns?: 2 | 3;
  /** Show quote icon */
  showQuoteIcon?: boolean;
}

/**
 * Grid layout of testimonial cards showcasing customer feedback.
 * Perfect for displaying multiple testimonials in an organized layout.
 *
 * @example
 * ```tsx
 * <TestimonialGrid
 *   headline="What our customers say"
 *   subheadline="Join thousands of satisfied users"
 *   testimonials={[
 *     {
 *       quote: "This product changed how we work.",
 *       author: "Sarah Johnson",
 *       role: "CEO",
 *       company: "TechCorp",
 *       avatar: "/avatars/sarah.jpg",
 *       rating: 5
 *     },
 *     // ... more testimonials
 *   ]}
 *   columns={3}
 *   showQuoteIcon
 * />
 * ```
 */
export const TestimonialGrid = ({
  headline,
  subheadline,
  testimonials,
  columns = 3,
  showQuoteIcon = false,
}: TestimonialGridProps) => {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <Section>
      <Container>
        <Flex gap={10}>
          {/* Header */}
          <Flex gap={4} className="items-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Testimonials Grid */}
          <div className={`grid gap-6 ${gridCols}`}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <Flex gap={4}>
                    {/* Rating */}
                    {testimonial.rating && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (testimonial.rating || 0)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Quote */}
                    <blockquote className="relative">
                      {showQuoteIcon && (
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-muted-foreground/20" />
                      )}
                      <p className={showQuoteIcon ? "relative" : ""}>
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>
                  </Flex>
                </CardContent>

                <CardFooter>
                  <div className="flex items-center gap-3 w-full">
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
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        {testimonial.author}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialGrid component
 */
export const testimonialGridSchema = {
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
        },
        required: ["quote", "author", "role"],
      },
      description: "Array of testimonials",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3],
      description: "Number of columns on desktop",
      default: 3,
    },
    showQuoteIcon: {
      type: "boolean",
      description: "Show quote icon",
      default: false,
    },
  },
  required: ["headline", "testimonials"],
};