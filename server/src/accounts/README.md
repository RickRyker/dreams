# Account Module

The `account/` module implements all authentication, verification, and account‑level functionality.  
It follows the strict layered architecture used across the entire backend:

```
Router → Controller → Assembler → Service → Adapter → Mapper → Repository → Prisma
```

No Prisma models ever leave the repository layer.  
No DTOs ever enter the repository layer.

Along with `server/src/players/*` and `server/src/combat/*`, this module is a canonical
reference pattern for future server module rewrites.

---

## Folder Structure

```
account/
  adapters/
    AccountAdapter.ts
  controllers/
    AuthController.ts
    PasswordResetController.ts
    VerificationController.ts
  assemblers/
    AccountAssembler.ts
  email/
    EmailTemplates.ts
    EmailService.ts
  mappers/
    AccountMapper.ts
  middleware/
    AuthMiddleware.ts
  repositories/
    AccountRepository.ts
  routers/
    AccountRouter.ts
    PasswordResetRouter.ts
    UserRouter.ts
    VerificationRouter.ts
  services/
    AccountService.ts
    VerificationService.ts
```

---

## Layer Responsibilities

### **Routers**
- Bind HTTP routes to controllers.
- No logic, no validation, no Prisma.

### **Controllers**
- Parse request input.
- Call assemblers and services.
- Return client DTOs only.

### **Assemblers**
- Convert client DTOs to internal commands.
- Convert service results back to client DTOs.

### **Services**
- Contain business logic (login, register, verify email, reset password).
- Never return Prisma models.
- Accept internal commands from assemblers.
- Use adapters to convert data.

### **Adapters**
- Convert between DTOs and Prisma input.
- Compose multiple mappers when needed.

### **Mappers**
- Convert Prisma → DTO and DTO → Prisma.
- No logic beyond transformation.

### **Repositories**
- Direct Prisma access.
- No DTOs, no business logic.

---

## Data Flow Example (Login)

```
POST /auth/login
  → AuthController.login()
    → AccountService.login()
      → AccountRepository.findByEmail()
      → AccountAdapter (mapping)
    ← AccountDto
```

---

## Guarantees

- No Prisma types leak upward.
- All timestamps normalized to `number` (ms).
- All controllers return DTOs only.
- All services are pure and testable.

## Testing Convention

- Tests are stored under `server/test/*` and mirror `server/src/*` paths.
