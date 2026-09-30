// shared/dto/PlayerSessionLogDto.ts
import { z } from "zod";
import { PlayerSessionLogSchema } from "../zod/PlayerSessionLogSchema";

export type PlayerSessionLogDto = z.infer<typeof PlayerSessionLogSchema>;