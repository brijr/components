import { FAQWithSidebarProps } from "./index";

export const defaultContent: FAQWithSidebarProps = {
  headline: "How can we help you?",
  subheadline: "Find answers to common questions or get in touch with our support team",
  items: [
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple. Click the 'Sign Up' button in the top right corner, enter your email address and choose a password. You'll receive a confirmation email to verify your account. Once verified, you can start using all our features immediately.",
    },
    {
      question: "What's included in the free trial?",
      answer: "Our 14-day free trial includes full access to all Pro features: unlimited projects, advanced analytics, team collaboration, priority support, and all integrations. No credit card is required to start your trial.",
    },
    {
      question: "How do I upgrade or downgrade my plan?",
      answer: "You can change your plan anytime from your account settings. Go to Settings > Billing > Change Plan. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle.",
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription anytime from your account settings. When you cancel, you'll retain access to paid features until the end of your current billing period. Your data remains available for 90 days after cancellation.",
    },
    {
      question: "How do I add team members?",
      answer: "To add team members, go to Settings > Team > Invite Members. Enter their email addresses and choose their role (Admin, Editor, or Viewer). They'll receive an invitation email to join your workspace. Team member limits depend on your plan.",
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is SOC 2 Type II certified, and we perform regular third-party security audits. We also offer 2FA and SSO for additional account protection.",
    },
    {
      question: "What integrations are available?",
      answer: "We integrate with over 100 popular tools including Slack, Microsoft Teams, Google Workspace, GitHub, Jira, Salesforce, and more. You can also use our API or Zapier integration to connect with thousands of other apps.",
    },
    {
      question: "How does billing work?",
      answer: "We offer monthly and annual billing options. Annual plans include a 20% discount. You'll be charged on the same date each billing period. We accept all major credit cards, PayPal, and ACH transfers for annual plans. Invoices are automatically sent to your billing email.",
    },
  ],
  sidebar: {
    headline: "Contact Support",
    description: "Can't find what you're looking for? Our support team is here to help.",
    contactOptions: {
      email: {
        label: "Email us",
        value: "support@example.com",
      },
      phone: {
        label: "Call us",
        value: "+1 (555) 123-4567",
      },
      chat: {
        label: "Live chat",
        href: "/chat",
      },
      docs: {
        label: "Browse documentation",
        href: "/docs",
      },
    },
    cta: {
      text: "Submit a ticket",
      href: "/support/new",
    },
  },
  defaultOpen: [0],
};

export const contentVariations: FAQWithSidebarProps[] = [
  // Technical support focus
  {
    headline: "Technical Support",
    subheadline: "Get help with technical issues and implementation",
    items: [
      {
        question: "What are the API rate limits?",
        answer: "API rate limits depend on your plan: Free - 1,000 requests/hour, Pro - 10,000 requests/hour, Enterprise - Custom limits. All plans include burst capacity for temporary spikes. Rate limit headers are included in all API responses.",
      },
      {
        question: "How do I set up webhooks?",
        answer: "To set up webhooks, go to Settings > Developers > Webhooks. Add your endpoint URL and select the events you want to receive. We'll send a test payload to verify your endpoint. All webhooks include HMAC signatures for security.",
      },
      {
        question: "What SDKs are available?",
        answer: "We provide official SDKs for JavaScript/TypeScript, Python, Ruby, PHP, Java, and Go. All SDKs are open-source and available on GitHub. Community-maintained SDKs are available for other languages.",
      },
      {
        question: "How do I debug integration issues?",
        answer: "Use our API Explorer to test endpoints directly. Check the Activity Log in your dashboard for detailed request/response data. Enable debug mode in SDKs for verbose logging. Our support team can also help troubleshoot specific issues.",
      },
      {
        question: "Can I self-host the application?",
        answer: "Self-hosting is available for Enterprise customers. We provide Docker images, Kubernetes manifests, and detailed deployment guides. Self-hosted installations include all cloud features but require your own infrastructure management.",
      },
    ],
    sidebar: {
      headline: "Developer Resources",
      description: "Everything you need for technical implementation",
      contactOptions: {
        docs: {
          label: "API Documentation",
          href: "/api-docs",
        },
        chat: {
          label: "Developer Discord",
          href: "/discord",
        },
      },
      cta: {
        text: "Schedule Tech Call",
        href: "/schedule/technical",
      },
    },
  },
  // Sales/pricing focus
  {
    headline: "Sales & Pricing Questions",
    items: [
      {
        question: "What's the difference between plans?",
        answer: "Each plan is designed for different needs: Free for individuals, Pro for small teams, Business for growing companies, and Enterprise for large organizations. Main differences include user limits, storage, features, and support levels.",
      },
      {
        question: "Do you offer custom pricing?",
        answer: "Yes, we offer custom pricing for Enterprise customers with special requirements. This includes volume discounts, custom terms, and tailored feature sets. Contact our sales team to discuss your needs.",
      },
      {
        question: "Can I get a demo?",
        answer: "Absolutely! We offer personalized demos for teams evaluating our platform. Demos typically last 30-45 minutes and cover your specific use cases. You can schedule a demo through our website or contact sales directly.",
      },
      {
        question: "What's your refund policy?",
        answer: "We offer a 30-day money-back guarantee for new customers. If you're not satisfied within the first 30 days, we'll refund your payment in full. After 30 days, you can cancel anytime but won't receive a refund for the current period.",
      },
    ],
    sidebar: {
      headline: "Talk to Sales",
      description: "Get personalized help choosing the right plan",
      contactOptions: {
        phone: {
          label: "Sales hotline",
          value: "+1 (555) 999-8888",
        },
        email: {
          label: "Email sales",
          value: "sales@example.com",
        },
      },
      cta: {
        text: "Get a Quote",
        href: "/quote",
      },
    },
    defaultOpen: [0, 1],
  },
  // Getting started
  {
    headline: "Getting Started Guide",
    items: [
      {
        question: "What happens after I sign up?",
        answer: "After signing up, you'll be guided through our onboarding process. This includes setting up your first project, inviting team members, and configuring basic settings. The whole process takes about 5-10 minutes.",
      },
      {
        question: "How long does implementation take?",
        answer: "For most teams, basic implementation takes 1-2 hours. This includes setting up integrations, importing data, and configuring workflows. Enterprise implementations with custom requirements typically take 1-2 weeks with our support.",
      },
      {
        question: "Do you provide training?",
        answer: "Yes! We offer various training options: self-paced video tutorials, live webinars, documentation, and personalized training sessions for Enterprise customers. Most users are productive within a day.",
      },
      {
        question: "Can I import data from other tools?",
        answer: "Yes, we provide import tools for major platforms and standard formats (CSV, JSON). For large migrations, our support team can assist. Enterprise customers get dedicated migration support.",
      },
    ],
    sidebar: {
      headline: "Quick Start Resources",
      contactOptions: {
        docs: {
          label: "Getting Started Guide",
          href: "/docs/getting-started",
        },
        chat: {
          label: "Chat with Onboarding",
          href: "/chat/onboarding",
        },
      },
      cta: {
        text: "Watch Demo Video",
        href: "/demo-video",
      },
    },
  },
];