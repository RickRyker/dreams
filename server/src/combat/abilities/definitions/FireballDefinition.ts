// server/src/combat/abilities/definitions/FireballDefinition.ts


import { AbilityDefinition } from "../types/AbilityDefinition";

export const FireballDefinition: AbilityDefinition = {
  id: "FIREBALL",
  name: "Fireball",
  school: "FIRE",

  castTimeMs: 1500,
  cooldownMs: 2000,
  resourceCost: 20,
  range: 25,

  effectType: "DAMAGE",
  baseAmount: 50,

  telegraph: {
    shape: "CIRCLE",
    radius: 2,
    durationMs: 1500,
    color: "orange",
  },

  tags: ["PROJECTILE", "RANGED", "MAGICAL"],
};
