// shared/zod/AbilityElementSchema.ts

import { z } from "zod";

export const AbilityElementSchema = z.enum([
  "NONE",
  "AIR",
  "DEATH",
  "EARTH",
  "FIRE",
  "ICE",
  "LIGHTNING",
  "NATURE",
  "POISON",
  "SHADOW",
  "SPIRIT",
  "WATER",
]);
