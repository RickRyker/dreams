// server/src/modules/skills/skills.schema.ts

import { z } from 'zod';

export const addSkillXpSchema = z.object({
  skillId: z.string(),
  amount: z.number().int().positive()
});
