import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface HeroLeftMediaProps {
  headline: string;
  subheadline?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  features?: string[];
}

export const HeroLeftMedia = ({
  headline,
  subheadline,
  description,
  primaryCTA,
  secondaryCTA,
  media,
  features,
}: HeroLeftMediaProps) => {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          <div className="order-2 md:order-1">
            {media.type === "image" ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={media.src}
                  alt={media.alt || "Hero image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <video
                  src={media.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <Flex direction="column" gap={6} className="order-1 md:order-2">
            {subheadline && (
              <p className="text-sm font-medium text-primary">{subheadline}</p>
            )}
            <Header as="h1">{headline}</Header>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
            {features && features.length > 0 && (
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <Flex gap={4} className="pt-2">
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
          </Flex>
        </div>
      </Container>
    </Section>
  );
};