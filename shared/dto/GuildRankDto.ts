// shared/dto/GuildRankDto.ts
import { z } from "zod";
import { GuildRankSchema } from "../zod/GuildRankSchema";

export type GuildRankDto = z.infer<typeof GuildRankSchema>;