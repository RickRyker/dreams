// server/src/quests/services/QuestAuthorizationService.ts

import type { Player, Quest } from "@prisma/client";

export class QuestAuthorizationService {

  private getPrivileges(player: Player): string[] {
    // Normalize privileges to always be an array of strings
    const raw = (player as any).privileges;
    if (Array.isArray(raw)) return raw;
    return [];
  }

  private hasSystemEditPrivileges(player: Player): boolean {
    const privileges = this.getPrivileges(player);
    return (
      privileges.includes("editSystemQuests") ||
      privileges.includes("editSystemDialogs")
    );
  }

  canEditQuest(actor: Player, quest: Quest): boolean {
    const canEditSystem = this.hasSystemEditPrivileges(actor);
    const isSystemQuest = quest.createdById === "System";
    const isOwner = quest.createdById === actor.id;

    // System quests: only system editors may edit
    if (isSystemQuest) return canEditSystem;

    // Player-created quests: creator OR system editors
    return isOwner || canEditSystem;
  }

}
