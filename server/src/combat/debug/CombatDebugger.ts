// server/src/combat/debug/CombatDebugger.ts


export class CombatDebugger {
  constructor(private readonly engine: any) {}

  dumpState(): void {
    console.log("=== Combat State ===");
    console.log("Participants:", this.engine.participants);
    console.log("StateStore:", this.engine.getStateStore().dump());
    console.log("Effects:", this.engine.effectEngine.effects);
    console.log("Threat:", this.engine.threatEngine.tables);
    console.log("Timeline:", this.engine.timeline);
    console.log("AI:", this.engine.aiEngine);
    console.log("====================");
  }
}
