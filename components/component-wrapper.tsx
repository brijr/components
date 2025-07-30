import { Circle } from "lucide-react";
import { CopyButton } from "./copy-button";
import { ViewCodeButton } from "./view-code-button";

interface ComponentWrapperProps {
  children: React.ReactNode;
  name: string;
  filePath: string;
}

export function ComponentWrapper({
  children,
  name,
  filePath,
}: ComponentWrapperProps) {
  return (
    <section className="bg-background mx-auto w-full max-w-screen-xl overflow-hidden rounded-lg border">
      <div className="bg-accent/50 text-muted-foreground grid h-12 grid-cols-3 items-center border-b pr-2 pl-4">
        <div className="flex items-center gap-1.5">
          <Circle size={12} />
          <Circle size={12} />
          <Circle size={12} />
        </div>
        <div className="text-center text-sm">{name}</div>
        <div className="flex items-center justify-end">
          <ViewCodeButton filePath={filePath} componentName={name} />
          <CopyButton filePath={filePath} />
        </div>
      </div>
      <div className="[&_a]:pointer-events-none">
        {children}
      </div>
    </section>
  );
}
