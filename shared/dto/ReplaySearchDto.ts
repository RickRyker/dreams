// shared/dto/ReplaySearchDto.ts

export interface ReplaySearchFiltersDto {
  playerId?: string;
  monsterId?: string;
  abilitySlug?: string;
  minDate?: string;
  maxDate?: string;
}

export interface ReplaySearchResultDto {
  combatId: string;
  createdAt: string;
  durationSeconds: number;
  playerNames: string[];
  monsterNames: string[];
}

export interface ReplaySearchResponseDto {
  results: ReplaySearchResultDto[];
}
