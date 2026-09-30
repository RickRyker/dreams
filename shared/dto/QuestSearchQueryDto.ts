// shared/dto/QuestSearchQueryDto.ts
import { z } from "zod";
import { QuestSearchQuerySchema } from "../zod/QuestSearchQuerySchema";

export type QuestSearchQueryDto = z.infer<typeof QuestSearchQuerySchema>;