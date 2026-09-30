// server/src/combat/logging/CombatLogTemplate.ts


import { CombatLogEntryDto } from "shared";

export class CombatLogTemplates {
  static damage(
    combatId: string,
    seq: number,
    sourceId: string,
    sourceType: string | null,
    targetId: string,
    _targetType: string | null,
    amount: number,
  ): CombatLogEntryDto {
    return {
      id: crypto.randomUUID(),
      combatId,
      seq,
      createdAt: new Date(),
      type: "DAMAGE",
      actorId: sourceId,
      actorType: sourceType,
      targetId: targetId,
      message: `${sourceId} hits ${targetId} for ${amount} damage.`,
      data: { amount },
    };
  }

  static heal(
    combatId: string,
    seq: number,
    sourceId: string,
    sourceType: string | null,
    targetId: string,
    _targetType: string | null,
    amount: number,
  ): CombatLogEntryDto {
    return {
      id: crypto.randomUUID(),
      combatId,
      seq,
      createdAt: new Date(),
      type: "HEAL",
      actorId: sourceId,
      actorType: sourceType,
      targetId: targetId,
      message: `${sourceId} heals ${targetId} for ${amount}.`,
      data: { amount },
    };
  }
}
