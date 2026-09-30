// server/src/modules/variables/variables.schema.ts

import { z } from 'zod';

export const setVariableSchema = z.object({
  name: z.string(),
  value: z.string().nullable()
});
