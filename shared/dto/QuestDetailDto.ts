// shared/dto/QuestDetailDto.ts
import { z } from "zod";
import { QuestDetailSchema } from "../zod/QuestDetailSchema";

export type QuestDetailDto = z.infer<typeof QuestDetailSchema>;