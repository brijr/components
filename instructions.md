# Component Creation Guide

## Project Context

This is a Next.js 15 marketing component gallery showcasing reusable UI components built with TypeScript and Tailwind CSS v4.

## Design System Overview

Use the design system from `@/components/site/ds` for all components:

### Import Structure

```tsx
// Site design system components
import {
  Main,
  Nav,
  Section,
  Container,
  Header,
  Grid,
  Flex,
  Prose,
} from "@/components/site/ds";
import { Form } from "@/components/site/form"; // Client component

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// ... any other shadcn component
```

### Typography

Use the `Header` component for all headings:

```tsx
<Header as="h1">Main Title</Header>
<Header as="h2" className="text-muted-foreground">Subtitle</Header>
<Header as="h3">Section Heading</Header>
```

For body text, use standard HTML elements or wrap in `Prose`:

```tsx
<p className="text-xl text-muted-foreground">Lead paragraph</p>
<p>Regular text</p>

// For rich text content
<Prose isArticle isSpaced>
  <h1>Article Title</h1>
  <p>This content will be automatically styled.</p>
</Prose>
```

### Layout Components

#### Section & Container

**CRITICAL: NEVER add padding or height to Section or Container**

```tsx
<Section> {/* Has built-in py-2 sm:py-4 - NO padding classes */}
  <Container> {/* Has built-in p-4 sm:p-6 - NO padding classes */}
    {/* Content */}
  </Container>
</Section>

<Section className="bg-muted"> {/* Only backgrounds/borders, NO padding */}
  <Container>
    {/* Content */}
  </Container>
</Section>
```

#### Flex Layout

```tsx
<Flex justify="between" align="center">
  <div>Left content</div>
  <div>Right content</div>
</Flex>

<Flex direction="column" gap={6}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

Props:
- `direction`: "row" | "column" | "row-reverse" | "column-reverse"
- `justify`: "start" | "end" | "center" | "between" | "around" | "evenly"
- `align`: "start" | "end" | "center" | "baseline" | "stretch"
- `gap`: 0|1|2|3|4|5|6|8|10|12 (default: 4)

#### Grid Layout

```tsx
<Grid columns={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

Responsive columns:
- 1 column: Always single column
- 2 columns: 1 on mobile, 2 on sm+
- 3 columns: 1 on mobile, 2 on sm, 3 on lg+
- 4 columns: 1 on mobile, 2 on sm, 4 on lg+

### When to Use Design System vs Tailwind

**Use Design System Components:**
- Page structure (Main, Nav, Section, Container)
- Typography (Header, Prose)
- Layout (Grid, Flex)
- Consistent spacing and responsive behavior

**Use Tailwind Classes:**
- Visual styling (backgrounds, borders, shadows)
- Fine-tuned responsive modifiers
- Text colors and sizes
- Custom spacing for specific needs

**Use shadcn/ui Components:**
- Buttons, Cards, Forms, Dialogs
- Any interactive UI elements
- Complex components with built-in accessibility

## Critical Rules

### 🔗 All CTAs MUST Be Functional

Every button and link must have a working action:

```tsx
import Link from "next/link";

// Internal navigation
<Button asChild size="lg">
  <Link href="/contact">Get Started</Link>
</Button>

// External links
<Button asChild size="lg">
  <a href="https://calendly.com/demo" target="_blank" rel="noopener noreferrer">
    Book Demo
  </a>
</Button>

// Smooth scroll
<Button 
  size="lg"
  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
>
  View Pricing
</Button>

// ❌ NEVER do this
<Button>Get Started</Button> // No action!
```

### TypeScript Requirements

**NEVER use React.FC** - Use direct function declarations:

```tsx
// ❌ DO NOT USE
export const Component: React.FC<Props> = ({ prop }) => { ... }

// ✅ DO USE
export const Component = ({ prop }: Props) => { ... }
```

### Component Structure

```
/components/[type]/[component-name]/
  ├── index.tsx      # Component with named export
  └── content.ts     # Default content and variations
```

## Component Requirements

### 1. Named Export with TypeScript Interface

```tsx
export interface HeroMinimalProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
}

export const HeroMinimal = ({ 
  headline, 
  subheadline,
  primaryCTA 
}: HeroMinimalProps) => {
  // Component implementation
};
```

### 2. Use Design System Components

```tsx
import { Section, Container, Header, Flex } from "@/components/site/ds";
import { Button } from "@/components/ui/button";

export const HeroMinimal = ({ headline, subheadline, primaryCTA }: HeroMinimalProps) => {
  return (
    <Section>
      <Container>
        <Flex direction="column" align="center" className="text-center">
          <Header as="h1">{headline}</Header>
          {subheadline && (
            <p className="text-xl text-muted-foreground max-w-2xl">
              {subheadline}
            </p>
          )}
          {primaryCTA && (
            <Button size="lg" className="mt-8" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
          )}
        </Flex>
      </Container>
    </Section>
  );
};
```

### 3. Content File

```typescript
// content.ts
export const defaultContent = {
  headline: "Build Better Websites",
  subheadline: "Create beautiful, responsive websites with our component library",
  primaryCTA: {
    text: "Get Started",
    href: "/contact"
  }
};
```

### 4. Registry Integration

```typescript
// In registry.ts
import { HeroMinimal } from "./components/hero/hero-minimal";
import { defaultContent } from "./components/hero/hero-minimal/content";

// Add to registry array
{
  name: "Hero Minimal",
  type: "hero",
  slug: "hero-minimal",
  Component: HeroMinimal,
  props: defaultContent
}
```

## Form Component Usage

The Form component is a powerful client-side component that works in Server Components:

```tsx
<Form
  fields={[
    {
      name: "name",
      type: "text",
      label: "Full Name",
      validation: { required: true }
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      validation: { 
        required: true,
        validationType: "email"
      }
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone",
      phoneFormat: "auto", // Auto-formats phone numbers
      validation: {
        required: true,
        validationType: "phone"
      }
    },
    {
      name: "budget",
      type: "range",
      label: "Budget Range",
      min: 1000,
      max: 50000,
      step: 1000,
      showValue: true
    },
    {
      name: "services",
      type: "multiselect",
      label: "Services Needed",
      options: [
        { label: "Web Design", value: "design" },
        { label: "SEO", value: "seo" }
      ]
    },
    {
      name: "urgent",
      type: "yesno",
      label: "Is this urgent?",
      validation: { required: true }
    }
  ]}
  webhookUrl="https://formspree.io/f/YOUR_ID"
  showSuccessMessage={true}
  resetOnSubmit={true}
  submitText="Send Message"
/>
```

## Common Patterns

### Hero Section

```tsx
<Section>
  <Container>
    <Flex direction="column" align="center" className="text-center">
      <Header as="h1">Build Better Products</Header>
      <p className="text-xl text-muted-foreground max-w-2xl">
        The modern way to ship software
      </p>
      <Flex gap={4} className="mt-8">
        <Button size="lg" asChild>
          <Link href="/demo">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/docs">Learn More</a>
        </Button>
      </Flex>
    </Flex>
  </Container>
</Section>
```

### Feature Grid

```tsx
<Section>
  <Container>
    <Header as="h2" className="text-center mb-8">
      Features
    </Header>
    <Grid columns={3}>
      {features.map((feature) => (
        <Card key={feature.id}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </Grid>
  </Container>
</Section>
```

### Side-by-Side Layout

```tsx
<Section>
  <Container>
    <div className="grid items-center gap-8 md:grid-cols-2">
      <Flex direction="column" gap={4}>
        <Header as="h2">Advanced Analytics</Header>
        <p className="text-muted-foreground">
          Get insights into your performance
        </p>
        <div>
          <Button asChild>
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>
      </Flex>
      <div>
        <Image 
          src="/analytics.jpg" 
          alt="Analytics dashboard"
          width={600}
          height={400}
        />
      </div>
    </div>
  </Container>
</Section>
```

## Image Requirements

- Use Next.js Image component
- Default to `/placeholder.webp`
- Always include width, height, and alt text
- Use priority={true} for above-the-fold images

```tsx
import Image from "next/image";

<Image
  src="/placeholder.webp"
  alt="Description"
  width={1200}
  height={600}
  priority
/>
```

## Quality Checklist

- [ ] Uses design system components from `@/components/site/ds`
- [ ] All CTAs are functional with proper href/onClick
- [ ] No React.FC usage
- [ ] All content passed via props
- [ ] TypeScript interfaces with JSDoc comments
- [ ] Responsive on all devices
- [ ] Section/Container WITHOUT padding classes
- [ ] Proper heading hierarchy (one h1)
- [ ] Images use Next.js Image component
- [ ] Added to registry.ts
- [ ] Has defaultContent in content.ts

## Component Types to Build

- **Hero Sections**: Landing page heroes
- **Feature Sections**: Product features
- **CTA Sections**: Call-to-action blocks
- **Pricing Tables**: Pricing plans
- **Testimonials**: Customer reviews
- **FAQ Sections**: Questions and answers
- **Contact Forms**: Lead capture
- **Stats/Metrics**: Numbers and achievements
- **Logo Clouds**: Partner logos
- **Newsletter**: Email signup
- **Blog Sections**: Blog previews
- **Footer Sections**: Site footers

## Do NOT Use (Antipatterns)

1. **React.FC** - Never use function component types
2. **Padding on Section/Container** - They have built-in spacing
3. **Non-functional CTAs** - All buttons must work
4. **Hardcoded text** - Use props for all content
5. **Multiple h1 tags** - One per component
6. **Nested Containers** - One per Section
7. **Old design system** - Use site/ds, not components/ds

## Important Notes

- This is a showcase project for marketing components
- Components are RSC by default (add "use client" only when needed)
- Always prefer existing components from site/ds or shadcn/ui
- Follow the established patterns for consistency
- Run `pnpm lint` before committing