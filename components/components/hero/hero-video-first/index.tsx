"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface HeroVideoFirstProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  video: {
    thumbnail: string;
    url: string;
    autoplay?: boolean;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export const HeroVideoFirst = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  video,
  stats,
}: HeroVideoFirstProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          <Flex direction="column" align="center" gap={6} className="text-center">
            <Header as="h1" className="max-w-4xl">
              {headline}
            </Header>
            {subheadline && (
              <p className="max-w-2xl text-xl text-muted-foreground">
                {subheadline}
              </p>
            )}
            <Flex gap={4}>
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </Flex>
          </Flex>

          <div className="relative mx-auto w-full max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              {video.autoplay ? (
                <video
                  src={video.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="relative h-full w-full cursor-pointer bg-cover bg-center"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110">
                        <svg
                          className="ml-1 h-8 w-8 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                    <DialogContent className="max-w-4xl p-0">
                      <div className="aspect-video">
                        <video
                          src={video.url}
                          controls
                          autoPlay
                          className="h-full w-full"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>

          {stats && stats.length > 0 && (
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};