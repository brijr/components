import * as Craft from "@/components/craft/layout";
import { CTAForm } from "./cta-form";

const CTA = () => {
  return (
    <Craft.Section>
      <Craft.Container>
        <h3 className="!mt-0">Try Fjord out for yourself!</h3>
        <p>
          Reach out to learn more about Fjord from the developers. See how Fjord
          can be the perfect starter for your next website.
        </p>
        <CTAForm />
      </Craft.Container>
    </Craft.Section>
  );
};

export default CTA;
