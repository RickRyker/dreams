// shared/dto/DialogActionDto.ts
import { z } from "zod";
import { DialogActionSchema } from "../zod/DialogActionSchema";

export type DialogActionDto = z.infer<typeof DialogActionSchema>;