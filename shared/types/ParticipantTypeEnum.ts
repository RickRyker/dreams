// shared/types/ParticipantTypeEnum.ts


export const ParticipantTypeEnum = [
  "MONSTER",
  "PET",
  "PLAYER",
] as const;

export type ParticipantType = typeof ParticipantTypeEnum[number];
