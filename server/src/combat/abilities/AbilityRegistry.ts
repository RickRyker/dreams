// server/src/combat/abilities/AbilityRegistry.ts


import {AbilityDefinition, AbilityScript} from "./types";

export interface RegisteredAbility {
  def: AbilityDefinition;
  script: AbilityScript;
}

const registry: Record<string, RegisteredAbility> = {};

export const AbilityRegistry = {
  register(id: string, entry: RegisteredAbility) {
    registry[id] = entry;
  },

  get(id: string): RegisteredAbility | undefined {
    return registry[id];
  },

  has(id: string): boolean {
    return id in registry;
  },

  all(): RegisteredAbility[] {
    return Object.values(registry);
  },
};
