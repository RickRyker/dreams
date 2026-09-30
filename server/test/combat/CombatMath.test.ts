// server/test/combat/CombatMath.test.ts

import { describe, expect, it } from "@jest/globals";
import { CombatMath, DamageKind } from "../../src/combat/CombatMath";
import { AttackType } from "@prisma/client";

describe("CombatMath", () => {
  describe("rollInitiative", () => {
    it("returns a number between 1 and base + dex + lvl + 5", () => {
      const src = { dexterity: 10, level: 1 };
      const result = CombatMath.rollInitiative(src);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(11 + 5);
    });

    it("defaults dex to 10 if not provided", () => {
      const src = { level: 1 };
      const result = CombatMath.rollInitiative(src);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(11 + 5);
    });

    it("defaults level to 1 if not provided", () => {
      const src = { dexterity: 10 };
      const result = CombatMath.rollInitiative(src);
      expect(result).toBeGreaterThanOrEqual(1);
    });

    it("returns at least 1 even with negative modifiers", () => {
      const src = { dexterity: 0, level: 0 };
      const result = CombatMath.rollInitiative(src);
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });

  describe("damageKindForAttack", () => {
    it("returns PHYSICAL for MELEE attacks", () => {
      const result = CombatMath.damageKindForAttack("MELEE" as AttackType);
      expect(result).toBe("PHYSICAL");
    });

    it("returns PHYSICAL for RANGED attacks", () => {
      const result = CombatMath.damageKindForAttack("RANGED" as AttackType);
      expect(result).toBe("PHYSICAL");
    });

    it("returns SPELL for MAGIC attacks", () => {
      const result = CombatMath.damageKindForAttack("MAGIC" as AttackType);
      expect(result).toBe("SPELL");
    });

    it("returns SPELL for SPELL attacks", () => {
      const result = CombatMath.damageKindForAttack("SPELL" as AttackType);
      expect(result).toBe("SPELL");
    });
  });

  describe("applyResistances", () => {
    it("applies damage resistance to physical damage", () => {
      const raw = 100;
      const target = { damageResistance: 20 };
      const result = CombatMath.applyResistances(raw, "PHYSICAL", target);
      expect(result).toBe(80);
    });

    it("applies spell resistance to spell damage", () => {
      const raw = 100;
      const target = { spellResistance: 30 };
      const result = CombatMath.applyResistances(raw, "SPELL", target);
      expect(result).toBe(70);
    });

    it("returns at least 0 when resistance exceeds damage", () => {
      const raw = 50;
      const target = { damageResistance: 100 };
      const result = CombatMath.applyResistances(raw, "PHYSICAL", target);
      expect(result).toBe(0);
    });

    it("defaults resistances to 0 if not provided", () => {
      const raw = 100;
      const target = {};
      const result = CombatMath.applyResistances(raw, "PHYSICAL", target);
      expect(result).toBe(100);
    });
  });

  describe("calculateDamage", () => {
    it("applies both attacker stats and target resistances for physical damage", () => {
      const attacker = { strength: 20 };
      const target = { damageResistance: 10 };
      const base = 50;
      const result = CombatMath.calculateDamage(attacker, target, base, "PHYSICAL");
      // base (50) + strength * 0.6 (20 * 0.6 = 12) = 62, minus resistance 10 = 52
      expect(result).toBe(52);
    });

    it("applies intelligence for spell damage", () => {
      const attacker = { intelligence: 20 };
      const target = { spellResistance: 10 };
      const base = 50;
      const result = CombatMath.calculateDamage(attacker, target, base, "SPELL");
      // base (50) + intelligence * 0.6 (20 * 0.6 = 12) = 62, minus spell resistance 10 = 52
      expect(result).toBe(52);
    });

    it("returns at least 0 even with high resistances", () => {
      const attacker = { strength: 10 };
      const target = { damageResistance: 100 };
      const base = 30;
      const result = CombatMath.calculateDamage(attacker, target, base, "PHYSICAL");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("defaults strength to 10 for physical attacks if not provided", () => {
      const attacker = {};
      const target = { damageResistance: 0 };
      const base = 50;
      const result = CombatMath.calculateDamage(attacker, target, base, "PHYSICAL");
      // base 50 + 10 * 0.6 = 56
      expect(result).toBe(56);
    });

    it("defaults intelligence to 10 for spell attacks if not provided", () => {
      const attacker = {};
      const target = { spellResistance: 0 };
      const base = 50;
      const result = CombatMath.calculateDamage(attacker, target, base, "SPELL");
      // base 50 + 10 * 0.6 = 56
      expect(result).toBe(56);
    });
  });
});

