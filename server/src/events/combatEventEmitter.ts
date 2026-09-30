// server/src/events/combatEventEmitter.ts

import { EventEmitter } from "events";
import type { EngineCombatEventDto } from "shared";

class CombatEventEmitter extends EventEmitter {
  emitToCombat(combatId: string, events: EngineCombatEventDto[]) {
    this.emit(combatId, events);
  }
}

export const combatEventEmitter: CombatEventEmitter = new CombatEventEmitter();
