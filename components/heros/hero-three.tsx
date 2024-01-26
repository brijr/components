import * as Craft from "@/components/craft/layout";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";

const Four = () => {
  return (
    <Craft.Section className="not-prose">
      <Craft.Container>
        <div className="w-full h-full m-auto max-w-5xl py-10 px-6 flex flex-col gap-8">
          {/* Large Text */}
          <h1 className="text-6xl font-normal tracking-tight">
            Four is a component {/* eslint-disable-next-line */}
            <img
              className="inline my-auto -mt-6"
              width={172}
              height={100}
              src="https://newsroom.porsche.com/dam/jcr:a388376a-c5e2-4363-939b-6fbacd867a64/718_neu_2023.png"
              alt=""
            ></img>{" "}
            with {/* eslint-disable-next-line */}
            <img
              className="inline my-auto -mt-6"
              width={172}
              height={100}
              src="https://newsroom.porsche.com/dam/jcr:a388376a-c5e2-4363-939b-6fbacd867a64/718_neu_2023.png"
              alt=""
            ></img>{" "}
            special image capabilities. {/* eslint-disable-next-line */}
          </h1>
          {/* logo features */}
          <div className="p-4 flex border rounded-lg gap-6 items-center w-fit">
            <p>As seen in:</p>
            <Image className="h-6 w-fit dark:invert" src={Logo} alt=""></Image>
            <Image className="h-6 w-fit dark:invert" src={Logo} alt=""></Image>
            <Image className="h-6 w-fit dark:invert" src={Logo} alt=""></Image>
          </div>
          {/* End Text */}
          <div className="text-lg">
            <p>We make components for marketing sites.</p>
            <div className="flex gap-2">
              <p className="opacity-50">
                Visit craftui.org to use our components for free.{" "}
              </p>
              <Link className="hover:opacity-70 transition-all" href="#">
                Check it Out -{`>`}
              </Link>
            </div>
            <p className="text-xs mt-4">
              <span className="opacity-50">Available now online.</span> Tell us
              what you build next.
            </p>
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Four;
