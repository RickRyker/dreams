// shared/zod/QuestRequirementQuestSchema.ts

import { z } from "zod";

export const QuestRequirementQuestSchema = z.object({
  requiredQuestSlug: z.string(),
});
