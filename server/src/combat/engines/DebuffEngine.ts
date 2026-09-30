// server/src/combat/engines/DebuffEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { CombatStateStore } from "../CombatStateStore";

export interface ActiveDebuff {
  id: string;
  debuffId: string;
  targetId: string;
  expiresAt: number;
}

export class DebuffEngine {
  private active = new Map<string, ActiveDebuff>();

  constructor(
    private readonly bus: CombatEventBus,
    private readonly state: CombatStateStore,
  ) {}

  applyDebuff(targetId: string, debuffId: string, durationMs: number): void {
    const key = `${targetId}:${debuffId}:${Date.now()}`;
    this.active.set(key, {
      id: key,
      debuffId,
      targetId,
      expiresAt: Date.now() + durationMs,
    });

    this.bus.emit({
      type: "DEBUFF_APPLIED",
      timestamp: Date.now(),
      targetId,
      debuffId,
    } as any);
  }

  tick(now: number): void {
    for (const [key, debuff] of this.active.entries()) {
      if (now >= debuff.expiresAt) {
        this.active.delete(key);
        this.bus.emit({
          type: "DEBUFF_EXPIRED",
          timestamp: now,
          targetId: debuff.targetId,
          debuffId: debuff.debuffId,
        } as any);
      }
    }
  }
}
