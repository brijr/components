// Layout Imports
import { Main } from "@/components/craft";
import { Wrapper } from "@/components/wrapper";
import Link from "next/link";

// Component Imports
import Hero from "@/components/heros/hero-six";

export default function Home() {
  return (
    <Main className="flex min-h-screen flex-col items-center gap-12 py-12">
      <Link href="/">Go home</Link>
      <Wrapper code="playground" path="playground" type="test">
        {/* Component in Dev */}
        <Hero />
        {/* Component in Dev */}
      </Wrapper>
    </Main>
  );
}
