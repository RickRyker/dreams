# Messages (Player Perspective)

This is how message delivery/moderation works in the current messaging module.

## Message model

Messages are stored as `MessageLog` entries with:

- Optional sender character (`senderId`)
- Optional recipient character (`recipientId`)
  - `null` recipient means global/system-style visibility
- `messageType` (ADMIN, BOT, CHAT, COMBAT, ERROR, NPC, PLAYER, QUEST, SYSTEM, WHISPER)
- Content + moderation fields (`isFlagged`, `isFiltered`, `badWords`, `moderationNote`)

## Sending a message

When a message is sent:

1. The server loads profanity patterns.
2. Matching content is replaced with `***`.
3. Matched patterns are recorded in `badWords`.
4. `isFiltered` is set when filtering happened.
5. The sanitized message is persisted.

## Reading messages

For a character, message retrieval currently returns:

- Direct messages to that character (`recipientId = playerId`)
- Global/system-style messages (`recipientId = null`)

Results are returned newest-first.

## Moderation behavior

Moderators can update a message with:

- `isFlagged`
- `isFiltered`
- `moderationNote`
- Moderator identity reference

## Current implementation notes

- The messaging module (router/service/repository) is implemented.
- In the active server bootstrap, the messaging router is not currently mounted, so these endpoints are not exposed on the default live route tree yet.