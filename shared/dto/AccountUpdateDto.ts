// shared/dto/AccountUpdateDto.ts
import { z } from "zod";
import { AccountUpdateSchema } from "../zod/AccountUpdateSchema";

export type AccountUpdateDto = z.infer<typeof AccountUpdateSchema>;