import Link from "next/link";
import { Section, Container, Flex, Header } from "@/components/site/ds";
import * as Icons from "lucide-react";

export interface FooterWithSocialProps {
  companyName: string;
  tagline?: string;
  socialLinks?: Array<{
    platform: keyof typeof Icons;
    href: string;
    label: string;
  }>;
  trustBadges?: Array<{
    text: string;
    icon?: keyof typeof Icons;
  }>;
  links?: Array<{
    text: string;
    href: string;
  }>;
  copyright: string;
}

export const FooterWithSocial = ({
  companyName,
  tagline,
  socialLinks,
  trustBadges,
  links,
  copyright,
}: FooterWithSocialProps) => {
  return (
    <Section className="border-t">
      <Container>
        <Flex direction="column" gap={6}>
          <Flex
            justify="between"
            align="start"
            className="flex-col gap-6 sm:flex-row"
          >
            <div>
              <Header as="h4" className="mb-2">
                {companyName}
              </Header>
              {tagline && (
                <p className="text-sm text-muted-foreground">{tagline}</p>
              )}
            </div>
            
            {socialLinks && socialLinks.length > 0 && (
              <Flex gap={3}>
                {socialLinks.map((social, index) => {
                  const Icon = Icons[social.platform] as Icons.LucideIcon | undefined;
                  return Icon ? (
                    <Link
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ) : null;
                })}
              </Flex>
            )}
          </Flex>

          {trustBadges && trustBadges.length > 0 && (
            <Flex gap={4} className="flex-wrap">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon ? Icons[badge.icon] as Icons.LucideIcon : null;
                return (
                  <Flex key={index} gap={2} align="center">
                    {Icon && <Icon className="h-4 w-4 text-primary" />}
                    <span className="text-sm text-muted-foreground">
                      {badge.text}
                    </span>
                  </Flex>
                );
              })}
            </Flex>
          )}

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