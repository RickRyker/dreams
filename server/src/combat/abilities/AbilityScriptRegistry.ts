// server/src/combat/abilities/AbilityScriptRegistry.ts


import {AbilityScript} from "./types/AbilityScript";

export class AbilityScriptRegistry {
  private readonly scripts = new Map<string, AbilityScript>();

  register(abilityId: string, script: AbilityScript): void {
    this.scripts.set(abilityId, script);
  }

  get(abilityId: string): AbilityScript | undefined {
    return this.scripts.get(abilityId);
  }
}
