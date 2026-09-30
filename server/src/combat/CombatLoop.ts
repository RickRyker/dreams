// server/src/combat/CombatLoop.ts


import { CombatEngineManager } from "./CombatEngineManager";

export class CombatLoop {
  private running = false;
  private readonly tickMs: number;
  private readonly manager: CombatEngineManager;

  constructor(manager: CombatEngineManager, tickMs = 100) {
    this.manager = manager;
    this.tickMs = tickMs;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.loop();
  }

  stop(): void {
    this.running = false;
  }

  private loop(): void {
    if (!this.running) return;

    const now = Date.now();
    this.manager.tickAll(now);

    setTimeout(() => this.loop(), this.tickMs);
  }
}
