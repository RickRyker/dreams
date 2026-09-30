// server/src/modules/spells/spells.schema.ts

import { z } from 'zod';

export const learnSpellSchema = z.object({
  spellId: z.string()
});

export const unlearnSpellSchema = z.object({
  spellId: z.string()
});
