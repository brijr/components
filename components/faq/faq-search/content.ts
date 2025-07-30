import { FAQSearchProps } from "./index";

export const defaultContent: FAQSearchProps = {
  headline: "Search our knowledge base",
  subheadline: "Type your question to find instant answers",
  items: [
    // Account & Login
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a password reset link that's valid for 24 hours. If you don't receive the email within a few minutes, check your spam folder.",
      category: "Account",
      tags: ["password", "reset", "login", "account", "forgot", "access"],
      popular: true,
    },
    {
      question: "How do I change my email address?",
      answer: "You can change your email address in Settings > Account > Email Address. After entering your new email, you'll need to verify it by clicking the link we send to the new address. Your login credentials will update automatically once verified.",
      category: "Account",
      tags: ["email", "change", "update", "account", "settings"],
    },
    {
      question: "Can I have multiple accounts?",
      answer: "Yes, you can create multiple accounts using different email addresses. Many users have separate accounts for personal and business use. However, you cannot merge accounts or transfer data between them.",
      category: "Account",
      tags: ["multiple", "accounts", "business", "personal"],
    },
    // Billing & Payments
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and ACH bank transfers for annual plans. Enterprise customers can also pay by invoice with NET 30 terms.",
      category: "Billing",
      tags: ["payment", "credit card", "paypal", "billing", "invoice", "methods"],
      popular: true,
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from Settings > Billing > Cancel Subscription. You'll retain access to paid features until the end of your current billing period. Your data remains available for 90 days after cancellation.",
      category: "Billing",
      tags: ["cancel", "subscription", "billing", "refund", "cancellation"],
      popular: true,
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for new customers on their first payment. After that, we don't offer refunds for partial periods, but you can cancel anytime and continue using the service until the end of your billing period.",
      category: "Billing",
      tags: ["refund", "money back", "guarantee", "billing", "payment"],
    },
    {
      question: "Can I change my plan?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle to ensure you get full value from your current plan.",
      category: "Billing",
      tags: ["upgrade", "downgrade", "plan", "change", "billing", "subscription"],
    },
    // Features & Usage
    {
      question: "How many team members can I add?",
      answer: "The number of team members depends on your plan: Free (3 members), Pro (10 members), Business (50 members), Enterprise (unlimited). You can add more members by upgrading your plan or purchasing additional seats.",
      category: "Features",
      tags: ["team", "members", "users", "seats", "limits", "collaboration"],
      popular: true,
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes up to 3 team members, 5 projects, 1GB storage, basic features, and community support. It's perfect for individuals and small teams just getting started. You can upgrade anytime to unlock more features.",
      category: "Features",
      tags: ["free", "plan", "features", "included", "limits"],
      popular: true,
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export all your data anytime. We support CSV, JSON, and PDF formats. Go to Settings > Data > Export. For large exports, we'll email you a download link when ready. API access allows programmatic exports.",
      category: "Features",
      tags: ["export", "data", "download", "csv", "json", "pdf", "backup"],
    },
    {
      question: "Do you have a mobile app?",
      answer: "Yes! We have native apps for iOS and Android that sync seamlessly with the web platform. You can manage projects, communicate with your team, and track progress from anywhere. Download from the App Store or Google Play.",
      category: "Features",
      tags: ["mobile", "app", "ios", "android", "phone", "tablet"],
    },
    // Security & Privacy
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is SOC 2 Type II certified, and we perform regular third-party security audits. We also offer 2FA and SSO for additional protection.",
      category: "Security",
      tags: ["security", "encryption", "safe", "privacy", "data", "protection", "compliance"],
      popular: true,
    },
    {
      question: "Are you GDPR compliant?",
      answer: "Yes, we are fully GDPR compliant. We provide data processing agreements (DPAs), tools for data export and deletion, and detailed privacy controls. Users have full control over their data and can request deletion at any time.",
      category: "Security",
      tags: ["gdpr", "compliance", "privacy", "data", "europe", "regulation"],
    },
    {
      question: "How do you handle backups?",
      answer: "We perform continuous backups with point-in-time recovery for the last 30 days. Your data is replicated across multiple geographic regions for redundancy. Enterprise customers can configure custom backup policies.",
      category: "Security",
      tags: ["backup", "recovery", "data", "restore", "disaster"],
    },
    // Technical
    {
      question: "Do you have an API?",
      answer: "Yes! Our RESTful API is available for all paid plans. It provides full access to create, read, update, and delete resources. We also offer webhooks for real-time notifications and comprehensive API documentation.",
      category: "Technical",
      tags: ["api", "integration", "developers", "rest", "webhook", "technical"],
    },
    {
      question: "What integrations are available?",
      answer: "We integrate with 100+ tools including Slack, Microsoft Teams, Google Workspace, GitHub, Jira, Salesforce, and more. You can also use Zapier to connect with 3000+ other apps or build custom integrations with our API.",
      category: "Technical",
      tags: ["integrations", "slack", "zapier", "connect", "third-party", "apps"],
    },
    {
      question: "What are the system requirements?",
      answer: "Our web app works on any modern browser (Chrome, Firefox, Safari, Edge). Mobile apps require iOS 13+ or Android 8+. We recommend a stable internet connection for the best experience. Offline mode is available on mobile apps.",
      category: "Technical",
      tags: ["requirements", "browser", "system", "compatibility", "specs"],
    },
    // Support
    {
      question: "How do I contact support?",
      answer: "Support options depend on your plan: Free users have access to our knowledge base and community forum. Paid users get email support with guaranteed response times. Pro and Enterprise plans also include phone support and priority assistance.",
      category: "Support",
      tags: ["support", "help", "contact", "assistance", "customer service"],
    },
    {
      question: "What are your support hours?",
      answer: "Email support is available 24/7 with response times based on your plan: Pro (24 hours), Business (12 hours), Enterprise (2 hours). Phone support for Pro and Enterprise customers is available Monday-Friday, 9 AM-6 PM in your local timezone.",
      category: "Support",
      tags: ["support", "hours", "availability", "response time", "help"],
    },
    {
      question: "Do you offer training?",
      answer: "Yes! We provide self-paced video tutorials, live webinars, comprehensive documentation, and personalized training sessions for Enterprise customers. New users also get access to our onboarding program.",
      category: "Support",
      tags: ["training", "tutorials", "learning", "onboarding", "education"],
    },
  ],
  searchPlaceholder: "Type your question...",
  showCategories: true,
  showPopularBadge: true,
  initialItemsCount: 10,
  noResultsMessage: "No matching questions found. Try different keywords or browse all questions below.",
  noResultsCTA: {
    text: "Contact Support",
    href: "/support",
  },
};

export const contentVariations: FAQSearchProps[] = [
  // Minimal search
  {
    headline: "How can we help?",
    items: [
      {
        question: "Getting started guide",
        answer: "Welcome! Start by creating your first project. Click 'New Project', give it a name, and invite your team. Our quick start guide walks you through the basics in under 5 minutes.",
      },
      {
        question: "Pricing and plans",
        answer: "We offer flexible plans for teams of all sizes. Free for up to 3 users, Pro at $10/user/month, Business at $25/user/month, and custom Enterprise pricing. All plans include core features.",
      },
      {
        question: "Account settings",
        answer: "Manage your account from the Settings page. Update profile information, change password, configure notifications, manage billing, and set preferences. Team admins can also manage users and permissions.",
      },
      {
        question: "API documentation",
        answer: "Our API lets you integrate with your existing tools. Authentication uses API keys, rate limits apply based on your plan, and we support REST with JSON responses. Full docs at docs.example.com/api.",
      },
      {
        question: "Troubleshooting",
        answer: "Having issues? Try clearing your browser cache, checking your internet connection, or using a different browser. If problems persist, contact support with your account email and a description of the issue.",
      },
    ],
    searchPlaceholder: "Search help articles...",
    showCategories: false,
    showPopularBadge: false,
    initialItemsCount: 5,
  },
  // Developer-focused
  {
    headline: "Developer documentation",
    subheadline: "Search our technical docs and API reference",
    items: [
      {
        question: "Authentication methods",
        answer: "We support multiple authentication methods: API keys for server-to-server communication, OAuth 2.0 for user authorization, JWT tokens for session management, and webhook signatures for secure callbacks.",
        category: "API",
        tags: ["auth", "oauth", "jwt", "api key", "authentication"],
      },
      {
        question: "Rate limiting",
        answer: "Rate limits are enforced per API key: 1,000 requests/hour (Free), 10,000 requests/hour (Pro), 100,000 requests/hour (Business), Custom (Enterprise). Headers include X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset.",
        category: "API",
        tags: ["rate limit", "throttle", "api", "limits", "quota"],
      },
      {
        question: "Webhook configuration",
        answer: "Configure webhooks via API or dashboard. We support events for all resource types. Each webhook includes an HMAC-SHA256 signature for verification. Failed deliveries are retried with exponential backoff.",
        category: "Webhooks",
        tags: ["webhook", "events", "callbacks", "notifications", "real-time"],
      },
      {
        question: "SDK installation",
        answer: "Install our SDK via package managers: npm install @example/sdk (JavaScript), pip install example-sdk (Python), gem install example-sdk (Ruby), composer require example/sdk (PHP).",
        category: "SDKs",
        tags: ["sdk", "install", "npm", "pip", "library", "package"],
      },
      {
        question: "Error codes reference",
        answer: "Common error codes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 429 (Rate Limited), 500 (Server Error). Each response includes an error object with code, message, and details.",
        category: "API",
        tags: ["error", "codes", "status", "http", "troubleshooting"],
      },
      {
        question: "GraphQL endpoint",
        answer: "Our GraphQL endpoint is available at api.example.com/graphql. It supports introspection, real-time subscriptions, and batched queries. Authentication works the same as our REST API.",
        category: "API",
        tags: ["graphql", "query", "api", "endpoint", "schema"],
      },
      {
        question: "Database schema",
        answer: "Access your data schema from Settings > Developers > Schema. We provide TypeScript definitions, OpenAPI specs, and database diagrams. Custom fields are included in the schema export.",
        category: "Data",
        tags: ["schema", "database", "types", "openapi", "structure"],
      },
      {
        question: "Testing in sandbox",
        answer: "Use our sandbox environment at sandbox.example.com for testing. Sandbox data is isolated and reset daily. All API features are available but emails and webhooks are simulated.",
        category: "Testing",
        tags: ["sandbox", "test", "development", "staging", "environment"],
      },
    ],
    searchPlaceholder: "Search developer docs...",
    showCategories: true,
    initialItemsCount: 8,
    noResultsMessage: "No matching documentation found.",
    noResultsCTA: {
      text: "Ask in Developer Forum",
      href: "/forum",
    },
  },
  // Enterprise focus
  {
    headline: "Enterprise support center",
    subheadline: "Resources for enterprise customers",
    items: [
      {
        question: "Single Sign-On (SSO) setup",
        answer: "We support SAML 2.0 and OAuth 2.0 for SSO. Configure through Settings > Security > SSO. We integrate with Okta, Azure AD, Google Workspace, and other major identity providers. Custom SAML configurations are supported.",
        category: "Security",
        tags: ["sso", "saml", "oauth", "authentication", "enterprise"],
        popular: true,
      },
      {
        question: "Custom contracts and terms",
        answer: "Enterprise customers can negotiate custom terms including SLAs, data processing agreements, custom pricing, and modified terms of service. Contact your account executive to discuss requirements.",
        category: "Legal",
        tags: ["contract", "terms", "legal", "sla", "agreement"],
      },
      {
        question: "Dedicated infrastructure",
        answer: "We offer dedicated infrastructure options including single-tenant deployments, private cloud hosting, and on-premises installation. Minimum commitment applies. Contact sales for architecture options.",
        category: "Infrastructure",
        tags: ["dedicated", "private", "infrastructure", "hosting", "deployment"],
      },
      {
        question: "Compliance certifications",
        answer: "We maintain SOC 2 Type II, ISO 27001, HIPAA, and PCI DSS compliance. Audit reports are available upon request. We can work with your security team on custom compliance requirements.",
        category: "Compliance",
        tags: ["compliance", "soc2", "iso", "hipaa", "certification", "audit"],
      },
      {
        question: "Advanced access controls",
        answer: "Enterprise plans include role-based access control (RBAC), custom roles, IP allowlisting, session management, audit logs, and automated user provisioning via SCIM.",
        category: "Security",
        tags: ["rbac", "access control", "permissions", "roles", "security"],
      },
      {
        question: "Data residency options",
        answer: "Choose where your data is stored: US East, US West, EU (Frankfurt), EU (London), APAC (Singapore), or APAC (Sydney). Data residency is configured during initial setup and cannot be changed later.",
        category: "Infrastructure",
        tags: ["data residency", "location", "gdpr", "storage", "region"],
      },
    ],
    searchPlaceholder: "Search enterprise resources...",
    showCategories: true,
    showPopularBadge: true,
    initialItemsCount: 6,
    noResultsMessage: "Can't find what you need?",
    noResultsCTA: {
      text: "Contact Your Account Manager",
      href: "/enterprise/contact",
    },
  },
];