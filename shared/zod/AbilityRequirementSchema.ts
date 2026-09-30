// shared/zod/AbilityRequirementSchema.ts

import { z } from "zod";

export const AbilityRequirementSchema = z.object({
  id: z.string(),
  abilityId: z.string(),
  requirementType: z.string(),
  value: z.number(),
});
