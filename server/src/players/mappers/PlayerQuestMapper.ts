// server/src/players/mappers/PlayerQuestMapper.ts

import {PlayerQuest} from "@prisma/client";
import {PlayerQuestDto} from "shared";

export class PlayerQuestMapper {
  static fromPrisma(model: PlayerQuest): PlayerQuestDto {
    return {
      id: model.id,
      playerId: model.playerId,
      questId: model.questId,
      status: model.status,
      completed: model.status === 'COMPLETED',
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
