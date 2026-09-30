// server/src/combat/types/CastRequest.ts


export interface CastRequest {
  casterId: string;
  targetId?: string | null;
  abilityId: string;
  now: number; // REQUIRED
}
