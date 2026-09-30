// shared/zod/GuildRankSchema.ts

import {z} from "zod";

export const GuildRankSchema = z.object({
  id: z.string(),
  guildId: z.string(),
  level: z.number().int(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
