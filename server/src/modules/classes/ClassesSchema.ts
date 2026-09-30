// server/src/modules/classes/ClassesSchema.ts

import { z } from 'zod';

export const assignClassSchema = z.object({
  classId: z.string()
});
