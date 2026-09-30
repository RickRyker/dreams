// server/src/combat/types/EngineCombatTypes.ts

//------------------------------------------------------------
// CORE IDENTIFIERS
//------------------------------------------------------------

import {CombatTimeline} from "../CombatTimeline";

export type EngineCombatId = string;
export type EngineEntityId = string;
export type EngineEffectId = string | null;

//------------------------------------------------------------
// COMBAT STATES
//------------------------------------------------------------

export type EngineCombatState =
  | "INIT"
  | "PREPARE"
  | "ACTIVE"
  | "RESOLVING"
  | "END";

//------------------------------------------------------------
// EFFECT INSTANCE
//------------------------------------------------------------

export interface EngineEffectInstance {
  id: EngineEffectId;
  type: string; // EffectType
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  stacks: number;
  duration: number;
  tickInterval: number | null;
  nextTickAt: number | null;
  expiresAt: number;
}

//------------------------------------------------------------
// RESOLUTION TYPES
//------------------------------------------------------------

export interface EngineDamageResult {
  type: "DAMAGE_RESULT";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  amount: number;
  timestamp: number;
}

export interface EngineHealResult {
  type: "HEAL_RESULT";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  amount: number;
  timestamp: number;
}

export interface EngineShieldResult {
  type: "SHIELD_RESULT";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  amount: number;
  timestamp: number;
}

export interface EngineInterruptResult {
  type: "INTERRUPT_RESULT";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  timestamp: number;
}

export interface EngineThreatChange {
  type: "THREAT_CHANGE";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  amount: number;
}

//------------------------------------------------------------
// COMBAT RESOLUTION (OUTPUT OF ACTION RESOLVER)
//------------------------------------------------------------

export interface EngineCombatResolution {
  event: EngineCombatEvent;
  damage?: EngineDamageResult;
  heal?: EngineHealResult;
  shield?: EngineShieldResult;
  interrupt?: EngineInterruptResult;
  threat?: EngineThreatChange;
}

//------------------------------------------------------------
// SNAPSHOT STRUCTURES
//------------------------------------------------------------

export interface EngineEntitySnapshot {
  entityId: EngineEntityId;
  hp: number;
  maxHp: number;
  shield: number;
  buffs: EngineEffectId[];
  debuffs: EngineEffectId[];
  interrupted: boolean;
}

export interface EngineCombatSnapshot {
  id: string;
  combatId: string;
  timestamp: number; // from BigInt in DB
  eventType: string;
  event: EngineCombatEvent;
  resolution: EngineCombatResolution;
  entities: EngineEntitySnapshot[];
  createdAt: number; // Date → number (ms)
}

//------------------------------------------------------------
// AI BEHAVIOR TREE TYPES
//------------------------------------------------------------

export interface EngineAiDecision {
  abilityId: string | null;
  targetId: string | null;
  delayMs: number;
}

export interface EngineAiEvaluationContext {
  event: EngineCombatEvent;
  resolution: EngineCombatResolution;
  threatTable: Map<EngineEntityId, number>;
  timeline: CombatTimeline;
  entityId: EngineEntityId;
  getPosition(id: string): { x: number; y: number } | null;
}

export interface EngineAiBehaviorNode {
  evaluate(context: EngineAiEvaluationContext): EngineAiDecision | null;
}

//------------------------------------------------------------
// REPLAY RECORD
//------------------------------------------------------------

export interface EngineReplayRecord {
  combatId: EngineCombatId;
  timestamp: number;
  event?: EngineCombatEvent;
  resolution?: EngineCombatResolution;
  snapshot?: EngineCombatSnapshot;
}

export interface BaseEngineCombatEvent {
  timestamp: number;
  sourceId?: EngineEntityId | null;
  targetId?: EngineEntityId | null;
  abilityId?: string | null;
  amount?: number;
  effectId?: EngineEffectId;
  effectType?: string;
  duration?: number;
  stacks?: number;
  tickInterval?: number | null;
  entityId?: EngineEntityId;
  x?: number;
  y?: number;
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  telegraph?: {
    shape: string;
    radius?: number;
    length?: number;
    width?: number;
    angle?: number;
    durationMs: number;
    color?: string;
  };
}

export interface CastStartEvent extends BaseEngineCombatEvent {
  type: "CAST_START";
  sourceId: EngineEntityId;
  targetId?: EngineEntityId | null;
  abilityId: string;
}

export interface CastCompleteEvent extends BaseEngineCombatEvent {
  type: "CAST_COMPLETE";
  sourceId: EngineEntityId;
  targetId?: EngineEntityId | null;
  abilityId: string;
}

export interface TelegraphStartEvent extends BaseEngineCombatEvent {
  type: "TELEGRAPH_START";
  sourceId: EngineEntityId;
  abilityId: string;
  x: number;
  y: number;
  telegraph: {
    shape: string;
    radius?: number;
    length?: number;
    width?: number;
    angle?: number;
    durationMs: number;
    color?: string;
  };
}

export interface TelegraphEndEvent extends BaseEngineCombatEvent {
  type: "TELEGRAPH_END";
  sourceId: EngineEntityId;
  abilityId: string;
}

export interface DamageEvent extends BaseEngineCombatEvent {
  type: "DAMAGE";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  abilityId: string;
  amount: number;
}

export interface HealEvent extends BaseEngineCombatEvent {
  type: "HEAL";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  abilityId: string;
  amount: number;
}

export interface ShieldEvent extends BaseEngineCombatEvent {
  type: "SHIELD";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  abilityId: string;
  amount: number;
}

export interface InterruptEvent extends BaseEngineCombatEvent {
  type: "INTERRUPT";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  abilityId?: string;
}

export interface ChannelTickEvent extends BaseEngineCombatEvent {
  type: "CHANNEL_TICK";
  sourceId: EngineEntityId;
}

export interface RoundStartEvent extends BaseEngineCombatEvent {
  type: "ROUND_START";
}

export interface TurnStartEvent extends BaseEngineCombatEvent {
  type: "TURN_START";
}

export interface DeathEvent extends BaseEngineCombatEvent {
  type: "DEATH";
  sourceId: EngineEntityId;
  targetId?: EngineEntityId | null;
}

export interface ThreatChangeEvent extends BaseEngineCombatEvent {
  type: "THREAT_CHANGE";
  sourceId: EngineEntityId;
  targetId: EngineEntityId;
  amount: number;
}

export interface AiActionEvent extends BaseEngineCombatEvent {
  type: "AI_ACTION";
  sourceId: EngineEntityId;
  targetId: EngineEntityId | null;
  abilityId: string | null;
}

export interface AiDecisionEvent extends BaseEngineCombatEvent {
  type: "AI_DECISION";
  sourceId: EngineEntityId;
  targetId: EngineEntityId | null;
  abilityId: string | null;
}

export interface MoveEvent extends BaseEngineCombatEvent {
  type: "MOVE";
  entityId: EngineEntityId;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export type EngineCombatEvent =
  | AiActionEvent
  | AiDecisionEvent
  | CastStartEvent
  | CastCompleteEvent
  | DamageEvent
  | HealEvent
  | ShieldEvent
  | InterruptEvent
  | ChannelTickEvent
  | RoundStartEvent
  | TurnStartEvent
  | DeathEvent
  | ThreatChangeEvent
  | MoveEvent
  | TelegraphStartEvent
  | TelegraphEndEvent;
