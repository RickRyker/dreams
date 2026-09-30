// server/src/guilds/mappers/GuildMapper.ts


export interface GuildWithRelationsDto {
  id: string;
  name: string;
  description: string;
  members: {
    id: string;
    playerId: string;
    rankId: string;
    rankLevel: number;
    rankName: string;
  }[];
  ranks: {
    id: string;
    level: number;
    name: string;
    permissions: { action: string; permitted: boolean }[];
  }[];
  logs: any[];
  treasury: {
    id: string;
    itemId: string;
    name: string;
    quantity: number;
  }[];
}

export class GuildMapper {
  static toGuildWithRelationsDto(guild: any): GuildWithRelationsDto {
    return {
      id: guild.id,
      name: guild.name,
      description: guild.description,
      members: guild.members.map((m: any) => ({
        id: m.id,
        playerId: m.playerId,
        rankId: m.rankId,
        rankLevel: m.rank.level,
        rankName: m.rank.name,
      })),
      ranks: guild.ranks.map((r: any) => ({
        id: r.id,
        level: r.level,
        name: r.name,
        permissions: r.permissions.map((p: any) => ({
          action: p.action,
          permitted: p.permitted,
        })),
      })),
      logs: guild.logs,
      treasury: guild.treasury.map((i: any) => ({
        id: i.id,
        itemId: i.itemId,
        name: i.item.name,
        quantity: i.quantity,
      })),
    };
  }
}
