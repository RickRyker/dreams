// shared/dto/GuildDto.ts
import { z } from "zod";
import { GuildSchema } from "../zod/GuildSchema";

export type GuildDto = z.infer<typeof GuildSchema>;