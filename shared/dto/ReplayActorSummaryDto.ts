// shared/dto/ReplayActorSummaryDto.ts

export interface ReplayActorSummaryDto {
  participantId: string;
  name: string;
  totalDamage: number;
  totalHealing: number;
  deaths: number;
  casts: number;
  interrupts: number;
  telegraphs: number;
}
