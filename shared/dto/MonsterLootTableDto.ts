// shared/dto/MonsterLootTableDto.ts
import { z } from "zod";
import { MonsterLootTableSchema } from "../zod/MonsterLootTableSchema";

export type MonsterLootTableDto = z.infer<typeof MonsterLootTableSchema>;