import * as Craft from "@/components/craft/craft";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <Craft.Section>
      <Craft.Container className="text-center">
        <h1 className="!my-0">This is a Header</h1>
        <p className="text-gray-500">
          <Balancer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptate quidem natus.
          </Balancer>
        </p>
        <div className="flex gap-2 items-center justify-center">
          <Button>Get Started</Button>
          <Button variant={"outline"}>Learn More</Button>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Header;
