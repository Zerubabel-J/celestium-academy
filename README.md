# Celestium

A Web3 crypto platform with a responsive dashboard, on-chain wallet integration, and a suite of interactive features — staking, sport betting, games, an academy, and more.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## Features

| Section | Description |
| --- | --- |
| **Dashboard** | Responsive landing dashboard with charts and live stats. |
| **Academy** | Educational content and documentation for users. |
| **Staking** | Stake CELESTIUM tokens across different strategies. |
| **Sport Betting** | Live matches, bets, and statistics, backed by Supabase with real-time updates. |
| **Roulette / Round Gambling** | In-app games. |
| **Stones** | Collectible / in-game asset feature. |
| **Genealogy** | Visual referral / network tree. |
| **Wallet** | Connect any wallet via Reown AppKit (WalletConnect) with on-chain balances. |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Radix UI, lucide-react
- **Web3:** wagmi, viem, ethers, Reown AppKit (WalletConnect)
- **Backend / Data:** Supabase (Postgres + realtime)
- **State / Data fetching:** TanStack React Query
- **Charts:** ECharts, Recharts

---

## Prerequisites

- **Node.js 18.18+** (Node 20+ recommended)
- **npm**
- A **Supabase** project (free tier works)
- A **Reown** Project ID — free at [dashboard.reown.com](https://dashboard.reown.com)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# Supabase — from Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # secret — server only

# Reown AppKit / WalletConnect — from dashboard.reown.com
NEXT_PUBLIC_PROJECT_ID=your-reown-project-id

# Auth — any random 32-byte string (generate: openssl rand -base64 32)
AUTH_SECRET=your-auth-secret
```

> The `SUPABASE_SERVICE_ROLE_KEY` grants full database access — keep it secret and never expose it to the client.

### 3. Set up the database

The sport-betting feature requires database tables. Apply the SQL in [`supabase/migrations/`](supabase/migrations/) to your Supabase project (via the Supabase SQL Editor or the Supabase CLI), then optionally load [`supabase/seed.sql`](supabase/seed.sql) for sample data.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production build. |
| `npm run lint` | Run ESLint. |

---

## Environment Variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sport betting | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sport betting | Public client key |
| `SUPABASE_SERVICE_ROLE_KEY` | Sport betting (server) | **Secret** — server only |
| `NEXT_PUBLIC_PROJECT_ID` | App startup / Wallet | App requires a value to boot |
| `AUTH_SECRET` | Auth | Signs session tokens |

---

## Project Structure

```
app/            App Router pages and API routes
components/     Reusable UI and custom components (navbar, sidebar, wallet)
config/         wagmi / Web3 configuration
context/        React providers (AppKit, React Query)
hooks/          Custom React hooks
lib/            Utilities (auth, JWT, Supabase, AppKit client)
supabase/       Database migrations and seed data
public/         Static assets
```

---

## Deployment

Deploy to any Node host that supports Next.js (e.g. **Vercel**). Set the same environment variables in your hosting provider's dashboard. The app uses server-side API routes, so a static-only host is not supported.
