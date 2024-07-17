import { Circle, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { CopyLink } from "./copy-link";
import { ViewCode } from "./view-code";

import Link from "next/link";
import CopyButton from "./copy";

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
      className="no-scrollbar group relative w-full max-w-6xl overflow-hidden rounded-lg border bg-background drop-shadow-md transition-all hover:drop-shadow-xl sm:m-2 md:max-h-[848px]"
    >
      <CopyButton textToCopy={code} />
      <TopBar path={path} code={code} />
      <div className="relative">
        {children}
        <ViewCode code={code} />
      </div>
    </div>
  );
};

const TopBar = ({ path, code }: { path: string; code: string }) => {
  return (
    <div className="top-bar sticky top-0 z-30 flex h-10 items-center justify-between border-b pl-4 pr-1">
      <div className="not-prose flex gap-2">
        <Circle className="w-3" />
        <Circle className="w-3" />
        <Circle className="w-3" />
      </div>

      <div className="hidden items-center justify-center sm:flex">
        <CopyLink path={path} />
      </div>

      <Button
        className="not-prose text-xs font-light"
        size="sm"
        variant="link"
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
