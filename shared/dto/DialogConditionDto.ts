// shared/dto/DialogConditionDto.ts
import { z } from "zod";
import { DialogConditionSchema } from "../zod/DialogConditionSchema";

export type DialogConditionDto = z.infer<typeof DialogConditionSchema>;