// shared/types/GuildLogTypeEnum.ts


export const GuildLogTypeEnum: string[] = [
  "MEMBERS",
  "TREASURY",
];

export type GuildLogType = typeof GuildLogTypeEnum[number];
