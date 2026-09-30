// tools/combat-sim/CombatSimulatorCli.ts

import readline from "readline";
import {CombatTestHarness} from "../../server/src/combat/tests/CombatTestHarness";

export class CombatSimulatorCli {
  private readonly rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private readonly harness: CombatTestHarness;

  constructor(combatId: string) {
    this.harness = new CombatTestHarness(combatId);
  }

  start(): void {
    console.log("Combat Simulator CLI started.");
    this.prompt();
  }

  private prompt(): void {
    this.rl.question("> ", (line) => {
      const [cmd, ...args] = line.split(" ");

      switch (cmd) {
        case "tick":
          this.harness.tick(Number(args[0] ?? 1000));
          console.log("Snapshot:", this.harness.snapshot());
          break;
        case "log":
          console.log(this.harness.log());
          break;
        case "exit":
          this.rl.close();
          return;
        default:
          console.log("Commands: tick <ms>, log, exit");
      }

      this.prompt();
    });
  }
}
