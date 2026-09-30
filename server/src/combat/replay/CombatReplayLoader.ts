// server/src/combat/replay/CombatReplayLoader.ts


import {PrismaClient} from "@prisma/client";

export class CombatReplayLoader {
  constructor(private readonly prisma: PrismaClient) {}

  async loadReplay(combatId: string) {
    const replay = await this.prisma.combatReplay.findUnique({
      where: {combatId},
    });

    if (!replay) return null;

    return {
      combatId,
      summary: replay.summary,
      frames: replay.frames,
    };
  }
}
