// shared/dto/VerificationTokenDto.ts
import { z } from "zod";
import { VerificationTokenSchema } from "../zod/VerificationTokenSchema";

export type VerificationTokenDto = z.infer<typeof VerificationTokenSchema>;