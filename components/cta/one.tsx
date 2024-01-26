
import fjord from "@/fjord.config";
import Section from "@/components/global/layout/section";
import Container from "@/components/global/layout/container";
import ButtonLink from "@/components/global/elements/button-link";

// Change the content here by editing `@/fjord.config.ts`

const CTA = () => {
  return (
    <Section>
      <Container className="bg-primary-950 text-white rounded-lg md:rounded-xl p-6 md:p-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">{fjord.content.main_cta}</h3>
          <h4 className="text-2xl font-thin opacity-70">
            {fjord.content.cta_summary}
          </h4>
          <ButtonLink href={fjord.links.main_cta}>Get Started</ButtonLink>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
