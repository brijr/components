// Layout Imports
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import * as Craft from "@/components/craft/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Component Config
import { components } from "@/components.config";

// Types of components
const types: ComponentTypes[] = ["hero", "feature", "cta", "header", "faq"];

export default function ComponentList({ searchParams }: { searchParams: any }) {
  const typeFilter = searchParams.type as string | undefined;
  const filteredComponents = typeFilter
    ? components.filter((component) => component.type === typeFilter)
    : components;

  return (
    <>
      <Info>
        <Craft.Container className="not-prose flex w-full flex-wrap items-center">
          <p className="mr-4 hidden text-base md:block">Sort by Type: </p>
          {types.map((type) => (
            <Button
              asChild
              variant="link"
              className="px-2 text-base font-normal"
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
      <Craft.Section className="flex flex-col items-center gap-12 p-2 py-12 md:p-0">
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
    </>
  );
}
