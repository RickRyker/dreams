// shared/dto/HeatmapEventDto.ts
import { z } from "zod";
import { HeatmapEventSchema } from "../zod/HeatmapEventSchema";

export type HeatmapEventDto = z.infer<typeof HeatmapEventSchema>;