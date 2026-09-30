// shared/dto/ReplayEventDto.ts
import { z } from "zod";
import { ReplayEventSchema } from "../zod/ReplayEventSchema";

export type ReplayEventDto = z.infer<typeof ReplayEventSchema>;