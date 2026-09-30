// server/src/combat/types/EngineParticipantSnapshot.ts


export interface EngineParticipantSnapshot {
  entityId: string;

  // core stats
  hp: number;
  maxHp: number;
  shield: number;

  // snapshot of runtime state
  buffs: string[];
  debuffs: string[];
  interrupted: boolean;
}
