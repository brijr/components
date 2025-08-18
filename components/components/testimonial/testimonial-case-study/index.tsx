import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface TestimonialCaseStudyProps {
  headline: string;
  subheadline?: string;
  company: {
    name: string;
    logo?: string;
    industry?: string;
    size?: string;
  };
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    value: string;
    description?: string;
  }>;
  quote?: {
    text: string;
    author: string;
    role?: string;
    avatar?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export const TestimonialCaseStudy = ({
  headline,
  subheadline,
  company,
  challenge,
  solution,
  results,
  quote,
  image,
  primaryCTA,
  secondaryCTA,
}: TestimonialCaseStudyProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          <div className="text-center">
            {company.logo && (
              <Image
                src={company.logo}
                alt={company.name}
                width={200}
                height={48}
                className="mx-auto mb-6 h-12 w-auto opacity-60"
              />
            )}
            <Header as="h1" className="mb-3">
              {headline}
            </Header>
            {subheadline && (
              <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
            {(company.industry || company.size) && (
              <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
                {company.industry && (
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {company.industry}
                  </span>
                )}
                {company.size && (
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {company.size}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold text-lg">The Challenge</h3>
                <p className="text-muted-foreground">{challenge}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold text-lg">The Solution</h3>
                <p className="text-muted-foreground">{solution}</p>
              </CardContent>
            </Card>
          </div>

          {image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div>
            <Header as="h2" className="mb-8 text-center">
              The Results
            </Header>
            <div className="grid gap-6 text-center md:grid-cols-3">
              {results.map((result, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-primary">
                    {result.value}
                  </div>
                  <div className="mt-1 font-semibold">{result.metric}</div>
                  {result.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {result.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {quote && (
            <Card className="border-primary">
              <CardContent className="p-8">
                <Flex direction="column" gap={4}>
                  <blockquote className="text-lg font-medium">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    {quote.avatar && (
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={quote.avatar}
                          alt={quote.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{quote.author}</p>
                      {quote.role && (
                        <p className="text-sm text-muted-foreground">
                          {quote.role}, {company.name}
                        </p>
                      )}
                    </div>
                  </div>
                </Flex>
              </CardContent>
            </Card>
          )}

          {(primaryCTA || secondaryCTA) && (
            <Flex gap={4} className="justify-center">
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};