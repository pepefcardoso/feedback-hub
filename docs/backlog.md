# Development Backlog (MVP)

This backlog is organized into logical phases to ensure incremental deliveries. Do not proceed to the next phase without testing and validating the previous one.

## Phase 1: Foundation & Infrastructure (Backend)

- [ ] Initialize Node.js + TS project and configure ESLint/Prettier.
- [ ] Configure PostgreSQL connection via Docker Compose.
- [ ] Initialize Prisma, define the schema (User, Feedback, Vote, Comment), and run migrations.
- [ ] Implement the `AppError` class and the Global Error Handling Middleware in Express.
- [ ] Implement basic dependency injection (Factories) for repositories.

## Phase 2: Business Rules & API (Backend)

- [ ] **Auth:** Implement User Registration Use Case and Controller (Password hashing with bcrypt).
- [ ] **Auth:** Implement Login Use Case and Controller (JWT generation in HttpOnly Cookie).
- [ ] **Feedback:** Implement `CreateFeedbackUseCase` and Controller.
- [ ] **Feedback:** Implement `ListFeedbacksUseCase` (with pagination and aggregated vote count).
- [ ] **Vote:** Implement `ToggleVoteUseCase` (Rule: create a vote, or delete it if it already exists).
- [ ] **Middleware:** Create `ensureAuthenticated` and `ensureAdmin` middlewares for route protection.

## Phase 3: Frontend Foundation (Next.js)

- [ ] Initialize Next.js (App Router), Tailwind, and install shadcn/ui.
- [ ] Create the routing structure (`/`, `/login`, `/register`, `/feedback/[id]`, `/admin`).
- [ ] Configure the HTTP client (Axios or Fetch wrapper) with interceptors to handle Cookies/Credentials.
- [ ] Develop base layout components (Navbar, Category Sidebar, Footer).

## Phase 4: Frontend Integration & UI

- [ ] Integrate Login and Registration pages with the API (session state management).
- [ ] Implement the feedback suggestion feed on the homepage (consuming the listing route).
- [ ] Create a Modal/Page to submit a new feedback suggestion.
- [ ] Implement the Vote button with an optimistic update (Optimistic UI).
- [ ] Develop the Administrative Dashboard (Change feedback status: Idea -> Planned -> In Progress -> Completed).

## Phase 5: Refinement and Deployment

- [ ] Code review and refactoring of N+1 queries if identified.
- [ ] Deploy the Database (e.g., Supabase, Render, Neon).
- [ ] Deploy the Backend (e.g., Render, Railway).
- [ ] Deploy the Frontend (Vercel).
- [ ] Update the README with local setup instructions and production links.
