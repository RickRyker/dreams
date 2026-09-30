// server/src/combat/types/EngineParticipantState.ts


export interface EngineParticipantState {
  // identity
  id: string;
  playerId: string | null;
  monsterId: string | null;
  petId: string | null;

  // position
  x: number;
  y: number;

  // core stats
  hp: number;
  maxHp: number;
  shield: number;

  // runtime combat state
  globalCooldownUntil: number | null;
  cast?: {
    spellId: string;
    startedAt: number;
    endsAt: number;
    interrupted: boolean;
  } | null;

  // runtime effects (engine-only)
  buffs: string[];
  debuffs: string[];

  // threat table (engine-only)
  threat: Record<string, number>; // keyed by entityId

  // flags
  interrupted: boolean;
  dead: boolean;
}
