// shared/dto/QuestEditorPayloadDto.ts
import { z } from "zod";
import { QuestEditorPayloadSchema } from "../zod/QuestEditorPayloadSchema";

export type QuestEditorPayloadDto = z.infer<typeof QuestEditorPayloadSchema>;