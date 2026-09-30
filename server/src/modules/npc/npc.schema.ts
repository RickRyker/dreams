// server/src/modules/npc/npc.schema.ts

import { z } from 'zod';

export const buyItemSchema = z.object({
  itemId: z.string(),
  quantity: z.number().int().positive()
});

export const sellItemSchema = z.object({
  inventoryItemId: z.string(),
  quantity: z.number().int().positive()
});
