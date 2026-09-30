// shared/dto/WorldConfigSettingDto.ts
import { z } from "zod";
import { WorldConfigSettingSchema } from "../zod/WorldConfigSettingSchema";

export type WorldConfigSettingDto = z.infer<typeof WorldConfigSettingSchema>;