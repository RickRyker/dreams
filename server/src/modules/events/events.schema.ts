// server/src/modules/events/events.schema.ts

import { z } from 'zod';

export const createEventSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['WORLD', 'HOLIDAY', 'SEASONAL', 'BOSS']).default('WORLD'),
  isHoliday: z.boolean().optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime()
});

export const updateEventSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional()
});

export const eventParticipationSchema = z.object({
  eventId: z.string()
});
