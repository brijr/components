import { Circle, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Wrapper = ({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) => {
  return (
    <div className="border rounded-lg drop-shadow-sm hover:drop-shadow-lg transition-all max-w-6xl md:max-h-[720px] overflow-hidden no-scrollbar">
      <div className="top-bar sticky top-0 backdrop-blur-md flex z-30 pl-4 pr-1 justify-between items-center border-b">
        <div className="not-prose flex gap-2">
          <Circle className="w-3" />
          <Circle className="w-3" />
          <Circle className="w-3" />
        </div>
        <p className="text-xs">
          <span className="opacity-70">components/</span>
          {path}
        </p>
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
            source code <ArrowUpRight className="ml-1 w-3" />
          </Link>
        </Button>
      </div>

      {children}
    </div>
  );
};
