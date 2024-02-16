// Layout Imports
import { Main } from "@/components/craft/layout";
import { End } from "@/components/end";
import ComponentList from "@/components/component-list";

export default function Home() {
  return (
    <Main>
      <ComponentList searchParams={{}} />
      <End />
    </Main>
  );
}
