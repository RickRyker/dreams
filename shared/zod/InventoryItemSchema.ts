// shared/zod/InventoryItemSchema.ts

import { z } from "zod";

export const InventoryItemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  quantity: z.number(),
  isBroken: z.boolean(),
  isDroppable: z.boolean(),
  isEquipped: z.boolean(),
  isTradeable: z.boolean(),
  degradation: z.number(),
  tier: z.number(),
  quality: z.string(),
  containerId: z.string().nullable(),
  containerType: z.string().nullable(),
  playerId: z.string().nullable(),
  equippedSlot: z.string().nullable(),
  guildTagId: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
