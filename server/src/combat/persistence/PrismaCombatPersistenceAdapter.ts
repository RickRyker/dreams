// server/src/combat/persistence/PrismaCombatPersistenceAdapter.ts


import { PrismaClient, Prisma } from "@prisma/client";
import { CombatPersistencePort } from "./CombatPersistencePort";
import { CombatSnapshotMapper } from "./CombatSnapshotMapper";
import { EngineCombatSnapshot } from "../types/EngineCombatTypes";
import { CompressedReplay } from "../replay/CombatReplayCompressor";
import { CombatAnalyticsSummary } from "../analytics/CombatAnalytics";

export class PrismaCombatPersistenceAdapter implements CombatPersistencePort {
  constructor(private readonly prisma: PrismaClient) {}

  // ---------------------------------------------------------
  // SNAPSHOTS
  // ---------------------------------------------------------
  async persistSnapshot(snapshot: EngineCombatSnapshot): Promise<void> {
    await this.prisma.combatSnapshot.create({
      data: CombatSnapshotMapper.fromEngineSnapshot(snapshot) as any,
    });
  }

  async loadSnapshots(combatId: string): Promise<EngineCombatSnapshot[]> {
    const rows = await this.prisma.combatSnapshot.findMany({
      where: { combatId },
      orderBy: { timestamp: "asc" },
    });

    return rows.map((row) => CombatSnapshotMapper.toEngineSnapshot(row));
  }

  // ---------------------------------------------------------
  // REPLAY
  // ---------------------------------------------------------
  async persistReplay(
    combatId: string,
    replay: CompressedReplay,
    summary: CombatAnalyticsSummary,
  ): Promise<void> {
    await this.prisma.combatReplay.create({
      data: {
        combatId,
        summary: summary as unknown as Prisma.InputJsonValue,
        frames: replay.frames as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async loadReplay(combatId: string): Promise<any | null> {
    return this.prisma.combatReplay.findUnique({
      where: { combatId },
    });
  }

  async listParticipants(combatId: string): Promise<any[]> {
    return this.prisma.combatParticipant.findMany({
      where: { combatId },
    });
  }

  async listPlayerEffects(playerId: string): Promise<any[]> {
    return this.prisma.playerEffect.findMany({
      where: { playerId },
    });
  }

  // ---------------------------------------------------------
  // LOG EXPORT
  // ---------------------------------------------------------
  async exportLogs(combatId: string, format: "json" | "html"): Promise<string> {
    const logs = await this.prisma.combatLogEntry.findMany({
      where: { combatId },
      orderBy: { seq: "asc" },
    });

    if (format === "json") {
      return JSON.stringify(logs, null, 2);
    }

    return `
<html>
  <body>
    <h1>Combat Log</h1>
    <pre>${JSON.stringify(logs, null, 2)}</pre>
  </body>
</html>`;
  }

async saveLogEntries(entries: any[]): Promise<void> {
  if (!entries.length) return;
  await this.prisma.combatLogEntry.createMany({
    data: entries as any,
  });
}
}
