import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface HeroBackgroundImageProps {
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
  backgroundImage: {
    src: string;
    alt: string;
    overlay?: boolean;
  };
  badge?: string;
}

export const HeroBackgroundImage = ({
  headline,
  subheadline,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  badge,
}: HeroBackgroundImageProps) => {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
        />
        {backgroundImage.overlay !== false && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        )}
      </div>
      <Container>
        <Flex
          direction="column"
          align="center"
          gap={6}
          className="py-20 text-center md:py-32"
        >
          {badge && (
            <span className="inline-flex items-center rounded-full border bg-background/50 px-4 py-1 text-sm font-medium backdrop-blur">
              {badge}
            </span>
          )}
          <Header as="h1" className="max-w-4xl">
            {headline}
          </Header>
          {subheadline && (
            <p className="max-w-2xl text-xl text-muted-foreground">
              {subheadline}
            </p>
          )}
          {description && (
            <p className="max-w-2xl text-muted-foreground">{description}</p>
          )}
          <Flex gap={4} className="mt-2">
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
      </Container>
    </Section>
  );
};