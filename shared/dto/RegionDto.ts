// shared/dto/RegionDto.ts
import { z } from "zod";
import { RegionSchema } from "../zod/RegionSchema";

export type RegionDto = z.infer<typeof RegionSchema>;