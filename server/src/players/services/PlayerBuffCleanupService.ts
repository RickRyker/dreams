// server/src/players/services/PlayerBuffCleanupService.ts

import { prisma } from "../../db/client";

export class PlayerBuffCleanupService {
  async clearAllExpired(): Promise<number> {
    const result = await prisma.playerEffect.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });

    return result.count;
  }

  async clearExpiredForPlayer(playerId: string): Promise<number> {
    const result = await prisma.playerEffect.deleteMany({
      where: {
        playerId,
        expiresAt: { lt: new Date() },
      },
    });

    return result.count;
  }
}
