// shared/dto/AccountDto.ts
import { z } from "zod";
import { AccountSchema } from "../zod/AccountSchema";

export type AccountDto = z.infer<typeof AccountSchema>;