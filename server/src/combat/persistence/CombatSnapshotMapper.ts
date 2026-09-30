// server/src/combat/persistence/CombatSnapshotMapper.ts


import {CombatSnapshot} from "@prisma/client";
import {EngineCombatSnapshot} from "../types/EngineCombatTypes";

export class CombatSnapshotMapper {
  static toEngineSnapshot(model: CombatSnapshot): EngineCombatSnapshot {
    return {
      id: model.id,
      combatId: model.combatId,
      timestamp: Number(model.timestamp),
      eventType: model.eventType,
      event: model.event as any,
      resolution: model.resolution as any,
      entities: model.entities as any,
      createdAt: model.createdAt.getTime(),
    };
  }

  static fromEngineSnapshot(
    snapshot: EngineCombatSnapshot,
  ): Omit<CombatSnapshot, "createdAt"> {
    return {
      id: snapshot.id,
      combatId: snapshot.combatId,
      timestamp: BigInt(snapshot.timestamp),
      eventType: snapshot.eventType,
      event: snapshot.event as any,
      resolution: snapshot.resolution as any,
      entities: snapshot.entities as any,
    } as any;
  }
}
