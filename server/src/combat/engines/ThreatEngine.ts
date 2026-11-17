// server/src/combat/engines/ThreatEngine.ts


import {EngineEntityId} from "../types/EngineCombatTypes";
import {CombatEventBus} from "../CombatEventBus";

export class ThreatEngine {
  private readonly tables: Map<EngineEntityId, Map<EngineEntityId, number>> = new Map<EngineEntityId, Map<EngineEntityId, number>>();
  private readonly modifiers: Map<EngineEntityId, number> = new Map();

  constructor(private readonly eventBus?: CombatEventBus) {}

  // ----------------------------------------
  // Threat modification
  // ----------------------------------------
  apply(event: {sourceId: EngineEntityId; targetId: EngineEntityId; amount: number; type?: string}): void {
    if (!event.sourceId || !event.targetId) return;

    const table: Map<EngineEntityId, number> = this.getThreatTableFor(event.targetId);
    const current: number = table.get(event.sourceId) ?? 0;
    const modifier = this.modifiers.get(event.sourceId) ?? 1;
    const newValue = current + event.amount * modifier;
    table.set(event.sourceId, newValue);
    this.eventBus?.publish("THREAT_UPDATED", {
      targetId: event.targetId,
      sourceId: event.sourceId,
      newValue,
    });
  }

  // ----------------------------------------
  // Query
  // ----------------------------------------
  getThreatTableFor(targetId: EngineEntityId): Map<EngineEntityId, number> {
    if (!this.tables.has(targetId)) {
      this.tables.set(targetId, new Map());
    }
    return this.tables.get(targetId)!;
  }

  getThreatTable(targetId: EngineEntityId): Map<EngineEntityId, number> {
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
    this.eventBus?.publish("THREAT_RESET", { targetId: entityId });
  }

  transferThreat(sourceId: EngineEntityId, targetId: EngineEntityId, threatTargetId: EngineEntityId, ratio: number): void {
    const sourceTable = this.getThreatTableFor(threatTargetId);
    const current = sourceTable.get(sourceId) ?? 0;
    const transfer = current * ratio;
    sourceTable.set(sourceId, current - transfer);
    const targetCurrent = sourceTable.get(targetId) ?? 0;
    sourceTable.set(targetId, targetCurrent + transfer);
    this.eventBus?.publish("THREAT_TRANSFERRED", {
      targetId: threatTargetId,
      from: sourceId,
      to: targetId,
      amount: transfer,
    });
  }

  decayThreat(targetId: EngineEntityId, ratio: number): void {
    const table = this.tables.get(targetId);
    if (!table) return;

    for (const [entityId, value] of table.entries()) {
      table.set(entityId, value * (1 - ratio));
    }
    this.eventBus?.publish("THREAT_DECAYED", { targetId, percent: ratio });
  }

  getPrimaryAggro(targetId: EngineEntityId): EngineEntityId | null {
    return this.getHighestThreatTarget(targetId);
  }
}
