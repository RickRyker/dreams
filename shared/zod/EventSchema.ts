// shared/zod/EventSchema.ts

import { z } from "zod";

export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  isHoliday: z.boolean(),
  startsAt: z.number(),
  endsAt: z.number(),
  isActive: z.boolean(),
  createdById: z.string(),
});
