import Link from "next/link";
import Image from "next/image";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface HeroWithImageProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

export const HeroWithImage = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroWithImageProps) => {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Flex direction="column" gap={8}>
          <Flex
            direction="column"
            align="center"
            gap={6}
            className="text-center"
          >
            <Header as="h1">{headline}</Header>

            {subheadline && (
              <p className="text-muted-foreground max-w-2xl text-xl">
                {subheadline}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
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
            )}
          </Flex>

          {image && (
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="bg-muted relative aspect-[16/10] overflow-hidden rounded-xl border">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};
