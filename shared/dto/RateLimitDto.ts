// shared/dto/RateLimitDto.ts
import { z } from "zod";
import { RateLimitSchema } from "../zod/RateLimitSchema";

export type RateLimitDto = z.infer<typeof RateLimitSchema>;