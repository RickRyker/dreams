// shared/zod/PlayerSchema.ts

import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string().nullable(),
  gender: z.string(),

  level: z.number(),
  class: z.string(),

  mapId: z.string().nullable(),
  x: z.number(),
  y: z.number(),

  isDefault: z.boolean(),

  stats: z.any(), // replace with PlayerStatsSchema when available

  equipment: z.array(z.any()),
  inventory: z.array(z.any()),
  spells: z.array(z.any()),
  skills: z.array(z.any()),
  pets: z.array(z.any()).optional().default([]),
  messages: z.array(z.any()).optional().default([]),
  journal: z.array(z.any()).optional().default([]),
  achievements: z.array(z.any()).optional().default([]),
  quests: z.array(z.any()),
});

export const PlayerCreateSchema = z.object({
  name: z.string().min(1).optional(),
});

export const PlayerUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  isDefault: z.boolean().optional(),
  mapId: z.string().nullable().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});
