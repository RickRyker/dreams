// server/src/dialog/debugDialogEngine.ts

import {DialogEngine} from "./dialogEngine";
import {DialogDebugTrace} from "./debugTypes";
import {evaluateConditionDebug} from "./debugConditionEvaluator";
import {executeActionsDebug} from "./debugActionExecutor";

export class DebugDialogEngine extends DialogEngine {
  async loadPageDebug(dialogId: string, sequence: number): Promise<DialogDebugTrace> {
    const pageData = await this.loadPage(dialogId, sequence);

    const trace: DialogDebugTrace = {
      dialogId,
      pageSequence: sequence,
      parts: [],
      actions: [],
      links: [],
      variablesUsed: {},
    };

    // Parts
    for (const part of pageData.page.parts) {
      const conditionDebug = part.conditions.map((c) =>
        evaluateConditionDebug(c, this.conditionContext)
      );

      trace.parts.push({
        partId: part.id,
        visible: conditionDebug.every((c) => c.result),
        conditions: conditionDebug,
      });
    }

    // Actions
    const actionDebug = executeActionsDebug(
      pageData.page.actions,
      this.actionContext
    );
    trace.actions = actionDebug.debug;

    // Links
    for (const link of pageData.page.links) {
      const conditionDebug = link.conditions.map((c) =>
        evaluateConditionDebug(c, this.conditionContext)
      );

      trace.links.push({
        linkId: link.id,
        visible: conditionDebug.every((c) => c.result),
        conditions: conditionDebug,
      });
    }

    // Variables used
    for (const [key, value] of this.variableMap.entries()) {
      trace.variablesUsed[key] = value;
    }

    return trace;
  }
}
