# Context

Act as a Senior Software Engineer and Systems Architect. Your goal is to execute the **Research** and **Planning** phases of the RPI (Research-Planning-Implementation) workflow for task **[INSERT TASK ID OR DESCRIPTION HERE, e.g., "CreateFeedbackUseCase and Controller"]** from the Feedback Hub project backlog.

# Reference Material

- Project Stack: Node.js, Express, TypeScript, Prisma (PostgreSQL) for the backend. Next.js (App Router), Tailwind CSS, shadcn/ui for the frontend.
- Architectural Standard: Pragmatic Clean Architecture (Domain, Application, Infrastructure, Presentation).
- Project Documentation: Refer to the existing `design-docs.md`, `architecture-guidelines.md`, `security-guidelines.md`, and `ui-ux-guidelines.md`.

# Instructions

1. **Analyze Documentation:** Thoroughly review the architecture and security guidelines to ensure the solution adheres to the Dependency Rule (no outer layers in Use Cases), proper Error Handling (using `AppError`), and Input Validation (using Zod).
2. **Research Phase:**
   - Identify the specific Clean Architecture layers (Entities, Repositories, Use Cases, Controllers, Routes) or Next.js components affected by this task.
   - Check for existing dependencies, APIs, middlewares (e.g., `ensureAuthenticated`), or utility functions that should be reused.
   - Identify potential technical debt, concurrency risks (e.g., race conditions in voting), or N+1 query issues that might impact the implementation.
3. **Planning Phase:**
   - Break down the task into a logical, step-by-step technical execution plan.
   - Define any new functions, classes, Prisma schema changes, or DTOs required.
   - Outline the testing strategy (e.g., Unit tests for Use Cases, Integration tests for Express routes) for this task.

# Deliverables

1. **Implementation Guideline (`guideline_[TASK_NAME].md`):** Provide a structured Markdown file containing the full technical plan, code snippets for complex logic (e.g., Prisma queries or Next.js Server Actions), and a completion checklist.
2. **Context Manifest:** Provide a list of specific source code files (path/filenames based on our established Clean Architecture folder structure) that must be added to the AI agent's context during the final **Implementation** phase.

# Output Format

Please start by providing the content for `guideline_[TASK_NAME].md` inside a code block, followed by the Context Manifest list.
