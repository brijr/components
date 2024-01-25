import Image from "next/image";
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";

import HeroOne from "@/components/heros/hero-one";

export default function Home() {
  return (
    <Main className="flex flex-col py-12 gap-12 items-center">
      <Wrapper url="heros/hero-one.tsx">
        <HeroOne />
      </Wrapper>
    </Main>
  );
}
