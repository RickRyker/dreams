// shared/dto/MessageLogDto.ts
import { z } from "zod";
import { MessageLogSchema } from "../zod/MessageLogSchema";

export type MessageLogDto = z.infer<typeof MessageLogSchema>;