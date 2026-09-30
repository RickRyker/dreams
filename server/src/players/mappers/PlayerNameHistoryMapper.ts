// server/src/players/mappers/PlayerNameHistoryMapper.ts

import {PlayerNameHistory} from "@prisma/client";

export class PlayerNameHistoryMapper {
  static fromPrisma(model: PlayerNameHistory) {
    const changedAtSource = (model as any).changedAt ?? model.createdAt;
    return {
      id: model.id,
      oldName: model.oldName,
      newName: model.newName,
      changedAt: changedAtSource.getTime(),
      moderatorId: model.moderatorId ?? null,
    };
  }
}

/*
update flow:

async updateName(playerId: string, newName: string, moderatorId?: string) {
  const player = await this.players.findById(playerId);
  if (!player) throw new Error("PLAYER_NOT_FOUND");

  await this.players.addNameHistory(playerId, player.name, newName, moderatorId);

  const updated = await this.players.update(playerId, { name: newName });
  return PlayerMapper.fromPrisma(updated);
}

*/