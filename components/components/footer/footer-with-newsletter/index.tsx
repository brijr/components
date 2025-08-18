"use client";

import Link from "next/link";
import { Section, Container, Flex, Grid, Header } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";
import { useState } from "react";

export interface FooterWithNewsletterProps {
  newsletter: {
    headline: string;
    description: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
  };
  socialLinks?: Array<{
    platform: keyof typeof Icons;
    href: string;
    label: string;
  }>;
  quickLinks?: Array<{
    title: string;
    links: Array<{
      text: string;
      href: string;
    }>;
  }>;
  trustIndicator?: {
    quote: string;
    author: string;
    role?: string;
  };
  copyright: string;
  legalLinks?: Array<{
    text: string;
    href: string;
  }>;
}

export const FooterWithNewsletter = ({
  newsletter,
  socialLinks,
  quickLinks,
  trustIndicator,
  copyright,
  legalLinks,
}: FooterWithNewsletterProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <Section className="border-t bg-muted/20">
      <Container>
        <Grid columns={quickLinks && quickLinks.length > 0 ? 2 : 1}>
          <div>
            <Header as="h3" className="mb-3">
              {newsletter.headline}
            </Header>
            <p className="text-muted-foreground mb-4">
              {newsletter.description}
            </p>
            
            <form onSubmit={handleSubmit} className="mb-6">
              <Flex gap={2} className="max-w-md">
                <Input
                  type="email"
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">{newsletter.buttonText}</Button>
              </Flex>
              {isSubmitted && (
                <p className="text-sm text-green-600 mt-2">
                  {newsletter.successMessage}
                </p>
              )}
            </form>

            {trustIndicator && (
              <blockquote className="border-l-2 border-primary pl-4 italic text-sm text-muted-foreground mb-6">
                &ldquo;{trustIndicator.quote}&rdquo;
                <footer className="mt-2 not-italic">
                  — {trustIndicator.author}
                  {trustIndicator.role && `, ${trustIndicator.role}`}
                </footer>
              </blockquote>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <Flex gap={3} className="mb-6">
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
          </div>

          {quickLinks && quickLinks.length > 0 && (
            <Grid columns={Math.min(quickLinks.length, 4) as 1 | 2 | 3 | 4} className="gap-8">
              {quickLinks.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Grid>
          )}
        </Grid>

        <div className="border-t mt-8 pt-6">
          <Flex
            justify="between"
            align="center"
            className="flex-col gap-4 sm:flex-row"
          >
            <p className="text-sm text-muted-foreground">{copyright}</p>
            {legalLinks && legalLinks.length > 0 && (
              <Flex gap={6}>
                {legalLinks.map((link, index) => (
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
      </Container>
    </Section>
  );
};