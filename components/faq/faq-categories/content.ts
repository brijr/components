import { FAQCategoriesProps } from "./index";
import { CreditCard, Shield, Settings, Users, HelpCircle, Code } from "lucide-react";
import React from "react";

export const defaultContent: FAQCategoriesProps = {
  headline: "Help Center",
  subheadline: "Find answers organized by topic",
  categories: [
    {
      id: "general",
      name: "General",
      description: "Common questions about our platform and services",
      icon: React.createElement(HelpCircle, { className: "w-4 h-4" }),
      items: [
        {
          question: "What is your platform?",
          answer: "Our platform is a comprehensive solution for teams to collaborate, manage projects, and track progress. It combines project management, team communication, and analytics in one integrated system.",
          popular: true,
        },
        {
          question: "Who is this platform for?",
          answer: "Our platform is designed for teams of all sizes, from startups to enterprises. Whether you're a small team looking to improve collaboration or a large organization needing advanced project management, we have plans to fit your needs.",
        },
        {
          question: "How does the free trial work?",
          answer: "Our 14-day free trial gives you full access to all Pro features. No credit card is required to start. You can invite team members, create projects, and explore all features. At the end of the trial, you can choose to upgrade or continue with our free plan.",
          popular: true,
        },
        {
          question: "What makes you different from competitors?",
          answer: "We focus on simplicity without sacrificing power. Our intuitive interface, comprehensive feature set, competitive pricing, and exceptional customer support set us apart. Plus, we're constantly innovating based on user feedback.",
        },
        {
          question: "Do you have a mobile app?",
          answer: "Yes! We have native apps for iOS and Android that sync seamlessly with the web platform. You can manage projects, communicate with your team, and track progress from anywhere.",
          popular: true,
        },
      ],
    },
    {
      id: "billing",
      name: "Billing",
      description: "Everything about payments, subscriptions, and invoices",
      icon: React.createElement(CreditCard, { className: "w-4 h-4" }),
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and ACH bank transfers for annual plans. Enterprise customers can also pay by invoice with NET 30 terms.",
          popular: true,
        },
        {
          question: "Can I change my plan anytime?",
          answer: "Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle to ensure you get full value from your current plan.",
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for new customers on their first payment. After that, we don't offer refunds for partial periods, but you can cancel anytime and continue using the service until the end of your billing period.",
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime from Settings > Billing > Cancel Subscription. You'll retain access to paid features until the end of your current billing period. Your data remains available for 90 days after cancellation.",
          popular: true,
        },
        {
          question: "Do you offer discounts?",
          answer: "Yes! We offer 20% off for annual billing, 50% off for educational institutions and non-profits, and special pricing for startups in our partner programs. Contact sales for volume discounts on Enterprise plans.",
        },
      ],
    },
    {
      id: "security",
      name: "Security",
      description: "Data protection, privacy, and compliance information",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      items: [
        {
          question: "How is my data protected?",
          answer: "We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. All data is stored in SOC 2 Type II certified data centers with 24/7 monitoring, regular backups, and disaster recovery protocols.",
          popular: true,
        },
        {
          question: "Are you GDPR compliant?",
          answer: "Yes, we are fully GDPR compliant. We provide data processing agreements (DPAs), tools for data export and deletion, and detailed privacy controls. Users have full control over their data and can request deletion at any time.",
        },
        {
          question: "Do you have security certifications?",
          answer: "Yes, we maintain SOC 2 Type II certification and undergo annual third-party security audits. We also comply with ISO 27001 standards and are working towards additional certifications based on customer needs.",
        },
        {
          question: "How do you handle data breaches?",
          answer: "We have a comprehensive incident response plan. In the unlikely event of a breach, we would immediately investigate, contain the issue, and notify affected users within 72 hours as required by law. We also maintain cyber insurance.",
        },
        {
          question: "Can I control access permissions?",
          answer: "Yes, we offer granular role-based access control (RBAC). You can define custom roles, set permissions at the project level, enforce 2FA, configure SSO, and monitor all access through detailed audit logs.",
        },
      ],
    },
    {
      id: "account",
      name: "Account",
      description: "Managing your account, team, and settings",
      icon: React.createElement(Settings, { className: "w-4 h-4" }),
      items: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email. We'll send you a secure reset link that's valid for 24 hours. For security reasons, make sure to use a strong, unique password.",
          popular: true,
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can change your email address in Settings > Account > Email. You'll need to verify the new email address before the change takes effect. Your login credentials will update automatically.",
        },
        {
          question: "How do I enable two-factor authentication?",
          answer: "Go to Settings > Security > Two-Factor Authentication. We support authenticator apps (recommended), SMS, and hardware keys. Once enabled, you'll need to enter a code in addition to your password when logging in.",
        },
        {
          question: "Can I have multiple accounts?",
          answer: "Yes, you can create multiple accounts with different email addresses. Many users have separate accounts for personal and business use. You can also be part of multiple teams within a single account.",
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account from Settings > Account > Delete Account. This action is irreversible and will immediately remove all your data. We recommend exporting your data first if you want to keep a copy.",
        },
      ],
    },
    {
      id: "team",
      name: "Team",
      description: "Collaboration, permissions, and team management",
      icon: React.createElement(Users, { className: "w-4 h-4" }),
      items: [
        {
          question: "How do I invite team members?",
          answer: "Go to Settings > Team > Invite Members. Enter email addresses and select roles (Admin, Member, or Viewer). Invitees will receive an email with instructions to join. You can also share an invite link.",
          popular: true,
        },
        {
          question: "What are the different user roles?",
          answer: "Admin: Full access to all features and settings. Member: Can create and edit content but can't change billing or team settings. Viewer: Read-only access. Enterprise plans can create custom roles with specific permissions.",
        },
        {
          question: "Can I transfer ownership?",
          answer: "Yes, account owners can transfer ownership to another admin. Go to Settings > Team > Transfer Ownership. Both parties must confirm the transfer, and the new owner will have full control including billing.",
        },
        {
          question: "How do guest permissions work?",
          answer: "Guests can be invited to specific projects without full account access. They can view and comment but can't access other projects or account settings. Perfect for clients or external collaborators.",
        },
        {
          question: "Is there a limit on team size?",
          answer: "Team size limits depend on your plan: Free (3 members), Pro (10 members), Business (50 members), Enterprise (unlimited). You can add more members by upgrading your plan or purchasing additional seats.",
        },
      ],
    },
    {
      id: "technical",
      name: "Technical",
      description: "API, integrations, and developer questions",
      icon: React.createElement(Code, { className: "w-4 h-4" }),
      items: [
        {
          question: "Do you have an API?",
          answer: "Yes! Our RESTful API is available for all paid plans. It provides full access to create, read, update, and delete resources. We also offer webhooks for real-time notifications and comprehensive API documentation.",
          popular: true,
        },
        {
          question: "What integrations are available?",
          answer: "We integrate with 100+ tools including Slack, Microsoft Teams, Google Workspace, GitHub, Jira, Salesforce, and more. You can also use Zapier to connect with 3000+ other apps or build custom integrations with our API.",
        },
        {
          question: "Can I export my data?",
          answer: "Yes, you can export all your data anytime. We support CSV, JSON, and PDF formats. Go to Settings > Data > Export. For large exports, we'll email you a download link when ready. API access allows programmatic exports.",
        },
        {
          question: "What are the system requirements?",
          answer: "Our web app works on any modern browser (Chrome, Firefox, Safari, Edge). Mobile apps require iOS 13+ or Android 8+. We recommend a stable internet connection for the best experience. Offline mode is available on mobile apps.",
        },
        {
          question: "How do webhooks work?",
          answer: "Webhooks send HTTP POST requests to your endpoints when events occur. Configure them in Settings > Developers > Webhooks. All webhooks include retry logic, event filtering, and HMAC signatures for security verification.",
        },
      ],
    },
  ],
  defaultCategory: "general",
  showPopularBadge: true,
  cta: {
    text: "Contact Support",
    href: "/support",
  },
};

export const contentVariations: FAQCategoriesProps[] = [
  // Simplified categories
  {
    headline: "Frequently Asked Questions",
    categories: [
      {
        id: "getting-started",
        name: "Getting Started",
        items: [
          {
            question: "How do I sign up?",
            answer: "Click the Sign Up button and enter your email and password. You'll receive a verification email to activate your account.",
            popular: true,
          },
          {
            question: "What happens after I sign up?",
            answer: "You'll be guided through our onboarding process to set up your first project and invite team members.",
          },
          {
            question: "How long does setup take?",
            answer: "Most users are up and running in under 10 minutes. Complex enterprise setups may take a few hours with our support.",
          },
        ],
      },
      {
        id: "features",
        name: "Features",
        items: [
          {
            question: "What features are included?",
            answer: "All plans include core features like project management, collaboration tools, and basic reporting. Advanced features vary by plan.",
            popular: true,
          },
          {
            question: "Can I customize workflows?",
            answer: "Yes, Pro and above plans can create custom workflows, automation rules, and templates.",
          },
          {
            question: "Do you have mobile apps?",
            answer: "Yes, we have free mobile apps for iOS and Android with full feature parity.",
          },
        ],
      },
      {
        id: "support",
        name: "Support",
        items: [
          {
            question: "How do I get help?",
            answer: "Free users have access to our knowledge base. Paid users get email support, with Pro and above getting priority support.",
            popular: true,
          },
          {
            question: "What are support hours?",
            answer: "Email support is 24/7 with response times based on your plan. Phone support (Enterprise only) is available during business hours.",
          },
          {
            question: "Do you offer training?",
            answer: "Yes, we provide video tutorials, documentation, webinars, and custom training for Enterprise customers.",
          },
        ],
      },
    ],
    showPopularBadge: true,
  },
  // Industry-specific FAQs
  {
    headline: "Industry Solutions FAQ",
    subheadline: "Questions specific to your industry",
    categories: [
      {
        id: "healthcare",
        name: "Healthcare",
        description: "HIPAA compliance and healthcare-specific features",
        items: [
          {
            question: "Are you HIPAA compliant?",
            answer: "Yes, we offer HIPAA-compliant plans with BAA agreements, encryption, access controls, and audit logging.",
          },
          {
            question: "Can I store patient data?",
            answer: "Yes, on HIPAA-compliant plans you can securely store and manage patient information with proper safeguards.",
          },
          {
            question: "Do you integrate with EHR systems?",
            answer: "We integrate with major EHR systems including Epic, Cerner, and Allscripts through HL7 and FHIR standards.",
          },
        ],
      },
      {
        id: "finance",
        name: "Finance",
        description: "Financial services compliance and features",
        items: [
          {
            question: "Are you SOX compliant?",
            answer: "Yes, our Enterprise plans include SOX compliance features including audit trails, access controls, and data retention policies.",
          },
          {
            question: "Do you support financial regulations?",
            answer: "We comply with major financial regulations including PCI DSS, SOX, and have features for FINRA compliance.",
          },
          {
            question: "Can I integrate with financial systems?",
            answer: "Yes, we integrate with QuickBooks, SAP, Oracle Financial, and other major financial platforms.",
          },
        ],
      },
      {
        id: "education",
        name: "Education",
        description: "Education sector features and compliance",
        items: [
          {
            question: "Do you offer education discounts?",
            answer: "Yes, we offer 50% off for educational institutions and free accounts for students with .edu emails.",
          },
          {
            question: "Are you FERPA compliant?",
            answer: "Yes, we comply with FERPA requirements for protecting student education records and provide necessary agreements.",
          },
          {
            question: "Can I manage multiple classes?",
            answer: "Yes, our education plans support unlimited classes, student management, and assignment tracking.",
          },
        ],
      },
    ],
    defaultCategory: "healthcare",
  },
];