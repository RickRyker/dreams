// server/src/combat/engines/DotHotEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { CombatStateStore } from "../CombatStateStore";

export interface ActiveDotHot {
  id: string;
  targetId: string;
  amount: number;
  tickMs: number;
  nextTick: number;
  expiresAt: number;
  type: "DOT" | "HOT";
}

export class DotHotEngine {
  private active = new Map<string, ActiveDotHot>();

  constructor(
    private readonly bus: CombatEventBus,
    private readonly state: CombatStateStore,
  ) {}

  applyDot(targetId: string, amount: number, durationMs: number, tickMs: number): void {
    const now = Date.now();
    const key = `${targetId}:DOT:${now}`;

    this.active.set(key, {
      id: key,
      targetId,
      amount,
      tickMs,
      nextTick: now + tickMs,
      expiresAt: now + durationMs,
      type: "DOT",
    });
  }

  applyHot(targetId: string, amount: number, durationMs: number, tickMs: number): void {
    const now = Date.now();
    const key = `${targetId}:HOT:${now}`;

    this.active.set(key, {
      id: key,
      targetId,
      amount,
      tickMs,
      nextTick: now + tickMs,
      expiresAt: now + durationMs,
      type: "HOT",
    });
  }

  tick(now: number): void {
    for (const [key, effect] of this.active.entries()) {
      if (now >= effect.expiresAt) {
        this.active.delete(key);
        continue;
      }

      if (now >= effect.nextTick) {
        effect.nextTick += effect.tickMs;

        if (effect.type === "DOT") {
          this.bus.emit({
            type: "DAMAGE",
            timestamp: now,
            sourceId: effect.targetId,
            targetId: effect.targetId,
            abilityId: "DOT",
            amount: effect.amount,
          });
        } else {
          this.bus.emit({
            type: "HEAL",
            timestamp: now,
            sourceId: effect.targetId,
            targetId: effect.targetId,
            abilityId: "HOT",
            amount: effect.amount,
          });
        }
      }
    }
  }
}
