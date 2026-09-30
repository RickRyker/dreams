// shared/dto/EventDto.ts
import { z } from "zod";
import { EventSchema } from "../zod/EventSchema";

export type EventDto = z.infer<typeof EventSchema>;