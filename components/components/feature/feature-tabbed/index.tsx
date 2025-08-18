"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FeatureTabbedProps {
  headline: string;
  subheadline?: string;
  tabs: Array<{
    id: string;
    label: string;
    title: string;
    description: string;
    media?: {
      type: "image" | "video";
      src: string;
      alt?: string;
    };
    features?: string[];
    cta?: {
      text: string;
      href: string;
    };
  }>;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const FeatureTabbed = ({
  headline,
  subheadline,
  tabs,
  primaryCTA,
}: FeatureTabbedProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <Section>
      <Container>
        <Flex direction="column" gap={8}>
          <div className="text-center">
            <Header as="h2" className="mb-3">
              {headline}
            </Header>
            {subheadline && (
              <p className="mx-auto max-w-2xl text-muted-foreground">
                {subheadline}
              </p>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                  <Flex direction="column" gap={4}>
                    <Header as="h3">{tab.title}</Header>
                    <p className="text-lg text-muted-foreground">
                      {tab.description}
                    </p>
                    {tab.features && tab.features.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {tab.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
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
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {tab.cta && (
                      <div className="pt-2">
                        <Button asChild>
                          <Link href={tab.cta.href}>{tab.cta.text}</Link>
                        </Button>
                      </div>
                    )}
                  </Flex>
                  
                  {tab.media && (
                    <div className="relative">
                      {tab.media.type === "image" ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <Image
                            src={tab.media.src}
                            alt={tab.media.alt || tab.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                          <video
                            src={tab.media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {primaryCTA && (
            <div className="text-center">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            </div>
          )}
        </Flex>
      </Container>
    </Section>
  );
};