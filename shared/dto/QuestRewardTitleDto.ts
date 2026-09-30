// shared/dto/QuestRewardTitleDto.ts
import { z } from "zod";
import { QuestRewardTitleSchema } from "../zod/QuestRewardTitleSchema";

export type QuestRewardTitleDto = z.infer<typeof QuestRewardTitleSchema>;