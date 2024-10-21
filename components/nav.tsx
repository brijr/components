"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./site/theme/theme-toggle";
import { Button } from "./ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Github } from "lucide-react";

export const Nav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-125%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky left-0 right-0 top-4 z-50 mx-auto flex h-fit max-w-6xl items-center justify-between rounded-lg border bg-background p-2"
    >
      <h1 className="ml-2">
        <Link href="/">
          <span className="text-orange-500">components</span>.bridger.to
        </Link>
      </h1>
      <NavList />
    </motion.nav>
  );
};

const links = [
  { name: "Heros", href: "/hero" },
  { name: "Features", href: "/feature" },
  { name: "CTAs", href: "/cta" },
  { name: "FAQs", href: "/faq" },
  { name: "Headers", href: "/header" },
  { name: "Footers", href: "/footer" },
  { name: "Pricing", href: "/pricing" },
];

const NavList = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "pointer-events-none text-muted-foreground"
                : "text-primary/80 transition-all hover:-mt-px hover:mb-px hover:text-primary"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline" size="icon" asChild>
          <a href="https://github.com/brijr/components" target="_blank">
            <Github className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};
