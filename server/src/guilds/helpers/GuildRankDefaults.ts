// server/src/guilds/helpers/GuildRankDefaults.ts


import { GuildPermissionType } from "@shared/types/GuildPermissionEnum";

export interface DefaultGuildRankDefinition {
  level: number;
  name: string;
  permissions: GuildPermissionType[];
}

export const DEFAULT_GUILD_RANKS: DefaultGuildRankDefinition[] = [
  { level: 0, name: "Recruit", permissions: [] },
  { level: 1, name: "Initiate", permissions: [] },
  { level: 2, name: "Adventurer", permissions: [] },
  { level: 3, name: "Veteran", permissions: [] },
  { level: 4, name: "Elite", permissions: [] },
  { level: 5, name: "Champion", permissions: [] },
  { level: 6, name: "Hero", permissions: [] },
  { level: 7, name: "Paragon", permissions: [] },
  { level: 8, name: "Legend", permissions: [] },
  {
    level: 9,
    name: "Grand Master",
    permissions: ["MANAGE_RANKS", "MANAGE_GUILD"],
  },
];

export function buildDefaultGuildRankCreateInput() {
  return DEFAULT_GUILD_RANKS.map((rank: DefaultGuildRankDefinition) => ({
    level: rank.level,
    name: rank.name,
    permissions: {
      create: rank.permissions.map((p: string): {action: any, permitted: boolean} => ({
        action: p as any,
        permitted: true,
      })),
    },
  }));
}
