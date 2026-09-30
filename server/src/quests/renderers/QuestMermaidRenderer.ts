// server/src/quests/renderers/QuestMermaidRenderer.ts

import { Quest, QuestDependency } from "@prisma/client";

type QuestWithDeps = Quest & { dependencies: (QuestDependency & { dependsOnQuest: Quest })[] };

export class QuestMermaidRenderer {
  static render(quests: QuestWithDeps[]): string {
    const lines: string[] = [];
    lines.push("graph TD");

    for (const q of quests) {
      lines.push(`  ${q.slug}["${q.name}"]`);
    }

    for (const q of quests) {
      for (const dep of q.dependencies) {
        const from = dep.dependsOnQuest.slug;
        const to = q.slug;
        lines.push(`  ${from} --> ${to}`);
      }
    }

    return lines.join("\n");
  }
}
