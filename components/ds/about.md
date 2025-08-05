# Design System Documentation v2

A comprehensive, semantic component library built on Tailwind CSS v4 with responsive design, TypeScript support, and pre-built patterns.

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
    <Button size="lg" variant="outline">
      Learn More
    </Button>
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

### Navigation Bar

```tsx
import { Nav, Inline, Heading } from "@/components/ds";
import { Button } from "@/components/ui/button";

<Nav className="border-b">
  <Inline spacing="md" align="center" justify="between">
    <Heading size={4}>Logo</Heading>
    <Inline spacing="lg">
      <Button variant="ghost">Features</Button>
      <Button variant="ghost">Pricing</Button>
      <Button>Get Started</Button>
    </Inline>
  </Inline>
</Nav>
```

## Component Categories

### Core Components (Typography & Content)
- **Heading** - Semantic headings with responsive sizing
- **Text** - Body text with variants
- **Prose** - Rich text content rendering

### Layout Components
- **Section** - Page sections with vertical padding
- **Container** - Centered content with max-width
- **Stack** - Vertical spacing (responsive)
- **Inline** - Horizontal spacing with wrapping
- **Grid** - Responsive grid layouts
- **Nav** - Navigation container

### Utility Components
- **Spacer** - Flexible spacing
- **Divider** - Visual separators
- **Center** - Content centering
- **AspectRatio** - Maintain media ratios

### Pattern Components
- **PageHeader** - Hero sections
- **ContentBlock** - Feature sections
- **ButtonGroup** - Button layouts

## Core Components

### Heading

Semantic heading with automatic sizing and responsive support.

```tsx
// Basic usage
<Heading size={1}>Main Title</Heading>           // <h1>
<Heading size={2} subdued>Section Title</Heading> // <h2> muted
<Heading size={3} centered>Centered Title</Heading>

// Responsive sizes (only Heading supports responsive)
<Heading size={{ base: 3, md: 2, lg: 1 }}>Responsive Title</Heading>
<Heading align={{ base: "center", md: "left" }}>Responsive Alignment</Heading>
```

**Props:**
- `size`: 1-6 (required) - Semantic level and visual size
- `centered`: boolean - Center alignment shorthand
- `subdued`: boolean - Muted color shorthand
- `color`: "default" | "muted"
- `align`: "left" | "center" | "right" (responsive)

### Text

Body text component with multiple variants. **Note: Text does not support responsive props.**

```tsx
<Text>Regular paragraph text</Text>
<Text variant="lead">Intro text that's larger</Text>
<Text variant="small" subdued>Fine print</Text>
<Text variant="code">monospace_code</Text>
<Text variant="link" as="a" href="/docs">Link text</Text>

// Modifiers
<Text weight="semibold">Important note</Text>
<Text centered>Centered text</Text>
```

**Props:**
- `variant`: "body" | "lead" | "small" | "muted" | "code" | "link"
- `centered`: boolean - Center align
- `subdued`: boolean - Muted color
- `weight`: "normal" | "medium" | "semibold" | "bold"
- `as`: HTML element to render

### Prose

Rich text content with automatic styling for HTML elements.

```tsx
// Basic usage
<Prose>
  <h1>Article Title</h1>
  <p>This is a paragraph with <strong>bold text</strong>.</p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
  <blockquote>A thoughtful quote</blockquote>
</Prose>

// As article with spacing
<Prose isArticle isSpaced>
  <h2>Section Title</h2>
  <p>Content with automatic spacing between elements.</p>
</Prose>

// With dangerous HTML
<Prose dangerouslySetInnerHTML={{ __html: markdownContent }} />
```

**Props:**
- `isArticle`: boolean - Renders as `<article>` with max-width
- `isSpaced`: boolean - Adds spacing between elements
- `dangerouslySetInnerHTML`: Render HTML content

## Layout Components

### Section & Container

Page structure components with built-in responsive padding.

```tsx
<Section>  // Adds vertical padding: py-2 sm:py-4
  <Container>  // Max-width with horizontal padding
    {/* Your content */}
  </Container>
</Section>
```

**Padding values:**
- Section: `py-2 sm:py-4` (8px mobile, 16px desktop)
- Container: `max-w-5xl mx-auto p-4 sm:p-6`

### Stack

Vertical spacing with responsive support.

```tsx
// Basic usage
<Stack spacing="md">
  <Heading size={2}>Title</Heading>
  <Text>Description</Text>
  <Button>Action</Button>
</Stack>

// Responsive spacing
<Stack 
  spacing={{ base: "sm", md: "md", lg: "xl" }}
  align={{ base: "center", md: "start" }}
>
  <Heading>Responsive Stack</Heading>
  <Text>Adapts to screen size</Text>
</Stack>

// Compact shorthand
<Stack compact>  // Same as spacing="sm"
  <Badge>New</Badge>
  <Text>Compact spacing</Text>
</Stack>
```

**Props:**
- `spacing`: "sm" | "md" | "lg" | "xl" or custom gap class (responsive)
- `compact`: boolean - Tight spacing shorthand
- `align`: "start" | "center" | "end" | "stretch" (responsive)
- `justify`: "start" | "center" | "end" | "between" | "around" | "evenly" (responsive)

### Inline

Horizontal spacing with automatic wrapping. **Note: Inline does not support responsive props.**

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

// Custom gap
<Inline spacing="gap-1">
  <Chip>Tag 1</Chip>
  <Chip>Tag 2</Chip>
</Inline>
```

**Props:**
- `spacing`: "sm" | "md" | "lg" | "xl" or custom gap class
- `compact`: boolean - Tight spacing
- `align`: "start" | "center" | "end" | "baseline"
- `wrap`: "wrap" | "nowrap" | "reverse"

### Grid

Powerful responsive grid layouts with auto-fit support.

```tsx
// Responsive columns
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Auto-fit with minimum width
<Grid cols="auto-fit" minChildWidth="250px" gap="md">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Grid>

// Different gaps for rows/columns
<Grid cols={3} gapX="sm" gapY="lg">
  {children}
</Grid>

// Grid template areas
<Grid
  areas={[
    "header header header",
    "sidebar main main",
    "footer footer footer"
  ]}
  gap="md"
>
  <div style={{ gridArea: "header" }}>Header</div>
  <div style={{ gridArea: "sidebar" }}>Sidebar</div>
  <div style={{ gridArea: "main" }}>Main Content</div>
  <div style={{ gridArea: "footer" }}>Footer</div>
</Grid>
```

**Props:**
- `cols`: number | "auto-fit" | "auto-fill" (responsive)
- `rows`: number (responsive)
- `gap`: spacing value or custom class (responsive)
- `gapX`/`gapY`: Separate row/column gaps
- `minChildWidth`: Minimum width for auto-fit
- `areas`: Array of template area strings
- `flow`: "row" | "col" | "row-dense" | "col-dense"

### Nav

Navigation container with centered inner content.

```tsx
// Basic navigation
<Nav className="border-b bg-background">
  <Inline justify="between" align="center">
    <Logo />
    <NavigationMenu />
    <UserMenu />
  </Inline>
</Nav>

// With custom container styles
<Nav containerClassName="max-w-7xl">
  {/* Wider navigation content */}
</Nav>
```

**Props:**
- `className`: Styles for nav element
- `containerClassName`: Styles for inner container
- Built-in padding: `px-4 py-2 sm:px-6`

## Utility Components

### Spacer

Flexible spacing utility with responsive support.

```tsx
// Fixed spacing
<Spacer size={4} />         // 16px (1rem)
<Spacer size="lg" />        // Using token

// Responsive spacing
<Spacer size={{ base: 2, md: 4, lg: 8 }} />

// Flexible spacer
<Inline>
  <Button>Left</Button>
  <Spacer grow />
  <Button>Right</Button>
</Inline>

// Horizontal spacer
<Inline align="center">
  <Icon />
  <Spacer size={2} axis="horizontal" />
  <Text>Label</Text>
</Inline>
```

**Props:**
- `size`: number (rem) | token | custom class (responsive)
- `axis`: "horizontal" | "vertical" | "both"
- `grow`: boolean - Fill available space
- `shrink`: boolean - Shrink if needed

### Divider

Visual separation between content sections.

```tsx
// Simple divider
<Divider />

// With text
<Divider>OR</Divider>
<Divider textAlign="left">Section Title</Divider>

// Vertical in flex container
<Inline>
  <span>Option A</span>
  <Divider orientation="vertical" className="h-6" />
  <span>Option B</span>
</Inline>

// Styled variants
<Divider variant="dashed" />
<Divider color="primary" thickness="thick" />
```

**Props:**
- `orientation`: "horizontal" | "vertical"
- `variant`: "solid" | "dashed" | "dotted"
- `thickness`: "thin" | "medium" | "thick"
- `color`: "default" | "muted" | "primary" | "secondary"
- `textAlign`: "left" | "center" | "right"

### Center

Easy content centering with constraints.

```tsx
// Full viewport centering
<Center minH="100vh">
  <Card>Centered Content</Card>
</Center>

// With max width (responsive)
<Center maxW={{ base: "100%", md: "800px" }}>
  <Text>Content won't exceed 800px on desktop</Text>
</Center>

// Text centering
<Center text>
  <Heading>Centered Text</Heading>
  <Text>Also centered</Text>
</Center>

// Inline centering
<Center inline>
  <Icon />
  <span>Centered with icon</span>
</Center>
```

**Props:**
- `maxW`: string | number (responsive)
- `minH`: string | number (responsive)
- `text`: boolean - Add text-align: center
- `direction`: "both" | "horizontal" | "vertical"
- `inline`: boolean - Use inline-flex

### AspectRatio

Maintain consistent aspect ratios for media.

```tsx
// Common presets
<AspectRatio ratio="video">  // 16:9
  <Image src="/thumbnail.jpg" alt="Video" fill />
</AspectRatio>

<AspectRatio ratio="square">  // 1:1
  <Avatar />
</AspectRatio>

// Responsive ratios
<AspectRatio ratio={{ base: "square", md: "video" }}>
  <Image src="/hero.jpg" alt="Hero" fill />
</AspectRatio>

// Custom ratio
<AspectRatio ratio="4/3">
  <video className="h-full w-full object-cover" />
</AspectRatio>

// With iframe
<AspectRatio ratio="video">
  <iframe src="..." className="h-full w-full" />
</AspectRatio>
```

**Presets:**
- `square`: 1:1
- `video`: 16:9
- `wide`: 21:9
- `portrait`: 3:4
- `landscape`: 4:3
- `golden`: 1.618:1

## Pattern Components

Pre-built compositions for common UI patterns.

### PageHeader

Complete page header with title, subtitle, badge, and actions.

```tsx
<PageHeader
  badge="Beta"
  title="Welcome"
  subtitle="Get started in minutes"
  centered
>
  <ButtonGroup>
    <Button size="lg">Start Free</Button>
    <Button size="lg" variant="outline">Learn More</Button>
  </ButtonGroup>
</PageHeader>
```

### ContentBlock

Feature sections with optional image and content.

```tsx
<ContentBlock
  badge="Popular"
  title="Feature Name"
  description="Feature description"
  image="/feature.jpg"
  imagePosition="left"
  buttonText="Learn More"
  buttonHref="/features"
>
  <Stack spacing="sm">
    <Text>✓ Benefit one</Text>
    <Text>✓ Benefit two</Text>
  </Stack>
</ContentBlock>
```

### ButtonGroup

Pre-configured Inline for button layouts.

```tsx
<ButtonGroup spacing="md">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</ButtonGroup>
```

## TypeScript Support

### Responsive Types

```tsx
import type { ResponsiveValue } from "@/components/ds";

// Use for props that support responsive values
type Props = {
  spacing?: ResponsiveValue<"sm" | "md" | "lg">;
  cols?: ResponsiveValue<number>;
};

// Example usage
const spacing: ResponsiveValue<string> = {
  base: "sm",
  md: "md",
  lg: "xl"
};
```

### Component Types

```tsx
import type { DSProps } from "@/components/ds/types";

// Extend for custom components
interface MyComponentProps extends DSProps {
  customProp?: string;
}
```

## Responsive Utilities

### Hooks

```tsx
import { useBreakpoint, useResponsive } from "@/components/ds";

// Get current breakpoint
const breakpoint = useBreakpoint(); // "base" | "sm" | "md" | "lg" | "xl" | "2xl"

// Get responsive value for current breakpoint
const spacing = useResponsive({
  base: "sm",
  md: "md",
  lg: "xl"
}); // Returns appropriate value for current screen size
```

### Responsive Helper

```tsx
import { responsive, isResponsiveValue } from "@/components/ds";

// Check if value is responsive
if (isResponsiveValue(props.size)) {
  // Handle responsive value
}

// Convert to Tailwind classes
const classes = responsive(
  { base: 2, md: 4, lg: 6 },
  (v) => `gap-${v}`
); // "gap-2 md:gap-4 lg:gap-6"
```

## Design Tokens

Minimal, essential tokens for consistency:

```tsx
import { spacing, breakpoints, radius, transitions } from "@/components/ds/tokens";

// Available tokens:
// spacing: none, xs, sm, md, lg, xl, 2xl, 3xl
// radius: none, sm, md, lg, xl, 2xl, full
// transitions: fast, base, slow

// Example usage:
const customStyles = {
  padding: spacing.md,     // "1rem"
  borderRadius: radius.lg, // "0.5rem"
  transition: `all ${transitions.base}`,
};
```

## Import Guide

```tsx
// Core components
import {
  Section,
  Container,
  Stack,
  Inline,
  Heading,
  Text,
  Prose,
  Grid,
  Nav,
  Divider,
  Spacer,
  Center,
  AspectRatio,
} from "@/components/ds";

// Pattern components
import {
  PageHeader,
  ContentBlock,
  ButtonGroup,
} from "@/components/ds/patterns";

// Utilities and types
import {
  type ResponsiveValue,
  responsive,
  isResponsiveValue,
  useBreakpoint,
  useResponsive,
} from "@/components/ds";

// UI components (shadcn)
import { Button, Card, Badge } from "@/components/ui";
```

## Best Practices

1. **Use semantic Heading sizes** - Size 1 for main titles, 2 for sections, etc.
2. **Let Stack/Inline handle spacing** - Don't add margins manually
3. **Use convenience props** - `centered` and `subdued` are cleaner
4. **Section + Container for structure** - They handle responsive padding
5. **Check responsive support** - Only some components support responsive props:
   - ✅ Responsive: Heading, Stack, Grid, Center, AspectRatio, Spacer
   - ❌ Fixed: Text, Inline, Nav, Divider, Prose
6. **Use patterns for common UI** - PageHeader, ContentBlock save time
7. **Never add padding to Section/Container** - They have built-in spacing

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
      <PageHeader title="Features" subtitle="Everything you need" centered />
      
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <Heading size={3}>{feature.title}</Heading>
            </CardHeader>
            <CardContent>
              <Text subdued>{feature.description}</Text>
            </CardContent>
          </Card>
        ))}
      </Grid>
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

## Migration Guide

### From v1 to v2

```tsx
// Old: level prop
<Heading level={1}>Title</Heading>

// New: size prop
<Heading size={1}>Title</Heading>

// Old: Many spacing options
<Stack spacing="2xl">

// New: Simplified to 4 options or custom
<Stack spacing="xl">  // or
<Stack spacing="gap-12">

// Old: Verbose props
<Heading align="center" color="muted">

// New: Convenience props
<Heading centered subdued>
```