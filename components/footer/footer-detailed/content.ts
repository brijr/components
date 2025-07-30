import { Github, Twitter, Linkedin, Facebook, Youtube, Instagram } from "lucide-react";

export const defaultContent = {
  brand: {
    name: "Acme Inc",
    description: "Building the future of digital experiences, one innovation at a time."
  },
  columns: [
    {
      title: "Product",
      links: [
        { text: "Features", href: "/features" },
        { text: "Pricing", href: "/pricing" },
        { text: "API Reference", href: "/api" },
        { text: "Integrations", href: "/integrations" },
        { text: "Changelog", href: "/changelog" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Blog", href: "/blog" },
        { text: "Careers", href: "/careers" },
        { text: "Press Kit", href: "/press" },
        { text: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "/docs" },
        { text: "Help Center", href: "/help" },
        { text: "Community", href: "/community" },
        { text: "Templates", href: "/templates" },
        { text: "Status", href: "/status", external: true }
      ]
    }
  ],
  newsletter: {
    title: "Stay updated",
    description: "Get the latest news and updates delivered to your inbox.",
    placeholder: "Enter your email",
    buttonText: "Subscribe"
  },
  bottom: {
    copyright: "All rights reserved.",
    links: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Cookie Policy", href: "/cookies" }
    ],
    socialLinks: [
      {
        platform: "GitHub",
        href: "https://github.com",
        icon: Github
      },
      {
        platform: "Twitter",
        href: "https://twitter.com",
        icon: Twitter
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin
      },
      {
        platform: "YouTube",
        href: "https://youtube.com",
        icon: Youtube
      }
    ]
  }
};

export const contentVariations = [
  // E-commerce version
  {
    brand: {
      name: "ShopCo",
      description: "Your trusted partner for online shopping excellence."
    },
    columns: [
      {
        title: "Shop",
        links: [
          { text: "New Arrivals", href: "/new" },
          { text: "Best Sellers", href: "/bestsellers" },
          { text: "Sale", href: "/sale" },
          { text: "Gift Cards", href: "/gift-cards" },
          { text: "Store Locator", href: "/stores" }
        ]
      },
      {
        title: "Customer Service",
        links: [
          { text: "Track Order", href: "/track" },
          { text: "Returns", href: "/returns" },
          { text: "Shipping Info", href: "/shipping" },
          { text: "Size Guide", href: "/size-guide" },
          { text: "FAQ", href: "/faq" }
        ]
      },
      {
        title: "About",
        links: [
          { text: "Our Story", href: "/story" },
          { text: "Sustainability", href: "/sustainability" },
          { text: "Careers", href: "/careers" },
          { text: "Press", href: "/press" },
          { text: "Affiliates", href: "/affiliates" }
        ]
      }
    ],
    newsletter: {
      title: "Get 10% off",
      description: "Subscribe to our newsletter and get 10% off your first order.",
      placeholder: "Your email address",
      buttonText: "Sign Up"
    },
    bottom: {
      copyright: "All rights reserved.",
      links: [
        { text: "Privacy", href: "/privacy" },
        { text: "Terms", href: "/terms" },
        { text: "Accessibility", href: "/accessibility" }
      ],
      socialLinks: [
        {
          platform: "Facebook",
          href: "https://facebook.com",
          icon: Facebook
        },
        {
          platform: "Instagram",
          href: "https://instagram.com",
          icon: Instagram
        },
        {
          platform: "Twitter",
          href: "https://twitter.com",
          icon: Twitter
        },
        {
          platform: "YouTube",
          href: "https://youtube.com",
          icon: Youtube
        }
      ]
    }
  },
  // SaaS version
  {
    brand: {
      name: "CloudTools",
      description: "Enterprise cloud solutions for modern businesses."
    },
    columns: [
      {
        title: "Platform",
        links: [
          { text: "Infrastructure", href: "/infrastructure" },
          { text: "Security", href: "/security" },
          { text: "Analytics", href: "/analytics" },
          { text: "AI/ML", href: "/ai" },
          { text: "Developer Tools", href: "/developers" }
        ]
      },
      {
        title: "Solutions",
        links: [
          { text: "For Startups", href: "/startups" },
          { text: "For Enterprise", href: "/enterprise" },
          { text: "For Agencies", href: "/agencies" },
          { text: "For Education", href: "/education" },
          { text: "Case Studies", href: "/case-studies" }
        ]
      },
      {
        title: "Support",
        links: [
          { text: "Documentation", href: "/docs" },
          { text: "API Reference", href: "/api" },
          { text: "System Status", href: "https://status.cloudtools.com", external: true },
          { text: "Contact Support", href: "/support" },
          { text: "Training", href: "/training" }
        ]
      },
      {
        title: "Legal",
        links: [
          { text: "Terms", href: "/terms" },
          { text: "Privacy", href: "/privacy" },
          { text: "SLA", href: "/sla" },
          { text: "DPA", href: "/dpa" },
          { text: "Compliance", href: "/compliance" }
        ]
      }
    ],
    bottom: {
      copyright: "All rights reserved.",
      links: [
        { text: "Security", href: "/security" },
        { text: "Privacy", href: "/privacy" },
        { text: "Terms", href: "/terms" }
      ],
      socialLinks: [
        {
          platform: "GitHub",
          href: "https://github.com/cloudtools",
          icon: Github
        },
        {
          platform: "Twitter",
          href: "https://twitter.com/cloudtools",
          icon: Twitter
        },
        {
          platform: "LinkedIn",
          href: "https://linkedin.com/company/cloudtools",
          icon: Linkedin
        }
      ]
    }
  }
];