// shared/dto/QuestDto.ts
import { z } from "zod";
import { QuestSchema } from "../zod/QuestSchema";

export type QuestDto = z.infer<typeof QuestSchema>;