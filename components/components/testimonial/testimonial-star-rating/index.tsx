import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface TestimonialStarRatingProps {
  headline?: string;
  rating: number;
  totalReviews: number;
  ratingBreakdown?: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  platforms?: Array<{
    name: string;
    rating: number;
    reviews: number;
    logo?: string;
  }>;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const TestimonialStarRating = ({
  headline,
  rating,
  totalReviews,
  ratingBreakdown,
  platforms,
  primaryCTA,
}: TestimonialStarRatingProps) => {
  const renderStars = (score: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(score)
                ? "fill-yellow-400 text-yellow-400"
                : i < score
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-muted text-muted"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const getPercentage = (count: number) => {
    if (!ratingBreakdown) return 0;
    const total = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);
    return total > 0 ? (count / total) * 100 : 0;
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          {headline && (
            <Header as="h2" className="text-center">
              {headline}
            </Header>
          )}

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <Flex direction="column" align="center" gap={4} className="text-center">
                <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
                {renderStars(rating)}
                <p className="text-muted-foreground">
                  Based on {totalReviews.toLocaleString()} reviews
                </p>
              </Flex>

              {ratingBreakdown && (
                <Flex direction="column" gap={2}>
                  {[
                    { stars: 5, count: ratingBreakdown.five },
                    { stars: 4, count: ratingBreakdown.four },
                    { stars: 3, count: ratingBreakdown.three },
                    { stars: 2, count: ratingBreakdown.two },
                    { stars: 1, count: ratingBreakdown.one },
                  ].map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-3 text-sm">{stars}</span>
                      <svg
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${getPercentage(count)}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-12 text-right text-sm text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  ))}
                </Flex>
              )}
            </div>
          </div>

          {platforms && platforms.length > 0 && (
            <div>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Trusted across review platforms
              </p>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    {platform.logo && (
                      <Image
                        src={platform.logo}
                        alt={platform.name}
                        width={120}
                        height={32}
                        className="h-8 w-auto opacity-60"
                      />
                    )}
                    <div className="font-semibold">{platform.name}</div>
                    {renderStars(platform.rating)}
                    <p className="text-sm text-muted-foreground">
                      {platform.rating.toFixed(1)} ({platform.reviews} reviews)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

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