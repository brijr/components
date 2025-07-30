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
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

/**
 * Blog post data structure
 */
export interface BlogPost {
  /** Post ID */
  id: string;
  /** Post title */
  title: string;
  /** Post excerpt/description */
  excerpt: string;
  /** Featured image */
  image: {
    src: string;
    alt: string;
  };
  /** Post category */
  category: string;
  /** Author information */
  author: {
    name: string;
    avatar?: string;
  };
  /** Publication date */
  date: string;
  /** Reading time in minutes */
  readingTime: number;
  /** Post URL */
  href: string;
}

/**
 * Props for the BlogGrid component
 */
export interface BlogGridProps {
  /** Section headline */
  headline: string;
  /** Section description */
  description?: string;
  /** Blog posts to display */
  posts: BlogPost[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Show author info */
  showAuthor?: boolean;
  /** Show reading time */
  showReadingTime?: boolean;
  /** Show view all link */
  viewAllLink?: {
    text: string;
    href: string;
  };
}

/**
 * Blog posts displayed in a responsive grid layout.
 * Perfect for blog indexes and article listings.
 *
 * @example
 * ```tsx
 * <BlogGrid
 *   headline="Latest from the blog"
 *   description="Insights, tutorials, and updates from our team"
 *   posts={[
 *     {
 *       id: "1",
 *       title: "Getting Started with React Server Components",
 *       excerpt: "Learn how to leverage the power of React Server Components in your Next.js applications.",
 *       image: {
 *         src: "/blog-1.jpg",
 *         alt: "React Server Components"
 *       },
 *       category: "Tutorial",
 *       author: {
 *         name: "Jane Smith",
 *         avatar: "/avatar-jane.jpg"
 *       },
 *       date: "2024-01-15",
 *       readingTime: 5,
 *       href: "/blog/react-server-components"
 *     }
 *   ]}
 *   columns={3}
 *   showAuthor
 *   showReadingTime
 *   viewAllLink={{
 *     text: "View all posts",
 *     href: "/blog"
 *   }}
 * />
 * ```
 */
export const BlogGrid = ({
  headline,
  description,
  posts,
  columns = 3,
  showAuthor = true,
  showReadingTime = true,
  viewAllLink,
}: BlogGridProps) => {
  const gridColumns = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

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
          <Stack spacing="md" align="center" className="text-center">
            <Heading level={2}>{headline}</Heading>
            {description && (
              <Text variant="lead" color="muted" className="max-w-2xl">
                {description}
              </Text>
            )}
          </Stack>

          {/* Posts grid */}
          <div className={`grid gap-6 ${gridColumns[columns]}`}>
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                {/* Post image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Stack spacing="md">
                    {/* Post content */}
                    <Stack spacing="sm">
                      <Heading level={3} className="line-clamp-2 group-hover:text-primary transition-colors">
                        <a href={post.href} className="hover:underline">
                          {post.title}
                        </a>
                      </Heading>
                      <Text color="muted" className="line-clamp-3">
                        {post.excerpt}
                      </Text>
                    </Stack>

                    {/* Post meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {showAuthor && (
                          <div className="flex items-center gap-2">
                            {post.author.avatar && (
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            )}
                            <span>{post.author.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                      {showReadingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime} min</span>
                        </div>
                      )}
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View all link */}
          {viewAllLink && (
            <div className="text-center">
              <Button variant="outline" asChild>
                <a href={viewAllLink.href}>
                  {viewAllLink.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for BlogGrid component
 */
export const blogGridSchema = {
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
        },
        required: ["id", "title", "excerpt", "image", "category", "author", "date", "readingTime", "href"],
      },
      description: "Blog posts to display",
      minItems: 1,
    },
    columns: {
      type: "number",
      enum: [2, 3, 4],
      description: "Number of columns",
      default: 3,
    },
    showAuthor: {
      type: "boolean",
      description: "Show author info",
      default: true,
    },
    showReadingTime: {
      type: "boolean",
      description: "Show reading time",
      default: true,
    },
    viewAllLink: {
      type: "object",
      properties: {
        text: { type: "string" },
        href: { type: "string" },
      },
      required: ["text", "href"],
      description: "Show view all link",
    },
  },
  required: ["headline", "posts"],
};