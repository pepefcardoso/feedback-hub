# Security Guidelines

Our security approach is based on "Zero Trust" and defense in depth. Follow these rules strictly.

## 1. Session and Token Management

- ✅ **DO:** Store JWTs exclusively in `HttpOnly`, `Secure`, and `SameSite=Strict` cookies.
- ❌ **DON'T:** Never return the JWT in the response body (`response.json`) to be saved in the frontend's `localStorage`. This exposes the application to session hijacking via XSS.

## 2. Input Validation

- ✅ **DO:** Validate 100% of incoming payloads (Body, Query, Params) using a schema validation library (e.g., Zod) at the _Controllers/Middlewares_ layer, before the request reaches the _Use Case_.
- ❌ **DON'T:** Do not rely on TypeScript typings for security validation. TS does not exist at runtime.

## 3. Authorization and Access Control (RBAC/ABAC)

- ✅ **DO:** Validate resource ownership. For edit/delete routes, check if the session's `user.id` matches the `authorId` of the database record, OR if the user has the `ADMIN` role.
- ❌ **DON'T:** Do not rely on "hidden routes" in the frontend. The API must always assume the client is hostile and validate permissions independently.

## 4. Abuse Prevention

- ✅ **DO:** Implement _Rate Limiting_ (e.g., `express-rate-limit`), especially on Authentication (Login/Register) and Feedback Creation routes, to prevent brute force attacks and spam.
