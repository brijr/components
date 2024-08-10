"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./site/theme/theme-toggle";
import { Button } from "./ui/button";

export const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <h1>
          <Link
            href="/"
            className="text-orange-500 transition-all hover:text-orange-300"
          >{`</>`}</Link>{" "}
          brijr/components
        </h1>
        <NavList />
      </div>
    </nav>
  );
};

const links = [
  { name: "Heros", href: "/hero" },
  { name: "Features", href: "/feature" },
  { name: "CTAs", href: "/cta" },
  { name: "FAQs", href: "/faq" },
  { name: "Headers", href: "/header" },
  { name: "Footers", href: "/footer" },
];

const NavList = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            pathname === link.href
              ? "pointer-events-none text-muted-foreground"
              : "hover:text-primary"
          }`}
        >
          {link.name}
        </Link>
      ))}

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline">
          <Link href="/start">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
