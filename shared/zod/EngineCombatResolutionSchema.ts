// shared/zod/EngineCombatResolutionSchema.ts


import {z} from "zod";

export const EngineCombatResolutionSchema = z.object({

  damage: z
    .object({
      sourceId: z.string(),
      targetId: z.string(),
      amount: z.number(),
    })
    .optional(),

  heal: z
    .object({
      sourceId: z.string(),
      targetId: z.string(),
      amount: z.number(),
    })
    .optional(),

  shield: z
    .object({
      sourceId: z.string(),
      targetId: z.string(),
      amount: z.number(),
    })
    .optional(),

  interrupt: z
    .object({
      targetId: z.string(),
    })
    .optional(),

});
