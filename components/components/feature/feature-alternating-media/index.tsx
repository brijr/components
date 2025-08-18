import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface FeatureAlternatingMediaProps {
  headline?: string;
  subheadline?: string;
  features: Array<{
    title: string;
    description: string;
    media: {
      type: "image" | "video";
      src: string;
      alt?: string;
    };
    bullets?: string[];
    cta?: {
      text: string;
      href: string;
    };
  }>;
}

export const FeatureAlternatingMedia = ({
  headline,
  subheadline,
  features,
}: FeatureAlternatingMediaProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" gap={12}>
          {(headline || subheadline) && (
            <div className="text-center">
              {headline && (
                <Header as="h2" className="mb-3">
                  {headline}
                </Header>
              )}
              {subheadline && (
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          <Flex direction="column" gap={12}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid items-center gap-12 md:grid-cols-2 md:gap-8`}
              >
                <Flex
                  direction="column"
                  gap={4}
                  className={index % 2 === 0 ? "md:order-1" : "md:order-2"}
                >
                  <Header as="h3">{feature.title}</Header>
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.bullets && feature.bullets.length > 0 && (
                    <ul className="mt-2 space-y-2">
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start gap-2">
                          <svg
                            className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {feature.cta && (
                    <div className="pt-2">
                      <Button asChild>
                        <Link href={feature.cta.href}>{feature.cta.text}</Link>
                      </Button>
                    </div>
                  )}
                </Flex>
                <div
                  className={`relative ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {feature.media.type === "image" ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={feature.media.src}
                        alt={feature.media.alt || feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                      <video
                        src={feature.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};