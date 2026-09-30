// shared/zod/AuctionBidSchema.ts

import { z } from "zod";

export const AuctionBidSchema = z.object({
  id: z.string(),
  auctionId: z.string(),
  bidderId: z.string(),
  amount: z.number(),
  createdAt: z.number(),
});
