// server/src/dialog/debugConditionEvaluator.ts

import { DialogCondition } from '@prisma/client';
import { ConditionContext } from './conditionEvaluator';
import { ConditionDebugEntry } from './debugTypes';
import { evaluateCondition as baseEval } from './conditionEvaluator';

export function evaluateConditionDebug(
  condition: DialogCondition,
  ctx: ConditionContext
): ConditionDebugEntry {
  const playerValue = ctx.getVariable(condition.questId ?? null, condition.variable ?? null);

  // Re-run conversion logic from your upgraded evaluator
  const inferredType = typeof playerValue;
  let convertedValue: any = condition.value;

  if (playerValue !== null && playerValue !== undefined) {
    if (typeof playerValue === 'number') convertedValue = Number(condition.value);
    else if (typeof playerValue === 'boolean') convertedValue = condition.value === 'true';
    else if (playerValue instanceof Date) convertedValue = new Date(condition.value ?? '');
  }

  const result = baseEval(condition, ctx);

  return {
    conditionId: condition.id,
    questId: condition.questId ?? null,
    variable: condition.variable ?? null,
    operator: condition.operator ?? null,
    rawValue: condition.value ?? null,
    playerValue,
    convertedValue,
    result,
  };
}
