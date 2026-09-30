# Avatars (Player Perspective)

This is how avatars are represented today.

## What an avatar is

An **Avatar** is an account-owned visual profile entry that can be attached to characters.

Avatar records store:

- `name`
- `description`
- `s3Key` (asset location)
- `isApproved` (moderation/approval state)
- `isFree` (availability flag)
- `creatorId` (player who created it)

Each account can own multiple avatars, but avatar names are unique per account.

## Relationship to characters

- A character (`Player`) can reference an avatar via `avatarId`.
- Avatars can be reused across the owner’s characters through that relationship.

## Current implementation notes

- Avatar persistence is present in the Prisma schema and account/player relationships.
- In the currently mounted HTTP server routes (`/account`, `/player`, etc.), there is no dedicated avatar CRUD/selection API wired yet.
- From a player UX perspective, avatar flows are therefore schema-ready but not fully exposed as first-class endpoints in the active router bootstrap.