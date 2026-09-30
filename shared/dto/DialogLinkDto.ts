// shared/dto/DialogLinkDto.ts
import { z } from "zod";
import { DialogLinkSchema } from "../zod/DialogLinkSchema";

export type DialogLinkDto = z.infer<typeof DialogLinkSchema>;