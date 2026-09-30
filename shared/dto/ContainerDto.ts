// shared/dto/ContainerDto.ts
import { z } from "zod";
import { ContainerSchema } from "../zod/ContainerSchema";

export type ContainerDto = z.infer<typeof ContainerSchema>;