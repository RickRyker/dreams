// shared/dto/PlayerSkillDto.ts
import { z } from "zod";
import { PlayerSkillSchema } from "../zod/PlayerSkillSchema";

export type PlayerSkillDto = z.infer<typeof PlayerSkillSchema>;