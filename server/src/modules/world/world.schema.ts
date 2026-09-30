// server/src/modules/world/world.schema.ts

import { z } from 'zod';
import { WorldConfigSettingType } from '@prisma/client';

export const updateSettingSchema = z.object({
  name: z.nativeEnum(WorldConfigSettingType),
  value: z.string()
});

export const maintenanceToggleSchema = z.object({
  enabled: z.boolean()
});
