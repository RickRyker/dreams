// shared/dto/AbilityEventDto.ts


export type AbilityEventType =
  | "HIT"
  | "MISS"
  | "HEAL"
  | "DOT_TICK"
  | "HOT_TICK"
  | "STUN"
  | "TAUNT"
  | "THREAT_UPDATE";

export interface AbilityEventBaseDto {
  seq: number;
  combatId: string;
  timestamp: number; // JSON-safe
  actorId?: string | null;
  targetId?: string | null;
  abilitySlug?: string | null;
}

export interface AbilityHitEventDto extends AbilityEventBaseDto {
  type: "HIT";
  amount: number;
  isCrit?: boolean;
  mitigation?: number;
  elementalMultiplier?: number;
  variance?: number;
}

export interface AbilityMissEventDto extends AbilityEventBaseDto {
  type: "MISS";
}

export interface AbilityHealEventDto extends AbilityEventBaseDto {
  type: "HEAL";
  amount: number;
  isCrit?: boolean;
  variance?: number;
}

export interface AbilityDotTickEventDto extends AbilityEventBaseDto {
  type: "DOT_TICK";
  amount: number;
  elementalMultiplier?: number;
  variance?: number;
}

export interface AbilityHotTickEventDto extends AbilityEventBaseDto {
  type: "HOT_TICK";
  amount: number;
  variance?: number;
}

export interface AbilityStunEventDto extends AbilityEventBaseDto {
  type: "STUN";
}

export interface AbilityTauntEventDto extends AbilityEventBaseDto {
  type: "TAUNT";
  threatDelta?: number;
}

export interface AbilityThreatUpdateEventDto extends AbilityEventBaseDto {
  type: "THREAT_UPDATE";
  threatDelta: number;
}

export type AbilityEventDto =
  | AbilityHitEventDto
  | AbilityMissEventDto
  | AbilityHealEventDto
  | AbilityDotTickEventDto
  | AbilityHotTickEventDto
  | AbilityStunEventDto
  | AbilityTauntEventDto
  | AbilityThreatUpdateEventDto;
