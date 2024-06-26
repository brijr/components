import * as Craft from "@/components/craft";
import { ModeToggle } from "./site/theme/theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

export const Info = ({ children }: { children?: ReactNode }) => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose grid gap-4">
        <Link
          href="/"
          className="text-orange-500 transition-all hover:text-orange-300"
        >{`</>`}</Link>
        <h1>components.bridger.to</h1>
        <h2 className="mb-4 font-light lowercase !leading-[1.3] opacity-75">
          <Balancer>
            This is a collection of NextJS components created by{" "}
            <a
              className="border-b transition-all hover:border-b-orange-500"
              href="https://bridger.to"
            >
              Bridger Tower
            </a>
            . They are built using{" "}
            <a
              className="border-b transition-all hover:border-b-orange-500"
              href="https://github.com/brijr/craft"
            >
              brijr/craft
            </a>
            ,{" "}
            <a
              className="border-b transition-all hover:border-b-orange-500"
              href="https://ui.shadcn.com"
            >
              shadcn/ui
            </a>
            , TypeScript, and Tailwind CSS.
          </Balancer>
        </h2>
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
      </Craft.Container>
      {children}
    </Craft.Section>
  );
};
