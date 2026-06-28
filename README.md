# Manas Joshi — Portfolio

A premium, award-quality portfolio built with React + Vite + TypeScript + Framer Motion.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v3** — utility styling
- **Framer Motion** — all animations & transitions
- **Lucide React** — icon set
- **Custom Canvas** — interactive particle field in Hero

## Project Structure

```
src/
├── components/
│   ├── sections/          # Page sections
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Certifications.tsx
│   │   ├── CurrentLearning.tsx
│   │   ├── CareerVision.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components
│       ├── Cursor.tsx
│       └── SocialIcons.tsx
├── data/
│   └── portfolio.ts       # All content in one place
├── index.css              # Global styles, CSS variables
├── App.tsx
└── main.tsx
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

All personal content lives in **`src/data/portfolio.ts`** — update your name, skills, projects, certifications there.

## Design Notes

- **Color palette**: `#050816` background · Electric Blue `#4f8ef7` · Purple `#8b5cf6` · Cyan `#06b6d4`
- **Typography**: Space Grotesk (headings) + Inter (body)
- **Animations**: Framer Motion scroll-triggered reveals, canvas particle field, glassmorphism cards
- **Performance**: lazy loading, code splitting, optimized assets
