// server/src/combat/CombatMath.ts

import { AttackType } from "@prisma/client";

export type DamageKind = "PHYSICAL" | "SPELL";

export class CombatMath {
  static rollInitiative(source: { dexterity?: number; level?: number }): number {
    const dexterity = source.dexterity ?? 10;
    const level = source.level ?? 1;
    return Math.max(1, 1 + dexterity + level);
  }

  static damageKindForAttack(attackType: AttackType | string): DamageKind {
    if (attackType === "MAGIC" || attackType === "SPELL") return "SPELL";
    return "PHYSICAL";
  }

  static applyResistances(
    raw: number,
    damageKind: DamageKind,
    target: { damageResistance?: number; spellResistance?: number },
  ): number {
    const resistance = damageKind === "SPELL"
      ? target.spellResistance ?? 0
      : target.damageResistance ?? 0;
    return Math.max(0, raw - resistance);
  }

  static calculateDamage(
    attacker: { strength?: number; intelligence?: number },
    target: { damageResistance?: number; spellResistance?: number },
    base: number,
    damageKind: DamageKind,
  ): number {
    const modifier = damageKind === "SPELL"
      ? attacker.intelligence ?? 10
      : attacker.strength ?? 10;
    const raw = base + modifier * 0.6;
    return CombatMath.applyResistances(raw, damageKind, target);
  }
}
