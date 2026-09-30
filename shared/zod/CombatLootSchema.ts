// shared/zod/CombatLootSchema.ts

import { z } from "zod";

export const CombatLootSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  itemId: z.string(),
  qty: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
