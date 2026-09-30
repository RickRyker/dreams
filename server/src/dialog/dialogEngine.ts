// server/src/dialog/dialogEngine.ts

import {prisma} from "@prisma";
import {ChatBot, Dialog, PlayerQuestVariable,} from "@prisma/client";
import {ActionExecutionContext} from "./ActionExecutionContext";
import {EvaluatedDialogLink, EvaluatedDialogPage, EvaluatedDialogPart, RawDialogPage,} from "./dialogTypes";
import {executeActions} from "./actionExecutor";
import {evaluateAll} from "./conditionEvaluator";
import {DebugDialogEngine} from "./debugDialogEngine";

export class DialogEngine {
  protected variableMap = new Map<string, any>();

  protected conditionContext = {
    getVariable: (questId: string | null, variableName: string | null) => {
      if (!questId || !variableName) return null;
      const key = `${questId}:${variableName}`;
      return this.variableMap.get(key) ?? null;
    },
  };

  protected actionContext: ActionExecutionContext;

  constructor(
    private readonly playerId: string,
    actionOverrides: Partial<ActionExecutionContext> = {}
  ) {
    this.actionContext = {
      ...this.conditionContext,

      // Player progression
      addGold: () => {},
      addXP: () => {},
      addItem: () => {},
      removeItem: () => {},
      addRecipe: () => {},
      addSkillPoints: () => {},
      addStat: () => {},

      // Quest state
      startQuest: () => {},
      completeQuest: () => {},
      failQuest: () => {},
      resetQuest: () => {},
      advanceQuestStage: () => {},
      setQuestStage: () => {},

      // Quest variables
      setVariable: (questId, variableName, value) => {
        if (!questId || !variableName) return;
        const key = `${questId}:${variableName}`;
        this.variableMap.set(key, value);
      },
      getVariable: (questId, variableName) => {
        if (!questId || !variableName) return null;
        const key = `${questId}:${variableName}`;
        return this.variableMap.get(key) ?? null;
      },

      // Movement
      movePlayerToMap: () => {},
      movePlayerToCoords: () => {},
      returnPlayerToPreviousLocation: () => {},
      setRespawnPoint: () => {},

      // Combat
      prepareCombatMonster: () => {},
      startCombat: () => {},
      startCombatGroup: () => {},

      // Active Effects
      applyEffect: () => {},
      removeEffect: () => {},

      ...actionOverrides,
    };
  }

  async init(): Promise<void> {
    const playerQuests = await prisma.playerQuest.findMany({
      where: { playerId: this.playerId },
      include: { variables: true },
    });

    for (const pq of playerQuests) {
      for (const v of pq.variables as PlayerQuestVariable[]) {
        const key = `${pq.questId}:${v.name}`;
        this.variableMap.set(key, v.value);
      }
    }
  }

  async loadPage(dialogId: string, sequence: number): Promise<EvaluatedDialogPage> {
    const dialog = (await prisma.dialog.findUnique({
      where: { id: dialogId },
      include: {
        chatBot: true,
        pages: {
          where: { sequence },
          include: {
            parts: { include: { conditions: true } },
            actions: { include: { conditions: true } },
            links: { include: { conditions: true } },
          },
        },
      },
    })) as (Dialog & { chatBot: ChatBot | null; pages: RawDialogPage[] }) | null;

    if (!dialog) {
      throw new Error(`Dialog not found: ${dialogId}`);
    }

    const page = dialog.pages[0];

    if (!page) {
      throw new Error(`Dialog page not found: ${dialogId} seq=${sequence}`);
    }

    const parts: EvaluatedDialogPart[] = page.parts
      .sort((a, b) => a.sequence - b.sequence)
      .filter((p) => evaluateAll(p.conditions, this.conditionContext))
      .map((p) => ({
        id: p.id,
        text: p.text,
      }));

    const actions = executeActions(page.actions, this.actionContext);

    const links: EvaluatedDialogLink[] = page.links
      .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
      .filter((l) => evaluateAll(l.conditions, this.conditionContext))
      .map((l) => ({
        id: l.id,
        dialogId: l.dialogId ?? null,
        map: l.mapId ?? null,
        x: l.x ?? null,
        y: l.y ?? null,
        leave: l.leave ?? null,
      }));

    return {
      dialog,
      page,
      parts,
      actions,
      links,
    };
  }

  async load(dialogId: string, sequence: number, debug = false) {
    if (debug) {
      const dbg = new DebugDialogEngine(this.playerId);
      await dbg.init();
      return dbg.loadPageDebug(dialogId, sequence);
    }

    await this.init();
    return this.loadPage(dialogId, sequence);
  }

}
