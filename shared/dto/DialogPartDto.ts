// shared/dto/DialogPartDto.ts
import { z } from "zod";
import { DialogPartSchema } from "../zod/DialogPartSchema";

export type DialogPartDto = z.infer<typeof DialogPartSchema>;