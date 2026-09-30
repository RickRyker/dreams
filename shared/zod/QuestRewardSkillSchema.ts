// shared/zod/QuestRewardSkillSchema.ts

import { z } from "zod";

export const QuestRewardSkillSchema = z.object({
  skillSlug: z.string(),
});
