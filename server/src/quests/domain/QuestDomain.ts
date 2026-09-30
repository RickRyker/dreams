// server/src/quests/domain/QuestDomain.ts

import type { QuestDetailDto, QuestDto, QuestSearchQueryDto } from "shared";
import type { QuestEditorPayloadDto } from "shared";

export type QuestEditorCommand = QuestEditorPayloadDto;
export type QuestSearchCommand = QuestSearchQueryDto;
export type QuestSummaryDomain = QuestDto;
export type QuestDetailDomain = QuestDetailDto;
