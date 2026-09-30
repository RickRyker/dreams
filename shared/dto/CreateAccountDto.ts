// shared/dto/CreateAccountDto.ts
import { z } from "zod";
import { CreateAccountSchema } from "../zod/CreateAccountSchema";

export type CreateAccountDto = z.infer<typeof CreateAccountSchema>;