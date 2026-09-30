// server/src/modules/titles/titles.schema.ts

import { z } from 'zod';

export const equipTitleSchema = z.object({
  titleId: z.string()
});
