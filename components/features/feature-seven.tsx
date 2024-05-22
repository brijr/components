import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Placeholder from "@/public/placeholder.jpg";

const Feature = () => {
  return (
    <Section>
      <Container className="grid items-stretch">
        <div className="not-prose border relative rounded-lg overflow-hidden flex h-96">
          <Image
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
          />
        </div>
        <h3>We have this amazing feature in our app.</h3>
        <p className="text-muted-foreground">
          <Balancer>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </Balancer>
        </p>
        <div className="not-prose flex items-center mt-8 gap-2">
          <Button className="w-fit" asChild>
            <Link href="#">Get Started</Link>
          </Button>
          <Button className="w-fit" variant="link" asChild>
            <Link href="#">Learn More {"->"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
