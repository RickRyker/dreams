// server/src/quests/services/QuestVersioningService.ts

import { prisma } from "@prisma";

export class QuestVersioningService {
  async snapshot(
    questId: string,
    actorId: string,
    action: "CREATE" | "UPDATE" | "DELETE",
    payload: any
  ) {
    const db: any = prisma;
    await db.questHistory.create({
      data: {
        questId,
        actorId,
        action,
        snapshot: payload ? JSON.stringify(payload) : null,
      },
    });
  }
}
