// server/src/combat/abilities/AbilityValidator.ts


import {AbilityDefinition} from "./types/AbilityDefinition";
import {AbilityTargeting, AbilityTargetingRule, TargetingContext} from "./AbilityTargeting";
import {AbilityCooldownTracker} from "./AbilityCooldownTracker";
import {EngineEntityId} from "../types/EngineCombatTypes";

export interface ResourceProvider {
  getResource(entityId: EngineEntityId): number;
}

export interface AbilityValidationResult {
  ok: boolean;
  reason?: string;
}

export class AbilityValidator {
  constructor(
    private readonly cooldowns: AbilityCooldownTracker,
    private readonly resources: ResourceProvider,
  ) {}

  validate(
    ability: AbilityDefinition,
    targetingRule: AbilityTargetingRule,
    ctx: TargetingContext,
    now: number,
  ): AbilityValidationResult {
    const {casterId} = ctx;

    if (this.cooldowns.isOnCooldown(casterId, ability.id, now)) {
      return {ok: false, reason: "ON_COOLDOWN"};
    }

    const cost = ability.resourceCost ?? 0;
    if (cost > 0 && this.resources.getResource(casterId) < cost) {
      return {ok: false, reason: "INSUFFICIENT_RESOURCE"};
    }

    if (!AbilityTargeting.isValidTarget(targetingRule, ctx)) {
      return {ok: false, reason: "INVALID_TARGET"};
    }

    return {ok: true};
  }
}
