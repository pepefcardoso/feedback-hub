# Architecture Guidelines

We use a pragmatic variation of Clean Architecture. The primary goals are testability and long-term maintainability.

## 1. The Dependency Rule

- ✅ **DO:** Inner layers (Domain, Use Cases) must not import ANYTHING from outer layers (Express, Prisma, HTTP libraries).
- ❌ **DON'T:** Never pass Express Request/Response objects into a _Use Case_. The Controller must extract the data and pass clean primitives or DTOs.

## 2. Error Handling

- ✅ **DO:** Use a custom `AppError(message, statusCode)` class for business rules. Let the errors "bubble up" to the Express _Global Error Middleware_.
- ❌ **DON'T:** Avoid scattering multiple `try/catch` blocks across _Use Cases_. The use case should focus on the happy path and throw clear exceptions when rules are violated.

## 3. Database Isolation (Repository Pattern)

- ✅ **DO:** _Use Cases_ must depend on interfaces (e.g., `IFeedbackRepository`). The concrete implementation (e.g., `PrismaFeedbackRepository`) is injected.
- ❌ **DON'T:** Never import the Prisma Client directly inside a _Use Case_. If we need to swap the ORM, the business logic must not be touched.

## 4. Business Rules

- ✅ **DO:** All conditional business logic ("Has the user already voted?", "Can this status be changed?") must reside exclusively in the _Use Case_ or the Domain Entity.
