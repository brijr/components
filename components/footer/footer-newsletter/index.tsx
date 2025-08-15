"use client";

import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

/**
 * Newsletter benefit item
 */
export interface NewsletterBenefit {
  /** Benefit text */
  text: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

/**
 * Props for the FooterNewsletter component
 */
export interface FooterNewsletterProps {
  /** Newsletter section */
  newsletter: {
    /** Badge text (optional) */
    badge?: string;
    /** Main title */
    title: string;
    /** Description */
    description: string;
    /** Benefits of subscribing */
    benefits?: NewsletterBenefit[];
    /** Form configuration */
    form: {
      /** Input placeholder */
      placeholder: string;
      /** Button text */
      buttonText: string;
      /** Helper text below form */
      helperText?: string;
    };
    /** Recent editions (optional) */
    recentEditions?: Array<{
      title: string;
      date: string;
      href: string;
    }>;
  };
  /** Company info */
  company: {
    /** Company name */
    name: string;
    /** Navigation links */
    links: Array<{
      text: string;
      href: string;
    }>;
    /** Social links (optional) */
    socialLinks?: Array<{
      platform: string;
      href: string;
      icon: React.ReactNode;
    }>;
  };
  /** Copyright text */
  copyright?: string;
}

/**
 * Newsletter-centric footer with prominent signup form and benefits.
 * Perfect for content-focused sites and publications.
 *
 * @example
 * ```tsx
 * <FooterNewsletter
 *   newsletter={{
 *     badge: "Join 50,000+ subscribers",
 *     title: "Get our weekly newsletter",
 *     description: "The latest news, articles, and resources, sent to your inbox weekly.",
 *     benefits: [
 *       { text: "Industry insights and trends" },
 *       { text: "Exclusive subscriber-only content" },
 *       { text: "Early access to new features" },
 *       { text: "Monthly prize draws" }
 *     ],
 *     form: {
 *       placeholder: "Enter your email",
 *       buttonText: "Subscribe",
 *       helperText: "We respect your privacy. Unsubscribe at any time."
 *     },
 *     recentEditions: [
 *       {
 *         title: "The Future of AI in Design",
 *         date: "Dec 15, 2023",
 *         href: "/newsletter/ai-design"
 *       },
 *       {
 *         title: "2024 Tech Predictions",
 *         date: "Dec 8, 2023",
 *         href: "/newsletter/tech-predictions"
 *       }
 *     ]
 *   }}
 *   company={{
 *     name: "TechNews",
 *     links: [
 *       { text: "About", href: "/about" },
 *       { text: "Archive", href: "/archive" },
 *       { text: "Advertise", href: "/advertise" },
 *       { text: "Contact", href: "/contact" }
 *     ]
 *   }}
 * />
 * ```
 */
export const FooterNewsletter = ({
  newsletter,
  company,
  copyright,
}: FooterNewsletterProps) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright?.includes(currentYear.toString())
    ? copyright
    : `© ${currentYear} ${company.name}. ${copyright || "All rights reserved."}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer>
      <Section className="border-t bg-gradient-to-b from-muted/30 to-background">
        <Container>
          <Flex direction="column" gap="xl">
            {/* Newsletter section */}
            <div className="mx-auto max-w-2xl text-center">
              <Flex direction="column" gap="lg" className="items-center">
                {newsletter.badge && (
                  <Badge variant="secondary" className="px-4 py-1">
                    {newsletter.badge}
                  </Badge>
                )}
                
                <Flex direction="column" gap="md" className="items-center">
                  <Header as="h2" className="text-center">
                    {newsletter.title}
                  </Header>
                  <p className="text-xl text-muted-foreground text-center">
                    {newsletter.description}
                  </p>
                </Flex>

                {/* Benefits list */}
                {newsletter.benefits && newsletter.benefits.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full max-w-md">
                    {newsletter.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {benefit.icon || (
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        )}
                        <p className="text-sm">{benefit.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Newsletter form */}
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <Flex direction="column" gap="sm">
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder={newsletter.form.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                        disabled={isSubmitted}
                      />
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitted}
                      >
                        {isSubmitted ? "Thanks!" : newsletter.form.buttonText}
                      </Button>
                    </div>
                    {newsletter.form.helperText && (
                      <p className="text-sm text-muted-foreground text-center">
                        {newsletter.form.helperText}
                      </p>
                    )}
                  </Flex>
                </form>

                {/* Recent editions */}
                {newsletter.recentEditions && newsletter.recentEditions.length > 0 && (
                  <div className="mt-6 w-full max-w-md">
                    <p className="text-sm font-medium mb-3">
                      Recent editions:
                    </p>
                    <Flex direction="column" gap="sm">
                      {newsletter.recentEditions.map((edition, index) => (
                        <Link
                          key={index}
                          href={edition.href}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                        >
                          <p className="text-sm group-hover:text-primary transition-colors">
                            {edition.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edition.date}
                          </p>
                        </Link>
                      ))}
                    </Flex>
                  </div>
                )}
              </Flex>
            </div>

            <Separator />

            {/* Bottom section */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Company info and links */}
              <Flex direction="column" gap="md">
                <p className="font-semibold">{company.name}</p>
                <nav aria-label="Footer navigation">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {company.links.map((link, index) => (
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
              </Flex>

              {/* Copyright and social */}
              <Flex direction="column" gap="sm" className="items-end">
                {company.socialLinks && company.socialLinks.length > 0 && (
                  <nav aria-label="Social media links">
                    <ul className="flex gap-4">
                      {company.socialLinks.map((social, index) => (
                        <li key={index}>
                          <Link
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Visit our ${social.platform} page`}
                          >
                            {social.icon}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <p className="text-sm text-muted-foreground">
                  {copyrightText}
                </p>
              </Flex>
            </div>
          </Flex>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterNewsletter component
 */
export const footerNewsletterSchema = {
  type: "object",
  properties: {
    newsletter: {
      type: "object",
      properties: {
        badge: {
          type: "string",
          description: "Badge text",
        },
        title: {
          type: "string",
          description: "Main title",
        },
        description: {
          type: "string",
          description: "Description",
        },
        benefits: {
          type: "array",
          items: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "Benefit text",
              },
            },
            required: ["text"],
          },
          description: "Benefits of subscribing",
        },
        form: {
          type: "object",
          properties: {
            placeholder: {
              type: "string",
              description: "Input placeholder",
            },
            buttonText: {
              type: "string",
              description: "Button text",
            },
            helperText: {
              type: "string",
              description: "Helper text below form",
            },
          },
          required: ["placeholder", "buttonText"],
          description: "Form configuration",
        },
        recentEditions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Edition title",
              },
              date: {
                type: "string",
                description: "Publication date",
              },
              href: {
                type: "string",
                description: "Edition URL",
              },
            },
            required: ["title", "date", "href"],
          },
          description: "Recent newsletter editions",
        },
      },
      required: ["title", "description", "form"],
      description: "Newsletter section",
    },
    company: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Company name",
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
          description: "Social media links",
        },
      },
      required: ["name", "links"],
      description: "Company information",
    },
    copyright: {
      type: "string",
      description: "Copyright text",
    },
  },
  required: ["newsletter", "company"],
};