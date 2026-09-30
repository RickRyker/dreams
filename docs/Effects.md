# Effects (Player Perspective)

This is how temporary effects currently behave.

## Effect data on your character

Active effects are stored as `PlayerEffect` rows with:

- `type` (BUFF, DEBUFF, DOT, HOT, STUN, SHIELD, etc.)
- `magnitude`
- Optional `element`
- Optional tick fields (`tickIntervalMs`, `nextTickAt`)
- Optional expiration (`expiresAt`)

## Applying and listing effects

The player buff routes (mounted under `/player/buff`) provide:

- `POST /player/buff/:playerId/apply` — apply an effect
- `GET /player/buff/:playerId` — list active effects
- `DELETE /player/buff/effect/:effectId` — remove one effect

## Expiration and cleanup

Expired effects are deleted by a scheduler-driven cleanup service:

- Server boot starts `BuffCleanupScheduler`
- It periodically removes `PlayerEffect` rows where `expiresAt < now`

## Event-linked bonuses

XP and drop-rate bonuses are currently computed through event rewards (`XP_BOOST`, `DROP_RATE`) in `BuffService`, based on active events and claimed participation rewards.

## Combat integration status

- Player effects are hydrated into combat sessions.
- Core combat effect primitives (damage/heal/shield/interrupt) are implemented.
- Some higher-level combat effect handlers in `EffectEngine` are still TODO (`applyBuff`, `applyDebuff`, `applyDot`, `applyHot`, threat generation), while dedicated sub-engines exist for timed buff/debuff/DOT/HOT ticking.