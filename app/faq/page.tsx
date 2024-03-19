// Layout Imports
import { Main } from "@/components/craft/craft";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/craft/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Component Config
import { components } from "@/components.config";

// Types of components
const types: ComponentTypes[] = [
  "all",
  "hero",
  "feature",
  "cta",
  "header",
  "faq",
];

export default function Home() {
  return (
    <Main>
      <Info>
        <Craft.Container className="not-prose flex w-full flex-wrap items-center">
          <p className="mr-4 hidden text-base md:block">Sort by Type: </p>
          {types.map((type) => (
            <Button
              asChild
              variant="link"
              className={`px-2 text-base font-normal ${
                type === "faq" ? "underline opacity-70 cursor-default" : ""
              }`}
              key={type}
            >
              <Link href={`/${type}`}>{type}</Link>
            </Button>
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components
          .filter((component) => component.type === "faq")
          .map((component) => (
            <Wrapper
              code={component.code}
              key={component.path}
              path={component.path}
              type={component.type}
            >
              <component.component />
            </Wrapper>
          ))}
      </Craft.Section>
      <End />
    </Main>
  );
}
