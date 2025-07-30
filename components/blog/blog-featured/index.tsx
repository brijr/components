import * as React from "react";
import {
  Section,
  Container,
  Stack,
  Heading,
  Text,
} from "@/components/ds";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";

/**
 * Featured blog post
 */
export interface FeaturedPost {
  /** Post title */
  title: string;
  /** Post excerpt */
  excerpt: string;
  /** Featured image */
  image: {
    src: string;
    alt: string;
  };
  /** Post category */
  category: string;
  /** Author info */
  author: {
    name: string;
    avatar?: string;
  };
  /** Publication date */
  date: string;
  /** Reading time */
  readingTime: number;
  /** Post URL */
  href: string;
  /** CTA text */
  ctaText?: string;
}

/**
 * Secondary blog post
 */
export interface SecondaryPost {
  /** Post ID */
  id: string;
  /** Post title */
  title: string;
  /** Post excerpt */
  excerpt: string;
  /** Post category */
  category: string;
  /** Publication date */
  date: string;
  /** Post URL */
  href: string;
}

/**
 * Props for the BlogFeatured component
 */
export interface BlogFeaturedProps {
  /** Section headline */
  headline: string;
  /** Section description */
  description?: string;
  /** Featured post */
  featuredPost: FeaturedPost;
  /** Secondary posts */
  secondaryPosts?: SecondaryPost[];
  /** Show trending indicator */
  showTrending?: boolean;
  /** View all link */
  viewAllLink?: {
    text: string;
    href: string;
  };
}

/**
 * Blog section with featured post and secondary posts.
 * Highlights your most important content prominently.
 *
 * @example
 * ```tsx
 * <BlogFeatured
 *   headline="Featured Stories"
 *   description="Our top picks this week"
 *   featuredPost={{
 *     title: "The Future of AI in Healthcare",
 *     excerpt: "Exploring how artificial intelligence is revolutionizing patient care, diagnosis, and treatment planning in modern healthcare.",
 *     image: {
 *       src: "/featured-blog.jpg",
 *       alt: "AI in healthcare"
 *     },
 *     category: "Innovation",
 *     author: {
 *       name: "Dr. Sarah Chen",
 *       avatar: "/avatar-sarah.jpg"
 *     },
 *     date: "2024-01-25",
 *     readingTime: 10,
 *     href: "/blog/ai-healthcare",
 *     ctaText: "Read the full story"
 *   }}
 *   secondaryPosts={[
 *     {
 *       id: "1",
 *       title: "5 Ways to Improve Patient Engagement",
 *       excerpt: "Practical strategies for healthcare providers.",
 *       category: "Best Practices",
 *       date: "2024-01-23",
 *       href: "/blog/patient-engagement"
 *     },
 *     {
 *       id: "2",
 *       title: "Telemedicine Trends for 2024",
 *       excerpt: "What's next in remote healthcare delivery.",
 *       category: "Trends",
 *       date: "2024-01-22",
 *       href: "/blog/telemedicine-trends"
 *     }
 *   ]}
 *   showTrending
 *   viewAllLink={{
 *     text: "View all articles",
 *     href: "/blog"
 *   }}
 * />
 * ```
 */
export const BlogFeatured = ({
  headline,
  description,
  featuredPost,
  secondaryPosts,
  showTrending = false,
  viewAllLink,
}: BlogFeaturedProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Section>
      <Container>
        <Stack spacing="2xl">
          {/* Header */}
          <Stack spacing="md">
            <div className="flex items-center justify-between">
              <div>
                <Heading level={2}>{headline}</Heading>
                {description && (
                  <Text variant="lead" color="muted" className="mt-2">
                    {description}
                  </Text>
                )}
              </div>
              {viewAllLink && (
                <Button variant="ghost" asChild>
                  <a href={viewAllLink.href}>{viewAllLink.text}</a>
                </Button>
              )}
            </div>
          </Stack>

          {/* Content */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Featured post */}
            <div className="lg:col-span-8">
              <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={featuredPost.image.src}
                    alt={featuredPost.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-background/90 backdrop-blur-sm">
                      {featuredPost.category}
                    </Badge>
                    {showTrending && (
                      <Badge variant="destructive" className="bg-destructive/90 backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 lg:p-8">
                  <Stack spacing="md">
                    <Stack spacing="sm">
                      <Heading level={3} className="text-2xl lg:text-3xl group-hover:text-primary transition-colors">
                        <a href={featuredPost.href} className="hover:underline">
                          {featuredPost.title}
                        </a>
                      </Heading>
                      <Text variant="lead" color="muted" className="line-clamp-3">
                        {featuredPost.excerpt}
                      </Text>
                    </Stack>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {featuredPost.author.avatar && (
                            <Image
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          )}
                          <span className="font-medium">{featuredPost.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(featuredPost.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{featuredPost.readingTime} min</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={featuredPost.href}>
                          {featuredPost.ctaText || "Read more"}
                        </a>
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </div>

            {/* Secondary posts */}
            {secondaryPosts && secondaryPosts.length > 0 && (
              <div className="lg:col-span-4">
                <Stack spacing="md" className="h-full">
                  {secondaryPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-md transition-shadow flex-1">
                      <CardContent className="p-4">
                        <Stack spacing="sm">
                          <Badge variant="secondary" className="w-fit">
                            {post.category}
                          </Badge>
                          <Heading level={4} className="group-hover:text-primary transition-colors">
                            <a href={post.href} className="hover:underline">
                              {post.title}
                            </a>
                          </Heading>
                          <Text variant="small" color="muted" className="line-clamp-2">
                            {post.excerpt}
                          </Text>
                          <Text variant="small" color="muted">
                            {formatDate(post.date)}
                          </Text>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for BlogFeatured component
 */
export const blogFeaturedSchema = {
  type: "object",
  properties: {
    headline: {
      type: "string",
      description: "Section headline",
    },
    description: {
      type: "string",
      description: "Section description",
    },
    featuredPost: {
      type: "object",
      properties: {
        title: { type: "string" },
        excerpt: { type: "string" },
        image: {
          type: "object",
          properties: {
            src: { type: "string" },
            alt: { type: "string" },
          },
          required: ["src", "alt"],
        },
        category: { type: "string" },
        author: {
          type: "object",
          properties: {
            name: { type: "string" },
            avatar: { type: "string" },
          },
          required: ["name"],
        },
        date: { type: "string", format: "date" },
        readingTime: { type: "number" },
        href: { type: "string" },
        ctaText: { type: "string" },
      },
      required: ["title", "excerpt", "image", "category", "author", "date", "readingTime", "href"],
      description: "Featured post",
    },
    secondaryPosts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          excerpt: { type: "string" },
          category: { type: "string" },
          date: { type: "string", format: "date" },
          href: { type: "string" },
        },
        required: ["id", "title", "excerpt", "category", "date", "href"],
      },
      description: "Secondary posts",
    },
    showTrending: {
      type: "boolean",
      description: "Show trending indicator",
      default: false,
    },
    viewAllLink: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "View all link",
    },
  },
  required: ["headline", "featuredPost"],
};