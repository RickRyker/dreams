// server/src/combat/CastEngineAdapter.ts


import { CastEngine } from "./engines/CastEngine";
import { EngineCombatEvent, EngineEntityId } from "./types/EngineCombatTypes";
import { CombatTimeline } from "./CombatTimeline";
import { CombatEventBus } from "./CombatEventBus";
import { CombatEngine } from "./engines/CombatEngine";

export class CastEngineAdapter {
  private readonly castEngine: CastEngine;

  constructor(
    timeline: CombatTimeline,
    bus: CombatEventBus,
    engine: CombatEngine,
  ) {
    this.castEngine = new CastEngine(
      bus,
      timeline,
      (id: EngineEntityId) => engine.getParticipantPosition(id),
      (slug: string) => engine.getAbilityDefinition(slug),
      engine
    );
  }

  handleEvent(event: EngineCombatEvent): void {
    if (event.type === "CAST_START") {
      this.castEngine.startCast({
        casterId: event.sourceId!,
        targetId: event.targetId ?? null,
        abilityId: event.abilityId!,
        now: event.timestamp,
      });
    }

    if (event.type === "CAST_COMPLETE") {
      this.castEngine.completeCast({
        casterId: event.sourceId!,
        targetId: event.targetId ?? null,
        abilityId: event.abilityId!,
        now: event.timestamp,
      });
    }
  }
}
