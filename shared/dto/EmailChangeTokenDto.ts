// shared/dto/EmailChangeTokenDto.ts
import { z } from "zod";
import { EmailChangeTokenSchema } from "../zod/EmailChangeTokenSchema";

export type EmailChangeTokenDto = z.infer<typeof EmailChangeTokenSchema>;