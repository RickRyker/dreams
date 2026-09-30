// server/src/mappers/message.log.mapper.ts

import { MessageLog } from "@prisma/client";
import { MessageLogDto } from "shared";

export function toMessageLogDto(model: MessageLog): MessageLogDto {
  return {
    id: model.id,
    senderId: model.senderId,
    recipientId: model.recipientId,
    messageType: model.messageType,
    content: model.content,
    isFlagged: model.isFlagged,
    isFiltered: model.isFiltered,
    badWords: JSON.stringify(model.badWords),
    moderatorId: model.moderatorId,
    moderationNote: model.moderationNote,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export function toMessageLogDtoList(models: MessageLog[]): MessageLogDto[] {
  return models.map(toMessageLogDto);
}
