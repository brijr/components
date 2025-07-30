import { FAQAccordionProps } from "./index";

export const defaultContent: FAQAccordionProps = {
  headline: "Frequently asked questions",
  subheadline: "Everything you need to know about our product and services",
  items: [
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply sign up for a free account, and you'll have access to all our basic features immediately. Our onboarding process will guide you through setting up your first project, and you can upgrade to a paid plan anytime as your needs grow.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and ACH bank transfers for annual plans. For enterprise customers, we also offer invoicing and purchase orders. All payments are processed securely through our payment partners.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period. We don't offer refunds for partial months, but you won't be charged again after cancellation.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a 14-day free trial for all our paid plans. No credit card is required to start your trial. You'll have full access to all features during the trial period, and you can upgrade to a paid plan at any time.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer different levels of support based on your plan. Free users get access to our knowledge base and community forums. Paid plans include email support with 24-hour response times. Pro and Enterprise plans get priority support with faster response times and phone support.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. Security is our top priority. We use industry-standard encryption for all data in transit and at rest. Our infrastructure is hosted on secure cloud providers with SOC 2 Type II certification. We also perform regular security audits and penetration testing.",
    },
    {
      question: "Can I import data from other platforms?",
      answer: "Yes, we provide import tools for most popular platforms. You can easily migrate your existing data using our automated import wizard or our API. For enterprise customers, we offer white-glove migration services to ensure a smooth transition.",
    },
    {
      question: "Do you have a mobile app?",
      answer: "Yes, we have native mobile apps for both iOS and Android. The apps are free to download and provide full access to your account. You can work offline, and your data will sync automatically when you're back online.",
    },
  ],
  cta: {
    text: "Contact Support",
    href: "/support",
  },
  showContactPrompt: true,
  defaultOpen: [0],
};

export const contentVariations: FAQAccordionProps[] = [
  // Technical FAQ
  {
    headline: "Technical FAQ",
    subheadline: "Common technical questions and answers",
    items: [
      {
        question: "What are the API rate limits?",
        answer: "API rate limits vary by plan. Free plans get 1,000 requests per hour, Pro plans get 10,000 requests per hour, and Enterprise plans have custom limits. All plans include burst capacity for temporary spikes.",
      },
      {
        question: "Which programming languages do you support?",
        answer: "We provide official SDKs for JavaScript/TypeScript, Python, Ruby, PHP, Java, and Go. Our RESTful API can be used with any language that supports HTTP requests. Community-maintained libraries are available for other languages.",
      },
      {
        question: "How do webhooks work?",
        answer: "Webhooks allow you to receive real-time notifications when events occur in your account. You can configure webhook endpoints in your dashboard, and we'll send HTTP POST requests with event data. All webhooks include retry logic and signature verification for security.",
      },
      {
        question: "Can I self-host the solution?",
        answer: "Self-hosting is available for Enterprise customers only. We provide Docker containers and Kubernetes configurations for deployment. Self-hosted installations include the same features as our cloud version but require your own infrastructure management.",
      },
      {
        question: "What about GDPR compliance?",
        answer: "We are fully GDPR compliant. We provide data processing agreements (DPAs), tools for data export and deletion, and detailed privacy controls. Our infrastructure is designed to meet all GDPR requirements for data protection and user rights.",
      },
    ],
    showContactPrompt: false,
  },
  // Billing FAQ
  {
    headline: "Billing & Pricing FAQ",
    items: [
      {
        question: "How does billing work?",
        answer: "We bill monthly or annually, depending on your preference. Monthly plans are charged on the same day each month. Annual plans are charged once per year and include a 20% discount. All prices are in USD.",
      },
      {
        question: "What happens if I exceed my plan limits?",
        answer: "We'll notify you when you're approaching your limits. For most features, you can continue using the service with overage charges. For some limits, you'll need to upgrade your plan. We never shut off service without warning.",
      },
      {
        question: "Can I change plans anytime?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and you'll be charged a prorated amount. Downgrades take effect at the next billing cycle to ensure you get full value from your current plan.",
      },
      {
        question: "Do you offer discounts?",
        answer: "We offer a 20% discount for annual billing on all plans. Educational institutions and non-profits qualify for a 50% discount. We also have special pricing for startups in our partner programs.",
      },
      {
        question: "What's your refund policy?",
        answer: "We offer a 30-day money-back guarantee for new customers on their first payment. After that, we don't offer refunds for partial periods, but you can cancel anytime and continue using the service until the end of your billing period.",
      },
    ],
    cta: {
      text: "View Pricing",
      href: "/pricing",
    },
    showContactPrompt: true,
  },
  // Product features FAQ
  {
    headline: "Product Features",
    subheadline: "Learn about our key features and capabilities",
    items: [
      {
        question: "What integrations are available?",
        answer: "We integrate with over 100 popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, Jira, GitHub, and more. You can also build custom integrations using our API and webhook system.",
      },
      {
        question: "How does collaboration work?",
        answer: "Teams can collaborate in real-time with features like shared workspaces, commenting, @mentions, and activity feeds. You can control permissions at a granular level and see who's working on what with presence indicators.",
      },
      {
        question: "What analytics features are included?",
        answer: "Our analytics dashboard provides real-time insights into usage, performance, and trends. You can create custom reports, set up alerts, and export data. Advanced analytics with predictive insights are available on Pro and Enterprise plans.",
      },
      {
        question: "Can I customize the interface?",
        answer: "Yes, you can customize colors, logos, and layouts to match your brand. Enterprise customers get white-labeling options with custom domains. You can also create custom workflows and automation rules.",
      },
    ],
    defaultOpen: [0, 1],
  },
  // Getting started FAQ
  {
    headline: "Getting Started",
    subheadline: "Quick answers to help you begin",
    items: [
      {
        question: "How long does setup take?",
        answer: "Most users are up and running in under 5 minutes. After signing up, our guided setup helps you configure your first project. For teams, we recommend allowing 30-60 minutes for full setup including inviting team members and configuring integrations.",
      },
      {
        question: "Do you provide training?",
        answer: "Yes! We offer various training options including video tutorials, documentation, webinars, and live training sessions. Enterprise customers get dedicated onboarding specialists and custom training programs.",
      },
      {
        question: "What if I need help migrating?",
        answer: "We provide migration guides and tools for common platforms. Our support team can assist with migration questions. For large migrations, we offer professional services to handle the entire process for you.",
      },
    ],
    cta: {
      text: "Start Free Trial",
      href: "/signup",
    },
    showContactPrompt: true,
    defaultOpen: [0],
  },
];