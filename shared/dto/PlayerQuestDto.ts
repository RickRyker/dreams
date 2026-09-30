// shared/dto/PlayerQuestDto.ts
import { z } from "zod";
import { PlayerQuestSchema } from "../zod/PlayerQuestSchema";

export type PlayerQuestDto = z.infer<typeof PlayerQuestSchema>;