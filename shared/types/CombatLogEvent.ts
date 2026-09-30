// shared/types/CombatLogEvent.ts

import type {ParticipantType} from "@shared/index";

export interface CombatLogEvent {
  id: string;
  combatId: string;
  type: string;
  actorId: string | null;
  actorType: ParticipantType | null;
  targetId: string | null;
  message: string;
  data: any | null;
  seq: number;
  createdAt: number;
}
