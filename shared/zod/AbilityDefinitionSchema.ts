// shared/zod/AbilityDefinitionSchema.ts


import { z } from "zod";
import { AbilityElementSchema } from "./AbilityElementSchema";
import { EffectTypeSchema } from "./EffectTypeSchema";
import { TelegraphSchema } from "./TelegraphSchema";

export const AbilityDefinitionSchema = z.object({
  slug: z.string(),
  name: z.string(),

  element: AbilityElementSchema,
  effectType: EffectTypeSchema.nullable(),

  baseDamage: z.number().nullable(),
  baseHeal: z.number().nullable(),

  manaCost: z.number(),
  castTimeMs: z.number(),
  cooldownMs: z.number(),

  magnitude: z.number().nullable(),
  durationMs: z.number().nullable(),
  tickIntervalMs: z.number().nullable(),

  radius: z.number().nullable(),

  telegraph: TelegraphSchema.nullable(),

  tags: z.array(z.string()),
});
