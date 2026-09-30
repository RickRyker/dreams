// shared/dto/QuestRequirementSkillDto.ts
import { z } from "zod";
import { QuestRequirementSkillSchema } from "../zod/QuestRequirementSkillSchema";

export type QuestRequirementSkillDto = z.infer<typeof QuestRequirementSkillSchema>;