# Red Brick

Red Brick is an immersive, museum-style web experience that reimagines a simple red brick as a luxury collectible. The project combines cinematic storytelling, motion-driven interactions, and premium visual design into a polished single-page experience.

[Live Demo - Red Bricks](https://red-brick.vercel.app/)

## Overview

This app presents a curated exhibition journey with:

- a dramatic hero experience
- a scroll-driven story section
- provenance and timeline storytelling
- detailed specification views
- an acquisition/contact-style section

The interface is built to feel editorial and tactile, with layered visuals, animated transitions, and rich micro-interactions.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion (animation)
- Lucide React (icons)
- React Three Fiber / Drei (3D-related experience components)

## Project Structure

```text
src/
  components/       # Shared UI elements such as header, footer, loaders, and cursor
  sections/         # Main exhibition sections
  utils/            # Animation and helper utilities
  App.tsx           # Main application layout
  main.tsx          # Entry point
  index.css         # Global styles and theme setup
  types.ts          # Shared TypeScript types
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # start the Vite development server
npm run build    # create a production build
npm run preview  # preview the production build locally
npm run lint     # run TypeScript checks
npm run clean    # remove build output artifacts
```

## Build for Production

```bash
npm run build
```

The production build will be generated in the `dist/` folder.

## Notes

- The experience is designed for modern browsers with smooth animation support.
- The project uses a custom visual language inspired by luxury exhibition and museum presentation.
- If you want to explore or tweak the experience, the main content lives in the sections under `src/sections/`.
