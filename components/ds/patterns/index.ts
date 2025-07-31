/**
 * Design System Pattern Components
 * 
 * Higher-level components that combine primitive design system components
 * into common UI patterns. These make it easier to build consistent interfaces.
 */

export { PageHeader } from "./page-header";
export { ContentBlock } from "./content-block";
export { ButtonGroup } from "./button-group";

/**
 * Common Pattern Examples:
 * 
 * 1. Hero Section
 * ```tsx
 * <PageHeader
 *   badge="New"
 *   title="Build Better Products"
 *   subtitle="The modern way to ship software"
 *   centered
 * >
 *   <ButtonGroup>
 *     <Button size="lg">Get Started</Button>
 *     <Button size="lg" variant="outline">Learn More</Button>
 *   </ButtonGroup>
 * </PageHeader>
 * ```
 * 
 * 2. Feature Section
 * ```tsx
 * <ContentBlock
 *   badge="Premium"
 *   title="Advanced Analytics"
 *   description="Get deep insights into your application performance."
 *   image="/analytics.jpg"
 *   buttonText="View Demo"
 *   buttonHref="/demo"
 * />
 * ```
 * 
 * 3. CTA Section
 * ```tsx
 * <PageHeader
 *   title="Ready to get started?"
 *   subtitle="Join thousands of teams already using our platform"
 *   centered
 *   className="bg-muted/50"
 * >
 *   <Stack spacing="sm" align="center">
 *     <ButtonGroup>
 *       <Button size="lg">Start Free Trial</Button>
 *       <Button size="lg" variant="ghost">Contact Sales</Button>
 *     </ButtonGroup>
 *     <Text variant="small" subdued>No credit card required</Text>
 *   </Stack>
 * </PageHeader>
 * ```
 * 
 * 4. Content with List
 * ```tsx
 * <ContentBlock
 *   title="Why Choose Us"
 *   description="We provide the tools you need to succeed."
 *   image="/team.jpg"
 *   imagePosition="left"
 * >
 *   <Stack spacing="sm">
 *     <Text>✓ 99.9% Uptime SLA</Text>
 *     <Text>✓ 24/7 Support</Text>
 *     <Text>✓ Enterprise Security</Text>
 *   </Stack>
 * </ContentBlock>
 * ```
 */