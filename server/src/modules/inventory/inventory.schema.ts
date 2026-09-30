// server/src/modules/inventory/inventory.schema.ts

import { z } from 'zod';

export const equipItemSchema = z.object({
  inventoryItemId: z.string(),
  slot: z.string() // SlotType enum
});

export const unequipItemSchema = z.object({
  slot: z.string()
});

export const moveItemSchema = z.object({
  inventoryItemId: z.string(),
  targetContainerId: z.string().nullable(),
  targetPlayerId: z.string().nullable(),
  quantity: z.number().int().positive()
});

export const dropItemSchema = z.object({
  inventoryItemId: z.string(),
  quantity: z.number().int().positive()
});

export const pickupItemSchema = z.object({
  containerId: z.string(),
  inventoryItemId: z.string(),
  quantity: z.number().int().positive()
});
