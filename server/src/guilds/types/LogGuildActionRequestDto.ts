// server/src/guilds/types/LogGuildActionRequestDto.ts


import {GuildLogType} from "@shared/types/GuildLogTypeEnum";
import {GuildLogActionType} from "@shared/types/GuildLogActionEnum";

export interface LogGuildActionRequestDto {
  guildId: string;
  playerId: string;
  type: GuildLogType;
  action: GuildLogActionType;
  details: string;
}
