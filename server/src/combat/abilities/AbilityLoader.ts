// server/src/combat/abilities/AbilityLoader.ts


import {AbilityDatabase} from "./AbilityDatabase";

export function loadAbilities(registry: any): void {
  for (const def of AbilityDatabase) {
    registry.register(def);
  }
}
