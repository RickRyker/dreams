// server/test/combat/mappers/CombatMappers.test.ts

import { describe, expect, it } from "@jest/globals";
import { CombatParticipantDtoMapper } from "../../../src/combat/mappers/CombatParticipantDtoMapper";

describe("CombatParticipantDtoMapper", () => {
  it("maps prisma participant to dto", () => {
    const model = {
      id: "p1",
      combatId: "c1",
      playerId: "player-1",
      participantType: "PLAYER",
      name: "Hero",
      corpseName: null,
      tier: 1,
      hp: 100,
      maxHp: 120,
      mp: 60,
      maxMp: 80,
      strength: 10,
      dexterity: 11,
      intelligence: 12,
      charisma: 13,
      elementAffinity: "FIRE",
      critChance: 0.1,
      critDamage: 1.5,
      critResistance: 0.05,
      damageReduction: 0.1,
      spellResistance: 0.2,
      elementResistances: { FIRE: 0.2 },
      abilityCooldowns: { fireball: 3 },
      initiative: 5,
      x: 1,
      y: 2,
      facingDeg: 90,
      hasActed: false,
      isAlive: true,
      isInvisible: false,
      gcdSeconds: 1500,
      globalCooldownUntil: new Date(1000),
      gold: 50,
    } as any;

    const dto = CombatParticipantDtoMapper.toDto(model);

    expect(dto.id).toBe("p1");
    expect(dto.combatId).toBe("c1");
    expect(dto.name).toBe("Hero");
    expect(dto.globalCooldownUntil).toBe(1000);
    expect(dto.elementResistances).toEqual({ FIRE: 0.2 });
    expect(dto.abilityCooldowns).toEqual({ fireball: 3 });
  });

  it("maps dto to prisma create input", () => {
    const dto = {
      id: "p1",
      combatId: "c1",
      type: "PLAYER",
      name: "Hero",
      corpseName: null,
      tier: 1,
      hp: 100,
      maxHp: 120,
      mp: 60,
      maxMp: 80,
      strength: 10,
      dexterity: 11,
      intelligence: 12,
      charisma: 13,
      elementAffinity: "FIRE",
      critChance: 0.1,
      critDamage: 1.5,
      critResistance: 0.05,
      damageReduction: 0.1,
      spellResistance: 0.2,
      elementResistances: { FIRE: 0.2 },
      abilityCooldowns: { fireball: 3 },
      initiative: 5,
      x: 1,
      y: 2,
      facingDeg: 90,
      hasActed: false,
      isAlive: true,
      isInvisible: false,
      gcdSeconds: 1500,
      globalCooldownUntil: 1000,
      gold: 50,
      loot: [],
    } as any;

    const createInput = CombatParticipantDtoMapper.toCreateInput(dto);

    expect(createInput.id).toBe("p1");
    expect(createInput.combatId).toBe("c1");
    expect(createInput.participantType).toBe("PLAYER");
    expect(createInput.globalCooldownUntil).toEqual(new Date(1000));
  });
});
