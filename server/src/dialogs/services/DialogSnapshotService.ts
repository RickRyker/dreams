// server/src/dialogs/services/DialogSnapshotService.ts

export class DialogSnapshotService {
  constructor(private readonly prisma: any) {}

  async saveSnapshot(dialogId: string, editorId: string, snapshot: any) {
    return this.prisma.dialogSnapshot.create({
      data: {
        dialogId,
        editorId,
        snapshot: JSON.stringify(snapshot),
      },
    });
  }

  async listSnapshots(dialogId: string) {
    return this.prisma.dialogSnapshot.findMany({
      where: { dialogId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getSnapshot(snapshotId: string) {
    const snap = await this.prisma.dialogSnapshot.findUnique({
      where: { id: snapshotId },
    });
    return snap ? JSON.parse(snap.snapshot) : null;
  }
}
