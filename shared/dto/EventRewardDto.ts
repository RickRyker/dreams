// shared/dto/EventRewardDto.ts
import { z } from "zod";
import { EventRewardSchema } from "../zod/EventRewardSchema";

export type EventRewardDto = z.infer<typeof EventRewardSchema>;