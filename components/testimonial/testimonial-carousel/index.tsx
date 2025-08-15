"use client";

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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/**
 * Individual testimonial configuration
 */
export interface CarouselTestimonial {
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
 * Props for the TestimonialCarousel component
 */
export interface TestimonialCarouselProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of testimonials */
  testimonials: CarouselTestimonial[];
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Show navigation dots */
  showDots?: boolean;
  /** Show navigation arrows */
  showArrows?: boolean;
}

/**
 * Sliding carousel of testimonials with navigation controls.
 * Perfect for showcasing testimonials in a compact, interactive format.
 *
 * @example
 * ```tsx
 * <TestimonialCarousel
 *   headline="Customer success stories"
 *   subheadline="Hear from our satisfied customers"
 *   testimonials={[
 *     {
 *       quote: "Amazing product that exceeded our expectations.",
 *       author: "Jane Doe",
 *       role: "CEO",
 *       company: "Acme Corp",
 *       avatar: "/avatars/jane.jpg",
 *       rating: 5
 *     },
 *     // ... more testimonials
 *   ]}
 *   autoPlayInterval={5000}
 *   showDots
 *   showArrows
 * />
 * ```
 */
export const TestimonialCarousel = ({
  headline,
  subheadline,
  testimonials,
  autoPlayInterval,
  showDots = true,
  showArrows = true,
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(!!autoPlayInterval);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goToSlide = React.useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || !autoPlayInterval) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section>
      <Container>
        <Flex gap="2xl">
          {/* Header */}
          <Flex gap="md" className="flex-col items-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Carousel */}
          <div 
            className="relative max-w-4xl mx-auto w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(!!autoPlayInterval)}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <Flex gap="lg" className="flex-col items-center">
                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < (currentTestimonial.rating || 0)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Quote */}
                  <blockquote className="text-center max-w-2xl">
                    <p className="text-xl text-center">
                      &ldquo;{currentTestimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {currentTestimonial.avatar && (
                      <Avatar className="w-12 h-12">
                        <AvatarImage 
                          src={currentTestimonial.avatar} 
                          alt={currentTestimonial.author} 
                        />
                        <AvatarFallback>
                          {currentTestimonial.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="text-center">
                      <div className="font-semibold">
                        {currentTestimonial.author}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentTestimonial.role}
                        {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                      </p>
                    </div>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            {showArrows && testimonials.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Navigation Dots */}
          {showDots && testimonials.length > 1 && (
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialCarousel component
 */
export const testimonialCarouselSchema = {
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
    autoPlayInterval: {
      type: "number",
      description: "Auto-play interval in milliseconds",
    },
    showDots: {
      type: "boolean",
      description: "Show navigation dots",
      default: true,
    },
    showArrows: {
      type: "boolean",
      description: "Show navigation arrows",
      default: true,
    },
  },
  required: ["headline", "testimonials"],
};