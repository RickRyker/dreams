// shared/dto/PlayerQuestSummaryDto.ts


export interface PlayerQuestSummaryDto {
  questId: string;
  slug: string;
  name: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completed: boolean;
}
