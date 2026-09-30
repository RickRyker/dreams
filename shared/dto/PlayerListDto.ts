// shared/dto/PlayerListDto.ts
import { z } from "zod";
import { PlayerListSchema } from "../zod/PlayerListSchema";

export type PlayerListDto = z.infer<typeof PlayerListSchema>;