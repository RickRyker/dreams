// shared/dto/PlayerSummaryDto.ts
import { z } from "zod";
import { PlayerSummarySchema } from "../zod/PlayerSummarySchema";

export type PlayerSummaryDto = z.infer<typeof PlayerSummarySchema>;