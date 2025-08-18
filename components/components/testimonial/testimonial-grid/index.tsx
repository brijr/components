import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Grid, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface TestimonialGridProps {
  headline?: string;
  subheadline?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
    featured?: boolean;
  }>;
  columns?: 2 | 3;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const TestimonialGrid = ({
  headline,
  subheadline,
  testimonials,
  columns = 3,
  primaryCTA,
}: TestimonialGridProps) => {
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

          <Grid columns={columns}>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`h-full ${
                  testimonial.featured ? "border-primary" : ""
                }`}
              >
                <CardContent className="p-6">
                  <Flex direction="column" gap={4}>
                    {testimonial.rating && (
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < (testimonial.rating || 0)
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
                    
                    <blockquote className="flex-1 text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center gap-3">
                      {testimonial.avatar && (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        {(testimonial.role || testimonial.company) && (
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                            {testimonial.role && testimonial.company && ", "}
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {primaryCTA && (
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};