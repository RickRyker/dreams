// shared/zod/EffectTypeSchema.ts

import { z } from "zod";

export const EffectTypeSchema = z.enum([
  "BUFF",
  "DEBUFF",
  "DOT",
  "HASTE",
  "HOT",
  "SHIELD",
  "SILENCE",
  "SLOW",
  "STUN",
  "TAUNT",
  "OTHER",
]);
