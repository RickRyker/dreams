// shared/zod/ReplayTimelineEventSchema.ts

import {z} from "zod";

export const ReplayTimelineEventSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  type: z.string(),
  participantId: z.string().nullable(),
  label: z.string().optional(),
  value: z.number().nullable().optional(),
  data: z.any().optional(),
});
