// shared/mappers/AbilityEventDtoMapper.ts

import type {
  AbilityEventDto,
  AbilityEventType,
  AbilityEventBaseDto,
  AbilityHitEventDto,
  AbilityMissEventDto,
  AbilityHealEventDto,
  AbilityDotTickEventDto,
  AbilityHotTickEventDto,
  AbilityStunEventDto,
  AbilityTauntEventDto,
  AbilityThreatUpdateEventDto,
} from "../dto/AbilityEventDto";

export class AbilityEventDtoMapper {
  /**
   * Convert a raw event (from DB, replay pipeline, or server engine)
   * into a strongly typed AbilityEventDto.
   */
  static toDto(raw: any): AbilityEventDto {
    const base: AbilityEventBaseDto = {
      seq: raw.seq,
      combatId: raw.combatId,
      timestamp: typeof raw.timestamp === "number"
        ? raw.timestamp
        : new Date(raw.timestamp).getTime(),
      actorId: raw.actorId ?? null,
      targetId: raw.targetId ?? null,
      abilitySlug: raw.abilitySlug ?? null,
    };

    switch (raw.type as AbilityEventType) {
      case "HIT":
        return {
          ...base,
          type: "HIT",
          amount: raw.amount,
          isCrit: raw.isCrit ?? false,
          mitigation: raw.mitigation ?? 0,
          elementalMultiplier: raw.elementalMultiplier ?? 1,
          variance: raw.variance ?? 0,
        } satisfies AbilityHitEventDto;

      case "MISS":
        return {
          ...base,
          type: "MISS",
        } satisfies AbilityMissEventDto;

      case "HEAL":
        return {
          ...base,
          type: "HEAL",
          amount: raw.amount,
          isCrit: raw.isCrit ?? false,
          variance: raw.variance ?? 0,
        } satisfies AbilityHealEventDto;

      case "DOT_TICK":
        return {
          ...base,
          type: "DOT_TICK",
          amount: raw.amount,
          elementalMultiplier: raw.elementalMultiplier ?? 1,
          variance: raw.variance ?? 0,
        } satisfies AbilityDotTickEventDto;

      case "HOT_TICK":
        return {
          ...base,
          type: "HOT_TICK",
          amount: raw.amount,
          variance: raw.variance ?? 0,
        } satisfies AbilityHotTickEventDto;

      case "STUN":
        return {
          ...base,
          type: "STUN",
        } satisfies AbilityStunEventDto;

      case "TAUNT":
        return {
          ...base,
          type: "TAUNT",
          threatDelta: raw.threatDelta ?? 0,
        } satisfies AbilityTauntEventDto;

      case "THREAT_UPDATE":
        return {
          ...base,
          type: "THREAT_UPDATE",
          threatDelta: raw.threatDelta,
        } satisfies AbilityThreatUpdateEventDto;

      default:
        throw new Error(`Unknown AbilityEventType: ${raw.type}`);
    }
  }

  /**
   * Convert an array of raw events into DTOs.
   */
  static toDtoArray(rawEvents: any[]): AbilityEventDto[] {
    return rawEvents.map((e) => this.toDto(e));
  }
}
