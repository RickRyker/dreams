// shared/zod/AbilityTagSchema.ts

import { z } from "zod";

export const AbilityTagSchema = z.object({
  id: z.string(),
  abilityId: z.string(),
  tag: z.string(),
});
