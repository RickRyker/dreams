// server/src/dialog/ActionExecutionContext.ts


import { ConditionContext } from "./conditionEvaluator";

export interface ActionExecutionContext extends ConditionContext {
  addGold(amount: number): void;
  addXP(amount: number): void;
  addItem(slug: string): void;
  removeItem(slug: string): void;
  addRecipe(slug: string): void;
  addSkillPoints(skill: string, amount: number): void;
  addStat(slug: string, amount: number): void;

  startQuest(questId: string): void;
  completeQuest(questId: string): void;
  failQuest(questId: string): void;
  resetQuest(questId: string): void;
  advanceQuestStage(questId: string): void;
  setQuestStage(questId: string, stage: number): void;

  setVariable(questId: string | null, variable: string | null, value: any): void;
  getVariable(questId: string | null, variable: string | null): any;

  movePlayerToMap(mapId: string, x: number, y: number): void;
  movePlayerToCoords(x: number, y: number): void;
  returnPlayerToPreviousLocation(): void;
  setRespawnPoint(mapId: string, x: number, y: number): void;

  prepareCombatMonster(slug: string): void;
  startCombat(slug: string): void;
  startCombatGroup(slugs: string[]): void;

  applyEffect(slug: string): void;
  removeEffect(slug: string): void;
}
