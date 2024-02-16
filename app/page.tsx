"use server";

// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import { End } from "@/components/end";
import * as Craft from "@/components/craft/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Component Config
import { components } from "@/components.config";

// Types of components
const types: ComponentTypes[] = ["hero", "feature", "cta", "header", "faq"];

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const typeFilter = searchParams.type as string | undefined;
  const filteredComponents = typeFilter
    ? components.filter((component) => component.type === typeFilter)
    : components;

  return (
    <Main>
      <Info>
        <Craft.Container className="not-prose w-full flex flex-wrap items-center">
          <p className="hidden md:block mr-4 text-base">Sort by Type: </p>
          {types.map((type) => (
            <Button
              asChild
              variant="link"
              className="px-2 font-normal text-base"
              key={type}
            >
              <Link
                className={typeFilter === type ? "underline" : ""}
                href={`/?type=${type}`}
                passHref
              >
                {type}
              </Link>
            </Button>
          ))}
        </Craft.Container>
      </Info>
      <Craft.Section className="flex p-2 md:p-0 flex-col py-12 gap-12 items-center">
        {filteredComponents.map((component) => (
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
