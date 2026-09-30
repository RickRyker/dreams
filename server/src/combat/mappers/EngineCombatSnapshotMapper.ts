// server/src/combat/mappers/EngineCombatSnapshotMapper.ts


import {EngineCombatSnapshot, EngineEntitySnapshot,} from "../types/EngineCombatTypes";

import {CombatResolutionDto, CombatSnapshotDto, EntitySnapshotDto,} from "shared";

import {EngineCombatEventMapper} from "./EngineCombatEventMapper";

export class EngineCombatSnapshotMapper {
  /**
   * Convert an internal engine snapshot â†’ DTO for UI / replay.
   */
  static toDto(snapshot: EngineCombatSnapshot): CombatSnapshotDto {
    return {
      combatId: snapshot.combatId,
      timestamp: snapshot.timestamp,
      eventType: snapshot.eventType,
      event: EngineCombatEventMapper.toDto(snapshot.combatId, snapshot.event),
      resolution: EngineCombatSnapshotMapper.mapResolution(snapshot.resolution),
      participants: snapshot.entities.map(EngineCombatSnapshotMapper.mapEntity),
      effects: [],
    };
  }

  /**
   * Convert engine entity snapshot â†’ DTO.
   */
  private static mapEntity(entity: EngineEntitySnapshot): EntitySnapshotDto {
    return {
      entityId: entity.entityId ?? "",
      hp: entity.hp,
      maxHp: entity.maxHp,
      shield: entity.shield,
      buffs: entity.buffs.map((b) => b ?? ""),
      debuffs: entity.debuffs.map((d) => d ?? ""),
      interrupted: entity.interrupted,
    };
  }

  /**
   * Convert engine resolution â†’ DTO.
   */
  private static mapResolution(res: any): CombatResolutionDto | undefined {
    if (!res) return undefined;

    return {
      damage: res.damage
        ? {
          sourceId: res.damage.sourceId ?? "",
          targetId: res.damage.targetId ?? "",
          amount: res.damage.amount,
        }
        : undefined,
      heal: res.heal
        ? {
          sourceId: res.heal.sourceId ?? "",
          targetId: res.heal.targetId ?? "",
          amount: res.heal.amount,
        }
        : undefined,
      shield: res.shield
        ? {
          sourceId: res.shield.sourceId ?? "",
          targetId: res.shield.targetId ?? "",
          amount: res.shield.amount,
        }
        : undefined,
      interrupt: res.interrupt
        ? {
          targetId: res.interrupt.targetId ?? "",
        }
        : undefined,
    };
  }
}
