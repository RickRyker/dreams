// shared/dto/CombatLootDto.ts
import { z } from "zod";
import { CombatLootSchema } from "../zod/CombatLootSchema";

export type CombatLootDto = z.infer<typeof CombatLootSchema>;