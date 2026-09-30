// server/src/combat/persistence/CombatSnapshotLoader.ts


import {PrismaClient} from "@prisma/client";
import {CombatSnapshotMapper} from "./CombatSnapshotMapper";
import {EngineCombatSnapshot} from "../types/EngineCombatTypes";

export class CombatSnapshotLoader {
  constructor(private readonly prisma: PrismaClient) {}

  async loadSnapshotsForCombat(combatId: string): Promise<EngineCombatSnapshot[]> {
    const rows = await this.prisma.combatSnapshot.findMany({
      where: {combatId},
      orderBy: {timestamp: "asc"},
    });

    return rows.map(CombatSnapshotMapper.toEngineSnapshot);
  }
}
