// shared/zod/QuestDependencySchema.ts

import { z } from "zod";

export const QuestDependencySchema = z.object({
  questId: z.string(),
  dependsOn: z.string(),
});
