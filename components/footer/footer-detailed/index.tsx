import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Footer column configuration
 */
export interface FooterColumn {
  /** Column title */
  title: string;
  /** Column links */
  links: Array<{
    text: string;
    href: string;
    external?: boolean;
  }>;
}

/**
 * Props for the FooterDetailed component
 */
export interface FooterDetailedProps {
  /** Brand section */
  brand: {
    /** Company name */
    name: string;
    /** Tagline or description */
    description?: string;
    /** Logo element (optional) */
    logo?: React.ReactNode;
  };
  /** Footer columns */
  columns: FooterColumn[];
  /** Newsletter section */
  newsletter?: {
    /** Newsletter title */
    title: string;
    /** Newsletter description */
    description: string;
    /** Placeholder text */
    placeholder: string;
    /** Button text */
    buttonText: string;
  };
  /** Bottom section */
  bottom: {
    /** Copyright text */
    copyright?: string;
    /** Legal links */
    links?: Array<{
      text: string;
      href: string;
    }>;
    /** Social links */
    socialLinks?: Array<{
      platform: string;
      href: string;
      icon: React.ReactNode;
    }>;
  };
}

/**
 * Detailed footer with multiple columns, newsletter, and comprehensive links.
 * Perfect for larger sites with extensive navigation needs.
 *
 * @example
 * ```tsx
 * <FooterDetailed
 *   brand={{
 *     name: "Acme Inc",
 *     description: "Building the future of digital experiences"
 *   }}
 *   columns={[
 *     {
 *       title: "Product",
 *       links: [
 *         { text: "Features", href: "/features" },
 *         { text: "Pricing", href: "/pricing" },
 *         { text: "API", href: "/api" },
 *         { text: "Integrations", href: "/integrations" }
 *       ]
 *     },
 *     {
 *       title: "Company",
 *       links: [
 *         { text: "About", href: "/about" },
 *         { text: "Blog", href: "/blog" },
 *         { text: "Careers", href: "/careers" },
 *         { text: "Contact", href: "/contact" }
 *       ]
 *     },
 *     {
 *       title: "Resources",
 *       links: [
 *         { text: "Documentation", href: "/docs" },
 *         { text: "Help Center", href: "/help" },
 *         { text: "Community", href: "/community" },
 *         { text: "Status", href: "/status" }
 *       ]
 *     }
 *   ]}
 *   newsletter={{
 *     title: "Subscribe to our newsletter",
 *     description: "Get the latest updates and news",
 *     placeholder: "Enter your email",
 *     buttonText: "Subscribe"
 *   }}
 *   bottom={{
 *     copyright: "All rights reserved.",
 *     links: [
 *       { text: "Privacy Policy", href: "/privacy" },
 *       { text: "Terms of Service", href: "/terms" },
 *       { text: "Cookie Policy", href: "/cookies" }
 *     ],
 *     socialLinks: [
 *       {
 *         platform: "GitHub",
 *         href: "https://github.com",
 *         icon: <GitHubIcon className="w-5 h-5" />
 *       }
 *     ]
 *   }}
 * />
 * ```
 */
export const FooterDetailed = ({
  brand,
  columns,
  newsletter,
  bottom,
}: FooterDetailedProps) => {
  const [email, setEmail] = React.useState("");
  const currentYear = new Date().getFullYear();
  const copyrightText = bottom.copyright?.includes(currentYear.toString())
    ? bottom.copyright
    : `© ${currentYear} ${brand.name}. ${bottom.copyright || "All rights reserved."}`;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer>
      <Section className="border-t">
        <Container>
          <Stack spacing="2xl">
            {/* Main footer content */}
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Brand column */}
              <div className="lg:col-span-4">
                <Stack spacing="md">
                  <div className="flex items-center gap-2">
                    {brand.logo}
                    <Text className="font-semibold text-lg">{brand.name}</Text>
                  </div>
                  {brand.description && (
                    <Text color="muted" variant="small">
                      {brand.description}
                    </Text>
                  )}
                  
                  {/* Newsletter in brand column for mobile */}
                  {newsletter && (
                    <div className="mt-6 lg:hidden">
                      <Stack spacing="sm">
                        <Heading level={4}>{newsletter.title}</Heading>
                        <Text variant="small" color="muted">
                          {newsletter.description}
                        </Text>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                          <Input
                            type="email"
                            placeholder={newsletter.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1"
                          />
                          <Button type="submit">{newsletter.buttonText}</Button>
                        </form>
                      </Stack>
                    </div>
                  )}
                </Stack>
              </div>

              {/* Link columns */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
                {columns.map((column, index) => (
                  <div key={index}>
                    <Heading level={4} className="mb-3">
                      {column.title}
                    </Heading>
                    <ul className="space-y-2">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
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
                  </div>
                ))}
              </div>

              {/* Newsletter for desktop */}
              {newsletter && (
                <div className="hidden lg:block lg:col-span-2">
                  <Stack spacing="sm">
                    <Heading level={4}>{newsletter.title}</Heading>
                    <Text variant="small" color="muted">
                      {newsletter.description}
                    </Text>
                    <form onSubmit={handleNewsletterSubmit}>
                      <Stack spacing="sm">
                        <Input
                          type="email"
                          placeholder={newsletter.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Button type="submit" className="w-full">
                          {newsletter.buttonText}
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                </div>
              )}
            </div>

            <Separator />

            {/* Bottom section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Copyright and legal links */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Text variant="small" color="muted">
                  {copyrightText}
                </Text>
                {bottom.links && bottom.links.length > 0 && (
                  <nav aria-label="Legal links">
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {bottom.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>

              {/* Social links */}
              {bottom.socialLinks && bottom.socialLinks.length > 0 && (
                <nav aria-label="Social media links">
                  <ul className="flex gap-4">
                    {bottom.socialLinks.map((social, index) => (
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
          </Stack>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterDetailed component
 */
export const footerDetailedSchema = {
  type: "object",
  properties: {
    brand: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Company name",
        },
        description: {
          type: "string",
          description: "Tagline or description",
        },
      },
      required: ["name"],
      description: "Brand section",
    },
    columns: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Column title",
          },
          links: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                href: { type: "string" },
                external: { type: "boolean" },
              },
              required: ["text", "href"],
            },
            minItems: 1,
          },
        },
        required: ["title", "links"],
      },
      description: "Footer columns",
      minItems: 1,
    },
    newsletter: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        placeholder: { type: "string" },
        buttonText: { type: "string" },
      },
      required: ["title", "description", "placeholder", "buttonText"],
      description: "Newsletter section",
    },
    bottom: {
      type: "object",
      properties: {
        copyright: {
          type: "string",
          description: "Copyright text",
        },
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              text: { type: "string" },
              href: { type: "string" },
            },
            required: ["text", "href"],
          },
          description: "Legal links",
        },
        socialLinks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              platform: { type: "string" },
              href: { type: "string" },
            },
            required: ["platform", "href"],
          },
          description: "Social links",
        },
      },
      description: "Bottom section",
    },
  },
  required: ["brand", "columns", "bottom"],
};