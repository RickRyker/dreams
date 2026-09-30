// server/src/combat/tests/CombatTestHarness.ts


import { CombatEngine } from "../engines/CombatEngine";
import { CombatStateStore } from "../CombatStateStore";
import { CombatEventBus } from "../CombatEventBus";
import { CombatTimeline } from "../CombatTimeline";
import { EngineEntityId } from "../types/EngineCombatTypes";

export class CombatTestHarness {
  private readonly state: CombatStateStore;
  private readonly engine: CombatEngine;

  constructor() {
    this.state = new CombatStateStore();
    this.engine = new CombatEngine(this.state);
  }

  addParticipant(p: {
    id: EngineEntityId;
    x: number;
    y: number;
    hp: number;
    maxHp: number;
    shield?: number;
  }): void {
    this.state.addParticipant({
      id: p.id,
      x: p.x,
      y: p.y,
      hp: p.hp,
      maxHp: p.maxHp,
      shield: p.shield ?? 0,
      interrupted: false,
      dead: false,
    });
  }

  tick(now: number): void {
    this.engine.tick(now);
  }

  inject(event: any): void {
    this.engine.getEventBus().emit(event);
  }

  getTimeline() {
    return this.engine.getTimeline().getAll();
  }

  getPosition(id: EngineEntityId) {
    return this.engine.getParticipantPosition(id);
  }

  getState(id: EngineEntityId) {
    return this.state.getParticipant(id);
  }
}
