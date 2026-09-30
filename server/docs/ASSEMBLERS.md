# Assemblers

An assembler layer gives you separation of concerns, stability of your internal domain model, cleaner controllers, safer evolution of your API, and dramatically easier testing.  

This architectural choice has long‑term consequences for an MMORPG backend.

## 🧩 Core takeaway
Using an assembler layer between controllers and services is better because it decouples your external API contract from your internal domain model, allowing each to evolve independently while keeping controllers thin and services pure.

## 🧱 Why this matters — the real architectural benefits

1. **Separation of concerns**: Assemblers isolate the transformation logic between your API and domain models, keeping controllers focused on handling HTTP requests and responses.
2. **Stability of internal models**: Changes in the API layer do not directly impact the internal domain models, reducing the risk of introducing bugs.
3. **Cleaner controllers**: By offloading mapping logic to assemblers, controllers remain thin and easier to maintain.
4. **Safer API evolution**: Assemblers act as a buffer, allowing the API to evolve independently from the internal models.
5. **Easier testing**: With a clear separation, you can test assemblers, controllers, and services independently, leading to more reliable and maintainable code.
6. **Reusability**: Assemblers can be reused across different controllers and services, promoting DRY (Don't Repeat Yourself) principles.
7. **Consistency**: Centralizing the transformation logic in assemblers ensures consistent data mapping across the application, reducing the likelihood of discrepancies.
8. **Improved readability**: With a dedicated layer for data transformation, the codebase becomes more readable and easier to understand for new developers joining the project.
9. **Performance optimization**: Assemblers can be optimized for performance, allowing for efficient data transformation without cluttering the business logic in services or controllers.
10. **Enhanced maintainability**: As the application grows, having a dedicated assembler layer makes it easier to manage changes and updates, leading to a more maintainable codebase over time.
11. **Facilitates API versioning**: Assemblers can help manage different versions of the API by providing a clear mapping between different data structures, making it easier to support multiple versions simultaneously.
12. **Improved debugging**: With a centralized layer for data transformation, it becomes easier to trace and debug issues related to data mapping, leading to faster identification and resolution of problems.

## 🧠 Non-obvious insight
Assemblers give you freedom to evolve your domain model aggressively — which is exactly what happens in game development. Game logic changes constantly. API contracts change slowly.

This mismatch is why the assembler layer is not just “nice to have” — it’s a strategic architectural boundary.

## 🗂️ Summary table
| Layer | Responsibility | Without Assemblers | With Assemblers |
| --- | --- | --- | --- |
| **Controller** | Accept/return DTOs | Bloated, mapping logic everywhere | Thin, clean, predictable |
| **Assembler** | Map DTO ↔ Domain | Missing → chaos | Centralized, testable |
| **Domain** | Business logic | Polluted with transport concerns | Pure, stable, expressive |
| **Service** | Use domain objects | Forced to handle DTOs | Clean domain-only logic |
| **API** | Client contract | Breaks on domain changes | Stable, versionable |

