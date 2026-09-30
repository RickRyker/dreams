// server/src/guilds/types/LogGuildActionPersistenceInput.ts


import {GuildLogType} from "@shared/types/GuildLogTypeEnum";
import {GuildLogActionType} from "@shared/types/GuildLogActionEnum";

export interface LogGuildActionPersistenceInput {
  guildId: string;
  playerId: string;
  type: GuildLogType;
  action: GuildLogActionType;
  details: string;
}
