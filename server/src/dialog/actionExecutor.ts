// server/src/dialog/actionExecutor.ts

import {DialogAction, DialogCondition} from "@prisma/client";
import {evaluateAll} from "./conditionEvaluator";
import {runSingleAction} from "./actionCore";
import {ActionExecutionContext} from "./ActionExecutionContext";

export function executeActions(
  actions: (DialogAction & { conditions: DialogCondition[] })[],
  ctx: ActionExecutionContext
) {
  const results = [];

  for (const action of actions.sort((a, b) => a.sequence - b.sequence)) {
    if (!evaluateAll(action.conditions, ctx)) continue;

    const { result } = runSingleAction(action, ctx);

    results.push({
      id: action.id,
      action: action.action,
      result,
    });
  }

  return results;
}
