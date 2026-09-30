// shared/zod/MonsterAbilitySchema.ts

import { z } from "zod";

export const MonsterAbilitySchema = z.object({
  id: z.string(),
  monsterId: z.string(),
  abilityId: z.string(),
});
