// shared/zod/PlayerSessionLogSchema.ts

import { z } from "zod";

export const PlayerSessionLogSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  loginAt: z.number(),
  logoutAt: z.number().nullable(),
  ipAddress: z.string().nullable(),
  clientVersion: z.string().nullable(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
