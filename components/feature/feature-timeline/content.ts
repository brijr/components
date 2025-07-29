import { FeatureTimelineProps } from "./index";
import { User, Settings, Rocket, BarChart, CheckCircle, Mail, Code, Users } from "lucide-react";
import React from "react";

export const defaultContent: FeatureTimelineProps = {
  headline: "Get started in minutes",
  subheadline: "Simple steps to launch your first project",
  steps: [
    {
      label: "1",
      title: "Sign up",
      description: "Create your free account in seconds with just your email address. No credit card required.",
      icon: React.createElement(User, { className: "w-5 h-5" }),
    },
    {
      label: "2",
      title: "Configure your project",
      description: "Set up your workspace with our intuitive onboarding flow. Choose your preferences and integrations.",
      icon: React.createElement(Settings, { className: "w-5 h-5" }),
    },
    {
      label: "3",
      title: "Launch",
      description: "Deploy your first project with one click. Our platform handles all the technical details.",
      icon: React.createElement(Rocket, { className: "w-5 h-5" }),
    },
    {
      label: "4",
      title: "Monitor & Scale",
      description: "Track performance metrics and scale your application as your business grows.",
      icon: React.createElement(BarChart, { className: "w-5 h-5" }),
    },
  ],
  orientation: "vertical",
};

export const contentVariations: FeatureTimelineProps[] = [
  // Horizontal process flow
  {
    headline: "How it works",
    subheadline: "Our streamlined process makes everything simple",
    steps: [
      {
        label: "Step 1",
        title: "Submit Request",
        description: "Fill out our simple form with your requirements",
      },
      {
        label: "Step 2",
        title: "Review & Approve",
        description: "We'll review and send you a detailed proposal",
      },
      {
        label: "Step 3",
        title: "Implementation",
        description: "Our team handles the entire setup process",
      },
      {
        label: "Step 4",
        title: "Go Live",
        description: "Launch with confidence and ongoing support",
      },
    ],
    orientation: "horizontal",
  },
  // Development process
  {
    headline: "Our development process",
    subheadline: "From idea to production in record time",
    steps: [
      {
        label: "1",
        title: "Planning",
        description: "Define requirements and create a detailed project roadmap with stakeholders.",
        icon: React.createElement(Mail, { className: "w-5 h-5" }),
      },
      {
        label: "2",
        title: "Development",
        description: "Build features iteratively with continuous integration and testing.",
        icon: React.createElement(Code, { className: "w-5 h-5" }),
      },
      {
        label: "3",
        title: "Review",
        description: "Conduct thorough code reviews and quality assurance testing.",
        icon: React.createElement(Users, { className: "w-5 h-5" }),
      },
      {
        label: "4",
        title: "Deployment",
        description: "Deploy to production with automated pipelines and monitoring.",
        icon: React.createElement(Rocket, { className: "w-5 h-5" }),
      },
      {
        label: "5",
        title: "Maintenance",
        description: "Monitor performance and iterate based on user feedback.",
        icon: React.createElement(CheckCircle, { className: "w-5 h-5" }),
      },
    ],
    orientation: "vertical",
  },
  // Customer journey
  {
    headline: "Your journey with us",
    steps: [
      {
        label: "Day 1",
        title: "Onboarding",
        description: "Get a personalized walkthrough from our success team",
      },
      {
        label: "Week 1",
        title: "First Success",
        description: "Launch your first campaign and see immediate results",
      },
      {
        label: "Month 1",
        title: "Optimization",
        description: "Fine-tune your setup based on performance data",
      },
      {
        label: "Ongoing",
        title: "Growth",
        description: "Scale your operations with advanced features",
      },
    ],
    orientation: "vertical",
  },
  // Integration steps
  {
    headline: "Easy integration process",
    subheadline: "Connect your existing tools in minutes",
    steps: [
      {
        label: "1",
        title: "Connect",
        description: "Link your accounts with secure OAuth",
      },
      {
        label: "2",
        title: "Map Data",
        description: "Configure field mappings and sync settings",
      },
      {
        label: "3",
        title: "Test",
        description: "Verify data flow with test transactions",
      },
      {
        label: "4",
        title: "Activate",
        description: "Enable real-time synchronization",
      },
    ],
    orientation: "horizontal",
  },
];