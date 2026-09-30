// server/src/combat/integration/AbilityValidationIntegration.ts


import {AbilityValidator} from "../abilities/AbilityValidator";
import {AbilityDefinition} from "../abilities/types/AbilityDefinition";
import {AbilityTargetingRule, TargetingContext} from "../abilities/AbilityTargeting";
import {EngineCombatEvent} from "../types/EngineCombatTypes";

export class AbilityValidationIntegration {
  constructor(private readonly validator: AbilityValidator) {}

  validate(
    ability: AbilityDefinition,
    rule: AbilityTargetingRule,
    ctx: TargetingContext,
    now: number,
  ): boolean {
    const result = this.validator.validate(ability, rule, ctx, now);
    return result.ok;
  }

  validateEvent(
    event: EngineCombatEvent,
    ability: AbilityDefinition,
    rule: AbilityTargetingRule,
    ctx: TargetingContext,
  ): boolean {
    const now = event.timestamp;
    const result = this.validator.validate(ability, rule, ctx, now);
    return result.ok;
  }
}
