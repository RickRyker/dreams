// shared/zod/PlayerFullSchema.ts

import {z} from "zod";
import {PlayerStatsSchema} from "@shared/zod/PlayerStatsSchema";

export const PlayerFullSchema = z.object({
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

  stats: PlayerStatsSchema.optional(),

  equipment: z.array(z.any()),
  inventory: z.array(z.any()),
  spells: z.array(z.any()),
  skills: z.array(z.any()),
  quests: z.array(z.any()),
});
