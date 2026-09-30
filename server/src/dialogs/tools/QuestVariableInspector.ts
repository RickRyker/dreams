// server/src/dialogs/tools/QuestVariableInspector.ts

export class QuestVariableInspector {
  static inspect(questState: Record<string, any>) {
    const output: string[] = [];

    for (const questId of Object.keys(questState)) {
      output.push(`Quest: ${questId}`);
      const vars: any = questState[questId];

      for (const key of Object.keys(vars)) {
        output.push(`  ${key}: ${vars[key]}`);
      }
    }

    return output.join("\n");
  }

  static explainCondition(cond: any, questState: any) {
    const current: any = questState[cond.questId]?.[cond.variable] ?? "(undefined)";
    return `Condition: ${cond.questId}.${cond.variable} ${cond.operator} ${cond.value} | current=${current}`;
  }

  static explainPage(page: any, questState: any) {
    return page.conditions.map((c: any): string => this.explainCondition(c, questState));
  }
}
