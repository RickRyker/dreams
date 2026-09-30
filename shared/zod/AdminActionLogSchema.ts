// shared/zod/AdminActionLogSchema.ts

import { z } from "zod";

export const AdminActionLogSchema = z.object({
  id: z.string(),
  gmId: z.string(),
  targetId: z.string().nullable(),
  actionType: z.string(),
  payload: z.string(),
  createdAt: z.number(),
});
