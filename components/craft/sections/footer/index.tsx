import * as Craft from "@/components/craft/craft";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Balancer from "react-wrap-balancer";
import { ModeToggle } from "@/components/craft/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";

const github_link = "https://github.com/9d8dev/craft";
const x_link = "https://x.com/9d8dev";
const links = [
  {
    title: "Craft UI",
    links: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Documentation",
        href: "/docs",
      },
      {
        title: "GitHub",
        href: github_link,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms of Service",
        href: "/terms",
      },
      {
        title: "Privacy Policy",
        href: "/privacy",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t drop-shadow-sm">
      <Craft.Section>
        <Craft.Container className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-6">
            <Link href="/">
              <h3 className="sr-only">Craft UI</h3>
              <Image
                className="dark:invert"
                src={Logo}
                alt="Logo"
                width={100}
                height={50}
              ></Image>
            </Link>
            <p>
              <Balancer>
                Craft UI is a design system and component library for building
                NextJS Websites. Created by{" "}
                <a href="https://bridger.to">Bridger Tower</a> and{" "}
                <a href="https://cameronyoungblood.com">Cameron Youngblood</a>.
              </Balancer>
            </p>

            <div className="flex gap-2">
              <ModeToggle />
              <Button variant="outline" asChild size="icon">
                <Link href={github_link}>
                  <Github className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Visit Github</span>
                </Link>
              </Button>
              <Button variant="outline" asChild size="icon">
                <Link href={x_link}>
                  <Twitter className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  <span className="sr-only">Visit Twitter</span>
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground hidden sm:block">
              Code © <a href="https://9d8.dev">9d8</a>. 2023-present.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-0">
            <div className="flex flex-col gap-2">
              <h4 className="text-muted-foreground">Craft UI</h4>
              <ul>
                {links[0].links.map((link) => (
                  <li key={link.title}>
                    <Link
                      className="hover:opacity-75 transition-all"
                      href={link.href}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-muted-foreground">Support</h4>
              <ul>
                {links[1].links.map((link) => (
                  <li key={link.title}>
                    <Link
                      className="hover:opacity-75 transition-all"
                      href={link.href}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground block sm:hidden">
            Code © <a href="https://9d8.dev">9d8</a>. 2023-present.
          </p>
        </Craft.Container>
      </Craft.Section>
    </footer>
  );
};

export default Footer;
