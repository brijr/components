import * as Craft from "@/components/craft/layout";

export const Info = () => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose grid gap-4">
        <p className="text-orange-500">{`</>`}</p>
        <h1>components.bridger.to</h1>
        <h2 className="!leading-[1.3] font-light lowercase">
          This is a collection of NextJS components created by{" "}
          <a
            className="opacity-70 hover:opacity-100 transition-all"
            href="https://bridger.to"
          >
            Bridger Tower
          </a>
          . They are built using{" "}
          <a
            className="opacity-70 hover:opacity-100 transition-all"
            href="https://github.com/9d8dev/craft"
          >
            Craft UI
          </a>
          ,{" "}
          <a
            className="opacity-70 hover:opacity-100 transition-all"
            href="https://ui.shadcn.com"
          >
            shadcn/ui
          </a>
          , TypeScript, and Tailwind CSS.
        </h2>
      </Craft.Container>
    </Craft.Section>
  );
};
