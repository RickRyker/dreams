// server/src/combat/CombatEngineManager.ts


import { PrismaClient } from "@prisma/client";
import { CombatEngine } from "./engines/CombatEngine";
import { CombatStateStore } from "./CombatStateStore";

export class CombatEngineManager {
  private engines = new Map<string, CombatEngine>();
  private currentEngine: CombatEngine | null = null;

  constructor(
    private readonly combatId?: string,
    private readonly prisma?: PrismaClient,
  ) {}

  createCombat(combatId: string, initialState: CombatStateStore): CombatEngine {
    const engine = new CombatEngine(initialState);
    this.engines.set(combatId, engine);
    return engine;
  }

  get(combatId: string): CombatEngine | null {
    return this.engines.get(combatId) ?? null;
  }

  destroy(combatId: string): void {
    this.engines.delete(combatId);
  }

  tickAll(now: number): void {
    for (const engine of this.engines.values()) {
      engine.tick(now);
    }
  }

  async hydrate(): Promise<void> {
    if (!this.combatId) return;
    if (!this.currentEngine) {
      this.currentEngine = new CombatEngine(new CombatStateStore());
      this.engines.set(this.combatId, this.currentEngine);
    }
  }

  async tick(now: number): Promise<void> {
    await this.hydrate();
    this.currentEngine?.tick(now);
  }

  async endCombat(): Promise<void> {
    if (!this.combatId) return;
    this.engines.delete(this.combatId);
    this.currentEngine = null;
  }
}
