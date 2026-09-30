// tools/encounter-sim/EncounterSimulatorCli.ts

import readline from "readline";
import {CombatEngine} from "../../server/src/combat/engines/CombatEngine";
import {EncounterController} from "../../server/src/combat/encounters/EncounterController";
import {FireDemonEncounter} from "../../server/src/combat/encounters/scripts/FireDemon";

export class EncounterSimulatorCli {
  private readonly rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private readonly engine: CombatEngine;
  private readonly encounter: EncounterController;

  constructor(combatId: string, bossId: string) {
    this.engine = new CombatEngine(combatId);
    this.encounter = new EncounterController(FireDemonEncounter, this.engine, bossId);
  }

  start(): void {
    console.log("Encounter Simulator started.");
    this.prompt();
  }

  private prompt(): void {
    this.rl.question("> ", (line) => {
      const [cmd, ...args] = line.split(" ");

      switch (cmd) {
        case "tick":
          const ms = Number(args[0] ?? 1000);
          this.engine.tick(ms, (id) => this.engine.getParticipantPosition(id));
          this.encounter.tick(ms);
          console.log("Snapshot:", this.engine.getSnapshot());
          break;

        case "state":
          console.log(this.engine.getStateStore().dump());
          break;

        case "exit":
          this.rl.close();
          return;

        default:
          console.log("Commands: tick <ms>, state, exit");
      }

      this.prompt();
    });
  }
}
