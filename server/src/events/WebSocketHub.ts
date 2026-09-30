// server/src/events/WebSocketHub.ts

import { EventEmitter } from "events";

export class WebSocketHub extends EventEmitter {
  pushToPlayer(playerId: string, payload: unknown) {
    this.emit(`player:${playerId}`, payload);
  }
}
