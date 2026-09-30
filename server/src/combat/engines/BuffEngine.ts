// server/src/combat/engines/BuffEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { CombatStateStore } from "../CombatStateStore";

export interface ActiveBuff {
  id: string;
  buffId: string;
  targetId: string;
  expiresAt: number;
}

export class BuffEngine {
  private active = new Map<string, ActiveBuff>();

  constructor(
    private readonly bus: CombatEventBus,
    private readonly state: CombatStateStore,
  ) {}

  applyBuff(targetId: string, buffId: string, durationMs: number): void {
    const key = `${targetId}:${buffId}:${Date.now()}`;
    this.active.set(key, {
      id: key,
      buffId,
      targetId,
      expiresAt: Date.now() + durationMs,
    });

    this.bus.emit({
      type: "BUFF_APPLIED",
      timestamp: Date.now(),
      targetId,
      buffId,
    } as any);
  }

  tick(now: number): void {
    for (const [key, buff] of this.active.entries()) {
      if (now >= buff.expiresAt) {
        this.active.delete(key);
        this.bus.emit({
          type: "BUFF_EXPIRED",
          timestamp: now,
          targetId: buff.targetId,
          buffId: buff.buffId,
        } as any);
      }
    }
  }
}
