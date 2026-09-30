// shared/dto/CombatEntitySnapshotDto.ts
import { z } from "zod";
import { CombatEntitySnapshotSchema } from "../zod/CombatEntitySnapshotSchema";

export type CombatEntitySnapshotDto = z.infer<typeof CombatEntitySnapshotSchema>;