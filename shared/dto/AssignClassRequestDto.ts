// shared/dto/AssignClassRequestDto.ts
import { z } from "zod";
import { AssignClassRequestSchema } from "../zod/ClassSchema";

export type AssignClassRequestDto = z.infer<typeof AssignClassRequestSchema>;