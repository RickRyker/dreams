// shared/dto/MapDto.ts
import { z } from "zod";
import { MapSchema } from "../zod/MapSchema";

export type MapDto = z.infer<typeof MapSchema>;