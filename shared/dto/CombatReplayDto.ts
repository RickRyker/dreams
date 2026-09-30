// shared/dto/CombatReplayDto.ts
import { z } from "zod";
import { CombatReplaySchema } from "../zod/CombatReplaySchema";

export type CombatReplayDto = z.infer<typeof CombatReplaySchema>;