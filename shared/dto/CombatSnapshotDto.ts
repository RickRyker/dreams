// shared/dto/CombatSnapshotDto.ts
import { z } from "zod";
import { CombatSnapshotSchema } from "../zod/CombatSnapshotSchema";

export type CombatSnapshotDto = z.infer<typeof CombatSnapshotSchema>;