import { Container, Section } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <Section>
      <Container className="flex flex-col text-center">
        <h1 className="!mb-0">Lorem ipsum dolor sit amet consectetur</h1>
        <h3 className="text-muted-foreground">
          <Balancer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptate quidem natus.
          </Balancer>
        </h3>
        <div className="mx-auto !mt-8 flex items-center gap-2">
          <Button>Get Started</Button>
          <Button variant={"outline"}>Learn More</Button>
        </div>
      </Container>
    </Section>
  );
};

export default Header;
