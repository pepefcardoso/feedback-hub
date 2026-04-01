# Development Backlog (MVP)

## Phase 0: Stabilization & Hotfixes

- ✅ **BUG-1** (P0): `RepositoryFactory` is missing `getVoteRepository()`. Causes a runtime crash on all voting attempts.
- ✅ **BUG-2** (P1): `Navbar.getUser()` incorrectly unwraps the API envelope, causing silent data corruption for user sessions and breaking the UserNav.
- ✅ **BUG-3** (P1): Missing `/api/auth/logout` backend route, causing logout to silently fail and leave the `HttpOnly` cookie active.
- ✅ **BUG-4** (P1): Port/URL mismatch across environments (`server.ts`, `.env`, `api-client.ts`), causing persistent CORS errors and blocking frontend-to-backend communication.
- ✅ **BUG-5** (P2): Seed admin user has an invalid `passwordHash` (not a real bcrypt string), making it impossible to log into the admin dashboard locally.

## Phase 1: Foundation & Infrastructure (Backend)

- ✅ **1.1** Initialize Node.js + TS project and configure ESLint/Prettier.
- ✅ **1.2** Configure PostgreSQL connection via Docker Compose.
- ✅ **1.3** Initialize Prisma, define the schema (User, Feedback, Vote, Comment), and run migrations.
- ✅ **1.4** Implement the `AppError` class and the Global Error Handling Middleware in Express.
- ✅ **1.5** Implement basic dependency injection (Factories) for repositories.

## Phase 2: Business Rules & API (Backend)

- ✅ **2.1** **Auth:** Implement User Registration Use Case and Controller (Password hashing with bcrypt).
- ✅ **2.2** **Auth:** Implement Login Use Case and Controller (JWT generation in HttpOnly Cookie).
- ✅ **2.3** **Feedback:** Implement `CreateFeedbackUseCase` and Controller.
- ✅ **2.4** **Feedback:** Implement `ListFeedbacksUseCase` (with pagination and aggregated vote count).
- ✅ **2.5** **Vote:** Implement `ToggleVoteUseCase` (Rule: create a vote, or delete it if it already exists).
- ✅ **2.6** **Middleware:** Create `ensureAuthenticated` and `ensureAdmin` middlewares for route protection.
- ✅ **2.7** **Feedback:** Implement `GetFeedbackByIdUseCase` and Controller (`GET /:id` - including author and vote status).
- ⏳ **2.8** **Comments:** Implement `CreateCommentUseCase` and Controller (`POST /:id/comments`).
- ⏳ **2.9** **Comments:** Implement `ListCommentsUseCase` and Controller (`GET /:id/comments`).
- ✅ **2.10** **Feedback (Enhancement):** Update `ListFeedbacksUseCase` to support query parameters for filtering (by `category`) and sorting (by `voteCount` DESC or `createdAt` DESC).

## Phase 3: Frontend Foundation (Next.js)

- ✅ **3.1** Initialize Next.js (App Router), Tailwind, and install shadcn/ui.
- ✅ **3.2** Create the routing structure (`/`, `/login`, `/register`, `/feedback/[id]`, `/admin`).
- ⚠️ **3.3** Configure the HTTP client (Axios or Fetch wrapper) with interceptors to handle Cookies/Credentials. _Note: Port mismatch in fallback (BUG-4)._
- ⚠️ **3.4** Develop base layout components (Navbar, Category Sidebar, Footer). _Note: Navbar data unwrap issue (BUG-2)._

## Phase 4: Frontend Integration & UI

- ⏳ **4.1** **Auth UI (Register):** Implement the Registration form in `app/register/page.tsx` (using react-hook-form + zod) and integrate with the `POST /register` API route.
- ✅ **4.2** **Auth UI (Login):** Implement the Login form in `app/login/page.tsx` and integrate with the `POST /login` API route. Establish session state management (e.g., AuthContext).
- ✅ **4.3** Implement the feedback suggestion feed on the homepage (consuming the listing route).
- ✅ **4.4** Create a Modal/Page to submit a new feedback suggestion.
- ❌ **4.5** Implement the Vote button with an optimistic update (Optimistic UI). _Note: UI is currently decorative only; logic and API calls are missing._
- ✅ **4.6** Develop the Administrative Dashboard (Change feedback status: Idea -> Planned -> In Progress -> Completed).
- ✅ **4.7** **UI/UX:** Wire up the Category Sidebar and Sort Dropdown to dynamically filter/sort the homepage feed (connecting to backend sorting).
- ⏳ **4.8** **UI/UX:** Implement the Feedback Detail Page (`app/feedback/[id]/page.tsx`), fetching comprehensive data (Title, description, status badge, author).
- ⏳ **4.9** **UI/UX:** Implement the Comments Section in the Detail Page (List of comments and "Add Comment" form).
- ⚠️ **4.10** **UI/UX:** Implement a User Dropdown/Profile Menu in the Navbar (using `GET /me` data) with a Logout action. _Note: Broken by BUG-2 (data unwrap) and BUG-3 (missing logout route)._

## Phase 5: Refinement and Deployment

- ✅ **5.1** Code review and refactoring of N+1 queries if identified (check Prisma `include` usage).
- ⏳ **5.2** Deploy the Database (e.g., Supabase, Render, Neon).
- ⏳ **5.3** Deploy the Backend (e.g., Render, Railway).
- ⏳ **5.4** Deploy the Frontend (Vercel).
- ⏳ **5.5** Update the README with local setup instructions and production links.

---

## Technical Debt & Architecture Flags

**Premature Complexity regarding `VoteType` enum (`UPVOTE` / `DOWNVOTE`)**
The original design document specifies a simple upvote toggle, but the current schema and use case support bidirectional voting (with a `countChange` of ±2). However, the UI never exposes a downvote action, rendering half of this system dead code. _Recommendation:_ If downvoting is not on the immediate roadmap, we should simplify this to a boolean toggle to reduce surface area and testing burden.

**Unnecessary Surrogate Key on `Vote.id`**
The first database migration correctly used a composite primary key `(userId, feedbackId)`. A subsequent migration replaced this with a surrogate UUID `id` and demoted the composite to a unique index. Because all lookups still go through the unique index, the surrogate key adds no query benefit and clutters the schema. _Recommendation:_ Revert to the composite primary key when feasible to enforce clean relational design, though this is not an immediate blocker for MVP.
