# Priority list of what to build next
## Stabilize core contracts
* Goal: No more churn on CombatEvent, CombatResolution, CombatSnapshot.
## Finish and harden CastEngine + TelegraphEngine
* These are the biggest “feel” multipliers for boss fights.
## ThreatEngine + AI wiring
* Make bosses actually care about tanks and targets.
## BossFightScriptEngine + ExampleBossEncounter
* One fully scripted, replayable boss as a reference implementation.
## CombatSimulator + ReplayViewer + Scrubber
* Tighten your feedback loop: run, inspect, adjust.
## Boss DSL + ProceduralEncounterGenerator
* Move encounter design out of code and into data.
## CombatBalancer + Analytics hooks
* Start making decisions with numbers, not vibes.
## NetworkSync (if/when you go multiplayer)
* Only after the single‑process engine is rock solid.
