import * as Craft from "@/components/craft/layout";
import { ModeToggle } from "./craft/theme/theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export const Info = () => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose grid gap-4">
        <p className="text-orange-500">{`</>`}</p>
        <h1>components.bridger.to</h1>
        <h2 className="!leading-[1.3] mb-4 font-light opacity-75 lowercase">
          This is a collection of NextJS components created by{" "}
          <a
            className="border-b hover:border-b-orange-500 transition-all"
            href="https://bridger.to"
          >
            Bridger Tower
          </a>
          . They are built using{" "}
          <a
            className="border-b hover:border-b-orange-500 transition-all"
            href="https://github.com/9d8dev/craft"
          >
            Craft UI
          </a>
          ,{" "}
          <a
            className="border-b hover:border-b-orange-500 transition-all"
            href="https://ui.shadcn.com"
          >
            shadcn/ui
          </a>
          , TypeScript, and Tailwind CSS.
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
    </Craft.Section>
  );
};
