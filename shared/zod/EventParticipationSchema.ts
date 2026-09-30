// shared/zod/EventParticipationSchema.ts

import { z } from "zod";

export const EventParticipationSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  playerId: z.string(),
  progress: z.string(),
  completed: z.boolean(),
  rewardClaimed: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
