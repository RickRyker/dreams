// shared/types/GuildPermissionEnum.ts


export const GuildPermissionEnum: string[] = [
  "DONATE_ITEMS",
  "WITHDRAW_ITEMS",
  "RETURN_ITEMS",
  "WITHDRAW_GOLD",
  "INVITE",
  "EDIT_DESCRIPTION",
  "TAG_ITEMS",
  "PROMOTE",
  "DEMOTE",
  "KICK",
  "UNTAG_ITEMS",
  "MANAGE_RANKS",
  "MANAGE_GUILD",
];

export type GuildPermissionType = typeof GuildPermissionEnum[number];
