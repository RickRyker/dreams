// server/src/combat/CombatStateStore.ts


import { EngineEntityId } from "./types/EngineCombatTypes";

export interface ParticipantState {
  id: EngineEntityId;
  entityId?: EngineEntityId;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  shield: number;
  interrupted: boolean;
  dead: boolean;
  buffs?: unknown[];
  debuffs?: unknown[];
}

export class CombatStateStore {
  private participants = new Map<EngineEntityId, ParticipantState>();

  addParticipant(p: ParticipantState): void {
    this.participants.set(p.id, p);
  }

  ensureEntity(id: EngineEntityId, maxHp = 100): ParticipantState {
    const existing = this.participants.get(id);
    if (existing) return existing;

    const entity: ParticipantState = {
      id,
      entityId: id,
      x: 0,
      y: 0,
      hp: maxHp,
      maxHp,
      shield: 0,
      interrupted: false,
      dead: false,
      buffs: [],
      debuffs: [],
    };

    this.participants.set(id, entity);
    return entity;
  }

  getParticipant(id: EngineEntityId): ParticipantState | null {
    return this.participants.get(id) ?? null;
  }

  getEntity(id: EngineEntityId): ParticipantState | null {
    return this.getParticipant(id);
  }

  getAllEntities(): ParticipantState[] {
    return [...this.participants.values()];
  }

  setPosition(id: EngineEntityId, x: number, y: number): void {
    const p = this.participants.get(id);
    if (!p) return;
    p.x = x;
    p.y = y;
  }

  setHp(id: EngineEntityId, hp: number): void {
    const p = this.participants.get(id);
    if (!p) return;
    p.hp = hp;
  }

  setShield(id: EngineEntityId, shield: number): void {
    const p = this.participants.get(id);
    if (!p) return;
    p.shield = shield;
  }

  setInterrupted(id: EngineEntityId, flag: boolean): void {
    const p = this.participants.get(id);
    if (!p) return;
    p.interrupted = flag;
  }

  setDead(id: EngineEntityId, flag: boolean): void {
    const p = this.participants.get(id);
    if (!p) return;
    p.dead = flag;
  }

  applyDamage(id: EngineEntityId, amount: number): void {
    const p = this.ensureEntity(id);
    const absorbed = Math.min(p.shield, amount);
    p.shield -= absorbed;
    const remaining = amount - absorbed;
    p.hp = Math.max(0, p.hp - remaining);
    if (p.hp <= 0) p.dead = true;
  }

  applyHeal(id: EngineEntityId, amount: number): void {
    const p = this.ensureEntity(id);
    p.hp = Math.min(p.maxHp, p.hp + amount);
  }

  applyShield(id: EngineEntityId, amount: number): void {
    const p = this.ensureEntity(id);
    p.shield += amount;
  }
}
