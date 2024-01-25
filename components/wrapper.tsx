import { Circle, ChevronRight } from "lucide-react";
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
    <div className="border rounded-lg max-w-6xl md:h-[720px] overflow-scroll no-scrollbar">
      <div className="top-bar sticky top-0 backdrop-blur-md flex z-10 justify-between items-center border-b">
        <div className="not-prose ml-4 flex gap-2">
          <Circle className="w-3" />
          <Circle className="w-3" />
          <Circle className="w-3" />
        </div>
        <p className="text-xs">
          <span className="opacity-70">components/</span>
          {path}
        </p>
        <Button className="not-prose text-xs" variant={"link"} asChild>
          <Link
            href={`https://github.com/brijr/components/tree/main/components/${path}.tsx`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Code
          </Link>
        </Button>
      </div>

      {children}
    </div>
  );
};
