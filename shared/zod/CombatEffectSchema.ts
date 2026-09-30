// shared/zod/CombatEffectSchema.ts


import { z } from "zod";
import { ElementTypeEnum } from "../types/ElementTypeEnum";
import { EffectTypeEnum } from "../types/EffectTypeEnum";

export const CombatEffectSchema = z.object({
  id: z.string(),
  participantId: z.string(),

  type: z.enum(EffectTypeEnum),
  element: z.enum(ElementTypeEnum).optional(),

  magnitude: z.number(),

  tickIntervalMs: z.number().nullable(),
  nextTickAt: z.number().nullable(),
  expiresAt: z.number().nullable(),

  stacks: z.number().optional().default(1),
  isExpired: z.boolean().optional().default(false),

  createdAt: z.number(),
  updatedAt: z.number(),
});
