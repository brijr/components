"use client";

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
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

/**
 * Mega menu column configuration
 */
export interface MegaMenuColumn {
  /** Column title */
  title: string;
  /** Column description (optional) */
  description?: string;
  /** Column links */
  links: Array<{
    /** Link text */
    text: string;
    /** Link URL */
    href: string;
    /** Link description (optional) */
    description?: string;
    /** Link icon (optional) */
    icon?: React.ReactNode;
    /** Badge text (optional) */
    badge?: string;
  }>;
}

/**
 * Featured content item
 */
export interface FeaturedItem {
  /** Item title */
  title: string;
  /** Item description */
  description: string;
  /** Item URL */
  href: string;
  /** Item image (optional) */
  image?: string;
  /** Item badge (optional) */
  badge?: string;
}

/**
 * Props for the FooterMega component
 */
export interface FooterMegaProps {
  /** Brand section */
  brand: {
    /** Company name */
    name: string;
    /** Company description */
    description?: string;
    /** Company logo (optional) */
    logo?: React.ReactNode;
  };
  /** Mega menu columns */
  columns: MegaMenuColumn[];
  /** Featured section (optional) */
  featured?: {
    /** Section title */
    title: string;
    /** Featured items */
    items: FeaturedItem[];
  };
  /** Search configuration (optional) */
  search?: {
    /** Search placeholder */
    placeholder: string;
    /** Search button text */
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
 * Mega menu style footer with detailed navigation and featured content.
 * Perfect for large sites with extensive content hierarchies.
 *
 * @example
 * ```tsx
 * <FooterMega
 *   brand={{
 *     name: "Enterprise Co",
 *     description: "Leading the digital transformation"
 *   }}
 *   columns={[
 *     {
 *       title: "Products",
 *       description: "Everything you need to succeed",
 *       links: [
 *         {
 *           text: "Analytics Platform",
 *           href: "/products/analytics",
 *           description: "Real-time insights",
 *           icon: <BarChart className="w-4 h-4" />,
 *           badge: "Popular"
 *         },
 *         {
 *           text: "Cloud Infrastructure",
 *           href: "/products/cloud",
 *           description: "Scalable solutions",
 *           icon: <Cloud className="w-4 h-4" />
 *         },
 *         {
 *           text: "Security Suite",
 *           href: "/products/security",
 *           description: "Enterprise protection",
 *           icon: <Shield className="w-4 h-4" />,
 *           badge: "New"
 *         }
 *       ]
 *     },
 *     {
 *       title: "Solutions",
 *       links: [
 *         {
 *           text: "For Startups",
 *           href: "/solutions/startups",
 *           description: "Grow faster"
 *         },
 *         {
 *           text: "For Enterprise",
 *           href: "/solutions/enterprise",
 *           description: "Scale with confidence"
 *         },
 *         {
 *           text: "For Developers",
 *           href: "/solutions/developers",
 *           description: "Build better"
 *         }
 *       ]
 *     },
 *     {
 *       title: "Resources",
 *       links: [
 *         { text: "Documentation", href: "/docs" },
 *         { text: "API Reference", href: "/api" },
 *         { text: "Guides", href: "/guides" },
 *         { text: "Blog", href: "/blog" },
 *         { text: "Community", href: "/community" }
 *       ]
 *     },
 *     {
 *       title: "Company",
 *       links: [
 *         { text: "About Us", href: "/about" },
 *         { text: "Careers", href: "/careers", badge: "Hiring" },
 *         { text: "Press", href: "/press" },
 *         { text: "Partners", href: "/partners" },
 *         { text: "Contact", href: "/contact" }
 *       ]
 *     }
 *   ]}
 *   featured={{
 *     title: "What's New",
 *     items: [
 *       {
 *         title: "2024 Product Roadmap",
 *         description: "See what we're building next",
 *         href: "/blog/2024-roadmap",
 *         badge: "Featured"
 *       },
 *       {
 *         title: "Enterprise Security Guide",
 *         description: "Best practices for your team",
 *         href: "/guides/security"
 *       }
 *     ]
 *   }}
 *   search={{
 *     placeholder: "Search documentation...",
 *     buttonText: "Search"
 *   }}
 *   bottom={{
 *     copyright: "All rights reserved.",
 *     links: [
 *       { text: "Privacy", href: "/privacy" },
 *       { text: "Terms", href: "/terms" },
 *       { text: "Cookies", href: "/cookies" }
 *     ]
 *   }}
 * />
 * ```
 */
export const FooterMega = ({
  brand,
  columns,
  featured,
  search,
  bottom,
}: FooterMegaProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const currentYear = new Date().getFullYear();
  const copyrightText = bottom.copyright?.includes(currentYear.toString())
    ? bottom.copyright
    : `© ${currentYear} ${brand.name}. ${bottom.copyright || "All rights reserved."}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log("Search:", searchQuery);
  };

  return (
    <footer>
      <Section className="border-t bg-muted/20">
        <Container>
          <Stack spacing="xl">
            {/* Top section with brand and search */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Brand */}
              <Stack spacing="sm" className="max-w-sm">
                <div className="flex items-center gap-2">
                  {brand.logo}
                  <Text className="font-semibold text-lg">{brand.name}</Text>
                </div>
                {brand.description && (
                  <Text variant="small" subdued>
                    {brand.description}
                  </Text>
                )}
              </Stack>

              {/* Search */}
              {search && (
                <form onSubmit={handleSearch} className="w-full max-w-sm">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder={search.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button type="submit">{search.buttonText}</Button>
                  </div>
                </form>
              )}
            </div>

            <Separator />

            {/* Main navigation grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {/* Navigation columns */}
              {columns.map((column, index) => (
                <div key={index}>
                  <Stack spacing="md">
                    <Stack spacing="sm" compact>
                      <Heading size={4}>{column.title}</Heading>
                      {column.description && (
                        <Text variant="small" subdued>
                          {column.description}
                        </Text>
                      )}
                    </Stack>
                    <ul className="space-y-3">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.icon && (
                              <span className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                                {link.icon}
                              </span>
                            )}
                            <Stack spacing="sm" compact>
                              <div className="flex items-center gap-2">
                                <span className="group-hover:text-foreground transition-colors">
                                  {link.text}
                                </span>
                                {link.badge && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                    {link.badge}
                                  </Badge>
                                )}
                              </div>
                              {link.description && (
                                <Text variant="small" subdued>
                                  {link.description}
                                </Text>
                              )}
                            </Stack>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </div>
              ))}

              {/* Featured section */}
              {featured && (
                <div className="sm:col-span-2 lg:col-span-1">
                  <Stack spacing="md">
                    <Heading size={4}>{featured.title}</Heading>
                    <Stack spacing="md">
                      {featured.items.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="group block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <Stack spacing="sm" compact>
                            <div className="flex items-start justify-between gap-2">
                              <Text className="font-medium group-hover:text-primary transition-colors">
                                {item.title}
                              </Text>
                              {item.badge && (
                                <Badge variant="default" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <Text variant="small" subdued>
                              {item.description}
                            </Text>
                          </Stack>
                        </a>
                      ))}
                    </Stack>
                  </Stack>
                </div>
              )}
            </div>

            <Separator />

            {/* Bottom section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Copyright and legal */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Text variant="small" subdued>
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
 * JSON Schema for FooterMega component
 */
export const footerMegaSchema = {
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
          description: "Company description",
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
          description: {
            type: "string",
            description: "Column description",
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
                description: {
                  type: "string",
                  description: "Link description",
                },
                badge: {
                  type: "string",
                  description: "Badge text",
                },
              },
              required: ["text", "href"],
            },
            minItems: 1,
          },
        },
        required: ["title", "links"],
      },
      description: "Mega menu columns",
      minItems: 1,
    },
    featured: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Section title",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Item title",
              },
              description: {
                type: "string",
                description: "Item description",
              },
              href: {
                type: "string",
                description: "Item URL",
              },
              badge: {
                type: "string",
                description: "Item badge",
              },
            },
            required: ["title", "description", "href"],
          },
          minItems: 1,
        },
      },
      required: ["title", "items"],
      description: "Featured section",
    },
    search: {
      type: "object",
      properties: {
        placeholder: {
          type: "string",
          description: "Search placeholder",
        },
        buttonText: {
          type: "string",
          description: "Search button text",
        },
      },
      required: ["placeholder", "buttonText"],
      description: "Search configuration",
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
              text: {
                type: "string",
              },
              href: {
                type: "string",
              },
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
              platform: {
                type: "string",
              },
              href: {
                type: "string",
              },
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