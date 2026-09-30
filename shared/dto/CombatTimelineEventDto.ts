// shared/dto/CombatTimelineEventDto.ts
import { z } from "zod";
import { CombatTimelineEventSchema } from "../zod/CombatTimelineEventSchema";

export type CombatTimelineEventDto = z.infer<typeof CombatTimelineEventSchema>;