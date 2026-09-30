// shared/dto/CombatTypes.ts


export type CombatId = string;
export type EntityId = string | null;

// -----------------------------------------------------
// Entity snapshot DTO (client-facing)
// -----------------------------------------------------
export interface EntitySnapshotDto {
  entityId: string;
  hp: number;
  maxHp: number;
  shield: number;
  buffs: string[];    // effectIds
  debuffs: string[];  // effectIds
  interrupted: boolean;
}

// -----------------------------------------------------
// Combat event DTO (timeline / replay / UI)
// -----------------------------------------------------
export interface CombatEventDto {
  id: string;
  combatId: string;
  timestamp: number;
  type:
    | "telegraph"
    | "damage"
    | "heal"
    | "roundStart"
    | "turnStart"
    | "death"
    | "cast"
    | "interrupt"
    | "THREAT_CHANGE";
  participantId?: string | null;
  label?: string;
  value?: number | null;
  telegraph?: any;
  data?: any;
}

// -----------------------------------------------------
// Combat resolution DTO (simplified for UI)
// -----------------------------------------------------
export interface DamageResolutionDto {
  sourceId: string;
  targetId: string;
  amount: number;
}

export interface HealResolutionDto {
  sourceId: string;
  targetId: string;
  amount: number;
}

export interface ShieldResolutionDto {
  sourceId: string;
  targetId: string;
  amount: number;
}

export interface InterruptResolutionDto {
  targetId: string;
}

export interface CombatResolutionDto {
  damage?: DamageResolutionDto;
  heal?: HealResolutionDto;
  shield?: ShieldResolutionDto;
  interrupt?: InterruptResolutionDto;
}
