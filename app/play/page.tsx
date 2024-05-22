// Layout Imports
import { Main } from "@/components/craft";
import { Wrapper } from "@/components/wrapper";
import Link from "next/link";

// Component Imports
import Component from "@/components/features/feature-eight";

export default function Home() {
  return (
    <Main className="flex min-h-screen flex-col items-center gap-12 py-12">
      <Link href="/">Go home</Link>
      <Wrapper code="playground" path="playground" type="test">
        {/* Component in Dev */}
        <Component />
        {/* Component in Dev */}
      </Wrapper>
    </Main>
  );
}
