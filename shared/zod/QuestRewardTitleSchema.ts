// shared/zod/QuestRewardTitleSchema.ts

import { z } from "zod";

export const QuestRewardTitleSchema = z.object({
  titleSlug: z.string(),
});
