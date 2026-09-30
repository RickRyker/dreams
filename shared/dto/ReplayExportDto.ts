// shared/dto/ReplayExportDto.ts
import { z } from "zod";
import { ReplayExportSchema } from "../zod/ReplayExportSchema";

export type ReplayExportDto = z.infer<typeof ReplayExportSchema>;