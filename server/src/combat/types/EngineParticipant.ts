// server/src/combat/types/EngineParticipant.ts


export interface EngineParticipant {
  id: string;

  // identity
  playerId: string | null;
  monsterId: string | null;
  petId: string | null;

  // position
  x: number;
  y: number;

  // combat stats
  hp: number;
  maxHp: number;
  shield: number;
}
