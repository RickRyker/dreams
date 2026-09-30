// server/src/combat/abilities/definitions/HealDefinition.ts


import { AbilityDefinition } from "../types/AbilityDefinition";

export const HealDefinition: AbilityDefinition = {
  id: "HEAL",
  name: "Heal",
  school: "HOLY",

  castTimeMs: 2000,
  cooldownMs: 1000,
  resourceCost: 15,
  range: 20,

  effectType: "HEAL",
  baseAmount: 40,

  tags: ["SINGLE_TARGET", "ALLY"],
};
