// shared/dto/DialogPageDto.ts
import { z } from "zod";
import { DialogPageSchema } from "../zod/DialogPageSchema";

export type DialogPageDto = z.infer<typeof DialogPageSchema>;