// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";

// Component Imports
import Hero from "@/components/heros/hero-five";

export default function Home() {
  return (
    <Main className="flex min-h-screen flex-col items-center gap-12 py-12">
      <Wrapper code="playground" path="playground" type="test">
        {/* Component in Dev */}
        <Hero />
        {/* Component in Dev */}
      </Wrapper>
    </Main>
  );
}
