# Design Document: FASSA UI Improvements

## Overview

This design document outlines the technical architecture for transforming the FASSA (Faculty of Science Student Association) UI project from a basic prototype into a production-ready, scalable student portal. The solution implements a monorepo architecture with two Next.js applications (fassa-tech and fassa-web), a shared component library, comprehensive backend integration with database and authentication, and deployment on Vercel.

### Goals

- Establish a maintainable monorepo structure with shared dependencies
- Implement full-stack features including authentication, database integration, and API routes
- Ensure production-ready code quality with TypeScript strict mode, testing, and error handling
- Optimize for performance, SEO, and accessibility
- Enable secure deployment on Vercel with proper configuration

### Non-Goals

- Mobile native applications (iOS/Android)
- Real-time chat or messaging features
- Payment processing or e-commerce functionality
- Multi-language internationalization (i18n)

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Vercel Postgres for production)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Validation**: Zod
- **Testing**: Vitest, React Testing Library, Playwright
- **Deployment**: Vercel
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Image Storage**: Vercel Blob Storage

## Architecture

### System Architecture

The system follows a monorepo architecture with three main packages:

```
fassa-monorepo/
├── apps/
│   ├── fassa-tech/          # Main student portal (port 3000)
│   └── fassa-web/           # Starter template (port 3001)
├── packages/
│   ├── ui/                  # Shared component library
│   ├── config/              # Shared configurations (TypeScript, ESLint, Tailwind)
│   └── database/            # Prisma schema and migrations
├── package.json             # Root workspace configuration
└── pnpm-workspace.yaml      # PNPM workspace definition
```

### Monorepo Structure

We use PNPM workspaces for efficient dependency management and code sharing:

**Root package.json**:
```json
{
  "name": "fassa-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev:tech": "pnpm --filter fassa-tech dev",
    "dev:web": "pnpm --filter fassa-web dev",
    "dev:all": "turbo run dev --parallel"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0"
  }
}
```

**pnpm-workspace.yaml**:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Application Architecture

Each Next.js application follows the App Router architecture:

```
apps/fassa-tech/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Auth-related routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/     # Protected routes
│   │   │   ├── admin/
│   │   │   └── profile/
│   │   ├── api/             # API routes
│   │   │   ├── auth/
│   │   │   ├── events/
│   │   │   ├── executives/
│   │   │   ├── newsletter/
│   │   │   └── complaints/
│   │   ├── events/
│   │   ├── executives/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/          # App-specific components
│   ├── lib/                 # Utilities and configurations
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── email.ts
│   │   └── validations.ts
│   └── types/               # TypeScript types
├── public/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── package.json
```

## Components and Interfaces

### Shared Component Library

The `packages/ui` package exports reusable components with consistent styling and behavior:

**Component Exports**:
```typescript
// packages/ui/src/index.ts
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
export { Select } from './select';
export { Modal } from './modal';
export { Toast } from './toast';
export { Navbar } from './navbar';
export { Footer } from './footer';
export { SectionHeader } from './section-header';
export { LoadingSpinner } from './loading-spinner';
export { ErrorBoundary } from './error-boundary';
export { FormField } from './form-field';
```

**Button Component Interface**:
```typescript
// packages/ui/src/button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
```

**Card Component Interface**:
```typescript
// packages/ui/src/card.tsx
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, variant = 'default', ...props }: CardProps);
export function CardHeader({ className, ...props }: CardHeaderProps);
export function CardTitle({ className, ...props }: CardTitleProps);
export function CardDescription({ className, ...props }: CardDescriptionProps);
export function CardContent({ className, ...props }: CardContentProps);
export function CardFooter({ className, ...props }: CardFooterProps);
```

**Form Components Interface**:
```typescript
// packages/ui/src/form-field.tsx
export interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: ReactNode;
}

export function FormField({
  label,
  name,
  error,
  required,
  description,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Error Boundary Component**:
```typescript
// packages/ui/src/error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We're sorry for the inconvenience. Please try again.
          </p>
          <Button onClick={this.reset}>Try Again</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Route Architecture

All API routes follow a consistent structure with validation, error handling, and authentication:

**API Route Pattern**:
```typescript
// apps/fassa-tech/src/app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';

// Request validation schema
const createSchema = z.object({
  // fields...
});

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Database query
    const data = await prisma.resource.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ data, page, limit });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createSchema.parse(body);

    // Database operation
    const created = await prisma.resource.create({
      data: validatedData,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Authentication Flow

Authentication uses NextAuth.js v5 with multiple providers:

**Auth Configuration**:
```typescript
// apps/fassa-tech/src/lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { prisma } from './db';
import { compare } from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
```

**Protected Route Middleware**:
```typescript
// apps/fassa-tech/src/middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') ||
                     req.nextUrl.pathname.startsWith('/register');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  const isProtectedPage = req.nextUrl.pathname.startsWith('/profile') ||
                          req.nextUrl.pathname.startsWith('/complaints');

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAdminPage && req.auth?.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## Data Models

### Database Schema

The Prisma schema defines all data models with relationships:

```prisma
// packages/database/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role      @default(STUDENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  complaints    Complaint[]

  @@index([email])
}

enum Role {
  STUDENT
  EXECUTIVE
  ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Event {
  id          String      @id @default(cuid())
  title       String
  description String      @db.Text
  date        DateTime
  time        String
  location    String
  category    EventCategory
  imageUrl    String?
  status      EventStatus @default(ACTIVE)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  createdBy   String

  @@index([date, status])
  @@index([category])
}

enum EventCategory {
  ACADEMIC
  SOCIAL
  WORKSHOP
  MEETING
  OTHER
}

enum EventStatus {
  ACTIVE
  CANCELLED
  COMPLETED
  DRAFT
}

model Executive {
  id        String   @id @default(cuid())
  name      String
  role      String
  phone     String
  email     String?
  imageUrl  String?
  order     Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([order, isActive])
}

model Newsletter {
  id          String   @id @default(cuid())
  email       String   @unique
  subscribedAt DateTime @default(now())
  isActive    Boolean  @default(true)

  @@index([email])
}

model Complaint {
  id          String          @id @default(cuid())
  userId      String
  category    ComplaintCategory
  subject     String
  description String          @db.Text
  status      ComplaintStatus @default(PENDING)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  resolvedAt  DateTime?
  resolvedBy  String?

  user        User            @relation(fields: [userId], references: [id])

  @@index([userId, status])
  @@index([status, createdAt])
}

enum ComplaintCategory {
  ACADEMIC
  FACILITIES
  EVENTS
  ADMINISTRATION
  OTHER
}

enum ComplaintStatus {
  PENDING
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

### Type Definitions

TypeScript types derived from Prisma schema:

```typescript
// apps/fassa-tech/src/types/index.ts
import { Prisma } from '@prisma/client';

// User types
export type User = Prisma.UserGetPayload<{}>;
export type UserWithComplaints = Prisma.UserGetPayload<{
  include: { complaints: true };
}>;

// Event types
export type Event = Prisma.EventGetPayload<{}>;
export type EventCreateInput = Prisma.EventCreateInput;
export type EventUpdateInput = Prisma.EventUpdateInput;

// Executive types
export type Executive = Prisma.ExecutiveGetPayload<{}>;

// Complaint types
export type Complaint = Prisma.ComplaintGetPayload<{}>;
export type ComplaintWithUser = Prisma.ComplaintGetPayload<{
  include: { user: true };
}>;

// Newsletter types
export type Newsletter = Prisma.NewsletterGetPayload<{}>;

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ComplaintFormData {
  category: ComplaintCategory;
  subject: string;
  description: string;
}

export interface NewsletterFormData {
  email: string;
}
```



### Validation Schemas

Zod schemas for request validation:

```typescript
// apps/fassa-tech/src/lib/validations.ts
import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Event schemas
export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().datetime('Invalid date format'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  category: z.enum(['ACADEMIC', 'SOCIAL', 'WORKSHOP', 'MEETING', 'OTHER']),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

// Executive schemas
export const executiveSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
  order: z.number().int().min(0).optional(),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Complaint schemas
export const complaintSchema = z.object({
  category: z.enum(['ACADEMIC', 'FACILITIES', 'EVENTS', 'ADMINISTRATION', 'OTHER']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
});
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before defining the correctness properties, I need to analyze the acceptance criteria to determine which are testable as properties, examples, or edge cases.



### Property Reflection

After analyzing all acceptance criteria, I've identified the following redundancies and consolidations:

**Redundancies Identified:**
1. Properties 18.6 and 19.1 both test image fallback behavior - can be consolidated
2. Properties 12.1 and 12.5 both test loading indicator display - can be consolidated
3. Properties 14.6 and 17.5 both test semantic HTML usage - can be consolidated
4. Properties 7.1 and 7.7 both involve newsletter input validation - 7.7 is more comprehensive
5. Properties 13.5 and 24.2 both test XSS prevention through input sanitization - can be consolidated
6. Properties 7.6, 9.7, and 24.4 all test rate limiting - can be consolidated into one comprehensive property
7. Properties 11.3 and 19.2 both test error logging - can be consolidated
8. Properties 5.1, 5.2, 5.3, 5.4 all test database round-trip for different entities - can be consolidated into one property about data persistence
9. Properties 14.1, 14.2, 14.3 all test meta tag presence - can be consolidated
10. Properties 17.1, 17.2, 17.4 all test keyboard accessibility features - can be consolidated

**Consolidated Properties:**
- Database round-trip: One property covering all entity types (events, executives, newsletters, complaints)
- Rate limiting: One property covering all API endpoints
- Meta tags: One property covering all SEO meta tags (title, description, OG, Twitter)
- Keyboard accessibility: One property covering ARIA attributes, keyboard navigation, and focus indicators
- Image error handling: One property covering fallback images and error logging
- Loading states: One property covering all loading indicators
- Input sanitization: One property covering XSS prevention across all forms

After consolidation, we have approximately 40 unique, non-redundant properties that provide comprehensive validation coverage.

### Property 1: Port Configuration Override

*For any* valid port number provided via environment variable, the application should start on that port instead of the default port.

**Validates: Requirements 2.3**

### Property 2: Environment Variable Error Messages

*For any* missing required environment variable, the application should display a helpful error message indicating which variable is missing and where it should be defined.

**Validates: Requirements 4.6**

### Property 3: Database Entity Round-Trip

*For any* valid entity (event, executive, newsletter subscription, or complaint) with all required fields, creating the entity in the database and then retrieving it should return an equivalent entity with all fields preserved.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 4: Authentication with Valid Credentials

*For any* registered user with valid email and password credentials, attempting to log in should successfully create an authenticated session.

**Validates: Requirements 6.1, 6.3**

### Property 5: Role-Based Access Control

*For any* protected route and user role combination, access should be granted if and only if the user's role has permission for that route (students access student routes, executives access executive routes, admins access all routes).

**Validates: Requirements 6.5**

### Property 6: Password Hashing

*For any* user registration with a password, the password stored in the database should be hashed (not equal to the plaintext password) and should be verifiable using the hashing algorithm.

**Validates: Requirements 6.7**

### Property 7: Registration Input Validation

*For any* registration attempt with invalid email format or weak password (missing uppercase, lowercase, number, or less than 8 characters), the system should reject the registration with appropriate validation errors.

**Validates: Requirements 6.8**

### Property 8: Newsletter Subscription Storage

*For any* valid email address submitted to the newsletter endpoint, the email should be stored in the database and retrievable from the newsletter subscriptions table.

**Validates: Requirements 7.1**

### Property 9: Newsletter Email Validation

*For any* invalid email format (missing @, invalid domain, etc.) submitted to the newsletter endpoint, the system should return a validation error and not store the email.

**Validates: Requirements 7.2**

### Property 10: Input Sanitization for XSS Prevention

*For any* user input containing potential XSS payloads (script tags, event handlers, etc.) submitted through any form, the system should sanitize the input to prevent script execution.

**Validates: Requirements 7.7, 13.5, 24.2**

### Property 11: Rate Limiting Across Endpoints

*For any* API endpoint with rate limiting enabled, making more than the allowed number of requests within the time window should result in HTTP 429 (Too Many Requests) responses.

**Validates: Requirements 7.6, 9.7, 24.4**

### Property 12: Event Creation Validation

*For any* event creation attempt with missing required fields (title, description, date, time, location, category), the system should reject the request with validation errors indicating which fields are invalid.

**Validates: Requirements 8.2**

### Property 13: Event Creation and Storage

*For any* valid event data submitted by an authenticated executive, the event should be created in the database and retrievable via the events API.

**Validates: Requirements 8.3**

### Property 14: Authentication Required for Mutations

*For any* create, update, or delete operation on events, executives, or complaints, unauthenticated requests should be rejected with HTTP 401 (Unauthorized).

**Validates: Requirements 8.5, 10.4**

### Property 15: Event Filtering

*For any* combination of filter parameters (date range, category, status), the events API should return only events matching all specified filters.

**Validates: Requirements 8.6**

### Property 16: Pagination Consistency

*For any* paginated endpoint with page number and limit parameters, the returned data should contain exactly `limit` items (or fewer on the last page), and requesting consecutive pages should return non-overlapping results.

**Validates: Requirements 8.7**

### Property 17: Soft Delete Behavior

*For any* event deletion request, the event should remain in the database with status marked as inactive rather than being permanently removed.

**Validates: Requirements 8.8**

### Property 18: Complaint Submission Validation

*For any* complaint submission with missing required fields (category, subject, description) or invalid field values, the system should reject the submission with validation errors.

**Validates: Requirements 9.2**

### Property 19: Complaint Initial Status

*For any* valid complaint submitted by an authenticated user, the complaint should be stored in the database with status set to "PENDING".

**Validates: Requirements 9.3**

### Property 20: User Complaint History Access

*For any* authenticated user, querying their complaint history should return only complaints they submitted, not complaints from other users.

**Validates: Requirements 9.5**

### Property 21: Complaint Status Updates

*For any* complaint and valid status transition (PENDING → IN_PROGRESS → RESOLVED → CLOSED), an authenticated executive should be able to update the complaint status.

**Validates: Requirements 9.6**

### Property 22: Admin-Only Executive Management

*For any* create, update, or delete operation on executive data, requests from non-admin users should be rejected with HTTP 403 (Forbidden).

**Validates: Requirements 10.4**

### Property 23: Phone Number Validation

*For any* executive creation or update with an invalid phone number format (not matching international phone number patterns), the system should reject the request with a validation error.

**Validates: Requirements 10.5**

### Property 24: Executive Ordering

*For any* request to list executives, the returned executives should be ordered by their `order` field in ascending order.

**Validates: Requirements 10.6**

### Property 25: Error Boundary Display

*For any* JavaScript error thrown within an error boundary, the boundary should catch the error and display a user-friendly error message instead of a blank screen.

**Validates: Requirements 11.2**

### Property 26: Error Logging

*For any* error caught by an error boundary or image load failure, the error details should be logged to the console or error tracking service for debugging.

**Validates: Requirements 11.3, 19.2**

### Property 27: Error Message Sanitization

*For any* error that occurs in the application, the error message displayed to end users should not contain sensitive information such as database connection strings, API keys, or internal file paths.

**Validates: Requirements 11.5, 24.7**

### Property 28: Loading State Display

*For any* asynchronous operation (data fetching, form submission), a loading indicator should be displayed while the operation is in progress.

**Validates: Requirements 12.1, 12.5**

### Property 29: Email Format Validation

*For any* form field requiring an email address, invalid email formats should be rejected with an inline error message before form submission.

**Validates: Requirements 13.1**

### Property 30: Required Field Validation

*For any* form with required fields, attempting to submit the form with empty required fields should prevent submission and display validation errors.

**Validates: Requirements 13.2**

### Property 31: Inline Error Messages

*For any* form field with validation errors, the error message should be displayed inline near the field with appropriate ARIA attributes for screen reader announcement.

**Validates: Requirements 13.3, 17.7**

### Property 32: Form Submission Prevention

*For any* form with validation errors, the form submission should be prevented until all validation errors are resolved.

**Validates: Requirements 13.4**

### Property 33: Client and Server Validation

*For any* form submission, validation should occur on both client side (for immediate feedback) and server side (for security), and bypassing client validation should still trigger server validation.

**Validates: Requirements 13.7**

### Property 34: SEO Meta Tags Presence

*For any* page in the application, the HTML should include meta tags for title, description, Open Graph tags (og:title, og:description, og:image), and Twitter Card tags.

**Validates: Requirements 14.1, 14.2, 14.3**

### Property 35: Semantic HTML Structure

*For any* page in the application, the HTML should use semantic elements (header, nav, main, article, footer, section) instead of generic div elements for major page sections.

**Validates: Requirements 14.6, 17.5**

### Property 36: Structured Data for Events

*For any* event detail page, the page should include valid JSON-LD structured data with event information (name, startDate, location, description).

**Validates: Requirements 14.7**

### Property 37: Image Alt Text

*For any* image rendered in the application, the img element should have a descriptive alt attribute (not empty or generic like "image").

**Validates: Requirements 14.8**

### Property 38: Keyboard Accessibility

*For any* interactive element (buttons, links, form inputs), the element should be keyboard accessible (focusable via Tab key), have visible focus indicators, and include appropriate ARIA attributes.

**Validates: Requirements 17.1, 17.2, 17.4**

### Property 39: Color Contrast Compliance

*For any* text element in the application, the color contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 17.3**

### Property 40: Image Error Handling

*For any* image that fails to load (404, network error, invalid URL), the application should display a fallback image or placeholder and log the error for debugging.

**Validates: Requirements 18.6, 19.1, 19.2**

### Property 41: Image URL Validation

*For any* image URL provided to the application, the URL should be validated for proper format before attempting to render, and invalid URLs should trigger fallback behavior.

**Validates: Requirements 19.3**

### Property 42: HTTP Status Code Correctness

*For any* API request, the response should include the appropriate HTTP status code: 200 for successful GET, 201 for successful POST, 400 for validation errors, 401 for authentication errors, 403 for authorization errors, 404 for not found, 429 for rate limiting, 500 for server errors.

**Validates: Requirements 21.7**

### Property 43: Request Body Validation

*For any* API endpoint accepting request bodies, invalid request bodies (wrong types, missing required fields, invalid formats) should be rejected with HTTP 400 and detailed validation error messages.

**Validates: Requirements 21.8**

### Property 44: Consistent Error Response Format

*For any* API error response, the response should follow a consistent format with an `error` field containing the error message and optionally a `details` field for validation errors.

**Validates: Requirements 21.9**

### Property 45: CSRF Protection

*For any* form submission or state-changing API request, the request should include a valid CSRF token, and requests without valid tokens should be rejected.

**Validates: Requirements 24.1**

### Property 46: Security Headers

*For any* HTTP response from the application, security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options) should be present with appropriate values.

**Validates: Requirements 24.6**

### Property 47: Secure Session Cookies

*For any* authenticated session, the session cookie should have secure attributes set (HttpOnly, Secure in production, SameSite).

**Validates: Requirements 24.8**



## Error Handling

### Error Handling Strategy

The application implements a multi-layered error handling approach:

**1. Client-Side Error Boundaries**

React Error Boundaries catch JavaScript errors in component trees:

```typescript
// apps/fassa-tech/src/app/layout.tsx
import { ErrorBoundary } from '@fassa/ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            // Log to error tracking service
            console.error('Application error:', error, errorInfo);
          }}
        >
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

**2. API Route Error Handling**

All API routes use consistent error handling:

```typescript
// apps/fassa-tech/src/lib/api-handler.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  // Validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Database errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A record with this value already exists' },
        { status: 409 }
      );
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }
  }

  // Generic server error (don't expose details)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

**3. Form Validation Errors**

Client-side validation provides immediate feedback:

```typescript
// apps/fassa-tech/src/components/newsletter-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema } from '@/lib/validations';
import { Button, Input, FormField } from '@fassa/ui';

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to subscribe');
      }

      reset();
      // Show success toast
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Email Address"
        name="email"
        error={errors.email?.message}
        required
      >
        <Input
          type="email"
          placeholder="your.email@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
      </FormField>

      {submitError && (
        <div className="text-sm text-destructive" role="alert">
          {submitError}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting}>
        Subscribe
      </Button>
    </form>
  );
}
```

**4. Image Error Handling**

Next.js Image component with error handling:

```typescript
// apps/fassa-tech/src/components/safe-image.tsx
'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  fallbackSrc = '/images/placeholder.png',
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.error(`Failed to load image: ${src}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
```

**5. Loading State Timeouts**

Prevent infinite loading states:

```typescript
// apps/fassa-tech/src/hooks/use-timeout-loading.ts
import { useEffect, useState } from 'react';

export function useTimeoutLoading(isLoading: boolean, timeout = 30000) {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasTimedOut(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, timeout]);

  return hasTimedOut;
}
```

### Error Logging

Errors are logged to multiple destinations:

1. **Console Logging**: Development debugging
2. **Error Tracking Service**: Production monitoring (e.g., Sentry)
3. **Server Logs**: Vercel function logs

```typescript
// apps/fassa-tech/src/lib/logger.ts
export function logError(error: Error, context?: Record<string, any>) {
  console.error('Error:', error.message, context);

  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    // Send to Sentry or similar service
    // Sentry.captureException(error, { extra: context });
  }
}
```

## Testing Strategy

### Testing Approach

The FASSA UI project implements a comprehensive testing strategy with both unit tests and property-based tests:

**Testing Pyramid:**
- **Property-Based Tests**: Verify universal properties across all inputs (primary focus)
- **Unit Tests**: Verify specific examples, edge cases, and integration points
- **End-to-End Tests**: Verify critical user flows

### Property-Based Testing

Property-based tests use `fast-check` library to generate random inputs and verify properties:

**Setup:**
```typescript
// apps/fassa-tech/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Property Test Example:**
```typescript
// apps/fassa-tech/src/lib/__tests__/validations.property.test.ts
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { newsletterSchema, eventSchema } from '../validations';

describe('Newsletter Validation Properties', () => {
  it('Property 9: Newsletter Email Validation - For any invalid email format, validation should fail', () => {
    // Feature: fassa-ui-improvements, Property 9: Newsletter Email Validation
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string().filter(s => !s.includes('@')), // No @ symbol
          fc.string().map(s => `${s}@`), // Missing domain
          fc.string().map(s => `@${s}`), // Missing local part
          fc.constant(''), // Empty string
        ),
        (invalidEmail) => {
          const result = newsletterSchema.safeParse({ email: invalidEmail });
          expect(result.success).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 8: Newsletter Subscription Storage - For any valid email, it should pass validation', () => {
    // Feature: fassa-ui-improvements, Property 8: Newsletter Subscription Storage
    fc.assert(
      fc.property(
        fc.emailAddress(),
        (validEmail) => {
          const result = newsletterSchema.safeParse({ email: validEmail });
          expect(result.success).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Event Validation Properties', () => {
  it('Property 12: Event Creation Validation - For any event missing required fields, validation should fail', () => {
    // Feature: fassa-ui-improvements, Property 12: Event Creation Validation
    fc.assert(
      fc.property(
        fc.record({
          title: fc.option(fc.string(), { nil: undefined }),
          description: fc.option(fc.string(), { nil: undefined }),
          date: fc.option(fc.date().map(d => d.toISOString()), { nil: undefined }),
          time: fc.option(fc.string(), { nil: undefined }),
          location: fc.option(fc.string(), { nil: undefined }),
          category: fc.option(
            fc.constantFrom('ACADEMIC', 'SOCIAL', 'WORKSHOP', 'MEETING', 'OTHER'),
            { nil: undefined }
          ),
        }),
        fc.boolean(),
        (partialEvent, shouldHaveMissingField) => {
          // Ensure at least one field is missing
          if (shouldHaveMissingField) {
            const keys = Object.keys(partialEvent);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            partialEvent[randomKey] = undefined;
          }

          const hasAllFields = Object.values(partialEvent).every(v => v !== undefined);
          const result = eventSchema.safeParse(partialEvent);

          if (!hasAllFields) {
            expect(result.success).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Database Property Test Example:**
```typescript
// apps/fassa-tech/src/lib/__tests__/database.property.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { prisma } from '../db';

describe('Database Properties', () => {
  afterEach(async () => {
    // Clean up test data
    await prisma.newsletter.deleteMany();
    await prisma.event.deleteMany();
  });

  it('Property 3: Database Entity Round-Trip - For any valid newsletter subscription, create then retrieve should return equivalent data', async () => {
    // Feature: fassa-ui-improvements, Property 3: Database Entity Round-Trip
    await fc.assert(
      fc.asyncProperty(
        fc.emailAddress(),
        async (email) => {
          // Create
          const created = await prisma.newsletter.create({
            data: { email },
          });

          // Retrieve
          const retrieved = await prisma.newsletter.findUnique({
            where: { id: created.id },
          });

          // Verify
          expect(retrieved).not.toBeNull();
          expect(retrieved?.email).toBe(email);
          expect(retrieved?.isActive).toBe(true);

          // Cleanup
          await prisma.newsletter.delete({ where: { id: created.id } });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing

Unit tests focus on specific examples and edge cases:

```typescript
// apps/fassa-tech/src/components/__tests__/newsletter-form.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewsletterForm } from '../newsletter-form';

describe('NewsletterForm', () => {
  it('should display validation error for empty email', async () => {
    render(<NewsletterForm />);

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should handle duplicate email subscription gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Email already subscribed' }),
      })
    ) as any;

    render(<NewsletterForm />);

    const input = screen.getByPlaceholderText(/your.email@example.com/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already subscribed/i)).toBeInTheDocument();
    });
  });

  it('should display loading state during submission', async () => {
    global.fetch = vi.fn(() =>
      new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
    ) as any;

    render(<NewsletterForm />);

    const input = screen.getByPlaceholderText(/your.email@example.com/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /subscribe/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent(/subscribe/i);
  });
});
```

### End-to-End Testing

E2E tests verify critical user flows using Playwright:

```typescript
// apps/fassa-tech/e2e/authentication.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow user to register and login', async ({ page }) => {
    // Navigate to registration page
    await page.goto('/register');

    // Fill registration form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'SecurePass123');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to home page
    await expect(page).toHaveURL('/');

    // Should show user menu
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should prevent access to protected routes when not authenticated', async ({ page }) => {
    await page.goto('/profile');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('should handle session expiration', async ({ page, context }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123');
    await page.click('button[type="submit"]');

    // Clear session cookie
    await context.clearCookies();

    // Try to access protected route
    await page.goto('/profile');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
```

### Test Coverage Goals

- **Business Logic**: Minimum 80% coverage
- **API Routes**: Minimum 90% coverage
- **UI Components**: Minimum 70% coverage
- **Utilities**: Minimum 90% coverage

### Testing Commands

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

