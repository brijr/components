"use client";

// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";
import { End } from "@/components/end";
import * as Craft from "@/components/craft/layout";

// Component Imports
import HeroOne from "@/components/heros/hero-one";
import HeroTwo from "@/components/heros/hero-two";
import HeroThree from "@/components/heros/hero-three";
import HeroFour from "@/components/heros/hero-four";

// Component Code Imports
import HeroOneCode from "!!raw-loader!@/components/heros/hero-one";
import HeroTwoCode from "!!raw-loader!@/components/heros/hero-two";
import HeroThreeCode from "!!raw-loader!@/components/heros/hero-three";
import HeroFourCode from "!!raw-loader!@/components/heros/hero-four";

// Component Data
const components = [
  {
    component: <HeroOne />,
    path: "heros/hero-one",
    code: HeroOneCode,
  },
  {
    component: <HeroTwo />,
    path: "heros/hero-two",
    code: HeroTwoCode,
  },
  {
    component: <HeroThree />,
    path: "heros/hero-three",
    code: HeroThreeCode,
  },
  {
    component: <HeroFour />,
    path: "heros/hero-four",
    code: HeroFourCode,
  },
];

export default function Home() {
  return (
    <Main>
      <Info />
      <Craft.Section className="flex flex-col py-12 gap-12 items-center">
        {/* Components */}
        {components.map((component) => (
          <Wrapper
            code={component.code}
            key={component.path}
            path={component.path}
          >
            {component.component}
          </Wrapper>
        ))}
      </Craft.Section>
      <End />
    </Main>
  );
}
