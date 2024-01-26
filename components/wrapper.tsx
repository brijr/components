import { Circle, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import CopyButton from "./copy";
import { CopyLink } from "./copy-link";

export const Wrapper = ({
  children,
  path,
  code,
}: {
  children: React.ReactNode;
  path: string;
  code: string;
}) => {
  return (
    <div
      id={path}
      className="w-full group bg-background drop-shadow-md hover:drop-shadow-xl border rounded-lg transition-all max-w-6xl md:max-h-[760px] overflow-hidden no-scrollbar"
    >
      <CopyButton textToCopy={code} />
      <div className="top-bar sticky top-0 flex z-30 pl-4 pr-1 h-10 justify-between items-center border-b">
        <div className="not-prose flex gap-2">
          <Circle className="w-3" />
          <Circle className="w-3" />
          <Circle className="w-3" />
        </div>
        <CopyLink path={path} />
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

      {children}
    </div>
  );
};
