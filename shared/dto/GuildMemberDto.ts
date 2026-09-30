// shared/dto/GuildMemberDto.ts
import { z } from "zod";
import { GuildMemberSchema } from "../zod/GuildMemberSchema";

export type GuildMemberDto = z.infer<typeof GuildMemberSchema>;