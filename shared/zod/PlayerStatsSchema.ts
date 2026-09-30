// shared/zod/PlayerStatsSchema.ts

import { z } from "zod";

export const PlayerStatsSchema = z.object({
  gold: z.number(),
  level: z.number(),
  experience: z.number(),
  strength: z.number(),
  dexterity: z.number(),
  intelligence: z.number(),
  charisma: z.number(),
  hp: z.number(),
  maxHp: z.number(),
  mp: z.number(),
  maxMp: z.number(),
  critChance: z.number(),
  critDamage: z.number(),
  critResistance: z.number(),
  damageReduction: z.number(),
  spellResistance: z.number(),
});
