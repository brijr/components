import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Inline,
  Text,
} from "@/components/ds";
import { Separator } from "@/components/ui/separator";

/**
 * Link item configuration
 */
export interface FooterLink {
  /** Link text */
  text: string;
  /** Link URL */
  href: string;
  /** Whether link opens in new tab */
  external?: boolean;
}

/**
 * Props for the FooterSimple component
 */
export interface FooterSimpleProps {
  /** Company/brand name */
  brandName: string;
  /** Navigation links */
  links: FooterLink[];
  /** Copyright text (year auto-added if not included) */
  copyright?: string;
  /** Social media links */
  socialLinks?: Array<{
    /** Platform name */
    platform: string;
    /** Link URL */
    href: string;
    /** Icon element */
    icon: React.ReactNode;
  }>;
}

/**
 * Simple footer with links and copyright.
 * Clean and minimal design for basic navigation needs.
 *
 * @example
 * ```tsx
 * <FooterSimple
 *   brandName="Acme Inc"
 *   links={[
 *     { text: "About", href: "/about" },
 *     { text: "Blog", href: "/blog" },
 *     { text: "Careers", href: "/careers" },
 *     { text: "Contact", href: "/contact" },
 *     { text: "Privacy", href: "/privacy" },
 *     { text: "Terms", href: "/terms" }
 *   ]}
 *   copyright="All rights reserved."
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
 * />
 * ```
 */
export const FooterSimple = ({
  brandName,
  links,
  copyright,
  socialLinks,
}: FooterSimpleProps) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright?.includes(currentYear.toString())
    ? copyright
    : `© ${currentYear} ${brandName}. ${copyright || "All rights reserved."}`;

  return (
    <footer>
      <Section className="border-t">
        <Container>
          <Stack spacing="lg">
            {/* Main footer content */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand and links */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <Text className="font-semibold">{brandName}</Text>
                
                <nav aria-label="Footer navigation">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
              </div>

              {/* Social links */}
              {socialLinks && socialLinks.length > 0 && (
                <nav aria-label="Social media links">
                  <ul className="flex gap-4">
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
              )}
            </div>

            <Separator />

            {/* Copyright */}
            <Text variant="small" color="muted">
              {copyrightText}
            </Text>
          </Stack>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterSimple component
 */
export const footerSimpleSchema = {
  type: "object",
  properties: {
    brandName: {
      type: "string",
      description: "Company/brand name",
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
    copyright: {
      type: "string",
      description: "Copyright text",
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
      description: "Social media links",
    },
  },
  required: ["brandName", "links"],
};