# Roadmap for finishing the engine

## Phase 1 – Core stability and determinism

Lock in core contracts:
* CombatEvent, CombatResolution, CombatSnapshot

Harden core subsystems:
* Timeline, StateStore, ActionResolver, EffectEngine, EventBus, SnapshotEmitter, ReplayRecorder, DataLoader

Add regression tests:
* Deterministic replay (same input → same output)
* Basic damage/heal/effect flows

## Phase 2 – Boss‑grade combat features

Finalize CastEngine:
* Cast start/complete, channels, interrupts

Finalize TelegraphEngine:
* Shapes, hit detection, warning/impact events

Finalize ThreatEngine:
* Threat tables, modifiers, transfer, reset

Wire CombatAIEngine + Behavior Trees:
* Per‑entity behavior registration
* AI_DECISION → ability execution path

## Phase 3 – Encounter authoring & tools
BossFightScriptEngine:
* HP/time‑based phases
* Ability scheduling helpers

Boss DSL:
* Compile DSL → BossFightScriptEngine phases
* ProceduralEncounterGenerator:
* Generate abilities/effects/phases by difficulty

## Phase 4 – Visualization & UX

Real-time React UI:
* Entity panels, HP/buffs, cast bars

Replay timeline scrubber:
* Frame navigation, state inspection

Basic analytics overlay:
* DPS/HPS, damage taken, threat over time

## Phase 5 – Balancing, analytics, and multiplayer

CombatBalancer:
* DPS/HPS/EHP estimations from data

CombatSimulator:
* Batch simulations for balance sweeps

NetworkSync layer:
* Client input → server
* Server snapshots → clients
* Hooks for prediction/rollback later
