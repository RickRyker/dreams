# Players Module

The **Players module** implements all gameplay‑related systems for a character in the MMORPG backend.  
It follows a strict layered architecture:

```
Router → Controller → Assembler → Service → Adapter → Mapper → Repository → Prisma
```

No layer leaks into another.  
No Prisma types escape the repository layer.  
No DTOs enter the repository layer.

Along with `server/src/accounts/*` and `server/src/combat/*`, this module is a canonical
reference pattern for future server module work.

---

## 📂 Folder Structure

```
players/
│
├── adapters/
│   └── PlayerHydrationAdapter.ts
│
├── controllers/
│   ├── PlayerBuffController.ts
│   ├── PlayerCombatStateController.ts
│   ├── PlayerCreationController.ts
│   ├── PlayerDeathController.ts
│   ├── PlayerDeleteController.ts
│   ├── PlayerEconomyController.ts
│   ├── PlayerEquipmentController.ts
│   ├── PlayerFullHydrationController.ts
│   ├── PlayerListController.ts
│   ├── PlayerMovementController.ts
│   ├── PlayerQuestsController.ts
│   ├── PlayerSaveController.ts
│   ├── PlayerSelectionController.ts
│   └── PlayerTeleportController.ts
│
├── assemblers/
│   └── PlayerAssembler.ts
│
├── mappers/
│   ├── PlayerEquipmentMapper.ts
│   └── PlayerQuestMapper.ts
│
├── repositories/
│   ├── PlayerRepository.ts
│   ├── PlayerBuffRepository.ts
│   ├── PlayerEquipmentRepository.ts
│   ├── PlayerInventoryRepository.ts
│   ├── PlayerQuestRepository.ts
│   ├── PlayerSkillRepository.ts
│   ├── PlayerSpellRepository.ts
│   └── PlayerStatsRepository.ts
│
├── routers/
│   ├── PlayerRouter.ts
│   ├── PlayerBuffRouter.ts
│   ├── PlayerCombatStateRouter.ts
│   ├── PlayerCreationRouter.ts
│   ├── PlayerDeathRouter.ts
│   ├── PlayerDeleteRouter.ts
│   ├── PlayerEconomyRouter.ts
│   ├── PlayerEquipmentRouter.ts
│   ├── PlayerHydrationRouter.ts
│   ├── PlayerListRouter.ts
│   ├── PlayerMovementRouter.ts
│   ├── PlayerQuestsRouter.ts
│   ├── PlayerSaveRouter.ts
│   ├── PlayerSelectionRouter.ts
│   └── PlayerTeleportRouter.ts
│
└── services/
├── PlayerBuffService.ts
├── PlayerCombatStateService.ts
├── PlayerCreationService.ts
├── PlayerDeathService.ts
├── PlayerDeleteService.ts
├── PlayerEconomyService.ts
├── PlayerEquipmentService.ts
├── PlayerHydrationService.ts
├── PlayerListService.ts
├── PlayerMovementService.ts
├── PlayerQuestService.ts
├── PlayerSaveService.ts
├── PlayerSelectionService.ts
└── PlayerTeleportService.ts
```

---

## 🧠 Architecture Principles

### **Controllers**
- Validate input
- Call assemblers and services
- Return client DTOs
- Never touch Prisma

### **Assemblers**
- Convert client DTOs to internal commands
- Convert service/domain results to client DTOs

### **Services**
- Contain business logic
- Compose repositories
- Accept internal commands
- Map Prisma → domain models
- Never return Prisma models

### **Repositories**
- Pure persistence
- Only Prisma calls
- No DTOs
- No business logic

### **Adapters**
- Transform complex hydration flows
- Used by selection + hydration services

---

## 🗺️ Route Map

```
/players
│
├── /buff
│   ├── POST /:playerId/apply
│   ├── DELETE /effect/:effectId
│   └── GET /:playerId
│
├── /combat
│   ├── POST /:playerId/state
│   └── GET /:playerId/state
│
├── /create
│   └── POST /
│
├── /death
│   ├── POST /:playerId/record
│   └── POST /:playerId/respawn
│
├── /delete
│   └── DELETE /:playerId
│
├── /econ
│   ├── POST /:playerId/add-gold
│   ├── POST /:playerId/remove-gold
│   └── POST /:fromId/transfer/:toId
│
├── /equip
│   ├── POST /:playerId/equip
│   ├── POST /:playerId/unequip/:equipmentId
│   └── GET /:playerId
│
├── /full
│   └── GET /:playerId
│
├── /list
│   └── GET /
│
├── /move
│   ├── POST /:playerId/move
│   ├── POST /:playerId/change-zone
│   └── POST /:playerId/move-delta
│
├── /quest
│   ├── POST /:playerId/start
│   ├── POST /:questId/complete
│   └── GET /:playerId
│
├── /save
│   └── POST /:playerId
│
├── /select
│   └── GET /
│
└── /teleport
└── POST /:playerId
```
---

---

## 🧪 Testing Strategy

- Tests live in `server/test/*` and mirror `server/src/*` module paths
- Repositories are mocked for unit tests
- Prisma is not hit in unit tests
- Hydration flows should keep dedicated integration coverage

---

## 🎯 Goals of the Player Module

- Fully deterministic gameplay logic
- Zero Prisma leakage
- Clean DTO boundaries
- Modular, testable, scalable MMO backend  
