// shared/dto/EventParticipationDto.ts
import { z } from "zod";
import { EventParticipationSchema } from "../zod/EventParticipationSchema";

export type EventParticipationDto = z.infer<typeof EventParticipationSchema>;