// server/src/combat/engines/EffectEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { CombatStateStore } from "../CombatStateStore";

export class EffectEngine {
  constructor(
    private readonly bus: CombatEventBus,
    private readonly state: CombatStateStore,
  ) {}

  applyDamage(targetId: string, amount: number): void {
    const p = this.state.getParticipant(targetId);
    if (!p || p.dead) return;

    let remaining = amount;

    if (p.shield > 0) {
      const absorbed = Math.min(p.shield, remaining);
      p.shield -= absorbed;
      remaining -= absorbed;
    }

    if (remaining > 0) {
      p.hp = Math.max(0, p.hp - remaining);
    }

    if (p.hp <= 0 && !p.dead) {
      p.dead = true;
      this.bus.emit({
        type: "DEATH",
        timestamp: Date.now(),
        sourceId: targetId,
      } as any);
    }
  }

  applyHeal(targetId: string, amount: number): void {
    const p = this.state.getParticipant(targetId);
    if (!p || p.dead) return;
    p.hp = Math.min(p.maxHp, p.hp + amount);
  }

  applyShield(targetId: string, amount: number): void {
    const p = this.state.getParticipant(targetId);
    if (!p || p.dead) return;
    p.shield += amount;
  }

  interrupt(targetId: string): void {
    const p = this.state.getParticipant(targetId);
    if (!p || p.dead) return;
    p.interrupted = true;
  }

  applyBuff(targetId: string, buffId: string, durationMs: number): void {
    // TODO: implement buff system
  }

  applyDebuff(targetId: string, debuffId: string, durationMs: number): void {
    // TODO: implement debuff system
  }

  applyDot(targetId: string, amount: number, durationMs: number, tickMs: number): void {
    // TODO: implement DOT system
  }

  applyHot(targetId: string, amount: number, durationMs: number, tickMs: number): void {
    // TODO: implement HOT system
  }

  generateThreat(targetId: string, amount: number): void {
    // TODO: implement threat system
  }
}
