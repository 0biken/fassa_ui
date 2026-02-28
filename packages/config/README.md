# @fassa/config

Shared configuration package for the FASSA monorepo. This package provides consistent TypeScript, ESLint, and Tailwind CSS configurations across all applications.

## Contents

- **tsconfig.json** - Shared TypeScript configuration with strict mode enabled
- **eslint.config.mjs** - Shared ESLint configuration for Next.js and TypeScript
- **tailwind.css** - Shared Tailwind CSS theme configuration

## Usage

### TypeScript Configuration

Extend the shared TypeScript configuration in your application's `tsconfig.json`:

```json
{
  "extends": "@fassa/config/tsconfig",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ]
}
```

### ESLint Configuration

Import the shared ESLint configuration in your application's `eslint.config.mjs`:

```javascript
import sharedConfig from "@fassa/config/eslint";

export default sharedConfig;
```

Or extend it with additional rules:

```javascript
import { defineConfig } from "eslint/config";
import sharedConfig from "@fassa/config/eslint";

const eslintConfig = defineConfig([
  ...sharedConfig,
  {
    rules: {
      // Add application-specific rules here
    }
  }
]);

export default eslintConfig;
```

### Tailwind CSS Configuration

Import the shared Tailwind theme in your application's `globals.css`:

```css
@import "tailwindcss";
@import "@fassa/config/tailwind";

/* Add application-specific styles here */
```

## Features

### TypeScript Configuration

- **Strict Mode Enabled**: Enforces strict type checking
- **ES2017 Target**: Modern JavaScript features
- **React JSX Support**: Configured for React 19
- **Module Resolution**: Bundler mode for optimal compatibility
- **Additional Strict Checks**:
  - `strictNullChecks`
  - `strictFunctionTypes`
  - `noImplicitAny`
  - `strictPropertyInitialization`
  - `noUnusedLocals`
  - `noUnusedParameters`
  - `noFallthroughCasesInSwitch`

### ESLint Configuration

- **Next.js Best Practices**: Extends `eslint-config-next`
- **TypeScript Support**: Full TypeScript linting
- **React 19 Compatible**: No need for React imports
- **Custom Rules**:
  - Enforces `const` over `let` where possible
  - Warns on console usage (except `warn` and `error`)
  - Strict unused variable checking
  - React Hooks rules enforcement

### Tailwind CSS Configuration

- **Design System Tokens**: Comprehensive color palette and spacing scale
- **Accessibility**: Focus styles and WCAG-compliant colors
- **Utility Classes**: Pre-built card shadows and gradients
- **CSS Variables**: Easy theming and customization
- **Tailwind v4 Compatible**: Uses `@theme` directive

## Design System

### Colors

- **Primary**: Blue palette for main actions and branding
- **Accent**: Yellow, green, and pink for highlights
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, error, and info colors

### Typography

- **Primary Font**: Inter (system fallback)
- **Monospace Font**: Fira Code (code blocks)

### Spacing

Follows a consistent scale from `xs` (4px) to `3xl` (64px)

### Shadows

Four levels: `sm`, `md`, `lg`, `xl` for depth hierarchy

### Transitions

Three speeds: `fast` (150ms), `base` (200ms), `slow` (300ms)

## Maintenance

When updating configurations:

1. Update the relevant file in `packages/config/`
2. Test changes in both `fassa-tech` and `fassa-web` applications
3. Document breaking changes in the changelog
4. Bump the package version if needed

## Requirements Validated

This package validates the following requirements:

- **1.4**: Root-level configuration for shared tooling
- **16.1**: TypeScript strict mode enabled
- **16.2**: No type errors with strict mode

## License

Private - FASSA Internal Use Only
