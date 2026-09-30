// server/src/dialog/actionCore.ts

import { DialogAction, DialogActionType } from "@prisma/client";
import { ActionExecutionContext } from "./ActionExecutionContext";

export interface SingleActionResult {
  result: any;
}

export function runSingleAction(
  action: DialogAction,
  ctx: ActionExecutionContext
): SingleActionResult {
  let result: any = null;

  switch (action.action) {
    case DialogActionType.ADD_GOLD:
      ctx.addGold(action.numberAmt ?? 0);
      result = { gold: action.numberAmt };
      break;

    case DialogActionType.ADD_XP:
      ctx.addXP(action.numberAmt ?? 0);
      result = { xp: action.numberAmt };
      break;

    case DialogActionType.ADD_ITEM:
      if (action.slug) ctx.addItem(action.slug);
      result = { item: action.slug };
      break;

    case DialogActionType.REMOVE_ITEM:
      if (action.slug) ctx.removeItem(action.slug);
      result = { removed: action.slug };
      break;

    case DialogActionType.ADD_RECIPE:
      if (action.slug) ctx.addRecipe(action.slug);
      result = { recipe: action.slug };
      break;

    case DialogActionType.ADD_SKILL:
      if (action.skill) ctx.addSkillPoints(action.skill, action.numberAmt ?? 1);
      result = { skill: action.skill, amount: action.numberAmt };
      break;

    case DialogActionType.ADD_STAT:
      if (action.slug) ctx.addStat(action.slug, action.numberAmt ?? 0);
      result = { stat: action.slug, amount: action.numberAmt };
      break;

    case DialogActionType.SET_VARIABLE:
      ctx.setVariable(action.questId, action.variable1, action.text ?? null);
      result = { variable: action.variable1, value: action.text };
      break;

    case DialogActionType.CLEAR_VARIABLE:
      ctx.setVariable(action.questId, action.variable1, null);
      result = { variable: action.variable1, cleared: true };
      break;

    case DialogActionType.ADD_VALUE_TO_VARIABLE: {
      const v = ctx.getVariable(action.questId, action.variable1);
      const newValue = (v ?? 0) + (action.numberAmt ?? 0);
      ctx.setVariable(action.questId, action.variable1, newValue);
      result = { variable: action.variable1, newValue };
      break;
    }

    case DialogActionType.ADD_VARIABLE_TO_VARIABLE: {
      const v1 = ctx.getVariable(action.questId, action.variable1);
      const v2 = ctx.getVariable(action.questId, action.variable2);
      const newValue = (v1 ?? 0) + (v2 ?? 0);
      ctx.setVariable(action.questId, action.variable1, newValue);
      result = { variable: action.variable1, newValue };
      break;
    }

    case DialogActionType.MULTIPLY_VARIABLE: {
      const v = ctx.getVariable(action.questId, action.variable1);
      const newValue = (v ?? 0) * (action.floatAmt ?? 1);
      ctx.setVariable(action.questId, action.variable1, newValue);
      result = { variable: action.variable1, newValue };
      break;
    }

    case DialogActionType.SET_VARIABLE_TO_CURRENT_TIME:
    case DialogActionType.PUT_CURRENT_TIME_IN_VARIABLE: {
      const now = Date.now();
      ctx.setVariable(action.questId, action.variable1, now);
      result = { variable: action.variable1, value: now };
      break;
    }

    case DialogActionType.PUT_CURRENT_DATE_IN_VARIABLE: {
      const date = new Date().toISOString().slice(0, 10);
      ctx.setVariable(action.questId, action.variable1, date);
      result = { variable: action.variable1, value: date };
      break;
    }

    case DialogActionType.START_QUEST:
      if (action.questId) ctx.startQuest(action.questId);
      result = { questStarted: action.questId };
      break;

    case DialogActionType.COMPLETE_QUEST:
      if (action.questId) ctx.completeQuest(action.questId);
      result = { questCompleted: action.questId };
      break;

    case DialogActionType.FAIL_QUEST:
      if (action.questId) ctx.failQuest(action.questId);
      result = { questFailed: action.questId };
      break;

    case DialogActionType.RESET_QUEST:
      if (action.questId) ctx.resetQuest(action.questId);
      result = { questReset: action.questId };
      break;

    case DialogActionType.MOVE_PLAYER_TO_MAP:
      if (action.mapId && action.x != null && action.y != null)
        ctx.movePlayerToMap(action.mapId, action.x, action.y);
      result = { movedToMap: action.mapId };
      break;

    case DialogActionType.MOVE_PLAYER_TO_COORDS:
      if (action.x != null && action.y != null)
        ctx.movePlayerToCoords(action.x, action.y);
      result = { movedToCoords: [action.x, action.y] };
      break;

    case DialogActionType.RETURN_PLAYER_TO_PREVIOUS_LOCATION:
      ctx.returnPlayerToPreviousLocation();
      result = { returned: true };
      break;

    case DialogActionType.SET_RESPAWN_POINT:
      if (action.mapId && action.x != null && action.y != null)
        ctx.setRespawnPoint(action.mapId, action.x, action.y);
      result = { respawnSet: action.mapId };
      break;

    case DialogActionType.PREPARE_COMBAT_MONSTER:
      if (action.slug) ctx.prepareCombatMonster(action.slug);
      result = { monsterPrepared: action.slug };
      break;

    case DialogActionType.START_COMBAT:
      if (action.slug) ctx.startCombat(action.slug);
      result = { combatStarted: action.slug };
      break;

    case DialogActionType.START_COMBAT_GROUP:
      if (action.text) {
        const slugs = action.text.split(",").map((s) => s.trim());
        ctx.startCombatGroup(slugs);
        result = { combatGroupStarted: slugs };
      }
      break;

    case DialogActionType.APPLY_EFFECT:
      if (action.slug) ctx.applyEffect(action.slug);
      result = { effectApplied: action.slug };
      break;

    case DialogActionType.REMOVE_EFFECT:
      if (action.slug) ctx.removeEffect(action.slug);
      result = { effectRemoved: action.slug };
      break;
  }

  return { result };
}
