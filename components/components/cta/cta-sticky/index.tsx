"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export interface CTAStickyProps {
  text: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showAfterScroll?: number;
  position?: "top" | "bottom";
}

export const CTASticky = ({
  text,
  primaryCTA,
  secondaryCTA,
  showAfterScroll = 500,
  position = "bottom",
}: CTAStickyProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= showAfterScroll) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-50 transform transition-transform duration-300 ${
        position === "top" ? "top-0" : "bottom-0"
      } ${
        isVisible ? "translate-y-0" : position === "top" ? "-translate-y-full" : "translate-y-full"
      }`}
    >
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Flex
            justify="between"
            align="center"
            className="flex-col gap-3 sm:flex-row"
          >
            <p className="text-sm font-medium sm:text-base">{text}</p>
            <Flex gap={3} align="center">
              {secondaryCTA && (
                <Button size="sm" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
              <Button size="sm" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              <button
                onClick={handleDismiss}
                className="ml-2 rounded-md p-1 hover:bg-muted"
                aria-label="Dismiss"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};