// shared/zod/MonsterLootTableSchema.ts

import { z } from "zod";

export const MonsterLootTableSchema = z.object({
  id: z.string(),
  monsterId: z.string(),
  itemId: z.string(),
  minQty: z.number(),
  maxQty: z.number(),
  dropChance: z.number(),
});
