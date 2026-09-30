// shared/dto/SessionDto.ts
import { z } from "zod";
import { SessionSchema } from "../zod/SessionSchema";

export type SessionDto = z.infer<typeof SessionSchema>;