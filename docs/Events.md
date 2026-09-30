# Events (Player Perspective)

This is how events currently work in persistence and services.

## Event types and timing

Events are stored with:

- `slug`, `name`, `description`
- `type` (`WORLD`, `HOLIDAY`, `SEASONAL`, `BOSS`)
- Active window (`startsAt`, `endsAt`)
- Activation flag (`isActive`)
- Optional holiday flag (`isHoliday`)

Active-event checks use:

- `isActive = true`
- `startsAt <= now`
- `endsAt >= now`

## Participation model

When a player joins an event, `EventParticipation` is created/upserted with:

- `progress` JSON payload
- `completed` flag
- `rewardClaimed` flag

Participation is unique per `(eventId, playerId)`.

## Rewards model

Event rewards are defined in `EventReward` with reward types like:

- `ITEM`
- `XP_BOOST`
- `DROP_RATE`
- `CURRENCY`
- `COSMETIC`
- `RECIPE`
- `QUEST`
- `TITLE`

## Player-facing effects today

- Active claimed `XP_BOOST` and `DROP_RATE` rewards are used by buff logic for XP/drop multipliers.
- `applyEventRewards` logic exists to grant rewards and mark them claimed for a player/event pair.

## API/status notes

- Event router/service/controller implementations exist for list/create/update/join/participation operations.
- In the active server bootstrap route tree, the events router is not currently mounted, so these endpoints are not exposed by default.