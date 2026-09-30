// server/src/combat/assemblers/CombatAssembler.ts

import type { CombatCast, CombatLogEntry, CombatParticipant } from "@prisma/client";
import type { CombatCastDto, CombatLogEntryDto, CombatParticipantDto } from "shared";

export class CombatAssembler {
  static toLogEntryDto(model: CombatLogEntry): CombatLogEntryDto {
    return {
      id: model.id,
      combatId: model.combatId,
      seq: model.seq,
      createdAt: model.createdAt,
      type: model.type,
      actorId: model.actorId,
      actorType: model.actorType ?? null,
      targetId: model.targetId,
      message: model.message,
      data: model.data ?? null,
    };
  }

  static toParticipantDto(model: CombatParticipant): CombatParticipantDto {
    const participantType = model.participantType === "NPC" ? "PLAYER" : model.participantType;
    return {
      id: model.id,
      combatId: model.combatId,
      participantType,
      playerId: model.playerId,
      petId: model.petId,
      monsterId: model.monsterId,
      name: model.name,
      corpseName: model.corpseName,
      tier: model.tier,
      hp: model.hp,
      maxHp: model.maxHp,
      mp: model.mp,
      maxMp: model.maxMp,
      strength: model.strength,
      dexterity: model.dexterity,
      intelligence: model.intelligence,
      charisma: model.charisma,
      elementAffinity: model.elementAffinity,
      critChance: model.critChance,
      critDamage: model.critDamage,
      critResistance: model.critResistance,
      damageReduction: model.damageReduction,
      spellResistance: model.spellResistance,
      elementResistances: (model.elementResistances ?? {}) as Record<string, unknown>,
      abilityCooldowns: (model.abilityCooldowns ?? {}) as Record<string, unknown>,
      shield: model.shield,
      initiative: model.initiative,
      hasActed: model.hasActed,
      isAlive: model.isAlive,
      isInvisible: model.isInvisible,
      isLooted: model.isLooted,
      x: model.x,
      y: model.y,
      facingDeg: model.facingDeg,
      gold: model.gold,
      gcdSeconds: model.gcdSeconds,
      globalCooldownUntil: model.globalCooldownUntil?.getTime() ?? null,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }

  static toCastDto(model: CombatCast): CombatCastDto {
    return {
      id: model.id,
      combatId: model.combatId,
      casterId: model.casterId,
      spellSlug: model.spellSlug,
      startedAt: model.startedAt.getTime(),
      endsAt: model.endsAt.getTime(),
      status: model.status,
      telegraphShape: model.telegraphShape ?? null,
      telegraphRadius: model.telegraphRadius ?? null,
      telegraphAngle: model.telegraphAngle ?? null,
      telegraphLength: model.telegraphLength ?? null,
      telegraphWidth: model.telegraphWidth ?? null,
      createdAt: model.createdAt.getTime(),
      updatedAt: model.updatedAt.getTime(),
    };
  }
}
