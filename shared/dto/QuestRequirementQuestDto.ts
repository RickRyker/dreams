// shared/dto/QuestRequirementQuestDto.ts
import { z } from "zod";
import { QuestRequirementQuestSchema } from "../zod/QuestRequirementQuestSchema";

export type QuestRequirementQuestDto = z.infer<typeof QuestRequirementQuestSchema>;