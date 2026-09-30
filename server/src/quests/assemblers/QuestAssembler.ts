// server/src/quests/assemblers/QuestAssembler.ts

import type { QuestDetailDto, QuestDto, QuestEditorPayloadDto, QuestSearchQueryDto } from "shared";
import type { QuestDetailDomain, QuestEditorCommand, QuestSearchCommand, QuestSummaryDomain } from "../domain/QuestDomain";
import { QuestMapper } from "../mappers/QuestMapper";

export class QuestAssembler {
  static toEditorCommand(dto: QuestEditorPayloadDto): QuestEditorCommand {
    return dto;
  }

  static toSearchCommand(dto: QuestSearchQueryDto): QuestSearchCommand {
    return dto;
  }

  static toSummaryDto(quest: QuestSummaryDomain): QuestDto {
    return quest;
  }

  static toDetailDto(quest: QuestDetailDomain): QuestDetailDto {
    return quest;
  }

  static toSummaryDtoFromModel(model: Parameters<typeof QuestMapper.toSummaryDto>[0]): QuestDto {
    return QuestMapper.toSummaryDto(model);
  }

  static toDetailDtoFromModel(model: Parameters<typeof QuestMapper.toDetailDto>[0]): QuestDetailDto {
    return QuestMapper.toDetailDto(model);
  }
}
