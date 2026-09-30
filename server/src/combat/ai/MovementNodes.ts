// server/src/combat/ai/MovementNodes.ts


import {
  EngineAiBehaviorNode,
  EngineAiDecision,
  EngineAiEvaluationContext,
} from "../types/EngineCombatTypes";

import {MovementIntegration} from "../integration/MovementIntegration";

export class ChaseTargetNode implements EngineAiBehaviorNode {
  constructor(
    private readonly movement: MovementIntegration,
    private readonly distance: number,
  ) {}

  evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null {
    const target: string | undefined = ctx.threatTable.entries().next().value?.[0];
    if (!target) return null;

    const casterPos: any = ctx.getPosition(ctx.entityId);
    const targetPos: any = ctx.getPosition(target);
    if (!casterPos || !targetPos) return null;

    const dx: number = targetPos.x - casterPos.x;
    const dy: number = targetPos.y - casterPos.y;
    const dist: number = Math.sqrt(dx * dx + dy * dy);

    if (dist <= this.distance) return null;

    this.movement.moveEntityTo(ctx.entityId, targetPos);

    return {
      abilityId: "",
      targetId: null,
      delayMs: 250,
    };
  }
}
