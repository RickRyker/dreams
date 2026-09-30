// shared/dto/QuestRewardSkillDto.ts
import { z } from "zod";
import { QuestRewardSkillSchema } from "../zod/QuestRewardSkillSchema";

export type QuestRewardSkillDto = z.infer<typeof QuestRewardSkillSchema>;