<!-- README.md -->

# Feedback Hub — API

REST API for collecting, prioritizing, and tracking user feedback, with voting and status workflow, for product teams that need a lightweight feature-request board.

## Problem

Product teams collect feature requests across support tickets, Slack threads, and spreadsheets, with no shared view of what's requested most or its status. Feedback Hub gives users a single place to submit and vote on feedback, and gives admins a status pipeline (idea → planned → in progress → completed) to communicate what's being worked on.

## Stack

| Layer      | Technology             |
| ---------- | ---------------------- |
| Runtime    | Node.js, TypeScript    |
| Framework  | Express                |
| ORM / DB   | Prisma 7, PostgreSQL   |
| Auth       | JWT (HTTP-only cookie) |
| Validation | Zod                    |
| Infra      | Docker Compose         |

## Architecture

```
Client (feedback-hub-web) ──HTTPS + cookie──▶ Express app (server.ts)
                                                   │
                                    ┌──────────────┼──────────────┐
                                    ▼               ▼              ▼
                            /api/users       /api/feedbacks    errorHandler
                            (Controllers)     (Controllers)    (global)
                                    │               │
                        ensureAuthenticated   optionalAuth / ensureAuthenticated
                        (JWT from cookie)      ensureAdmin (status changes)
                                    │               │
                                    └───────┬───────┘
                                            ▼
                                   Prisma Client ──▶ PostgreSQL
```

Clean-Architecture-style layering: `presentation` (controllers, routes, middlewares) → `application` (use cases) → `domain` (entities, rules) ← `infrastructure` (Prisma repositories). Use cases depend on repository interfaces, never on Prisma directly — see [`docs/architecture-guidelines.md`](./docs/architecture-guidelines.md).

## Key features

| Domain   | Features                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Auth     | Register, login/logout via JWT cookie, get current user                                                                    |
| Feedback | Create, list (with optional auth for vote state), get by id, admin-only status update (idea/planned/in progress/completed) |
| Voting   | Toggle upvote/downvote per user per feedback item, one vote per user enforced at the DB level                              |
| Comments | Create and list comments on a feedback item                                                                                |

## Project structure

```
src/
  domain/            # entities, business rules
  application/        # use cases
  infrastructure/       # Prisma repositories, JwtProvider
  presentation/
    controllers/          # feedback/, user/, comment/, vote/
    middlewares/            # ensureAuthenticated, ensureAdmin, optionalAuth, errorHandler
    routes/                  # feedback.routes.ts, user.routes.ts
  shared/                  # AppError, asyncHandler
  server.ts                # app bootstrap, CORS, route mounting
prisma/
  schema.prisma       # User, Feedback, Vote, Comment
  seed.ts
docs/                # architecture-guidelines, security-guidelines, design-docs, ui-ux-guidelines, backlog
```

## Getting started

### Prerequisites

- Node.js 20+
- Docker Desktop

### Install

```bash
git clone https://github.com/pepefcardoso/feedback-hub.git
cd feedback-hub
npm install
cp .env.example .env
npm run services:up
npx prisma migrate dev
npm run seed
npm run dev
```

API runs at `http://localhost:3333`.

## Environment variables

| Variable                                                      | Description                                                  | Example / Required                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `PORT`                                                        | Server port                                                  | `3333`                                                               |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` / `DB_HOST` / `DB_PORT` | Local Docker Postgres credentials                            | Required for `docker-compose.yml`                                    |
| `DATABASE_URL`                                                | Prisma connection string                                     | `postgresql://admin:admin@localhost:5434/feedback_hub?schema=public` |
| `JWT_SECRET`                                                  | JWT signing secret                                           | Required — use a strong random string                                |
| `JWT_EXPIRES_IN`                                              | JWT expiry                                                   | `1d`                                                                 |
| `FRONTEND_URL`                                                | Allowed CORS origin (also drives cookie `SameSite` behavior) | `http://localhost:3000`                                              |

## API reference

Base path: `/api`. Auth via `token` HTTP-only cookie.

| Method | Route                     | Auth           | Description                                          |
| ------ | ------------------------- | -------------- | ---------------------------------------------------- |
| POST   | `/users/register`         | —              | Register a new user                                  |
| POST   | `/users/login`            | —              | Login, sets `token` cookie                           |
| POST   | `/users/logout`           | —              | Clears `token` cookie                                |
| GET    | `/users/me`               | Cookie         | Current user                                         |
| GET    | `/feedbacks`              | Optional       | List feedback (includes `hasVoted` if authenticated) |
| POST   | `/feedbacks`              | Cookie         | Create feedback                                      |
| GET    | `/feedbacks/:id`          | Optional       | Get feedback by id                                   |
| PATCH  | `/feedbacks/:id/status`   | Cookie + Admin | Update feedback status                               |
| POST   | `/feedbacks/:id/vote`     | Cookie         | Toggle upvote/downvote                               |
| GET    | `/feedbacks/:id/comments` | —              | List comments                                        |
| POST   | `/feedbacks/:id/comments` | Cookie         | Create comment                                       |

## Testing

No automated test suite is configured yet (no `test` script, no `*.test.ts` files). Current gate before commit:

```bash
npm run lint
npx tsc --noEmit
```

## Deployment

Frontend, backend, and database ship as separate services.

**Database (Neon / Supabase):** provision PostgreSQL, get the connection string.

**Backend (Render / Railway):**

```bash
# Build command
npm install && npm run build
# Start command
npm run migrate:deploy && npm start
```

Required env vars: `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` (set after the frontend is deployed, then redeploy to pick up CORS).

**Cross-domain auth:** frontend and backend live on different domains in production, so cookies must be configured for cross-site use — `secure: true` and `sameSite: "none"` in production, `sameSite: "strict"` in development (see `LoginUserController.ts` / `LogoutUserController.ts`). Both environments must run over HTTPS or the auth cookie will be rejected by the browser.

## Non-negotiable rules

See [`docs/architecture-guidelines.md`](./docs/architecture-guidelines.md) (dependency rule, error handling, repository pattern) and [`docs/security-guidelines.md`](./docs/security-guidelines.md).

## License

`package.json` declares `ISC`; no `LICENSE` file is present in the repository.
