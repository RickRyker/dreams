// shared/zod/GuildMemberSchema.ts

import { z } from "zod";

export const GuildMemberSchema = z.object({
  id: z.string(),
  guildId: z.string(),
  playerId: z.string(),
  rankLevel: z.number().int(),
  rankId: z.string(),
  credits: z.number().int(),
  joinAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
