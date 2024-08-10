import { Button } from "./ui/button";
import Link from "next/link";

type TypeButtonProps = {
  type: string;
  className?: string;
};

export const TypeButton = ({ type, className }: TypeButtonProps) => {
  return (
    <Button asChild variant="link" className={`${className} pl-0`} key={type}>
      <Link href={`/${type}`}>{type}</Link>
    </Button>
  );
};
