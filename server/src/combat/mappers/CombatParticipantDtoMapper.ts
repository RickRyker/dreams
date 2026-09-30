// server/src/combat/mappers/CombatParticipantDtoMapper.ts

import { CombatParticipantDto } from "shared";

type ParticipantModel = {
  id: string;
  combatId: string;
  participantType: string;
  playerId?: string | null;
  petId?: string | null;
  monsterId?: string | null;
  name?: string | null;
  corpseName?: string | null;
  tier?: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  charisma: number;
  elementAffinity: string;
  critChance: number;
  critDamage: number;
  critResistance: number;
  damageReduction: number;
  spellResistance: number;
  elementResistances?: Record<string, unknown>;
  abilityCooldowns?: Record<string, unknown>;
  shield?: number;
  initiative: number;
  hasActed: boolean;
  isAlive: boolean;
  isInvisible: boolean;
  isLooted?: boolean;
  x: number;
  y: number;
  facingDeg: number;
  gold: number;
  gcdSeconds: number;
  globalCooldownUntil?: Date | number | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class CombatParticipantDtoMapper {
  static toDto(model: ParticipantModel): CombatParticipantDto {
    return {
      id: model.id,
      combatId: model.combatId,
      participantType: model.participantType as CombatParticipantDto["participantType"],
      playerId: model.playerId ?? null,
      petId: model.petId ?? null,
      monsterId: model.monsterId ?? null,
      name: model.name ?? null,
      corpseName: model.corpseName ?? null,
      tier: model.tier ?? 0,
      hp: model.hp,
      maxHp: model.maxHp,
      mp: model.mp,
      maxMp: model.maxMp,
      strength: model.strength,
      dexterity: model.dexterity,
      intelligence: model.intelligence,
      charisma: model.charisma,
      elementAffinity: model.elementAffinity as CombatParticipantDto["elementAffinity"],
      critChance: model.critChance,
      critDamage: model.critDamage,
      critResistance: model.critResistance,
      damageReduction: model.damageReduction,
      spellResistance: model.spellResistance,
      elementResistances: model.elementResistances ?? {},
      abilityCooldowns: model.abilityCooldowns ?? {},
      shield: model.shield ?? 0,
      initiative: model.initiative,
      hasActed: model.hasActed,
      isAlive: model.isAlive,
      isInvisible: model.isInvisible,
      isLooted: model.isLooted ?? false,
      x: model.x,
      y: model.y,
      facingDeg: model.facingDeg,
      gold: model.gold,
      gcdSeconds: model.gcdSeconds,
      globalCooldownUntil:
        model.globalCooldownUntil instanceof Date
          ? model.globalCooldownUntil.getTime()
          : model.globalCooldownUntil ?? null,
      createdAt: model.createdAt?.getTime() ?? Date.now(),
      updatedAt: model.updatedAt?.getTime() ?? Date.now(),
    };
  }

  static toCreateInput(dto: CombatParticipantDto & { type?: string }) {
    return {
      id: dto.id,
      combatId: dto.combatId,
      participantType: (dto.type ?? dto.participantType) as string,
      playerId: dto.playerId ?? null,
      petId: dto.petId ?? null,
      monsterId: dto.monsterId ?? null,
      name: dto.name ?? null,
      corpseName: dto.corpseName ?? null,
      tier: dto.tier,
      hp: dto.hp,
      maxHp: dto.maxHp,
      mp: dto.mp,
      maxMp: dto.maxMp,
      strength: dto.strength,
      dexterity: dto.dexterity,
      intelligence: dto.intelligence,
      charisma: dto.charisma,
      elementAffinity: dto.elementAffinity,
      critChance: dto.critChance,
      critDamage: dto.critDamage,
      critResistance: dto.critResistance,
      damageReduction: dto.damageReduction,
      spellResistance: dto.spellResistance,
      elementResistances: dto.elementResistances ?? {},
      abilityCooldowns: dto.abilityCooldowns ?? {},
      shield: dto.shield ?? 0,
      initiative: dto.initiative,
      hasActed: dto.hasActed,
      isAlive: dto.isAlive,
      isInvisible: dto.isInvisible,
      isLooted: dto.isLooted ?? false,
      x: dto.x,
      y: dto.y,
      facingDeg: dto.facingDeg,
      gold: dto.gold,
      gcdSeconds: dto.gcdSeconds,
      globalCooldownUntil:
        dto.globalCooldownUntil == null
          ? null
          : new Date(dto.globalCooldownUntil),
    };
  }
}
