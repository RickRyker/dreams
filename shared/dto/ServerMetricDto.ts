// shared/dto/ServerMetricDto.ts
import { z } from "zod";
import { ServerMetricSchema } from "../zod/ServerMetricSchema";

export type ServerMetricDto = z.infer<typeof ServerMetricSchema>;