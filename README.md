# College Discovery Platform — Backend

A production-grade backend API for a college discovery platform built with Next.js, TypeScript, Prisma ORM, and PostgreSQL.

## Tech Stack
- **Framework**: Next.js 14 (App Router API Routes)
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon.tech recommended)
- **Auth**: JWT (jsonwebtoken + bcryptjs)
- **Validation**: Zod

## Features Built
- ✅ College listing with search, filters, and pagination
- ✅ College detail page (courses, placements, reviews)
- ✅ Compare 2–3 colleges side-by-side
- ✅ Authentication (register/login with JWT)
- ✅ Saved colleges (per user)
- ✅ Review system with live rating recalculation
- ✅ Centralized error handling
- ✅ Input validation on all endpoints

## Setup

### 1. Clone & Install
```bash
git clone <your-repo>
cd college-discovery
npm install
```

### 2. Setup Database (Neon.tech)
1. Go to https://neon.tech and create a free account
2. Create a new project → get the connection string
3. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@host/college_discovery?sslmode=require"
JWT_SECRET="run: openssl rand -base64 32"
```

### 3. Push Schema & Seed
```bash
npm run db:push     # Push schema to DB
npm run db:seed     # Seed with 15 Indian colleges
```

### 4. Run Locally
```bash
npm run dev
```

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login, get token |

### Colleges
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/colleges` | No | List + search + filter + paginate |
| GET | `/api/colleges/:id` | No | College detail with courses/placements/reviews |
| GET | `/api/colleges/compare?ids=id1,id2,id3` | No | Compare colleges |
| POST | `/api/colleges/:id/reviews` | Yes | Submit review |

### Saved Colleges
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/saved` | Yes | Get saved colleges |
| POST | `/api/saved/:collegeId` | Yes | Save a college |
| DELETE | `/api/saved/:collegeId` | Yes | Unsave a college |

### College Filters (GET /api/colleges)
| Param | Type | Example |
|-------|------|---------|
| `search` | string | `?search=IIT` |
| `state` | string | `?state=Maharashtra` |
| `type` | PUBLIC \| PRIVATE \| DEEMED | `?type=PUBLIC` |
| `minRating` | number | `?minRating=4` |
| `minFees` | number | `?minFees=100000` |
| `maxFees` | number | `?maxFees=500000` |
| `sortBy` | rating \| name \| fees | `?sortBy=rating` |
| `order` | asc \| desc | `?order=desc` |
| `page` | number | `?page=2` |
| `limit` | number (max 50) | `?limit=10` |

## Deployment (Railway + Neon)

### Database: Neon.tech
1. Create project at https://neon.tech
2. Copy the connection string

### App: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

railway login
railway init
railway add        # Add PostgreSQL or use Neon connection string
railway up
```

Set environment variables in Railway dashboard:
- `DATABASE_URL`
- `JWT_SECRET`

## Architecture Decisions

### Why Next.js API Routes over NestJS?
For an MVP, API Routes give faster setup with the same TypeScript safety. NestJS adds overhead (modules, decorators, DI) that isn't needed at this scale.

### Why JWT over Sessions?
Stateless auth is simpler to deploy (no Redis needed), scales horizontally, and works well for API-first backends.

### Why Prisma over raw SQL?
Type-safe queries, auto-generated client, migration tooling, and readable schema definition. The performance overhead is negligible at this scale.

### Error Handling
Centralized `handleError()` in `lib/errors.ts` catches Zod validation errors, custom error codes (UNAUTHORIZED, NOT_FOUND, CONFLICT), and generic 500s — keeping all route handlers clean.

### Rating Calculation
Reviews use a database transaction to atomically create the review and update the college's `overallRating` using a running average formula — avoids recalculating from scratch on every write.
