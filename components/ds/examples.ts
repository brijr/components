/**
 * Design System Examples
 *
 * Copy-paste ready examples of common UI patterns using the design system.
 * These examples demonstrate best practices and common use cases.
 */

export const examples = {
  // Hero Sections
  heroSimple: `<PageHeader
  title="Welcome to Our Platform"
  subtitle="Build amazing products with our powerful tools"
/>`,

  heroCentered: `<PageHeader
  badge="New"
  title="Ship Faster Than Ever"
  subtitle="The modern development platform for ambitious teams"
  centered
>
  <ButtonGroup>
    <Button size="lg">Get Started</Button>
    <Button size="lg" variant="outline">View Demo</Button>
  </ButtonGroup>
</PageHeader>`,

  heroWithCTA: `<PageHeader
  title="Ready to transform your workflow?"
  subtitle="Join thousands of teams already building better"
  centered
  className="bg-muted/30"
>
  <Stack spacing="sm" align="center">
    <ButtonGroup>
      <Button size="lg">Start Free Trial</Button>
      <Button size="lg" variant="ghost">Talk to Sales</Button>
    </ButtonGroup>
    <Text variant="small" subdued>No credit card required • Free for 14 days</Text>
  </Stack>
</PageHeader>`,

  // Feature Sections
  featureSimple: `<ContentBlock
  title="Built for developers"
  description="Everything you need to build modern applications, all in one place."
  buttonText="Explore Features"
  buttonHref="/features"
/>`,

  featureWithImage: `<ContentBlock
  badge="Popular"
  title="Powerful Analytics Dashboard"
  description="Get real-time insights into your application performance with our comprehensive analytics suite."
  image="/analytics-dashboard.jpg"
  imagePosition="right"
  buttonText="See it in action"
  buttonHref="/demo"
/>`,

  featureWithList: `<ContentBlock
  title="Enterprise-Ready Security"
  description="Bank-level security to keep your data safe."
  image="/security.jpg"
  imagePosition="left"
>
  <Stack spacing="sm">
    <Inline spacing="sm" align="center">
      <Check className="h-5 w-5 text-green-500" />
      <Text>SOC 2 Type II Certified</Text>
    </Inline>
    <Inline spacing="sm" align="center">
      <Check className="h-5 w-5 text-green-500" />
      <Text>End-to-end encryption</Text>
    </Inline>
    <Inline spacing="sm" align="center">
      <Check className="h-5 w-5 text-green-500" />
      <Text>GDPR compliant</Text>
    </Inline>
  </Stack>
</ContentBlock>`,

  // Card Layouts
  cardGrid: `<Section>
  <Container>
    <Stack spacing="xl">
      <Stack spacing="md" align="center">
        <Heading size={2} centered>Choose Your Plan</Heading>
        <Text variant="lead" subdued centered>Simple pricing that scales with your business</Text>
      </Stack>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <Stack spacing="sm">
                <Heading size={3}>{plan.name}</Heading>
                <Text variant="lead" weight="semibold">{plan.price}</Text>
              </Stack>
            </CardHeader>
            <CardContent>
              <Stack spacing="md">
                <Text subdued>{plan.description}</Text>
                <Button className="w-full">{plan.cta}</Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </div>
    </Stack>
  </Container>
</Section>`,

  // Form Layouts
  simpleForm: `<Section>
  <Container className="max-w-md">
    <Stack spacing="lg">
      <Stack spacing="sm">
        <Heading size={2} centered>Get in Touch</Heading>
        <Text subdued centered>We'd love to hear from you</Text>
      </Stack>

      <form>
        <Stack spacing="md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." rows={4} />
          </div>

          <Button type="submit" className="w-full">Send Message</Button>
        </Stack>
      </form>
    </Stack>
  </Container>
</Section>`,

  // Navigation
  simpleNav: `<Nav className="border-b">
  <Inline spacing="md" align="center" justify="between">
    <Heading size={4}>Logo</Heading>
    <Inline spacing="lg">
      <Button variant="ghost">Features</Button>
      <Button variant="ghost">Pricing</Button>
      <Button variant="ghost">About</Button>
      <Button>Get Started</Button>
    </Inline>
  </Inline>
</Nav>`,

  // Footer
  simpleFooter: `<Section className="border-t">
  <Container>
    <Stack spacing="lg">
      <Inline spacing="xl" justify="between" className="flex-col sm:flex-row">
        <Stack spacing="sm">
          <Heading size={4}>Company</Heading>
          <Text subdued>Building the future of development</Text>
        </Stack>

        <Inline spacing="xl">
          <Stack spacing="sm">
            <Text weight="semibold">Product</Text>
            <Stack spacing="xs">
              <Text variant="small" as="a" href="#">Features</Text>
              <Text variant="small" as="a" href="#">Pricing</Text>
              <Text variant="small" as="a" href="#">Docs</Text>
            </Stack>
          </Stack>

          <Stack spacing="sm">
            <Text weight="semibold">Company</Text>
            <Stack spacing="xs">
              <Text variant="small" as="a" href="#">About</Text>
              <Text variant="small" as="a" href="#">Blog</Text>
              <Text variant="small" as="a" href="#">Careers</Text>
            </Stack>
          </Stack>
        </Inline>
      </Inline>

      <Inline spacing="sm" justify="between" className="border-t pt-6">
        <Text variant="small" subdued>© 2024 Company. All rights reserved.</Text>
        <Inline spacing="md">
          <Text variant="small" as="a" href="#">Privacy</Text>
          <Text variant="small" as="a" href="#">Terms</Text>
        </Inline>
      </Inline>
    </Stack>
  </Container>
</Section>`,

  // Empty States
  emptyState: `<Section>
  <Container>
    <Stack spacing="md" align="center" className="py-12">
      <div className="rounded-full bg-muted p-3">
        <FileX className="h-6 w-6 text-muted-foreground" />
      </div>
      <Stack spacing="sm" align="center">
        <Heading size={3}>No results found</Heading>
        <Text subdued centered className="max-w-sm">
          Try adjusting your search or filters to find what you're looking for.
        </Text>
      </Stack>
      <ButtonGroup>
        <Button variant="outline">Clear filters</Button>
        <Button>Add new item</Button>
      </ButtonGroup>
    </Stack>
  </Container>
</Section>`,

  // Stats Section
  statsGrid: `<Section className="bg-muted/30">
  <Container>
    <Stack spacing="lg">
      <Heading size={2} centered>Trusted by teams worldwide</Heading>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Stack key={stat.label} spacing="xs" align="center">
            <Text variant="lead" weight="bold">{stat.value}</Text>
            <Text variant="small" subdued>{stat.label}</Text>
          </Stack>
        ))}
      </div>
    </Stack>
  </Container>
</Section>`,
};

// Type definitions for the examples
export type ExampleKey = keyof typeof examples;
