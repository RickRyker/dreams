// server/src/server/tickLoop.ts

import { CombatEngineManager } from "../combat/CombatEngineManager";

export function startTickLoop(
  engineManager: CombatEngineManager,
  intervalMs = 200,
) {
  setInterval(async () => {
    try {
      await engineManager.tick(Date.now());
    } catch (err) {
      console.error("Tick loop error:", err);
    }
  }, intervalMs);
}
