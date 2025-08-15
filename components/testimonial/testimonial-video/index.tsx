import * as React from "react";
import {
  Section,
  Container,
  Flex,
  Header,
} from "@/components/site/ds";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Quote } from "lucide-react";
import Image from "next/image";

/**
 * Video testimonial configuration
 */
export interface VideoTestimonial {
  /** Video thumbnail image */
  thumbnail: {
    src: string;
    alt: string;
  };
  /** Video URL */
  videoUrl: string;
  /** Customer quote (text preview) */
  quote?: string;
  /** Customer name */
  author: string;
  /** Customer role/title */
  role: string;
  /** Company name */
  company?: string;
  /** Video duration */
  duration?: string;
}

/**
 * Props for the TestimonialVideo component
 */
export interface TestimonialVideoProps {
  /** Section headline */
  headline: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Array of video testimonials */
  testimonials: VideoTestimonial[];
  /** Layout variant */
  layout?: "grid" | "featured";
}

/**
 * Video testimonials layout for powerful customer stories.
 * Perfect for showcasing in-depth customer experiences.
 *
 * @example
 * ```tsx
 * <TestimonialVideo
 *   headline="See what our customers say"
 *   subheadline="Real stories from real businesses"
 *   testimonials={[
 *     {
 *       thumbnail: {
 *         src: "/thumbnails/testimonial1.jpg",
 *         alt: "Customer testimonial"
 *       },
 *       videoUrl: "https://youtube.com/watch?v=...",
 *       quote: "This platform transformed our business...",
 *       author: "Jane Doe",
 *       role: "CEO",
 *       company: "TechCorp",
 *       duration: "2:34"
 *     },
 *     // ... more testimonials
 *   ]}
 *   layout="grid"
 * />
 * ```
 */
export const TestimonialVideo = ({
  headline,
  subheadline,
  testimonials,
  layout = "grid",
}: TestimonialVideoProps) => {
  const VideoCard = ({ testimonial, featured = false }: { testimonial: VideoTestimonial; featured?: boolean }) => (
    <Card className={`group cursor-pointer overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <div className="relative">
        <div className={`relative ${featured ? "aspect-video" : "aspect-video md:aspect-[4/3]"}`}>
          <Image
            src={testimonial.thumbnail.src}
            alt={testimonial.thumbnail.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size={featured ? "lg" : "default"}
              className="rounded-full w-16 h-16 p-0 bg-white/90 hover:bg-white text-black shadow-lg"
              asChild
            >
              <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </a>
            </Button>
          </div>

          {/* Duration */}
          {testimonial.duration && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
              {testimonial.duration}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <Flex gap={4}>
          {/* Quote Preview */}
          {testimonial.quote && (
            <blockquote className="relative">
              <Quote className="absolute -top-2 -left-2 w-6 h-6 text-muted-foreground/20" />
              <p className="relative line-clamp-2">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
          )}

          {/* Author */}
          <div>
            <div className="font-semibold">{testimonial.author}</div>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
          </div>
        </Flex>
      </CardContent>
    </Card>
  );

  if (layout === "featured" && testimonials.length > 0) {
    const [featured, ...rest] = testimonials;
    
    return (
      <Section>
        <Container>
          <Flex gap={10}>
            {/* Header */}
            <Flex gap={4} className="items-center max-w-3xl mx-auto">
              <Header as="h2" className="text-center">
                {headline}
              </Header>
              {subheadline && (
                <p className="text-xl text-center text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </Flex>

            {/* Featured Video */}
            <div className="max-w-4xl mx-auto w-full">
              <VideoCard testimonial={featured} featured />
            </div>

            {/* Additional Videos */}
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((testimonial, index) => (
                  <VideoCard key={index} testimonial={testimonial} />
                ))}
              </div>
            )}
          </Flex>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Flex gap={10}>
          {/* Header */}
          <Flex gap={4} className="items-center max-w-3xl mx-auto">
            <Header as="h2" className="text-center">
              {headline}
            </Header>
            {subheadline && (
              <p className="text-xl text-center text-muted-foreground">
                {subheadline}
              </p>
            )}
          </Flex>

          {/* Video Grid */}
          <div className={`grid gap-6 ${
            testimonials.length === 2 ? "md:grid-cols-2" : 
            testimonials.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : ""
          }`}>
            {testimonials.map((testimonial, index) => (
              <VideoCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

/**
 * JSON Schema for TestimonialVideo component
 */
export const testimonialVideoSchema = {
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
    testimonials: {
      type: "array",
      items: {
        type: "object",
        properties: {
          thumbnail: {
            type: "object",
            properties: {
              src: { type: "string" },
              alt: { type: "string" },
            },
            required: ["src", "alt"],
            description: "Video thumbnail image",
          },
          videoUrl: {
            type: "string",
            description: "Video URL",
          },
          quote: {
            type: "string",
            description: "Customer quote (text preview)",
          },
          author: {
            type: "string",
            description: "Customer name",
          },
          role: {
            type: "string",
            description: "Customer role/title",
          },
          company: {
            type: "string",
            description: "Company name",
          },
          duration: {
            type: "string",
            description: "Video duration",
          },
        },
        required: ["thumbnail", "videoUrl", "author", "role"],
      },
      description: "Array of video testimonials",
      minItems: 1,
    },
    layout: {
      type: "string",
      enum: ["grid", "featured"],
      description: "Layout variant",
      default: "grid",
    },
  },
  required: ["headline", "testimonials"],
};