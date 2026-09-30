// shared/dto/GuildLogDto.ts
import { z } from "zod";
import { GuildLogSchema } from "../zod/GuildLogSchema";

export type GuildLogDto = z.infer<typeof GuildLogSchema>;