# FASSA UI Monorepo

Faculty of Science Student Association (FASSA) UI project - A production-ready monorepo containing multiple Next.js applications and shared packages.

## Project Structure

```
fassa-monorepo/
├── apps/
│   ├── fassa-tech/          # Main student portal (port 3000)
│   └── fassa-web/           # Starter template (port 3001)
├── packages/
│   ├── ui/                  # Shared component library (coming soon)
│   ├── config/              # Shared configurations (coming soon)
│   └── database/            # Prisma schema and migrations (coming soon)
├── package.json             # Root workspace configuration
├── pnpm-workspace.yaml      # PNPM workspace definition
└── turbo.json               # Turbo build orchestration
```

## Prerequisites

- Node.js >= 18.0.0
- PNPM >= 9.0.0

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

Run all applications in development mode:

```bash
pnpm dev:all
```

Run specific application:

```bash
# Run fassa-tech (port 3000)
pnpm dev:tech

# Run fassa-web (port 3001)
pnpm dev:web
```

### Build

Build all applications:

```bash
pnpm build
```

### Testing

Run tests across all packages:

```bash
pnpm test
```

### Linting

Lint all packages:

```bash
pnpm lint
```

## Port Configuration

- **fassa-tech**: http://localhost:3000
- **fassa-web**: http://localhost:3001

Ports can be overridden using environment variables:

```bash
PORT=3002 pnpm dev:tech
```

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Build System**: Turbo
- **Package Manager**: PNPM
- **Monorepo**: PNPM Workspaces

## Scripts

- `pnpm dev` - Run all apps in development mode (via Turbo)
- `pnpm dev:all` - Run all apps in parallel
- `pnpm dev:tech` - Run fassa-tech only
- `pnpm dev:web` - Run fassa-web only
- `pnpm build` - Build all apps
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean all build artifacts and node_modules

## Contributing

Please read the contribution guidelines before submitting pull requests.

## License

Private - Faculty of Science Student Association
