import { Circle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Wrapper = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div className="border relative rounded-lg max-w-6xl md:h-[720px] overflow-hidden p-12">
      <div className="flex gap-2 absolute top-4 left-4">
        <Circle className="w-4" />
        <Circle className="w-4" />
        <Circle className="w-4" />
      </div>
      <Button className="absolute top-4 left-4" asChild>
        <Link href={`https:/github.com/brijr/components/${name}`}></Link>
      </Button>
      {children}
    </div>
  );
};
