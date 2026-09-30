// shared/dto/PlayerQuestVariableDto.ts
import { z } from "zod";
import { PlayerQuestVariableSchema } from "../zod/PlayerQuestVariableSchema";

export type PlayerQuestVariableDto = z.infer<typeof PlayerQuestVariableSchema>;