// shared/dto/AccountAuthenticationDto.ts
import { z } from "zod";
import { AccountAuthenticationSchema } from "../zod/AccountAuthenticationSchema";

export type AccountAuthenticationDto = z.infer<typeof AccountAuthenticationSchema>;