// shared/dto/ReplayFeaturesDto.ts

export interface ReplayFeaturesDto {
  id: string;
  totalDamage: number;
  totalHealing: number;
  durationSeconds: number;
  rounds: number;
  turns: number;
  participantCount: number;
  deathCount: number;
  casts: number;
  interrupts: number;
  telegraphs: number;
}
