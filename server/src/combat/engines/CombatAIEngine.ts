// server/src/combat/engines/CombatAIEngine.ts


import {
  EngineAiBehaviorNode,
  EngineAiDecision,
  EngineAiEvaluationContext,
  EngineCombatEvent,
  EngineCombatResolution,
  EngineEntityId,
} from "../types/EngineCombatTypes";
import { CombatTimeline } from "../CombatTimeline";
import { CombatEventBus } from "../CombatEventBus";
import { ThreatEngine } from "./ThreatEngine";

export class CombatAIEngine {
  private readonly rootNodes = new Map<EngineEntityId, EngineAiBehaviorNode>();

  constructor(
    private readonly bus: CombatEventBus,
    private readonly timeline: CombatTimeline,
    private readonly threatEngine: ThreatEngine,
    private readonly getPosition: (id: EngineEntityId) => { x: number; y: number } | null,
  ) {}

  registerBehavior(entityId: EngineEntityId, root: EngineAiBehaviorNode): void {
    this.rootNodes.set(entityId, root);
  }

  onEventResolved(_resolution: EngineCombatResolution): void {
    // hook for learning / future extensions
  }

  react(event: EngineCombatEvent, _resolution: EngineCombatResolution): void {
    // Only events with a sourceId can drive AI
    if (!("sourceId" in event) || !event.sourceId) return;

    const actorId: EngineEntityId = event.sourceId;
    const root = this.rootNodes.get(actorId);
    if (!root) return;

    const ctx: EngineAiEvaluationContext = {
      event,
      resolution: _resolution,
      threatTable: this.threatEngine.getThreatTableFor(actorId),
      timeline: this.timeline,
      entityId: actorId,
      getPosition: (id) => this.getPosition(id),
    };

    const decision = root.evaluate(ctx);
    if (!decision) return;

    this.scheduleDecision(actorId, decision, event.timestamp);
  }

  private scheduleDecision(
    actorId: EngineEntityId,
    decision: EngineAiDecision,
    now: number,
  ): void {
    const when: number = now + decision.delayMs;

    const aiEvent: EngineCombatEvent = {
      type: "AI_ACTION",
      timestamp: when,
      sourceId: actorId,
      targetId: decision.targetId ?? null,
      abilityId: decision.abilityId ?? null,
    };

    this.timeline.add(aiEvent);

    this.bus.emit({
      type: "AI_DECISION",
      timestamp: now,
      sourceId: actorId,
      targetId: decision.targetId ?? null,
      abilityId: decision.abilityId ?? null,
    });
  }
}
