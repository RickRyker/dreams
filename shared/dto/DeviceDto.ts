// shared/dto/DeviceDto.ts
import { z } from "zod";
import { DeviceSchema } from "../zod/DeviceSchema";

export type DeviceDto = z.infer<typeof DeviceSchema>;