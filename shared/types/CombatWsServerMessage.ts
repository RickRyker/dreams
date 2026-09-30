// shared/types/CombatWsServerMessage.ts


import type {CombatSnapshotDto} from "../dto/CombatSnapshotDto";
import type {CombatTimelineEventDto} from "../dto/CombatTimelineEventDto";
import type {CombatLogEntryDto} from "../dto/CombatLogEntryDto";
import type {AbilityEventDto} from "../dto/AbilityEventDto";

export type CombatWsServerMessage =
  | {
  type: "COMBAT_SNAPSHOT";
  combatId: string;
  snapshot: CombatSnapshotDto;
}
  | {
  type: "COMBAT_TIMELINE";
  combatId: string;
  events: CombatTimelineEventDto[];
}
  | {
  type: "COMBAT_LOGS";
  combatId: string;
  logs: CombatLogEntryDto;
}
  | {
  type: "COMBAT_EVENTS";
  combatId: string;
  events: AbilityEventDto[];
};
