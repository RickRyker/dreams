# Combat Module

The **Combat module** implements the full real‑time MMORPG combat engine, including:

- Combat sessions & lifecycle management
- Timeline scheduling & event dispatch
- Cast engine, effect engine, threat engine
- Telegraphs & AoE resolution
- AI behavior trees
- Combat snapshots & replay system
- Persistence, analytics, and export pipelines

It follows the same strict layered architecture used across the backend:
```
Router → Controller → Service → Adapter → Mapper → Repository → Prisma  
Engine → Orchestrator → Integration → Timeline → EventBus
```

No Prisma models ever leave the repository layer.  
No DTOs ever enter the repository layer.  
Engine types are pure `.d.ts` declarations.

This module is one of the three canonical reference modules (along with Accounts and Players) for all future server architecture.

# 📂 Folder Structure
```
combat/
│
├── abilities/
│   ├── AbilityCooldownTracker.ts
│   ├── AbilityDatabase.ts
│   ├── AbilityExecutor.ts
│   ├── AbilityLoader.ts
│   ├── AbilityRegistry.ts
│   ├── AbilityScript.ts
│   ├── AbilityScriptRegistry.ts
│   ├── AbilityTargeting.ts
│   ├── AbilityDefinition.ts
│   └── AbilityValidator.ts
│
├── adapters/
│   └── (Engine ↔ Persistence adapters)
│
├── ai/
│   ├── BasicThreatBehavior.ts
│   ├── BehaviorTreeNodes.ts
│   └── MovementNodes.ts
│
├── analytics/
│   └── CombatAnalytics.ts
│
├── controllers/
│   ├── CombatCastController.ts
│   ├── CombatEventController.ts
│   ├── CombatLootController.ts
│   ├── CombatParticipantController.ts
│   ├── CombatReplayController.ts
│   ├── CombatSessionController.ts
│   ├── CombatSnapshotController.ts
│   ├── CombatThreatController.ts
│   └── CombatTimelineController.ts
│
├── debug/
│   └── CombatDebugger.ts
│
├── dto/
│   └── (DTO definitions)
│
├── encounters/
│   ├── scripts/
│   │   └── FireDemon.ts
│   ├── EncounterController.ts
│   └── EncounterScript.ts
│
├── engines/
│   ├── CombatEngine.ts
│   ├── CombatHydrationHelpers.ts
│   ├── CombatReplayRecorder.ts
│   └── CombatSnapshotEmitter.ts
│
├── export/
│   └── CombatLogExporter.ts
│
├── integration/
│   ├── AbilityCooldownIntegration.ts
│   ├── AbilityTargetingIntegration.ts
│   ├── AbilityValidationIntegration.ts
│   └── MovementIntegration.ts
│
├── logging/
│   └── CombatLogTemplate.ts
│
├── mappers/
│   ├── EngineCombatEventMapper.ts
│   └── EngineCombatSnapshotMapper.ts
│
├── orchestrators/
│   └── CombatSessionOrchestrator.ts
│
├── persistence/
│   ├── CombatPersistencePort.ts
│   ├── CombatSnapshotLoader.ts
│   ├── CombatSnapshotMapper.ts
│   ├── CombatSnapshotPersistenceAdapter.ts
│   └── PrismaCombatPersistenceAdapter.ts
│
├── replay/
│   ├── CombatReplayCompressor.ts
│   └── CombatReplayLoader.ts
│
├── repositories/
│   ├── CombatCastRepository.ts
│   ├── CombatEventRepository.ts
│   ├── CombatLootRepository.ts
│   ├── CombatParticipantRepository.ts
│   ├── CombatPersistenceAdapter.ts
│   ├── CombatReplayRepository.ts
│   ├── CombatSessionRepository.ts
│   ├── CombatSnapshotRepository.ts
│   ├── CombatThreatRepository.ts
│   ├── CombatTimelineRepository.ts
│   └── PlayerEffectRepository.ts
│
├── routers/
│   ├── CombatCastRouter.ts
│   ├── CombatEventRouter.ts
│   ├── CombatLootRouter.ts
│   ├── CombatParticipantRouter.ts
│   ├── CombatReplayRouter.ts
│   ├── CombatRouter.ts
│   ├── CombatSessionRouter.ts
│   ├── CombatSnapshotRouter.ts
│   ├── CombatThreatRouter.ts
│   └── CombatTimelineRouter.ts
│
├── services/
│   ├── CombatCastService.ts
│   ├── CombatEventService.ts
│   ├── CombatLootService.ts
│   ├── CombatParticipantService.ts
│   ├── CombatReplayService.ts
│   ├── CombatSessionService.ts
│   ├── CombatSnapshotService.ts
│   ├── CombatThreatService.ts
│   └── CombatTimelineService.ts
│
├── tests/
│   └── CombatTestHarness.ts
│
├── types/
│   └── EngineCombatTypes.d.ts
│
├── CastEngine.ts
├── CastEngineAdapter.ts
├── CombatActionResolver.ts
├── CombatAIEngine.ts
├── CombatEffectEngine.ts
├── CombatEngineManager.ts
├── CombatEventBus.ts
├── CombatStateMachine.ts
├── CombatStateStore.ts
├── CombatTimeline.ts
├── LineOfSight.ts
├── MovementController.ts
├── MovementEngine.ts
├── Pathfinding.ts
├── TelegraphEngine.ts
├── TelegraphEngineAdapter.ts
├── ThreatEngine.ts
└── ThreatEngineAdapter.ts
```

# ⚙️ Architecture Overview

The Combat module consists of three major layers:

## 1️⃣ HTTP API Layer

Routers → Controllers → Services → Repositories → Prisma

Handles:

- Creating combat sessions
- Adding/removing combat participants
- Casting combat spells
- Fetching combat snapshots
- Exporting combat logs
- Loading combat replays

Controllers return DTOs only.
Repositories return Prisma models only.

## 2️⃣ Combat Engine Layer

Engine → Timeline → EventBus → StateMachine → Effect/Threat/Cast Engines

This is the real‑time simulation engine:
- Tick‑driven timeline
- Event scheduling
- Telegraphs & AoE resolution
- Cast bars & interrupts
- Damage/heal/shield resolution
- Threat generation
- AI behavior trees
- Movement & pathfinding
- Snapshot emission
- Replay recording

The engine is pure TypeScript, deterministic, and fully testable.

## 3️⃣ Persistence, Replay & Analytics Layer
Handles:
- Snapshot persistence
- Replay compression
- Replay loading
- Combat analytics summary
- Combat log export

This layer ensures combat can be:
- Replayed
- Analyzed
- Visualized
- Debugged
- Stored long‑term

## 🔄 Core Data Flows
### Combat Tick Flow
```
CombatEngine.tick()
  → Timeline.dequeueEvents()
  → EventBus.dispatch()
  → CastEngine / EffectEngine / ThreatEngine / TelegraphEngine
  → StateMachine transitions
  → SnapshotEmitter.emit()
  → ReplayRecorder.record()
```
### Spell Cast Flow
```
POST /combat/cast
  → CombatCastController.cast()
    → CombatCastService.castSpell()
      → CombatCastRepository.create()
      → CastEngine.handleCastStart()
        → TELEGRAPH_START (optional)
        → schedule TELEGRAPH_HIT
        → schedule CAST_COMPLETE
```
### Telegraph Flow
```
CastEngine emits TELEGRAPH_START
  → TelegraphEngine.startTelegraph()
  → Timeline schedules TELEGRAPH_HIT
  → TelegraphEngine.resolveTelegraph()
    → AoE hit detection
    → DAMAGE events emitted
```
### Snapshot Flow
```
CombatSnapshotEmitter
  → builds EngineCombatSnapshot
  → CombatSnapshotService.persist() 
  → PrismaCombatSnapshotPersistenceAdapter
  → combatSnapshot table
```
### Replay Flow
```
  → CombatReplayRecorder
    → collects EngineReplayRecord[]
    → CombatReplayCompressor
    → CombatReplayService.persistReplay()
    → combatReplay table
```

## Testing Strategy
- Unit tests use the CombatTestHarness to create isolated combat scenarios.
- Engine tests run without prisma, using in‑memory repositories and mock integrations.
- Repositories are mocked in engine tests to ensure no persistence logic leaks into the engine layer.
- Timeline, EventBus, and Engines have isolated deterministic tests to validate tick resolution and event ordering.
- Replay compression has deterministic snapshot tests to ensure replays can be faithfully reconstructed.
- Telegraph geometry has dedicated AoE tests to validate hit detection and line-of-sight calculations.

## Goals of the Combat Module

- Fully deterministic combat simulation engine
- Zero Prisma leakage into the engine layer
- Clean DTO boundaries
- Modular, testable, scalable architecture
- Replayable, debuggable, and analyzable combat logs
- Clear separation between HTTP API, Engine, and Persistence layers

---  

