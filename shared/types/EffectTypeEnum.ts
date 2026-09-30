// shared/types/EffectTypeEnum.ts


export const EffectTypeEnum = [
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
] as const;

export type EffectType = typeof EffectTypeEnum[number];
