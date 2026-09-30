// server/src/combat/abilities/types/AbilityContext.ts


import { AbilityDefinition } from "./AbilityDefinition";

export interface AbilityContext {
  casterId: string;
  targetId: string | null;
  ability: AbilityDefinition;
  now: number;

  dealDamage(targetId: string, amount: number): void;
  heal(targetId: string, amount: number): void;
  applyShield(targetId: string, amount: number): void;
  interrupt(targetId: string): void;

  applyBuff(targetId: string, buffId: string, durationMs: number): void;
  applyDebuff(targetId: string, debuffId: string, durationMs: number): void;
  applyDot(targetId: string, amount: number, durationMs: number, tickMs: number): void;
  applyHot(targetId: string, amount: number, durationMs: number, tickMs: number): void;
  generateThreat(targetId: string, amount: number): void;
}
