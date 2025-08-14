# Site Component Library Instructions

## Overview

This component library provides a set of React components designed for building clean, consistent websites. All components use Tailwind CSS for styling and accept common props for customization.

**Important**: This project uses shadcn/ui. You have access to ALL shadcn components (Button, Card, Dialog, Form, etc.) in addition to these custom site components. Always prefer using existing components from this design system or shadcn/ui rather than creating new ones.

## Design System Guidelines

1. **Always use existing components** - Never create custom components if one already exists in this library or shadcn/ui
2. **Maintain consistency** - Follow the established patterns and styling conventions
3. **Use the design tokens** - Stick to the predefined spacing (gap-4), container widths (max-w-5xl), and typography scales
4. **Prefer composition** - Build complex layouts by composing these simple components rather than writing custom CSS
5. **Respect the system** - Don't override core styles unless absolutely necessary
6. **NEVER add padding or height to Section or Container** - These components have default padding built in. Use them as-is without adding py-, px-, p-, h-, min-h-, or max-h- classes

## Import Statements

```tsx
// Site components
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

// shadcn/ui components (examples)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// ... any other shadcn component
```

## Components

### Layout Components

#### Main

Wraps the main content area of your page. Uses the default shadcn/ui color system.

```tsx
<Main className="min-h-screen">{/* Page content */}</Main>
```

#### Nav (Optional for Landing Pages)

Navigation wrapper with built-in container constraints. **Not required for landing pages** - many high-converting landing pages work better without navigation to reduce distractions and keep users focused on the main CTA.

```tsx
<Nav containerClassName="flex justify-between items-center">
  {/* Navigation items */}
</Nav>
```

**Landing Page Best Practice**: Consider skipping Nav for focused landing pages where you want users to complete a specific action.

#### Section

Semantic section wrapper with vertical padding (py-2 sm:py-4 built-in).
**DO NOT add padding or height classes** - use the defaults.

```tsx
<Section> {/* No padding or height classes */}
  <Container>{/* Section content */}</Container>
</Section>

<Section className="bg-muted"> {/* Only add background colors, not padding/height */}
  <Container>{/* Section content */}</Container>
</Section>
```

#### Container

Centers content with max-width constraint (max-w-5xl) and padding (p-4 sm:p-6 built-in).
**DO NOT add padding or height classes** - use the defaults.

```tsx
<Container>{/* Contained content - padding is already applied */}</Container>
```

### Typography Components

#### Header

Dynamic heading component that renders h1-h6 based on the `as` prop.

```tsx
<Header as="h1">Page Title</Header>
<Header as="h2" className="text-muted-foreground">Subtitle</Header>
```

#### Prose

Rich text wrapper that styles all child HTML elements (paragraphs, lists, links, etc.).

```tsx
<Prose isArticle isSpaced>
  <h1>Article Title</h1>
  <p>This content will be automatically styled.</p>
  <ul>
    <li>Lists get custom bullets</li>
    <li>Links are styled</li>
  </ul>
</Prose>
```

Props:

- `isArticle`: Renders as `<article>` tag and adds max-width for readability
- `isSpaced`: Adds proper spacing between elements

### Layout Components

#### Grid

Responsive grid layout with automatic breakpoints and customizable gap.

```tsx
<Grid columns={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

<Grid columns={2} gap={6}> {/* Custom gap size */}
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

Props:

- `columns` (1-4) - Responsive columns:
  - 1 column: Always single column
  - 2 columns: 1 on mobile, 2 on sm+
  - 3 columns: 1 on mobile, 2 on sm, 3 on lg+
  - 4 columns: 1 on mobile, 2 on sm, 4 on lg+
- `gap` (0|1|2|3|4|5|6|8|10|12) - Gap between items, defaults to 4

#### Flex

Flexible box layout with customizable gap spacing.

```tsx
<Flex justify="between" align="center">
  <div>Left content</div>
  <div>Right content</div>
</Flex>

<Flex direction="column" gap={2}> {/* Tighter spacing */}
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

<Flex direction="column" className="md:flex-row">
  <div>Responsive flex direction</div>
  <div>Second item</div>
</Flex>
```

Props:

- `direction`: "row" | "column" | "row-reverse" | "column-reverse"
- `wrap`: boolean for flex-wrap
- `justify`: "start" | "end" | "center" | "between" | "around" | "evenly"
- `align`: "start" | "end" | "center" | "baseline" | "stretch"
- `gap` (0|1|2|3|4|5|6|8|10|12) - Gap between items, defaults to 4

## Common Props

All components accept:

- `className`: Additional Tailwind classes
- `id`: HTML id attribute
- `style`: Inline styles
- `children`: React children

## Usage Patterns

### Basic Page Structure

```tsx
<Main>
  <Nav>
    <Container>
      <Flex justify="between" align="center">
        <Header as="h3">Logo</Header>
        <Flex gap={6}>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </Flex>
      </Flex>
    </Container>
  </Nav>

  <Section>
    <Container>
      <Header as="h1">Welcome</Header>
      <Prose>
        <p>Your content here...</p>
      </Prose>
    </Container>
  </Section>
</Main>
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
        <div key={feature.id}>
          <Header as="h3">{feature.title}</Header>
          <p>{feature.description}</p>
        </div>
      ))}
    </Grid>
  </Container>
</Section>
```

### Article Layout

```tsx
<Main>
  <Section>
    <Container>
      <Prose isArticle isSpaced>
        <h1>{article.title}</h1>
        <p className="lead">{article.description}</p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </Prose>
    </Container>
  </Section>
</Main>
```

## Best Practices

1. **Use semantic components**: Choose `Section`, `Nav`, and `Main` for better HTML structure
2. **Combine with Container**: Most sections should have a Container child for consistent spacing
3. **Header component for all headings**: Use the Header component with appropriate `as` prop instead of raw h1-h6
4. **Prose for rich text**: Wrap any user-generated or markdown content in Prose
5. **Grid for equal items**: Use Grid when items should be equal width
6. **Flex for unequal layouts**: Use Flex when you need more control over item sizing
7. **Override with className**: All components accept className for customization
8. **Use shadcn components**: For buttons, cards, forms, dialogs, etc., always use shadcn/ui components
9. **Stay within the system**: Don't create custom components when existing ones will work
10. **Consistent spacing**: Use the default gap-4 spacing unless there's a specific design requirement

## Responsive Design

- Components are mobile-first
- Breakpoints follow Tailwind defaults (sm: 640px, md: 768px, lg: 1024px)
- Grid and typography scale automatically
- Use className to add responsive utilities as needed

## Examples for AI - IMPORTANT: Follow These Patterns

### ⚠️ CRITICAL: Design System Usage Rules

- **NEVER create custom components** if one exists in this library or shadcn/ui
- **ALWAYS use the provided components** for consistency
- **STICK to the design system** spacing, typography, and layout patterns
- **COMBINE components** rather than writing custom HTML/CSS
- **NEVER add padding or height to Section or Container** - Use defaults only (Section: py-2 sm:py-4, Container: p-4 sm:p-6)
- **ALWAYS make CTAs functional** - Every button must have proper href, onClick, or form submission

### 🔗 CRITICAL: CTA and Button Guidelines

**All CTAs and buttons MUST be functional and clickable:**

#### Primary CTAs - Use Next.js Link or href

```tsx
import Link from "next/link"

// Internal navigation
<Button asChild size="lg">
  <Link href="/contact">Get Started</Link>
</Button>

// External links
<Button asChild size="lg">
  <a href="https://calendly.com/yourname/demo" target="_blank" rel="noopener noreferrer">
    Book Demo
  </a>
</Button>

// Email links
<Button asChild size="lg">
  <a href="mailto:hello@company.com">Contact Us</a>
</Button>

// Phone links
<Button asChild size="lg">
  <a href="tel:+1-555-123-4567">Call Now</a>
</Button>
```

#### Form Submit Buttons - Use form submission

```tsx
// Form submission button (automatically functional with Form component)
<Form
  fields={fields}
  webhookUrl="https://your-webhook.com"
  submitText="Get Free Quote" // This becomes a functional submit button
/>
```

#### Scroll-to-Section CTAs

```tsx
// Smooth scroll to section
<Button
  size="lg"
  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
>
  View Pricing
</Button>

// Or add id to target section
<Section id="pricing">
  <Container>
    {/* Pricing content */}
  </Container>
</Section>
```

#### Secondary Actions

```tsx
// Download links
<Button variant="outline" asChild>
  <a href="/brochure.pdf" download>Download Brochure</a>
</Button>

// Social links
<Button variant="outline" asChild>
  <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
    Follow on Twitter
  </a>
</Button>
```

#### ❌ NEVER do this (non-functional buttons):

```tsx
// DON'T - Button without action
<Button size="lg">Get Started</Button>

// DON'T - Link without href
<a>Contact Us</a>

// DON'T - Placeholder text
<Button>Coming Soon</Button>
```

### Landing Page Examples with Functional CTAs

#### Option 1: Landing Page without Navigation (Recommended for focus)

```tsx
import Link from "next/link";

<Main>
  {/* No Nav component - reduces distractions */}

  {/* Hero section with functional CTA */}
  <Section>
    <Container>
      <Flex direction="column" align="center" className="text-center">
        <Header as="h1">Build Better Websites</Header>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Create beautiful, responsive websites with our component library
        </p>

        {/* Functional CTA - links to contact form */}
        <Button size="lg" className="mt-8" asChild>
          <Link href="/contact">Get Started Free</Link>
        </Button>

        {/* Secondary CTA */}
        <Button variant="outline" className="mt-4" asChild>
          <a
            href="https://demo.yoursite.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Demo
          </a>
        </Button>
      </Flex>
    </Container>
  </Section>

  {/* Features with scroll CTA */}
  <Section>
    <Container>
      <Grid columns={3}>
        <Card>
          <CardHeader>
            <CardTitle>Fast</CardTitle>
            <CardDescription>Optimized for performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lightning fast load times</p>
          </CardContent>
        </Card>
        {/* More cards... */}
      </Grid>

      {/* Scroll to pricing CTA */}
      <Flex justify="center" className="mt-8">
        <Button
          size="lg"
          onClick={() =>
            document
              .getElementById("pricing")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View Pricing
        </Button>
      </Flex>
    </Container>
  </Section>

  {/* Pricing section */}
  <Section id="pricing">
    <Container>
      {/* Pricing content with functional CTAs */}
      <Button size="lg" asChild>
        <a href="mailto:sales@company.com?subject=Pricing Inquiry">
          Contact Sales
        </a>
      </Button>
    </Container>
  </Section>
</Main>;
```

#### Option 2: Landing Page with Minimal Navigation

```tsx
<Main>
  {/* Minimal nav with only logo and CTA */}
  <Nav>
    <Container>
      <Flex justify="between" align="center">
        <Header as="h3">Logo</Header>
        <Button asChild>
          <Link href="/contact">Get Started</Link>
        </Button>
      </Flex>
    </Container>
  </Nav>

  {/* Rest of landing page content... */}
</Main>
```

When building a blog post:

```tsx
<Main>
  <Section>
    <Container>
      <article className="mx-auto max-w-3xl">
        <Header as="h1" className="mb-4">
          {post.title}
        </Header>
        <Flex className="text-sm text-muted-foreground mb-8">
          <time>{post.date}</time>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </Flex>
        <Prose isArticle isSpaced>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Prose>
      </article>
    </Container>
  </Section>
</Main>
```

### Form Component (Client-Side)

A flexible, client-side form component configured entirely through props with built-in webhook support.

**Server Component Compatible**: The Form component can be used directly in Server Components by passing a `webhookUrl` instead of an `onSubmit` function. The form will handle submission internally.

```tsx
// For Server Components - use webhookUrl (no functions needed!)
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
      label: "Email Address",
      placeholder: "you@example.com",
      validation: {
        required: true,
        validationType: "email", // Use this instead of RegExp pattern
        message: "Please enter a valid email"
      }
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      rows: 5,
      validation: { required: true, minLength: 10 }
    }
  ]}
  webhookUrl="https://hooks.zapier.com/hooks/catch/123456/abcdef"
  // or webhookUrl="https://formspree.io/f/YOUR_FORM_ID"
  // or webhookUrl="/api/contact" for local API routes
  showSuccessMessage={true}
  resetOnSubmit={true}
  submitText="Send Message"
/>

// Alternative: Use string patterns (works in Server Components)
validation: {
  pattern: "^[a-zA-Z0-9]+$", // String pattern instead of RegExp
  message: "Only alphanumeric characters allowed"
}
```

#### Field Types

- `text`, `email`, `password`, `number`, `url` - Standard inputs
- `tel` - Phone number input with automatic formatting
- `textarea` - Multi-line text
- `select` - Dropdown with options
- `multiselect` - Multi-selection with checkboxes and badges
- `checkbox` - Single checkbox
- `radio` - Radio button group
- `yesno` - Large side-by-side Yes/No buttons (perfect for mobile)
- `range` - Slider for numeric ranges with optional value display
- `file` - File upload (with accept and multiple options)
- `date`, `time`, `datetime-local` - Date/time inputs

#### Validation Options

- `required` - Field must have a value
- `minLength`/`maxLength` - String length constraints
- `min`/`max` - Number value constraints
- `validationType` - Built-in patterns: "email" | "url" | "phone" | "alphanumeric" | "numeric"
- `pattern` - RegExp or string pattern (string patterns work in Server Components)
- `custom` - Custom validation function (Client Components only)
- `matches` - Field name to match (for password confirmation)
- `matchMessage` - Custom message for match validation
- `message` - Custom error message

#### Form Props

- `fields` - Array of field configurations
- `webhookUrl` - URL to submit form data to (for Server Components)
- `webhookMethod` - HTTP method for webhook (POST, PUT, PATCH)
- `webhookHeaders` - Custom headers for webhook request
- `onSubmit` - Submit handler function (Client Components only)
- `columns` (1|2) - Layout in columns
- `gap` - Spacing between fields
- `loading`/`disabled` - Form states
- `showLabels`/`inlineErrors` - Display options
- `successMessage` - Message to show on successful submission
- `showSuccessMessage` - Whether to show success message
- `resetOnSubmit` - Reset form after successful submission
- `onSuccess` - Callback after successful submission
- `errorMessage` - Custom error message for failed submissions
- `redirectUrl` - URL to redirect to after successful submission
- `redirectDelay` - Delay in milliseconds before redirecting (default: 0)

#### Advanced Features

##### Field Dependencies

Show/hide fields based on other field values:

```tsx
{
  name: "hasAccount",
  type: "checkbox",
  label: "I have an account"
},
{
  name: "password",
  type: "password",
  label: "Password",
  dependsOn: {
    field: "hasAccount",
    value: true,
    condition: "equals" // equals | not-equals | contains | not-empty
  }
}
```

##### Password Confirmation

Use the `matches` validation to confirm passwords:

```tsx
{
  name: "password",
  type: "password",
  label: "Password",
  validation: { required: true, minLength: 8 }
},
{
  name: "confirmPassword",
  type: "password",
  label: "Confirm Password",
  validation: {
    required: true,
    matches: "password",
    matchMessage: "Passwords must match"
  }
}
```

##### File Upload

Handle file uploads with validation:

```tsx
{
  name: "avatar",
  type: "file",
  label: "Profile Picture",
  accept: "image/*",
  multiple: false,
  validation: { required: true }
}
```

##### New Field Types for Landing Pages

###### Multi-Select Field

Perfect for services, interests, or skills selection:

```tsx
{
  name: "services",
  type: "multiselect",
  label: "Which services do you need?",
  validation: { required: true },
  options: [
    { label: "Web Design", value: "web-design" },
    { label: "SEO Optimization", value: "seo" },
    { label: "Content Marketing", value: "content" },
    { label: "Social Media", value: "social" }
  ]
}
```

Features:

- Visual checkboxes with hover states
- Selected items shown as removable badges below
- Returns array of selected values
- Perfect for lead qualification

###### Range/Slider Field

Ideal for budgets, quantities, or ratings:

```tsx
{
  name: "budget",
  type: "range",
  label: "What's your budget range?",
  min: 1000,
  max: 50000,
  step: 1000,
  showValue: true, // Shows current value between min/max
  defaultValue: 10000,
  validation: { required: true }
}
```

Features:

- Smooth slider interaction
- Optional value display with min/max labels
- Great for mobile touch interaction
- Perfect for budget/pricing forms

###### Yes/No Button Field

Large, mobile-friendly binary choice buttons:

```tsx
{
  name: "military_service",
  type: "yesno",
  label: "Did you or a loved one serve in the military?",
  yesLabel: "Yes", // Optional, defaults to "Yes"
  noLabel: "No",   // Optional, defaults to "No"
  validation: { required: true }
}
```

Features:

- Large buttons (h-14) perfect for mobile tapping
- Side-by-side layout
- Visual selection state with ring highlight
- Returns `true` for yes, `false` for no, `null` for unselected
- Ideal for qualification questions

###### Phone Number Field

Automatically formats phone numbers with real-time formatting:

```tsx
{
  name: "phone",
  type: "tel",
  label: "Phone Number",
  phoneFormat: "auto", // "us" | "international" | "auto"
  placeholder: "(555) 123-4567", // Auto-generated based on format
  validation: {
    required: true,
    validationType: "phone" // Built-in phone validation
  }
}
```

Features:

- **Real-time formatting**: User types `5551234567` → displays `(555) 123-4567`
- **Smart format detection**: Auto-detects US vs international based on `+` prefix
- **Format options**:
  - `"us"`: Forces US format `(555) 123-4567`
  - `"international"`: Forces international format `+1 (555) 123-4567`
  - `"auto"`: Auto-detects format (default)
- **Clean data storage**: Stores raw numbers for validation and submission
- **Paste support**: Handles pasted formatted or unformatted numbers
- **Mobile optimized**: Uses `type="tel"` for proper mobile keyboards

##### Landing Page Form Examples

###### Lead Qualification Form

```tsx
<Form
  fields={[
    {
      name: "company",
      type: "text",
      label: "Company Name",
      validation: { required: true },
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      phoneFormat: "auto",
      validation: {
        required: true,
        validationType: "phone",
      },
    },
    {
      name: "budget",
      type: "range",
      label: "Monthly Budget",
      min: 1000,
      max: 25000,
      step: 1000,
      showValue: true,
      defaultValue: 5000,
    },
    {
      name: "services",
      type: "multiselect",
      label: "Services Needed",
      validation: { required: true },
      options: [
        { label: "Website Design", value: "design" },
        { label: "SEO", value: "seo" },
        { label: "Paid Advertising", value: "ads" },
        { label: "Content Creation", value: "content" },
      ],
    },
    {
      name: "timeline",
      type: "select",
      label: "When do you want to start?",
      validation: { required: true },
      options: [
        { label: "Immediately", value: "asap" },
        { label: "Within 1 month", value: "1month" },
        { label: "1-3 months", value: "quarter" },
        { label: "Just exploring", value: "exploring" },
      ],
    },
    {
      name: "previous_experience",
      type: "yesno",
      label: "Have you worked with a marketing agency before?",
      validation: { required: true },
    },
  ]}
  webhookUrl="https://your-webhook.com/leads"
  showSuccessMessage={true}
  resetOnSubmit={true}
  submitText="Get Free Consultation"
/>
```

###### Service Calculator Form

```tsx
<Form
  fields={[
    {
      name: "project_size",
      type: "range",
      label: "Number of pages needed",
      min: 1,
      max: 50,
      step: 1,
      showValue: true,
      defaultValue: 5,
    },
    {
      name: "features",
      type: "multiselect",
      label: "Required features",
      options: [
        { label: "E-commerce", value: "ecommerce" },
        { label: "Blog", value: "blog" },
        { label: "Contact Forms", value: "forms" },
        { label: "User Accounts", value: "users" },
        { label: "Payment Processing", value: "payments" },
      ],
    },
    {
      name: "mobile_first",
      type: "yesno",
      label: "Is mobile experience your priority?",
      validation: { required: true },
    },
    {
      name: "timeline",
      type: "range",
      label: "Timeline (weeks)",
      min: 2,
      max: 20,
      step: 1,
      showValue: true,
      defaultValue: 8,
    },
  ]}
  webhookUrl="/api/calculate-quote"
  submitText="Get Instant Quote"
/>
```

###### Contact Form with Phone Formatting

Perfect example showcasing phone number formatting:

```tsx
<Form
  fields={[
    {
      name: "name",
      type: "text",
      label: "Full Name",
      validation: { required: true },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      validation: {
        required: true,
        validationType: "email",
      },
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      phoneFormat: "us", // Force US format for local business
      validation: {
        required: true,
        validationType: "phone",
        message: "Please enter a valid phone number",
      },
    },
    {
      name: "preferred_contact",
      type: "yesno",
      label: "Prefer to be contacted by phone?",
      yesLabel: "Yes, call me",
      noLabel: "Email is fine",
    },
    {
      name: "urgency",
      type: "range",
      label: "How urgent is your need? (1-10)",
      min: 1,
      max: 10,
      step: 1,
      showValue: true,
      defaultValue: 5,
    },
    {
      name: "message",
      type: "textarea",
      label: "Tell us about your project",
      rows: 4,
      validation: {
        required: true,
        minLength: 20,
      },
    },
  ]}
  columns={2} // Two-column layout on larger screens
  webhookUrl="https://formspree.io/f/YOUR_ID"
  showSuccessMessage={true}
  successMessage="Thanks! We'll get back to you within 24 hours."
  resetOnSubmit={true}
  submitText="Send Message"
/>
```

##### Success States

Show success message and reset form:

```tsx
<Form
  fields={fields}
  webhookUrl="https://your-webhook-url.com"
  showSuccessMessage={true}
  successMessage="Thank you! Your form has been submitted."
  resetOnSubmit={true}
/>
```

##### Redirect After Submission

Redirect users to a thank you page or other destination after successful form submission:

```tsx
<Form
  fields={fields}
  webhookUrl="https://your-webhook-url.com"
  redirectUrl="/thank-you"
  redirectDelay={1000} // Optional: wait 1 second before redirecting
  showSuccessMessage={true} // Shows message before redirecting
  successMessage="Success! Redirecting..."
/>

// Immediate redirect without showing success message
<Form
  fields={fields}
  webhookUrl="https://your-webhook-url.com"
  redirectUrl="/thank-you"
  showSuccessMessage={false}
/>
```

##### Webhook Integration (Server Component Safe)

Use the Form component in Server Components without any wrapper:

```tsx
// page.tsx (Server Component)
export default function ContactPage() {
  return (
    <Form
      fields={[
        {
          name: "email",
          type: "email",
          label: "Email",
          validation: { required: true, validationType: "email" },
        },
        {
          name: "message",
          type: "textarea",
          label: "Message",
          validation: { required: true },
        },
      ]}
      webhookUrl="https://formspree.io/f/YOUR_ID"
      // Common webhook services:
      // - Formspree: https://formspree.io/f/YOUR_FORM_ID
      // - Zapier: https://hooks.zapier.com/hooks/catch/...
      // - Make (Integromat): https://hook.integromat.com/...
      // - n8n: https://your-n8n-instance.com/webhook/...
      webhookMethod="POST"
      webhookHeaders={{ "X-Custom-Header": "value" }}
      showSuccessMessage={true}
      resetOnSubmit={true}
    />
  );
}
```

## Component Combinations with shadcn/ui

### Navigation with shadcn components

```tsx
<Nav>
  <Container>
    <Flex justify="between" align="center">
      <Header as="h3">Logo</Header>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Flex>
  </Container>
</Nav>
```

### Forms with shadcn components

```tsx
<Section>
  <Container>
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <Form>
          <div className="space-y-4">
            <Input placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Message" />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  </Container>
</Section>
```

## Final Reminder

**You are building within an established design system.** Every decision should respect the existing components and patterns. Before creating anything custom, check if:

1. This site component library has what you need
2. shadcn/ui has a component for it
3. You can compose existing components to achieve the goal

Only as a last resort should you write custom components or styles.
