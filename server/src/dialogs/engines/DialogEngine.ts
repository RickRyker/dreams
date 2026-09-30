// server/src/dialogs/engines/DialogEngine.ts

import {
  Dialog,
  DialogAction,
  DialogCondition,
  DialogConditionOperator,
  DialogLink,
  DialogPage,
  DialogPart,
} from "@prisma/client";

export interface QuestState {
  [questId: string]: {
    [variable: string]: string;
  };
}

export interface ExecutionContext {
  playerId: string;
  mapId: string;
  x: number;
  y: number;
  questState: QuestState;
}

export interface DialogGraph {
  dialog: Dialog;
  pages: (DialogPage & {
    parts: (DialogPart & { conditions: DialogCondition[] })[];
    actions: (DialogAction & { conditions: DialogCondition[] })[];
    links: (DialogLink & { conditions: DialogCondition[] })[];
  })[];
}

export class DialogEngine {
  constructor(
    private readonly applyAction: (ctx: ExecutionContext, action: DialogAction) => Promise<void>,
  ) {}

  private evalCondition(cond: DialogCondition, ctx: ExecutionContext): boolean {
    const questVars = ctx.questState[cond.questId] ?? {};
    const current = questVars[cond.variable] ?? "";
    const target = cond.value;

    switch (cond.operator as DialogConditionOperator) {
      case "EQ": return current === target;
      case "NE": return current !== target;
      case "GT": return current > target;
      case "LT": return current < target;
      case "GTE": return current >= target;
      case "LTE": return current <= target;
      case "CONTAINS": return current.includes(target);
      case "NOT_CONTAINS": return !current.includes(target);
      case "STARTS_WITH": return current.startsWith(target);
      case "ENDS_WITH": return current.endsWith(target);
      default: return false;
    }
  }

  private allConditionsPass(conds: DialogCondition[], ctx: ExecutionContext): boolean {
    return conds.every(c => this.evalCondition(c, ctx));
  }

  getVisibleParts(page: DialogGraph["pages"][number], ctx: ExecutionContext) {
    return page.parts.filter(p => this.allConditionsPass(p.conditions, ctx));
  }

  getVisibleLinks(page: DialogGraph["pages"][number], ctx: ExecutionContext) {
    return page.links.filter(l => this.allConditionsPass(l.conditions, ctx));
  }

  getExecutableActions(page: DialogGraph["pages"][number], ctx: ExecutionContext) {
    return page.actions.filter(a => this.allConditionsPass(a.conditions, ctx));
  }

  async executePage(page: DialogGraph["pages"][number], ctx: ExecutionContext) {
    const actions = this.getExecutableActions(page, ctx);

    for (const action of actions) {
      await this.applyAction(ctx, action);
    }

    const links = this.getVisibleLinks(page, ctx);
    return {
      parts: this.getVisibleParts(page, ctx),
      links,
    };
  }
}
