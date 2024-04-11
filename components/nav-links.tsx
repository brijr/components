import { Container } from "./craft";
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
    <Container className="not-prose flex w-full flex-wrap gap-2 items-center">
      <p className="mr-4 hidden text-base md:block">Sort by Type: </p>
      {types.map((type) => (
        <Button
          asChild
          variant="outline"
          className={`px-2 text-base font-normal ${
            type === "all" ? "underline opacity-70 cursor-default" : ""
          }`}
          key={type}
        >
          <Link href={`/${type}`}>{type}</Link>
        </Button>
      ))}
    </Container>
  );
}
