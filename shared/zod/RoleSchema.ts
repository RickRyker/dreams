// shared/zod/RoleSchema.ts

import { z } from "zod";

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
