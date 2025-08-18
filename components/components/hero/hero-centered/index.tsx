import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface HeroCenteredProps {
  badge?: string;
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
}

export const HeroCentered = ({
  badge,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroCenteredProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" align="center" gap={6} className="text-center">
          {badge && (
            <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-sm font-medium">
              {badge}
            </div>
          )}

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
      </Container>
    </Section>
  );
};
