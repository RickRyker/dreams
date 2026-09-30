// server/src/combat/engines/ThreatEngine.ts


import {EngineEntityId} from "../types/EngineCombatTypes";

export class ThreatEngine {
  private readonly tables: Map<EngineEntityId, Map<EngineEntityId, number>> = new Map<EngineEntityId, Map<EngineEntityId, number>>();
  private readonly modifiers: Map<EngineEntityId, number> = new Map();

  constructor(_eventBus?: unknown) {}

  // ----------------------------------------
  // Threat modification
  // ----------------------------------------
  apply(event: {sourceId: EngineEntityId; targetId: EngineEntityId; amount: number; type?: string}): void {
    if (!event.sourceId || !event.targetId) return;

    const table: Map<EngineEntityId, number> = this.getThreatTableFor(event.targetId);
    const current: number = table.get(event.sourceId) ?? 0;
    const modifier = this.modifiers.get(event.sourceId) ?? 1;
    table.set(event.sourceId, current + event.amount * modifier);
  }

  // ----------------------------------------
  // Query
  // ----------------------------------------
  getThreatTableFor(targetId: EngineEntityId): any {
    if (!this.tables.has(targetId)) {
      this.tables.set(targetId, new Map());
    }
    return this.tables.get(targetId)!;
  }

  getThreatTable(targetId: EngineEntityId): any {
    return this.getThreatTableFor(targetId);
  }

  getHighestThreatTarget(attackerId: EngineEntityId): EngineEntityId | null {
    const table: Map<EngineEntityId, number> | undefined = this.tables.get(attackerId);
    if (!table) return null;

    let best: EngineEntityId | null = null;
    let bestValue: number = -Infinity;

    for (const [entityId, threat] of table.entries()) {
      if (threat > bestValue) {
        bestValue = threat;
        best = entityId;
      }
    }

    return best;
  }

  // ----------------------------------------
  // Cleanup
  // ----------------------------------------
  clearThreatFor(entityId: EngineEntityId): void {
    this.tables.delete(entityId);
  }

  clearAll(): void {
    this.tables.clear();
  }

  setThreatModifier(entityId: EngineEntityId, modifier: number): void {
    this.modifiers.set(entityId, modifier);
  }

  resetThreat(entityId: EngineEntityId): void {
    this.clearThreatFor(entityId);
  }

  transferThreat(sourceId: EngineEntityId, targetId: EngineEntityId, threatTargetId: EngineEntityId, ratio: number): void {
    const sourceTable = this.getThreatTableFor(threatTargetId);
    const current = sourceTable.get(sourceId) ?? 0;
    const transfer = current * ratio;
    sourceTable.set(sourceId, current - transfer);
    const targetCurrent = sourceTable.get(targetId) ?? 0;
    sourceTable.set(targetId, targetCurrent + transfer);
  }

  decayThreat(targetId: EngineEntityId, ratio: number): void {
    const table = this.getThreatTableFor(targetId);
    for (const [entityId, value] of table.entries()) {
      table.set(entityId, value * (1 - ratio));
    }
  }

  getPrimaryAggro(targetId: EngineEntityId): EngineEntityId | null {
    return this.getHighestThreatTarget(targetId);
  }
}
