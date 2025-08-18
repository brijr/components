import Link from "next/link";
import Image from "next/image";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface HeroSplitProps {
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
  imagePosition?: "left" | "right";
}

export const HeroSplit = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  imagePosition = "right",
}: HeroSplitProps) => {
  const textContent = (
    <Flex direction="column" gap={6} className="py-8 md:py-12">
      <Header as="h1">{headline}</Header>

      {subheadline && (
        <p className="text-muted-foreground text-lg md:text-xl">
          {subheadline}
        </p>
      )}

      {(primaryCTA || secondaryCTA) && (
        <Flex gap={4} className="flex-col sm:flex-row">
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
  );

  const imageContent = image && (
    <div className="relative aspect-square md:aspect-[4/3] lg:aspect-video">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="rounded-lg object-cover"
        priority
      />
    </div>
  );

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {imagePosition === "left" ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
};
