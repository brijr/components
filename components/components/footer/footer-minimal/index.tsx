import Link from "next/link";
import { Section, Container, Flex } from "@/components/site/ds";

export interface FooterMinimalProps {
  copyright: string;
  links?: Array<{
    text: string;
    href: string;
  }>;
}

export const FooterMinimal = ({ copyright, links }: FooterMinimalProps) => {
  return (
    <Section className="border-t">
      <Container>
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
      </Container>
    </Section>
  );
};