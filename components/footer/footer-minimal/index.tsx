import * as React from "react";
import {
  Section,
  Container,
  Text,
} from "@/components/ds";

/**
 * Props for the FooterMinimal component
 */
export interface FooterMinimalProps {
  /** Copyright text or company name */
  text: string;
  /** Optional links */
  links?: Array<{
    text: string;
    href: string;
  }>;
  /** Alignment */
  align?: "left" | "center" | "right";
}

/**
 * Minimal footer with just copyright and essential links.
 * Perfect for landing pages and simple sites.
 *
 * @example
 * ```tsx
 * <FooterMinimal
 *   text="© 2024 Acme Inc."
 *   links={[
 *     { text: "Privacy", href: "/privacy" },
 *     { text: "Terms", href: "/terms" }
 *   ]}
 *   align="center"
 * />
 * ```
 */
export const FooterMinimal = ({
  text,
  links,
  align = "center",
}: FooterMinimalProps) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <footer>
      <Section className="border-t">
        <Container>
          <div className={`flex flex-col gap-4 ${textAlignClasses[align]} sm:flex-row sm:items-center sm:${alignmentClasses[align]}`}>
            <Text variant="small" color="muted">
              {text}
            </Text>
            
            {links && links.length > 0 && (
              <nav aria-label="Footer navigation" className={`flex gap-4 ${alignmentClasses[align]}`}>
                {links.map((link, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <span className="text-muted-foreground" aria-hidden="true">
                        ·
                      </span>
                    )}
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </a>
                  </React.Fragment>
                ))}
              </nav>
            )}
          </div>
        </Container>
      </Section>
    </footer>
  );
};

/**
 * JSON Schema for FooterMinimal component
 */
export const footerMinimalSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      description: "Copyright text or company name",
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
      description: "Optional links",
    },
    align: {
      type: "string",
      enum: ["left", "center", "right"],
      description: "Alignment",
      default: "center",
    },
  },
  required: ["text"],
};