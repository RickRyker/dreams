// server/src/combat/orchestrators/CombatSessionOrchestrator.ts


import {PrismaClient} from "@prisma/client";
import {prisma as prismaClient} from "@prisma";
import {CombatEngineManager} from "../CombatEngineManager";
import {CombatId} from "shared";

export class CombatSessionOrchestrator {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async startCombat(combatId: CombatId): Promise<CombatEngineManager> {
    const manager = new CombatEngineManager(combatId, this.prisma);
    await manager.hydrate();
    return manager;
  }

  async runTick(combatId: CombatId, now: number): Promise<void> {
    const manager = new CombatEngineManager(combatId, this.prisma);
    await manager.hydrate();
    await manager.tick(now);
  }

  async endCombat(combatId: CombatId): Promise<void> {
    const manager = new CombatEngineManager(combatId, this.prisma);
    await manager.hydrate();
    await manager.endCombat();
  }
}
