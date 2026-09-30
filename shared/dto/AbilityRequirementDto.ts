// shared/dto/AbilityRequirementDto.ts
import { z } from "zod";
import { AbilityRequirementSchema } from "../zod/AbilityRequirementSchema";

export type AbilityRequirementDto = z.infer<typeof AbilityRequirementSchema>;