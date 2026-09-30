# TITLE: Combat Engine Refactor Plan
## SUBTITLE: A complete roadmap for transforming the combat system into a deterministic, timeline‑driven MMO engine

## SECTION: Overview

This document defines the architecture, goals, and step‑by‑step checklist for the full combat engine refactor.
The goal is to evolve the current combat system into a deterministic, replayable, timeline‑driven engine modeled after real MMO combat systems (FFXIV, WoW, ESO).

This refactor introduces:
* CombatEngine orchestrator
* CombatTimeline (priority queue)
* CombatStateMachine
* CombatActionResolver
* CombatEffectEngine
* CombatAIEngine
* CombatEventBus
* CombatSnapshotEmitter
* CombatReplayRecorder
Everything becomes event‑driven, predictable, and testable.

## SECTION: High‑Level Architecture
```
                                     ┌────────────────────────┐
                                     │      CombatEngine      │
                                     │   (Orchestrator Loop)  │
                                     └───────────┬────────────┘
                                                 │
            ┌────────────────────────────────────┼──────────────────────────────────────┐
            │                                    │                                      │
            v                                    v                                      v
  ┌───────────────────┐                ┌──────────────────┐                   ┌──────────────────┐
  │ CombatStateMachine│                │  CombatTimeline  │                   │ CombatEventBus   │
  │ (INIT→END phases) │                │ (priority queue) │                   │ (pub/sub core)   │
  └─────────┬─────────┘                └─────────┬────────┘                   └─────────┬────────┘
            │                                    │                                      │ 
            │                                    │                                      │
            v                                    v                                      v
  ┌─────────────────────┐              ┌───────────────────┐                  ┌──────────────────┐
  │ CombatActionResolver│              │ CombatEffectEngine│                  │ CombatAIEngine   │
  │ (damage/heal/etc)   │              │ (DOT/HOT/buffs)   │                  │ (BT + decisions) │
  └─────────┬───────────┘              └─────────┬─────────┘                  └─────────┬────────┘
            │                                    │                                      │
            │                                    │                                      │
            v                                    v                                      v
  ┌──────────────────────┐             ┌─────────────────────┐                ┌────────────────────┐
  │ CombatSnapshotEmitter│             │ CombatReplayRecorder│                │ DataLoader         │
  │ (client sync)        │             │ (perfect replay)    │                │ (abilities/effects)│
  └──────────────────────┘             └─────────────────────┘                └────────────────────┘
```

Core principles:
* Timeline‑driven
* Deterministic
* Replayable
* Predictable
* Modular
* Event‑driven

## SECTION: Subsystem Descriptions

CombatEngine (orchestrator)
Main loop:
  while (timeline.hasNextEvent()) {
    const event = timeline.popNextEvent()
    stateMachine.apply(event)
    actionResolver.resolve(event)
    effectEngine.apply(event)
    aiEngine.react(event)
    snapshotEmitter.emit(event)
    replayRecorder.record(event)
  }

CombatTimeline (priority queue)
Schedules all future events:
* Cast resolves
* DOT/HOT ticks
* Buff expirations
* AI decisions
* Telegraph warnings and impacts
* Player actions
* CombatStateMachine
* 
Phases:
INIT → PREPARE → ACTIVE → RESOLVING → END

CombatActionResolver
Resolves:
* Damage
* Healing
* Shields
* DOT/HOT
* Buffs/debuffs
* Threat
* Interrupts
* Stuns
* Telegraph impacts

CombatEffectEngine
Manages persistent effects:
* DOT/HOT instances
* Buff stacks
* Debuff stacks
* Auras
* Procs
* Conditional modifiers

CombatAIEngine
Behavior‑tree‑based AI:
* Schedules decisions
* Reacts to events
* Executes combos
* Handles phases
* Schedules telegraphs

CombatEventBus
Internal pub/sub:
* AI listens to damage events
* Effect engine listens to buff events
* Replay listens to everything
* Snapshot emitter listens to everything

CombatSnapshotEmitter
Produces client‑sync snapshots:
* HP changes
* Buffs/debuffs
* Cast bars
* Telegraphs
* Threat
* Timeline predictions

CombatReplayRecorder
Perfect replay:
* Every event recorded
* Deterministic playback
* Timeline reconstruction
* UI visualization

##SECTION: Refactor Checklist

### Phase 1 — Foundation (Engine Skeleton)
* Folder structure
* Shared event types
* Shared DTOs
* Shared enums
* CombatEventBus
* CombatTimeline
* CombatStateMachine
Outcome: Engine boots, transitions phases, and can schedule events.

### Phase 2 — Core Engine Loop
* Implement CombatEngine main loop
* Integrate state machine
* Integrate timeline
* Integrate event bus
* Integrate snapshot emitter
* Integrate replay recorder
Outcome: Engine can run deterministic event sequences and produce snapshots + replay.

### Phase 3 — Action Resolution Layer 
* Damage
* Healing
* Shields
* DOT/HOT resolution
* Buff/debuff application
* Threat generation
* Interrupts/stuns
* Telegraph impact resolution
Outcome: All combat math and rules are centralized and deterministic.

### Phase 4 — Effect Engine
* DOT/HOT tracking
* Buff/debuff stacks
* Aura effects
* Proc triggers
* Conditional modifiers
* Schedule effect events
Outcome: Persistent effects behave like a real MMO.

### Phase 5 — AI Engine
* Behavior tree system
* Threat table
* AI decision events
* Telegraph scheduling
* Phase transitions
* Reactive AI
Outcome: Bosses behave like real MMO bosses.

### Phase 6 — Client Sync
* HP/MP snapshot
* Buff/debuff snapshot
* Cast bar snapshot
* Telegraph snapshot
* Threat snapshot
* Timeline prediction snapshot
Outcome: UI can render the entire combat state in real time.

### Phase 7 — Replay System
* Record all events
* Record all snapshots
* Deterministic playback
* Timeline reconstruction
* UI visualization
Outcome: You can debug any fight frame‑by‑frame.

### Phase 8 — Integration & Migration
* Replace CombatTurnManager
* Replace CastScheduler
* Replace DotHotEngine
* Replace CombatTimelinePredictor
* Replace MonsterAI
* Replace CombatService
* Replace CombatSnapshotMapper
Outcome: Old combat code is fully removed.

### Phase 9 — Testing & Validation
* Deterministic combat tests
* Replay identical output tests
* Timeline prediction accuracy tests
* AI behavior consistency tests
* Stress tests
Outcome: Engine is production‑ready.

## SECTION: Final Goal

A fully deterministic, timeline‑driven MMO combat engine with:
* Perfect replay
* Perfect prediction
* Modular subsystems
* Real AI
* Real telegraphs
* Real threat
* Real buffs/debuffs
* Real DOT/HOT
* Real cast system
This is the foundation for a real MMORPG.

## SECTION: Next Step

Choose which subsystem to generate first:
* CombatEngine.ts
* CombatTimeline.ts
* CombatStateMachine.ts
* CombatActionResolver.ts
* CombatEffectEngine.ts
* CombatAIEngine.ts
* CombatEventBus.ts
* CombatSnapshotEmitter.ts
* CombatReplayRecorder.ts
* Full folder structure + stubs
