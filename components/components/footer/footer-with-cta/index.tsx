import Link from "next/link";
import { Section, Container, Flex, Header } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface FooterWithCTAProps {
  headline: string;
  subheadline?: string;
  socialProof?: string;
  cta: {
    text: string;
    href: string;
  };
  copyright: string;
  links?: Array<{
    text: string;
    href: string;
  }>;
}

export const FooterWithCTA = ({
  headline,
  subheadline,
  socialProof,
  cta,
  copyright,
  links,
}: FooterWithCTAProps) => {
  return (
    <Section className="border-t bg-muted/30">
      <Container>
        <Flex direction="column" gap={8}>
          <Flex direction="column" gap={4} align="center" className="text-center">
            <Header as="h3">{headline}</Header>
            {subheadline && (
              <p className="text-muted-foreground max-w-2xl">{subheadline}</p>
            )}
            <Button size="lg" asChild className="mt-2">
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
            {socialProof && (
              <p className="text-sm text-muted-foreground mt-2">{socialProof}</p>
            )}
          </Flex>
          
          <div className="border-t pt-6">
            <Flex
              justify="between"
              align="center"
              className="flex-col gap-4 sm:flex-row"
            >
              <p className="text-sm text-muted-foreground">{copyright}</p>
              {links && links.length > 0 && (
                <Flex gap={6}>
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                </Flex>
              )}
            </Flex>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};