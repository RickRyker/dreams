// server/src/scheduler/BuffCleanupScheduler.ts

import { PlayerBuffCleanupService } from "../players/services/PlayerBuffCleanupService";

export class BuffCleanupScheduler {
  private interval: NodeJS.Timeout | null = null;
  private readonly cleanupSvc = new PlayerBuffCleanupService();

  start(intervalMs = 30_000) {
    if (this.interval) return;

    this.interval = setInterval(async () => {
      try {
        const removed = await this.cleanupSvc.clearAllExpired();
        if (removed > 0) {
          console.log(`[BuffCleanup] Removed ${removed} expired effects`);
        }
      } catch (err) {
        console.error("[BuffCleanup] Error:", err);
      }
    }, intervalMs);

    console.log(`[BuffCleanup] Scheduler started (every ${intervalMs}ms)`);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("[BuffCleanup] Scheduler stopped");
    }
  }
}
