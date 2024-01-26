// Layout Imports
import { Main } from "@/components/craft/layout";
import { Wrapper } from "@/components/wrapper";
import { Info } from "@/components/info";

// Component Imports
import HeroOne from "@/components/heros/hero-one";
import HeroTwo from "@/components/heros/hero-two";
import HeroThree from "@/components/heros/hero-three";

const components = [
  {
    component: <HeroOne />,
    path: "heros/hero-one",
  },
  {
    component: <HeroTwo />,
    path: "heros/hero-two",
  },
  {
    component: <HeroThree />,
    path: "heros/hero-three",
  },
];

export default function Home() {
  return (
    <Main className="flex flex-col py-12 gap-12 items-center">
      <Info />
      {/* Components */}
      {components.map((component) => (
        <Wrapper key={component.path} path={component.path}>
          {component.component}
        </Wrapper>
      ))}
    </Main>
  );
}
