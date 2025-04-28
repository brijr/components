import { Container } from "./ds";
import { Button } from "./ui/button";
import Link from "next/link";

// Types of components
const types: ComponentTypes[] = [
  "all",
  "hero",
  "feature",
  "cta",
  "header",
  "faq",
];

export function NavLinks() {
  return (
    <Container className="not-prose flex w-full flex-wrap items-center gap-2">
      <p className="sr-only">Sort by Type: </p>
      {types.map((type) => (
        <Button
          asChild
          variant="outline"
          className={`px-2 text-base font-normal ${
            type === "all" ? "cursor-default underline opacity-70" : ""
          }`}
          key={type}
        >
          <Link href={`/${type}`}>{type}</Link>
        </Button>
      ))}
    </Container>
  );
}
