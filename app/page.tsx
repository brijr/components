import { Circle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/ds";

import { registry } from "@/registry";

export default function HomePage() {
  return (
    <Main>
      <div className="py-6">
        <h1 className="text-center font-mono text-sm">components.bridger.to</h1>
      </div>
      <div className="grid gap-8">
        {registry.map(({ name, slug, Component, props }) => (
          <Wrapper key={slug} name={name}>
            <Component {...(props || {})} />
          </Wrapper>
        ))}
      </div>
    </Main>
  );
}

const Wrapper = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div className="max-w-screen-xl w-full border mx-auto rounded-lg overflow-hidden">
      <div className="h-12 bg-accent/50 border-b flex items-center justify-between pl-4 pr-2 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Circle size={12} />
          <Circle size={12} />
          <Circle size={12} />
        </div>
        <div className="text-sm">{name}</div>
        <Button variant="ghost" size="icon">
          <Copy size={12} />
        </Button>
      </div>
      {children}
    </div>
  );
};
