// shared/zod/PetAbilitySchema.ts

import { z } from "zod";

export const PetAbilitySchema = z.object({
  id: z.string(),
  petTypeId: z.string(),
  abilityId: z.string(),
});
