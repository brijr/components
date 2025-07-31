# Design System Documentation

## Quick Start - Copy & Paste Examples

### Hero Section
```tsx
import { PageHeader, ButtonGroup } from "@/components/ds/patterns";
import { Button } from "@/components/ui/button";

<PageHeader
  badge="New"
  title="Build Better Products" 
  subtitle="The modern way to ship software"
  centered
>
  <ButtonGroup>
    <Button size="lg">Get Started</Button>
    <Button size="lg" variant="outline">Learn More</Button>
  </ButtonGroup>
</PageHeader>
```

### Feature Section with Image
```tsx
import { ContentBlock } from "@/components/ds/patterns";

<ContentBlock
  badge="Premium"
  title="Advanced Analytics"
  description="Get deep insights into your application performance."
  image="/analytics.jpg"
  buttonText="View Demo"
  buttonHref="/demo"
/>
```

### Simple Text Layout
```tsx
import { Section, Container, Stack, Heading, Text } from "@/components/ds";

<Section>
  <Container>
    <Stack spacing="md">
      <Heading size={2}>About Us</Heading>
      <Text>We help teams build better products faster.</Text>
      <Text subdued>Founded in 2024, trusted by thousands.</Text>
    </Stack>
  </Container>
</Section>
```

### Button Group
```tsx
import { ButtonGroup } from "@/components/ds/patterns";
import { Button } from "@/components/ui/button";

<ButtonGroup>
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>
```

## Core Components

### Heading
Semantic heading with automatic sizing. Use `size` prop (1-6) instead of h1-h6.

```tsx
<Heading size={1}>Main Title</Heading>           // <h1> with largest size
<Heading size={2} subdued>Section Title</Heading> // <h2> with muted color
<Heading size={3} centered>Centered Title</Heading> // <h3> centered
```

**Props:**
- `size`: 1-6 (required) - Controls semantic element and visual size
- `centered`: boolean - Shorthand for center alignment
- `subdued`: boolean - Shorthand for muted color
- `color`: "default" | "muted" 
- `align`: "left" | "center" | "right"
- `className`: Additional Tailwind classes

### Text
Body text component. For headings, use Heading component.

```tsx
<Text>Regular paragraph text</Text>
<Text variant="lead">Intro text that's larger</Text>
<Text variant="small" subdued>Fine print</Text>
<Text variant="code">monospace_code</Text>
<Text variant="link" as="a" href="/docs">Link text</Text>
```

**Props:**
- `variant`: "body" | "lead" | "small" | "muted" | "code" | "link"
- `centered`: boolean - Center align text
- `subdued`: boolean - Muted color
- `weight`: "normal" | "medium" | "semibold" | "bold"
- `as`: HTML element to render

### Stack
Vertical spacing between elements. Replaces manual margins.

```tsx
<Stack spacing="md">
  <Heading size={2}>Title</Heading>
  <Text>Description</Text>
  <Button>Action</Button>
</Stack>

<Stack compact>  // Same as spacing="sm"
  <Badge>New</Badge>
  <Text>Compact spacing</Text>
</Stack>
```

**Props:**
- `spacing`: "sm" (8px) | "md" (16px) | "lg" (24px) | "xl" (32px) | any gap-* class
- `compact`: boolean - Use tight spacing
- `align`: "start" | "center" | "end" | "stretch"

### Inline
Horizontal spacing with wrapping. Perfect for button groups and tags.

```tsx
<Inline spacing="md">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</Inline>

<Inline compact>  // Tight spacing
  <Icon />
  <Text>Label</Text>
</Inline>
```

**Props:**
- `spacing`: "sm" | "md" | "lg" | "xl" | any gap-* class
- `compact`: boolean - Use tight spacing
- `align`: "start" | "center" | "end" | "baseline"
- `wrap`: "wrap" | "nowrap" | "reverse"

### Section & Container
Page structure components with built-in spacing.

```tsx
<Section>  // Adds vertical padding
  <Container>  // Centers content with horizontal padding
    {/* Your content */}
  </Container>
</Section>
```

**Section**: `py-2 sm:py-4` (8px mobile, 16px desktop)
**Container**: `max-w-5xl mx-auto p-4 sm:p-6`

## Pattern Components

### PageHeader
Complete page header with title, subtitle, badge, and actions.

```tsx
<PageHeader
  badge="Beta"
  title="Welcome"
  subtitle="Get started in minutes"
  centered
>
  {/* Optional children for buttons/CTAs */}
</PageHeader>
```

### ContentBlock
Feature sections with optional image.

```tsx
<ContentBlock
  title="Feature Name"
  description="Feature description"
  image="/feature.jpg"
  imagePosition="left"
  buttonText="Learn More"
  buttonHref="/features"
>
  {/* Optional children for lists, etc */}
</ContentBlock>
```

### ButtonGroup
Pre-configured Inline for buttons.

```tsx
<ButtonGroup spacing="md">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</ButtonGroup>
```

## Common Patterns

### Centered Hero
```tsx
<PageHeader
  badge="New"
  title="Ship Faster"
  subtitle="Build amazing products"
  centered
>
  <Stack spacing="sm" align="center">
    <ButtonGroup>
      <Button size="lg">Start Free</Button>
      <Button size="lg" variant="ghost">Learn More</Button>
    </ButtonGroup>
    <Text variant="small" subdued>No credit card required</Text>
  </Stack>
</PageHeader>
```

### Feature Grid
```tsx
<Section>
  <Container>
    <Stack spacing="xl">
      <PageHeader 
        title="Features" 
        subtitle="Everything you need"
        centered 
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        {features.map(feature => (
          <Card key={feature.id}>
            <CardHeader>
              <Heading size={3}>{feature.title}</Heading>
            </CardHeader>
            <CardContent>
              <Text subdued>{feature.description}</Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </Stack>
  </Container>
</Section>
```

### Two Column Layout
```tsx
<ContentBlock
  badge="Popular"
  title="Analytics Dashboard"
  description="Real-time insights for your team"
  image="/dashboard.jpg"
  imagePosition="right"
>
  <Stack spacing="sm">
    <Text>✓ Live data updates</Text>
    <Text>✓ Custom reports</Text>
    <Text>✓ Team sharing</Text>
  </Stack>
</ContentBlock>
```

## Best Practices

1. **Use semantic sizes for Heading** - Size 1 for main titles, 2 for sections, etc.
2. **Let Stack/Inline handle spacing** - Don't add margins manually
3. **Use convenience props** - `centered` and `subdued` are easier than full props
4. **Section + Container for structure** - They handle responsive padding
5. **Pattern components for common UI** - PageHeader, ContentBlock save time

## Import Everything

```tsx
// Core components
import { 
  Section, Container, Stack, Inline,
  Heading, Text, Prose 
} from "@/components/ds";

// Pattern components  
import { 
  PageHeader, ContentBlock, ButtonGroup 
} from "@/components/ds/patterns";

// UI components
import { Button, Card, Badge } from "@/components/ui";
```

## Migration Notes

### From Old API
```tsx
// Old
<Heading level={1}>Title</Heading>
<Text variant="h2">Subtitle</Text>

// New  
<Heading size={1}>Title</Heading>
<Heading size={2}>Subtitle</Heading>
```

### Spacing Changes
```tsx
// Old: 8 spacing options
<Stack spacing="2xl">

// New: 4 options or custom
<Stack spacing="lg">  // or
<Stack spacing="gap-12">
```

### New Convenience Props
```tsx
// Old
<Heading align="center" color="muted">

// New
<Heading centered subdued>
```