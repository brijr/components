import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/**
 * Social platform configuration
 */
export interface SocialPlatform {
  /** Platform name */
  name: string;
  /** Platform URL */
  href: string;
  /** Icon element */
  icon: React.ReactNode;
  /** Follower count (optional) */
  followers?: string;
  /** Platform-specific color class (optional) */
  colorClass?: string;
}

/**
 * Props for the FooterSocial component
 */
export interface FooterSocialProps {
  /** Brand information */
  brand: {
    /** Company name */
    name: string;
    /** Tagline */
    tagline?: string;
  };
  /** Social media platforms */
  socialPlatforms: SocialPlatform[];
  /** Call to action for social following */
  socialCta?: {
    /** CTA title */
    title: string;
    /** CTA description */
    description: string;
  };
  /** Quick navigation links */
  quickLinks?: Array<{
    text: string;
    href: string;
  }>;
  /** Copyright text */
  copyright?: string;
}

/**
 * Social media focused footer with prominent social icons and follower counts.
 * Perfect for brands with strong social media presence.
 *
 * @example
 * ```tsx
 * <FooterSocial
 *   brand={{
 *     name: "Acme Inc",
 *     tagline: "Join our community"
 *   }}
 *   socialPlatforms={[
 *     {
 *       name: "Twitter",
 *       href: "https://twitter.com/acme",
 *       icon: <TwitterIcon className="w-6 h-6" />,
 *       followers: "125K",
 *       colorClass: "hover:text-blue-400"
 *     },
 *     {
 *       name: "Instagram",
 *       href: "https://instagram.com/acme",
 *       icon: <InstagramIcon className="w-6 h-6" />,
 *       followers: "340K",
 *       colorClass: "hover:text-pink-500"
 *     },
 *     {
 *       name: "LinkedIn",
 *       href: "https://linkedin.com/company/acme",
 *       icon: <LinkedInIcon className="w-6 h-6" />,
 *       followers: "89K",
 *       colorClass: "hover:text-blue-600"
 *     },
 *     {
 *       name: "YouTube",
 *       href: "https://youtube.com/@acme",
 *       icon: <YouTubeIcon className="w-6 h-6" />,
 *       followers: "210K",
 *       colorClass: "hover:text-red-600"
 *     }
 *   ]}
 *   socialCta={{
 *     title: "Connect with us",
 *     description: "Follow us for the latest updates, behind-the-scenes content, and exclusive offers"
 *   }}
 *   quickLinks={[
 *     { text: "About", href: "/about" },
 *     { text: "Contact", href: "/contact" },
 *     { text: "Privacy", href: "/privacy" },
 *     { text: "Terms", href: "/terms" }
 *   ]}
 * />
 * ```
 */
export const FooterSocial = ({
  brand,
  socialPlatforms,
  socialCta,
  quickLinks,
  copyright,
}: FooterSocialProps) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright?.includes(currentYear.toString())
    ? copyright
    : `© ${currentYear} ${brand.name}. ${copyright || "All rights reserved."}`;

  return (
    <footer>
      <Section className="border-t bg-gradient-to-b from-background to-muted/20">
        <Container>
          <Flex direction="column" gap={12}>
            {/* Social CTA Section */}
            <div className="text-center">
              <Flex direction="column" gap={6} className="items-center">
                {socialCta && (
                  <>
                    <Header as="h2" className="text-center">
                      {socialCta.title}
                    </Header>
                    <p className="text-xl text-muted-foreground text-center max-w-2xl">
                      {socialCta.description}
                    </p>
                  </>
                )}
                
                {/* Social Platform Grid */}
                <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 mt-8">
                  {socialPlatforms.map((platform, index) => (
                    <Link
                      key={index}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col items-center gap-3 p-6 rounded-xl transition-all hover:scale-105 hover:bg-accent/50 ${platform.colorClass || "hover:text-primary"}`}
                      aria-label={`Follow us on ${platform.name}`}
                    >
                      <div className="text-muted-foreground group-hover:text-current transition-colors">
                        {platform.icon}
                      </div>
                      <Flex direction="column" gap={3} className="items-center">
                        <p className="font-medium">{platform.name}</p>
                        {platform.followers && (
                          <p className="text-sm text-muted-foreground">
                            {platform.followers} followers
                          </p>
                        )}
                      </Flex>
                    </Link>
                  ))}
                </div>

                {/* Optional follow all button */}
                {brand.tagline && (
                  <Button size="lg" className="mt-4">
                    {brand.tagline}
                  </Button>
                )}
              </Flex>
            </div>

            <Separator />

            {/* Bottom section */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand and copyright */}
              <Flex direction="column" gap={3}>
                <p className="font-semibold">{brand.name}</p>
                <p className="text-sm text-muted-foreground">
                  {copyrightText}
                </p>
              </Flex>

              {/* Quick links */}
              {quickLinks && quickLinks.length > 0 && (
                <nav aria-label="Quick links">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {quickLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </Flex>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterSocial component
 */
export const footerSocialSchema = {
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
          description: "Brand tagline",
        },
      },
      required: ["name"],
      description: "Brand information",
    },
    socialPlatforms: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Platform name",
          },
          href: {
            type: "string",
            description: "Platform URL",
          },
          followers: {
            type: "string",
            description: "Follower count",
          },
          colorClass: {
            type: "string",
            description: "Platform-specific color class",
          },
        },
        required: ["name", "href"],
      },
      description: "Social media platforms",
      minItems: 1,
    },
    socialCta: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "CTA title",
        },
        description: {
          type: "string",
          description: "CTA description",
        },
      },
      required: ["title", "description"],
      description: "Call to action for social following",
    },
    quickLinks: {
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
        },
        required: ["text", "href"],
      },
      description: "Quick navigation links",
    },
    copyright: {
      type: "string",
      description: "Copyright text",
    },
  },
  required: ["brand", "socialPlatforms"],
};