// server/src/combat/abilities/scripts/HealScript.ts


import {AbilityScript} from "../types/AbilityScript";
import {AbilityContext} from "../types/AbilityContext";

export const HealScript: AbilityScript = {
  onCastComplete(ctx: AbilityContext) {
    if (!ctx.targetId) return;
    const amount: number = ctx.ability.baseAmount ?? 0;
    ctx.heal(ctx.targetId, amount);
  },
};
