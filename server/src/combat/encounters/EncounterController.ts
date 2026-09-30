// server/src/combat/encounters/EncounterController.ts


import {EncounterScript, EncounterContext} from "./EncounterScript";

export class EncounterController {
  private activePhase: string | null = null;

  constructor(
    private readonly script: EncounterScript,
    private readonly engine: any,
    private readonly bossId: string,
  ) {}

  tick(timestamp: number): void {
    const ctx: EncounterContext = {
      engine: this.engine,
      timestamp,
      bossId: this.bossId,
    };

    // Determine active phase
    for (const phase of this.script.phases) {
      if (phase.startCondition(ctx)) {
        if (this.activePhase !== phase.id) {
          this.activePhase = phase.id;
          phase.onEnter?.(ctx);
        }
        phase.onTick?.(ctx);
        return;
      }
    }
  }
}
