// shared/dto/AdminActionLogDto.ts
import { z } from "zod";
import { AdminActionLogSchema } from "../zod/AdminActionLogSchema";

export type AdminActionLogDto = z.infer<typeof AdminActionLogSchema>;