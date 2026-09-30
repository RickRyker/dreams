# Holidays (Player Perspective)

Holidays are currently represented through the **Event system**.

## How holidays are modeled

There is no separate `Holiday` table in the active schema.  
Instead, holidays are event records using:

- `type = HOLIDAY`
- and/or `isHoliday = true`

Holiday/event records also include:

- Name/description/slug
- Start and end timestamps
- Active flag (`isActive`)
- Participation and rewards

## What holidays do for players

Holiday events can grant event rewards, including:

- Item rewards
- Recipe rewards
- XP boost rewards
- Drop-rate boost rewards
- Title rewards

Participation is tracked per player (`EventParticipation`), including whether rewards were already claimed.

## Active holiday behavior

An event is treated as currently active when:

- `isActive = true`
- `startsAt <= now`
- `endsAt >= now`

## Current implementation notes

- Holiday-capable event services and routers exist (`modules/events`).
- In the active server bootstrap route tree, events routes are not mounted by default.
- Runtime XP/drop boosts from active claimed holiday/event rewards are consumed by `BuffService`.