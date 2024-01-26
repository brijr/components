import * as Craft from "@/components/craft/layout";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const content: faqProps[] = [
  {
    question: "What is All Veteran and how can it help me?",
    answer:
      "All Veteran is a dedicated platform that offers comprehensive resources and information on veteran benefits. Whether you're looking to understand your entitlements, seeking healthcare support, or need assistance with post-military career opportunities, our platform guides you through the available benefits and how to access them.",
  },
  {
    question: "Are the resources on All Veterans free to access?",
    answer:
      "Yes, All Veteran is committed to supporting the veteran community by providing free access to all our informational resources. Our goal is to ensure every veteran is well-informed about the benefits they've earned through their service.",
  },
  {
    question:
      "How can I ensure I'm eligible for the benefits listed on All Veteran?",
    answer:
      "While All Veteran provides a comprehensive overview of available benefits, individual eligibility can vary based on service duration, type of discharge, and other criteria. We recommend consulting with a Veterans Service Officer (VSO) or the VA directly to verify your specific eligibility.",
  },
  {
    question: "Is All Veteran associated with the VA?",
    answer:
      "We are not associated with the VA. Rather, we offer high-quality free resources to veterans and friends of veterans to help them get the benefits they've earned.",
  },
];

const FAQ = () => {
  return (
    <Craft.Section>
      <Craft.Container>
        <div className="flex flex-col not-prose gap-6">
          <h3 className="text-4xl">Frequently Asked Questions</h3>
          <h4 className="text-2xl font-light opacity-70">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            customer support team.
          </h4>
          <div className="mt-6 md:mt-12 flex flex-col gap-6">
            {content.map((item, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base md:w-3/4">
                    {item.answer}
                    {item.link && (
                      <a
                        href={item.link}
                        className="opacity-60 mt-2 hover:opacity-100 transition-all flex items-center"
                      >
                        Learn more <ArrowTopRightIcon className="ml-1" />
                      </a>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default FAQ;
