import { Circle, ArrowUpRight, Code } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import CopyButton from "./copy";
import { CopyLink } from "./copy-link";
import { ViewCode } from "./view-code";

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
  return (
    <div
      id={path}
      className="w-full relative group bg-background drop-shadow-md hover:drop-shadow-xl border rounded-lg transition-all max-w-6xl md:max-h-[848px] sm:m-2 overflow-hidden no-scrollbar"
    >
      <CopyButton textToCopy={code} />
      <TopBar path={path} code={code} />
      <div className="relative">
        <ViewCode code={code} />
        {children}
      </div>
    </div>
  );
};

const TopBar = ({ path, code }: { path: string; code: string }) => {
  return (
    <div className="top-bar sticky top-0 flex z-30 pl-4 pr-1 h-10 justify-between items-center border-b">
      <div className="not-prose flex gap-2">
        <Circle className="w-3" />
        <Circle className="w-3" />
        <Circle className="w-3" />
      </div>
      <div className="hidden sm:flex items-center justify-center">
        <CopyLink path={path} />
      </div>

      <Button
        className="not-prose text-xs font-light"
        size={"sm"}
        variant={"link"}
        asChild
      >
        <Link
          href={`https://github.com/brijr/components/tree/main/components/${path}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          view on github <ArrowUpRight className="ml-1 w-3" />
        </Link>
      </Button>
    </div>
  );
};
