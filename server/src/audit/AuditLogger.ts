// server/src/audit/AuditLogger.ts

export class AuditLogger {
  static questEdit(actorId: string, questId: string, action: string) {
    console.log(`[AUDIT] ${actorId} ${action} quest ${questId} @ ${new Date().toISOString()}`);
    // Later: write to DB or S3
  }
}
