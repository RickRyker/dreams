// shared/dto/PlayerEquipmentDto.ts
import { z } from "zod";
import { PlayerEquipmentSchema } from "../zod/PlayerEquipmentSchema";

export type PlayerEquipmentDto = z.infer<typeof PlayerEquipmentSchema>;