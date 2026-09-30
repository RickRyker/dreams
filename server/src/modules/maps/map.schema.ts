// server/src/modules/maps/map.schema.ts

import { z } from 'zod';

export const mapIdSchema = z.object({
  mapId: z.string()
});

export const tileQuerySchema = z.object({
  x: z.number().int(),
  y: z.number().int()
});

export const transitionSchema = z.object({
  mapId: z.string(),
  x: z.number().int(),
  y: z.number().int()
});
