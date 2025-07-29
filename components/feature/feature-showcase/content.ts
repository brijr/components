import { FeatureShowcaseProps } from "./index";
import { BarChart, Zap, Shield, Globe } from "lucide-react";
import React from "react";

export const defaultContent: FeatureShowcaseProps = {
  headline: "Powerful analytics at your fingertips",
  subheadline: "Get insights that drive growth with our comprehensive analytics platform",
  features: [
    {
      title: "Real-time data",
      description: "Monitor your metrics as they happen with live updates and instant notifications",
      icon: React.createElement(BarChart, { className: "w-5 h-5" }),
    },
    {
      title: "Lightning fast",
      description: "Experience sub-second query times even with millions of data points",
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
    },
    {
      title: "Enterprise security",
      description: "Your data is protected with bank-level encryption and compliance certifications",
      icon: React.createElement(Shield, { className: "w-5 h-5" }),
    },
    {
      title: "Global availability",
      description: "Access your dashboard from anywhere with 99.99% uptime guarantee",
      icon: React.createElement(Globe, { className: "w-5 h-5" }),
    },
  ],
  imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
  imageAlt: "Analytics dashboard showing real-time metrics and charts",
  imagePosition: "right",
};

export const contentVariations: FeatureShowcaseProps[] = [
  // Collaboration feature
  {
    headline: "Collaborate in real-time",
    subheadline: "Work together seamlessly, no matter where your team is located",
    features: [
      {
        title: "Live cursors",
        description: "See what your teammates are working on in real-time",
      },
      {
        title: "Instant updates",
        description: "Changes sync across all devices instantly",
      },
      {
        title: "Comment threads",
        description: "Discuss ideas directly on the canvas",
      },
      {
        title: "Version history",
        description: "Never lose work with automatic saves and versioning",
      },
    ],
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop",
    imageAlt: "Team collaborating on a project",
    imagePosition: "left",
  },
  // AI feature
  {
    headline: "AI-powered insights",
    subheadline: "Let artificial intelligence help you make better decisions",
    features: [
      {
        title: "Smart recommendations",
        description: "Get personalized suggestions based on your data patterns",
        icon: React.createElement(Zap, { className: "w-5 h-5" }),
      },
      {
        title: "Anomaly detection",
        description: "Automatically identify unusual patterns and potential issues",
        icon: React.createElement(Shield, { className: "w-5 h-5" }),
      },
      {
        title: "Predictive analytics",
        description: "Forecast future trends with machine learning models",
        icon: React.createElement(BarChart, { className: "w-5 h-5" }),
      },
    ],
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=900&fit=crop",
    imageAlt: "AI-powered analytics dashboard",
    imagePosition: "right",
  },
  // Mobile feature
  {
    headline: "Take your work anywhere",
    subheadline: "Full-featured mobile apps for iOS and Android",
    features: [
      {
        title: "Native performance",
        description: "Built from the ground up for mobile devices",
      },
      {
        title: "Offline mode",
        description: "Keep working even without an internet connection",
      },
      {
        title: "Push notifications",
        description: "Stay updated with real-time alerts",
      },
      {
        title: "Touch optimized",
        description: "Intuitive gestures and mobile-first interface",
      },
      {
        title: "Biometric security",
        description: "Secure access with Face ID and fingerprint",
      },
    ],
    imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop",
    imageAlt: "Mobile app interface on smartphone and tablet",
    imagePosition: "left",
  },
];