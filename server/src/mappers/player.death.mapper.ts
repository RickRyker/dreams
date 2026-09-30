// server/src/mappers/player.death.mapper.ts

import { PlayerDeath } from "@prisma/client";
import { PlayerDeathDto } from "shared";

export function toPlayerDeathDto(model: PlayerDeath): PlayerDeathDto {
  return {
    id: model.id,
    playerId: model.playerId,
    level: model.level,
    killedBy: model.killedBy,
    mapId: model.mapId,
    x: model.x,
    y: model.y,
    timestamp: model.timestamp.getTime(),
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toPlayerDeathDtoList(models: PlayerDeath[]): PlayerDeathDto[] {
  return models.map(toPlayerDeathDto);
}
