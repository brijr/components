// Layout Imports
import { Main } from "@/components/craft";
import { End } from "@/components/end";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeButton } from "@/components/type-button";

// Component Config
import { components, types } from "@/registry";

export default function Home() {
  return (
    <Main>
      <Info>
        <Craft.Container className="not-prose flex w-full flex-wrap items-center gap-2">
          <p className="mr-4 hidden text-base md:block">Sort by Type: </p>
          {types.map((type) => (
            <TypeButton
              className={type === "footer" ? "cursor-default opacity-70" : ""}
              type={type}
              key={type}
            />
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
        {components
          .filter((component) => component.type === "footer")
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
