import * as Craft from "@/components/craft/craft";

export const End = () => {
  return (
    <Craft.Section>
      <Craft.Container className="not-prose grid gap-4 font-light">
        <p>
          source code can be found on{" "}
          <a
            className="border-b hover:border-b-orange-500 transition-all"
            href="https://github.com/brijr/components"
          >
            github
          </a>
          . follow me on{" "}
          <a
            className="border-b hover:border-b-orange-500 transition-all"
            href="https://x.com/bridgertower"
          >
            x (twitter)
          </a>
          .
        </p>
        <p className="opacity-70">
          components.<a href="https://bridger.to">bridger.to</a> © 2024
        </p>
      </Craft.Container>
    </Craft.Section>
  );
};
