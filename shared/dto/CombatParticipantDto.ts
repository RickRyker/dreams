// shared/dto/CombatParticipantDto.ts
import { z } from "zod";
import { CombatParticipantSchema } from "../zod/CombatParticipantSchema";

export type CombatParticipantDto = z.infer<typeof CombatParticipantSchema>;