### Phase 1: Codebase Preparation (Crucial for Production Auth)

Before deploying, you must fix how cookies are handled. In production, your frontend (`.vercel.app`) and backend (`.onrender.com`) will be on different domains. Browsers will block your authentication cookies unless they are explicitly configured for cross-site usage.

**1. Update `package.json` (Backend)**
Add a command to safely run database migrations in production.
```json
  "scripts": {
    // ... existing scripts
    "migrate:deploy": "npx prisma migrate deploy"
  }
```

**2. Update `LoginUserController.ts` (Backend)**
Update the `res.cookie` configuration to dynamically handle production environments.
```typescript
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction, // MUST be true in production
      sameSite: isProduction ? 'none' : 'strict', // 'none' required for cross-domain
      maxAge: 1000 * 60 * 60 * 24,
    });
```

**3. Update `LogoutUserController.ts` (Backend)**
The browser will refuse to clear the cookie if the attributes don't match exactly how it was set.
```typescript
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'strict',
      path: '/',
    });
```

*(Note: Your existing `lib/api-client.ts` already uses `credentials: "include"`, and `server.ts` handles CORS via the `FRONTEND_URL` environment variable correctly, so no changes are needed there.)*

---

### Phase 2: Step-by-Step Deployment

#### Step 1: Deploy the Database (Neon or Supabase)
1. Create an account on Neon.tech or Supabase.
2. Create a new PostgreSQL project.
3. Once provisioned, find your Connection String (URI). It will look like: `postgres://user:password@host.region.db.com/dbname?sslmode=require`.
4. Copy this URI. You will need it for the Backend.

#### Step 2: Deploy the Backend (Render)
1. Create an account on [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository and select the `feedback-hub` (backend) folder/repo.
3. Configure the service:
   * **Runtime:** Node
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npm run migrate:deploy && npm start` *(This ensures the DB schema is updated before the server starts accepting requests).*
4. Add Environment Variables:
   * `NODE_ENV`: `production`
   * `DATABASE_URL`: *(Paste your Postgres URI from Step 1)*
   * `JWT_SECRET`: *(Generate a strong random string)*
   * `FRONTEND_URL`: *(Leave blank for now, we will update this after deploying Vercel).*
5. Deploy the service. Once live, copy the Render URL (e.g., `https://feedback-hub-api.onrender.com`).

#### Step 3: Deploy the Frontend (Vercel)
1. Create an account on [Vercel](https://vercel.com/) and Add a New Project.
2. Connect your GitHub repository and select the `feedback-hub-web` (frontend) folder/repo.
3. Framework Preset should automatically detect **Next.js**.
4. Add Environment Variables:
   * `NEXT_PUBLIC_API_URL`: *(Paste your Render backend URL here, e.g., `https://feedback-hub-api.onrender.com/api`. **Make sure there is no trailing slash**).*
5. Click **Deploy**.
6. Once deployed, copy your Vercel production URL (e.g., `https://feedback-hub-web.vercel.app`).

#### Step 4: Finalize Backend Configuration
1. Go back to your Render Dashboard for the Backend service.
2. Update the `FRONTEND_URL` environment variable to your Vercel URL (e.g., `https://feedback-hub-web.vercel.app`).
3. Manually trigger a redeploy on Render so it picks up the correct CORS origin.

### README.md

# Feedback Hub

Feedback Hub is a full-stack application for collecting, managing, and prioritizing user feedback. 

## Architecture

* **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript.
* **Backend:** Node.js, Express, TypeScript, Prisma ORM.
* **Database:** PostgreSQL.
* **Authentication:** JWT stored in HTTP-only cookies.

---

## 🚀 Live Demo
* **Frontend:** [Insert Vercel URL Here]
* **Backend API:** [Insert Render URL Here]

---

## 🛠 Local Development Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [Docker Desktop](https://www.docker.com/) (for running the local PostgreSQL database)

### 1. Start the Database
The project includes a `docker-compose.yml` file to easily spin up a local PostgreSQL instance.
```bash
cd feedback-hub
npm run services:up
```

### 2. Configure the Backend
1. Navigate to the backend directory: `cd feedback-hub`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the example: `cp .env.example .env`
4. Update the `.env` variables:
   ```env
   DATABASE_URL="postgresql://postgres:docker@localhost:5432/feedback_hub?schema=public"
   PORT=3333
   FRONTEND_URL="http://localhost:3000"
   JWT_SECRET="super-secret-local-key"
   NODE_ENV="development"
   ```
5. Run database migrations and seed data: 
   ```bash
   npx prisma migrate dev
   npm run seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   *The API will be available at `http://localhost:3333`.*

### 3. Configure the Frontend
1. Navigate to the frontend directory: `cd feedback-hub-web`
2. Install dependencies: `npm install`
3. Create a `.env` file: `cp .env.example .env`
4. Update the `.env` variables:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3333/api"
   ```
5. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:3000`.*

---

## 📦 Production Deployment

The project is designed to be deployed using separate hosting providers for the frontend, backend, and database.

### 1. Database (Neon / Supabase)
Provision a PostgreSQL database and obtain the connection string (`DATABASE_URL`).

### 2. Backend (Render / Railway)
1. Deploy the `feedback-hub` directory as a Node web service.
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm run migrate:deploy && npm start`
4. **Required Environment Variables:**
   * `NODE_ENV="production"`
   * `DATABASE_URL` (From Step 1)
   * `JWT_SECRET` (Secure random string)
   * `FRONTEND_URL` (The production URL of your Vercel deployment)

### 3. Frontend (Vercel)
1. Deploy the `feedback-hub-web` directory as a Next.js project.
2. **Required Environment Variables:**
   * `NEXT_PUBLIC_API_URL` (The URL of your deployed backend, e.g., `https://api.yourdomain.com/api`)

### Important Notes on Authentication
In production, the backend and frontend exist on different domains. The backend is configured to issue JWTs as `SameSite=None` and `Secure=true` cookies to allow cross-origin authentication. **Both environments must be served over HTTPS** for authentication to work in production.