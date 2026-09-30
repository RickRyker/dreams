// server/src/modules/admin/admin.schema.ts

import { z } from 'zod';

export const banPlayerSchema = z.object({
  playerId: z.string(),
  reason: z.string(),
  durationMs: z.number().int().optional()
});

export const unbanPlayerSchema = z.object({
  playerId: z.string()
});

export const mutePlayerSchema = z.object({
  playerId: z.string(),
  reason: z.string(),
  durationMs: z.number().int().optional()
});

export const unmutePlayerSchema = z.object({
  playerId: z.string()
});

export const teleportPlayerSchema = z.object({
  playerId: z.string(),
  mapId: z.string(),
  x: z.number().int(),
  y: z.number().int()
});

export const spawnMonsterSchema = z.object({
  monsterTypeId: z.string(),
  mapId: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  count: z.number().int().default(1)
});

export const spawnItemSchema = z.object({
  itemTypeId: z.string(),
  mapId: z.string(),
  x: z.number().int(),
  y: z.number().int()
});

export const setStatSchema = z.object({
  playerId: z.string(),
  stat: z.string(),
  value: z.number()
});

export const addExpSchema = z.object({
  playerId: z.string(),
  amount: z.number().int()
});

export const setLevelSchema = z.object({
  playerId: z.string(),
  level: z.number().int()
});

export const toggleInvisibilitySchema = z.object({
  playerId: z.string(),
  invisible: z.boolean()
});

export const killPlayerSchema = z.object({
  playerId: z.string()
});

export const respawnPlayerSchema = z.object({
  playerId: z.string()
});
