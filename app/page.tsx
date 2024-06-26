// Layout Imports
import { Main } from "@/components/craft";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Component Config
import { components, types } from "@/components.config";

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
                type === "all" ? "cursor-default underline opacity-70" : ""
              }`}
              key={type}
            >
              <Link href={`/${type}`}>{type}</Link>
            </Button>
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components.map((component) => (
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
