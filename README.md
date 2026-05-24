# Timesheet Management App

A timesheet management application built with Next.js 16 (App Router), NextAuth.js, React 19, and Tailwind CSS. Users can log in, view a dashboard of timesheet entries, create new entries, and view individual timesheet details.

---

## Setup Instructions

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm/bun)

### Installation

1. **Clone the repository and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in the project root:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

   Generate a secure secret:

   ```bash
   openssl rand -base64 32
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Default login credentials:**

   | Field    | Value                    |
   |----------|--------------------------|
   | Email    | admin@tentwenty.test     |
   | Password | password                 |

5. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

6. **Run lint:**

   ```bash
   npm run lint
   ```

---

## Frameworks & Libraries

| Category       | Technology            | Version  |
|----------------|-----------------------|----------|
| Framework      | Next.js (App Router)  | 16.2.6   |
| UI Library     | React                 | 19.2.4   |
| Styling        | Tailwind CSS          | v4       |
| Authentication | NextAuth.js           | v4.24.14 |
| Forms          | React Hook Form       | v7.76.0  |
| HTTP Client   | Axiax                 | v1.16.1  |
| Language       | TypeScript            | v5        |
| Linting        | ESLint                | v9        |
| CSS Processing | PostCSS               | -         |

---

## Assumptions & Notes

- **Credentials-based auth only** — No OAuth providers are configured. Uses a hardcoded credentials provider for demo purposes.
- **JWT session strategy** — Sessions are stored in JWT tokens (no database required).
- **No database** — Timesheet entries are stored in-memory. Data is lost on server restart.
- **Legacy code removed** — An old `timesheet-app/` pages-router directory was cleaned up as it was completely disconnected from the active app.
- **Next.js 16 specifics** — This version introduces breaking changes from standard Next.js 13-15 patterns. Route handler `context.params` is now a Promise (must be awaited). The NextAuth v4 adapter required special handling to work correctly with the app router's request/response cycle.

---

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
│   └── page.tsx                      # Dashboard page (list all entries)
├── login/
│   └── page.tsx                      # Login page (NextAuth credentials)
├── timesheet/[id]/
│   └── page.tsx                      # Individual timesheet detail page
├── layout.tsx                        # Root layout
├── page.tsx                          # Home/landing page
└── globals.css                       # Global styles (Tailwind)
.env.local                            # Environment variables
next.config.ts                        # Next.js configuration
tsconfig.json                         # TypeScript configuration
eslint.config.mjs                     # ESLint configuration
postcss.config.mjs                    # PostCSS (Tailwind) configuration
```

---

## API Routes

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| ALL    | `/api/auth/*`               | NextAuth auth endpoints        |
| GET    | `/api/timesheets`           | List all timesheet entries     |
| POST   | `/api/timesheets`           | Create a new entry             |
| GET    | `/api/timesheets/[id]`      | Get a single entry             |
| PUT    | `/api/timesheets/[id]`      | Update an entry                |
| DELETE | `/api/timesheets/[id]`      | Delete an entry                |

---

## Time Spent

| Task                                         | Duration   |
|----------------------------------------------|------------|
| Project setup & initial scaffolding          | ~15 min    |
| NextAuth integration with Next.js 16 app router | ~45 min    |
| Debugging NextAuth route handler 404/500 errors | ~60 min    |
| Timesheet CRUD API & frontend pages          | ~30 min    |
| Code cleanup (removing legacy `timesheet-app/`) | ~10 min    |
| Documentation (README)                       | ~15 min    |
| **Total**                                    | **~2 hrs 55 min** |
