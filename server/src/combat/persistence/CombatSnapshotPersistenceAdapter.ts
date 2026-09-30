// server/src/combat/persistence/CombatSnapshotPersistenceAdapter.ts


import {PrismaClient} from "@prisma/client";
import {EngineCombatSnapshot} from "../types/EngineCombatTypes";
import {CombatSnapshotMapper} from "./CombatSnapshotMapper";

export class CombatSnapshotPersistenceAdapter {
  constructor(private readonly prisma: PrismaClient) {}

  async persistEngineSnapshot(snapshot: EngineCombatSnapshot): Promise<void> {
    const data: any = CombatSnapshotMapper.fromEngineSnapshot(snapshot);

    await this.prisma.combatSnapshot.create({
      data: data as any,
    });
  }

  async persistMany(snapshots: EngineCombatSnapshot[]): Promise<void> {
    if (!snapshots.length) return;

    await this.prisma.combatSnapshot.createMany({
      data: snapshots.map((s: EngineCombatSnapshot): any =>
        CombatSnapshotMapper.fromEngineSnapshot(s) as any,
      ),
    });
  }
}
