// server/src/dialog/debugActionExecutor.ts

import {DialogAction, DialogCondition,} from "@prisma/client";
import {evaluateAll} from "./conditionEvaluator";
import {runSingleAction} from "./actionCore";
import {ActionExecutionContext} from "./ActionExecutionContext";
import {ActionDebugEntry} from "./debugTypes";

export function executeActionsDebug(
  actions: (DialogAction & { conditions: DialogCondition[] })[],
  ctx: ActionExecutionContext
) {
  const results = [];
  const debug: ActionDebugEntry[] = [];

  for (const action of actions.sort((a, b) => a.sequence - b.sequence)) {
    const passed = evaluateAll(action.conditions, ctx);

    if (!passed) {
      debug.push({
        actionId: action.id,
        actionType: action.action,
        executed: false,
        skippedDueToConditions: true,
      });
      continue;
    }

    const { result } = runSingleAction(action, ctx);

    results.push({
      id: action.id,
      action: action.action,
      result,
    });

    debug.push({
      actionId: action.id,
      actionType: action.action,
      executed: true,
      result,
    });
  }

  return { results, debug };
}
