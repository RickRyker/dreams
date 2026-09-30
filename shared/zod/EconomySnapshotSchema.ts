// shared/zod/EconomySnapshotSchema.ts

import { z } from "zod";

export const EconomySnapshotSchema = z.object({
  id: z.string(),
  takenAt: z.number(),
  totalGold: z.number(),
  totalItems: z.number(),
  activeAuctions: z.number(),
  activeListings: z.number(),
  metadata: z.string().nullable(),
});
