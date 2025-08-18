"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface TestimonialCarouselProps {
  headline?: string;
  subheadline?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
  }>;
  autoplay?: boolean;
  interval?: number;
}

export const TestimonialCarousel = ({
  headline,
  subheadline,
  testimonials,
  autoplay = true,
  interval = 5000,
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          {(headline || subheadline) && (
            <div className="text-center">
              {headline && (
                <Header as="h2" className="mb-3">
                  {headline}
                </Header>
              )}
              {subheadline && (
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          <div className="relative mx-auto w-full max-w-4xl">
            <Card className="border-0 bg-transparent">
              <CardContent className="p-8 md:p-12">
                <Flex direction="column" align="center" gap={6} className="text-center">
                  {currentTestimonial.rating && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                  
                  <blockquote className="text-xl md:text-2xl font-medium">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    {currentTestimonial.avatar && (
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={currentTestimonial.avatar}
                          alt={currentTestimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{currentTestimonial.author}</p>
                      {(currentTestimonial.role || currentTestimonial.company) && (
                        <p className="text-sm text-muted-foreground">
                          {currentTestimonial.role}
                          {currentTestimonial.role && currentTestimonial.company && ", "}
                          {currentTestimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </Flex>
              </CardContent>
            </Card>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="h-8 w-8"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="h-8 w-8"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};