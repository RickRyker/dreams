// server/src/modules/monsters/monsters.schema.ts

import { z } from 'zod';

export const monsterIdSchema = z.object({
  monsterId: z.string()
});
