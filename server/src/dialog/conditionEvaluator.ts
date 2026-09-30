// server/src/dialog/conditionEvaluator.ts

import { DialogCondition, DialogConditionOperator } from "@prisma/client";

export interface ConditionContext {
  getVariable: (questId: string | null, variableName: string | null) => any;
}

function inferType(value: any): "number" | "boolean" | "date" | "string" | "array" | "object" | "null" {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "date";
  if (typeof value === "object") return "object";
  if (typeof value === "string") {
    if (!isNaN(Number(value))) return "number";
    if (value === "true" || value === "false") return "boolean";
    if (!isNaN(Date.parse(value))) return "date";
    return "string";
  }
  return "string";
}

function convertToType(raw: string, target: ReturnType<typeof inferType>) {
  switch (target) {
    case "number": return Number(raw);
    case "boolean": return raw === "true";
    case "date": return new Date(raw);
    case "array":
      try { return JSON.parse(raw); } catch { return [raw]; }
    case "object":
      try { return JSON.parse(raw); } catch { return { value: raw }; }
    default: return raw;
  }
}

export function evaluateCondition(
  condition: DialogCondition,
  ctx: ConditionContext
): boolean {
  const playerValue = ctx.getVariable(condition.questId, condition.variable);
  const inferred = inferType(playerValue);
  const conditionValue = convertToType(condition.value, inferred);

  switch (condition.operator) {
    case DialogConditionOperator.EQ: return playerValue == conditionValue;
    case DialogConditionOperator.NE: return playerValue != conditionValue;
    case DialogConditionOperator.GT: return playerValue > conditionValue;
    case DialogConditionOperator.LT: return playerValue < conditionValue;
    case DialogConditionOperator.GTE: return playerValue >= conditionValue;
    case DialogConditionOperator.LTE: return playerValue <= conditionValue;

    case DialogConditionOperator.CONTAINS:
      return Array.isArray(playerValue)
        ? playerValue.includes(conditionValue)
        : typeof playerValue === "string"
          ? playerValue.includes(String(conditionValue))
          : false;

    case DialogConditionOperator.NOT_CONTAINS:
      return Array.isArray(playerValue)
        ? !playerValue.includes(conditionValue)
        : typeof playerValue === "string"
          ? !playerValue.includes(String(conditionValue))
          : false;

    case DialogConditionOperator.STARTS_WITH:
      return typeof playerValue === "string" && playerValue.startsWith(String(conditionValue));

    case DialogConditionOperator.ENDS_WITH:
      return typeof playerValue === "string" && playerValue.endsWith(String(conditionValue));

    default:
      return false;
  }
}

export function evaluateAll(conditions: DialogCondition[], ctx: ConditionContext): boolean {
  return conditions.every((c) => evaluateCondition(c, ctx));
}
