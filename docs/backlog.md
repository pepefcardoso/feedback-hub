# Development Backlog (MVP)

## Phase 1: Foundation & Infrastructure (Backend)

- ✅ **1.1** Initialize Node.js + TS project and configure ESLint/Prettier. 
- ✅ **1.2** Configure PostgreSQL connection via Docker Compose.
- ✅ **1.3** Initialize Prisma, define the schema (User, Feedback, Vote, Comment), and run migrations.
- **1.4** Implement the `AppError` class and the Global Error Handling Middleware in Express.
- **1.5** Implement basic dependency injection (Factories) for repositories.

## Phase 2: Business Rules & API (Backend)

- **2.1** **Auth:** Implement User Registration Use Case and Controller (Password hashing with bcrypt).
- **2.2** **Auth:** Implement Login Use Case and Controller (JWT generation in HttpOnly Cookie).
- **2.3** **Feedback:** Implement `CreateFeedbackUseCase` and Controller.
- **2.4** **Feedback:** Implement `ListFeedbacksUseCase` (with pagination and aggregated vote count).
- **2.5** **Vote:** Implement `ToggleVoteUseCase` (Rule: create a vote, or delete it if it already exists).
- **2.6** **Middleware:** Create `ensureAuthenticated` and `ensureAdmin` middlewares for route protection.

## Phase 3: Frontend Foundation (Next.js)

- **3.1** Initialize Next.js (App Router), Tailwind, and install shadcn/ui.
- **3.2** Create the routing structure (`/`, `/login`, `/register`, `/feedback/[id]`, `/admin`).
- **3.3** Configure the HTTP client (Axios or Fetch wrapper) with interceptors to handle Cookies/Credentials.
- **3.4** Develop base layout components (Navbar, Category Sidebar, Footer).

## Phase 4: Frontend Integration & UI

- **4.1** Integrate Login and Registration pages with the API (session state management).
- **4.2** Implement the feedback suggestion feed on the homepage (consuming the listing route).
- **4.3** Create a Modal/Page to submit a new feedback suggestion.
- **4.4** Implement the Vote button with an optimistic update (Optimistic UI).
- **4.5** Develop the Administrative Dashboard (Change feedback status: Idea -> Planned -> In Progress -> Completed).

## Phase 5: Refinement and Deployment

- **5.1** Code review and refactoring of N+1 queries if identified (check Prisma `include` usage).
- **5.2** Deploy the Database (e.g., Supabase, Render, Neon).
- **5.3** Deploy the Backend (e.g., Render, Railway).
- **5.4** Deploy the Frontend (Vercel).
- **5.5** Update the README with local setup instructions and production links.
