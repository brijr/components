// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "../ui/button";

// Icon imports
import { Github, Twitter, Facebook } from "lucide-react";

// Local component imports
import { Section, Container } from "../craft";

// Asset imports
import Logo from "@/public/logo.svg";

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className="grid gap-6">
          <div className="not-prose flex flex-col gap-6">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image>
            </Link>
            <p>
              <Balancer>
                brijr/components is a collection of Next.js, React, Typescript
                components for building landing pages and websites.
              </Balancer>
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-4 md:mb-0 md:flex-row">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </Container>
        <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="icon">
                <Github />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="icon">
                <Twitter />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="icon">
                <Facebook />
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">
            ©{" "}
            <a href="https://github.com/brijr/components">brijr/components</a>.
            All rights reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
