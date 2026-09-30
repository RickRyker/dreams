// shared/types/GuildLogActionEnum.ts


export const GuildLogActionEnum: string[] = [
  "JOINED",
  "DONATED",
  "WITHDREW",
  "BORROWED",
  "RETURNED",
  "INVITED",
  "TAGGED",
  "UNTAGGED",
  "PROMOTED",
  "DEMOTED",
  "KICKED",
  "LEFT_GUILD",
  "EDITED",
];

export type GuildLogActionType = typeof GuildLogActionEnum[number];
