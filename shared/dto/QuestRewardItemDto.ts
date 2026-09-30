// shared/dto/QuestRewardItemDto.ts
import { z } from "zod";
import { QuestRewardItemSchema } from "../zod/QuestRewardItemSchema";

export type QuestRewardItemDto = z.infer<typeof QuestRewardItemSchema>;