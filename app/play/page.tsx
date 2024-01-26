// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";

// Component Imports
import HeroFour from "@/components/heros/hero-four";

export default function Home() {
  return (
    <Main className="flex flex-col py-12 gap-12 min-h-screen items-center">
      <Wrapper path="playground">
        {/* Component in Dev */}
        <HeroFour />
        {/* Component in Dev */}
      </Wrapper>
    </Main>
  );
}
