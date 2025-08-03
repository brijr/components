import * as React from "react";
import Image from "next/image";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/**
 * App store configuration
 */
export interface AppStore {
  /** Store name */
  name: string;
  /** Download URL */
  href: string;
  /** Badge image URL or element */
  badge: string | React.ReactNode;
  /** Alt text for badge image */
  alt?: string;
}

/**
 * App feature item
 */
export interface AppFeature {
  /** Feature icon */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

/**
 * Props for the FooterApp component
 */
export interface FooterAppProps {
  /** App section */
  app: {
    /** App name */
    name: string;
    /** App tagline */
    tagline: string;
    /** App description */
    description: string;
    /** Rating info (optional) */
    rating?: {
      /** Average rating */
      score: number;
      /** Total reviews */
      reviews: string;
    };
    /** App features */
    features?: AppFeature[];
    /** App stores */
    stores: AppStore[];
    /** QR code configuration (optional) */
    qrCode?: {
      /** QR code image URL */
      src: string;
      /** Helper text */
      text: string;
    };
    /** App preview image (optional) */
    preview?: {
      /** Image URL */
      src: string;
      /** Alt text */
      alt: string;
    };
  };
  /** Company links */
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
  /** Copyright text */
  copyright?: string;
}

/**
 * App download focused footer with store badges and QR code.
 * Perfect for mobile apps and software products.
 *
 * @example
 * ```tsx
 * <FooterApp
 *   app={{
 *     name: "Acme App",
 *     tagline: "Your productivity companion",
 *     description: "Join millions using Acme to get more done every day.",
 *     rating: {
 *       score: 4.8,
 *       reviews: "50K+"
 *     },
 *     features: [
 *       {
 *         icon: <CloudSync className="w-5 h-5" />,
 *         title: "Sync Everywhere",
 *         description: "Access your data on all devices"
 *       },
 *       {
 *         icon: <Shield className="w-5 h-5" />,
 *         title: "Secure & Private",
 *         description: "End-to-end encryption"
 *       },
 *       {
 *         icon: <Zap className="w-5 h-5" />,
 *         title: "Lightning Fast",
 *         description: "Optimized for speed"
 *       }
 *     ],
 *     stores: [
 *       {
 *         name: "App Store",
 *         href: "https://apps.apple.com/app/acme",
 *         badge: "/app-store-badge.svg",
 *         alt: "Download on the App Store"
 *       },
 *       {
 *         name: "Google Play",
 *         href: "https://play.google.com/store/apps/details?id=com.acme",
 *         badge: "/google-play-badge.svg",
 *         alt: "Get it on Google Play"
 *       }
 *     ],
 *     qrCode: {
 *       src: "/app-qr-code.png",
 *       text: "Scan to download"
 *     },
 *     preview: {
 *       src: "/app-preview.png",
 *       alt: "Acme App Preview",
 *       width: 300,
 *       height: 600
 *     }
 *   }}
 *   links={[
 *     { text: "Features", href: "/features" },
 *     { text: "Pricing", href: "/pricing" },
 *     { text: "Support", href: "/support" },
 *     { text: "Privacy", href: "/privacy" }
 *   ]}
 * />
 * ```
 */
export const FooterApp = ({
  app,
  links,
  socialLinks,
  copyright,
}: FooterAppProps) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright?.includes(currentYear.toString())
    ? copyright
    : `© ${currentYear} ${app.name}. ${copyright || "All rights reserved."}`;

  return (
    <footer>
      <Section className="border-t bg-gradient-to-b from-background to-muted/20">
        <Container>
          <Stack spacing="xl">
            {/* App download section */}
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Content side */}
              <Stack spacing="lg">
                <Stack spacing="md">
                  <div className="flex items-center gap-3">
                    <Heading size={2}>{app.name}</Heading>
                    {app.rating && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {app.rating.score} ({app.rating.reviews})
                      </Badge>
                    )}
                  </div>
                  <Text variant="lead" subdued>
                    {app.tagline}
                  </Text>
                  <Text subdued>
                    {app.description}
                  </Text>
                </Stack>

                {/* Features grid */}
                {app.features && app.features.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {app.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 text-primary">
                          {feature.icon}
                        </div>
                        <Stack spacing="sm" compact>
                          <Text className="font-medium">{feature.title}</Text>
                          <Text variant="small" subdued>
                            {feature.description}
                          </Text>
                        </Stack>
                      </div>
                    ))}
                  </div>
                )}

                {/* Download section */}
                <Stack spacing="md">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {app.stores.map((store, index) => (
                      <a
                        key={index}
                        href={store.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:opacity-80 transition-opacity"
                        aria-label={`Download from ${store.name}`}
                      >
                        {typeof store.badge === "string" ? (
                          <div className="relative h-12 w-40">
                            <Image
                              src={store.badge}
                              alt={store.alt || `Download from ${store.name}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          store.badge
                        )}
                      </a>
                    ))}
                  </div>

                  {/* QR Code */}
                  {app.qrCode && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 max-w-fit">
                      <div className="relative w-20 h-20">
                        <Image
                          src={app.qrCode.src}
                          alt="QR Code"
                          fill
                          className="rounded object-contain"
                        />
                      </div>
                      <Stack spacing="sm" compact>
                        <Text variant="small" className="font-medium">
                          {app.qrCode.text}
                        </Text>
                        <Text variant="small" subdued>
                          Point your camera here
                        </Text>
                      </Stack>
                    </div>
                  )}
                </Stack>
              </Stack>

              {/* Preview side */}
              {app.preview && (
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[300px] lg:max-w-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5 blur-3xl" />
                    <div className="relative aspect-[9/16] w-full">
                      <Image
                        src={app.preview.src}
                        alt={app.preview.alt}
                        fill
                        className="rounded-2xl shadow-2xl object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Bottom section */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Links and copyright */}
              <Stack spacing="md">
                <nav aria-label="Footer navigation">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {links.map((link, index) => (
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
                <Text variant="small" subdued>
                  {copyrightText}
                </Text>
              </Stack>

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
          </Stack>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterApp component
 */
export const footerAppSchema = {
  type: "object",
  properties: {
    app: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "App name",
        },
        tagline: {
          type: "string",
          description: "App tagline",
        },
        description: {
          type: "string",
          description: "App description",
        },
        rating: {
          type: "object",
          properties: {
            score: {
              type: "number",
              description: "Average rating",
            },
            reviews: {
              type: "string",
              description: "Total reviews",
            },
          },
          required: ["score", "reviews"],
          description: "Rating information",
        },
        features: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Feature title",
              },
              description: {
                type: "string",
                description: "Feature description",
              },
            },
            required: ["title", "description"],
          },
          description: "App features",
        },
        stores: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Store name",
              },
              href: {
                type: "string",
                description: "Download URL",
              },
              badge: {
                type: "string",
                description: "Badge image URL",
              },
              alt: {
                type: "string",
                description: "Alt text for badge",
              },
            },
            required: ["name", "href", "badge"],
          },
          description: "App stores",
          minItems: 1,
        },
        qrCode: {
          type: "object",
          properties: {
            src: {
              type: "string",
              description: "QR code image URL",
            },
            text: {
              type: "string",
              description: "Helper text",
            },
          },
          required: ["src", "text"],
          description: "QR code configuration",
        },
        preview: {
          type: "object",
          properties: {
            src: {
              type: "string",
              description: "Preview image URL",
            },
            alt: {
              type: "string",
              description: "Alt text",
            },
          },
          required: ["src", "alt"],
          description: "App preview image",
        },
      },
      required: ["name", "tagline", "description", "stores"],
      description: "App section",
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
      description: "Company links",
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
    copyright: {
      type: "string",
      description: "Copyright text",
    },
  },
  required: ["app", "links"],
};