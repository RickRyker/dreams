// server/src/players/repositories/PlayerSpellRepository.ts

import { prisma } from "../../db/client";
import { PlayerSpell } from "@prisma/client";

export class PlayerSpellRepository {
  async learnSpell(playerId: string, spellId: string): Promise<PlayerSpell> {
    return prisma.playerSpell.create({
      data: {
        playerId,
        spellId,
        count: 1,
      },
    });
  }

  async list(playerId: string): Promise<PlayerSpell[]> {
    return prisma.playerSpell.findMany({ where: { playerId } });
  }
}
