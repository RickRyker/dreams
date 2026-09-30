// server/src/combat/integration/AbilityCooldownIntegration.ts


import {AbilityCooldownTracker} from "../abilities/AbilityCooldownTracker";
import {AbilityRegistry} from "../abilities/AbilityRegistry";
import {EngineCombatEvent} from "../types/EngineCombatTypes";

export class AbilityCooldownIntegration {
  constructor(
    private readonly cooldowns: AbilityCooldownTracker,
    private readonly abilities: typeof AbilityRegistry,
  ) {}

  onCastComplete(event: EngineCombatEvent): void {
    if (!event.abilityId || !event.sourceId) return;

    const ability = this.abilities.get(event.abilityId);
    if (!ability) return;

    const cd = ability.def.cooldownMs ?? 0;
    if (cd > 0) {
      this.cooldowns.setCooldown(event.sourceId, ability.def.id, event.timestamp, cd);
    }
  }
}
