# Money Track - AI Coding Guidelines

## Architecture Overview
Full-stack expense tracker with React frontend and Spring Boot backend. Frontend serves from `http://localhost:5173`, backend from `http://localhost:8080/api`. JWT authentication via localStorage. MySQL database with JPA.

## Backend Patterns
- **Entities**: Use Lombok `@Getter/@Setter/@NoArgsConstructor/@AllArgsConstructor/@Builder`. Example: [User.java](backend/src/main/java/com/tracker/expense/entity/User.java)
- **Controllers**: REST with `@Valid` validation, `ResponseEntity`, Swagger annotations. Security via `@SecurityRequirement("bearerAuth")`. Example: [TransactionController.java](backend/src/main/java/com/tracker/expense/controller/TransactionController.java)
- **Services**: Business logic in service layer, injected with `@RequiredArgsConstructor`.
- **Config**: JWT secret and CORS in [application.properties](backend/src/main/resources/application.properties). DDL auto-update for dev.

## Frontend Patterns
- **Components**: Functional React with hooks. Use `clsx` for conditional Tailwind classes. Icons from `lucide-react`. Example: [TransactionList.jsx](src/components/TransactionList.jsx)
- **State Management**: Global state in `AppContext` and `AuthContext`. Data fetched on mount with error handling via `react-toastify`.
- **Styling**: Tailwind with custom theme in [tailwind.config.js](tailwind.config.js). Custom classes like `.glass-card` in [index.css](src/index.css). Animations with `framer-motion`.
- **API Calls**: Axios with JWT interceptor in [api.js](src/services/api.js). Base URL: `http://localhost:8080/api`
- **Routing**: Protected routes with `ProtectedRoute` component. Auth state in `AuthContext`.

## Developer Workflows
- **Frontend Dev**: `npm run dev` (Vite on :5173)
- **Backend Dev**: `mvn spring-boot:run` (Spring Boot on :8080)
- **Database**: MySQL on localhost:3306, user/pass: root/root. Schema: `expense_tracker`
- **Build**: `npm run build` for frontend, `mvn clean package` for backend JAR
- **Lint**: `npm run lint` (ESLint with React rules)

## Key Conventions
- Money values: `BigDecimal` in backend, formatted with `Intl.NumberFormat` in frontend
- Dates: `LocalDate`/`LocalDateTime` in backend, `date-fns` in frontend
- Enums: `TransactionType`, `PaymentMethod`, `Role` as strings in DB
- Error Handling: Try-catch with toast notifications in frontend, validation errors in backend
- Modals: Custom modal components for forms, managed in `GlobalModals.jsx`</content>
<parameter name="filePath">.github/copilot-instructions.md