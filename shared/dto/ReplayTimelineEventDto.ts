// shared/dto/ReplayTimelineEventDto.ts
import { z } from "zod";
import { ReplayTimelineEventSchema } from "../zod/ReplayTimelineEventSchema";

export type ReplayTimelineEventDto = z.infer<typeof ReplayTimelineEventSchema>;