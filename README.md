# brijr/components

Website: [components.bridger.to](https://components.bridger.to)

> A collection of [Next.js](https://nextjs.org) components for building websites at rapid speed using [Tailwind](https://tailwindcss.com), [React](https://react.dev), [shadcn/ui](https://ui.shadcn.com), [brijr/craft](https://github.com/brijr/craft), and [Typescript](https://www.typescriptlang.org/).

## What is it? 

![components](https://github.com/brijr/components/assets/57158102/a1246578-4837-4704-94d8-1b01703a850b)

Open source components for building websites. Created by [Bridger Tower](https://bridger.to)

## Setup

> Want to just use a starter? Go here [brijr/starter](https://github.com/brijr/starter)

### Step 1:  Create a Next.js application

```
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

### Step 2: Install brijr/craft (this will also install shadcn/ui)

```
npx brijr-craft@latest init
```

 - (if you want dark mode) Add a `ThemeProvider` and `ModeToggle` by following these steps: [Adding dark mode to your next app](https://ui.shadcn.com/docs/dark-mode/next)

### Step 3: Add [brijr/craft](https://github.com/brijr/craft) and `craft.tsx` to your project

- How to use the Craft Design System: https://github.com/brijr/craft
- Make sure to install [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) and add it to your `tailwind.config.ts`

### Step 4: Copy and Paste components from the [website](htpps://components.bridger.to) into your component folder to get started!
