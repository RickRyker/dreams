// server/src/modules/economy/economy.schema.ts

import { z } from 'zod';

export const goldSinkSchema = z.object({
  type: z.string(),
  amount: z.number().int().positive()
});
