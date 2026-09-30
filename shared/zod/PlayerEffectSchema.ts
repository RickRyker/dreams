// shared/zod/PlayerEffectSchema.ts

import {z} from "zod";
import {ElementTypeEnum} from "../types/ElementTypeEnum";
import {EffectTypeEnum} from "../types/EffectTypeEnum";

export const PlayerEffectSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  type: EffectTypeEnum,
  element: ElementTypeEnum,
  magnitude: z.number(),
  expiresAt: z.number().nullable(),
  tickIntervalMs: z.number().optional(),
  nextTickAt: z.number().nullable().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
