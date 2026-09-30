// server/src/dialogs/services/DialogCollaborativeLockService.ts

export class DialogCollaborativeLockService {
  constructor(private readonly prisma: any) {}

  async acquireLock(dialogId: string, editorId: string) {
    const existing = await this.prisma.dialogLock.findUnique({
      where: { dialogId },
    });

    if (existing && existing.editorId !== editorId) {
      return { locked: true, owner: existing.editorId };
    }

    await this.prisma.dialogLock.upsert({
      where: { dialogId },
      update: { editorId, updatedAt: new Date() },
      create: { dialogId, editorId },
    });

    return { locked: false };
  }

  async releaseLock(dialogId: string, editorId: string) {
    const existing = await this.prisma.dialogLock.findUnique({
      where: { dialogId },
    });

    if (existing?.editorId === editorId) {
      await this.prisma.dialogLock.delete({ where: { dialogId } });
    }

    return { released: true };
  }

  async isLocked(dialogId: string) {
    const lock = await this.prisma.dialogLock.findUnique({
      where: { dialogId },
    });

    return lock ? { locked: true, owner: lock.editorId } : { locked: false };
  }
}
