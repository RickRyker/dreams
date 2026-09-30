// server/src/quests/adapters/QuestAdapter.ts

import { QuestMapper } from "../mappers/QuestMapper";
import { QuestDto } from "shared";

export class QuestAdapter {
  static toDto(model: any): QuestDto {
    return QuestMapper.toSummaryDto(model);
  }
}
