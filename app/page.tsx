// Layout Imports
import { Background } from "@/components/backgrounds";
import { Main } from "@/components/craft/layout";
import { End } from "@/components/end";
import ComponentList from "@/components/component-list";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Main>
      <ComponentList searchParams={searchParams} />
      <End />
    </Main>
  );
}
