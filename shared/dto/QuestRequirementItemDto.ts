// shared/dto/QuestRequirementItemDto.ts
import { z } from "zod";
import { QuestRequirementItemSchema } from "../zod/QuestRequirementItemSchema";

export type QuestRequirementItemDto = z.infer<typeof QuestRequirementItemSchema>;