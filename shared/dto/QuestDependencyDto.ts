// shared/dto/QuestDependencyDto.ts
import { z } from "zod";
import { QuestDependencySchema } from "../zod/QuestDependencySchema";

export type QuestDependencyDto = z.infer<typeof QuestDependencySchema>;