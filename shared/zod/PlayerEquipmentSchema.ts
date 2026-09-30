// shared/zod/PlayerEquipmentSchema.ts

import { z } from "zod";

export const PlayerEquipmentSchema = z.object({
  id: z.string(),
  slotType: z.string(),
  itemId: z.string().nullable(),
  itemName: z.string(),
  itemSlug: z.string(),
  icon: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
