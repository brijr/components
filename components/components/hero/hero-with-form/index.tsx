import Image from "next/image";
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Form, type FieldType } from "@/components/site/form";

export interface HeroWithFormProps {
  headline: string;
  subheadline?: string;
  description?: string;
  form: {
    fields: Array<{
      name: string;
      type: FieldType;
      label: string;
      placeholder?: string;
      validation?: Record<string, unknown>;
      options?: Array<{ label: string; value: string }>;
    }>;
    submitText: string;
    webhookUrl: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
  };
  trustedBy?: {
    text: string;
    logos: Array<{
      name: string;
      src: string;
    }>;
  };
}

export const HeroWithForm = ({
  headline,
  subheadline,
  description,
  form,
  testimonial,
  trustedBy,
}: HeroWithFormProps) => {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <Flex direction="column" gap={6} className="lg:py-8">
            {subheadline && (
              <p className="text-sm font-medium text-primary">{subheadline}</p>
            )}
            <Header as="h1">{headline}</Header>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
            
            {testimonial && (
              <div className="border-l-2 border-primary pl-6">
                <blockquote className="text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-3">
                  <p className="font-semibold">{testimonial.author}</p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ", "}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            )}

            {trustedBy && (
              <div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {trustedBy.text}
                </p>
                <div className="flex flex-wrap gap-6">
                  {trustedBy.logos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={32}
                      className="h-8 w-auto opacity-60 grayscale"
                    />
                  ))}
                </div>
              </div>
            )}
          </Flex>

          <div className="rounded-lg border bg-card p-6 lg:p-8">
            <Form
              fields={form.fields}
              submitText={form.submitText}
              webhookUrl={form.webhookUrl}
              showSuccessMessage={true}
              resetOnSubmit={true}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};