"use client";

import * as React from "react";
import Link from "next/link";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

/**
 * Searchable FAQ item
 */
export interface SearchableFAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Category for grouping */
  category?: string;
  /** Tags for improved search */
  tags?: string[];
  /** Whether this is a popular/featured question */
  popular?: boolean;
}

/**
 * Props for the FAQSearch component
 */
export interface FAQSearchProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of FAQ items */
  items: SearchableFAQItem[];
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Show category badges */
  showCategories?: boolean;
  /** Show popular badge */
  showPopularBadge?: boolean;
  /** Number of items to show initially */
  initialItemsCount?: number;
  /** No results message */
  noResultsMessage?: string;
  /** Optional CTA when no results */
  noResultsCTA?: {
    text: string;
    href: string;
  };
}

/**
 * Searchable FAQs with real-time filtering and highlighting.
 * Ideal for large FAQ databases with instant search.
 *
 * @example
 * ```tsx
 * <FAQSearch
 *   headline="Search our knowledge base"
 *   subheadline="Type your question to find instant answers"
 *   items={[
 *     {
 *       question: "How do I reset my password?",
 *       answer: "Click 'Forgot Password' on the login page...",
 *       category: "Account",
 *       tags: ["password", "reset", "login", "account"],
 *       popular: true
 *     }
 *   ]}
 *   searchPlaceholder="Type your question..."
 *   showCategories
 *   showPopularBadge
 *   initialItemsCount={5}
 *   noResultsMessage="No matching questions found"
 *   noResultsCTA={{ text: "Contact Support", href: "/support" }}
 * />
 * ```
 */
export const FAQSearch = ({
  headline,
  subheadline,
  items,
  searchPlaceholder = "Search for answers...",
  showCategories = true,
  showPopularBadge = true,
  initialItemsCount = 10,
  noResultsMessage = "No matching questions found.",
  noResultsCTA,
}: FAQSearchProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showAll, setShowAll] = React.useState(false);

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      // Search in question, answer, category, and tags
      const searchableText = [
        item.question,
        item.answer,
        item.category || "",
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [items, searchQuery]);

  // Determine which items to display
  const displayedItems = showAll || searchQuery
    ? filteredItems
    : filteredItems.slice(0, initialItemsCount);

  const hasMoreItems = !searchQuery && !showAll && filteredItems.length > initialItemsCount;

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {/* Header */}
          <Flex direction="column" gap={4} className="text-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground text-center">
              {filteredItems.length === 0
                ? noResultsMessage
                : `Found ${filteredItems.length} ${
                    filteredItems.length === 1 ? "result" : "results"
                  }`}
            </p>
          )}

          {/* FAQ Items */}
          {displayedItems.length > 0 ? (
            <div className="max-w-4xl mx-auto w-full">
              <Accordion type="single" collapsible className="w-full">
                {displayedItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start gap-2 flex-1">
                        <span className="flex-1">
                          {searchQuery
                            ? highlightText(item.question, searchQuery)
                            : item.question}
                        </span>
                        <div className="flex items-center gap-2 ml-2">
                          {showCategories && item.category && (
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          )}
                          {showPopularBadge && item.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? highlightText(item.answer, searchQuery)
                          : item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Show More Button */}
              {hasMoreItems && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll(true)}
                  >
                    Show All {filteredItems.length} Questions
                  </Button>
                </div>
              )}
            </div>
          ) : (
            searchQuery && (
              <Flex direction="column" gap={4} className="text-center max-w-md mx-auto text-center">
                <p className="text-muted-foreground">{noResultsMessage}</p>
                {noResultsCTA && (
                  <Button asChild>
                    <Link href={noResultsCTA.href}>{noResultsCTA.text}</Link>
                  </Button>
                )}
              </Flex>
            )
          )}
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for FAQSearch component
 */
export const faqSearchSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    subheadline: {
      type: "string",
      description: "Optional subheadline",
    },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Question text",
          },
          answer: {
            type: "string",
            description: "Answer text",
          },
          category: {
            type: "string",
            description: "Category for grouping",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Tags for improved search",
          },
          popular: {
            type: "boolean",
            description: "Whether this is a popular question",
            default: false,
          },
        },
        required: ["question", "answer"],
      },
      description: "Array of FAQ items",
      minItems: 1,
    },
    searchPlaceholder: {
      type: "string",
      description: "Placeholder text for search input",
      default: "Search for answers...",
    },
    showCategories: {
      type: "boolean",
      description: "Show category badges",
      default: true,
    },
    showPopularBadge: {
      type: "boolean",
      description: "Show popular badge",
      default: true,
    },
    initialItemsCount: {
      type: "number",
      description: "Number of items to show initially",
      default: 10,
    },
    noResultsMessage: {
      type: "string",
      description: "No results message",
      default: "No matching questions found.",
    },
    noResultsCTA: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Optional CTA when no results",
    },
  },
  required: ["headline", "items"],
};