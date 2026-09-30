# NPCs (Player Perspective)

This is how NPC-related systems currently work in code.

## What “NPC” means right now

There are two active NPC-facing paths:

1. **NPC Stores** (`NpcStore`, `NpcStoreItem`) for buying/selling items.
2. **Dialog/ChatBot** behavior for conversational interactions.

## NPC stores

NPC stores are persisted as:

- `NpcStore` (store identity, `npcId`, name, description)
- `NpcStoreItem` (item listing, buy/sell price, optional stock)

Player-facing behavior:

- Buy from store: spend gold, receive inventory item, stock decreases if finite.
- Sell to store: give inventory quantity, receive gold at store sell price.
- Stock can be infinite when `stock = null`.

## NPC store APIs implemented

Two implementations exist:

- `modules/npc` router:
  - `GET /npc` (list stores)
  - `GET /npc/:npcId` (store detail)
  - `POST /npc/:npcId/:playerId/buy`
  - `POST /npc/:playerId/sell`
- Trading module endpoints:
  - `POST /trading/players/:playerId/npc-store/buy`
  - `POST /trading/players/:playerId/npc-store/sell`

## Dialog and chatbot NPC interactions

Dialogs can be linked to a `ChatBot`.  
If a dialog has `chatBotId`, free-text player input is pattern-matched to configured chatbot responses; otherwise the player gets a default “doesn’t respond to free text” response.

This is how text-based NPC conversation is currently represented.

## Current implementation notes

- In the active server bootstrap, only `/account`, `/player`, `/combat`, `/dialog`, `/quest`, and `/class` are mounted by default.
- NPC/trading routers are implemented but not mounted in that default bootstrap route tree.
- `NpcStore.npcId` is stored as a string field (not currently a Prisma relation to a dedicated `Npc` model).