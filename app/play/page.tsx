// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";

// Component Imports
import Header from "@/components/headers/header-one";

export default function Home() {
  return (
    <Main className="flex min-h-screen flex-col items-center gap-12 py-12">
      <Wrapper code="playground" path="playground">
        {/* Component in Dev */}
        <Header />
        {/* Component in Dev */}
      </Wrapper>
    </Main>
  );
}
