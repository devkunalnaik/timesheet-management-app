# Timesheet Management App

A timesheet management application built with Next.js 16 (App Router), NextAuth.js, React 19, and Tailwind CSS.

## Prerequisites

- Node.js 20+
- npm (or yarn/pnpm/bun)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in the project root with the following:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

   Generate a secret with:
   ```bash
   openssl rand -base64 32
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

## Default Login

Use the following credentials to sign in:

| Field    | Value                    |
|----------|--------------------------|
| Email    | admin@tentwenty.test     |
| Password | password                 |

## Project Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts   # NextAuth authentication handler
│   └── timesheets/
│       ├── route.ts                  # GET/POST timesheet entries
│       └── [id]/route.ts             # GET/PUT/DELETE single entry
├── components/
│   └── AddTaskModal.tsx              # Add task modal component
├── dashboard/
│   └── page.tsx                      # Dashboard page
├── login/
│   └── page.tsx                      # Login page (NextAuth credentials)
├── timesheet/[id]/
│   └── page.tsx                      # Individual timesheet detail page
├── layout.tsx                        # Root layout
├── page.tsx                          # Home page
└── globals.css                       # Global styles
```

## Available Scripts

| Script         | Command           | Description                    |
|----------------|-------------------|--------------------------------|
| Development    | `npm run dev`     | Start dev server with hot reload |
| Production     | `npm run build`   | Build optimized production bundle |
| Start server   | `npm start`       | Start production server        |
| Lint           | `npm run lint`    | Run ESLint checks              |

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **Authentication:** NextAuth.js v4 (Credentials + JWT)
- **UI:** React 19, Tailwind CSS v4
- **Forms:** React Hook Form v7
- **HTTP Client:** Axios v1
- **Language:** TypeScript 5
- **Linting:** ESLint 9

## API Routes

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | `/api/auth/*`               | NextAuth authentication      |
| GET    | `/api/timesheets`           | List all timesheet entries   |
| POST   | `/api/timesheets`           | Create a new entry           |
| GET    | `/api/timesheets/[id]`      | Get a single entry           |
| PUT    | `/api/timesheets/[id]`      | Update an entry              |
| DELETE | `/api/timesheets/[id]`      | Delete an entry              |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
