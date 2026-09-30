// shared/dto/MonsterAbilityDto.ts
import { z } from "zod";
import { MonsterAbilitySchema } from "../zod/MonsterAbilitySchema";

export type MonsterAbilityDto = z.infer<typeof MonsterAbilitySchema>;