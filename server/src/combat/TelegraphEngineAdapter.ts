// server/src/combat/TelegraphEngineAdapter.ts


import {TelegraphEngine} from "./engines/TelegraphEngine";
import {EngineCombatEvent, EngineEntityId} from "./types/EngineCombatTypes";
import {CombatTimeline} from "./CombatTimeline";
import {CombatEventBus} from "./CombatEventBus";

export class TelegraphEngineAdapter {
  private readonly telegraphEngine: TelegraphEngine;

  constructor(
    timeline: CombatTimeline,
    bus: CombatEventBus,
  ) {
    this.telegraphEngine = new TelegraphEngine(timeline, bus);
  }

  handleEvent(
    event: EngineCombatEvent,
    _getEntityPosition: (id: EngineEntityId) => {x: number; y: number} | null,
  ): void {
    this.telegraphEngine.handleEvent(event as any);
  }
}
