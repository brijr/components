# AI Page Builder Architecture Overview

## Executive Summary

This document outlines the architecture and implementation strategy for transforming a Next.js component gallery into a JSON schema-driven AI page builder. The system leverages an existing registry of 80+ marketing components to enable dynamic page generation through AI or manual composition.

## Project Vision

Build an AI-powered page builder that:
- Generates complete marketing websites from natural language prompts
- Renders pages dynamically from JSON schemas
- Maintains design consistency through a robust design system
- Enables both AI and manual page composition
- Provides real-time preview and editing capabilities

## Current Architecture Strengths

### 1. Component Registry System
- **80+ pre-built components** organized by type (hero, features, pricing, etc.)
- **Centralized registry** (`registry.ts`) with metadata for each component
- **Type-safe** TypeScript interfaces for all components
- **Content separation** via dedicated `content.ts` files

### 2. Design System Excellence
- **Clean, modern aesthetic** with no drop shadows
- **Consistent spacing** system (gap-4, gap-6, gap-8)
- **Responsive by default** with mobile-first approach
- **Semantic components** (Section, Container, Flex, Grid, Header)

### 3. Component Architecture
- **Prop-driven** components with no hardcoded content
- **JSON schemas** already defined for each component
- **Accessibility** built-in via Radix UI primitives
- **Clean visual hierarchy** without shadows or excessive effects

## Transformation Strategy

### Phase 1: Schema Enhancement (Week 1-2)

#### Enhanced Component Schema
```typescript
export interface AIComponentSchema {
  // Existing component props
  props: ComponentProps;
  
  // AI-specific metadata
  ai: {
    category: string;
    tags: string[];
    complexity: 'simple' | 'moderate' | 'complex';
    compatibleWith: string[];
    conflictsWith: string[];
    commonUseCases: string[];
    contentGeneration: {
      tone: string[];
      industry: string[];
      prompts: string[];
    };
  };
}
```

#### Page Composition Schema
```typescript
export interface PageSchema {
  id: string;
  title: string;
  description: string;
  sections: Array<{
    componentSlug: string;  // References registry
    props: any;             // Component-specific props
    order: number;          // Display order
    variants?: {
      mobile?: any;
      tablet?: any;
    };
  }>;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    generatedBy: 'ai' | 'manual';
    prompt?: string;
  };
}
```

### Phase 2: Page Rendering Engine (Week 2-3)

#### Dynamic Page Renderer
```typescript
// lib/page-renderer.tsx
export function PageRenderer({ schema }: { schema: PageSchema }) {
  return (
    <>
      {schema.sections
        .sort((a, b) => a.order - b.order)
        .map(section => {
          const component = registry.find(r => r.slug === section.componentSlug);
          if (!component) return null;
          
          return (
            <ComponentWrapper key={section.componentSlug}>
              <component.Component {...section.props} />
            </ComponentWrapper>
          );
        })}
    </>
  );
}
```

#### API Routes for Schema Management
```typescript
// app/api/pages/route.ts
// GET: List all saved page schemas
// POST: Create new page schema

// app/api/pages/[id]/route.ts  
// GET: Retrieve specific page schema
// PUT: Update page schema
// DELETE: Remove page schema

// app/api/generate/route.ts
// POST: Generate page schema from AI prompt
```

### Phase 3: AI Integration (Week 3-4)

#### AI Generation Service
```typescript
// lib/ai-generator.ts
export class AIPageGenerator {
  async generateFromPrompt(prompt: string): Promise<PageSchema> {
    // 1. Analyze prompt intent
    const intent = await this.analyzeIntent(prompt);
    
    // 2. Select appropriate components
    const components = this.selectComponents(intent);
    
    // 3. Generate content for each component
    const sections = await this.generateSections(components, intent);
    
    // 4. Optimize layout and ordering
    const optimizedSections = this.optimizeLayout(sections);
    
    // 5. Return complete page schema
    return {
      id: generateId(),
      title: intent.title,
      description: intent.description,
      sections: optimizedSections,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        generatedBy: 'ai',
        prompt
      }
    };
  }
}
```

#### Component Intelligence System
```typescript
// lib/component-intelligence.ts
export const componentRelationships = {
  'hero-minimal': {
    naturallyFollowedBy: ['feature-grid', 'stats-simple'],
    worksWellWith: ['cta-simple', 'testimonial-grid'],
    avoidWith: ['hero-with-image'], // Don't use multiple heroes
    requiredBefore: [], // No prerequisites
    semanticRole: 'introduction',
    pagePosition: 'top'
  },
  // ... for all components
};
```

### Phase 4: Builder Interface (Week 4-5)

#### Visual Page Builder
```typescript
// app/builder/page.tsx
export default function PageBuilder() {
  const [schema, setSchema] = useState<PageSchema>();
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  
  return (
    <div className="flex h-screen">
      {/* Component Palette */}
      <aside className="w-80 border-r">
        <ComponentPalette 
          onSelect={(component) => addToSchema(component)}
        />
      </aside>
      
      {/* Canvas */}
      <main className="flex-1 overflow-auto">
        {mode === 'edit' ? (
          <EditablePageRenderer 
            schema={schema}
            onChange={setSchema}
          />
        ) : (
          <PageRenderer schema={schema} />
        )}
      </main>
      
      {/* Properties Panel */}
      <aside className="w-80 border-l">
        <PropertiesPanel
          selectedComponent={selectedComponent}
          onChange={updateComponent}
        />
      </aside>
    </div>
  );
}
```

## Implementation Architecture

### Core Systems

#### 1. Schema Management
- **Validation**: Zod schemas for runtime validation
- **Storage**: PostgreSQL with Prisma ORM
- **Caching**: Redis for frequently accessed schemas
- **Versioning**: Schema version history and rollback

#### 2. Component System
- **Registry**: Central component registry with metadata
- **Lazy Loading**: Dynamic imports for performance
- **Variants**: Responsive and theme variants
- **Composition**: Nested component support

#### 3. AI Integration
- **OpenAI GPT-4**: For content generation
- **Claude API**: For component selection logic
- **Prompt Engineering**: Structured prompts for consistency
- **Fine-tuning**: Custom models for specific industries

#### 4. State Management
```typescript
// lib/stores/page-builder.ts
interface PageBuilderStore {
  // Current page
  schema: PageSchema | null;
  selectedSection: string | null;
  
  // Editor state
  mode: 'edit' | 'preview';
  device: 'mobile' | 'tablet' | 'desktop';
  
  // Actions
  addSection: (component: string, props: any) => void;
  updateSection: (id: string, props: any) => void;
  removeSection: (id: string) => void;
  reorderSections: (from: number, to: number) => void;
  
  // AI actions
  generatePage: (prompt: string) => Promise<void>;
  regenerateSection: (id: string, prompt: string) => Promise<void>;
}
```

## Technical Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI + shadcn/ui
- **State**: Zustand
- **Validation**: Zod
- **Database**: PostgreSQL + Prisma

### AI Technologies
- **LLMs**: OpenAI GPT-4, Anthropic Claude
- **Embeddings**: OpenAI text-embedding-3
- **Vector DB**: Pinecone for semantic search
- **Streaming**: Vercel AI SDK

### Developer Tools
- **DX**: Hot reload, TypeScript, ESLint
- **Testing**: Vitest, React Testing Library
- **Monitoring**: Vercel Analytics, Sentry
- **CI/CD**: GitHub Actions, Vercel

## Component Strategy

### Current Components (Keep)
- **Marketing Sections**: Hero, Features, Pricing, Testimonials
- **Content Blocks**: FAQ, Blog, Newsletter
- **Navigation**: Header, Footer
- **CTAs**: Various call-to-action patterns

### New Additions Needed
- **Layout Components**: Spacer, Divider, Grid variants
- **Micro Components**: Badge, Avatar, Icon
- **Dynamic Components**: Tabs, Accordion, Carousel
- **Form Components**: Extended form fields

## API Design

### RESTful Endpoints
```typescript
// Page Management
GET    /api/pages              // List pages
POST   /api/pages              // Create page
GET    /api/pages/:id          // Get page
PUT    /api/pages/:id          // Update page
DELETE /api/pages/:id          // Delete page

// AI Generation
POST   /api/generate/page      // Generate full page
POST   /api/generate/section   // Generate single section
POST   /api/generate/content   // Generate content only

// Component Registry
GET    /api/components         // List all components
GET    /api/components/:slug   // Get component details
GET    /api/components/schema  // Get all JSON schemas
```

### WebSocket Events
```typescript
// Real-time collaboration
socket.on('page:update', (data) => { /* Handle update */ });
socket.on('section:add', (data) => { /* Handle addition */ });
socket.on('section:remove', (data) => { /* Handle removal */ });
socket.on('preview:refresh', (data) => { /* Refresh preview */ });
```

## Deployment Strategy

### Environment Setup
```bash
# Development
npm run dev         # Local development
npm run build       # Production build
npm run preview     # Preview production build

# Testing
npm run test        # Unit tests
npm run e2e         # End-to-end tests
npm run type-check  # TypeScript validation

# Deployment
npm run deploy:staging     # Deploy to staging
npm run deploy:production  # Deploy to production
```

### Infrastructure
- **Hosting**: Vercel (Next.js optimized)
- **Database**: Vercel Postgres or Supabase
- **CDN**: Vercel Edge Network
- **Storage**: AWS S3 for assets
- **Queue**: Vercel Queue for AI jobs

## Success Metrics

### Technical Metrics
- Page load time < 2s
- Time to interactive < 3s
- Lighthouse score > 95
- Component render time < 50ms

### Business Metrics
- Page generation time < 10s
- AI accuracy > 85%
- User satisfaction > 4.5/5
- Component reusability > 70%

## Competitive Advantages

### vs Builder.io
- **Cleaner design system** with no shadows
- **More opinionated** for better consistency
- **Better TypeScript** support

### vs Framer
- **Code-first approach** gives more control
- **Open source** and self-hostable
- **Better developer experience**

### vs v0 (Vercel)
- **More comprehensive** component library
- **Marketing-focused** components
- **Complete page generation** not just components

## Risks and Mitigations

### Technical Risks
- **AI Hallucination**: Validate all generated schemas
- **Performance**: Lazy load components, optimize bundles
- **Type Safety**: Strict TypeScript, runtime validation

### Business Risks
- **AI Costs**: Implement caching, rate limiting
- **Complexity**: Start simple, iterate
- **Adoption**: Focus on developer experience

## Timeline

### Month 1: Foundation
- Week 1-2: Schema enhancement
- Week 2-3: Page rendering engine
- Week 3-4: Basic AI integration
- Week 4: Testing and refinement

### Month 2: Builder Interface
- Week 1-2: Visual page builder
- Week 2-3: Properties panel
- Week 3-4: Preview modes
- Week 4: User testing

### Month 3: AI Enhancement
- Week 1-2: Advanced AI features
- Week 2-3: Content optimization
- Week 3-4: Performance tuning
- Week 4: Production deployment

## Next Steps

1. **Immediate Actions**
   - Create enhanced JSON schemas for all components
   - Build page rendering engine
   - Set up API routes for schema management

2. **Short-term Goals**
   - Implement basic AI generation
   - Create visual builder interface
   - Add preview functionality

3. **Long-term Vision**
   - Multi-language support
   - Theme marketplace
   - Plugin system
   - White-label solution

## Conclusion

This architecture leverages the existing high-quality component library and design system to create a powerful AI page builder. The phased approach ensures each layer is solid before building the next, minimizing risk while maximizing the potential for innovation.

The combination of:
- Strong component architecture
- Clean design system
- AI-powered generation
- Visual editing capabilities

...positions this as a next-generation page builder that balances automation with control, perfect for modern marketing teams and developers.