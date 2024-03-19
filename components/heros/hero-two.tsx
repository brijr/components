import * as Craft from "@/components/craft/craft";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Hero = () => {
  return (
    <Craft.Section>
      <Craft.Container className="text-center items-center flex flex-col gap-6">
        <Image
          src={Logo}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose dark:invert mb-6 md:mb-12"
        />
        <h1 className="!mb-0">
          <Balancer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Balancer>
        </h1>
        <h3 className="opacity-75 !my-0">
          <Balancer>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Balancer>
        </h3>
        <div className="mt-6 md:mt-12 not-prose flex gap-2">
          <Button asChild>
            <Link href="/">
              <Camera className="mr-2" />
              Lorem Ipsum
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href="/posts">Dolor Sit Amet -{">"}</Link>
          </Button>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Hero;
