// server/src/players/services/PermissionService.ts

export interface PermissionService {
  canEditDialog(editorId: string, dialogId: string): Promise<boolean>;
  canCreateDialog(editorId: string): Promise<boolean>;
}

export class PermissionServiceImpl implements PermissionService {
  constructor(
    private readonly prisma: any, // inject Prisma client
  ) {}

  async canEditDialog(editorId: string, dialogId: string): Promise<boolean> {
    // 1. Check if editor owns the dialog
    const dialog = await this.prisma.dialog.findUnique({
      where: { id: dialogId },
      select: { chatBotId: true },
    });

    // If dialog is tied to a chatbot owned by the editor
    if (dialog?.chatBotId) {
      const bot = await this.prisma.chatBot.findUnique({
        where: { id: dialog.chatBotId },
        select: { ownerId: true },
      });

      if (bot?.ownerId === editorId) return true;
    }

    // 2. Check if editor has system‑level permission
    const role = await this.prisma.playerRole.findFirst({
      where: { playerId: editorId },
      select: { canEditSystemDialogs: true },
    });

    return role?.canEditSystemDialogs === true;
  }

  async canCreateDialog(editorId: string): Promise<boolean> {
    const role = await this.prisma.playerRole.findFirst({
      where: { playerId: editorId },
      select: { canCreateDialogs: true },
    });

    return role?.canCreateDialogs === true;
  }
}
