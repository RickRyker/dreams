// server/src/gathering/GatheringService.ts

import {prisma} from "@prisma";
import { BuffService } from '../buffs/BuffService';

export class GatheringService {
  constructor(private buffs: BuffService) {}

  async gatherNode(playerId: string, nodeId: string) {
    const node = await prisma.location.findUnique({ where: { id: nodeId } });
    if (!node) throw new Error('Node not found');

    const baseXp = this.getBaseGatherXp();

    const finalXp = await this.buffs.applyXpGain(playerId, baseXp);

    await prisma.playerStats.update({
      where: { playerId },
      data: { experience: { increment: finalXp } },
    });

    // …give items, mark node depleted, etc.

    return { baseXp, finalXp };
  }

  private getBaseGatherXp() {
    return 5;
  }
}
