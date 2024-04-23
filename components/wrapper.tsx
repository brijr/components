"use client";
import { Circle, Smartphone } from "lucide-react";
import { CopyButton } from "./copy";
import { CopyLink } from "./copy-link";
import { ViewCode } from "./view-code";
import { Button } from "./ui/button";
import { useState } from "react";

export const Wrapper = ({
  children,
  path,
  code,
  type,
}: {
  children: React.ReactNode;
  path: string;
  code: string;
  type?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div
      id={path}
      className={`w-full relative group bg-background drop-shadow-md hover:drop-shadow-xl border rounded-lg transition-all sm:m-2 no-scrollbar ${
        isMobile
          ? "max-w-sm md:h-[667px] overflow-scroll no-scrollbar"
          : "max-w-6xl md:max-h-[848px] overflow-hidden"
      }`}
    >
      <CopyButton textToCopy={code} />
      <TopBar path={path} code={code} />
      <div className="relative">
        <ViewCode code={code} />
        {children}
        <Button
          className="absolute top-4 hidden sm:flex right-28"
          variant="outline"
          size="icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          <Smartphone size={16} />
        </Button>
      </div>
    </div>
  );
};

const TopBar = ({ path, code }: { path: string; code: string }) => {
  return (
    <div className="top-bar bg-background sticky top-0 flex z-30 pl-4 pr-1 h-10 justify-between items-center border-b">
      <div className="not-prose flex gap-2">
        <Circle className="w-3" />
        <Circle className="w-3" />
        <Circle className="w-3" />
      </div>
      <div className="hidden sm:flex items-center justify-center mr-3">
        <CopyLink path={path} />
      </div>
    </div>
  );
};
