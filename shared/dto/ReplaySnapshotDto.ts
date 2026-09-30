// shared/dto/ReplaySnapshotDto.ts
import { z } from "zod";
import { ReplaySnapshotSchema } from "../zod/ReplaySnapshotSchema";

export type ReplaySnapshotDto = z.infer<typeof ReplaySnapshotSchema>;