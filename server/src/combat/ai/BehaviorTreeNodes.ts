// server/src/combat/ai/BehaviorTreeNodes.ts


import {
  EngineAiBehaviorNode,
  EngineAiDecision,
  EngineAiEvaluationContext,
} from "../types/EngineCombatTypes";

// ----------------- Base -----------------

export abstract class BaseNode implements EngineAiBehaviorNode {
  abstract evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null;
}

// ----------------- Composite: Sequence -----------------

export class SequenceNode extends BaseNode {
  constructor(private readonly children: EngineAiBehaviorNode[]) {
    super();
  }

  evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null {
    for (const child of this.children) {
      const result = child.evaluate(ctx);
      if (!result) return null;
    }
    return null;
  }
}

// ----------------- Composite: Selector -----------------

export class SelectorNode extends BaseNode {
  constructor(private readonly children: EngineAiBehaviorNode[]) {
    super();
  }

  evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null {
    for (const child of this.children) {
      const result = child.evaluate(ctx);
      if (result) return result;
    }
    return null;
  }
}

// ----------------- Condition -----------------

export class ConditionNode extends BaseNode {
  constructor(private readonly predicate: (ctx: EngineAiEvaluationContext) => boolean) {
    super();
  }

  evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null {
    return this.predicate(ctx) ? {abilityId: "", targetId: ctx.entityId, delayMs: 0} : null;
  }
}

// ----------------- Action -----------------

export class ActionNode extends BaseNode {
  constructor(private readonly fn: (ctx: EngineAiEvaluationContext) => EngineAiDecision | null) {
    super();
  }

  evaluate(ctx: EngineAiEvaluationContext): EngineAiDecision | null {
    return this.fn(ctx);
  }
}
