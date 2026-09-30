// shared/dto/EconomySnapshotDto.ts
import { z } from "zod";
import { EconomySnapshotSchema } from "../zod/EconomySnapshotSchema";

export type EconomySnapshotDto = z.infer<typeof EconomySnapshotSchema>;