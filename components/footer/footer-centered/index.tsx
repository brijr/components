import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Separator } from "@/components/ui/separator";

/**
 * Props for the FooterCentered component
 */
export interface FooterCenteredProps {
  /** Brand information */
  brand: {
    /** Company name */
    name: string;
    /** Tagline or description */
    tagline?: string;
    /** Logo element */
    logo?: React.ReactNode;
  };
  /** Navigation links */
  links: Array<{
    text: string;
    href: string;
    external?: boolean;
  }>;
  /** Social links */
  socialLinks?: Array<{
    platform: string;
    href: string;
    icon: React.ReactNode;
  }>;
  /** Copyright text */
  copyright?: string;
}

/**
 * Centered footer with brand, links, and social icons.
 * Clean design with everything centered for impact.
 *
 * @example
 * ```tsx
 * <FooterCentered
 *   brand={{
 *     name: "Acme Inc",
 *     tagline: "Building amazing products"
 *   }}
 *   links={[
 *     { text: "Features", href: "/features" },
 *     { text: "Pricing", href: "/pricing" },
 *     { text: "About", href: "/about" },
 *     { text: "Blog", href: "/blog" },
 *     { text: "Contact", href: "/contact" }
 *   ]}
 *   socialLinks={[
 *     {
 *       platform: "GitHub",
 *       href: "https://github.com",
 *       icon: <GitHubIcon className="w-5 h-5" />
 *     },
 *     {
 *       platform: "Twitter",
 *       href: "https://twitter.com",
 *       icon: <TwitterIcon className="w-5 h-5" />
 *     }
 *   ]}
 *   copyright="All rights reserved."
 * />
 * ```
 */
export const FooterCentered = ({
  brand,
  links,
  socialLinks,
  copyright,
}: FooterCenteredProps) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright?.includes(currentYear.toString())
    ? copyright
    : `© ${currentYear} ${brand.name}. ${copyright || "All rights reserved."}`;

  return (
    <footer>
      <Section className="border-t">
        <Container>
          <Stack spacing="xl" align="center">
            {/* Brand */}
            <Stack spacing="sm" align="center">
              {brand.logo && (
                <div className="mb-2">
                  {brand.logo}
                </div>
              )}
              <Heading level={3} align="center">
                {brand.name}
              </Heading>
              {brand.tagline && (
                <Text color="muted" align="center">
                  {brand.tagline}
                </Text>
              )}
            </Stack>

            {/* Navigation links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social links */}
            {socialLinks && socialLinks.length > 0 && (
              <>
                <Separator className="max-w-xs" />
                <nav aria-label="Social media links">
                  <ul className="flex gap-6">
                    {socialLinks.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Visit our ${social.platform} page`}
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}

            {/* Copyright */}
            <Text variant="small" color="muted" align="center">
              {copyrightText}
            </Text>
          </Stack>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterCentered component
 */
export const footerCenteredSchema = {
  type: "object",
  properties: {
    brand: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Company name",
        },
        tagline: {
          type: "string",
          description: "Tagline or description",
        },
      },
      required: ["name"],
      description: "Brand information",
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Link text",
          },
          href: {
            type: "string",
            description: "Link URL",
          },
          external: {
            type: "boolean",
            description: "Whether link opens in new tab",
            default: false,
          },
        },
        required: ["text", "href"],
      },
      description: "Navigation links",
      minItems: 1,
    },
    socialLinks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          platform: {
            type: "string",
            description: "Platform name",
          },
          href: {
            type: "string",
            description: "Link URL",
          },
        },
        required: ["platform", "href"],
      },
      description: "Social links",
    },
    copyright: {
      type: "string",
      description: "Copyright text",
    },
  },
  required: ["brand", "links"],
};