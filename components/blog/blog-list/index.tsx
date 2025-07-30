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
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Image from "next/image";

/**
 * Blog post data for list view
 */
export interface BlogListPost {
  /** Post ID */
  id: string;
  /** Post title */
  title: string;
  /** Post excerpt */
  excerpt: string;
  /** Thumbnail image */
  thumbnail?: {
    src: string;
    alt: string;
  };
  /** Post categories */
  categories: string[];
  /** Author information */
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  /** Publication date */
  date: string;
  /** Reading time in minutes */
  readingTime: number;
  /** Post URL */
  href: string;
  /** Featured post */
  featured?: boolean;
}

/**
 * Props for the BlogList component
 */
export interface BlogListProps {
  /** Section headline */
  headline: string;
  /** Section description */
  description?: string;
  /** Blog posts */
  posts: BlogListPost[];
  /** Show thumbnails */
  showThumbnails?: boolean;
  /** Show author avatars */
  showAvatars?: boolean;
  /** Pagination configuration */
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
  };
  /** Load more configuration */
  loadMore?: {
    text: string;
    onClick: () => void;
    loading?: boolean;
  };
}

/**
 * Blog posts in a vertical list layout.
 * Ideal for blog archives and detailed post listings.
 *
 * @example
 * ```tsx
 * <BlogList
 *   headline="All Posts"
 *   description="Browse through our entire collection of articles"
 *   posts={[
 *     {
 *       id: "1",
 *       title: "Understanding Modern Web Architecture",
 *       excerpt: "A deep dive into microservices, serverless, and edge computing in modern web applications.",
 *       thumbnail: {
 *         src: "/blog-thumb-1.jpg",
 *         alt: "Web architecture diagram"
 *       },
 *       categories: ["Architecture", "Development"],
 *       author: {
 *         name: "David Kim",
 *         role: "Senior Engineer",
 *         avatar: "/avatar-david.jpg"
 *       },
 *       date: "2024-01-15",
 *       readingTime: 8,
 *       href: "/blog/modern-web-architecture",
 *       featured: true
 *     }
 *   ]}
 *   showThumbnails
 *   showAvatars
 *   loadMore={{
 *     text: "Load more posts",
 *     onClick: () => console.log("Load more")
 *   }}
 * />
 * ```
 */
export const BlogList = ({
  headline,
  description,
  posts,
  showThumbnails = true,
  showAvatars = false,
  pagination,
  loadMore,
}: BlogListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
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
            <Heading level={2}>{headline}</Heading>
            {description && (
              <Text variant="lead" color="muted" className="max-w-3xl">
                {description}
              </Text>
            )}
          </Stack>

          {/* Posts list */}
          <Stack spacing="lg">
            {posts.map((post, index) => (
              <React.Fragment key={post.id}>
                <article>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className={`flex gap-6 ${showThumbnails && post.thumbnail ? "" : "p-6"}}`}>
                        {/* Thumbnail */}
                        {showThumbnails && post.thumbnail && (
                          <div className="relative w-48 flex-shrink-0">
                            <Image
                              src={post.thumbnail.src}
                              alt={post.thumbnail.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className={`flex-1 ${showThumbnails && post.thumbnail ? "p-6" : ""}`}>
                          <Stack spacing="md">
                            {/* Categories and featured badge */}
                            <div className="flex items-center gap-2">
                              {post.featured && (
                                <Badge variant="default">Featured</Badge>
                              )}
                              {post.categories.map((category, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {category}
                                </Badge>
                              ))}
                            </div>

                            {/* Title and excerpt */}
                            <Stack spacing="sm">
                              <Heading level={3} className="hover:text-primary transition-colors">
                                <a href={post.href} className="hover:underline">
                                  {post.title}
                                </a>
                              </Heading>
                              <Text color="muted" className="line-clamp-2">
                                {post.excerpt}
                              </Text>
                            </Stack>

                            {/* Meta information */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              {/* Author */}
                              <div className="flex items-center gap-2">
                                {showAvatars && post.author.avatar ? (
                                  <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <User className="w-4 h-4" />
                                )}
                                <div>
                                  <span className="font-medium">{post.author.name}</span>
                                  {post.author.role && (
                                    <span className="text-xs block">{post.author.role}</span>
                                  )}
                                </div>
                              </div>

                              {/* Date */}
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.date)}</span>
                              </div>

                              {/* Reading time */}
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min read</span>
                              </div>
                            </div>
                          </Stack>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
                {index < posts.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </Stack>

          {/* Pagination or Load More */}
          {(pagination || loadMore) && (
            <div className="flex justify-center">
              {pagination && (
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={pagination.currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => pagination.onPageChange?.(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
              {loadMore && (
                <Button
                  variant="outline"
                  onClick={loadMore.onClick}
                  disabled={loadMore.loading}
                >
                  {loadMore.loading ? "Loading..." : loadMore.text}
                  {!loadMore.loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for BlogList component
 */
export const blogListSchema = {
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
    posts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          excerpt: { type: "string" },
          thumbnail: {
            type: "object",
            properties: {
              src: { type: "string" },
              alt: { type: "string" },
            },
            required: ["src", "alt"],
          },
          categories: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
          author: {
            type: "object",
            properties: {
              name: { type: "string" },
              role: { type: "string" },
              avatar: { type: "string" },
            },
            required: ["name"],
          },
          date: { type: "string", format: "date" },
          readingTime: { type: "number" },
          href: { type: "string" },
          featured: { type: "boolean" },
        },
        required: ["id", "title", "excerpt", "categories", "author", "date", "readingTime", "href"],
      },
      description: "Blog posts",
      minItems: 1,
    },
    showThumbnails: {
      type: "boolean",
      description: "Show thumbnails",
      default: true,
    },
    showAvatars: {
      type: "boolean",
      description: "Show author avatars",
      default: false,
    },
    pagination: {
      type: "object",
      properties: {
        currentPage: { type: "number" },
        totalPages: { type: "number" },
      },
      required: ["currentPage", "totalPages"],
      description: "Pagination configuration",
    },
    loadMore: {
      type: "object",
      properties: {
        text: { type: "string" },
        loading: { type: "boolean" },
      },
      required: ["text"],
      description: "Load more configuration",
    },
  },
  required: ["headline", "posts"],
};