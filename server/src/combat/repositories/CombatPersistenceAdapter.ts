// server/src/combat/repositories/CombatPersistenceAdapter.ts


import { CombatPersistencePort } from "../persistence/CombatPersistencePort";
import { EngineCombatSnapshot } from "../types/EngineCombatTypes";
import { CombatSnapshotMapper } from "../persistence/CombatSnapshotMapper";
import { PrismaClient } from "@prisma/client";
import {prisma as prismaClient} from "@prisma";

export class CombatPersistenceAdapter implements CombatPersistencePort {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  // ----------------------------------------
  // Port: persistSnapshot
  // ----------------------------------------
  async persistSnapshot(snapshot: EngineCombatSnapshot): Promise<void> {
    await this.prisma.combatSnapshot.create({
      data: CombatSnapshotMapper.fromEngineSnapshot(snapshot) as any,
    });
  }

  // ----------------------------------------
  // Port: loadSnapshots
  // ----------------------------------------
  async loadSnapshots(combatId: string): Promise<EngineCombatSnapshot[]> {
    const rows = await this.prisma.combatSnapshot.findMany({
      where: { combatId },
      orderBy: { timestamp: "asc" },
    });

    return rows.map((row) => CombatSnapshotMapper.toEngineSnapshot(row));
  }

  // ----------------------------------------
  // Port: persistReplay
  // ----------------------------------------
  async persistReplay(
    combatId: string,
    replay: any,
    summary: any,
  ): Promise<void> {
    await this.prisma.combatReplay.upsert({
      where: { combatId },
      update: { frames: replay, summary },
      create: { combatId, frames: replay, summary },
    });
  }

  // ----------------------------------------
  // Port: loadReplay
  // ----------------------------------------
  async loadReplay(combatId: string): Promise<any | null> {
    return this.prisma.combatReplay.findUnique({
      where: { combatId },
    });
  }

  // ----------------------------------------
  // Port: exportLogs
  // ----------------------------------------
  async exportLogs(combatId: string, format: "json" | "html"): Promise<string> {
    const rows = await this.prisma.combatLogEntry.findMany({
      where: { combatId },
      orderBy: { seq: "asc" },
    });

    if (format === "json") {
      return JSON.stringify(rows, null, 2); // <-- ALWAYS return string
    }

    // HTML format
    return `
    <html>
      <body>
        <h1>Combat Log</h1>
        <ul>
          ${rows.map((e) => `<li>[${e.seq}] ${e.message}</li>`).join("")}
        </ul>
      </body>
    </html>
  `;
  }

  // ----------------------------------------
  // (Your existing methods stay as-is)
  // ----------------------------------------
  // saveEngineSnapshot()
  // saveManyEngineSnapshots()
  // listEngineSnapshots()
  // flushSnapshots()

  // Hydration: list all combat participants
  async listParticipants(combatId: string): Promise<any[]> {
    return this.prisma.combatParticipant.findMany({
      where: { combatId },
    });
  }

  // Hydration: list all effects for a player
  async listPlayerEffects(playerId: string): Promise<any[]> {
    return this.prisma.playerEffect.findMany({
      where: { playerId },
    });
  }

  // Human-readable log entries
  async saveLogEntries(entries: any[]): Promise<void> {
    if (!entries.length) return;

    await this.prisma.combatLogEntry.createMany({
      data: entries.map((e) => ({
        id: e.id,
        combatId: e.combatId,
        seq: e.seq,
        type: e.type ?? "INFO",
        actorId: e.actorId ?? null,
        actorType: e.actorType ?? null,
        targetId: e.targetId ?? null,
        message: e.message ?? "",
        data: e.data ?? {},
        createdAt: new Date(e.createdAt),
      })),
    });
  }

}
