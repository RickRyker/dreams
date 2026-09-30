// server/src/combat/engines/CastEngine.ts


import { CombatEventBus } from "../CombatEventBus";
import { CombatTimeline } from "../CombatTimeline";
import { AbilityContext, AbilityDefinition, AbilityScript } from "../abilities";
import { EffectFacade } from "./EffectFacade";
import { CombatStateStore } from "../CombatStateStore";
import { EngineCombatEvent } from "../types/EngineCombatTypes";

export interface CastRequest {
  casterId: string;
  targetId: string | null;
  abilityId: string;
  now: number;
}

export interface CastDefinition {
  id: string;
  sourceId: string;
  abilityId: string;
  castTime: number;
  startAt: number;
  completeAt: number;
  channelTime?: number;
  tickInterval?: number;
  targetId?: string | null;
}

export class CastEngine {
  private readonly bus: CombatEventBus;
  private readonly timeline: CombatTimeline;
  private readonly getPosition: (id: string) => { x: number; y: number } | null;
  private readonly getAbility: (slug: string) => AbilityDefinition | null;
  private readonly effects: EffectFacade;
  private readonly activeCasts = new Map<string, CastDefinition>();

  constructor(
    bus: CombatEventBus,
    timeline: CombatTimeline,
    getPosition: (id: string) => { x: number; y: number } | null,
    getAbility: (slug: string) => AbilityDefinition | null,
    effects: EffectFacade,
  );
  constructor(
    timeline: CombatTimeline,
    bus: CombatEventBus,
    _stateStore: CombatStateStore,
  );
  constructor(...args: any[]) {
    if (args[0] instanceof CombatTimeline) {
      this.timeline = args[0];
      this.bus = args[1];
      this.getPosition = () => null;
      this.getAbility = () => null;
      this.effects = {} as EffectFacade;
      return;
    }

    this.bus = args[0];
    this.timeline = args[1];
    this.getPosition = args[2];
    this.getAbility = args[3];
    this.effects = args[4];
  }

  startCast(req: CastRequest | CastDefinition): void {
    if ("castTime" in req) {
      this.activeCasts.set(req.sourceId, req);
      this.timeline.schedule?.(() => void 0, req.completeAt);
      this.bus.publish("CAST_STARTED", req);
      return;
    }

    const ability = this.getAbility(req.abilityId);
    if (!ability) return;

    this.bus.emit({
      type: "CAST_START",
      timestamp: req.now,
      sourceId: req.casterId,
      abilityId: req.abilityId,
      targetId: req.targetId,
    });

    if (ability.telegraph) {
      const pos = this.getPosition(req.casterId);
      if (!pos) return;

      this.bus.emit({
        type: "TELEGRAPH_START",
        timestamp: req.now,
        sourceId: req.casterId,
        abilityId: req.abilityId,
        x: pos.x,
        y: pos.y,
        telegraph: ability.telegraph,
      });
    }
  }

  completeCast(req: CastRequest | CastDefinition): void {
    if ("castTime" in req) {
      this.activeCasts.delete(req.sourceId);
      this.bus.publish("CAST_COMPLETED", req);
      return;
    }

    const ability = this.getAbility(req.abilityId);
    if (!ability) return;

    this.bus.emit({
      type: "CAST_COMPLETE",
      timestamp: req.now,
      sourceId: req.casterId,
      abilityId: req.abilityId,
      targetId: req.targetId,
    });

    if (ability.telegraph) {
      this.bus.emit({
        type: "TELEGRAPH_END",
        timestamp: req.now,
        sourceId: req.casterId,
        abilityId: req.abilityId,
      });
    }

    const script = (ability as any).script as AbilityScript | undefined;
    if (!script?.onCastComplete) return;

    const ctx: AbilityContext = {
      casterId: req.casterId,
      targetId: req.targetId,
      ability,
      now: req.now,
      ...this.effects, // <-- inject all effect helpers
    };

    script.onCastComplete(ctx);
  }

  handleEvent(event: EngineCombatEvent): void {
    if (event.type === "CAST_COMPLETE" || event.type === "INTERRUPT") {
      if (event.sourceId) {
        this.activeCasts.delete(event.sourceId);
      }
    }

    if (event.type === "CAST_COMPLETE") {
      this.bus.publish("CAST_COMPLETED", event);
    }

    if (event.type === "INTERRUPT") {
      this.bus.publish("CAST_INTERRUPTED", event);
    }

    if (event.type === "CHANNEL_TICK") {
      this.bus.publish("CHANNEL_TICK_FIRED", event);
    }
  }

  isCasting(entityId: string): boolean {
    return this.activeCasts.has(entityId);
  }

  getActiveCast(entityId: string): CastDefinition | null {
    return this.activeCasts.get(entityId) ?? null;
  }
}
