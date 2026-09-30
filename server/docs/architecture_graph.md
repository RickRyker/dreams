                          ┌───────────────────────────────┐
                          │            Router             │
                          │  (Express route definitions)  │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │          Controller           │
                          │  - Validates input            │
                          │  - Calls services             │
                          │  - Returns DTOs only          │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │          Assembler            │
                          │  - Converts DTO ↔ Model       │
                          │  - No business logic          │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │            Service            │
                          │  - Business logic             │
                          │  - No Prisma models           │
                          │  - No DTOs                    │
                          │  - Uses adapters/mappers      │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │            Adapter            │
                          │  - Composes mappers           │
                          │  - Converts DTO ↔ Prisma      │
                          │  - No business logic          │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │            Mapper             │
                          │  - fromPrisma(model) → DTO    │
                          │  - toPrisma(dto) → Prisma     │
                          │  - Pure transformation only   │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │          Repository           │
                          │  - Direct Prisma access       │
                          │  - No DTOs                    │
                          │  - No logic                   │
                          └───────────────┬───────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │            Prisma             │
                          │  - Database ORM               │
                          │  - Raw models                 │
                          └───────────────────────────────┘
