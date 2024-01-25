# Install Craft UI

> Craft UI will be installed as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and will be placed in your `@/components` folder along with shadcn/ui. To recieve updates make sure to peroidically run
>
> ```bash
> git submodule init
> git submodule update
> ```
>
> Alternatively, you can download the folder from releases and place in your components folder.

For examples of Craft UI, check out [craftui.org](https://craftui.org) or this [Repository](https://github.com/9d8dev/craft-examples).

## Create NextJS App With Tailwind

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

## Install Dependencies

```bash
# Install Dependencies
npm install
npm install -D react-wrap-balancer
npm install -D @tailwindcss/typography
npm install -D next-themes
```

## Install Shadcn/ui

```bash
# Install shadcn/ui and all components
npx shadcn-ui@latest init -y
npx shadcn-ui@latest add -a
```

## Install Craft

```bash
# Install Craft Components
cd components
git submodule add https://github.com/9d8dev/craft
cd ../
```

## Update `tailwind.config.ts`

Replace the standard shadcn/ui `tailwind.config` with this

```ts
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: ['class'],
 content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
 theme: {
  container: {
   center: true,
   padding: '2rem',
   screens: {
    '2xl': '1400px'
   }
  },
  extend: {
   colors: {
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: {
     DEFAULT: 'hsl(var(--primary))',
     foreground: 'hsl(var(--primary-foreground))'
    },
    secondary: {
     DEFAULT: 'hsl(var(--secondary))',
     foreground: 'hsl(var(--secondary-foreground))'
    },
    destructive: {
     DEFAULT: 'hsl(var(--destructive))',
     foreground: 'hsl(var(--destructive-foreground))'
    },
    muted: {
     DEFAULT: 'hsl(var(--muted))',
     foreground: 'hsl(var(--muted-foreground))'
    },
    accent: {
     DEFAULT: 'hsl(var(--accent))',
     foreground: 'hsl(var(--accent-foreground))'
    },
    popover: {
     DEFAULT: 'hsl(var(--popover))',
     foreground: 'hsl(var(--popover-foreground))'
    },
    card: {
     DEFAULT: 'hsl(var(--card))',
     foreground: 'hsl(var(--card-foreground))'
    }
   },
   borderRadius: {
    lg: `var(--radius)`,
    md: `calc(var(--radius) - 2px)`,
    sm: 'calc(var(--radius) - 4px)'
   },
   fontFamily: {
    sans: ['var(--font-sans)', ...fontFamily.sans],
    serif: ['var(--font-serif)', ...fontFamily.serif]
   },
   keyframes: {
    'accordion-down': {
     from: { height: '0' },
     to: { height: 'var(--radix-accordion-content-height)' }
    },
    'accordion-up': {
     from: { height: 'var(--radix-accordion-content-height)' },
     to: { height: '0' }
    }
   },
   animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out'
   }
  }
 },
 plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
```
