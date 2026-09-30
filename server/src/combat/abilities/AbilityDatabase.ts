// server/src/combat/abilities/AbilityDatabase.ts


import {AbilityDefinition} from "./types/AbilityDefinition";

export const AbilityDatabase: AbilityDefinition[] = [
  {
    id: "fireball",
    name: "Fireball",
    school: "FIRE",
    castTimeMs: 2000,
    cooldownMs: 8000,
    resourceCost: 20,
    range: 25,
    effectType: "DAMAGE",
    baseAmount: 50,
  },
  {
    id: "renew",
    name: "Renew",
    school: "HOLY",
    castTimeMs: 0,
    cooldownMs: 0,
    effectType: "HOT",
    durationMs: 12000,
    tickIntervalMs: 3000,
    baseAmount: 10,
  },
];
