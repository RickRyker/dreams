// shared/zod/AuctionSchema.ts

import { z } from "zod";

export const AuctionSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  itemId: z.string(),
  quantity: z.number(),
  startingBid: z.number(),
  buyoutPrice: z.number().nullable(),
  expiresAt: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
