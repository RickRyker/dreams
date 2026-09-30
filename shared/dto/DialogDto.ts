// shared/dto/DialogDto.ts
import { z } from "zod";
import { DialogSchema } from "../zod/DialogSchema";

export type DialogDto = z.infer<typeof DialogSchema>;