// server/src/combat/ai/BasicThreatBehavior.ts


import {
  EngineAiBehaviorNode,
  EngineAiDecision,
  EngineAiEvaluationContext,
} from "../types/EngineCombatTypes";
import {SelectorNode, ActionNode} from "./BehaviorTreeNodes";

export function buildBasicThreatBehavior(
  defaultAbilityId: string,
): EngineAiBehaviorNode {
  return new SelectorNode([
    new ActionNode((ctx: EngineAiEvaluationContext): EngineAiDecision | null => {
      const highest: [string, number] = [...ctx.threatTable.entries()]
        .sort((a: [string, number], b: [string, number]): number => b[1] - a[1])[0];
      if (!highest) return null;

      return {
        abilityId: defaultAbilityId,
        targetId: highest[0],
        delayMs: 500,
      };
    }),
  ]);
}
