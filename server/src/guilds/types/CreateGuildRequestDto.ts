// server/src/guilds/types/CreateGuildRequestDto.ts


import {GuildPermissionType} from "@shared/types/GuildPermissionEnum";

export interface CreateGuildRequestDto {
  name: string;
  description: string;
  founderId: string;
  initialRankName: string;
  initialRankLevel: number;
  initialPermissions: GuildPermissionType[];
}
