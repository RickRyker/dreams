// server/src/combat/types/EngineParticipantDto.ts


export interface EngineParticipantDto {
  id: string;

  // identity
  playerId: string | null;
  monsterId: string | null;
  petId: string | null;

  // position
  x: number;
  y: number;

  // stats
  hp: number;
  maxHp: number;
  shield: number;

  // status
  buffs: string[];
  debuffs: string[];
  interrupted: boolean;
  dead: boolean;
}
