// shared/zod/EventRewardSchema.ts

import { z } from "zod";

export const EventRewardSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  rewardType: z.string(),
  title: z.string().nullable(),
  itemId: z.string().nullable(),
  recipeId: z.string().nullable(),
  amount: z.number().nullable(),
  value: z.number().nullable(),
});
