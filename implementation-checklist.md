#️⃣ MMORPG Combat System — Implementation Checklist
A complete, structured checklist of all implemented features and recommended additions across server, frontend, shared packages, infra, and dev‑tools.

## 1. Workspace & Project Structure
✔ Monorepo Setup
npm workspaces / pnpm / turbo  
Ensures server, frontend, shared, and infra stay in sync with shared builds.

✔ Root tsconfig.base.json
Centralizes path aliases and compiler settings.

✔ Shared TypeScript Package
Holds enums, DTOs, combat types, events.
Prevents drift between server and frontend.

✔ Recommended Folder Structure
server/, client/, shared/, infrastructure/, docs/, tools/
Clean separation of concerns.

## 2. server (Node + Express + Prisma)
✔ CombatReplayController
Handles replay retrieval, export, import.
Enables full replay system.

✔ CombatReplayRouter
/api/combat/:id/replay

/api/combat/:id/export

/api/combat/import  
Routes for replay operations.

✔ CombatAnalyticsRouter
Clustering + anomaly detection.
Helps identify weird fights and patterns.

✔ CombatSummaryRouter
/api/combat/summary/:id  
Returns DPS/HPS, kill order, cause of death.

✔ CombatCompareRouter
/api/combat/compare/:a/:b  
Side‑by‑side replay diff.

✔ CombatLeaderboardRouter
/api/combat/leaderboard  
Top DPS, fastest fights, longest fights.

✔ GM Tools Router (recommended)
/api/gm/spawn

/api/gm/kill

/api/gm/teleport  
Enables live debugging and GM commands.

✔ Threat WebSocket Endpoint
/ws/threat/:combatId  
Streams real‑time threat updates.

✔ CombatRepository
Centralized DB access.
Ensures consistent transaction boundaries.

✔ CombatStateSerializer
Converts DB → DTO for frontend.
Ensures replay and live UI use same shape.

✔ AbilityEventsParser
Converts raw logs → typed events.
Required for replay playback.

🔶 Recommended server Additions
CombatTimelineService  
Precomputes timeline stats for analytics.

CombatDeathAnalyzer  
More detailed cause‑of‑death logic.

CombatMetricsService  
DPS/HPS per actor, per round, per ability.

CombatAIInspectorService  
Logs AI decisions for debugging.

## 3. Frontend (React + Vite)
✔ CombatReplayPlayer
Timeline scrubber

Play/pause

Speed controls

Bookmarks

Event inspector

Heatmap

Zoom timeline

✔ Replay Pages
ReplayIndexPage

ReplayAnalyticsPage

ReplayComparePage

ReplayLeaderboardPage

✔ Replay Components
ReplayTimelineHeatmap

ReplayTimelineZoom

ReplayEventInspector

ReplaySpeedControls

ReplayBookmarks

ReplayMomentLabels

ReplayStoryMode

ReplayAnalytics

ReplayDiffViewer

ReplayExportButton

ReplayImportDropzone

✔ Debug Tools
CombatMiniDebugPanel

CombatDebugCollapsible

CombatDebugDraggable

CombatGMPanel

CombatThreatHeatmap

✔ CombatSummaryPanel
DPS/HPS

Damage/healing breakdown

Kill order

Cause‑of‑death visualization

🔶 Recommended Frontend Additions
Damage Timeline Graph (line chart)  
Visualizes DPS over time.

Healing Timeline Graph  
Shows HPS spikes.

Ability Usage Heatmap  
Shows which abilities were used when.

AI Decision Tree Visualizer  
Shows why AI chose each action.

Replay “Story Mode” cinematic view  
Narrative playback with animations.

Replay Export to GIF/WebM  
Shareable fight replays.

## 4. Shared Package
✔ Combat Types
CombatStateDTO

CombatParticipantDTO

CombatEvent union

✔ Enums
Elements

Participant types

✔ DTOs
Replay export/import DTOs

Combat summary DTOs

🔶 Recommended Shared Additions
Ability metadata (cooldowns, tags, categories)

Damage formula types

AI decision enums

Threat table DTO

CombatTimelineDTO

## 5. Infra
✔ docker-compose
MySQL

server

Frontend

✔ Makefile
make dev

make migrate

make db

✔ VSCode Workspace
Path mappings

Multi‑project workspace

🔶 Recommended Infra Additions
Localstack or AWS mocks  
For CDK testing.

Seed scripts  
Auto‑populate monsters, abilities, maps.

Replay storage bucket (S3)  
For long‑term replay archiving.

## 6. Database Schema (Prisma)
✔ CombatSession
roundNumber, turnPhase, activeTurnId

✔ CombatParticipant
playerId / monsterId / petId

hp/mp/x/y

isAlive

✔ CombatLog
seq

type

actorId

targetId

data (JSON)

🔶 Recommended Schema Additions
AbilityUsage table  
For analytics.

CombatMetrics table  
For storing DPS/HPS snapshots.

AI decision logs  
For debugging AI behavior.

Threat snapshots  
For replaying threat evolution.

## 7. Replay System
✔ Replay Export/Import
JSON export

JSON import

File download/upload

✔ Replay Playback
Scrubber

Speed control

Bookmarks

Event inspector

Heatmap

Zoom timeline

✔ Replay Analytics
DPS/HPS

Kill order

Cause of death

Damage/healing breakdown

Clustering

Anomaly detection

🔶 Recommended Replay Additions
Replay compression  
Reduce JSON size.

Replay diffing  
Already implemented, but can be expanded.

Replay tagging  
Auto‑tag interesting moments.

Replay search  
Find fights by boss, player, ability, etc.

## 8. AI & Combat Engine (Recommended Enhancements)
🔶 AI Decision Tree Visualizer
Shows reasoning behind each AI action.

🔶 Threat Heatmap (grid‑based)
Visualizes threat spatially.

🔶 Combat Simulation Mode
Run fights automatically for testing.

🔶 Combat Balancing Tools
Ability tuning

Monster tuning

DPS/HPS benchmarks

## 9. Developer Experience
✔ Draggable Debug Window
Move debug tools anywhere.

✔ Collapsible Panels
Keep UI clean.

✔ GM Tools
Spawn

Kill

Teleport

🔶 Recommended Dev Tools
Hot‑reload combat engine

Replay auto‑save

Combat “time travel” debugger

AI decision profiler

## 10. Final Recommended Additions (High‑Value)
🔶 Combat Timeline Graphs
DPS/HPS over time

Damage taken over time

Ability usage over time

🔶 Combat Heatmaps
Position heatmap

Threat heatmap

Damage zones

🔶 Combat Story Generator
Cinematic narration of the fight.

🔶 Combat Video Exporter
WebM/GIF export of replay.

🔶 Combat Scenario Editor
Build encounters visually.
