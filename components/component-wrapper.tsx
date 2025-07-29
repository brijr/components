import { Circle } from "lucide-react";
import { CopyButton } from "./copy-button";

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
    <div className="max-w-screen-xl w-full border mx-auto rounded-lg overflow-hidden bg-background">
      <div className="h-12 bg-accent/50 border-b flex items-center justify-between px-4 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Circle size={12} />
          <Circle size={12} />
          <Circle size={12} />
        </div>
        <div className="text-sm">{name}</div>
        <CopyButton filePath={filePath} />
      </div>
      {children}
    </div>
  );
}
