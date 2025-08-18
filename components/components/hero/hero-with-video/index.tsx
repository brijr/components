import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export interface HeroWithVideoProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  videoCTA?: {
    text: string;
    videoUrl: string;
  };
  backgroundVideo?: {
    src: string;
    poster?: string;
  };
}

export const HeroWithVideo = ({
  headline,
  subheadline,
  primaryCTA,
  videoCTA,
  backgroundVideo,
}: HeroWithVideoProps) => {
  return (
    <Section className="relative overflow-hidden">
      {backgroundVideo && (
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={backgroundVideo.poster}
            className="h-full w-full object-cover"
          >
            <source src={backgroundVideo.src} type="video/mp4" />
          </video>
          <div className="bg-background/80 absolute inset-0" />
        </div>
      )}

      <Container>
        <Flex direction="column" align="center" gap={6} className="text-center">
          <Header as="h1">{headline}</Header>

          {subheadline && (
            <p className="text-muted-foreground max-w-2xl text-xl">
              {subheadline}
            </p>
          )}

          {(primaryCTA || videoCTA) && (
            <Flex gap={4} className="mt-2 flex-col sm:flex-row">
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
                </Button>
              )}
              {videoCTA && (
                <Button size="lg" variant="outline" asChild className="group">
                  <a
                    href={videoCTA.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlayCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    {videoCTA.text}
                  </a>
                </Button>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
};
