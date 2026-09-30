// shared/zod/CombatEntitySnapshotSchema.ts

import { z } from "zod";

export const CombatEntitySnapshotSchema = z.object({
  entityId: z.string(),
  hp: z.number(),
  maxHp: z.number(),
  shield: z.number(),
  buffs: z.array(z.string()),
  debuffs: z.array(z.string()),
  interrupted: z.boolean(),
});
