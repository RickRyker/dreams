// server/src/combat/abilities/scripts/FireballScript.ts


import {AbilityScript} from "../types/AbilityScript";
import {AbilityContext} from "../types/AbilityContext";

export const FireballScript: AbilityScript = {
  onCastComplete(ctx: AbilityContext) {
    if (!ctx.targetId) return;
    const amount: number = ctx.ability.baseAmount ?? 0;
    ctx.dealDamage(ctx.targetId, amount);
    ctx.generateThreat(ctx.targetId, amount);
  },
};
