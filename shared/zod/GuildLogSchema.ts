// shared/zod/GuildLogSchema.ts

import {z} from "zod";
import {GuildLogTypeEnum} from "../types/GuildLogTypeEnum";
import {GuildLogActionEnum} from "../types/GuildLogActionEnum";

export const GuildLogSchema = z.object({
  id: z.string(),
  guildId: z.string(),
  type: z.enum(GuildLogTypeEnum),
  action: z.enum(GuildLogActionEnum),
  playerId: z.string(),
  details: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
