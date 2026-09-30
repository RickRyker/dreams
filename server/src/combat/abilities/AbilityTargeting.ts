// server/src/combat/abilities/AbilityTargeting.ts


import {EngineEntityId} from "../types/EngineCombatTypes";

export type TargetType = "SELF" | "ALLY" | "ENEMY" | "ANY";

export interface AbilityTargetingRule {
  id: string;
  targetType: TargetType;
  maxRange?: number;
  requiresLos?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface TargetingContext {
  casterId: EngineEntityId;
  targetId: EngineEntityId | null;
  getPosition: (id: EngineEntityId) => Position | null;
  areAllies: (a: EngineEntityId, b: EngineEntityId) => boolean;
  hasLineOfSight: (from: Position, to: Position) => boolean;
}

export class AbilityTargeting {
  static isValidTarget(rule: AbilityTargetingRule, ctx: TargetingContext): boolean {
    const {casterId, targetId} = ctx;
    if (!targetId) return rule.targetType === "SELF";

    const casterPos = ctx.getPosition(casterId);
    const targetPos = ctx.getPosition(targetId);
    if (!casterPos || !targetPos) return false;

    const dx = targetPos.x - casterPos.x;
    const dy = targetPos.y - casterPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (rule.maxRange != null && dist > rule.maxRange) return false;

    if (rule.requiresLos && !ctx.hasLineOfSight(casterPos, targetPos)) return false;

    switch (rule.targetType) {
      case "SELF":
        return casterId === targetId;
      case "ALLY":
        return casterId === targetId || ctx.areAllies(casterId, targetId);
      case "ENEMY":
        return !ctx.areAllies(casterId, targetId);
      case "ANY":
        return true;
    }
  }
}
