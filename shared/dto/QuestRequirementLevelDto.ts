// shared/dto/QuestRequirementLevelDto.ts
import { z } from "zod";
import { QuestRequirementLevelSchema } from "../zod/QuestRequirementLevelSchema";

export type QuestRequirementLevelDto = z.infer<typeof QuestRequirementLevelSchema>;