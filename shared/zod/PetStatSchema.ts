// shared/zod/PetStatSchema.ts

import { z } from "zod";

export const PetStatSchema = z.object({
  id: z.string(),
  petTypeId: z.string(),
  statSlug: z.string(),
  value: z.number(),
});
