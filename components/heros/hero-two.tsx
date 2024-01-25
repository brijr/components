import * as Craft from "@/components/craft/layout";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import LogoLightMode from "@/public/logo_light_bg.svg";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Hero = () => {
  return (
    <Craft.Section>
      <Craft.Container className="text-center items-center flex flex-col gap-6">
        <Image
          src={Logo}
          width={300}
          height={100}
          alt="Presets.com Logo"
          className="hidden dark:block not-prose"
        ></Image>
        <h1 className="!mb-0">
          <Balancer>
            Presets and Photo Resources for Photographers and Content Creators.
          </Balancer>
        </h1>
        <h3 className="opacity-75 !my-0">
          <Balancer>
            Presets and photography resources designed by expert photographers
            and content creators to help you enhance your photos and online
            presence.
          </Balancer>
        </h3>
        <div className="my-8 not-prose flex gap-2">
          <Button asChild>
            <Link href="/">
              <Camera className="mr-2" />
              Browse Presets
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href="/posts">Discover Photo Resources -{">"}</Link>
          </Button>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Hero;
