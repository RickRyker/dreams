// shared/types/ElementTypeEnum.ts


export const ElementTypeEnum = [
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
] as const;

export type ElementType = typeof ElementTypeEnum[number];
