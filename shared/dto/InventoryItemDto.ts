// shared/dto/InventoryItemDto.ts
import { z } from "zod";
import { InventoryItemSchema } from "../zod/InventoryItemSchema";

export type InventoryItemDto = z.infer<typeof InventoryItemSchema>;