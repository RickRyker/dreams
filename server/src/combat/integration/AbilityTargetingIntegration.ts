// server/src/combat/integration/AbilityTargetingIntegration.ts


import {AbilityTargetingRule, AbilityTargeting} from "../abilities/AbilityTargeting";
import {AbilityDefinition} from "../abilities/types/AbilityDefinition";
import {TargetingContext} from "../abilities/AbilityTargeting";
import {EngineCombatEvent} from "../types/EngineCombatTypes";

export class AbilityTargetingIntegration {
  validateTarget(
    ability: AbilityDefinition,
    rule: AbilityTargetingRule,
    ctx: TargetingContext,
  ): boolean {
    return AbilityTargeting.isValidTarget(rule, ctx);
  }

  validateEvent(
    event: EngineCombatEvent,
    ability: AbilityDefinition,
    rule: AbilityTargetingRule,
    ctx: TargetingContext,
  ): boolean {
    if (!event.targetId && rule.targetType !== "SELF") return false;
    return AbilityTargeting.isValidTarget(rule, ctx);
  }
}
