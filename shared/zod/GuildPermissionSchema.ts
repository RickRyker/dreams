// shared/zod/GuildPermissionSchema.ts

import {z} from "zod";
import {GuildPermissionEnum} from "../types/GuildPermissionEnum";

export const GuildPermissionSchema = z.object({
  id: z.string(),
  guildRankId: z.string(),
  action: z.enum(GuildPermissionEnum),
  permitted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
