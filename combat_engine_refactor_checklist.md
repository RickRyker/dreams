# Checklist for the entire refactor
## Core engine
* [ ] CombatEvent type finalized and documented
* [ ] CombatResolution type finalized and documented
* [ ] CombatSnapshot structure finalized and documented
* [ ] CombatTimeline deterministic and tested (ordering, same‑timestamp rules)
* [ ] CombatStateStore covers HP, shields, buffs, debuffs, effects, interrupts
* [ ] CombatActionResolver handles DAMAGE, HEAL, SHIELD, INTERRUPT, APPLY_EFFECT
* [ ] CombatEffectEngine handles DOT/HOT ticks, expiration, stacking
* [ ] CombatEventBus supports typed pub/sub and is used everywhere (no hidden side‑channels)
* [ ] CombatSnapshotEmitter produces snapshots after every resolved event
* [ ] CombatReplayRecorder stores (event, resolution, snapshot) triplets
* [ ] CombatDataLoader is the only source of ability/effect metadata

## Boss‑grade systems
* [ ] CastEngine integrated (CAST_START, CAST_COMPLETE, CHANNEL_TICK, INTERRUPT)
* [ ] TelegraphEngine integrated (warning + impact, shapes, hit detection)
* [ ] ThreatEngine integrated (threat changes from damage/heal, transfer, reset)
* [ ] CombatAIEngine consumes snapshots/events and emits AI_DECISION events
* [ ] Behavior Tree library used for at least one real boss
* [ ] BossFightScriptEngine drives phases via HP/time triggers

## Authoring & tools
* [ ] Boss DSL compiles to BossFightScriptEngine phases
* [ ] ProceduralEncounterGenerator produces valid abilities/effects/phases
* [ ] Example boss encounter using:
* [ ] Threat
* [ ] Casts
* [ ] Telegraphs
* [ ] DOT/HOT
* [ ] Phases
* [ ] AI behavior tree

## Visualization & debugging
* [ ] Real-time React UI hooked to snapshots (via WebSocket or mock stream)
* [ ] Replay timeline scrubber working against recorded replays
* [ ] Ability to load a replay file and inspect any frame’s entity state
* [ ] Minimal analytics overlay (DPS/HPS, damage taken, threat leader)

## Balancing & simulation
* [ ] CombatBalancer can compute DPS/HPS/EHP from ability/effect data
* [ ] CombatSimulator can run scripted fights headless and output replays
* [ ] Batch simulation harness (e.g., run 1000 fights, aggregate stats)

## Multiplayer (optional but future‑proof)
* [ ] NetworkSync layer defined (transport interface, message shapes)
* [ ] Client → server event pipeline (input validation, rate limiting)
* [ ] Server → client snapshot pipeline (throttling, delta or full snapshots)
* [ ] Clear extension points for prediction/rollback if needed later
