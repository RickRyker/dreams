// server/src/combat/mappers/EngineCombatEventMapper.ts

import {EngineCombatEvent, EngineCombatId,} from "../types/EngineCombatTypes";
import {CombatEventDto,} from "shared";

export class EngineCombatEventMapper {
  /**
   * Convert an internal engine event → DTO for UI / replay / persistence.
   */
  static toDto(
    combatId: EngineCombatId,
    event: EngineCombatEvent
  ): CombatEventDto {
    return {
      id: crypto.randomUUID(),
      combatId,
      timestamp: event.timestamp,
      type: EngineCombatEventMapper.mapType(event.type),
      participantId: event.sourceId ?? null,
      label: event.abilityId ?? undefined,
      value: event.amount ?? null,
      telegraph: event.effectType === "TELEGRAPH" ? {
        effectId: event.effectId,
        duration: event.duration,
        stacks: event.stacks,
        tickInterval: event.tickInterval,
      } : undefined,
      data: {
        sourceId: event.sourceId,
        targetId: event.targetId,
        effectId: event.effectId,
        effectType: event.effectType,
        amount: event.amount,
        duration: event.duration,
        stacks: event.stacks,
        tickInterval: event.tickInterval,
        abilityId: event.abilityId,
      },
    };
  }

  /**
   * Convert DTO → engine event (rarely needed, but included for completeness).
   */
  static fromDto(dto: CombatEventDto): EngineCombatEvent {
    const type = EngineCombatEventMapper.mapFromDtoType(dto.type);
    return {
      type,
      timestamp: dto.timestamp,
      sourceId: dto.participantId ?? null,
      targetId: dto.data?.targetId ?? null,
      amount: dto.value ?? undefined,
      effectId: dto.data?.effectId ?? null,
      effectType: dto.data?.effectType ?? undefined,
      duration: dto.data?.duration ?? undefined,
      stacks: dto.data?.stacks ?? undefined,
      tickInterval: dto.data?.tickInterval ?? undefined,
      abilityId: dto.label ?? undefined,
    } as EngineCombatEvent;
  }

  /**
   * Map engine event types → DTO event types.
   */
  private static mapType(type: string): CombatEventDto["type"] {
    switch (type) {
      case "DAMAGE_RESULT":
      case "DAMAGE":
        return "damage";
      case "HEAL_RESULT":
      case "HEAL":
        return "heal";
      case "SHIELD_RESULT":
      case "SHIELD":
        return "cast";
      case "INTERRUPT_RESULT":
      case "INTERRUPT":
        return "interrupt";
      case "THREAT_CHANGE":
        return "THREAT_CHANGE";
      case "ROUND_START":
        return "roundStart";
      case "TURN_START":
        return "turnStart";
      case "DEATH":
        return "death";
      case "TELEGRAPH":
        return "telegraph";
      default:
        return "cast";
    }
  }

  private static mapFromDtoType(type: CombatEventDto["type"]): EngineCombatEvent["type"] {
    switch (type) {
      case "damage":
        return "DAMAGE";
      case "heal":
        return "HEAL";
      case "roundStart":
        return "ROUND_START";
      case "turnStart":
        return "TURN_START";
      case "death":
        return "DEATH";
      case "interrupt":
        return "INTERRUPT";
      case "telegraph":
        return "TELEGRAPH_START";
      case "THREAT_CHANGE":
        return "THREAT_CHANGE";
      case "cast":
      default:
        return "CAST_COMPLETE";
    }
  }
}
