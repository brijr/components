import * as Craft from "@/components/craft";
import { ModeToggle } from "./site/theme/theme-toggle";
import { Button } from "./ui/button";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export const End = () => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose grid gap-4 font-light">
        <div className="flex gap-2">
          <ModeToggle />
          <Button variant="outline" asChild size="icon">
            <Link href="https://github.com/brijr/components">
              <Github className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              <span className="sr-only">Visit Github</span>
            </Link>
          </Button>
          <Button variant="outline" asChild size="icon">
            <Link href="https://x.com/bridgertower">
              <Twitter className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              <span className="sr-only">Visit Twitter</span>
            </Link>
          </Button>
        </div>
        <p>
          source code can be found on{" "}
          <a
            className="border-b transition-all hover:border-b-orange-500"
            href="https://github.com/brijr/components"
          >
            github
          </a>
          . follow me on{" "}
          <a
            className="border-b transition-all hover:border-b-orange-500"
            href="https://x.com/bridgertower"
          >
            x (twitter)
          </a>
          .
        </p>
        <p className="opacity-70">
          components.<a href="https://bridger.to">bridger.to</a> © 2024
        </p>
      </Craft.Container>
    </Craft.Section>
  );
};
